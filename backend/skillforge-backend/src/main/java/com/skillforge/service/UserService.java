package com.skillforge.service;

import com.skillforge.dto.AuthResponse;
import com.skillforge.dto.RegisterRequest;

public interface UserService {
    AuthResponse register(RegisterRequest req);
    AuthResponse login(String email, String password);
}
