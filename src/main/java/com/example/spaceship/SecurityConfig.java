package com.example.spaceship;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())              // CSRF védelem kikapcsolása
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // minden kérés engedve
        return http.build();
    }
}
