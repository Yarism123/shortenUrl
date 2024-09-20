package org.example.shortenurl.entity.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostListResponse {
    private Long id;
    private String title;
    private String author;
    private Long viewCount;
    private Long upVotes;
    private LocalDateTime createdDate;


    @Builder
    public PostListResponse(Long id, String title, String author, Long viewCount, Long upVotes, LocalDateTime createdDate) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.viewCount = viewCount;
        this.upVotes = upVotes;
        this.createdDate = createdDate;
    }
}
