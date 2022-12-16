package com.github.nickklock.backend.models.enums;

public enum Discipline {
    KITESURFING("kitesurfing"),
    WINGSURFING("wingsurfing"),
    WINDSURFING("windsurfing"),
    SURFING("surfing");

    public final String label;
    Discipline(String label) {
        this.label = label;
    }
}
