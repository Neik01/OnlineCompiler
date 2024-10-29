package com.NTK.Compiler.RestController;

import com.NTK.Compiler.Entities.User;
import com.NTK.Compiler.Payload.Request.LoginRequest;
import com.NTK.Compiler.Payload.Request.RegisterRequest;
import com.NTK.Compiler.Payload.Response.LoginResponse;
import com.NTK.Compiler.Payload.Response.RegisterResponse;
import com.NTK.Compiler.Repository.UserRepository;
import com.NTK.Compiler.Utils.JWTUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Login request: "+loginRequest.getUsername()+" "+loginRequest.getPassword());
            User userDetails =(User) authentication.getPrincipal();
            String jwt = jwtUtils.generateToken(userDetails);
            return ResponseEntity.ok(new LoginResponse(
                    jwt,
                    userDetails.getUsername(),
                    userDetails.getId(),
                    userDetails.getEmail())
            );
        }
        catch (AuthenticationException e){
            return ResponseEntity.status(403).body(new RegisterResponse("Wrong username or password"));
        }


    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new RegisterResponse("Email existed"));
        }

        if (userRepository.existsByUsername(registerRequest.getUsername()))
            return ResponseEntity.badRequest().body(new RegisterResponse("Username existed"));

        User user = new User(registerRequest.getEmail(),
                registerRequest.getUsername(),
                encoder.encode(registerRequest.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(new RegisterResponse("Register successfully"));
    }

}
