package com.NTK.Compiler.Filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class WebsocketConnectEventListener {

   @Autowired
    private SimpUserRegistry simpUserRegistry;

    @Autowired
    private JwtDecoder decoder;

    @Autowired
    private  SimpMessagingTemplate messagingTemplate;

    private Map<String,Set<String>> sessionMap = new ConcurrentHashMap<>();


    @EventListener
    public void onSubscribe(SessionSubscribeEvent event){

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String authHeader = accessor.getFirstNativeHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        log.info(token);
        try{

            String roomId=accessor.getDestination().split("/topic/")[1];
            if (roomId.contains("/users")){
                roomId = roomId.replace("/users", "");
            }
           Jwt jwt = decoder.decode(token);
           String userId = jwt.getSubject();
           String username = jwt.getClaimAsString("preferred_username");
           this.sessionMap.computeIfAbsent(roomId, m->new HashSet<>()).add(username);



           log.info(username);

            HashMap<String,Object> payload = new HashMap<>();
//
            payload.put("Type", "SUBSCRIBE");
            payload.put("User", username);
            payload.put("roomId", roomId);
            payload.put("userList", this.sessionMap.get(roomId));

            this.messagingTemplate.convertAndSend("/topic/" +roomId+"/users",payload);

        }
        catch (Exception e){
            throw new IllegalArgumentException("Invalid Jwt token: "+e);
        }

    }

    @EventListener
    public void onUnsubscribe(SessionUnsubscribeEvent event){
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());


        String authHeader = accessor.getFirstNativeHeader("Authorization");
        try{

            String roomId=accessor.getDestination().split("/topic/")[1];
            if (roomId.contains("/users")){
                roomId= roomId.replace("/users", "");
            }
            String token = authHeader.substring(7);

            Jwt jwt = decoder.decode(token);

            String username = jwt.getClaimAsString("preferred_username");

            Set<String> users =this.sessionMap.get(roomId);
//
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
        catch (Exception e){
            throw new IllegalArgumentException("Invalid Jwt token: "+e);
        }
    }
}
