package com.github.nickklock.backend.models.user;

public record UserAuth(
        String username,
        String password,
        Author author
) {
}
