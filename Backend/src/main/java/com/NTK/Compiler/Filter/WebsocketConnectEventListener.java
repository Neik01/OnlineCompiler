package com.NTK.Compiler.Filter;

import com.NTK.Compiler.Entities.Role;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Repository.UserRepository;
import com.NTK.Compiler.Utils.JWTUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.Collections;
import java.util.Optional;

@Component
@Slf4j
public class WebsocketConnectEventListener {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpUserRegistry simpUserRegistry;

    @EventListener
    public void onConnect(SessionConnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String authHeader = accessor.getFirstNativeHeader("Authorization");
        String token = jwtUtils.parseJwt(authHeader);

        if (token!=null && jwtUtils.validateJwtToken(token)){
            String username = jwtUtils.extractUsername(token);
            Optional<User> user = this.userRepository.findByUsername(username);
            final UsernamePasswordAuthenticationToken userSecurityToken =
                    new UsernamePasswordAuthenticationToken(username, null, Collections.singleton(Role.User::toString));

            SecurityContextHolder.getContext().setAuthentication(userSecurityToken);
            user.ifPresent(value -> accessor.setUser(userSecurityToken));

        }

    }

    @EventListener
    public void onSubscribe(SessionSubscribeEvent event){
        log.info(event.toString());
    }
}
