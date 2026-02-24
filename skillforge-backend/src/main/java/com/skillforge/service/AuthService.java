package com.skillforge.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillforge.dto.AuthResponse;
import com.skillforge.dto.LoginRequest;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.entity.User;
import com.skillforge.repository.UserRepository;
import com.skillforge.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // 🔥 MANUAL CONSTRUCTOR (NO LOMBOK)
    public AuthService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // 🔥 REGISTER
    public AuthResponse register(RegisterRequest req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User(
                req.getName(),
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                User.Role.valueOf(req.getRole().toUpperCase())
        );

        userRepo.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    // 🔥 LOGIN
    public AuthResponse login(LoginRequest req) {

    User user = userRepo.findByEmail(req.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtService.generateToken(user.getEmail());

    return new AuthResponse(
            token,
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole().name()
    );
}
}