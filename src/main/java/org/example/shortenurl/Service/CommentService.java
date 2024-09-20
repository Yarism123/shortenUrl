package org.example.shortenurl.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shortenurl.Repository.CommentRepository;
import org.example.shortenurl.Repository.PostRepository;
import org.example.shortenurl.entity.entity.CommentEntity;
import org.example.shortenurl.entity.entity.PostEntity;
import org.example.shortenurl.entity.request.CommentDeleteRequest;
import org.example.shortenurl.entity.request.CommentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public ResponseEntity<Void> addComment(CommentRequest request){

        try{
            Optional<PostEntity> findPost = postRepository.findById(request.getPostId());

            if(findPost.isEmpty()){
                return ResponseEntity.badRequest().build();
            }
            PostEntity postEntity = findPost.get();

            CommentEntity commentEntity = CommentEntity.builder()
                    .author(request.getAuthor())
                    .body(request.getBody())
                    .password(request.getPassword()).build();

            postEntity.addCommentEntity(commentEntity);
            commentEntity.setPostEntity(postEntity);

            log.info("postEntity = {}",postEntity);
            log.info("commentEntity = {}",commentEntity);

            commentRepository.save(commentEntity);
        }catch(Exception e){
            log.error("(addComment) error this function");
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<Void> deleteComment(CommentDeleteRequest request){
        try{
            Optional<CommentEntity> findComment = commentRepository.findById(request.getId());
            CommentEntity commentEntity = findComment.get();

            //password 검증
            if(request.getPassword().equals(commentEntity.getPassword())){
                commentRepository.delete(commentEntity);
                return  ResponseEntity.ok().build();
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
