package com.NTK.Compiler.Config;

import com.NTK.Compiler.Filter.AuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;
//    private final AuthenticationProvider authenticationProvider;
    private final AuthFilter authFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource))
                .csrf(AbstractHttpConfigurer::disable)
                .headers(httpSecurityHeadersConfigurer -> {
                    httpSecurityHeadersConfigurer
                            .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin);
                })
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/**","/ws/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session->session.
                        sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterAt(((servletRequest, servletResponse, filterChain) -> {
//
//                    HttpServletRequest httpRequest = (HttpServletRequest) servletRequest;
//                    HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
//                    System.out.println("Request to: " + httpRequest.getRequestURI());
//                    System.out.println("Method: " + httpRequest.getMethod());
//                    System.out.println("Headers: " + httpRequest.getHeaderNames());
//                    System.out.println("User Principal: " + httpRequest.getUserPrincipal());
//                    System.out.println("Authentication: " + SecurityContextHolder.getContext().getAuthentication());
//
//
//                    filterChain.doFilter(servletRequest,servletResponse);
//                }), UsernamePasswordAuthenticationFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)

        ;
        return http.build();
    }



}
