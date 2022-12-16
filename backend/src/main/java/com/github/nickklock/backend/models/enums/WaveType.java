package com.github.nickklock.backend.models.enums;

public enum WaveType {
    CHOP("chop"),
    BIG("big"),
    FLAT("flat"),
    MEDIUM("medium"),
    SMALL("small");

    private final String label;

    WaveType(String label) {
        this.label = label;
    }
}
