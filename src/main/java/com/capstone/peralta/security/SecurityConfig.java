package com.capstone.peralta.security;
import com.capstone.peralta.filters.AuthenticationFilter;
import com.capstone.peralta.filters.AuthorizationFilter;
import com.capstone.peralta.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import static org.springframework.http.HttpMethod.GET;

/**
 * Security configuration for the application.
 * handles larger scale permit alls and when any given resource should pass through filters
 * also sets up larger cors configuration for the entire application
 * @author Don Laliberte
 * @author Elie Kabengele
 */
@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Configures the authentication manager to use the user details service
     * @param auth the authentication manager
     * @throws Exception if there is an error
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder); //Loads password encoder to encode and decode passwords
    }

    /**
     * Configures the http security to use the authentication filter and the authorization filter
     * sets up default permit alls and also paths that are only allowed for certain roles
     * @param http the http security
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManagerBean()); //Creates authentication filter NOTE: Refer to Authentication Filter class
        authenticationFilter.setFilterProcessesUrl("/user/login"); //Sets the login page for the filter so it bypasses and allows logging in




        /*
        This section of code is a giant nested http method call. It is setting which URLs should be filtered and which ones should not, given the role arguments stated.
        Edit as needed but for the record it works very similarly to how are React front end works with the URL routing.
         */
        http.cors().and();
        http.csrf().disable().authorizeRequests()
                .and().sessionManagement().sessionCreationPolicy(STATELESS)
                //TODO:Fix Authentication and normalize URL's
                .and().authorizeRequests().antMatchers("/user/login", "/user/signup", "/user/auth/refreshtoken", "/user/userCheck", "/user/disableCheck", "/item/get/**", "/order/**" ,"/order/get/user/{userId}", "/category/{categoryId}", "category/all", "/email/send" , "/item/search/{query}").permitAll()
                .and().authorizeRequests().antMatchers("/user/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN", "ROLE_OWNER")
                .and().authorizeRequests().antMatchers("/admin/**", "/item/add/{categoryId}", "item/addMultiple", "/item/update", "/report/generate", "image/upload/{itemId}", "category/add/{categoryId}", "category/addMultiple", "/admin/get/allItems").hasAnyAuthority("ROLE_ADMIN", "ROLE_OWNER")
                .and().authorizeRequests().anyRequest().authenticated()
                .and().httpBasic();
        http.addFilter(authenticationFilter); //Sets the filter of all the above addresses to be the authentication filter created above
        http.addFilterBefore(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class); //Makes a difference with the order of filters in the filter chain but at the moment we are only operating on one filter. Think Web Dev Semester 3


        //This block of code activates the filters and if active will not let you do anything atm....
/*        http.authorizeRequests().antMatchers("/**").permitAll();
        http.authorizeRequests().anyRequest().permitAll();*/

    }
    
    /**
     * Configures the authentication manager to use the user details service
     * @return the authentication manager
     * @throws Exception if there is an error
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * Configures the cors configuration source to be used for requests
     * @return the cors configuration source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
