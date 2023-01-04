package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.user.UserAuth;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.services.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserSpot add(@RequestBody UserAuth userAuth) {
        return userService.createNewUser(userAuth);
    }

    @GetMapping("/me")
    public String me() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
