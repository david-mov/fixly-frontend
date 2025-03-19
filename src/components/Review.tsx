import { ReviewProps } from "../types";
import Stars from './Stars';

function Review({author, comment, rating, postDate}: ReviewProps) {
    return (
        <div class="review">
            <strong><span class="small-font">{author + ' '}</span></strong>
            <span class="review-date">{postDate}</span>
            <Stars rating={rating} />
            <span class="small-font">{comment}</span>
        </div>
    );
};

export default Review;