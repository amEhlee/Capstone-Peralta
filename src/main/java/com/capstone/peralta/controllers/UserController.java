package com.capstone.peralta.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.capstone.peralta.models.Item;
import com.capstone.peralta.models.Role;
import com.capstone.peralta.models.User;
import com.capstone.peralta.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.UUID;
import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.SchemaOutputResolver;
import java.io.IOException;
import java.net.URI;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "3000")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @Autowired
    private final UserService userService;

    public void filter() {

    }

    //Refreshes the users authentication token
    @GetMapping("/auth/refreshtoken")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER"})
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);//Grabs the authorization header in the request body
        /*Checks if the Authorization section starts with "Bearer " which shows that the sender "bears" a token. Very important*/
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length()); //Cuts "Bearer " from the authorization body to grab just the token
                Algorithm algorithm = Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()); //Creates a hashing algorithm
                User user = loadUser(authorizationHeader, refresh_token, algorithm); //loads user using the authorization header, a valid refresh token, and auth header
                String access_token = JWT.create() //Initial Access refresh_token
                        .withSubject(user.getEmail()) //Subject of JWT must be unique so I chose Username which is technically email
                        .withExpiresAt(new Date(System.currentTimeMillis() + 120 * 60 * 1000)) //Ten minute expiry
                        .withIssuer(request.getRequestURI().toString()) //Displays Issuer as the Request Url
                        .withClaim("roles", user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList())) //Collects authorities from the user
                        .sign(algorithm); //Uses previously created hasing algorithm

                Map<String, String> tokens = new HashMap<>(); //Stores tokens in a hashmap for formatting when being sent
                tokens.put("access_token", access_token);//Puts tokens in the hashmap
                tokens.put("refresh_token", refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE); //Sets data format as Json
                new ObjectMapper().writeValue(response.getOutputStream(), tokens); //Writes data values to the response
            }
            //If any of the methods in try clause do not successfully execute then they throw an exception. Meaning the request was invalid.
            catch (Exception exception){
                //Basically, error logging to web browser terminal and IDE console for Debugging etc.
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value()); //Old code for sending an error new code is below
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                error.put("error_notes", "Token Invalid");
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

        }
        //In the event nothing was even sent... for some reason.
        else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    //Saves User to java object from React (Used for signup)
    @PostMapping("/signup")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        List<User> userList = userService.getAll();

        user.setEmail(user.getEmail().toLowerCase());

        //Checks if email is already logged on database
        for (User value : userList) {
            if (user.getEmail().equals(value.getEmail())) {
                log.info("User Already Exists");
                return null;
            }
        }

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/signup").toUriString());
        return ResponseEntity.created(uri).body(userService.addUser(user));
    }

    @PostMapping("/userCheck")
    public boolean userCheck(@RequestBody String email) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/userCheck").toUriString());
        List<User> userList = userService.getAll();
        for (User value : userList) {
            if (email.equals(value.getEmail())) {

                return true;
            }
        }
        return false;
    }

    @PostMapping("/verify")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER"})
    public boolean verify(@RequestBody User user) {
        return verifyPassword(user.getEmail(), user.getPassword());
    }

    /*
    Updates the user after verifying the old password
     */
    @PutMapping("/update")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER"})
    public boolean updateUser(@RequestBody User user) {
        userService.updateUser(user); //Update the user (including password)
        return true; // return a true on success
    }


    @DeleteMapping("/delete")
    @RolesAllowed({"ROLE_USER"})
    void deleteUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        try {
            User user = loadUser(authorizationHeader, authorizationHeader.substring("Bearer ".length()), Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()));
            userService.deleteUser(user);
        } catch (Exception exception) {
            //Basically, error logging to web browser terminal and IDE console for Debugging etc.
            response.setHeader("error", exception.getMessage());
            response.setStatus(FORBIDDEN.value());
            //response.sendError(FORBIDDEN.value()); //Old code for sending an error new code is below
            Map<String, String> error = new HashMap<>();
            error.put("error_message", exception.getMessage());
            error.put("error_notes", "Token Invalid");
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
    }


    @GetMapping("/load")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER"})
    public User getByToken (HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);//Grabs the authorization header in the request body
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String token = authorizationHeader.substring("Bearer ".length()); //Cuts "Bearer " from the authorization body to grab just the token
                Algorithm algorithm = Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()); //Creates a hashing algorithm TODO: Put this into a utility class to remove redundancy
                return loadUser(authorizationHeader,token,algorithm); //returns loaded user, refer to loadUser method below
            }
            catch (Exception exception) {
                //Basically, error logging to web browser terminal and IDE console for Debugging etc.
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value()); //Old code for sending an error new code is below
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                error.put("error_notes", "Token Invalid Could Not Load User");
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        }
        else {
            throw new RuntimeException("Refresh token is missing");
        }
        return null;
    }

    /*
        Verifies a password from our DB
     */
    public boolean verifyPassword (String email, String rawPassword) {
        User dbUserInstance = userService.getUserByName(email);
        String encryptedPassword = dbUserInstance.getPassword();
        return userService.getPasswordEncoder().matches(rawPassword, encryptedPassword);
    }

    /*
    Method loads a user using a token by getting the subject. The subject key has the users email.
     */
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER"})
    public User loadUser( String authorizationHeader, String token, Algorithm algorithm) throws IOException {
            JWTVerifier verifier = JWT.require(algorithm).build(); //Object that Verifies Token
            DecodedJWT decodedJWT = verifier.verify(token); //Token Verification/Decoding
            String username = decodedJWT.getSubject(); //gets username from decoded refresh_token
            return userService.getUserByName(username);
    }




}
