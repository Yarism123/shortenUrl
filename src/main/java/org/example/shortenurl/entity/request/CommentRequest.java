package org.example.shortenurl.entity.request;

import lombok.Data;

@Data
public class CommentRequest {

    private Long postId;
    private String author;
    private String body;
    private String password;

}
