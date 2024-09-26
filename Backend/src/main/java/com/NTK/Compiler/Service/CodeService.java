package com.NTK.Compiler.Service;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Repository.CodeRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CodeService {


    private final CodeRoomRepository codeRepository;


    public List<CodeRoom> findAll(){

        return codeRepository.findAll();
    }

    public CodeRoom save(CodeRoom room) {
        return codeRepository.save(room);
    }

    public Optional<CodeRoom> findById(String id) {
        
        return codeRepository.findById(id);


    }

    public List<CodeRoom> findAllByUserId(String userId){
        return Optional.ofNullable(codeRepository.findAllByUserId(userId))
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

}
