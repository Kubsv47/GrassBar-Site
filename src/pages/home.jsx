import React from 'react';
import './Homes.css';
import Nav from '../components/Nav';
import MainHeroSection from '../components/MainHeroSection';
import Section from '../components/Section'; 
import Footer from '../components/Footer';
import MatchesSection from '../components/MatchesSection.jsx'
import AboutSection from '../components/AboutSection.jsx'
import ContactSection from '../components/ContactSection'
import MenuSection from '../components/MenuSection'



export default function Home() {
	
	return (
		<>
			<Nav /> 

			<Section
				backgroundColor="#1A472A"
				textColor="#F0F0E1"
				padding="p-4 p-md-5"
				className="hero-section-wrapper" 
			>
				<MainHeroSection />
			</Section>
			<AboutSection />
			<MenuSection/>
			<MatchesSection/>
			<ContactSection/>
			<Footer/>
		</>
	);
}