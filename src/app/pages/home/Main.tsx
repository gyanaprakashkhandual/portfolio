"use client";
import Hero from "./Hero";
import Skills from "./Skills";
import Stats from "./Stats";
import Projects from "./Projects";
import Testimonials from "./Testimonial";
import CTA from "./CTA";
import Footer from "./Footer";
import AnnouncementSection from "./Annoucement";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-black dark:text-white font-sans overflow-x-hidden selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black select-none">
      <Hero />
      <AnnouncementSection />
      <Skills />
      <Stats />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
