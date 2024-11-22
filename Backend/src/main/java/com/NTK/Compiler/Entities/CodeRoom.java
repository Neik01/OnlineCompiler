package com.NTK.Compiler.Entities;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
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


    private String owner;

    private List<String> users;

    private String language;


    public void addUser(String user){
        if (this.users == null){
            this.users = new ArrayList<>();
        }

        if(this.users.contains(user)||this.owner.equals(user)){
            return;
        }
        users.add(user);
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
