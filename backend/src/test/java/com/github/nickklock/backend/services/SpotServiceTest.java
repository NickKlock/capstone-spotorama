package com.github.nickklock.backend.services;

import com.github.nickklock.backend.client.MapboxClient;
import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.Position;
import com.github.nickklock.backend.models.Spot;
import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.models.enums.ParkingSpace;
import com.github.nickklock.backend.models.geocoding.CountryByCord;
import com.github.nickklock.backend.models.geocoding.Feature;
import com.github.nickklock.backend.repos.SpotRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class SpotServiceTest {

    SpotRepo spotRepo = mock(SpotRepo.class);
    IdService idService = mock(IdService.class);

    //mocking for some reason didn't work ,
    //always returned null with when(mapboxClient.get..()).thenReturn(new CountryByCord(List.of(new Feature("Germany"))))
    MapboxClient mapboxClient = (lng, lat, token) -> new CountryByCord(List.of(new Feature("Germany")));
    SpotService spotService = new SpotService(spotRepo, idService, mapboxClient);

    @Test
    void add_expect_given_and_result_equals_verify_shoprepo() {
        SpotRequest spotRequest = new SpotRequest("test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, null), "Yes");


        Spot givenSpot = new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, "Germany"), "Yes");

        when(spotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        Spot result = spotService.add(spotRequest);

        assertEquals(givenSpot, result);
        verify(spotRepo).save(givenSpot);
    }

    @Test
    void getById_expect_throws_exception() {
        assertThrows(NoSuchSpotException.class, ()-> spotService.getById("0"));
        verify(spotRepo).findById("0");
    }

    @Test
    void getById_expect_spot(){
        when(spotRepo.findById("0")).thenReturn(Optional.of(new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, "Germany"), "Yes")));

        Spot result = spotService.getById("0");

        assertEquals("0",result.id());
    }
}