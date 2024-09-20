package org.example.shortenurl.entity.response;

import lombok.Builder;
import lombok.Data;

@Data
public class PostModifyResponse {

    private String title;
    private String author;
    private Long postId;
    private String body;


    @Builder
    public PostModifyResponse(String title, String author, Long postId, String body) {
        this.title = title;
        this.author = author;
        this.postId = postId;
        this.body = body;
    }
}
