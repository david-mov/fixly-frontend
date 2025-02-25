export interface StarsProps {
	rating: number,
	onSelectRating?: Function,
	size?: 'medium-font' | 'small-font'
}

export interface ReviewFormProps {
	submitReview: Function
}

export interface ReviewProps {
	author: string,
	comment: string,
	rating: number,
	postDate: string
}

export interface ReviewsProps {
	reviews: ReviewProps[]
}

export interface ReviewSubmit {
	author: string,
	comment: string,
	rating: number
}