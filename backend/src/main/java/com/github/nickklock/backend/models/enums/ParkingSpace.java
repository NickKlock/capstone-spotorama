package com.github.nickklock.backend.models.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public enum ParkingSpace {
    FEW(0),
    ENOUGH(1),
    ALOT(2);


    ParkingSpace(int ignoredLabel) {
    }


}
