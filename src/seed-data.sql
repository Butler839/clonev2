-- PARTIAL RESEED: preserves book table

-- PARTIAL RESEED: preserves book table

TRUNCATE TABLE review RESTART IDENTITY CASCADE;
TRUNCATE TABLE post RESTART IDENTITY CASCADE;
TRUNCATE TABLE app_user RESTART IDENTITY CASCADE;

-- Users
INSERT INTO app_user (username, password, display_name) VALUES
                                                            ('ray', 'clonepass', 'Ray'),
                                                            ('luna', 'moonlight', 'Luna');

-- Posts
INSERT INTO post (author, content, created_at, likes) VALUES
                                                          ('Ray', 'Kafka’s metamorphosis reflects the human condition under extreme isolation.', NOW(), 5),
                                                          ('Luna', 'Pessoa writes like a lucid dream — every page feels like a diary entry.', NOW(), 4);

-- Reviews (use INSERT ... SELECT for dynamic book IDs)
INSERT INTO review (book_id, reviewer, content, rating, created_at)
SELECT id, 'Ray', 'Cracked open a quiet part of me. Timeless.', 5, NOW()
FROM book
WHERE slug = 'the-metamorphosis';

INSERT INTO review (book_id, reviewer, content, rating, created_at)
SELECT id, 'Luna', 'A slow burn, but beautifully introspective.', 4, NOW()
FROM book
WHERE slug = 'book-of-disquiet';

INSERT INTO review (book_id, reviewer, content, rating, created_at)
SELECT id, 'Ray', 'Made me nostalgic for things that never happened.', 5, NOW()
FROM book
WHERE slug = 'norwegian-wood';
