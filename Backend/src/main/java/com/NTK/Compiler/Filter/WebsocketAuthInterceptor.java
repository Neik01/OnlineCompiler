//package com.NTK.Compiler.Filter;
//
//import com.NTK.Compiler.Entities.Role;
//import com.NTK.Compiler.Entities.User;
//import com.NTK.Compiler.Repository.UserRepository;
//import com.NTK.Compiler.Utils.JWTUtils;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//
//import java.util.Collections;
//import java.util.Optional;
//
//
//@Slf4j
//@Order(Ordered.HIGHEST_PRECEDENCE+99)
//@RequiredArgsConstructor
//public class WebsocketAuthInterceptor implements ChannelInterceptor {
//
//    private final JWTUtils jwtUtils;
//
//    private final UserRepository userRepository;
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor =
//                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
//
//            String authHeader = accessor.getFirstNativeHeader("Authorization");
//            String token = jwtUtils.parseJwt(authHeader);
//
////            log.info("in the first inter:\n "+userFromSecurity);
//            if (token!=null && jwtUtils.validateJwtToken(token)){
//                String username = jwtUtils.extractUsername(token);
//                Optional<User> user = this.userRepository.findByUsername(username);
//                final UsernamePasswordAuthenticationToken userSecurityToken =
//                        new UsernamePasswordAuthenticationToken(username, null, Collections.singleton(Role.User::toString));
//
//                SecurityContextHolder.getContext().setAuthentication(userSecurityToken);
//                user.ifPresent(value -> accessor.setUser(userSecurityToken));
//                log.info("in the first inter after:\n "+accessor);
//            }
//
//        }
//        return message;
//    }
//}
