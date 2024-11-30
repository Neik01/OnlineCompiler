package com.NTK.Compiler.Service;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Repository.CodeRoomRepository;
//import com.NTK.Compiler.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.ReflectionUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CodeService {


    private final CodeRoomRepository codeRepository;
//    private final UserRepository userRepository;



    public CodeRoom save(CodeRoom room) {
        return codeRepository.save(room);
    }

    public Optional<CodeRoom> findById(String id) {
        
        return codeRepository.findById(id);
    }

    public List<CodeRoom> findAllByUserId(String userId){
        return Optional.ofNullable(codeRepository.findByOwner(userId))
                .stream()
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }

    public void updateContent(String content,String id) {
        Optional<CodeRoom> codeRoom = this.codeRepository.findById(id);

        if (codeRoom.isPresent()){
            codeRoom.get().setContent(content);
            this.codeRepository.save(codeRoom.get());
        }
    }

    public Optional<CodeRoom> updateSettings(String language,String id){
        Optional<CodeRoom> codeRoom = this.codeRepository.findById(id);

        if(codeRoom.isPresent()){

            codeRoom.get().setLanguage(language);
            this.codeRepository.save(codeRoom.get());
        }

        return  codeRoom;
    }


    public Optional<CodeRoom> updateFields(Map<String,Object> updateMap, String id){
        Optional<CodeRoom> codeRoom = this.codeRepository.findById(id);

        if(codeRoom.isPresent()){

            CodeRoom updateCR = codeRoom.get();

            updateMap.forEach((key,value)->{
                Field field = ReflectionUtils.findField(CodeRoom.class,field1 -> field1.getName().equals(key));
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, updateCR, value);
                }
            });

            this.codeRepository.save(codeRoom.get());
        }

        return  codeRoom;
    }


    public void addUserToCR(CodeRoom cr,String user){

        cr.addUser(user);

        this.codeRepository.save(cr);
    }


    public List<CodeRoom> getAllCodeRoomShared(String userId){
        return  Optional.ofNullable(codeRepository.findByUsersContaining(userId))
                .stream()
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}
