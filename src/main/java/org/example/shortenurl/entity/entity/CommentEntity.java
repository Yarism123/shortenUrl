package org.example.shortenurl.entity.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class CommentEntity extends BaseEntity{

    @Id @GeneratedValue
    @Column(name = "comment_id")
    private Long id;
    private String author;
    private String body;
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private PostEntity post;

    @Builder
    public CommentEntity(String author, String body, String password, PostEntity post) {
        this.author = author;
        this.body = body;
        this.password = password;
        this.post = post;
    }

    public void setPostEntity(PostEntity postEntity){
        this.post = postEntity;
    }
}
