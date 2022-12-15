package com.github.nickklock.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class SpotControllerTest {

    private final String endPoint = "/api/spots";
    @Autowired
    private MockMvc mvc;

    @Test
    void addSpot_expect_status_created() throws Exception {
        mvc.perform(post(endPoint)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"id":"1",
                        "name":"test",
                        "disciplines":["kitesurfing"],
                        "wavetypes":["chop"],
                        "beachtypes":["sand"],
                        "experiencesLevel":["beginner"],
                        "hazards":["currents"],
                        "bestMonths":["May"],
                        "bestDirections":["N"],
                        "waterTemperature":["0-6"],
                        "parkingSpace":0,
                        "location":{"lat":54.7687425,"lng":9.9613969},
                        "restrooms":"Yes"
                        }
                        """)).andExpect(status().isCreated());
    }
}