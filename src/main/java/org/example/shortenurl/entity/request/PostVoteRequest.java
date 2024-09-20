package org.example.shortenurl.entity.request;

import lombok.Data;


@Data
public class PostVoteRequest {
    private Long postId;
    private VoteType voteType;

    public enum VoteType {
        LIKE, DISLIKE
    }
}
