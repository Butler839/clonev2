-- Wipe and reseed ONLY the book catalog
TRUNCATE TABLE book RESTART IDENTITY CASCADE;

INSERT INTO book (title, author, slug, genre, description) VALUES
                                                               ('The Metamorphosis', 'Franz Kafka', 'the-metamorphosis', 'Existentialism', 'A haunting exploration of isolation and transformation.'),
                                                               ('The Book of Disquiet', 'Fernando Pessoa', 'book-of-disquiet', 'Philosophical Fiction', 'Fragmented thoughts of a soul in conflict.'),
                                                               ('Norwegian Wood', 'Haruki Murakami', 'norwegian-wood', 'Romantic Realism', 'Memory, music, and melancholic longing.'),
                                                               ('Requiem of the Mind', 'The Guild', 'requiem-of-the-mind', 'Speculative Philosophy', 'Where thoughts are stitched and unstitched like patterns.'),
                                                               ('The Moth Journal', 'Various', 'the-moth-journal', 'Anthology', 'A layered collection of whispers from the edge.');
