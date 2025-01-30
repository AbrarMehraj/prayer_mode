'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { versions } from "./versions";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string; // Add target prop
  rel?: string;    // Add rel prop
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, target, rel }) => (
  <a 
    href={href} 
    onClick={onClick} 
    target={target} 
    rel={rel} 
    className="relative text-gray-300 hover:text-white px-4 py-2 transition-all duration-300 group"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-lg transition-all duration-300 scale-75 group-hover:scale-100" />
  </a>
);

interface MobileMenuProps {
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, menuRef }) => (
  <div ref={menuRef} className={`fixed top-16 left-0 w-full backdrop-blur-lg bg-gray-900/90 z-50 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} md:hidden`}>
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      <NavLink href="#features" onClick={(e) => { e.preventDefault(); document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</NavLink>
      <NavLink href="#screenshots" onClick={(e) => { e.preventDefault(); document.querySelector('#screenshots')?.scrollIntoView({ behavior: 'smooth' }); }}>Screenshots</NavLink>
      <NavLink href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</NavLink>
      <NavLink href="https://github.com/AbrarMehraj/web-peace/issues" target="_blank" rel="noopener noreferrer">Feedback</NavLink>
      <a
        href={versions[0].link}
        download
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
      >
        Download App
      </a>
    </div>
  </div>
);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current && 
        !toggleButtonRef.current.contains(event.target as Node) // Check if the click is on the toggle button
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient-slow pointer-events-none" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#0A0F1C]/80 z-40 border-b border-white/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-50" />
                <Image src="/app-icon.png" alt="App Icon" width={44} height={44} className="relative bg-white rounded-xl transition-all duration-300 group-hover:scale-105" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Prayer Mode</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#screenshots">Screenshots</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="https://github.com/AbrarMehraj/web-peace/issues" target="_blank" rel="noopener noreferrer">
                Feedback
              </NavLink>
              <a
                href={versions[0].link}
                download
                className="ml-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Download App
              </a>
            </nav>

            <button
              ref={toggleButtonRef}
              className="p-2 text-gray-300 hover:text-white md:hidden"
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} menuRef={menuRef} />

      <main className="relative pt-24">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Focus on Your Prayers</span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0">
                  Experience true peace during your prayers with our intelligent DND management. Let technology enhance your spiritual moments, not interrupt them.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                  <a
                    href={versions[0].link}
                    download
                    className="group bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-3"
                  >
                    <span>Download Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Learn More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="relative">
                  <Image
                    src="/ss1.png"
                    alt="Prayer Mode App"
                    width={300}
                    height={600}
                    className="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-6 -right-6">
                    <Image
                      src="/ss2.png"
                      alt="Prayer Mode Features"
                      width={200}
                      height={400}
                      className="rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-purple-900/5 to-blue-900/5" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h3 className="text-sm uppercase tracking-wider text-blue-400 mb-4">Powerful Features</h3>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">Everything You Need</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Designed with your spiritual journey in mind, our features ensure a distraction-free prayer experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Prayer Times Sync",
                  description: "Accurate prayer times with offset adjustment capability for your location",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Auto Call Management",
                  description: "Automatically declines incoming calls during prayer times for uninterrupted worship",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                },
                {
                  title: "Auto SMS Response",
                  description: "Sends automatic replies to missed calls during prayer times",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                },
                {
                  title: "Hijri Calendar",
                  description: "Built-in Hijri date adjustments for accurate Islamic dates",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Coming Soon: Priority Contacts",
                  description: "Allow important calls during prayer times (Available in future update)",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                },
                {
                  title: "Coming Soon: Backup & Sync",
                  description: "Keep your settings safe across devices (Available in future update)",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-2 ${feature.title.includes('Coming Soon') ? 'opacity-75' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${feature.title.includes('Coming Soon') ? 'from-gray-500 to-gray-600' : 'from-blue-500 to-blue-600'} p-3 rounded-xl w-fit mb-6 text-white`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-4">{feature.title}</h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 relative bg-gradient-to-b from-gray-900 to-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h3 className="text-sm uppercase tracking-wider text-blue-400 mb-4">Simple Process</h3>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">How It Works</h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative group bg-gray-900 p-8 rounded-xl border border-gray-800">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                <div className="relative">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-2xl font-semibold text-white text-center mb-6">Quick Setup</h4>
                  <p className="text-gray-300 text-center text-lg leading-relaxed">
                    Simply install the app and grant necessary permissions. The app will automatically configure accurate prayer times for your location, and you&apos;re ready to enjoy uninterrupted prayer times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section id="screenshots" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h3 className="text-sm uppercase tracking-wider text-blue-400 mb-4">Visual Tour</h3>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">App Preview</h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {["/ss1.png", "/ss2.png", "/ss3.png", "/ss4.png", "/ss5.png"].map((src, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur-xl" />
                  <Image
                    src={src}
                    alt={`Prayer Mode Screenshot ${index + 1}`}
                    width={250}
                    height={500}
                    className="relative rounded-2xl shadow-2xl transition-all duration-500 group-hover:transform group-hover:scale-105 group-hover:-rotate-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-32 relative bg-gradient-to-b from-gray-900 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">
                Ready to Transform Your Prayer Experience?
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Join thousands of users who have already enhanced their spiritual journey with Prayer Mode.
              </p>
              <a
                href={versions[0].link}
                download
                className="group bg-gradient-to-r from-blue-600 to-blue-400 text-white px-12 py-5 rounded-full font-medium text-lg inline-flex items-center space-x-3 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Download Prayer Mode</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative bg-gray-900/80 backdrop-blur-md border-t border-white/5">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-4">
              <Image src="/app-icon.png" alt="App Icon" width={40} height={40} className="bg-white rounded-xl" />
              <div>
                <h3 className="font-bold text-xl text-white">Prayer Mode</h3>
                <p className="text-gray-400">Focus on what matters most</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#screenshots">Screenshots</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="https://github.com/AbrarMehraj/web-peace/issues" target="_blank" rel="noopener noreferrer">
                Feedback
              </NavLink>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400">&copy; 2024 Prayer Mode. Crafted with ❤️ by Abrar Mehraj</p>
          </div>
        </div>
      </footer>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:transform hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
