package com.github.nickklock.backend.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.nickklock.backend.annotations.password.ValidPassword;
import jakarta.validation.constraints.Email;
import lombok.With;
import org.springframework.web.multipart.MultipartFile;

@With
public record UserRequest(
        @Email
        String username,
        @ValidPassword
        String password,
        Author author,
        @JsonIgnore
        MultipartFile avatar
) {
}
