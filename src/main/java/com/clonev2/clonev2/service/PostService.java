package com.clonev2.clonev2.service;

import com.clonev2.clonev2.model.Post;
import com.clonev2.clonev2.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAllPosts() {
        return repository.findAll();
    }

    public Post createPost(Post post) {
        post.setCreatedAt(java.time.LocalDateTime.now());
        post.setLikes(0); // optional default
        return repository.save(post);
    }

    public Post incrementLikes(Long id) {
        Post post = repository.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        return repository.save(post);
    }
}

