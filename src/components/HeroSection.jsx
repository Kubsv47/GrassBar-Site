import React from 'react'
import './HeroSection.css'

export default function HeroSection({ children, backgroundImage }) {
	const heroStyle = {
		backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}

	return (
		
		<header className="hero-img" style={heroStyle}>
			<div className="hero-text">
				<h1>{children}</h1>
			</div>
			<div className="hero-shadow"></div>
		</header>
	)
}
