package com.github.nickklock.backend.client;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class MapboxConfig {

    @Bean
    MapboxClient mapboxClient() {
        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://api.mapbox.com/geocoding/v5/mapbox.places/")
                .build();
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(webClient)).build();
        return factory.createClient(MapboxClient.class);
    }
}
