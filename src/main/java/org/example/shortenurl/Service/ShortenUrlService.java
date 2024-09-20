package org.example.shortenurl.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shortenurl.Repository.ShortenUrlRepository;
import org.example.shortenurl.entity.entity.ShortenUrlEntity;
import org.example.shortenurl.entity.response.ShortenUrlResponse;
import org.example.shortenurl.entity.response.UrlInfoResponse;
import org.example.shortenurl.entity.response.UrlListResponse;
import org.example.shortenurl.utills.RandomURLGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ShortenUrlService {

    private final ShortenUrlRepository urlRepository;

    @Transactional
    public ShortenUrlResponse createShortenUrl(String originalUrl){
        String shortenURL = RandomURLGenerator.generateRandomString();

        ShortenUrlEntity entity = ShortenUrlEntity.builder()
                .originalUrl(originalUrl)
                .shortUrl(shortenURL).build();

        urlRepository.save(entity);

        return ShortenUrlResponse.builder().shortenUrl(shortenURL).build();
    }

    @Transactional
    public String findOriginalUrlByShortUrl(String shortUrl){

        if(shortUrl.length() != RandomURLGenerator.getLength()){
            return null;
        }

        ShortenUrlEntity byShortUrl = urlRepository.findByShortUrl(shortUrl);

        if(byShortUrl == null){
            return null;
        }

        byShortUrl.addCallCount();

        log.info("callCount = {}",byShortUrl.getCallCount());

        return byShortUrl.getOriginalUrl();
    }

    public ResponseEntity<UrlInfoResponse> findUrlInfoByShortenUrl(String shortUrl){

            shortUrl = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
            log.info("[findUrlInfoByShortenUrl] shortUrl = {}",shortUrl);

            //글자수 다를경우 badRequest
            if(shortUrl.length() != RandomURLGenerator.getLength()){
                return ResponseEntity.badRequest().build();
            }

        ShortenUrlEntity byShortUrl = urlRepository.findByShortUrl(shortUrl);
        if(byShortUrl == null){
            return ResponseEntity.badRequest().build();
        }

        UrlInfoResponse response = UrlInfoResponse.builder()
                .originalUrl(byShortUrl.getOriginalUrl())
                .shortUrl(byShortUrl.getShortUrl())
                .callCount(byShortUrl.getCallCount())
                .createdTime(byShortUrl.getCreatedTime()).build();

        log.info("response = {}", response);
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<UrlListResponse>> getUrlList(){
        List<UrlListResponse> urlLists = urlRepository.findAll()
                .stream().map(urlEntity ->
                    UrlListResponse.builder()
                            .id(urlEntity.getId())
                            .originalUrl(urlEntity.getOriginalUrl())
                            .shortUrl(urlEntity.getShortUrl())
                            .createdTime(urlEntity.getCreatedTime())
                            .callCount(urlEntity.getCallCount())
                            .build()).collect(Collectors.toList());

        return ResponseEntity.ok(urlLists);
    }
}
