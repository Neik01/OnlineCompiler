package com.NTK.Compiler.RestController;

import com.NTK.Compiler.DTO.CodeRoomDTO;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Payload.Request.CodeChangePayload;
import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Service.CodeService;
import com.NTK.Compiler.Utils.ProjectMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Code;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/code")
public class CodeRoomController {

    private final CodeService codeService;

    private final ProjectMapper mapper;

    @GetMapping()
    public List<CodeRoomDTO> getALl(){
        return this.mapper.mapListCodeRoomToListDTO(this.codeService.findAll());
    }

    @PostMapping()
    public CodeRoomDTO createCodeRoom(@RequestBody String name){
        CodeRoom codeRoom= new CodeRoom();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        codeRoom.setContent("");
        codeRoom.setName(name);
        codeRoom.setOwner(user);

        return this.mapper.mapCodeRoomToDTO(this.codeService.save(codeRoom));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") @NonNull String codeRoomId){

        Optional<CodeRoom> codeRoom = this.codeService.findById(codeRoomId);

       if (codeRoom.isEmpty()){
           return ResponseEntity.notFound().build();
       }

        return ResponseEntity.ok(this.mapper.mapCodeRoomToDTO(codeRoom.get()));
    }
}
