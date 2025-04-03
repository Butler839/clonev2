package com.clonev2.clonev2.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;

    private int likes = 0;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    private Book book;

    // 🔧 Constructors
    public Post() {
        // Default constructor for JPA
    }

    public Post(Long id) {
        this.id = id;
    }

    // 🧱 Getters and Setters
    public Long getId() { return id; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }
}