package com.capstone.peralta.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    //Method is called on every request sent to server from login
    @CrossOrigin(origins = "http://localhost:3000")
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email"); //Grabs email from request body
        String password = request.getParameter("password"); //Grabs password from request body
        log.info(String.valueOf(request)); //For debugging
        log.info("Email is: {}", email);
        log.info("Password is: {}", password);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password); //formats username and password into a token
        return authenticationManager.authenticate(authenticationToken); //Authenticates token Note: at the end of the method it will call successfulAuthentication()
    }

    //On successful authentication Note: See above
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User)authResult.getPrincipal(); //Accesses the User that is authenticated

        Algorithm algorithm = Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()); //Creates a hashing algorithm

        String access_token = JWT.create() //Initial Access token
                .withSubject(user.getUsername()) //Subject of JWT must be unique so I chose Username which is technically email
                .withExpiresAt(new Date(System.currentTimeMillis() + 120 * 60 * 1000)) //Ten minute expiry
                .withIssuer(request.getRequestURI().toString()) //Displays Issuer as the Request Url
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())) //Collects authorities from the user
                .sign(algorithm); //Uses previously created hasing algorithm
        String refresh_token = JWT.create() //Token that "refreshes" the access token
                .withSubject(user.getUsername()) //Subject of JWT must be unique so I chose Username which is technically email
                .withExpiresAt(new Date(System.currentTimeMillis() + 240 * 60 * 1000)) //1 hour expiry
                .withIssuer(request.getRequestURI().toString()) //Displays Issuer as the Request Url
                .sign(algorithm); //Uses previously created hasing algorithm


        //This block of code below maps the tokens to a hash map and encrypts them for more protection
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }


    //TODO:Might use for brute force prevention with timeouts but TBD for now
/*    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        super.unsuccessfulAuthentication(request, response, failed);
    }*/
}
