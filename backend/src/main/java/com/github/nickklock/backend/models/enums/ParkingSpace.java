package com.github.nickklock.backend.models.enums;

import java.util.Arrays;

public enum ParkingSpace {
    FEW(0),
    ENOUGH(1),
    ALOT(2);


    private final int label;

    ParkingSpace(int label) {
        this.label = label;
    }


    public static ParkingSpace getByLabel(int label) {
        return Arrays.stream(ParkingSpace.values())
                .filter(parkingSpace -> parkingSpace.label == label)
                .findFirst()
                .orElse(null);
    }
}
