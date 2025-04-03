package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Comment;
import com.clonev2.clonev2.repository.CommentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentRepository commentRepo;

    public CommentController(CommentRepository commentRepo) {
        this.commentRepo = commentRepo;
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        try {
            List<Comment> results = commentRepo.findByPostIdOrderByCreatedAtDesc(postId);
            System.out.println("📥 Retrieved " + results.size() + " comments for post ID " + postId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> create(@PathVariable Long postId, @RequestBody Comment comment) {
        try {
            comment.setPost(new com.clonev2.clonev2.model.Post(postId));
            Comment saved = commentRepo.save(comment);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
