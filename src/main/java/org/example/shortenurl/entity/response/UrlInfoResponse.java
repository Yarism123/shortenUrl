package org.example.shortenurl.entity.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UrlInfoResponse {

    private String originalUrl;
    private String shortUrl;
    private int callCount;
    private LocalDateTime createdTime;

    @Builder
    public UrlInfoResponse(String originalUrl, String shortUrl, int callCount,LocalDateTime createdTime) {
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.callCount = callCount;
        this.createdTime = createdTime;
    }
}
