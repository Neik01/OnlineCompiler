package com.NTK.Compiler.Utils;

import com.NTK.Compiler.DTO.CodeRoomDTO;
import com.NTK.Compiler.Entities.CodeRoom;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

     CodeRoomDTO mapCodeRoomToDTO(CodeRoom codeRoom);

    List<CodeRoomDTO> mapListCodeRoomToListDTO(List<CodeRoom> codeRooms);
}
