package com.NTK.Compiler.Repository;

import com.NTK.Compiler.Entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
}
