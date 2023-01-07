package com.github.nickklock.backend.models.user;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("users")
public record User(
        @Id
        String id,
        String username,
        String password,
        Author author
) {

}
