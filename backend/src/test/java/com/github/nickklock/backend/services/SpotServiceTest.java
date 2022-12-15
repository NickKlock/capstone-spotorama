package com.github.nickklock.backend.services;

import com.github.nickklock.backend.models.Position;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.repos.SpotRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SpotServiceTest {

    SpotRepo spotRepo = mock(SpotRepo.class);
    IdService idService = mock(IdService.class);
    SpotService spotService = new SpotService(spotRepo, idService);

    @Test
    void add_expect_given_and_result_equals_verify_shoprepo() {
        Spot givenSpot = new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                1, new Position(0, 0));

        when(spotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        Spot result = spotService.add(givenSpot);

        assertEquals(givenSpot, result);
        verify(spotRepo).save(givenSpot);
    }
}