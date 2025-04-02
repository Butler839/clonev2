package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Review;
import com.clonev2.clonev2.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books/{slug}/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @GetMapping
    public List<Review> getReviews(@PathVariable String slug) {
        return service.getReviewsBySlug(slug);
    }

    @PostMapping
    public Review addReview(@PathVariable String slug, @RequestBody Review review) {
        return service.createReview(slug, review);
    }
}
