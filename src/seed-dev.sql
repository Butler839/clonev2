-- FULL DEV RESET: resets everything and restarts IDs
TRUNCATE TABLE review RESTART IDENTITY CASCADE;
TRUNCATE TABLE post RESTART IDENTITY CASCADE;
TRUNCATE TABLE book RESTART IDENTITY CASCADE;
TRUNCATE TABLE app_user RESTART IDENTITY CASCADE;

-- Users
INSERT INTO app_user (username, password, display_name) VALUES
                                                            ('ray', 'clonepass', 'Ray'),
                                                            ('luna', 'moonlight', 'Luna');

-- Books
INSERT INTO book (title, author, slug, genre, description) VALUES
                                                               ('The Metamorphosis', 'Franz Kafka', 'the-metamorphosis', 'Existentialism', 'A haunting exploration of isolation and transformation.'),
                                                               ('The Book of Disquiet', 'Fernando Pessoa', 'book-of-disquiet', 'Philosophical Fiction', 'Fragmented thoughts of a soul in conflict.'),
                                                               ('Norwegian Wood', 'Haruki Murakami', 'norwegian-wood', 'Romantic Realism', 'Memory, music, and melancholic longing.');

-- Posts
INSERT INTO post (author, content, created_at, likes) VALUES
                                                          ('Ray', 'Kafka’s metamorphosis reflects the human condition under extreme isolation.', NOW(), 5),
                                                          ('Luna', 'Pessoa writes like a lucid dream — every page feels like a diary entry.', NOW(), 4),
                                                          ('Ray', 'Requiem isn’t a system, it’s a hypothesis.', NOW(), 7),
                                                          ('Luna', 'The lookbook read like a poem stitched into threads.', NOW(), 2);

-- Reviews (book IDs are guaranteed to be 1–3)
INSERT INTO review (book_id, reviewer, content, rating, created_at) VALUES
                                                                        (1, 'Ray', 'This book cracked open a quiet part of me. Timeless.', 5, NOW()),
                                                                        (2, 'Luna', 'A slow burn, but beautifully introspective.', 4, NOW()),
                                                                        (3, 'Ray', 'It made me nostalgic for things that never happened.', 5, NOW());
