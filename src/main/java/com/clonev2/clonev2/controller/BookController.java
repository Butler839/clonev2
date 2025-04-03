package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        System.out.println("📚 GET /api/books");
        List<Book> books = service.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getBookBySlug(@PathVariable String slug) {
        System.out.println("📚 GET /api/books/" + slug);
        return service.getBookBySlug(slug)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Book not found"));
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book saved = service.createBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        System.out.println("❌ DELETE /api/books/" + id);
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
