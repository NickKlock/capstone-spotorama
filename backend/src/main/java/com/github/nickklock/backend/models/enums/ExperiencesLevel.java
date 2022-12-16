package com.github.nickklock.backend.models.enums;

public enum ExperiencesLevel {
    BEGINNER("beginner"),
    ADVANCED("advanced"),
    EXPERT("expert");

    public final String label;

    ExperiencesLevel(String label) {
        this.label = label;
    }
}
