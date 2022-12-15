package com.github.nickklock.backend.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Spot(
        @Id
        String id,
        String name,
        List<String> disciplines,
        List<String> waveTypes,
        List<String> beachTypes,
        List<String> experiencesLevel,
        List<String> hazards,
        List<String> bestMonths,
        List<String> bestDirections,
        List<String> waterTemperature,
        int parkingSpace,
        Position position,
        String restrooms
) {
}
