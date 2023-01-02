package com.github.nickklock.backend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class MapboxConfig {
    @Value("${mapbox.coordinate.to.country.base.url}")
    private String baseUrl;

    @Bean
    MapboxClient mapboxClient() {
        WebClient webClient = WebClient
                .builder()
                .baseUrl(baseUrl)
                .build();
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builder(WebClientAdapter.forClient(webClient)).build();
        return factory.createClient(MapboxClient.class);
    }
}
