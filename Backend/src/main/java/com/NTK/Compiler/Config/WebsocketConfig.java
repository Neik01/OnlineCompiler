package com.NTK.Compiler.Config;


import com.NTK.Compiler.Entities.Role;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Filter.UserEventInterceptor;
import com.NTK.Compiler.Filter.WebsocketAuthInterceptor;
import com.NTK.Compiler.Repository.UserRepository;
import com.NTK.Compiler.Utils.JWTUtils;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;

import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.config.annotation.*;

import java.util.Collections;
import java.util.Optional;
import java.util.concurrent.Executors;

@Configuration
@EnableWebSocketMessageBroker
@Slf4j
@RequiredArgsConstructor
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
        registration.taskExecutor().corePoolSize(4).maxPoolSize(10).keepAliveSeconds(60).queueCapacity(100);

//        registration.interceptors(new WebsocketAuthInterceptor(jwtUtils,userRepository));
//        registration.interceptors(new UserEventInterceptor());
    }


    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.setMessageSizeLimit(8192)  // default: 64 * 1024
                .setSendBufferSizeLimit(8192)  // default: 512 * 1024
                .setSendTimeLimit(10000);

    }


}
