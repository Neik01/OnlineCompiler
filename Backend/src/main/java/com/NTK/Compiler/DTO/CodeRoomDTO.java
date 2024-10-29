package com.NTK.Compiler.DTO;

import com.NTK.Compiler.Entities.User;

import java.util.List;
import java.util.Map;

public record CodeRoomDTO(String id, String name, String content, UserDTO owner, String language) {
}
