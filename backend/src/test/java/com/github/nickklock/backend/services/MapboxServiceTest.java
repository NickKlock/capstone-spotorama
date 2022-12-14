package com.github.nickklock.backend.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MapboxServiceTest {

    MapboxService mapboxService = new MapboxService();
    @Test
    void getToken_expect_environment_token() {
        String expectedToken = System.getenv("Mapbox_Token");
        String result = mapboxService.getToken();

        assertEquals(expectedToken,result);

    }
}