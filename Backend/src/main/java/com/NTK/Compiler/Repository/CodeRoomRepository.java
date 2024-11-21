package com.NTK.Compiler.Repository;

import com.NTK.Compiler.Entities.CodeRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRoomRepository extends MongoRepository<CodeRoom,String> {

    @Query("{ 'owner': ?0 }")
    List<CodeRoom> findByOwner(String owner);


    List<CodeRoom> findByUsersContaining(String user);
}
