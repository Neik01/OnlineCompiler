package com.NTK.Compiler.Repository;

import com.NTK.Compiler.Entities.CodeRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeRoomRepository extends MongoRepository<CodeRoom,String> {
}
