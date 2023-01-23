package com.github.nickklock.backend.models.spot;

import com.github.nickklock.backend.models.enums.*;
import com.github.nickklock.backend.models.geopostion.Position;
import com.mongodb.lang.Nullable;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@With
@Document("spots")
public record Spot(
        @Id
        String id,
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
        String restrooms,
        @Nullable
        String imageBase64Encoded
) {
}
