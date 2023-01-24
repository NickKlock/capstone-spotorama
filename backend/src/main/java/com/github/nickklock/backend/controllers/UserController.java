package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.user.UserRequest;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/users/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UserSpot>
    add(@RequestPart("userRequest") UserRequest userRequest,
        @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(userService.createNewUser(userRequest, file), HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<UserSpot>
    update(@PathVariable String id,
           @RequestPart("userRequest") UserRequest userRequest,
           @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return new ResponseEntity<>(userService.updateUser(id, userRequest, file), HttpStatus.OK);
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
