import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import DiscoverEvents from '../components/DiscoverEvents';
import ShowcaseTalent from '../components/ShowcaseTalent';
import ForOrganizers from '../components/ForOrganizers';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';


const HomePage = () => {

  
    
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Features />
        <DiscoverEvents />
        <ShowcaseTalent />
        <ForOrganizers />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
