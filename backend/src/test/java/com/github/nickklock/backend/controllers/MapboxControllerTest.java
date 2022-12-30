package com.github.nickklock.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = {"classpath:application.properties"})
class MapboxControllerTest {

    @Autowired
    private MockMvc mvc;

    @DynamicPropertySource
    static void setDynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("mapbox.coordinate.to.country.base.url", () -> "/");
    }

    @Test
    void getToken_expect_environment_token_and_statusOk() throws Exception {
        String endpoint = "/api/mapbox";
        mvc.perform(get(endpoint))
                .andExpect(status().isOk())
                .andExpect(content().string("testToken"));
    }
}