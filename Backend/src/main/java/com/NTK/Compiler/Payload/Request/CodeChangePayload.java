package com.NTK.Compiler.Payload.Request;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CodeChangePayload {

    String content;
    String roomId;
    String userId;

}
