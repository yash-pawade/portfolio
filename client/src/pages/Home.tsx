import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Github, Linkedin, Mail,
  Database, Layout, Briefcase, GraduationCap, Zap, GitBranch, CheckCircle2, Circle, Loader2, Terminal
} from 'lucide-react';

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
  "Why do Java developers wear glasses? Because they don't C#! 👓",
  "I would tell you a UDP joke, but you might not get it. 📦",
  "There are 10 types of people: those who understand binary, and those who don't. 🔢",
  "How many programmers does it take to change a light bulb? None — that's a hardware problem! 💡",
  "Why did the developer go broke? Because they used up all their cache! 💸",
  "A programmer's diet: Coffee → Code → Bug → Coffee → Repeat ☕",
];

type TermLine = { type: 'cmd' | 'out' | 'err' | 'banner'; text: string };

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

// ─── TypeWriter (cycling) ──────────────────────────────────────────────────────
function TypeWriter({ strings, typeSpeed = 55, eraseSpeed = 28, pauseAfterType = 2200 }: {
  strings: string[];
  typeSpeed?: number;
  eraseSpeed?: number;
  pauseAfterType?: number;
}) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const cur = strings[idx];
    if (typing) {
      if (display.length < cur.length) {
        const t = setTimeout(() => setDisplay(cur.slice(0, display.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), pauseAfterType);
        return () => clearTimeout(t);
      }
    } else {
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay(d => d.slice(0, -1)), eraseSpeed);
        return () => clearTimeout(t);
      } else {
        setIdx(i => (i + 1) % strings.length);
        setTyping(true);
      }
    }
  }, [display, typing, idx, strings, typeSpeed, eraseSpeed, pauseAfterType]);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <span>
      {display}
      <span className="transition-opacity" style={{ opacity: cursor ? 1 : 0, color: 'var(--primary)' }}>|</span>
    </span>
  );
}

// ─── TypeWriterInView (one-shot, triggers on scroll) ──────────────────────────
function TypeWriterInView({ text, typeSpeed = 28 }: { text: string; typeSpeed?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => { if (inView) setStarted(true); }, [inView]);

  useEffect(() => {
    if (!started) return;
    if (display.length < text.length) {
      const t = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), typeSpeed);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [display, started, text, typeSpeed]);

  // Blink cursor until done, then keep solid
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, [done]);

  return (
    <span ref={ref}>
      <span className="text-foreground font-medium italic" style={{ color: 'var(--foreground)' }}>
        "{display}"
      </span>
      <span style={{ opacity: done ? 1 : (cursor ? 1 : 0), color: 'var(--primary)', fontStyle: 'normal', fontWeight: 'normal' }}>|</span>
    </span>
  );
}

// ─── Skill Bar Component ───────────────────────────────────────────────────────
function SkillBar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1 text-sm font-mono">
        <span className="text-foreground">{label}</span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="h-2 bg-border/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #2a6496, #4A8FC4)' }}
        />
      </div>
    </div>
  );
}

