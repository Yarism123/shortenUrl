package org.example.shortenurl.entity.request;

import lombok.Data;

@Data
public class PostPasswordCheckRequest {

    private Long id;
    private String password;
}
