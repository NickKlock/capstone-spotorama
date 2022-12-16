package com.github.nickklock.backend.models.enums;

public enum BeachType {
    SAND("sand"),
    ROCKY("rocky"),
    GRASS("grass");

    private final String label;

    BeachType(String label) {
        this.label = label;
    }
}
