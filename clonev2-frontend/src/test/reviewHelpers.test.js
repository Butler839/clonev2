// src/__tests__/reviewHelpers.test.js

import { getStarDisplay } from '../utils/reviewHelpers';

describe('getStarDisplay', () => {
    test('returns 5 full stars for rating 5', () => {
        expect(getStarDisplay(5)).toBe('★★★★★');
    });

    test('returns 3 full stars and 2 empty for rating 3', () => {
        expect(getStarDisplay(3)).toBe('★★★☆☆');
    });

    test('returns 0 full and 5 empty for rating 0', () => {
        expect(getStarDisplay(0)).toBe('☆☆☆☆☆');
    });

    test('handles edge case rating of 1', () => {
        expect(getStarDisplay(1)).toBe('★☆☆☆☆');
    });

    test('handles edge case rating of 4', () => {
        expect(getStarDisplay(4)).toBe('★★★★☆');
    });
});
