package com.NTK.Compiler.Payload.Request;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SubmitCodeRequest {

    private String source_code;
    private int language_id;

    @Nullable
    private String stdin;
}
