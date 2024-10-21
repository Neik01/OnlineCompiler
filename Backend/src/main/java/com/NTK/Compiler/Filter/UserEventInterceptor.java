//package com.NTK.Compiler.Filter;
//
//import com.NTK.Compiler.Entities.User;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.simp.user.SimpSubscription;
//import org.springframework.messaging.simp.user.SimpUserRegistry;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//
//import java.security.Principal;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//@Slf4j
//@Order(Ordered.HIGHEST_PRECEDENCE+100)
//public class UserEventInterceptor implements ChannelInterceptor {
//
//    @Autowired
//    private  SimpUserRegistry simpUserRegistry;
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//
//        if (accessor == null) {
//            return message;
//        }
//
//
//        Principal user =  accessor.getUser();
//        String sessionId = accessor.getSessionId();
//        String destination = accessor.getDestination();
//
//        if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())){
//            Set<SimpSubscription> users =this.simpUserRegistry
//                    .findSubscriptions(subscription -> subscription.getDestination().equals(destination));
//
//            users.stream()
//                    .map(simpSubscription -> simpSubscription.getSession().getUser().getPrincipal())
//                    .forEach(principal -> log.info(String.valueOf(principal)));
//            log.info("User {} subscribed to {}", user, destination);
//        }
//        else if (StompCommand.UNSUBSCRIBE.equals(accessor.getCommand()) || StompCommand.DISCONNECT.equals(accessor.getCommand())) {
//            log.info("User {} unsubscribed/disconnected from {}", user, destination);
//
//        }
//
//
//        return message;
//    }
//}
