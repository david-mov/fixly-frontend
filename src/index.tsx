import { render, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import box from './assets/box.svg';
import gears from './assets/gears.svg';
import recycle from './assets/recycle.svg';
import shield from './assets/shield.svg';

import './style.css';


function App() {
	const [reviews, setReviews] = useState([])
	const [ok, setOk] = useState(false)

	useEffect(() => {
		async function getReviews() {
			const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/reviews')
			if (response.ok) {
				const reviews: ReviewProps[] = await response.json();
				setReviews(reviews);
			}
			else console.error(response);
		}
		if (!reviews.length) getReviews();
	}, [])

	const submitReview = async (data) => {
		const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/reviews', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		if (response.ok) {
			const newReview = await response.json();
			setReviews([newReview, ...reviews]);
			setOk(true);
		}
		else console.error(response);
	}

	return (
		<div>
			<header>
				<h1>Fixly: Hardware & Software Repair</h1>
				<p>Your trusted partner for all computer issues!</p>
			</header>

			<div class="container">
				<section>
					<h2>About Us</h2>
					<p>At Fixly, we're passionate about bringing your technology back to life. Our skilled technicians specialize in fast, reliable repairs for computers, laptops, and devices of all types. Whether it’s a broken screen, a virus issue, or a system that won’t boot, we’re here to get you back on track!</p>
				</section>

				<section>
					<h2>Services Offered</h2>
					<div class="services">
						<Service 
							icon={shield}
							alt="Shield"
							title="Virus Removal"
							description="Eliminate harmful viruses and malware from your system."
						/>
						<Service 
							icon={gears}
							alt="Gears"
							title="Hardware Repair"
							description="Fix and replace faulty hardware components."
						/>
						<Service 
							icon={box}
							alt="Box"
							title="Software Installation"
							description="Install and configure software applications as per your needs."
						/>
						<Service 
							icon={recycle}
							alt="Recycle symbol"
							title="Data Recovery"
							description="Recover lost or damaged data from your devices."
						/>
					</div>
				</section>

				<section>
					<h2>Share Your Experience</h2>
					{
						!ok ?
							<>
								<p>We'd love to hear your thoughts on our service!</p>
								<ReviewForm submitReview={submitReview} />
							</>
						:
							<p>Thank you for your review! We appreciate your feedback.</p>
					}
				</section>

				<section class="reviews-section">
					<h2>Reviews About Us</h2>
					<Reviews reviews={reviews} />
				</section>
			</div>

			<footer>
				<p>&copy; Fixly: Hardware & Software Repair | All Rights Reserved</p>
			</footer>
		</div>
	);
}

function Service(props) {
	return (
		<div class="service">
			<img src={props.icon} alt={props.alt} height="75" width="75" />
			<h3>{props.title}</h3>
			<p>{props.description}</p>
        </div>
	)
}

interface StarsProps {
	rating: number,
	onSelectRating?: Function,
	size?: 'medium-font' | 'small-font'
}

class Stars extends Component<StarsProps> {
	ratings = [1,2,3,4,5]

	render({size, rating, onSelectRating}) {
		return (
			<div>
			{this.ratings.map(v =>
				<span class={(rating<v ? 'star star-off' : 'star') + ` ${size || 'small-font'}`} data-value={v} onClick={e => !onSelectRating || onSelectRating(e, v)}>&#9733;</span>
			)}
			</div>
		);
	}
}

interface ReviewFormProps {
	submitReview: Function
}

class ReviewForm extends Component<ReviewFormProps> {
	state = {
		author: '',
		rating: 5,
		comment: ''
	};
  
	onNameInput = e => {
	  this.setState({ author: e.currentTarget.value });
	}

	onCommentInput = e => {
		this.setState({ comment: e.currentTarget.value });
	}

	onSelectRating = (e, value) => {
		this.setState({rating: value});
	}
  
	render({submitReview}, { name, comment, rating }) {
	  return (
		<form id="review-form" method="post">
			<label for="name">Your Name (optional):</label>
			<input 
			type="text" 
			id="name" 
			name="name" 
			placeholder="Enter your name" 
			autocomplete="name" 
			value={name}
			onInput={this.onNameInput}
			/><br/>
		
			<label>Rate Our Service:</label>
			<Stars rating={rating} onSelectRating={this.onSelectRating} size="medium-font"/><br/>
		
			<label for="comment">Tell Us About Your Experience:</label>
			<textarea 
			id="comment" 
			name="comment" 
			placeholder="Share your thoughts about our service..." 
			rows={4} 
			value={comment} 
			onInput={this.onCommentInput}
			></textarea><br/>
		
			<button onClick={e =>{ e.preventDefault(); submitReview(this.state)}}>Submit Your Review</button>
		</form>
	  );
	}
  }


interface ReviewProps {
	author: string,
	comment: string,
	rating: number,
	postDate: string
}

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

interface ReviewsProps {
	reviews: ReviewProps[]
}

class Reviews extends Component<ReviewsProps> {
	constructor() {
		super();
	}

	render({reviews}) {
		return (
			<div>
				{
					reviews.map(r => (
						<Review 
							author={r.author} 
							comment={r.comment} 
							rating={r.rating} 
							postDate={r.postDate} 
						/>
					))
				}
			</div>
		);
	}
};

render(<App />, document.getElementById('app'));
