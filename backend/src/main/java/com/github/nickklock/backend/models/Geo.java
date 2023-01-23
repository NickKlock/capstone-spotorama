package com.github.nickklock.backend.models;


import java.util.Arrays;

public record Geo(
        String type,
        double[] coordinates
) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Geo geo = (Geo) o;
        return Arrays.equals(coordinates, geo.coordinates);
    }

    @Override
    public String toString() {
        return "Geo{" +
                "type='" + type + '\'' +
                ", coordinates=" + Arrays.toString(coordinates) +
                '}';
    }

    @Override
    public int hashCode() {
        return Arrays.hashCode(coordinates);
    }
}
