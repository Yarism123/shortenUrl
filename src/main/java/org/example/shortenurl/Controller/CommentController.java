package org.example.shortenurl.Controller;

import lombok.RequiredArgsConstructor;
import org.example.shortenurl.Service.CommentService;
import org.example.shortenurl.entity.request.CommentDeleteRequest;
import org.example.shortenurl.entity.request.CommentRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/addComment")
    public ResponseEntity<Void> addComment(@RequestBody CommentRequest request){
        return commentService.addComment(request);
    }

    @PostMapping("/comment/deleteComment")
    public ResponseEntity<Void> deleteComment(@RequestBody CommentDeleteRequest request){
        return commentService.deleteComment(request);
    }
}
