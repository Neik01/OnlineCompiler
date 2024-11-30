package com.NTK.Compiler.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class WebclientConfig {

    @Value("${rapidapi.key}")
    private String rapidApiKey;

    @Bean
    public WebClient judge0Client() {
        return WebClient.builder()
                .baseUrl("https://judge0-ce.p.rapidapi.com")
                .defaultHeader("x-rapidapi-host", "judge0-ce.p.rapidapi.com")
                .defaultHeader("x-rapidapi-key", rapidApiKey)
                .build();
    }

}
