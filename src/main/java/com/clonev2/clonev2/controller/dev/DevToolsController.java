package com.clonev2.clonev2.controller.dev;

import com.clonev2.clonev2.repository.BookRepository;
import com.clonev2.clonev2.repository.PostRepository;
import com.clonev2.clonev2.repository.CommentRepository;
import com.clonev2.clonev2.repository.ReviewRepository;
import com.clonev2.clonev2.DataSeeder;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dev")
@Profile("dev")
public class DevToolsController {

    private final BookRepository bookRepo;
    private final PostRepository postRepo;
    private final CommentRepository commentRepo;
    private final ReviewRepository reviewRepo;
    private final DataSeeder dataSeeder;

    public DevToolsController(BookRepository bookRepo, PostRepository postRepo,
                              CommentRepository commentRepo, ReviewRepository reviewRepo,
                              DataSeeder dataSeeder) {
        this.bookRepo = bookRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.reviewRepo = reviewRepo;
        this.dataSeeder = dataSeeder;
    }

    @PostMapping("/reset-posts")
    public String resetPosts() {
        commentRepo.deleteAll();
        postRepo.deleteAll();
        dataSeeder.seedData();
        return "✅ Reset and reseeded posts + comments.";
    }

    @PostMapping("/reset-reviews")
    public String resetReviews() {
        reviewRepo.deleteAll();
        dataSeeder.seedData();
        return "✅ Reset and reseeded reviews.";
    }

    @PostMapping("/reset-all")
    public String resetAll() {
        reviewRepo.deleteAll();
        commentRepo.deleteAll();
        postRepo.deleteAll();
        // bookRepo.deleteAll(); // optional: uncomment if you want to wipe books too
        dataSeeder.seedData();
        return "✅ Reset and reseeded posts, comments, reviews (books preserved).";
    }
}
