import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Wind, Droplets, Sun, Waves, Trash2, Plus } from 'lucide-react';

/* NOTE: This implementation uses:
  - React for structure
  - Tailwind CSS for styling
  - GSAP (via CDN injection) for high-performance animations
  - Lucide React for icons
  - Google Fonts (Outfit)
*/

// --- Helper Component: Image with Skeleton Loader ---
const ImageWithLoader = ({ src, alt, className, containerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton / Blur Placeholder */}
      <div 
        className={`absolute inset-0 bg-[#E8E4DA] animate-pulse flex items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Waves className="text-[#0E3B43]/20 animate-bounce" size={24} />
      </div>
      
      {/* Actual Image */}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        className={`${className} transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const FloatWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Track mouse for glow effect
  
  // Refs for animation
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const bottleRefs = useRef([]);

  // Product Data
  const products = [
    {
      id: 1,
      name: "Sunrise Citrus",
      tagline: "Morning Light",
      price: 8.50,
      desc: "Fresh pressed oranges meeting the first light of day. A vitamin C surge.",
      color: "bg-orange-100",
      image: "https://i.ibb.co/SwjKPVR1/Whisk-24ffb8267bebc39afb14d1ae50c9ff7bdr.png" 
    },
    {
      id: 2,
      name: "Lagoon Berry",
      tagline: "Deep Dive",
      price: 9.00,
      desc: "Wild berries harvested from the coast. Antioxidant rich and deeply refreshing.",
      color: "bg-red-50",
      image: "https://i.ibb.co/ycPKrRcr/Whisk-b5cd7a4177e2bee98ab4bb6818df9744dr.png"
    },
    {
      id: 3,
      name: "Palm Green",
      tagline: "Canopy Shade",
      price: 8.50,
      desc: "Kiwi, cucumber, and lime. Cool, crisp, and hydrating like a shade under palms.",
      color: "bg-green-50",
      image: "https://i.ibb.co/NndFMCF1/Whisk-d30befd4216836c91ca418bc1145240aeg.png"
    },
    {
      id: 4,
      name: "Dusk Grape",
      tagline: "Evening Tide",
      price: 9.50,
      desc: "Concord grapes with a hint of sparkling water. The perfect sunset companion.",
      color: "bg-purple-50",
      image: "https://i.ibb.co/QvgqYnNr/Whisk-40feb5b3862cf2598594c8a9e0feb15cdr.png"
    }
  ];

  // Cart Functions
  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // Load GSAP and Font
  useEffect(() => {
    // Load Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load GSAP
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    script.onload = () => {
      const stScript = document.createElement('script');
      stScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
      stScript.async = true;
      stScript.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        setGsapLoaded(true);
      };
      document.body.appendChild(stScript);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Animations & Mouse Tracker
  useEffect(() => {
    // Mouse Tracker
    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    if (gsapLoaded && heroRef.current) {
      const tl = window.gsap.timeline();
      
      // Hero Entrance - Centered Focus
      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(".hero-subtitle", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: -1 }
      );

      // Scroll Triggers for Products
      bottleRefs.current.forEach((bottle, index) => {
        if(bottle) {
          window.gsap.fromTo(bottle,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: bottle,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Background Parallax
      window.gsap.to(".cloud-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gsapLoaded]);

  // Bubble Component
  const Bubbles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20 animate-float-bubble mix-blend-overlay"
          style={{
            width: `${Math.random() * 60 + 10}px`,
            height: `${Math.random() * 60 + 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-${Math.random() * 20}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="font-['Outfit'] bg-[#F9F7F3] text-[#0E3B43] min-h-screen selection:bg-[#0E3B43] selection:text-white overflow-x-hidden relative">
      
      {/* --- Dynamic Background Effects --- */}
      
      {/* 1. Mouse Follower Gradient (Sunlight effect) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(216, 195, 165, 0.15), transparent 40%)`
        }}
      />
      
      {/* 2. Noise Texture Overlay (Grainy Film Look) */}
      <div 
        className="fixed inset-0 opacity-[0.03] z-[1] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* --- Navigation --- */}
      <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-[#F9F7F3]/80 border-b border-[#0E3B43]/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-3xl font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform relative z-50">
            FLOAT.
          </div>
          
          <div className="hidden md:flex space-x-12 text-sm font-semibold tracking-widest uppercase">
            {['Shop', 'Story', 'Vibe', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden">
                <span className="relative z-10">{item}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0E3B43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative group hover:scale-110 transition-transform" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] text-white bg-[#0E3B43] rounded-full animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Cart Sidebar --- */}
      <div className={`fixed inset-0 z-[60] transform transition-transform duration-500 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#F9F7F3] shadow-2xl p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">YOUR STASH</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#0E3B43]/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                <ShoppingBag size={48} />
                <p>Your cooler is empty.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-sm border-b border-[#0E3B43]">Start Filling It</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm animate-fade-in">
                  <ImageWithLoader 
                    src={item.image} 
                    alt={item.name} 
                    containerClassName={`w-16 h-16 rounded-xl ${item.color} p-2 flex-shrink-0`}
                    className="w-full h-full object-contain"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm opacity-60">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 border-t border-[#0E3B43]/10 pt-6 space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#0E3B43] text-[#F9F7F3] py-4 rounded-xl font-bold hover:bg-[#D8C3A5] hover:text-[#0E3B43] transition-colors shadow-lg hover:shadow-xl">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F7F3] flex flex-col justify-center items-center space-y-8 animate-fade-in">
          {['Shop', 'Story', 'Vibe', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-bold text-[#0E3B43] hover:text-[#D8C3A5] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* --- Hero Section --- */}
      <header ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden pb-40">
        
        {/* Animated Background Elements - More "Alive" */}
        <div className="absolute top-20 left-10 opacity-30 animate-drift-slow cloud-bg pointer-events-none">
          <Wind size={120} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-60 right-10 opacity-30 animate-drift-slow delay-1000 cloud-bg pointer-events-none">
          <Wind size={80} strokeWidth={0.5} />
        </div>
        
        {/* Breathing Abstract Blobs */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#BA68C8] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 animate-breathe pointer-events-none"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#81C784] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-breathe delay-700 pointer-events-none"></div>
        
        <Bubbles />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center h-full">
          <div className="space-y-12">
            <div className="overflow-hidden p-2">
              <h1 ref={titleRef} className="text-[20vw] leading-[0.8] font-extrabold tracking-tighter text-[#0E3B43] select-none scale-100 hover:scale-[1.02] transition-transform duration-1000 ease-in-out cursor-default">
                FLOAT.
              </h1>
            </div>
            <p className="hero-subtitle text-xl md:text-3xl text-[#0E3B43]/70 font-light max-w-2xl mx-auto">
              Organic fruit blends that taste like a day at the beach.<br/>No added sugar. Just waves of flavor.
            </p>
            
            {/* "Alive" Bubbling Button */}
            <div className="hero-subtitle flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
              <a 
                href="#shop" 
                className="group relative bg-[#0E3B43] text-[#F9F7F3] px-12 py-6 rounded-full font-bold tracking-wide overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                     <div key={i} className={`absolute bg-white/20 rounded-full w-4 h-4 bottom-[-20px] left-[${i * 20}%] animate-bubble-up`} style={{
                        left: `${(i + 1) * 15}%`,
                        animationDelay: `${i * 0.2}s`
                     }}></div>
                  ))}
                </div>
                <span className="relative z-10 flex items-center gap-3">
                   TASTE THE VIBE <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>
            
            <span className="block mt-8 text-sm font-bold tracking-widest opacity-40 uppercase animate-pulse">Scroll to Drift</span>
          </div>
        </div>

        {/* --- Multi-Layered Alive Waves (FIXED WIDTH) --- */}
        <div className="absolute bottom-0 left-0 w-full leading-[0] z-20 pointer-events-none overflow-hidden h-[200px] md:h-[280px]">
           {/* Layer 1: Slow, distant, transparent */}
           <svg className="absolute bottom-0 left-0 w-[200%] h-full text-[#D8C3A5]/20 fill-current animate-wave-slow" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
           {/* Layer 2: Medium speed, slightly darker */}
           <svg className="absolute bottom-0 left-[-20%] w-[200%] h-[90%] text-[#D8C3A5]/40 fill-current animate-wave-medium" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
           {/* Layer 3: Front, solid color */}
           <svg className="absolute bottom-0 left-[-10%] w-[200%] h-[80%] text-[#E8E4DA] fill-current animate-wave-fast -mb-[1px]" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>
      </header>

      {/* --- Product Section --- */}
      <section id="shop" className="py-24 bg-[#E8E4DA] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4">THE LINEUP</h2>
              <p className="text-[#0E3B43]/60 max-w-md">Bottled paradise. Each flavor is crafted to transport you to a specific moment by the ocean.</p>
            </div>
            <div className="hidden md:flex gap-2">
               <button className="p-3 rounded-full border border-[#0E3B43]/20 hover:bg-[#0E3B43] hover:text-[#F9F7F3] transition-colors"><Waves size={20}/></button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div 
                key={product.id}
                ref={el => bottleRefs.current[idx] = el}
                className="group relative h-[500px] bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col items-center"
              >
                {/* Background Color Circle */}
                <div className={`absolute top-0 w-full h-1/2 rounded-b-[3rem] opacity-20 transition-all duration-500 group-hover:h-3/4 ${product.color}`}></div>
                
                {/* Image with Optimized Loader and NEW FRAMING */}
                <div className="relative z-10 h-64 w-full mb-6 transform group-hover:-translate-y-4 transition-transform duration-500">
                  <ImageWithLoader 
                    src={product.image} 
                    alt={product.name}
                    containerClassName="w-full h-full rounded-[2rem]"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 text-center mt-auto w-full">
                   <div className="flex justify-between items-center mb-2 px-2">
                     <h3 className="text-xl font-bold group-hover:text-[#0E3B43] transition-colors">{product.name}</h3>
                     <span className="font-bold text-[#0E3B43]">${product.price.toFixed(2)}</span>
                   </div>
                   <p className="text-xs tracking-widest uppercase opacity-60 mb-4">{product.tagline}</p>
                   
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       addToCart(product);
                     }}
                     className="w-full py-3 rounded-xl bg-[#F9F7F3] text-[#0E3B43] font-bold hover:bg-[#0E3B43] hover:text-[#F9F7F3] transition-all duration-300 flex justify-center items-center gap-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 shadow-md"
                   >
                     <Plus size={16} /> Add to Cart
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The Vibe (About) --- */}
      <section id="vibe" className="py-32 relative overflow-hidden bg-[#F9F7F3]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D8C3A5] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Droplets className="w-12 h-12 mx-auto mb-8 text-[#0E3B43] animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
            WE DON'T JUST MAKE JUICE.<br/>
            WE BOTTLE THE <span className="italic font-serif">FEELING</span> OF DOING ABSOLUTELY NOTHING.
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              { title: "Pure", text: "No synthetics. Just nature." },
              { title: "Slow", text: "Cold-pressed to keep the chill." },
              { title: "Alive", text: "Enzymes that wake you up." }
            ].map((item, i) => (
               <div key={i} className="border-t border-[#0E3B43]/20 pt-6">
                 <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                 <p className="text-[#0E3B43]/70">{item.text}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Marquee --- */}
      <div className="bg-[#0E3B43] text-[#F9F7F3] py-6 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {Array(10).fill("KEEP IT FRESH • STAY AFLOAT • SIP THE TIDE • ").map((text, i) => (
            <span key={i} className="text-xl font-bold tracking-widest mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* --- Contact --- */}
      <section id="contact" className="py-24 px-6 bg-[#F9F7F3]">
        <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9F7F3] rounded-bl-full"></div>
           
           <h2 className="text-4xl font-bold mb-2">SEND A WAVE</h2>
           <p className="text-[#0E3B43]/60 mb-8">Questions? Collabs? Just want to say hi?</p>
           
           <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent to the ocean!"); }}>
             <div className="group">
               <label className="block text-sm font-bold mb-2 ml-4">YOUR NAME</label>
               <input type="text" className="w-full bg-[#F9F7F3] rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#0E3B43]/20 transition-all" placeholder="Captain Jack" />
             </div>
             <div>
               <label className="block text-sm font-bold mb-2 ml-4">YOUR MESSAGE</label>
               <textarea rows="4" className="w-full bg-[#F9F7F3] rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#0E3B43]/20 transition-all" placeholder="Tell us everything..."></textarea>
             </div>
             <button className="w-full bg-[#0E3B43] text-[#F9F7F3] py-5 rounded-2xl font-bold text-lg hover:bg-[#D8C3A5] hover:text-[#0E3B43] transition-colors shadow-lg">
               LAUNCH BOTTLE
             </button>
           </form>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0E3B43] text-[#F9F7F3] pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-6xl font-bold tracking-tighter mb-4">FLOAT.</h2>
            <p className="opacity-60">© 2024 Float Juice Co.</p>
          </div>
          <div className="flex gap-8">
            <Sun className="hover:animate-spin cursor-pointer" />
            <Waves className="hover:animate-pulse cursor-pointer" />
            <Wind className="hover:translate-x-1 cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* --- Global Styles for Tailwind Extensions --- */}
      <style>{`
        @keyframes float-bubble {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          25% { transform: translateY(-25vh) translateX(15px) scale(1.1); opacity: 0.6; }
          50% { transform: translateY(-50vh) translateX(-15px) scale(1.2); }
          75% { transform: translateY(-75vh) translateX(15px) scale(1.3); }
          100% { transform: translateY(-100vh) translateX(0) scale(1.5); opacity: 0; }
        }
        .animate-float-bubble {
          animation: float-bubble 10s infinite linear;
        }
        .animate-drift-slow {
          animation: drift 20s infinite alternate ease-in-out;
        }
        @keyframes drift {
          from { transform: translateX(-50px); }
          to { transform: translateX(50px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
        .animate-breathe {
          animation: breathe 8s infinite ease-in-out;
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Wave Animations */
        .animate-wave-slow { animation: wave 12s infinite linear; }
        .animate-wave-medium { animation: wave 8s infinite linear reverse; }
        .animate-wave-fast { animation: wave 6s infinite linear; }
        
        @keyframes wave {
           0% { transform: translateX(0); }
           50% { transform: translateX(-25%); }
           100% { transform: translateX(0); }
        }
        
        /* Button Bubbles */
        @keyframes bubble-up {
          0% { bottom: -20px; opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; }
          100% { bottom: 100%; opacity: 0; transform: scale(1.2); }
        }
        .group:hover .animate-bubble-up {
          animation: bubble-up 1.5s infinite ease-in;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FloatWebsite;