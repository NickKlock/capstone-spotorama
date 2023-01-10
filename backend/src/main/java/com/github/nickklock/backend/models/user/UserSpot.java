package com.github.nickklock.backend.models.user;

import org.springframework.data.annotation.Id;

public record UserSpot(
        @Id
        String id,
        String username,
        Author author
) {
        public UserSpot(User user) {
                this(user.id(), user.username(), user.author());
        }
}
