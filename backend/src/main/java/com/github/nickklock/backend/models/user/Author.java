package com.github.nickklock.backend.models.user;

import java.util.List;

public record Author(
        String nickname,
        String firstName,
        String lastName,
        List<String> createdSpots
) {
}
