import { motion, useScroll, useSpring, useMotionValue } from "motion/react";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X,
  Code2,
  Cpu,
  Globe,
  Zap,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { PROJECTS, SKILLS, Project } from "./constants";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: {
      height: 16,
      width: 16,
      x: mouseX,
      y: mouseY,
      backgroundColor: "var(--color-brand-orange)",
      mixBlendMode: "normal" as const,
    },
    hover: {
      height: 80,
      width: 80,
      x: mouseX,
      y: mouseY,
      backgroundColor: "var(--color-brand-white)",
      mixBlendMode: "difference" as const,
    },
    project: {
      height: 120,
      width: 120,
      x: mouseX,
      y: mouseY,
      backgroundColor: "var(--color-brand-orange)",
      mixBlendMode: "normal" as const,
    }
  };

  const projectEnter = () => {
    setCursorVariant("project");
    setCursorText("VIEW");
  };
  const projectLeave = () => {
    setCursorVariant("default");
    setCursorText("");
  };
  const linkEnter = () => setCursorVariant("hover");
  const linkLeave = () => setCursorVariant("default");

  return (
    <div id="portfolio-root" className="min-h-screen selection:bg-brand-orange selection:text-brand-black cursor-none">
      {/* Custom Cursor */}
      <motion.div
        id="custom-cursor"
        className="fixed top-0 left-0 rounded-full z-50 pointer-events-none flex items-center justify-center text-[10px] font-bold text-brand-black tracking-widest overflow-hidden -translate-x-1/2 -translate-y-1/2"
        variants={variants}
        animate={cursorVariant}
      >
        {cursorText}
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 h-1 bg-brand-orange z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav id="main-nav" className="fixed top-0 w-full z-40 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <motion.div
          id="logo"
          onMouseEnter={linkEnter}
          onMouseLeave={linkLeave}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display tracking-tighter"
        >
          STELLAR.
        </motion.div>
        
        <div id="nav-actions" className="flex items-center gap-8">
          <div id="desktop-links" className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest">
            {["Projects", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onMouseEnter={linkEnter}
                onMouseLeave={linkLeave}
                className="hover:text-brand-orange transition-colors"
                id={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>
          
          <button 
            id="menu-toggle"
            onMouseEnter={linkEnter}
            onMouseLeave={linkLeave}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -100 }}
        className={cn(
          "fixed inset-0 bg-brand-black z-30 flex flex-col items-center justify-center gap-8",
          !isMenuOpen && "pointer-events-none"
        )}
      >
        {["Home", "Projects", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onMouseEnter={linkEnter}
            onMouseLeave={linkLeave}
            onClick={() => setIsMenuOpen(false)}
            className="text-6xl font-display hover:text-brand-orange transition-colors uppercase"
            id={`mobile-nav-link-${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </motion.div>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-brand-orange font-mono text-sm uppercase tracking-[0.2em]">
                <Zap size={14} className="fill-current" />
                <span>Available for new projects</span>
              </div>
              <h1 className="text-[12vw] editorial-header font-display uppercase leading-[0.85]">
                STELLAR <br />
                <span className="text-stroke">CREATIONS</span>
              </h1>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-white/60 font-light max-w-lg leading-relaxed"
              >
                Crafting immersive digital experiences where high-end design meets industrial-grade engineering. 
                Focused on interaction, performance, and accessibility.
              </motion.p>
              
              <div className="flex gap-4 md:justify-end">
                <a 
                  id="cta-github"
                  href="#" 
                  onMouseEnter={linkEnter}
                  onMouseLeave={linkLeave}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-brand-orange hover:text-brand-orange transition-all"
                >
                  <Github size={20} />
                </a>
                <a 
                  id="cta-linkedin"
                  href="#" 
                  onMouseEnter={linkEnter}
                  onMouseLeave={linkLeave}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-brand-orange hover:text-brand-orange transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  id="cta-mail"
                  href="mailto:hello@stellar.dev" 
                  onMouseEnter={linkEnter}
                  onMouseLeave={linkLeave}
                  className="flex items-center gap-3 px-6 h-12 rounded-full bg-white text-brand-black font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl"
                >
                  <Mail size={18} />
                  <span>Get in touch</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 bg-brand-white text-brand-black">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2 block">Works</span>
                <h2 className="text-7xl font-display uppercase leading-none">RECENT PROJECTS</h2>
              </div>
              <div className="text-right">
                <p className="text-black/60 max-w-xs font-medium">A curated selection of my latest work in design & technology.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-24">
              {PROJECTS.map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx} 
                  onEnter={projectEnter}
                  onLeave={projectLeave}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-4 block">Experience</span>
                  <h2 className="text-6xl font-display uppercase leading-tight">BEYOND THE <br /><span className="text-stroke">PIXELS</span></h2>
                </div>
                
                <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                  With over 6 years of experience in the digital space, I've worked with startups and global enterprises to build products that scale. 
                  My approach is rooted in clean code, user-centric design, and a relentless pursuit of excellence.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-4xl font-display text-brand-orange mb-2">06+</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Years Experience</p>
                  </div>
                  <div className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                    <h3 className="text-4xl font-display text-brand-orange mb-2">50+</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Projects Delivered</p>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-orange mb-8 block">Tech Stack</span>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.map((skill) => (
                      <span 
                        key={skill}
                        className="px-6 py-3 rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-brand-black transition-all cursor-default"
                        id={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold uppercase tracking-wider text-white/90">Services</h4>
                  <div className="divide-y divide-white/10">
                    {[
                      { icon: <Globe size={20} />, title: "Web Development", desc: "Building fast, SEO-friendly, and maintainable web applications." },
                      { icon: <Cpu size={20} />, title: "UI/UX Design", desc: "Creating intuitive interfaces that users love to interact with." },
                      { icon: <Code2 size={20} />, title: "API Integration", desc: "Connecting your business to the world with seamless API architectures." }
                    ].map((service, i) => (
                      <div key={i} className="py-6 flex gap-6 group cursor-pointer" id={`service-${i}`}>
                        <div className="text-brand-orange group-hover:scale-110 transition-transform">{service.icon}</div>
                        <div>
                          <h5 className="font-bold text-white mb-1">{service.title}</h5>
                          <p className="text-sm text-white/50">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-brand-orange text-brand-black">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <h2 className="text-[10vw] font-display uppercase leading-[0.8] mb-8">
              LET'S CREATE <br /> SOMETHING <br /> EPIC TOGETHER
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a 
                href="mailto:hello@stellar.dev" 
                onMouseEnter={linkEnter}
                onMouseLeave={linkLeave}
                className="group relative inline-flex items-center gap-4 text-4xl md:text-6xl font-display uppercase underline decoration-2 underline-offset-8"
              >
                <span>SAY HELLO</span>
                <ArrowUpRight size={48} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </a>
            </div>

            <div className="pt-20 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-60">
              <p>&copy; 2024 STELLAR CREATIONS. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8">
                <a href="#" onMouseEnter={linkEnter} onMouseLeave={linkLeave} className="hover:text-white transition-colors">Twitter</a>
                <a href="#" onMouseEnter={linkEnter} onMouseLeave={linkLeave} className="hover:text-white transition-colors">Instagram</a>
                <a href="#" onMouseEnter={linkEnter} onMouseLeave={linkLeave} className="hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center text-white/20 text-xs font-mono uppercase tracking-[0.3em]">
        Design by Stellar • Built with Precision
      </footer>
    </div>
  );
}

function ProjectCard({ project, index, onEnter, onLeave }: { project: Project; index: number; onEnter: () => void; onLeave: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      id={`project-card-${project.id}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black mb-6">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors" />
        <a 
          href={project.link}
          className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"
        >
          <ArrowUpRight className="text-brand-black" />
        </a>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">{project.category}</p>
            <h3 className="text-3xl font-display uppercase tracking-tight group-hover:text-brand-orange transition-colors">{project.title}</h3>
          </div>
          <span className="font-mono text-sm font-bold text-black/20 mt-4">{project.year}</span>
        </div>
        <p className="text-black/60 line-clamp-2 max-w-md">{project.description}</p>
      </div>
    </motion.div>
  );
}
