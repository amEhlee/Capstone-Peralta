package com.capstone.peralta.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.AlgorithmMethod;
import java.io.IOException;
import java.security.AlgorithmParameterGenerator;
import java.sql.Date;
import java.util.Collection;
import java.util.stream.Collectors;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User)authResult.getPrincipal(); //Accesses the User that is authenticated
        Algorithm algorithm = Algorithm.HMAC256("JanePeraltaShopSecret".getBytes()); //Creates a hashing algorithm
        String accessToken = JWT.create() //Initial Access token
                .withSubject(user.getUsername()) //Subject of JWT must be unique so I chose Username which is technically email
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) //Ten minute expiry
                .withIssuer(request.getRequestURI().toString()) //Displays Issuer as the Request Url
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())) //Collects authorities from the user
                .sign(algorithm); //Uses previously created hasing algorithm
        String refreshToken = JWT.create() //Token that "refreshes" the access token
                .withSubject(user.getUsername()) //Subject of JWT must be unique so I chose Username which is technically email
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) //1 hour expiry
                .withIssuer(request.getRequestURI().toString()) //Displays Issuer as the Request Url
                .sign(algorithm); //Uses previously created hasing algorithm
        response.setHeader("access_token", accessToken);
        response.setHeader("refresh_token", refreshToken);
    }


    //Might use for brute force prevention with timeouts but TBD for now
/*    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        super.unsuccessfulAuthentication(request, response, failed);
    }*/
}
