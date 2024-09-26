package com.NTK.Compiler.Utils;

import com.NTK.Compiler.DTO.CodeRoomDTO;
import com.NTK.Compiler.DTO.UserDTO;
import com.NTK.Compiler.Entities.CodeRoom;
import com.NTK.Compiler.Entities.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    List<UserDTO> mapListUserToListDTO(List<User> user);

    UserDTO mapUserToDto(User user);

    CodeRoomDTO mapCodeRoomToDTO(CodeRoom codeRoom);

    List<CodeRoomDTO> mapListCodeRoomToListDTO(List<CodeRoom> codeRooms);
}
