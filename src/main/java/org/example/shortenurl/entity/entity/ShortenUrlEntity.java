package org.example.shortenurl.entity.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ShortenUrlEntity extends BaseEntity{

    @Id @GeneratedValue
    private Long id;

    private String originalUrl;
    private String shortUrl;
    private int callCount = 0;

    @Builder
    public ShortenUrlEntity(String originalUrl,String shortUrl){
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
    }

    public void addCallCount(){
        callCount++;
    }
}
