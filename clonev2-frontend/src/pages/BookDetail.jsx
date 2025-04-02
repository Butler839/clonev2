import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetail.css';

function BookDetail() {
    const { slug } = useParams();

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false);

    const [reviewer, setReviewer] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        fetch(`/api/books/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error('Book not found');
                return res.json();
            })
            .then((data) => {
                setBook(data);
                return fetch(`/api/books/${slug}/reviews`);
            })
            .then((res) => res.json())
            .then(setReviews)
            .catch(() => setError(true));
    }, [slug]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            reviewer,
            content,
            rating: parseInt(rating),
        };

        fetch(`/api/books/${slug}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        })
            .then((res) => res.json())
            .then((newReview) => {
                setReviews((prev) => [newReview, ...prev]);
                setReviewer('');
                setContent('');
                setRating(5);
            })
            .catch((err) => console.error("Failed to submit review:", err));
    };

    if (error) return <div className="book-detail-error">❌ Book not found.</div>;
    if (!book) return <div className="book-detail-loading">Loading book...</div>;

    return (
        <div className="book-detail-wrapper">
            <div className="book-detail-container">
                <h1>{book.title}</h1>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p className="description">{book.description}</p>
                <Link to="/" className="back-link">← Back to Library</Link>
            </div>

            <div className="review-section">
                <h3>Reader Reviews</h3>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    <ul className="review-list">
                        {reviews.map((review) => (
                            <li key={review.id} className="review-item">
                                <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                                <p className="review-text">"{review.content}"</p>
                                <p className="review-meta">
                                    – {review.reviewer || "Anonymous"} on {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="review-form">
                <h3>Write a Review</h3>

                <form onSubmit={handleReviewSubmit}>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={reviewer}
                        onChange={(e) => setReviewer(e.target.value)}
                        className="review-input"
                    />

                    <textarea
                        placeholder="Write your review..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="review-textarea"
                        required
                    />

                    <div className="rating-selector">
                        <label>Rating:</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-review">Submit Review</button>
                </form>
            </div>
        </div>
    );
}

export default BookDetail;






