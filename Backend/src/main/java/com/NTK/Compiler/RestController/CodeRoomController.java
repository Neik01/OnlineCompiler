package com.NTK.Compiler.RestController;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Service.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CodeRoomController {

    private final CodeService codeService;

//    @PostMapping("/save")
//    public ResponseEntity<?> saveCode(@RequestBody CodeRoom snippet) {
//        codeService.save(snippet);
//        return ResponseEntity.ok("Code saved successfully");
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<CodeRoom> getCode(@PathVariable String id) {
//        return ResponseEntity.ok(codeService.findById(id));
//    }

    @MessageMapping("/edit")
    @SendTo("/topic/code")
    public CodeRoom editCode(@Payload CodeRoom snippet) {
        codeService.save(snippet);
        return snippet;
    }
}
