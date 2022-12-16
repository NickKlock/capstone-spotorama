package com.github.nickklock.backend.models;

import com.github.nickklock.backend.models.enums.*;

import java.util.List;

public record SpotRequest(
        String name,
        List<Discipline> disciplines,
        List<WaveType> waveTypes,
        List<BeachType> beachTypes,
        List<ExperiencesLevel> experiencesLevel,
        List<Hazard> hazards,
        List<Month> bestMonths,
        List<WindDirection> bestDirections,
        List<WaterTemperature> waterTemperature,
        ParkingSpace parkingSpace,
        Position position,
        String restrooms
) {
}
