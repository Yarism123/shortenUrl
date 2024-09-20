package org.example.shortenurl.entity.response;

import lombok.Builder;
import lombok.Data;

@Data
public class PostVoteResponse {
    private Long upVotes;
    private Long dislikeVotes;

    @Builder
    public PostVoteResponse(Long upVotes, Long dislikeVotes) {
        this.upVotes = upVotes;
        this.dislikeVotes = dislikeVotes;
    }
}
