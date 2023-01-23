package com.github.nickklock.backend.models.spot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.nickklock.backend.models.enums.*;
import com.github.nickklock.backend.models.geopostion.Position;
import lombok.With;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@With
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
        String restrooms,
        @JsonIgnore
        MultipartFile spotImage
) {
}
