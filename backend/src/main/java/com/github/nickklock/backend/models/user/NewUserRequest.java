package com.github.nickklock.backend.models.user;

public record NewUserRequest(
        String username,
        String password,
        Author author
) {
}
