package com.NTK.Compiler.Config;


import com.NTK.Compiler.Entities.Role;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Repository.UserRepository;
import com.NTK.Compiler.Utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;

import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.config.annotation.*;

import java.util.Collections;
import java.util.Optional;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE+99)
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JWTUtils jwtUtils;

    private final UserRepository userRepository;


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS()
                ;
        registry.addEndpoint("/ws")
//                .addInterceptors(new JwtInterceptor(this.jwtUtils,this.userDetailsService))
                .setAllowedOriginPatterns("http://localhost:4200")
        ;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
       registry.setApplicationDestinationPrefixes("/app");
       registry.enableSimpleBroker("/topic");
       registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {

                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    String token = parseJwt(authHeader);


                    if (token!=null && jwtUtils.validateJwtToken(token)){
                        String username = jwtUtils.extractUsername(token);
                        Optional<User> user = userRepository.findByUsername(username);
                        final UsernamePasswordAuthenticationToken userSecurityToken =
                                new UsernamePasswordAuthenticationToken(username, null, Collections.singleton(Role.User::toString));


                        user.ifPresent(value -> accessor.setUser(userSecurityToken));

                    }

                }
                return message;
            }
        });
    }

    private String parseJwt(String header) {

        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7, header.length());
        }

        return null;
    }
}
