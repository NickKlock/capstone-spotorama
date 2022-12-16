package com.github.nickklock.backend.models.enums;

public enum WaterTemperature {
    COLD("cold"),
    MILD("mild"),
    WARM("warm"),
    HOT("hot"),
    TROPICAL("tropical");

    public final String label;

    WaterTemperature(String label) {
        this.label = label.toUpperCase();
    }


}
