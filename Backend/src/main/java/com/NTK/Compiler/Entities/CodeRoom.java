package com.NTK.Compiler.Entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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


    public void addUser(User user){
        if (this.users == null){
            this.users = new ArrayList<>();
        }

        users.add(user);
    }

    public void removeUser(User user){

        this.users.remove(user);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CodeRoom codeRoom = (CodeRoom) obj;
        return Objects.equals(id, codeRoom.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
