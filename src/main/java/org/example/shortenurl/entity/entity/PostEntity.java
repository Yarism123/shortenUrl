package org.example.shortenurl.entity.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostEntity extends BaseEntity{

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    private String password;
    private String title;
    private String author;
    private String body;

    private Long viewCount;
    private Long upVotes;
    private Long dislikeVotes;

    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
    private List<CommentEntity> comments;

    @Builder
    public PostEntity(String password, String title, String author, String body) {
        this.password = password;
        this.title = title;
        this.author = author;
        this.body = body;
        this.viewCount = 0L;
        this.upVotes = 0L;
        this.dislikeVotes = 0L;
        this.comments = new ArrayList<>();
    }

    public void increaseUpVote(){
        this.upVotes += 1;
    }

    public void increaseDislikeVote(){
        this.dislikeVotes += 1;
    }

    public void addCommentEntity(CommentEntity commentEntity){
        comments.add(commentEntity);
    }
}
