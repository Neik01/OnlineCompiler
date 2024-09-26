package com.NTK.Compiler.Service;

import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Repository.CodeRoomRepository;
import com.NTK.Compiler.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final CodeRoomRepository codeRoomRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

}
