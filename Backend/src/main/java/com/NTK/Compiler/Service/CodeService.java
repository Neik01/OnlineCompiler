package com.NTK.Compiler.Service;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Repository.CodeRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CodeService {


    private final CodeRoomRepository codeRepository;

    public void save(CodeRoom snippet) {
        codeRepository.save(snippet);
    }

    public CodeRoom findById(String id) {
        return codeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

//    public CodeRoom getCodeSnippet(String id, boolean createCodeSnippet){
//
//        return codeRepository.findById(id)
//                .map()
//
//    }
}
