package com.github.nickklock.backend.services;

import com.github.nickklock.backend.exceptions.MyUsernameNotFoundException;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserAuth;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(MyUsernameNotFoundException::new);
        return new org.springframework.security.core.userdetails.User(user.username(), user.password(), List.of());
    }
}
