package com.github.nickklock.backend.services;

import com.github.nickklock.backend.client.MapboxClient;
import com.github.nickklock.backend.exceptions.NoSuchSpotException;
import com.github.nickklock.backend.models.enums.ParkingSpace;
import com.github.nickklock.backend.models.geopostion.Geo;
import com.github.nickklock.backend.models.geopostion.Position;
import com.github.nickklock.backend.models.mapbox.geocoding.CountryByCord;
import com.github.nickklock.backend.models.mapbox.geocoding.Feature;
import com.github.nickklock.backend.models.spot.Spot;
import com.github.nickklock.backend.models.spot.SpotRequest;
import com.github.nickklock.backend.repos.SpotRepo;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
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

    ImageService imageService = mock(ImageService.class);
    String2JsonService string2JsonService = mock(String2JsonService.class);
    SpotService spotService =
            new SpotService(spotRepo, idService, mapboxClient, mapboxService, imageService, string2JsonService);

    final MockMultipartFile spotMultiPart = new MockMultipartFile("spot", "".getBytes());

    @Test
    void add_expect_spot_verify_use_of_implemented_services() throws IOException {

        SpotRequest spotRequest = new SpotRequest("test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW,
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0})), "Yes", spotMultiPart);


        Spot givenSpot = new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW,
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0})), "Yes", "");

        when(string2JsonService.parseJsonToClass(anyString(), any())).thenReturn(spotRequest);
        when(imageService.encodeImageToBase64(any())).thenReturn("");
        when(mapboxClient.countryByCords(any(), any(), any()))
                .thenReturn(new CountryByCord(List.of(new Feature("Germany"))));

        when(spotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        Spot result = spotService.add("", spotRequest.spotImage());

        assertEquals(givenSpot, result);
        verify(spotRepo).save(givenSpot);
        verify(mapboxClient).countryByCords(any(), any(), any());
        verify(imageService).encodeImageToBase64(any());
        verify(string2JsonService).parseJsonToClass(any(), any());

    }

    @Test
    void add_expect_spot_noFile_verify_use_of_implemented_services() throws IOException {

        SpotRequest spotRequest = new SpotRequest("test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW,
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0})), "Yes", null);


        Spot givenSpot = new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW,
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0})), "Yes", null);

        when(string2JsonService.parseJsonToClass(anyString(), any())).thenReturn(spotRequest);
        when(mapboxClient.countryByCords(any(), any(), any()))
                .thenReturn(new CountryByCord(List.of(new Feature("Germany"))));

        when(spotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        Spot result = spotService.add("", spotRequest.spotImage());

        assertEquals(givenSpot, result);
        verify(spotRepo).save(givenSpot);
        verify(mapboxClient).countryByCords(any(), any(), any());
        verify(string2JsonService).parseJsonToClass(any(), any());

    }

    @Test
    void getById_expect_throws_exception() {
        assertThrows(NoSuchSpotException.class, () -> spotService.getById("0"));
        verify(spotRepo).findById("0");
    }

    @Test
    void getById_expect_spot() {
        when(spotRepo.findById("0")).thenReturn(Optional.of(new Spot("0", "test", new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                ParkingSpace.FEW,
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0})), "Yes", "")));

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
        Position expectedResult =
                new Position("Germany",
                        new Geo("Point", new double[]{0, 0}));

        CountryByCord givenCountryByCord = new CountryByCord(List.of(new Feature("Germany")));

        when(mapboxClient.countryByCords(any(), any(), any())).thenReturn(givenCountryByCord);

        Position result = spotService.createPositionFromRawData(0, 0);

        assertEquals(expectedResult, result);
        verify(mapboxClient).countryByCords(any(), any(), any());

    }
}