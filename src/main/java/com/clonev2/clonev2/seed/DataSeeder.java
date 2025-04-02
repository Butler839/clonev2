package com.clonev2.clonev2.seed;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;

@Component
public class DataSeeder {

    @Bean
    CommandLineRunner seedBooks(BookRepository repo) {
        return args -> {
            // DELETE existing data on startup (force refresh)
            repo.deleteAll();

            // Book data arrays (updated)
            String[] titles = {
                    "Fragments of Tomorrow", "The Forgotten Signal", "Silent Echoes", "Ashes of the Mind", "Binary Dreams",
                    "The Last Archivist", "Symphony of Static", "Neon Horizon", "Dust and Circuitry", "Gravity's Architect",
                    "Midnight Algorithms", "The Memory Orchard", "Parallel Hearts", "Wired for War", "Crimson Abyss",
                    "Glitches in Eden", "The 9th Gatekeeper", "Quantum Ghosts", "Code and Silence", "Sunless Dawn",
                    "The Hollow Key", "Entropy Rising", "Pixel Prophet", "The Orb Weaver", "Sleepers of the Rift",
                    "Endless Orbit", "Lament of the Last", "The Warden’s Prayer", "Fire and Frequency", "Glass Titans",
                    "The Archive Below", "Spectrum Lost", "Myths of Motherboard", "The Fading Light", "Canvas of Time",
                    "Sins of the Compiler", "Exile's Syntax", "The Shattered Path", "Dark Mode", "The Echoed Flame",
                    "Golem Protocol", "Neural Fate", "The Broken Input", "Hearts in Binary", "Echo Chamber", "Chrono Maze",
                    "Through the Firewall", "Subtext", "Rebooted Eden", "Dreamers of Dust"
            };

            String[] authors = {
                    "A. Vance", "J. Hollow", "K. Mira", "R. Kade", "T. Sol", "L. Enzo", "N. Vale", "S. Rho", "C. Lux", "M. Cael"
            };
            String[] genres = {
                    "Sci-Fi", "Cyberpunk", "Fantasy", "Philosophical Fiction", "Post-Apocalyptic", "Surrealism", "Psychological", "Adventure", "Speculative", "Drama"
            };
            // Reseed the data (creating new books)
            IntStream.range(0, titles.length).forEach(i -> {
                Book book = new Book();
                String title = titles[i];
                String slug = title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");

                book.setTitle(title);
                book.setAuthor(authors[i % authors.length]);
                book.setGenre(genres[i % genres.length]);
                book.setDescription("A deep exploration into the themes of \"" + title + "\" by " + authors[i % authors.length] + ".");
                book.setSlug(slug);

                // Save to database
                repo.save(book);
            });

            System.out.println("📚 Seeded " + titles.length + " unique books!");
        };
    }
}


