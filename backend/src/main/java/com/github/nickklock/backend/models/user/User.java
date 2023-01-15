package com.github.nickklock.backend.models.user;

import com.github.nickklock.backend.annotations.password.ValidPassword;
import jakarta.validation.constraints.Email;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("users")
public record User(
        @Id
        String id,
        @ValidPassword
        String username,
        @Email
        String password,
        Author author
) {

}
