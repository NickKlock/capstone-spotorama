package com.github.nickklock.backend.services;

import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserAuth;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final IdService idService;
    private final PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public UserService(UserRepo userRepo, IdService idService) {
        this.userRepo = userRepo;
        this.idService = idService;
    }

    public UserSpot createNewUser(UserAuth userAuth) {
        User savedUser = userRepo.save(new User(
                idService.generateId(),
                userAuth.username(),
                passwordEncoder.encode(userAuth.password()),
                userAuth.author()));

        return new UserSpot(savedUser.id(), savedUser.username(), savedUser.author());
    }
}
