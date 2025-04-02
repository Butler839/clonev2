package com.clonev2.clonev2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.clonev2.clonev2.model.Book;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findBySlug(String slug);
}

