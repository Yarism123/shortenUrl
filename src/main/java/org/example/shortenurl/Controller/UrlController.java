package org.example.shortenurl.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shortenurl.Service.ShortenUrlService;
import org.example.shortenurl.entity.request.CreateUrlRequest;
import org.example.shortenurl.entity.request.UrlInfoRequest;
import org.example.shortenurl.entity.response.ShortenUrlResponse;
import org.example.shortenurl.entity.response.UrlInfoResponse;
import org.example.shortenurl.entity.response.UrlListResponse;
import org.example.shortenurl.utills.RandomURLGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class UrlController {

    private final ShortenUrlService shortenUrlService;

    @ResponseBody
    @PostMapping("/createUrl")
    public ResponseEntity<ShortenUrlResponse> createUrl(@RequestBody CreateUrlRequest createUrlRequest){
        String originalUrl = createUrlRequest.getOriginalUrl();
        ShortenUrlResponse response = shortenUrlService.createShortenUrl(originalUrl);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{shortenUrl}")
    public String GoOriginalUrlByShortenUrl(@PathVariable String shortenUrl){

        String originalUrl= shortenUrlService.findOriginalUrlByShortUrl(shortenUrl);
        if(originalUrl == null){
            return "redirect:/";
        }

        return "redirect:" + originalUrl;
    }

    @GetMapping("/getUrlInfo")
    public ResponseEntity<UrlInfoResponse> getUrlInfo(@RequestParam String shortUrl){
        return shortenUrlService.findUrlInfoByShortenUrl(shortUrl);
    }

    @GetMapping("/getUrlList")
    public ResponseEntity<List<UrlListResponse>> getUrlList(){
        return shortenUrlService.getUrlList();
    }
}
