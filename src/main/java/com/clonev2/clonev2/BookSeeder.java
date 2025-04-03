package com.clonev2.clonev2;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.repository.BookRepository;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Component
public class BookSeeder {

    private final BookRepository bookRepo;

    public BookSeeder(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    @PostConstruct
    public void seedBooksIfEmpty() {
        if (bookRepo.count() == 0) {
            bookRepo.saveAll(List.of(
                    new Book("The Metamorphosis", "Franz Kafka", "the-metamorphosis", "Existentialism", "A haunting exploration of isolation and transformation."),
                    new Book("The Book of Disquiet", "Fernando Pessoa", "book-of-disquiet", "Philosophical Fiction", "Fragmented thoughts of a soul in conflict."),
                    new Book("Norwegian Wood", "Haruki Murakami", "norwegian-wood", "Romantic Realism", "Memory, music, and melancholic longing."),
                    new Book("Requiem of the Mind", "The Guild", "requiem-of-the-mind", "Speculative Philosophy", "Where thoughts are stitched and unstitched like patterns."),
                    new Book("The Moth Journal", "Various", "the-moth-journal", "Anthology", "A layered collection of whispers from the edge.")
            ));
            System.out.println("✅ Book catalog seeded.");
        } else {
            System.out.println("📚 Book table already populated. Skipping seed.");
        }
    }
}
