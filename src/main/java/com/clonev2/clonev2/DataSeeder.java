package com.clonev2.clonev2;

import com.clonev2.clonev2.model.Book;
import com.clonev2.clonev2.model.Comment;
import com.clonev2.clonev2.model.Post;
import com.clonev2.clonev2.repository.BookRepository;
import com.clonev2.clonev2.repository.CommentRepository;
import com.clonev2.clonev2.repository.PostRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder {

    private final BookRepository bookRepo;
    private final PostRepository postRepo;
    private final CommentRepository commentRepo;
    private final Random random = new Random();

    public DataSeeder(BookRepository bookRepo, PostRepository postRepo, CommentRepository commentRepo) {
        this.bookRepo = bookRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
    }

    @PostConstruct
    public void seedData() {
        System.out.println("\uD83D\uDE80 Running Advanced DataSeeder...");

        commentRepo.deleteAll();
        postRepo.deleteAll();

        if (bookRepo.count() == 0) {
            Book b = new Book();
            b.setTitle("The Trial");
            b.setAuthor("Franz Kafka");
            b.setGenre("Existentialism");
            b.setDescription("A surreal exploration of guilt and bureaucracy.");
            b.setSlug("the-trial");
            bookRepo.save(b);
        }

        List<Book> books = bookRepo.findAll();

        String[] authorPool = {
                "KafkaFan", "DreamReader", "PageTurner", "LitCrit", "ExistentialEgg",
                "MidnightMargin", "AbstractAddict", "MeaningHunter", "PhiloNomad", "SyntaxSoul"
        };

        String[] userPool = {
                "User42", "EchoMind", "FragmentFox", "QuietStorm", "InkWanderer",
                "SleeplessSoul", "VagueVerse", "PlotPilot", "SceneSeeker", "WordlessWatcher"
        };

        String[] postContentPool = {
                "Kafka’s themes still resonate in 2025.",
                "Some stories don't need closure — this is one of them.",
                "Feels like the walls are watching me.",
                "Read this alone at 3AM — changed me.",
                "Said everything I couldn't.",
                "A beautiful nightmare, cover to cover.",
                "Every line feels like a whisper in the void.",
                "Found a piece of myself in this chaos."
        };

        List<String> hopeComments = Arrays.asList(
                "There’s light in this madness.",
                "Oddly comforting.",
                "Hope woven between the lines.",
                "Bittersweet, but healing."
        );

        List<String> dreadComments = Arrays.asList(
                "Felt like sinking.",
                "Trapped in a loop.",
                "Couldn’t breathe reading this.",
                "Everything felt hollow."
        );

        List<String> obsessionComments = Arrays.asList(
                "Rereading this again tonight.",
                "I can’t stop thinking about this.",
                "I wish I wrote this.",
                "Marked every page.",
                "This book owns me."
        );

        for (int i = 0; i < 5; i++) {
            String author = authorPool[random.nextInt(authorPool.length)];
            String content = postContentPool[random.nextInt(postContentPool.length)];
            Book book = books.get(random.nextInt(books.size()));

            Post post = new Post();
            post.setAuthor(author);
            post.setContent(content);
            post.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(3)));
            post.setLikes(random.nextInt(60));
            post.setBook(book);
            Post savedPost = postRepo.save(post);

            // Add 1 comment from each theme
            String[] themedComment = new String[] {
                    hopeComments.get(random.nextInt(hopeComments.size())),
                    dreadComments.get(random.nextInt(dreadComments.size())),
                    obsessionComments.get(random.nextInt(obsessionComments.size()))
            };

            for (String commentText : themedComment) {
                Comment comment = new Comment();
                comment.setPost(savedPost);
                comment.setCommenter(userPool[random.nextInt(userPool.length)]);
                comment.setContent(commentText);
                comment.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(3)).plusHours(random.nextInt(12)));
                commentRepo.save(comment);
            }

            System.out.println("✅ Post by " + author + " linked to book: " + book.getTitle());
        }
    }
}





