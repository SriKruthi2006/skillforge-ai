package com.skillforge.service;

import java.time.LocalDateTime;
import java.util.Random;

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
    private final EmailService emailService;

    // 🔥 MANUAL CONSTRUCTOR (NO LOMBOK)
    public AuthService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       EmailService emailService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
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

    // === OTP PASSWORD RESET ===

    /**
     * Generates a 6-digit OTP, stores it with expiry, and emails the user.
     * Does nothing if email is not associated with an account.
     */
    public void sendOtp(String email) {
        userRepo.findByEmail(email).ifPresent(user -> {
            String otp = String.format("%06d", new Random().nextInt(999_999));
            user.setResetOtp(otp);
            user.setResetOtpExpiry(LocalDateTime.now().plusMinutes(10));
            userRepo.save(user);
            emailService.sendOtpEmail(user.getEmail(), otp);
        });
    }

    /**
     * Verifies the supplied OTP for the given email.
     * @throws RuntimeException if validation fails.
     */
    public boolean verifyOtp(String email, String otp) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (user.getResetOtp() == null ||
            user.getResetOtpExpiry() == null ||
            user.getResetOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        if (!user.getResetOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        return true;
    }

    public void resetPasswordWithOtp(String email, String otp, String newPassword) {
        // verify will throw if anything is wrong
        verifyOtp(email, otp);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetOtp(null);
        user.setResetOtpExpiry(null);
        userRepo.save(user);
    }
}