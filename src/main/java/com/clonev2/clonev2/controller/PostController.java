package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Post;
import com.clonev2.clonev2.service.PostService;
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

    @GetMapping
    public List<Post> getAllPosts() {
        return service.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return service.createPost(post);
    }

    @PostMapping("/{id}/like")
    public Post likePost(@PathVariable Long id) {
        return service.incrementLikes(id);
    }

}

