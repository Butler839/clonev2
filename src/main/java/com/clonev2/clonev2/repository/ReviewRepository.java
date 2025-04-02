package com.clonev2.clonev2.repository;

import com.clonev2.clonev2.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBookSlug(String slug);
}

