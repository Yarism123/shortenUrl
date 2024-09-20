package org.example.shortenurl.entity.request;

import lombok.Data;

@Data
public class PostWriteRequest {
    private String password;
    private String title;
    private String author;
    private String body;
}
