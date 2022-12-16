package com.github.nickklock.backend.models.enums;

public enum WindDirection {
    N("N"),
    S("S"),
    W("W"),
    E("E"),
    NW("NW"),
    NE("NE"),
    SW("SW"),
    SE("SE");

    private final String label;

    WindDirection(String label) {
        this.label = label;
    }
}
