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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SpotServiceTest {

    SpotRepo spotRepo = mock(SpotRepo.class);
    IdService idService = mock(IdService.class);

    MapboxClient mapboxClient = mock(MapboxClient.class);
    MapboxService mapboxService = mock(MapboxService.class);
    SpotService spotService = new SpotService(spotRepo, idService, mapboxClient, mapboxService);

    @Test
    void add_expect_spot_verify_use_of_spotRepo_and_mapbox_client() {
        SpotRequest spotRequest = new SpotRequest("test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, null), "Yes");


        Spot givenSpot = new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, "Germany"), "Yes");

        when(mapboxClient.countryByCords(any(), any(), any()))
                .thenReturn(new CountryByCord(List.of(new Feature("Germany"))));

        when(spotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        Spot result = spotService.add(spotRequest);

        assertEquals(givenSpot, result);
        verify(spotRepo).save(givenSpot);
        verify(mapboxClient).countryByCords(any(), any(), any());

    }

    @Test
    void getById_expect_throws_exception() {
        assertThrows(NoSuchSpotException.class, ()-> spotService.getById("0"));
        verify(spotRepo).findById("0");
    }

    @Test
    void getById_expect_spot() {
        when(spotRepo.findById("0")).thenReturn(Optional.of(new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW, new Position(0, 0, "Germany"), "Yes")));

        Spot result = spotService.getById("0");

        assertEquals("0", result.id());
    }

    @Test
    void getCountryByCord_expected_proper_country_by_cord() {
        CountryByCord expectedResult = new CountryByCord(List.of(new Feature("Germany")));

        when(mapboxClient.countryByCords(any(), any(), any()))
                .thenReturn(expectedResult);

        CountryByCord actualResult = spotService.getCountryByCords(0, 0);

        assertNotNull(actualResult);
        assertEquals(expectedResult, actualResult);
        verify(mapboxClient).countryByCords(any(), any(), any());

    }

    @Test
    void createPositionFromRawData() {
        Position expectedResult = new Position(0, 0, "Germany");
        CountryByCord givenCountryByCord = new CountryByCord(List.of(new Feature("Germany")));

        when(mapboxClient.countryByCords(any(), any(), any())).thenReturn(givenCountryByCord);

        Position result = spotService.createPositionFromRawData(0, 0);

        assertEquals(expectedResult, result);
        verify(mapboxClient).countryByCords(any(), any(), any());

    }
}