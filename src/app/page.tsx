'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { versions, fullFeaturesApkLink } from "./versions";

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

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, menuRef }) => {
  const stableVersion = versions.find(v => !v.isBeta);

  return (
    <div ref={menuRef} className={`fixed top-16 left-0 w-full backdrop-blur-lg bg-gray-900/90 z-50 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} md:hidden`}>
      <div className="flex flex-col items-center justify-center space-y-6 py-8">
        <NavLink href="#features" onClick={(e) => { e.preventDefault(); document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</NavLink>
        <NavLink href="#screenshots" onClick={(e) => { e.preventDefault(); document.querySelector('#screenshots')?.scrollIntoView({ behavior: 'smooth' }); }}>Screenshots</NavLink>
        <NavLink href="#how-it-works" onClick={(e) => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</NavLink>
        <NavLink href="https://github.com/AbrarMehraj/web-peace/issues" target="_blank" rel="noopener noreferrer">Feedback</NavLink>
        <a
          href={fullFeaturesApkLink}
          target="_blank"
          rel="noopener noreferrer"
          download="prayer-mode-full.apk"
          className="bg-[#065f46] hover:bg-[#047857] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 min-w-[180px] h-[48px]"
        >
          <span className="text-[10px] uppercase">Direct download</span>
          <span className="text-base font-medium">Full-Featured APK</span>
        </a>
        <a
          href={stableVersion?.link || 'https://play.google.com/store/apps/details?id=com.prayer.abrar'}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#000000] hover:bg-[#111111] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 min-w-[180px] h-[48px]"
        >
          <span className="text-[10px] uppercase">Get it on</span>
          <span className="text-base font-medium">Google Play</span>
        </a>
      </div>
    </div>
  );
}

// Beta Release Banner Component - displays information about the beta release
const BetaReleaseBanner: React.FC = () => {
  const betaVersion = versions.find(v => v.isBeta);

  if (!betaVersion) return null;

  return (
    <div className="relative my-12 max-w-4xl mx-auto overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl" />

      <div className="relative bg-gray-900/80 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium text-blue-300 bg-blue-500/20 rounded-full">Beta {betaVersion.v}</span>
              <span className="text-gray-400 text-sm">Released: {betaVersion.releaseDate}</span>
            </div>

            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {betaVersion.highlight || "New Beta Release Available"}
            </h3>

            <ul className="space-y-2">
              {betaVersion.changes.map((change, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0">
            <a
              href={betaVersion.link}
              download="prayer-mode-beta.apk"
              className="group bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 min-w-[180px] h-[48px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal">GET IT ON</span>
                <span className="text-[15px] font-medium -mt-1">Instant Mode APK - Beta Release</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const stableVersion = versions.find(v => !v.isBeta);
  const supportEmail = "prayermode.official@gmail.com";

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
                  Experience uninterrupted devotion with our refined Do Not Disturb system. Our thoughtfully designed technology creates a peaceful space for your prayers, enhancing your spiritual connection without distractions.
                </p>
                {/* Download buttons container */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-6">
                  {/* Play Store button */}
                  <a
                    href={stableVersion?.link || 'https://play.google.com/store/apps/details?id=com.prayer.abrar'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto bg-[#000000] hover:bg-[#111111] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[200px] h-[56px]"
                  >
                    <svg className="h-[24px] w-[24px] ml-2" viewBox="0 0 32 32">
                      <path fill="#EA4335" d="M15.82 14.13L4.41 2.65C4.39 2.64 4.38 2.62 4.36 2.61C4.21 2.54 4.06 2.5 3.91 2.5C3.76 2.5 3.61 2.54 3.46 2.61L15.82 14.98L28.18 2.61C28.03 2.54 27.88 2.5 27.73 2.5C27.58 2.5 27.43 2.54 27.28 2.61C27.26 2.62 27.25 2.64 27.23 2.65L15.82 14.13Z" />
                      <path fill="#FBBC04" d="M15.82 17.87L4.41 29.35C4.39 29.36 4.38 29.38 4.36 29.39C4.21 29.46 4.06 29.5 3.91 29.5C3.76 29.5 3.61 29.46 3.46 29.39L15.82 17.02L28.18 29.39C28.03 29.46 27.88 29.5 27.73 29.5C27.58 29.5 27.43 29.46 27.28 29.39C27.26 29.38 27.25 29.36 27.23 29.35L15.82 17.87Z" />
                      <path fill="#34A853" d="M15.82 17.02L3.46 29.39C3.41 29.37 3.36 29.35 3.31 29.32C2.9 29.11 2.5 28.67 2.5 27.73V4.27C2.5 3.33 2.9 2.89 3.31 2.68C3.36 2.65 3.41 2.63 3.46 2.61L15.82 14.98V17.02Z" />
                      <path fill="#4285F4" d="M28.18 29.39L15.82 17.02V14.98L28.18 2.61C28.23 2.63 28.28 2.65 28.33 2.68C28.74 2.89 29.14 3.33 29.14 4.27V27.73C29.14 28.67 28.74 29.11 28.33 29.32C28.28 29.35 28.23 29.37 28.18 29.39Z" />
                    </svg>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[10px] font-normal">GET IT ON</span>
                      <span className="text-[16px] font-medium -mt-1">Google Play</span>
                    </div>
                  </a>

                  {/* Full-Featured APK — badge style like Google Play */}
                  <a
                    href={fullFeaturesApkLink}
                    rel="noopener noreferrer"
                    download="prayer-mode.apk"
                    className="group w-full sm:w-auto bg-[#065f46] hover:bg-[#047857] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[200px] h-[56px]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[24px] w-[24px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[10px] font-normal">DIRECT DOWNLOAD</span>
                      <span className="text-[16px] font-medium -mt-1">Full-Featured APK</span>
                    </div>
                  </a>
                </div>

                {/* Info text */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-center lg:text-left">
                  <div className="text-sm text-gray-400">
                    * Stable version available on Google Play Store
                  </div>
                  <div className="text-sm text-gray-400">
                    * Full-Featured APK includes auto reply &amp; contact whitelist (outside Play Store)
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="relative">
                  {/* Mobile View - Stacked Images (uses new marketing renders) */}
                  <div className="lg:hidden space-y-8 px-4">
                    <div className="relative transform hover:scale-105 transition-all duration-500">
                      <Image
                        src="/instant-mode-new.png"
                        alt="Prayer Mode hero preview from latest batch"
                        width={280}
                        height={560}
                        className="rounded-3xl shadow-2xl mx-auto"
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <div className="relative transform hover:scale-105 transition-all duration-500">
                        <Image
                          src="/1.png"
                          alt="Prayer Mode feature shot 1"
                          width={180}
                          height={360}
                          className="rounded-2xl shadow-2xl"
                        />
                      </div>
                      <div className="relative transform hover:scale-105 transition-all duration-500">
                        <Image
                          src="/2.png"
                          alt="Prayer Mode feature shot 2"
                          width={180}
                          height={360}
                          className="rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Desktop View - Overlapping Images */}
                  <div className="hidden lg:block relative">
                    <div className="relative w-fit mx-auto">
                      {/* Background glow effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 filter blur-3xl opacity-50 scale-150" />

                      {/* Side Images */}
                      <div className="absolute -left-20 top-20 transform -translate-y-12 hover:translate-y-0 hover:scale-110 transition-all duration-500 hover:z-30">
                        <Image
                          src="/3.png"
                          alt="Prayer Mode feature shot 3"
                          width={220}
                          height={440}
                          className="rounded-2xl shadow-2xl"
                        />
                      </div>
                      <div className="absolute -right-20 top-20 transform -translate-y-12 hover:translate-y-0 hover:scale-110 transition-all duration-500 hover:z-30">
                        <Image
                          src="/2.png"
                          alt="Prayer Mode feature shot 2"
                          width={220}
                          height={440}
                          className="rounded-2xl shadow-2xl"
                        />
                      </div>

                      {/* Main Image */}
                      <div className="transform hover:scale-110 transition-all duration-500 hover:z-30">
                        <Image
                          src="/1.png"
                          alt="Prayer Mode feature shot 1"
                          width={280}
                          height={560}
                          className="rounded-3xl shadow-2xl relative z-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add Beta Release Banner component here */}
        <BetaReleaseBanner />

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
                  title: "Instant Mode",
                  description: "Quick access mode for immediate DND activation with auto-decline and reply features",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  isBeta: true
                },
                {
                  title: "Priority Contact Suite",
                  description: "Stay connected to what matters most with whitelist contacts - essential calls come through while others are politely declined",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  // Graduated from beta, so we intentionally omit isBeta
                },
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
                    <div className="flex items-center justify-between mb-6">
                      <div className={`bg-gradient-to-br ${feature.title.includes('Coming Soon') ? 'from-gray-500 to-gray-600' : 'from-blue-500 to-blue-600'} p-3 rounded-xl w-fit text-white`}>
                        {feature.icon}
                      </div>
                      {feature.isBeta && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-300 bg-blue-500/20 rounded-full">Beta</span>
                      )}
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

              {/* Beta Features Section */}
              <div className="relative group bg-gray-900 p-8 rounded-xl border border-gray-800 mt-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-blue-300 bg-blue-500/20 rounded-full">Latest Updates</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white text-center mb-6">Advanced & Beta Features</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-xl font-medium text-blue-300 mb-2">Priority Contact Suite (Stable)</h5>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Stay connected to what matters most. Priority Contact is now live in the stable channel, letting you select important people who can reach you even during prayer times. Simply add family members or colleagues to your whitelist, and their calls will come through while others are politely declined.
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xl font-medium text-blue-300 mb-2">Instant Modes</h5>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Activate DND instantly with a single tap. Our Instant Mode provides quick access for immediate activation with auto-decline calls and customized reply messages.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <a
                      href={versions.find(v => v.isBeta)?.link}
                      download="prayer-mode-beta.apk"
                      className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-lg font-medium transition-all duration-300 min-w-[180px] h-[48px]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-[22px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] font-normal">GET IT ON</span>
                        <span className="text-[15px] font-medium -mt-1">Instant Mode APK - Beta Release</span>
                      </div>
                    </a>
                  </div>
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
              {/* New screenshot set keeps marketing site in sync with Drive assets */}
              {[ "/1.png", "/2.png", "/3.png", "/4.png", "/55.png","/instant-mode-new.png"].map((src, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur-xl" />
                  <Image
                    src={src}
                    alt={`Prayer Mode Screenshot ${index + 1}`}
                    width={src === "/instant-mode-new.png" ? 200 : 250}
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

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center flex-wrap">
                {/* Play Store Button */}
                <a
                  href={stableVersion?.link || 'https://play.google.com/store/apps/details?id=com.prayer.abrar'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#000000] hover:bg-[#111111] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[200px]"
                >
                  <svg className="h-[24px] w-[24px] ml-2" viewBox="0 0 32 32">
                    <path fill="#EA4335" d="M15.82 14.13L4.41 2.65C4.39 2.64 4.38 2.62 4.36 2.61C4.21 2.54 4.06 2.5 3.91 2.5C3.76 2.5 3.61 2.54 3.46 2.61L15.82 14.98L28.18 2.61C28.03 2.54 27.88 2.5 27.73 2.5C27.58 2.5 27.43 2.54 27.28 2.61C27.26 2.62 27.25 2.64 27.23 2.65L15.82 14.13Z" />
                    <path fill="#FBBC04" d="M15.82 17.87L4.41 29.35C4.39 29.36 4.38 29.38 4.36 29.39C4.21 29.46 4.06 29.5 3.91 29.5C3.76 29.5 3.61 29.46 3.46 29.39L15.82 17.02L28.18 29.39C28.03 29.46 27.88 29.5 27.73 29.5C27.58 29.5 27.43 29.46 27.28 29.39C27.26 29.38 27.25 29.36 27.23 29.35L15.82 17.87Z" />
                    <path fill="#34A853" d="M15.82 17.02L3.46 29.39C3.41 29.37 3.36 29.35 3.31 29.32C2.9 29.11 2.5 28.67 2.5 27.73V4.27C2.5 3.33 2.9 2.89 3.31 2.68C3.36 2.65 3.41 2.63 3.46 2.61L15.82 14.98V17.02Z" />
                    <path fill="#4285F4" d="M28.18 29.39L15.82 17.02V14.98L28.18 2.61C28.23 2.63 28.28 2.65 28.33 2.68C28.74 2.89 29.14 3.33 29.14 4.27V27.73C29.14 28.67 28.74 29.11 28.33 29.32C28.28 29.35 28.23 29.37 28.18 29.39Z" />
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal">GET IT ON</span>
                    <span className="text-[16px] font-medium -mt-1">Google Play</span>
                  </div>
                </a>

                {/* Full-Featured APK — badge style like Google Play */}
                <a
                  href={fullFeaturesApkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="prayer-mode-full.apk"
                  className="group bg-[#065f46] hover:bg-[#047857] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[200px] h-[56px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[24px] w-[24px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal">DIRECT DOWNLOAD</span>
                    <span className="text-[16px] font-medium -mt-1">Full-Featured APK</span>
                  </div>
                </a>

                {/* Beta — badge style like Google Play */}
                <a
                  href={versions.find(v => v.isBeta)?.link}
                  download="prayer-mode-beta.apk"
                  className="group bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[200px] h-[56px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[24px] w-[24px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-normal">GET IT ON</span>
                    <span className="text-[16px] font-medium -mt-1">Instant Mode APK - Beta Release</span>
                  </div>
                </a>
              </div>
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
              <NavLink href="https://play.google.com/store/apps/details?id=com.prayer.abrar" target="_blank" rel="noopener noreferrer">
                Feedback
              </NavLink>
            </div>
            {/* Simple support contact so the section feels friendly and approachable */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-1">Need a hand?</p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-blue-300 hover:text-blue-100 underline underline-offset-4 transition-colors duration-200"
              >
                {supportEmail}
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400">&copy;  {new Date().getFullYear()} Prayer Mode. Crafted with ❤️ by Abrar Mehraj</p>
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
