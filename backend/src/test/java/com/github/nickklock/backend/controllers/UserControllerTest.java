package com.github.nickklock.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.nickklock.backend.models.user.Author;
import com.github.nickklock.backend.models.user.User;
import com.github.nickklock.backend.models.user.UserSpot;
import com.github.nickklock.backend.repos.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
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
    void add_user_expect_status_created() throws Exception {

        MockMultipartFile user = new MockMultipartFile("userRequest", """
                {
                   "username": "nick@nick.de",
                   "password": "123fghHjasd!",
                   "author": {
                           "createdSpots": [""],
                           "firstName": "Nick",
                           "lastName": "Klockgether",
                           "nickname": "admin"
                       }
                   }
                   """.getBytes());
        MockMultipartFile file = new MockMultipartFile("file", "".getBytes());
        mvc.perform(MockMvcRequestBuilders.multipart(endPoint)
                        .file(user)
                        .file(file)
                        .with(csrf()))
                .andExpect(status().isCreated());
    }

    @Test
    void add_expect_400_because_email_fails() throws Exception {
        mvc.perform(post(endPoint)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "username": "nicknick.de",
                        "password": "123",
                        "author": {
                                "createdSpots": [],
                                "firstName": "Nick",
                                "lastName": "Klockgether",
                                "nickname": "admin"
                            }
                        }
                        """).with(csrf())
        ).andExpect(status().isBadRequest());
    }


    @Test
    void add_expect_expect_400_because_password_fails() throws Exception {
        mvc.perform(post(endPoint)
                .contentType(MediaType.APPLICATION_JSON)
                .with(csrf())
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
        ).andExpect(status().isBadRequest());
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
        User givenUser = userRepo.save(new User("1", "test@test.de", "123!", givenAuthor, ""));
        User givenUpdatedUser = givenUser.withPassword("1234Asdg!");

        MockMultipartFile user = new MockMultipartFile("userRequest", """
                {
                        "username": "test@test.de",
                        "password": "1234Asdg!",
                        "author": {
                                "createdSpots": [],
                                "firstName": "n",
                                "lastName": "k",
                                "nickname": "nick"
                            }
                        }""".getBytes());
        MockMultipartFile file = new MockMultipartFile("file", "".getBytes());

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, endPoint + "/1")
                        .file(user)
                        .file(file)
                        .with(csrf())
                        .content(objectMapper.writeValueAsString(givenUpdatedUser)))
                .andExpect(status().isOk())
                .andReturn();

        UserSpot userSpotResult = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), UserSpot.class);

        Assertions.assertEquals(new UserSpot(givenUpdatedUser), userSpotResult);
    }

    @WithMockUser("test")
    @Test
    void delete_expect_200() throws Exception {
        Author givenAuthor = new Author("nick", "n", "k", Collections.emptyList());
        User givenUser = userRepo.save(new User("1", "test", "123", givenAuthor, ""));

        mvc.perform(delete(endPoint + "/" + givenUser.id()).with(csrf()))
                .andExpect(status().isOk());

    }

    @WithMockUser("test")
    @Test
    void delete_expect_404() throws Exception {
        mvc.perform(delete(endPoint + "/" + 1).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @WithMockUser("test")
    @Test
    void delete_expect_400() throws Exception {
        Author givenAuthor = new Author("nick", "n", "k", Collections.emptyList());
        userRepo.save(new User("1", "test", "123", givenAuthor, ""));

        Author givenAuthor1 = new Author("h", "h", "h", Collections.emptyList());
        User givenUser1 = userRepo.save(new User("h", "hanna", "123", givenAuthor1, ""));

        mvc.perform(delete(endPoint + "/" + givenUser1.id()).with(csrf()))
                .andExpect(status().isBadRequest());
    }


    @WithMockUser
    @Test
    void login_expect_200() throws Exception {
        mvc.perform(post(endPoint + "/login").with(csrf()))
                .andExpect(status().isOk());
    }

    @WithMockUser
    @Test
    void logout_expect_200() throws Exception {
        mvc.perform(post(endPoint + "/logout").with(csrf()))
                .andExpect(status().isOk());
    }
}