// ─── Timeline Item ─────────────────────────────────────────────────────────────
function TimelineItem({ icon, title, org, period, desc, isLast = false }: {
  icon: React.ReactNode; title: string; org: string; period: string; desc?: string; isLast?: boolean;
}) {
  return (
    <motion.div variants={fadeInUp} className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-card border border-primary/40 flex items-center justify-center text-primary flex-shrink-0 shadow-[0_0_10px_rgba(100,255,218,0.15)]">
          {icon}
        </div>
        {!isLast && <div className="w-[1px] flex-1 bg-border/40 mt-2" />}
      </div>
      <div className={`pb-10 ${isLast ? '' : ''}`}>
        <p className="text-xs font-mono text-primary mb-1">{period}</p>
        <h4 className="text-lg font-bold text-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm mb-1">{org}</p>
        {desc && <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>}
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const skills = [
    { label: 'HTML', pct: 80 },
    { label: 'CSS', pct: 85 },
    { label: 'JavaScript', pct: 70 },
    { label: 'Python', pct: 65 },
    { label: 'MySQL', pct: 35 },
  ];

  const navItems = ['About', 'Experience', 'Education', 'Skills', 'Learning', 'Play', 'Contact'];

  const [konamiActive, setKonamiActive] = useState(false);
  useKonamiCode(useCallback(() => setKonamiActive(true), []));

  return (
    <div className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen relative overflow-x-hidden">

      {/* ── Konami Easter Egg Overlay ──────────────────────────── */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setKonamiActive(false)}
          >
            {['🚀', '💻', '🧠', '⚡', '🎯', '🔥', '🌟', '🎮'].map((e, i) => (
              <motion.span key={i} className="absolute text-4xl select-none"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 400 }}
                transition={{ duration: 2.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                style={{ left: '50%', top: '50%' }}
              >{e}</motion.span>
            ))}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="relative z-10 bg-card border border-primary/50 rounded-2xl p-10 text-center shadow-[0_0_60px_rgba(74,143,196,0.3)] max-w-md"
            >
              <p className="text-5xl mb-4">🕹️</p>
              <h3 className="text-2xl font-bold text-white mb-2">Easter Egg Found!</h3>
              <p className="text-primary font-mono text-sm mb-4">↑↑↓↓←→←→BA</p>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                You discovered the Konami code! You're clearly a person of culture. 🎖️
              </p>
              <p className="text-xs font-mono text-muted-foreground/50 mt-6">click anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        animate={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(74,143,196,0.04), transparent 80%)` }}
      />

      {/* BG decorative blobs */}
      <div className="fixed top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none -z-0" style={{ background: 'rgba(27,46,60,0.25)' }} />
      <div className="fixed bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none -z-0" style={{ background: 'rgba(74,143,196,0.05)' }} />

      {/* ── Navbar ───────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="YP" className="h-11 w-11 object-contain" style={{ mixBlendMode: 'screen' }} />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Yash<span className="text-primary">.</span><span className="text-white">io</span>
              </span>
            </a>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 relative z-40">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center pt-20">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

            {/* Left — text content */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex-1">
              <motion.p variants={fadeInUp} className="text-primary font-mono mb-6 text-sm">Hi, my name is</motion.p>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-foreground">
                Yash Pawade.
              </motion.h1>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold tracking-tight text-muted-foreground mb-8 min-h-[2.5rem] md:min-h-[3rem]">
                <TypeWriter strings={[
                  'I turn raw data into insights.',
                  'I build backend systems.',
                  'I automate with Python.',
                  'I craft purposeful tools.',
                ]} />
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
                Python developer &amp; AI Trainee at <span className="text-primary font-medium">Baap Company</span>, specializing in Backend Systems, Data Analytics, and Web Development.
              </motion.p>

              {/* "Currently" badge */}
              <motion.div variants={fadeInUp} className="mb-10">
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-primary/30 rounded-full text-sm font-mono">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="text-muted-foreground">Currently:</span>
                  <span className="text-primary">AI Team Trainee @ Baap Company</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:yashpawade19@gmail.com"
                  className="px-7 py-3.5 border border-primary text-primary font-mono text-sm rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2"
                >
                  <Mail size={16} /> Say Hello
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right — profile image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Offset decorative border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
                {/* Profile Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 bg-card/60 shadow-[0_0_30px_rgba(74,143,196,0.15)] hover:border-primary/50 transition-colors z-10 group">
                  <img src="/dp.jpg" alt="Yash Pawade" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
                       onError={(e) => {
                         e.currentTarget.style.display = 'none';
                         const sibling = e.currentTarget.nextElementSibling as HTMLElement;
                         if(sibling) sibling.style.display = 'flex';
                       }}
                  />
                  <div className="hidden flex-col items-center justify-center gap-3 h-full w-full">
                    <svg className="text-primary/30" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <p className="text-xs font-mono text-muted-foreground text-center leading-relaxed">
                      Image missing.<br/>Put dp.jpg in<br/>client/public/
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section id="about" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-16">
            <motion.div variants={fadeInUp}>
              <SectionTitle n="01" title="About Me" />
              <div className="space-y-4 text-muted-foreground leading-relaxed text-[17px]">
                <p>Hello! I'm Yash — a Python developer who loves bridging the gap between raw data and meaningful insights. My journey began by automating everyday tasks in Python, which opened up a whole world of possibilities.</p>
                <p>Today, I work as an AI Team Trainee at <span className="text-primary">Baap Company</span> while pursuing a BCA at Mysore University. I build scalable tools that solve real problems.</p>
                <p>My core philosophy: <TypeWriterInView text="Believe in discipline, not motivation. Life is God-given — be thankful. Self-discipline is self-given — be humble. Believe in God. God is great." typeSpeed={32} /></p>
              </div>
            </motion.div>

            {/* Quick stats grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 content-start pt-2 md:pt-14">
              {[
                { n: '4+', label: 'Projects Built' },
                { n: 'BCA', label: 'Computer Applications' },
                { n: 'AI', label: 'Current Focus' },
                { n: '∞', label: 'Lines of Code' },
              ].map(({ n, label }) => (
                <div key={label} className="p-6 bg-card border border-border/50 rounded-xl text-center hover:border-primary/40 transition-colors">
                  <p className="text-3xl font-bold text-primary mb-1">{n}</p>
                  <p className="text-muted-foreground text-sm">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Experience ───────────────────────────────────────── */}
        <section id="experience" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeInUp}><SectionTitle n="02" title="Experience" /></motion.div>
            <div className="mt-2">
              <TimelineItem
                icon={<Briefcase size={18} />}
                title="Intern — AI Development Team"
                org="Baap Company"
                period="Aug 2025 – Present"
                desc="Started from coding fundamentals and progressed to an advanced level through structured mentorship and hands-on work. Currently embedded with the AI team, contributing to real-world AI development — building, testing, and refining intelligent systems and gaining practical experience in the AI development lifecycle."
                isLast
              />
            </div>
          </motion.div>
        </section>

        {/* ── Education ────────────────────────────────────────── */}
        <section id="education" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeInUp}><SectionTitle n="03" title="Education" /></motion.div>
            <div className="mt-2">
              <TimelineItem
                icon={<GraduationCap size={18} />}
                title="Bachelor of Computer Applications (BCA)"
                org="Mysore University"
                period="2025 – 2028"
                desc="Currently pursuing BCA, deepening knowledge in software development, database management, and web technologies alongside parallel professional work in AI."
              />
              <TimelineItem
                icon={<GraduationCap size={18} />}
                title="Higher Secondary Certificate (HSC)"
                org="Pune University"
                period="2023 – 2025"
                desc="Completed 12th standard, building a solid academic base that led to pursuing a formal degree in Computer Applications."
              />
              <TimelineItem
                icon={<GraduationCap size={18} />}
                title="Secondary School Certificate (SSC)"
                org="Pune University"
                period="Up to 2023"
                desc="Completed 10th standard, developing foundational skills in Mathematics and Science that sparked an interest in technology and computers."
                isLast
              />
            </div>
          </motion.div>
        </section>

        {/* ── Skills ───────────────────────────────────────────── */}
        <section id="skills" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeInUp}><SectionTitle n="04" title="Skills & Proficiency" /></motion.div>

            <div className="grid md:grid-cols-2 gap-12 mt-8">
              {/* Skill bars */}
              <motion.div variants={fadeInUp} className="bg-card border border-border/50 rounded-xl p-8">
                <h4 className="text-foreground font-semibold mb-6 flex items-center gap-2"><Zap size={18} className="text-primary" /> Proficiency Levels</h4>
                {skills.map((s) => <SkillBar key={s.label} {...s} />)}
              </motion.div>

              {/* Tools grid */}
              <motion.div variants={fadeInUp}>
                <h4 className="text-foreground font-semibold mb-6 flex items-center gap-2"><Layout size={18} className="text-primary" /> Tools & Platforms</h4>
                <div className="flex flex-wrap gap-3">
                  {['Git', 'GitHub', 'VS Code', 'Jupyter', 'NumPy', 'Pandas', 'Bootstrap', 'React'].map((t) => (
                    <span key={t} className="px-4 py-2 bg-card border border-border/60 text-muted-foreground rounded-lg text-sm font-mono hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-card border border-primary/20 rounded-xl">
                  <p className="text-primary font-mono text-sm mb-2">// currently_exploring</p>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'AI Pipelines', 'Data Science'].map((t) => (
                      <span key={t} className="px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Learning Tree ────────────────────────────────────── */}
        <section id="learning" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeInUp}><SectionTitle n="05" title="Learning Journey" /></motion.div>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-10 -mt-4 text-[15px] max-w-xl">
              A live map of everything I've picked up, what I'm actively mastering, and where I'm headed next.
            </motion.p>
            <LearningTree />
          </motion.div>
        </section>

        {/* ── Play Terminal ─────────────────────────────────────── */}
        <section id="play" className="py-24 border-t border-border/40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-4 whitespace-nowrap">
                <Terminal size={26} className="text-primary" />
                <h3 className="text-3xl font-bold text-foreground">Playground</h3>
                <div className="h-[1px] bg-border/40 flex-1 ml-2 max-w-[220px]" />
              </div>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8 text-[15px] max-w-xl">
              An interactive terminal. Type <code className="text-primary bg-card px-1.5 py-0.5 rounded font-mono text-xs">help</code> to see what you can do. 🎮
            </motion.p>
            <FunTerminal />
            <motion.p variants={fadeInUp} className="text-xs font-mono text-muted-foreground/40 mt-4 pl-1">
              💡 Tip: Try the Konami code on your keyboard for a secret...
            </motion.p>
          </motion.div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="py-32 border-t border-border/40 text-center max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.p variants={fadeInUp} className="text-primary font-mono mb-4 text-sm">What's Next?</motion.p>
            <motion.h3 variants={fadeInUp} className="text-5xl font-bold mb-6 text-foreground">Get In Touch</motion.h3>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-12 leading-relaxed">
              I'm always open to discussing new projects, collaborations, or opportunities — especially in the AI & Data space!
            </motion.p>
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:yashpawade19@gmail.com"
              className="inline-block px-10 py-4 border border-primary text-primary font-mono rounded-md hover:bg-primary/10 transition-colors"
            >
              Say Hello
            </motion.a>
          </motion.div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-40 py-8 text-center text-muted-foreground border-t border-border bg-card/20">
        <div className="flex justify-center gap-8 mb-5">
          {[
            { href: 'https://github.com/yash-pawade', icon: <Github size={20} /> },
            { href: 'https://www.linkedin.com/in/yash-pawade-6125a5379', icon: <Linkedin size={20} /> },
            { href: 'mailto:yashpawade19@gmail.com', icon: <Mail size={20} /> },
          ].map(({ href, icon }, i) => (
            <motion.a key={i} whileHover={{ y: -4, color: '#64ffda' }} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors">
              {icon}
            </motion.a>
          ))}
        </div>
        <p className="font-mono text-xs">Designed & Built by <span className="text-primary">Yash Pawade</span></p>
      </footer>

    </div>
  );
}

// ─── Section Title helper ──────────────────────────────────────────────────────
function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 whitespace-nowrap">
      <h3 className="text-3xl font-bold text-foreground">{title}</h3>
      <div className="h-[1px] bg-border/40 flex-1 ml-2 max-w-[220px]" />
    </div>
  );
}

// ─── Konami Code Hook ──────────────────────────────────────────────────────────
function useKonamiCode(callback: () => void) {
  const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const progress = useRef(0);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === SEQ[progress.current]) {
        progress.current++;
        if (progress.current === SEQ.length) { callback(); progress.current = 0; }
      } else {
        progress.current = e.key === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

// ─── Fun Terminal ──────────────────────────────────────────────────────────────
function FunTerminal() {
  const [lines, setLines] = useState<TermLine[]>([
    { type: 'banner', text: 'YASH' },
    { type: 'out', text: '' },
    { type: 'out', text: '  Welcome! Type "help" to see available commands.' },
    { type: 'out', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    const n: TermLine[] = [{ type: 'cmd', text: cmd }];
    switch (t) {
      case 'help':
        n.push(
          { type: 'out', text: '  +---------------------------------+' },
          { type: 'out', text: '  |  Available Commands             |' },
          { type: 'out', text: '  +---------------------------------+' },
          { type: 'out', text: '  |  whoami   -> About me            |' },
          { type: 'out', text: '  |  skills   -> My tech stack       |' },
          { type: 'out', text: '  |  contact  -> Get in touch        |' },
          { type: 'out', text: '  |  joke     -> Random dev joke      |' },
          { type: 'out', text: '  |  coffee   -> Essential fuel       |' },
          { type: 'out', text: '  |  github   -> Open my GitHub      |' },
          { type: 'out', text: '  |  clear    -> Clear terminal      |' },
          { type: 'out', text: '  +---------------------------------+' },
        ); break;
      case 'whoami':
      case 'whoiam': // Alias for common typo
        n.push(
          { type: 'out', text: '  Name    : Yash Pawade' },
          { type: 'out', text: '  Role    : Python Developer & AI Trainee' },
          { type: 'out', text: '  At      : Baap Company' },
          { type: 'out', text: '  Study   : BCA @ Mysore University' },
          { type: 'out', text: '  Motto   : Discipline over motivation 🧠' },
          { type: 'out', text: '  Status  : Always learning, always building 🚀' },
        ); break;
      case 'skills':
        n.push(
          { type: 'out', text: '  ✅  HTML5, CSS3, Bootstrap, JavaScript' },
          { type: 'out', text: '  ✅  Python, Git, GitHub' },
          { type: 'out', text: '  ⏳  NumPy, Pandas, MySQL & SQL' },
          { type: 'out', text: '  ⏳  AI Development (live @ Baap Co.)' },
          { type: 'out', text: '  🔮  Machine Learning, FastAPI, Docker' },
        ); break;
      case 'contact':
        n.push(
          { type: 'out', text: '  📧  yashpawade19@gmail.com' },
          { type: 'out', text: '  🐙  github.com/yash-pawade' },
          { type: 'out', text: '  💼  linkedin.com/in/yash-pawade-6125a5379' },
        ); break;
      case 'joke':
        n.push({ type: 'out', text: `  ${JOKES[Math.floor(Math.random() * JOKES.length)]}` });
        break;
      case 'coffee':
        n.push(
          { type: 'out', text: '  ☕  Brewing...' },
          { type: 'out', text: '  [################] 100%' },
          { type: 'out', text: '  Coffee ready! Productivity +9000 ⚡' },
        ); break;
      case 'github':
        window.open('https://github.com/yash-pawade', '_blank');
        n.push({ type: 'out', text: '  Opening GitHub... 🚀' });
        break;
      case 'clear':
        setLines([{ type: 'out', text: '  Terminal cleared. Type "help" for commands.' }, { type: 'out', text: '' }]);
        setInput(''); return;
      case '':
        break;
      default:
        n.push({ type: 'err', text: `  zsh: command not found: ${t}` });
        n.push({ type: 'err', text: '  Type "help" to see available commands.' });
    }
    n.push({ type: 'out', text: '' });
    setLines(prev => [...prev, ...n]);
    if (cmd.trim()) setCmdHistory(prev => [cmd.trim(), ...prev]);
    setHistIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(ni); setInput(cmdHistory[ni] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni); setInput(ni === -1 ? '' : cmdHistory[ni]);
    }
  };

  return (
    <motion.div variants={fadeInUp} className="rounded-xl overflow-hidden border border-border/50 shadow-[0_0_40px_rgba(74,143,196,0.07)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-b border-border/40 select-none">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="flex-1 text-center text-xs font-mono text-muted-foreground">yash@portfolio — bash</span>
      </div>
      {/* Body */}
      <div
        ref={containerRef}
        className="bg-[#06101a] p-5 min-h-[450px] max-h-[600px] overflow-y-auto font-mono text-sm cursor-text leading-6 scroll-smooth"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className={line.type === 'err' ? 'text-red-400' : line.type === 'banner' ? 'text-4xl md:text-6xl font-black text-white py-4 tracking-widest' : 'text-muted-foreground'}>
            {line.type === 'cmd'
              ? <><span className="text-emerald-400">yash</span><span className="text-muted-foreground/60">@portfolio</span><span className="text-white">:~$</span><span className="text-primary"> {line.text}</span></>
              : line.text
            }
          </div>
        ))}
        {/* Input line */}
        <div className="flex items-center mt-1">
          <span className="text-emerald-400">yash</span>
          <span className="text-muted-foreground/60">@portfolio</span>
          <span className="text-white">:~$</span>
          <span className="text-primary ml-1">&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-primary caret-primary"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Learning Tree ─────────────────────────────────────────────────────────────
type NodeStatus = 'done' | 'active' | 'planned';

interface LeafNode {
  label: string;
  status: NodeStatus;
  note?: string;
  pct?: number;
}

interface BranchNode {
  title: string;
  icon: React.ReactNode;
  color: string;
  leaves: LeafNode[];
}

function StatusDot({ status }: { status: NodeStatus }) {
  if (status === 'done') return <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />;
  if (status === 'active') return <Loader2 size={15} className="text-yellow-400 flex-shrink-0 animate-spin" style={{ animationDuration: '3s' }} />;
  return <Circle size={15} className="text-primary/40 flex-shrink-0" />;
}

function LeafRow({ leaf, isLast }: { leaf: LeafNode; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const statusColor = leaf.status === 'done' ? '#34d399' : leaf.status === 'active' ? '#facc15' : '#4A8FC4';
  return (
    <motion.div ref={ref} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        {/* Tree connector */}
        <div className="flex flex-col items-center self-stretch mr-0">
          <div className="w-[1px] flex-1 bg-border/40" />
          <div className="w-4 h-[1px] bg-border/40" />
          {!isLast && <div className="w-[1px] flex-1 bg-border/40" />}
          {isLast && <div className="w-[1px] flex-1" />}
        </div>
        <StatusDot status={leaf.status} />
        <span className="font-mono text-sm" style={{ color: leaf.status === 'done' ? '#d4d4d8' : leaf.status === 'active' ? '#facc15' : '#a89a99' }}>
          {leaf.label}
        </span>
        {leaf.note && <span className="text-[10px] px-2 py-0.5 rounded-full border font-mono" style={{ color: statusColor, borderColor: `${statusColor}40`, background: `${statusColor}10` }}>{leaf.note}</span>}
      </div>
      {leaf.pct !== undefined && (
        <div className="ml-12 h-1.5 bg-border/30 rounded-full overflow-hidden w-full max-w-xs">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${leaf.pct}%` } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${statusColor}80, ${statusColor})` }}
          />
        </div>
      )}
    </motion.div>
  );
}

function LearningTree() {
  const branches: BranchNode[] = [
    {
      title: 'Foundations',
      icon: <CheckCircle2 size={16} />,
      color: '#34d399',
      leaves: [
        { label: 'HTML5 & CSS3', status: 'done', note: 'Completed', pct: 80 },
        { label: 'Bootstrap', status: 'done', note: 'Completed', pct: 75 },
        { label: 'Git & GitHub', status: 'done', note: 'Completed', pct: 70 },
        { label: 'Python Fundamentals', status: 'done', note: 'Completed', pct: 65 },
        { label: 'JavaScript (ES6+)', status: 'done', note: 'Completed', pct: 70 },
      ],
    },
    {
      title: 'Currently Building',
      icon: <Loader2 size={16} className="animate-spin" style={{ animationDuration: '3s' }} />,
      color: '#facc15',
      leaves: [
        { label: 'NumPy & Pandas', status: 'active', note: 'In Progress', pct: 55 },
        { label: 'MySQL & SQL', status: 'active', note: 'In Progress', pct: 35 },
        { label: 'AI Team (Baap Co.)', status: 'active', note: 'Live Work', pct: 50 },
      ],
    },
    {
      title: 'Up Next',
      icon: <GitBranch size={16} />,
      color: '#4A8FC4',
      leaves: [
        { label: 'Machine Learning', status: 'planned', note: 'Queued' },
        { label: 'Data Science pipelines', status: 'planned', note: 'Queued' },
        { label: 'AI & LLM Integration', status: 'planned', note: 'Queued' },
        { label: 'Django / FastAPI', status: 'planned', note: 'Queued' },
        { label: 'Docker & DevOps', status: 'planned', note: 'Queued' },
      ],
    },
  ];

  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18 } } }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      className="relative"
    >
      {/* Root node */}
      <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-primary/30 rounded-xl mb-8 font-mono text-sm text-primary shadow-[0_0_20px_rgba(74,143,196,0.1)]">
        <GitBranch size={16} />
        <span>learning_tree</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-bold">yash-pawade</span>
      </motion.div>

      <div className="flex flex-col gap-8 pl-4">
        {branches.map((branch, bi) => (
          <motion.div key={branch.title} variants={fadeInUp} className="flex gap-4">
            {/* Branch vertical line */}
            <div className="flex flex-col items-center pt-1">
              <div className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0"
                style={{ borderColor: `${branch.color}50`, background: `${branch.color}15`, color: branch.color }}>
                {branch.icon}
              </div>
              {bi < branches.length - 1 && <div className="w-[1px] flex-1 mt-2" style={{ background: `${branch.color}25` }} />}
            </div>

            {/* Branch content */}
            <div className="flex-1 pb-2">
              <h4 className="font-bold text-base mb-4" style={{ color: branch.color }}>
                {branch.title}
              </h4>
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
                className="bg-card/40 border rounded-xl p-5 space-y-4"
                style={{ borderColor: `${branch.color}20` }}
              >
                {branch.leaves.map((leaf, li) => (
                  <LeafRow key={leaf.label} leaf={leaf} isLast={li === branch.leaves.length - 1} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-5 pl-4 text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-400" /> Completed</span>
        <span className="flex items-center gap-1.5"><Loader2 size={12} className="text-yellow-400" /> In Progress</span>
        <span className="flex items-center gap-1.5"><Circle size={12} className="text-primary/40" /> Planned</span>
      </motion.div>
    </motion.div>
  );
}
