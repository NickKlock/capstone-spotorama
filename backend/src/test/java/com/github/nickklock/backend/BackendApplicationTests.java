package com.github.nickklock.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest
class BackendApplicationTests {

    @DynamicPropertySource
    static void setDynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("mapbox.coordinate.to.country.base.url", () -> "/");
    }

    @Test
    void contextLoads() {
    }

}
