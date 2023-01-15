package com.github.nickklock.backend.converters;

import com.github.nickklock.backend.models.enums.ParkingSpace;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;

public class IntToParkingSpaceConverter implements Converter<Integer, ParkingSpace> {
    @Override
    public ParkingSpace convert(@NonNull Integer source) {
        if (source > 2) {
            return null;
        }

        return ParkingSpace.getByLabel(source);
    }
}
