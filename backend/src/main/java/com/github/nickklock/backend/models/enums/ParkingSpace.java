package com.github.nickklock.backend.models.enums;

public enum ParkingSpace {
    FEW(0),
    ENOUGH(1),
    ALOT(2);


    private final int label;

    ParkingSpace(int label) {
        this.label = label;
    }
}
