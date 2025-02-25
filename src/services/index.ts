import { ReviewProps, ReviewSubmit } from "../types";

export async function getReviews(setReviews: Function) {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/reviews')
    if (response.ok) {
        const reviews: ReviewProps[] = await response.json();
        setReviews(reviews);
    }
}

export const postReview = async (data: ReviewSubmit, reviews: ReviewProps[], setReviews: Function, successCb: Function) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/reviews', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        successCb(true);
    }
    else console.error(response);
}
