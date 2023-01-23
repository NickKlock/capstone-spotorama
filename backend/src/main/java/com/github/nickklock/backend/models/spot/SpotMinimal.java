package com.github.nickklock.backend.models.spot;

import com.github.nickklock.backend.models.enums.Discipline;
import com.github.nickklock.backend.models.enums.WaveType;
import com.github.nickklock.backend.models.enums.WindDirection;
import com.github.nickklock.backend.models.geopostion.Position;

import java.util.List;

public record SpotMinimal(
        String id,
        String name,
        List<Discipline> disciplines,
        List<WindDirection> bestDirections,
        List<WaveType> waveTypes,
        Position position
) {
    public SpotMinimal(Spot spot) {
        this(spot.id(), spot.name(), spot.disciplines(), spot.bestDirections(), spot.waveTypes(), spot.position());
    }
}
