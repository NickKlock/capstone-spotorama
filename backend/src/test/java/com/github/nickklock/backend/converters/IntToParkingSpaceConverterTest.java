package com.github.nickklock.backend.converters;

import com.github.nickklock.backend.models.enums.ParkingSpace;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class IntToParkingSpaceConverterTest {

    IntToParkingSpaceConverter intToParkingSpaceConverter = new IntToParkingSpaceConverter();

    @Test
    void convert_expect_correct_enum() {
        ParkingSpace result = intToParkingSpaceConverter.convert(0);
        assertEquals(ParkingSpace.FEW, result);
    }

    @Test
    void convert_expect_null() {
        ParkingSpace result = intToParkingSpaceConverter.convert(3);
        assertNull(result);
    }
}