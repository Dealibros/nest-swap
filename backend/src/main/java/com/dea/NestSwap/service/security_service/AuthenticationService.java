package com.dea.NestSwap.service.security_service;

import com.dea.NestSwap.entity.user.Role;
import com.dea.NestSwap.entity.user.User;
import com.dea.NestSwap.repository.UserRepository;
import com.dea.NestSwap.security.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        return repository.save(user);
    }

    public String login(Authentication authentication) {
        return jwtService.generateToken(authentication);
    }
}

