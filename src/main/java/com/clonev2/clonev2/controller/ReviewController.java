package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Review;
import com.clonev2.clonev2.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // ✅ Get reviews for a book
    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@PathVariable String slug) {
        System.out.println("📖 GET /api/books/" + slug + "/reviews");
        List<Review> reviews = service.getReviewsBySlug(slug);
        return ResponseEntity.ok(reviews);
    }

    // ✅ Add a review to a book
    @PostMapping
    public ResponseEntity<?> addReview(@PathVariable String slug, @RequestBody Review review) {
        try {
            Review saved = service.createReview(slug, review);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            System.err.println("❌ Book not found for slug: " + slug);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
        } catch (Exception e) {
            System.err.println("⚠️ Failed to add review: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating review");
        }
    }
}
