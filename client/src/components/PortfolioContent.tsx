import { ExternalLink, Github, Database, Code2, LineChart, Globe, TerminalSquare, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function AboutContent() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <motion.div variants={fadeUp} className="border-b border-border/40 pb-6">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Yash Pawade</h1>
        <p className="text-lg text-muted-foreground flex items-center gap-2">
          <TerminalSquare size={18} className="text-primary" /> Python Developer | Data Enthusiast | Problem Solver
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="code-block group hover:border-primary/50 transition-colors relative overflow-hidden backdrop-blur-md bg-card/80">
        <div className="absolute top-0 right-0 p-2 text-xs text-muted-foreground/30 font-mono">About.py</div>
        <pre className="text-foreground p-4">
{`<span className="text-chart-5 font-bold">class</span> <span className="text-chart-1 font-bold">Developer</span>:
    <span className="text-chart-5 font-bold">def</span> <span className="text-chart-4">__init__</span>(<span className="text-chart-3 italic">self</span>):
        <span className="text-chart-3">self</span>.name = <span className="text-chart-2">"Yash Pawade"</span>
        <span className="text-chart-3">self</span>.focus = [<span className="text-chart-2">"Data Analysis"</span>, <span className="text-chart-2">"Backend Systems"</span>, <span className="text-chart-2">"Web Development"</span>]
        <span className="text-chart-3">self</span>.philosophy = <span className="text-chart-2">"Discipline over motivation. Life is God-given \u2014 be thankful."</span>
    
    <span className="text-chart-5 font-bold">def</span> <span className="text-chart-4">about_me</span>(<span className="text-chart-3 italic">self</span>):
        <span className="text-chart-5 font-bold">return</span> <span className="text-chart-2">"""
        Intermediate Python developer with hands-on experience in NumPy, 
        MySQL, and full-stack web development. I bridge the gap between 
        raw data and meaningful insights.
        
        Currently exploring scalable architectures and building tools 
        that solve real problems, not just theoretical exercises.
        """</span>
`}
        </pre>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4 pt-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
          <Code2 size={24} className="text-accent" /> Why I Code
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg max-w-4xl border-l-2 border-primary/50 pl-4 py-1">
          I believe that great software is built on <strong className="text-white font-medium">consistency</strong>, not perfection. Every line of code is a step toward mastery. I'm driven by the challenge of turning complex problems into elegant solutions, whether it's optimizing database queries or building interactive dashboards.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function SkillsContent() {
  const skills = [
    { category: 'Data & Analytics', icon: <LineChart className="text-chart-1" size={20} />, items: ['NumPy', 'Pandas', 'Data Visualization', 'Statistical Analysis'] },
    { category: 'Backend', icon: <Database className="text-chart-3" size={20} />, items: ['Python', 'MySQL', 'Database Design', 'Query Optimization'] },
    { category: 'Frontend', icon: <Globe className="text-chart-4" size={20} />, items: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React'] },
    { category: 'Tools & Platforms', icon: <TerminalSquare className="text-chart-5" size={20} />, items: ['Git', 'GitHub', 'Linux', 'VS Code', 'Jupyter Notebook'] },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <motion.div variants={fadeUp} className="border-b border-border/40 pb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Technical Skills</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {skills.map((section, idx) => (
          <motion.div variants={fadeUp} key={section.category} className="bg-card/40 border border-border/50 rounded-xl p-5 hover:border-primary/50 hover:bg-card/60 transition-all">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              {section.icon} {section.category}
            </h2>
            <div className="flex flex-wrap gap-2">
              {section.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-background border border-border text-foreground hover:text-white hover:border-primary/50 rounded-md text-sm font-mono transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="code-block relative bg-card/80 mt-8 group hover:border-primary/50 transition-colors">
        <pre className="text-foreground p-4">
{`<span className="text-muted-foreground italic"># Proficiency Levels</span>
<span className="text-foreground">expertise</span> = {
    <span className="text-chart-2">"Python"</span>: <span className="text-chart-2">"Intermediate"</span>,
    <span className="text-chart-2">"NumPy"</span>: <span className="text-chart-2">"Intermediate"</span>,
    <span className="text-chart-2">"MySQL"</span>: <span className="text-chart-2">"Intermediate"</span>,
    <span className="text-chart-2">"HTML/CSS"</span>: <span className="text-chart-2">"Intermediate"</span>,
    <span className="text-chart-2">"JavaScript"</span>: <span className="text-chart-2">"Beginner-Intermediate"</span>,
    <span className="text-chart-2">"React"</span>: <span className="text-chart-2">"Beginner"</span>
}

<span className="text-muted-foreground italic"># Always Learning</span>
<span className="text-foreground">current_focus</span> = <span className="text-chart-2">"Full-stack development & Data pipelines"</span>`}
        </pre>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsContent() {
  const projects = [
    {
      id: 'project-1',
      title: 'Data Analysis Dashboard',
      description: 'A web-based dashboard for analyzing and visualizing datasets using NumPy and Python. Features interactive charts, filtering capabilities, and export functionality.',
      tech: ['Python', 'NumPy', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      status: 'In Development',
      github: 'https://github.com/yash-pawade',
      icon: <LineChart className="text-chart-1" />
    },
    {
      id: 'project-2',
      title: 'MySQL Database Optimization',
      description: 'Optimized database schema design and query performance tuning for a mid-scale application. Implemented indexing strategies and query optimization techniques.',
      tech: ['MySQL', 'Python', 'Database Design'],
      status: 'Completed',
      github: 'https://github.com/yash-pawade',
      icon: <Database className="text-chart-3" />
    },
    {
      id: 'project-3',
      title: 'Web Scraper & Data Pipeline',
      description: 'Automated data collection and processing pipeline using Python. Scrapes data from multiple sources, cleans it, and stores it in MySQL for analysis.',
      tech: ['Python', 'NumPy', 'MySQL', 'Javascript'],
      status: 'In Development',
      github: 'https://github.com/yash-pawade',
      icon: <Search className="text-chart-4" />
    },
    {
      id: 'project-4',
      title: 'Interactive Bootstrap Dashboard',
      description: 'Responsive web interface built with Bootstrap and vanilla JavaScript. Features real-time data updates and intuitive UI components.',
      tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
      status: 'Completed',
      github: 'https://github.com/yash-pawade',
      icon: <Globe className="text-chart-5" />
    },
  ];

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <motion.div variants={fadeUp} className="border-b border-border/40 pb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Selected Projects</h1>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-2">
        {projects.map((project, index) => (
          <motion.div variants={fadeUp} key={project.id} className="group bg-card/40 border border-border/50 rounded-xl p-6 hover:border-primary hover:shadow-[0_0_20px_rgba(0,122,204,0.1)] transition-all flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-background rounded-lg border border-border/50">
                  {project.icon}
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h2>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed flex-1 relative z-10">{project.description}</p>

            <div className="flex justify-between items-end mt-auto relative z-10">
              <div className="flex flex-wrap gap-2 pr-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 bg-background border border-border/60 text-muted-foreground rounded-md font-mono">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-col items-end gap-3 min-w-fit">
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 ${
                  project.status === 'Completed'
                    ? 'bg-chart-1/10 text-chart-1 border border-chart-1/20'
                    : 'bg-chart-2/10 text-chart-2 border border-chart-2/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'Completed' ? 'bg-chart-1' : 'bg-chart-2'
                  }`}></span>
                  {project.status}
                </span>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-background border border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  aria-label="View on GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ContactContent() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 pb-10">
      <motion.div variants={fadeUp} className="border-b border-border/40 pb-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Get In Touch</h1>
      </motion.div>

      <motion.div variants={fadeUp} className="code-block bg-card/80 group hover:border-primary/50 transition-colors">
        <pre className="text-foreground p-4">
{`<span className="text-foreground">contact_info</span> = {
    <span className="text-chart-2">"email"</span>: <span className="text-chart-2">"yashpawade19@gmail.com"</span>,
    <span className="text-chart-2">"github"</span>: <span className="text-chart-2">"https://github.com/yash-pawade"</span>,
    <span className="text-chart-2">"linkedin"</span>: <span className="text-chart-2">"https://www.linkedin.com/in/yash-pawade-6125a5379"</span>,
    <span className="text-chart-2">"response_time"</span>: <span className="text-chart-2">"Usually within 24 hours"</span>
}

<span className="text-muted-foreground italic"># Let's connect!</span>
<span className="text-foreground">message</span> = <span className="text-chart-2">"I'm always open to discussing new projects, ideas, or opportunities."</span>`}
        </pre>
      </motion.div>

      <motion.div variants={fadeUp} className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="mailto:yashpawade19@gmail.com"
          className="flex flex-col items-center justify-center gap-3 p-6 bg-card/40 border border-border/50 rounded-xl hover:border-primary hover:bg-card/80 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,122,204,0.3)] transition-all">
            <span className="text-2xl">📧</span>
          </div>
          <div className="text-center">
            <p className="font-mono text-sm font-bold text-white mb-1">Email</p>
            <p className="text-[11px] text-muted-foreground break-all">yashpawade19@gmail.com</p>
          </div>
        </a>

        <a
          href="https://github.com/yash-pawade"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-3 p-6 bg-card/40 border border-border/50 rounded-xl hover:border-primary hover:bg-card/80 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,122,204,0.3)] transition-all text-white">
            <Github size={24} />
          </div>
          <div className="text-center">
            <p className="font-mono text-sm font-bold text-white mb-1">GitHub</p>
            <p className="text-[11px] text-muted-foreground break-all">github.com/yash-pawade</p>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/yash-pawade-6125a5379"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-3 p-6 bg-card/40 border border-border/50 rounded-xl hover:border-primary hover:bg-card/80 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,122,204,0.3)] transition-all text-[#0077b5]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </div>
          <div className="text-center">
            <p className="font-mono text-sm font-bold text-white mb-1">LinkedIn</p>
            <p className="text-[11px] text-muted-foreground break-all">in/yash-pawade</p>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
