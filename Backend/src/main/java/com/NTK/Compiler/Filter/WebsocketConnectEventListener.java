package com.NTK.Compiler.Filter;

import com.NTK.Compiler.Entities.Role;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Repository.UserRepository;
import com.NTK.Compiler.Utils.JWTUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebsocketConnectEventListener {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpUserRegistry simpUserRegistry;

    @Autowired
    private  SimpMessagingTemplate messagingTemplate;

    private Map<String,Set<String>> sessionMap = new ConcurrentHashMap<>();

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

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String authHeader = accessor.getFirstNativeHeader("Authorization");
        String token = jwtUtils.parseJwt(authHeader);

        if (token!=null && jwtUtils.validateJwtToken(token)){
            String username = jwtUtils.extractUsername(token);

            String roomId=accessor.getDestination().split("/topic/")[1];
            if (roomId.contains("/users")){
                roomId= roomId.replace("/users", "");
            }

            this.sessionMap.computeIfAbsent(roomId, k -> new HashSet<>()).add(username);
            HashMap<String,Object> payload = new HashMap<>();

            payload.put("Type", "SUBSCRIBE");
            payload.put("User", username);
            payload.put("roomId", roomId);
            payload.put("userList", this.sessionMap.get(roomId));

            this.messagingTemplate.convertAndSend("/topic/" +roomId+"/users",payload);

        }
    }

    @EventListener
    public void onUnsubscribe(SessionUnsubscribeEvent event){
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String roomId=accessor.getDestination().split("/topic/")[1];
        if (roomId.contains("/users")){
            roomId= roomId.replace("/users", "");
        }


        String authHeader = accessor.getFirstNativeHeader("Authorization");
        String token = jwtUtils.parseJwt(authHeader);

        String username = jwtUtils.extractUsername(token);

        Set<String> users =this.sessionMap.get(roomId);

        if (users!=null){
            users.remove(username);
            if (users.isEmpty()){
                this.sessionMap.remove(roomId);
            }
        }
        HashMap<String,Object> payload = new HashMap<>();

        payload.put("Type", "UNSUBSCRIBE");
        payload.put("User", username);
        payload.put("roomId", roomId);
        payload.put("userList", this.sessionMap.get(roomId));

        this.messagingTemplate.convertAndSend("/topic/" +roomId+"/users",payload);
    }
}
