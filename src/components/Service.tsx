interface ServiceProps {
	icon: string,
	alt: string,
	title: string,
	description: string
}

function Service({icon, alt, title, description}: ServiceProps) {
	return (
		<div class="service">
			<img src={icon} alt={alt} height="75" width="75" />
			<h3>{title}</h3>
			<p>{description}</p>
        </div>
	)
}

export default Service;