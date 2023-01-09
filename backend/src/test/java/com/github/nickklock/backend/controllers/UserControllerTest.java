package com.github.nickklock.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.nickklock.backend.models.user.Author;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import com.github.nickklock.backend.utils.UserUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

    private final String endPoint = "/api/users/";
    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ObjectMapper objectMapper;

    @DynamicPropertySource
    static void setDynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("mapbox.coordinate.to.country.base.url", () -> "/");
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
        mvc.perform(get(endPoint + "/me"))
                .andExpect(status().isOk())
                .andReturn();

    }

    @WithMockUser
    @Test
    void me_expect_loggedInUser() throws Exception {
        mvc.perform(get(endPoint + "/me"))
                .andExpect(status().isOk());

    }

    @WithMockUser
    @Test
    void update_expect_200_and_edited_user() throws Exception {
        Author givenAuthor = new Author("nick", "n", "k", Collections.emptyList());
        User givenUser = userRepo.save(new User("1", "test", "123", givenAuthor));
        User givenUpdatedUser = givenUser.withPassword("def");

        MvcResult mvcResult = mvc.perform(put(endPoint)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(givenUpdatedUser)))
                .andExpect(status().isOk())
                .andReturn();

        UserSpot userSpotResult = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), UserSpot.class);
        UserUtil userUtil = new UserUtil();

        Assertions.assertEquals(userUtil.fromUser(givenUpdatedUser), userSpotResult);
    }

    @WithMockUser("test")
    @Test
    void delete_expect_200() throws Exception {
        Author givenAuthor = new Author("nick", "n", "k", Collections.emptyList());
        User givenUser = userRepo.save(new User("1", "test", "123", givenAuthor));

        mvc.perform(delete(endPoint + "/" + givenUser.id()))
                .andExpect(status().isOk());

    }

    @WithMockUser
    @Test
    void login_expect_200() throws Exception {
        mvc.perform(post(endPoint + "/login"))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void logout_expect_200() throws Exception {
        mvc.perform(post(endPoint + "/logout"))
                .andExpect(status().isOk());
    }
}