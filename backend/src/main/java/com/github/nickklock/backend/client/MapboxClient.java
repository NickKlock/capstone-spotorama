package com.github.nickklock.backend.client;

import com.github.nickklock.backend.models.mapbox.geocoding.CountryByCord;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.service.annotation.GetExchange;

public interface MapboxClient {
    @GetExchange(url = "{lng},{lat}.json?types=country&limit=1&access_token={token}")
    CountryByCord countryByCords(@PathVariable("lng") String lng,
                                 @PathVariable("lat") String lat,
                                 @PathVariable("token") String token);
}
