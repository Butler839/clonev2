// src/__tests__/bookHelpers.test.js

import { filterBooks } from '../utils/bookHelpers';

describe('filterBooks', () => {
    const sampleBooks = [
        { title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi' },
        { title: 'The Bell Jar', author: 'Sylvia Plath', genre: 'Literary' },
        { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming' }
    ];

    test('filters by title', () => {
        const result = filterBooks(sampleBooks, 'dune');
        expect(result.length).toBe(1);
        expect(result[0].title).toBe('Dune');
    });

    test('filters by author', () => {
        const result = filterBooks(sampleBooks, 'plath');
        expect(result.length).toBe(1);
        expect(result[0].author).toBe('Sylvia Plath');
    });

    test('filters by genre', () => {
        const result = filterBooks(sampleBooks, 'programming');
        expect(result.length).toBe(1);
        expect(result[0].genre).toBe('Programming');
    });

    test('returns empty array for no match', () => {
        const result = filterBooks(sampleBooks, 'nonexistent');
        expect(result.length).toBe(0);
    });
});

