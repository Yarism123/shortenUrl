package org.example.shortenurl.entity.response;

import lombok.Builder;
import lombok.Data;

@Data
public class ShortenUrlResponse {

    public String shortenUrl;

    @Builder
    public ShortenUrlResponse(String shortenUrl){
        this.shortenUrl = shortenUrl;
    }
}
