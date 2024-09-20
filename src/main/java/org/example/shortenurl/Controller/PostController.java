package org.example.shortenurl.Controller;

import lombok.RequiredArgsConstructor;
import org.example.shortenurl.Service.PostService;
import org.example.shortenurl.entity.request.PostPasswordCheckRequest;
import org.example.shortenurl.entity.request.PostWriteRequest;
import org.example.shortenurl.entity.request.PostVoteRequest;
import org.example.shortenurl.entity.response.PostListResponse;
import org.example.shortenurl.entity.response.PostModifyResponse;
import org.example.shortenurl.entity.response.PostViewResponse;
import org.example.shortenurl.entity.response.PostVoteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/getPostList")
    public ResponseEntity<List<PostListResponse>> getPostList(){
        return postService.getPostList();
    }

    @GetMapping("/postView/{postId}")
    public ResponseEntity<PostViewResponse> getPostView(@PathVariable Long postId){
        return postService.getPostView(postId);
    }
    @GetMapping("/post/modify")
    public ResponseEntity<PostModifyResponse> getPostModifyData(@RequestParam Long postId){
        return postService.getPostModifyData(postId);
    }

    @PostMapping("/addPost")
    public ResponseEntity<Void> addPost(@RequestBody PostWriteRequest request){
        return postService.addPost(request);
    }

    @PostMapping("/post/recommend")
    public ResponseEntity<PostVoteResponse> changePostVotes(@RequestBody PostVoteRequest request){
        return postService.changePostVotes(request);
    }

    @PostMapping("/post/passwordCheck")
    public ResponseEntity<Void> deletePost(@RequestBody PostPasswordCheckRequest request){
        return postService.deletePost(request);
    }

}
