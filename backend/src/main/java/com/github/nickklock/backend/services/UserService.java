package com.github.nickklock.backend.services;

import com.github.nickklock.backend.exceptions.MyUsernameNotFoundException;
import com.github.nickklock.backend.exceptions.NotTheRequestedUserException;
import com.github.nickklock.backend.models.user.Author;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserRequest;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final IdService idService;
    private static final String anonymousUser = "anonymousUser";

    public UserService(UserRepo userRepo, IdService idService) {
        this.userRepo = userRepo;
        this.idService = idService;
    }

    public UserSpot createNewUser(UserRequest userRequest) {
        User savedUser = userRepo.save(new User(
                idService.generateId(),
                userRequest.username(),
                Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8().encode(userRequest.password()),
                userRequest.author()));

        return new UserSpot(savedUser.id(), savedUser.username(), savedUser.author());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(MyUsernameNotFoundException::new);
        return new org.springframework.security.core.userdetails.User(user.username(), user.password(), List.of());
    }

    public UserSpot getUserSpotBySecurityContext() {
        String userNameBySecurityContext = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<User> userByUsername = userRepo.findByUsername(userNameBySecurityContext);
        return userByUsername.map(user -> new UserSpot(user.id(), user.username(), user.author()))
                .orElse(new UserSpot("null", anonymousUser,
                        new Author(anonymousUser, "", "", Collections.emptyList())));
    }

    public UserSpot updateUser(UserRequest userRequest) {
        User user = userRepo.findByUsername(userRequest.username()).orElseThrow(MyUsernameNotFoundException::new);
        User editedUser = user.withAuthor(userRequest.author())
                .withPassword(userRequest.password())
                .withUsername(userRequest.username());

        return new UserSpot(userRepo.save(editedUser));
    }

    public UserSpot deleteUser(String id, HttpSession httpSession) {
        User userByUsername = userRepo.
                findByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(MyUsernameNotFoundException::new);

        if (id.equals(userByUsername.id())) {
            userRepo.delete(userByUsername);
            SecurityContextHolder.getContext().setAuthentication(null);
            SecurityContextHolder.clearContext();
            httpSession.invalidate();
            return new UserSpot("null", anonymousUser,
                    new Author(anonymousUser, "", "", Collections.emptyList()));
        } else {
            throw new NotTheRequestedUserException();
        }
    }
}
