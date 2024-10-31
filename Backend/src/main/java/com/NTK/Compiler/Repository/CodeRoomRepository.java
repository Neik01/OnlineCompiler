package com.NTK.Compiler.Repository;

import com.NTK.Compiler.Entities.CodeRoom;
import org.bson.types.Code;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRoomRepository extends MongoRepository<CodeRoom,String> {

    @Query("{ 'owner.id': ?0 }")
    List<CodeRoom> findByOwnerId(String userId);

    @Query("{ 'users.$id' : ObjectId(?0) }")
    List<CodeRoom> findByUserInCodeRooms(String userId);
}
