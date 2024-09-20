package org.example.shortenurl.entity.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.shortenurl.entity.entity.CommentEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostViewResponse {
    private Long postId;
    private String title;
    private String author;
    private String body;
    private Long upVotes;
    private Long dislikeVotes;

    private List<CommentEntityResponse> comments;

    @Builder
    public PostViewResponse(Long postId, String title, String author, String body, Long upVotes, Long dislikeVotes,List<CommentEntity> comments) {
        this.postId = postId;
        this.title = title;
        this.author = author;
        this.body = body;
        this.upVotes = upVotes;
        this.dislikeVotes = dislikeVotes;

        this.comments = comments.stream().map(entity -> CommentEntityResponse.builder()
                .id(entity.getId())
                .author(entity.getAuthor())
                .body(entity.getBody())
                .createdDate(entity.getCreatedTime()).build()).collect(Collectors.toList());

    }
}

@Data
class CommentEntityResponse {
    private Long id;
    private String author;
    private String body;
    private LocalDateTime createdDate;

    @Builder
    public CommentEntityResponse(Long id, String author, String body,LocalDateTime createdDate) {
        this.id = id;
        this.author = author;
        this.body = body;
        this.createdDate = createdDate;
    }
}
