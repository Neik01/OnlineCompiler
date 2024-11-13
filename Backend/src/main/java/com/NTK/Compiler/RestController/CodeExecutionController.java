package com.NTK.Compiler.RestController;

import com.NTK.Compiler.Payload.Request.SubmitCodeRequest;
import com.NTK.Compiler.Payload.Response.Judge0Response;
import com.NTK.Compiler.Payload.Response.SubmitCodeResponse;
import com.NTK.Compiler.Service.CodeExecService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/codeExec")
@RequiredArgsConstructor
@Slf4j
public class CodeExecutionController {

    private final CodeExecService codeExecutionService;

    @PostMapping("/execute")
    public Mono<Judge0Response> executeCode(@RequestBody SubmitCodeRequest request) {

        return codeExecutionService.submitCode(request)
                .flatMap(codeExecutionService::getCodeExecResult);
    }
}
