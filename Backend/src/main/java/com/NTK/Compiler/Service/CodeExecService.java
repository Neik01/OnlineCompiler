package com.NTK.Compiler.Service;


import com.NTK.Compiler.Payload.Request.SubmitCodeRequest;
import com.NTK.Compiler.Payload.Response.Judge0Response;
import com.NTK.Compiler.Payload.Response.SubmitCodeResponse;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeExecService {

    @Qualifier("judge0Client")
    private final WebClient judge0Client;

    @Value("${rapidapi.url}")
    private String rapidApiUrl;

    public Mono<String> submitCode(SubmitCodeRequest request) {


        return judge0Client.post()
                .uri(rapidApiUrl + "/submissions?base64_encoded=true")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(SubmitCodeResponse.class)
                .map(SubmitCodeResponse::getToken)
                ;

    }

   public Mono<Judge0Response> getCodeExecResult(String token){
       return judge0Client.get()
               .uri("/submissions/{token}?base64_encoded=true", token)
               .retrieve()
               .bodyToMono(Judge0Response.class)
               .flatMap(result -> {
                   // If status is "In Queue" or "Processing", retry after a delay
                   if (result.getStatus().getId() == 1 || result.getStatus().getId() == 2) {
                       return Mono.delay(Duration.ofSeconds(2))  // Delay for 2 seconds before retry
                               .flatMap(t -> getCodeExecResult(token)); // Recursive call
                   } else {
                       return Mono.just(result); // Final status, return result
                   }
               });
   }
}
