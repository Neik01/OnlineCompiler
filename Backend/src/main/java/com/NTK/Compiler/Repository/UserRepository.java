package com.NTK.Compiler.Repository;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Update;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {

    @Update("{'$push': {'codeRooms' : ?1 }}")
    void findAndPushCodeRoomsById(String id, CodeRoom codeRoom);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
