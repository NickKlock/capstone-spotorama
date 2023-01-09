package com.github.nickklock.backend.models.user;

import org.springframework.data.annotation.Id;

public record UserSpot(
        @Id
        String id,
        String username,
        Author author
) {
}
