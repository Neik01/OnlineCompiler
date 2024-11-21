package com.NTK.Compiler.RestController;

import com.NTK.Compiler.DTO.CodeRoomDTO;
import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Payload.Request.CodeRoomRequest;
import com.NTK.Compiler.Service.CodeService;
import com.NTK.Compiler.Utils.ProjectMapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Code;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/code")
public class CodeRoomController {

    private final CodeService codeService;

    private final ProjectMapper mapper;

    @GetMapping()
    public List<CodeRoomDTO> getALl(Authentication user){

        return this.mapper.mapListCodeRoomToListDTO(this.codeService.findAllByUserId(user.getName()));
    }

    @PostMapping()
    public CodeRoomDTO createCodeRoom(@RequestBody String name,Authentication user){
        CodeRoom codeRoom= new CodeRoom();

        codeRoom.setContent("");
        codeRoom.setName(name);
        codeRoom.setLanguage("plain-text");
        codeRoom.setOwner(user.getName());


        return this.mapper.mapCodeRoomToDTO(this.codeService.save(codeRoom));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") @NonNull String codeRoomId,Authentication user){

        Optional<CodeRoom> codeRoom = this.codeService.findById(codeRoomId);


       if (codeRoom.isEmpty()){
           return ResponseEntity.notFound().build();
       }

       this.codeService.addUserToCR(codeRoom.get(),user.getName());
       return ResponseEntity.ok(this.mapper.mapCodeRoomToDTO(codeRoom.get()));
    }

    @PutMapping("/updateLanguage")
    public ResponseEntity<?> updateLanguage(@RequestBody CodeRoomRequest request){

        Optional<CodeRoom> codeRoom = this.codeService.updateSettings(request.getLanguage(), request.getId());


        if (codeRoom.isEmpty())
            return ResponseEntity.notFound().build();

        log.info(codeRoom.toString());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateLanguage2(@RequestBody Map<String,Object> updateMap,@PathVariable String id){

        Optional<CodeRoom> codeRoom = this.codeService.updateFields(updateMap, id);


        if (codeRoom.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().build();
    }


    @GetMapping("/getAllShared")
    public List<CodeRoomDTO> getAllSharedCR(Authentication user){
        List<CodeRoom> list = this.codeService.getAllCodeRoomShared((user.getName()));

        return this.mapper.mapListCodeRoomToListDTO(list);
    }




}
