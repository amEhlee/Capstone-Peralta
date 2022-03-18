package com.capstone.peralta.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;


/*
Filter intercepts EVERY request that enters the application
 */
@Slf4j
public class AuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        /*-If the url path is on a login page, bypass filter. (Not sure yet)
        -If the url path isn't on a user or admin page, bypass filter.
        -If the url path is related to refreshing the token, bypass filter
        Basically, if you are trying to access something that doesn't require you to be logged in ignore the else clause.
        NOTE: I'm not 100% on whether login needs to be included here or not so if it stops working try removing it */
        //Otherwise
        if ((request.getServletPath().contains("/admin") || request.getServletPath().contains("/user")) && (!request.getServletPath().equals("/user/auth/refreshtoken") || !request.getServletPath().equals("/user/login"))) {
            String authorizationHeader = request.getHeader(AUTHORIZATION); //Grabs the authorization header in the request body
            /*Checks if the Authorization section starts with "Bearer " which shows that the sender "bears" a token. Very important*/
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String token = authorizationHeader.substring("Bearer ".length()); //Cuts "Bearer " from the authorization body to grab just the token
                    Algorithm algorithm = Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()); //Creates a hashing algorithm TODO:Maybe Put this into a utility class to remove redundancy
                    JWTVerifier verifier = JWT.require(algorithm).build(); //Object that Verifies Token
                    DecodedJWT decodedJWT = verifier.verify(token); //Token Verification/Decoding
                    String username = decodedJWT.getSubject(); //gets username from decoded token
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class); //gets authorities/roles
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>(); //Creates a Collection of authorities
                    stream(roles).forEach(role -> { //Deep copies all the roles from the user into the authorities collection
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    log.info(String.valueOf(authorities)); //For debugging, comment out with user discretion
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities); //Formats user info into a token. If not possible throws an exception
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken); //Authenticates the token and verifies it's valid. Otherwise throws an exception
                    filterChain.doFilter(request, response); //Runs through the filter after checking token
                }
                catch (Exception exception){
                    //Basically this section just sends an error log to IDE console AND the user web tools within the browser.
                    log.error("Error logging in: {}, exception.getMessage()");
                    response.setHeader("error", exception.getMessage());
                    response.setStatus(FORBIDDEN.value());
                    //response.sendError(FORBIDDEN.value()); //Old code for sending an error new code is below
                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", exception.getMessage());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }

            }
            else { //If no bearer/authorization body exists go through filter
                filterChain.doFilter(request, response);
            }
        }
        else {
            filterChain.doFilter(request,response);
        }
    }
}