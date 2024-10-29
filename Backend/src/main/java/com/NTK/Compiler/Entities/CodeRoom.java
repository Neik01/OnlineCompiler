package com.NTK.Compiler.Entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "code_room")
public class CodeRoom {


    @Id
    private String id;

    private String content;

    private String name;
    @DBRef
    private User owner;


    @DBRef(lazy = true)
    @JsonIgnoreProperties("codeRooms")
    private List<User> users;

    private String language;

    private boolean canEdit;

}
