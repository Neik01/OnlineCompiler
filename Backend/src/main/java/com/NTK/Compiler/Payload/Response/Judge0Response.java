package com.NTK.Compiler.Payload.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Judge0Response {
    // Getters and setters
    private String stdout;
    private String time;
    private int memory;
    private String stderr;
    private String token;
    private String compile_output;
    private String message;
    private Status status;

    @Setter
    @Getter
    public static class Status {
        // Getters and setters
        private int id;
        private String description;

    }
}

