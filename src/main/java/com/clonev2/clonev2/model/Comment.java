package com.clonev2.clonev2.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "post"}) // avoids lazy loading issues in JSON
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String commenter;
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public Comment() {}

    // Getters
    public Long getId() {
        return id;
    }

    public String getCommenter() {
        return commenter;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Post getPost() {
        return post;
    }

    // Setters
    public void setCommenter(String commenter) {
        this.commenter = commenter;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

