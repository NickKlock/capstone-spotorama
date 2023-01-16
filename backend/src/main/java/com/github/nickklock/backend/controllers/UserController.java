package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.user.UserRequest;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
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
    public ResponseEntity<UserSpot> add(@RequestBody @Valid UserRequest userRequest) {
        return new ResponseEntity<>(userService.createNewUser(userRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSpot> update(@PathVariable String id, @RequestBody @Valid UserRequest userRequest) {
        return new ResponseEntity<>(userService.updateUser(id, userRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserSpot> delete(@PathVariable String id, HttpSession httpSession) {
        return new ResponseEntity<>(userService.deleteUser(id, httpSession), HttpStatus.OK);
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
