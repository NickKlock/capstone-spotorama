package com.github.nickklock.backend.models;

import org.bson.types.Binary;

public record Photo(
        String title,
        Binary image
) {
}
