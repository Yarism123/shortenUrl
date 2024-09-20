package org.example.shortenurl.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.shortenurl.Repository.PostRepository;
import org.example.shortenurl.entity.entity.PostEntity;
import org.example.shortenurl.entity.request.PostPasswordCheckRequest;
import org.example.shortenurl.entity.request.PostWriteRequest;
import org.example.shortenurl.entity.request.PostVoteRequest;
import org.example.shortenurl.entity.response.PostListResponse;
import org.example.shortenurl.entity.response.PostModifyResponse;
import org.example.shortenurl.entity.response.PostViewResponse;
import org.example.shortenurl.entity.response.PostVoteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostService {

    private final PostRepository postRepository;

    public ResponseEntity<List<PostListResponse>> getPostList(){
        List<PostEntity> postList = postRepository.findAll();

        List<PostListResponse> posts = postList.stream().map(entity -> PostListResponse.builder()
                .id(entity.getId())
                .author(entity.getAuthor())
                .title(entity.getTitle())
                .createdDate(entity.getCreatedTime())
                .upVotes(entity.getUpVotes())
                .viewCount(entity.getViewCount()).build()).collect(Collectors.toList());

        return ResponseEntity.ok(posts);
    }

    public ResponseEntity<PostViewResponse> getPostView(Long postId){

        PostViewResponse response = null;
        try{
            Optional<PostEntity> findPost = postRepository.findById(postId);

            if(findPost.isEmpty()){
                return ResponseEntity.badRequest().build();
            }

            PostEntity postEntity = findPost.get();

            response = PostViewResponse.builder()
                    .postId(postEntity.getId())
                    .title(postEntity.getTitle())
                    .author(postEntity.getAuthor())
                    .body(postEntity.getBody())
                    .upVotes(postEntity.getUpVotes())
                    .dislikeVotes(postEntity.getDislikeVotes())
                    .comments(postEntity.getComments()).build();

        }catch (Exception e){
            log.info("(getPostView) error");
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<PostModifyResponse> getPostModifyInfo(Long postId){

        PostModifyResponse response = null;

        try{
            Optional<PostEntity> findPost = postRepository.findById(postId);

            PostEntity postEntity = findPost.get();

            response = PostModifyResponse.builder()
                    .postId(postEntity.getId())
                    .author(postEntity.getAuthor())
                    .title(postEntity.getTitle())
                    .body(postEntity.getBody()).build();

        }catch (Exception e){
            log.info("(getPostView) error");
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<PostModifyResponse> getPostModifyData(Long postId){

        PostModifyResponse response = null;
        try{
            PostEntity postEntity = postRepository.findById(postId).get();
            response = PostModifyResponse.builder()
                    .postId(postEntity.getId())
                    .title(postEntity.getTitle())
                    .body(postEntity.getBody())
                    .author(postEntity.getAuthor())
                    .build();

            return ResponseEntity.ok(response);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    public ResponseEntity<Void> addPost(PostWriteRequest request){
        try{
            PostEntity post = PostEntity.builder()
                    .title(request.getTitle())
                    .author(request.getAuthor())
                    .body(request.getBody())
                    .password(request.getPassword()).build();

            postRepository.save(post);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    public ResponseEntity<PostVoteResponse> changePostVotes(PostVoteRequest request){

        PostVoteResponse response = null;
        log.info("request = {}", request);

        try{
            PostEntity postEntity = postRepository.findById(request.getPostId()).get();
            if (request.getVoteType() == PostVoteRequest.VoteType.LIKE) {
                postEntity.increaseUpVote();
            } else {
                postEntity.increaseDislikeVote();
            }
            response = PostVoteResponse.builder()
                    .upVotes(postEntity.getUpVotes())
                    .dislikeVotes(postEntity.getDislikeVotes()).build();

            return ResponseEntity.ok(response);
        }catch (Exception e){
            log.error("changePostVotes error");
            return ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    public ResponseEntity<Void> deletePost(PostPasswordCheckRequest request){
        try{
            PostEntity postEntity = postRepository.findById(request.getId()).get();

            //password 검증
            if(request.getPassword().equals(postEntity.getPassword())){
                postRepository.delete(postEntity);
                return  ResponseEntity.ok().build();
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.badRequest().build();
    }
}
