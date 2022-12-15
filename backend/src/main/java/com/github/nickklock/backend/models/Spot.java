package com.github.nickklock.backend.models;

import java.util.List;

public record Spot(
        String id,
        String name,
        List<String> disciplines,
        List<String> wavetypes,
        List<String> beachtypes,
        List<String> experiencesLevel,
        List<String> hazards,
        List<String> bestMonths,
        List<String> bestDirections,
        List<String> waterTemperature,
        int parkingSpace,
        Position position
) {
}
