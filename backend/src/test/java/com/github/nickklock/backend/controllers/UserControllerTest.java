package com.github.nickklock.backend.controllers;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

    private final String endPoint = "/api/users/";
    @Autowired
    private MockMvc mvc;

    @DynamicPropertySource
    static void setDynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("mapbox.coordinate.to.country.base.url", () -> "/");
    }

    @Autowired
    private WebApplicationContext context;

    @BeforeAll
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity()).
                build();
    }


    @Test
    void add_expect_status_created() throws Exception {
        mvc.perform(post(endPoint)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "nick@nick.de",
                        "password": "123",
                        "author": {
                                "createdSpots": [],
                                "firstName": "Nick",
                                "lastName": "Klockgether",
                                "nickname": "admin"
                            }
                        }
                        """)
        ).andExpect(status().isCreated());
    }

    @Test
    void me_expect_notLoggedInUser() throws Exception {
        MvcResult mvcResult = mvc.perform(get(endPoint + "/me"))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
        assertEquals("anonymousUser", contentAsString);
    }

    @WithMockUser
    @Test
    void me_expect_loggedInUser() throws Exception {
        MvcResult mvcResult = mvc.perform(get(endPoint + "/me"))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = mvcResult.getResponse().getContentAsString();
        assertEquals("user", contentAsString);
    }
}