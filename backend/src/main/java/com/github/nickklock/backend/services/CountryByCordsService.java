package com.github.nickklock.backend.services;

import com.github.nickklock.backend.models.SpotRequest;
import com.github.nickklock.backend.models.geocoding.CountryByCord;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class CountryByCordsService {
    private final WebClient webClient;

    public CountryByCordsService() {
        this.webClient = WebClient
                .builder()
                .baseUrl("https://api.mapbox.com/geocoding/v5/mapbox.places/")
                .build();
    }

    public CountryByCord getCountryByCords(SpotRequest spotRequest) {
        return this.webClient
                .get()
                .uri(spotRequest.position().lng() + "," + spotRequest.position().lat() + ".json" +
                        "?types=country&limit=1&access_token=" + System.getenv("Mapbox_Token"))
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(CountryByCord.class))
                .block();
    }
}
