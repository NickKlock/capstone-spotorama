package com.github.nickklock.backend.models.enums;

public enum Hazard {
    CURRENTS("currents"),
    ROCKS("rocks"),
    REEF("reef");

    public final String label;

    Hazard(String label) {
        this.label = label;
    }
}
