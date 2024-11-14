package com.NTK.Compiler.RestController;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Payload.Request.CodeChangePayload;
import com.NTK.Compiler.Repository.CodeRoomRepository;
import com.NTK.Compiler.Service.CodeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebsocketController {


    private final SimpMessagingTemplate messagingTemplate;

    private final SimpUserRegistry simpUserRegistry;

    private final CodeService codeService;

    @MessageMapping("/code-message")
    public void codeChange(CodeChangePayload payload){


        this.codeService.updateContent(payload.getContent(),payload.getRoomId());
        messagingTemplate.convertAndSend("/topic/"+payload.getRoomId(), payload);

    }
}
