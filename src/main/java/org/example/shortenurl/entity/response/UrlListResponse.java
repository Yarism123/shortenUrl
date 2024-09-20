package org.example.shortenurl.entity.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UrlListResponse {

    private Long id;
    private String originalUrl;
    private String shortUrl;
    private LocalDateTime createdTime;
    private int callCount;


    @Builder
    public UrlListResponse(Long id, String originalUrl, String shortUrl, LocalDateTime createdTime, int callCount) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.createdTime = createdTime;
        this.callCount = callCount;
    }
}
