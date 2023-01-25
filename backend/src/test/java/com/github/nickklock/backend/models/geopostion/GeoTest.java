package com.github.nickklock.backend.models.geopostion;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class GeoTest {
    @Test
    void testEquals() {
        Geo geo1 = new Geo("Point", new double[]{1, 2});
        Geo geo2 = new Geo("Point", new double[]{1, 2});
        Geo geo3 = new Geo("Point", new double[]{3, 4});

        assertEquals(geo1, geo2);
        assertNotEquals(geo1, geo3);
    }

    @Test
    void testToString() {
        Geo geo = new Geo("Point", new double[]{1, 2});
        String expected = "Geo{type='Point', coordinates=[1.0, 2.0]}";
        assertEquals(expected, geo.toString());
    }

    @Test
    void testHashCode() {
        Geo geo1 = new Geo("Point", new double[]{1, 2});
        Geo geo2 = new Geo("Point", new double[]{1, 2});
        Geo geo3 = new Geo("Point", new double[]{3, 4});

        assertEquals(geo1.hashCode(), geo2.hashCode());
        assertNotEquals(geo1.hashCode(), geo3.hashCode());
    }
}