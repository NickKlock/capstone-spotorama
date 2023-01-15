package com.github.nickklock.backend.controllers;

import com.github.nickklock.backend.models.Position;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.enums.ParkingSpace;
import com.github.nickklock.backend.repos.SpotRepo;
import mockwebserver3.MockResponse;
import mockwebserver3.MockWebServer;
import mockwebserver3.RecordedRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class SpotControllerTest {

    private final String endPoint = "/api/spots";
    @Autowired
    private MockMvc mvc;
    @Autowired
    private SpotRepo spotRepo;
    private static final MockWebServer mockWebServer = new MockWebServer();

    @DynamicPropertySource
    static void setDynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("mapbox.coordinate.to.country.base.url", () -> mockWebServer.url("/").toString());
    }
    @WithMockUser
    @Test
    void addSpot_expect_status_created() throws Exception {
        mockWebServer.enqueue(new MockResponse().setResponseCode(200)
                .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .setBody("""
                        {
                        "features":[{
                        "name":"Germany"
                        }]
                        }
                        """)
        );

        mvc.perform(post(endPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id":"",
                                "name":"a",
                                "disciplines":["KITESURFING"],
                                "waveTypes":["CHOP"],
                                "beachTypes":["SAND"],
                                "experiencesLevel":["BEGINNER"],
                                "hazards":["CURRENTS"],
                                "bestMonths":["JUNE"],
                                "bestDirections":["N"],
                                "waterTemperature":["COLD"],
                                "parkingSpace":0,
                                "position":{"lat":54.7690,"lng":9.9642},
                                "restrooms":0
                                }
                                """)

                )
                .andExpect(status().isCreated());

        RecordedRequest recordedRequest = mockWebServer.takeRequest();
        assertEquals("GET", recordedRequest.getMethod());


    }

    @Test
    void listSpots_expect_emptyList() throws Exception {
        mvc.perform(get(endPoint))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void byId_expect_404() throws Exception {
        mvc.perform(get(endPoint + "/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    void byId_expect_200() throws Exception {
        spotRepo.save(new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), ParkingSpace.FEW, new Position(0, 0, "Germany"),
                "yes"));
        mvc.perform(get(endPoint + "/0"))
                .andExpect(status().isOk());
    }
}