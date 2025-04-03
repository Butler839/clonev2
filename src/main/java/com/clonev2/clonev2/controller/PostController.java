package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Post;
import com.clonev2.clonev2.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        this.service = service;
    }

    // ✅ Get all posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        System.out.println("📬 GET /api/posts");
        List<Post> posts = service.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // ✅ Create new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Post saved = service.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ Like a post
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        try {
            Post updated = service.incrementLikes(id);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            System.err.println("❌ Failed to like post ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
    }
}
