package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Comment;
import com.clonev2.clonev2.repository.CommentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    private final CommentRepository commentRepo;

    public CommentController(CommentRepository commentRepo) {
        this.commentRepo = commentRepo;
    }

    @GetMapping("/{postId}")
    public List<Comment> getComments(@PathVariable Long postId) {
        return commentRepo.findByPostIdOrderByCreatedAtDesc(postId);
    }

    @PostMapping("/{postId}")
    public Comment create(@PathVariable Long postId, @RequestBody Comment comment) {
        comment.setPost(new com.clonev2.clonev2.model.Post(postId));
        return commentRepo.save(comment);
    }
}
