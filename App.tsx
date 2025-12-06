import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { Chatbot } from './components/Chatbot';
import { 
  Palette, 
  Globe, 
  FileEdit, 
  Layout, 
  Smartphone, 
  Database, 
  Check, 
  Menu, 
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data for Pricing (based on image)
  const plans = [
    {
      name: "Basic Plan",
      price: "25,000",
      color: "border-genesis-cyan",
      textColor: "text-genesis-red",
      features: [
        "3-5 Page Website Development",
        "Basic Graphic Design (Logo, Favicon)",
        "Copywriting for all pages (up to 300 words/page)",
        "Mobile Responsive Design",
        "1 Month of Basic Support"
      ]
    },
    {
      name: "Standard Plan",
      price: "60,000",
      color: "border-genesis-red",
      textColor: "text-genesis-red",
      features: [
        "5-10 Page Website Development",
        "Full Branding Package (Logo, Style Guide)",
        "SEO-Optimized Copywriting",
        "CMS Integration (e.g., WordPress)",
        "Basic E-commerce (up to 10 products)",
        "3 Months of Standard Support"
      ]
    },
    {
      name: "Premium Plan",
      price: "120,000+",
      color: "border-teal-400",
      textColor: "text-genesis-red",
      features: [
        "Custom Web Application",
        "Advanced Branding & Marketing Collateral",
        "Comprehensive Content Strategy & Creation",
        "Advanced E-commerce & Integrations",
        "Dedicated Project Manager",
        "6 Months of Premium Support"
      ]
    }
  ];

  const services = [
    {
      icon: <Palette className="w-8 h-8 text-genesis-red" />,
      title: "Graphics Design",
      desc: "Creative visual identities, logos, and branding materials that make your business stand out."
    },
    {
      icon: <Globe className="w-8 h-8 text-genesis-cyan" />,
      title: "Web Development",
      desc: "Responsive, high-performance websites and web applications tailored to your specific needs."
    },
    {
      icon: <FileEdit className="w-8 h-8 text-purple-500" />,
      title: "Content Maintenance",
      desc: "Regular updates, SEO optimization, and content strategy to keep your digital presence fresh."
    }
  ];

  const portfolio = [
    { id: 1, img: "https://picsum.photos/id/1/800/600", title: "Addis Land Management", cat: "Web App" },
    { id: 2, img: "https://picsum.photos/id/119/800/600", title: "TIA Marketing", cat: "Branding" },
    { id: 3, img: "https://picsum.photos/id/180/800/600", title: "Cleaning Services", cat: "Web Design" },
    { id: 4, img: "https://picsum.photos/id/20/800/600", title: "Tech Dashboard", cat: "UI/UX" },
  ];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-600 hover:text-genesis-cyan font-medium transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-genesis-cyan font-medium transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-600 hover:text-genesis-cyan font-medium transition-colors">Portfolio</a>
              <a href="#pricing" className="text-gray-600 hover:text-genesis-cyan font-medium transition-colors">Pricing</a>
              <a href="#contact" className="px-6 py-2 bg-genesis-red text-white rounded-full font-medium hover:bg-pink-600 transition-all shadow-md hover:shadow-lg">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-genesis-cyan p-2">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 flex flex-col items-center space-y-4">
             <a href="#home" onClick={toggleMenu} className="text-gray-800 font-medium">Home</a>
             <a href="#services" onClick={toggleMenu} className="text-gray-800 font-medium">Services</a>
             <a href="#portfolio" onClick={toggleMenu} className="text-gray-800 font-medium">Portfolio</a>
             <a href="#pricing" onClick={toggleMenu} className="text-gray-800 font-medium">Pricing</a>
             <a href="#contact" onClick={toggleMenu} className="text-genesis-red font-bold">Contact Us</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-genesis-cyan/5 -skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              We Drive Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-cyan to-blue-600">Digital Transformation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Genesis IT Solutions provides top-tier web development, graphic design, and content strategies to elevate your brand in the digital era.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#pricing" className="px-8 py-4 bg-genesis-red text-white rounded-full font-semibold shadow-lg shadow-genesis-red/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                View Packages <ArrowRight size={20} />
              </a>
              <a href="#portfolio" className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
                Our Work
              </a>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
             <div className="relative w-full max-w-4xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-genesis-cyan to-genesis-red rounded-2xl blur opacity-30"></div>
                <img 
                  src="https://picsum.photos/1200/800?random=5" 
                  alt="Dashboard Preview" 
                  className="relative rounded-2xl shadow-2xl border border-white/50 w-full"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-genesis-cyan font-semibold tracking-wide uppercase">What We Do</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Digital Solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="mt-4 text-gray-600">A glimpse of our recent work and success stories.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {portfolio.map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-lg">
                <div className="aspect-w-16 aspect-h-9 w-full h-64 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-genesis-cyan font-medium text-sm mb-1">{item.cat}</span>
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Pricing Plans</h2>
            <p className="mt-4 text-gray-600">Transparent, one-time investment for your business growth.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-3xl p-8 border-2 ${plan.color} relative hover:shadow-2xl transition-all duration-300 ${index === 2 ? 'lg:transform lg:scale-105 shadow-xl' : 'shadow-md'}`}>
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-genesis-red text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`text-5xl font-bold ${plan.textColor} mb-2`}>{plan.price}</h3>
                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">ETB / one-time</span>
                  <h4 className={`text-2xl font-bold mt-4 ${plan.textColor}`}>{plan.name}</h4>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-genesis-cyan flex-shrink-0 mt-0.5 mr-3" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button className={`w-full py-3 rounded-xl font-bold transition-colors ${index === 1 ? 'bg-genesis-red text-white hover:bg-red-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="mb-8">
                <Logo size="lg" />
              </div>
              <p className="text-gray-400 mb-8 max-w-md">
                Ready to transform your digital presence? Contact us today for a free consultation and let's build something amazing together.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-genesis-cyan">
                    <Phone size={20} />
                  </div>
                  <span>+251 91 123 4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-genesis-cyan">
                    <Mail size={20} />
                  </div>
                  <span>info@genesis-it.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-genesis-cyan">
                    <MapPin size={20} />
                  </div>
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-genesis-cyan w-full text-white placeholder-gray-500" />
                  <input type="email" placeholder="Email" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-genesis-cyan w-full text-white placeholder-gray-500" />
                </div>
                <input type="text" placeholder="Subject" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-genesis-cyan w-full text-white placeholder-gray-500" />
                <textarea rows={4} placeholder="Message" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-genesis-cyan w-full text-white placeholder-gray-500"></textarea>
                <button type="submit" className="w-full bg-genesis-cyan text-gray-900 font-bold py-3 rounded-xl hover:bg-cyan-400 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Genesis IT Solutions. All rights reserved.
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
}

export default App;