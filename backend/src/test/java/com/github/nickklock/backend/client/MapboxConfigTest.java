package com.github.nickklock.backend.client;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;

class MapboxConfigTest {

    MapboxConfig mapboxConfig = new MapboxConfig();

    @Test
    void mapboxClient_assert_that_proper_mapboxClientClass() {
        MapboxClient mapboxClient = mapboxConfig.mapboxClient();
        assertInstanceOf(MapboxClient.class, mapboxClient);
    }
}