package com.github.nickklock.backend.secruity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .httpBasic()
                .authenticationEntryPoint((request, response, authException) ->
                        response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase()))
                .and()
                .authorizeHttpRequests(auth -> auth
                        //.requestMatchers("/api/users/login/me").permitAll()
                        .requestMatchers("/api/users/").permitAll()
                        //.requestMatchers(HttpMethod.POST, "/api/users/login/").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/spots/**").permitAll()
                        //.requestMatchers(HttpMethod.DELETE, "/api/user/").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/spots/").authenticated()
                        .anyRequest().authenticated()
                )
                .build();
    }

}
