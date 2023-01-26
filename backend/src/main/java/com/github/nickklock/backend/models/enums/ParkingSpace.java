package com.github.nickklock.backend.models.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ParkingSpace {
    @JsonProperty("0")
    FEW,
    @JsonProperty("1")
    ENOUGH,
    @JsonProperty("2")
    ALOT


}
