package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.user.UserRequest;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserSpot> add(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(userService.createNewUser(userRequest), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<UserSpot> update(@RequestBody UserRequest userRequest) {
        return new ResponseEntity<>(userService.updateUser(userRequest), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<UserSpot> me() {
        return new ResponseEntity<>(userService.getUserSpotBySecurityContext(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserSpot> login() {
        return new ResponseEntity<>(userService.getUserSpotBySecurityContext(), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public void logout() {
        //Gets handled by Spring Security
    }

}
