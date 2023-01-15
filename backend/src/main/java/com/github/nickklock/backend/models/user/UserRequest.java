package com.github.nickklock.backend.models.user;

import com.github.nickklock.backend.annotations.password.ValidPassword;
import jakarta.validation.constraints.Email;

public record UserRequest(
        @Email
        String username,
        @ValidPassword
        String password,
        Author author
) {
}
