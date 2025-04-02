package com.clonev2.clonev2.controller;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.service.BookService;
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
    @ResponseBody
    public List<Book> getAllBooks() {
        System.out.println("📚 GET /api/books hit");
        return service.getAllBooks();
    }


    @GetMapping("/{slug}")
    public Book getBookBySlug(@PathVariable String slug) {
        return service.getBookBySlug(slug).orElse(null);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return service.createBook(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }
}
