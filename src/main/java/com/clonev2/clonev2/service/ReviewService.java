package com.clonev2.clonev2.service;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.model.Review;
import com.clonev2.clonev2.repository.BookRepository;
import com.clonev2.clonev2.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final BookRepository bookRepo;

    public ReviewService(ReviewRepository reviewRepo, BookRepository bookRepo) {
        this.reviewRepo = reviewRepo;
        this.bookRepo = bookRepo;
    }

    public List<Review> getReviewsBySlug(String slug) {
        return reviewRepo.findByBookSlug(slug);
    }

    public Review createReview(String slug, Review review) {
        Optional<Book> bookOpt = bookRepo.findBySlug(slug);
        if (bookOpt.isEmpty()) throw new IllegalArgumentException("Book not found");


        review.setBook(bookOpt.get());
        review.setCreatedAt(LocalDateTime.now());
        return reviewRepo.save(review);
    }
}
