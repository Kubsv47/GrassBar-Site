import React from 'react'

export default function Section({
	children,
	title,
	backgroundColor,
	backgroundImage,
	textColor,
	className = '',
	id,
	padding = 'py-5 py-md-5 py-xl-8',
	fluid = false,
	alignment = 'text-start',
}) {
	const sectionStyle = {
		...(backgroundColor && { backgroundColor }),
		...(backgroundImage && {
			backgroundImage: `url(${backgroundImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		}),
		...(textColor && { color: textColor }),
	}

	const containerClass = fluid ? 'container-fluid' : 'container'
	const sectionClasses = `${padding} ${alignment} ${className}`

	return (
		<section className={sectionClasses} style={sectionStyle} id={id}>
			<div className={containerClass}>
				{title && <h2 className="section-title  fw-bold mb-5">{title}</h2>}
				{children}
			</div>
		</section>
	)
}
