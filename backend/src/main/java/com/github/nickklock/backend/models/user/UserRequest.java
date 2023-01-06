package com.github.nickklock.backend.models.user;

public record UserRequest(
        String username,
        String password,
        Author author
) {
}
