import React, { useState, useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
interface Job {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
  highlight?: boolean;
}

interface SkillGroup {
  label: string;
  items: string[];
  accent: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const JOBS: Job[] = [
  {
    title: 'Senior Software Consultant',
    company: 'Hassean Health Ltd.',
    period: 'Sep 2025 – Present',
    location: 'London, UK (Remote)',
    highlight: true,
    bullets: [
      'Developing an Intelligent Health Assistant System powered by Generative AI',
      'Integrated Elevenlabs LLM & Claude LLM into production AI agents',
      'Built MCP (Model Context Protocol) pipelines for multi-agent orchestration',
      'Infrastructure setup: CI/CD pipelines, Docker, AWS EC2/ALB/S3/ECR',
      'Audit logging with CloudTrail + CloudWatch for compliance',
    ],
    stack: ['Claude LLM', 'Elevenlabs LLM', 'AI Agents', 'MCP', 'Python', 'NextJs', 'TypeScript', 'Docker', 'AWS'],
  },
  {
    title: 'Senior Software Engineer',
    company: 'FIMM – Helsinki University',
    period: 'Mar 2025 – Aug 2025',
    location: 'Helsinki, Finland',
    bullets: [
      'Maintaining Bio Medical software integrated with FinnGen dataset',
      'Developing and training AI agents for genomic data analysis',
      'Building analysis tools with DuckDB for large-scale data queries',
    ],
    stack: ['AI Agents', 'Python', 'Flask', 'MongoDB', 'PostgreSQL', 'DuckDB', 'C++', 'React', 'VueJs', 'Google Cloud', 'Kubernetes'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Blueprint Genetics Oy',
    period: 'May 2022 – Feb 2025',
    location: 'Espoo, Finland',
    bullets: [
      'Led software architecture design and cloud infrastructure improvements',
      'Implemented centralised authentication solution',
      'Built reusable component libraries across React, Angular, VueJs, NextJs',
    ],
    stack: ['GoLang', 'Python', 'React', 'Angular', 'NextJs', 'NestJs', 'MongoDB', 'PostgreSQL', 'AWS', 'Kubernetes'],
  },
  {
    title: 'Software Engineer',
    company: 'Dream Broker Oy',
    period: 'Aug 2019 – Apr 2022',
    location: 'Helsinki, Finland',
    bullets: [
      'Improved video communication platform with live streaming capability',
      'Wrote test-driven code across Backend and Frontend stacks',
    ],
    stack: ['PHP', 'Python', 'React', 'Angular', 'NextJs', 'Java Spring Boot', 'AWS', 'Docker'],
  },
  {
    title: 'Full Stack Developer',
    company: 'HeyDay Oy',
    period: 'Apr 2018 – Mar 2019',
    location: 'Helsinki, Finland',
    bullets: [
      'API & micro-services development',
      'DevOps and AWS architecture',
      'Data analytics, parsing, and visualisation',
    ],
    stack: ['Python', 'Flask', 'NodeJs', 'Angular', 'VueJs', 'PHP', 'Java Spring Boot', 'MySQL'],
  },
  {
    title: 'Back-End Developer',
    company: 'EHeaven Oy',
    period: 'Feb 2017 – May 2018',
    location: 'Helsinki, Finland',
    bullets: [
      'Backend development with PHP/Symfony, MongoDB, MySQL',
      'Unit testing with PhpUnit, DevOps technologies',
    ],
    stack: ['PHP', 'Symfony', 'MySQL', 'MongoDB', 'AngularJs', 'Java Spring Boot', 'Jenkins'],
  },
];

const AI_SKILLS: SkillGroup = {
  label: 'AI & Generative AI',
  accent: '#00ffe0',
  items: ['Claude LLM', 'Elevenlabs LLM', 'AI Agents', 'MCP (Model Context Protocol)', 'Generative AI Systems', 'LLM Integration', 'AI Pipeline Design', 'Health AI Systems', 'Genomic AI Analysis'],
};

const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Languages', accent: '#ff6b6b', items: ['Python', 'GoLang', 'TypeScript', 'JavaScript', 'PHP', 'C++', 'Java', 'C'] },
  { label: 'Frontend', accent: '#ffd93d', items: ['React', 'NextJs', 'Angular', 'VueJs', 'NestJs', 'HTML5', 'CSS3', 'Bootstrap'] },
  { label: 'Backend & APIs', accent: '#6bcb77', items: ['Django', 'Flask', 'Spring Boot', 'NodeJs', 'RESTful APIs', 'Microservices', 'GraphQL'] },
  { label: 'Cloud & DevOps', accent: '#4d96ff', items: ['AWS (EC2, S3, ALB, ECR)', 'CloudTrail', 'CloudWatch', 'Google Cloud', 'Docker', 'Kubernetes', 'CDK', 'CI/CD', 'Git'] },
  { label: 'Databases', accent: '#c77dff', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'DuckDB', 'Oracle', 'NoSQL'] },
];

// ── Utility: useInView ─────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Components ──────────────────────────────────────────────────────────────

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,255,224,0.1)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <span style={{ fontFamily: 'Space Mono', fontSize: '0.9rem', color: '#00ffe0', letterSpacing: '0.15em' }}>HS_</span>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {['AI', 'Experience', 'Skills', 'Contact'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} style={{
            fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#8888aa',
            textDecoration: 'none', letterSpacing: '0.1em',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00ffe0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8888aa')}
          >{s}</a>
        ))}
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const [typed, setTyped] = useState('');
  const full = 'Senior Software Engineer & AI Specialist';
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 2.5rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,255,224,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,224,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      {/* glow blob */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(0,255,224,0.12) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.8rem', color: '#00ffe0', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>
          {'>'} AVAILABLE FOR OPPORTUNITIES
        </p>
        <h1 style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(3rem, 7vw, 6rem)',
          lineHeight: 1.05, color: '#f0f0ff', margin: 0, marginBottom: '0.5rem',
        }}>
          Hafiz<br />
          <span style={{ color: '#00ffe0' }}>Sikandar</span>
        </h1>
        <p style={{
          fontFamily: 'Space Mono', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: '#aaaacc', marginTop: '1.2rem', minHeight: '1.5em',
        }}>
          {typed}<span style={{ animation: 'blink 1s step-end infinite', color: '#00ffe0' }}>|</span>
        </p>
        <p style={{ fontFamily: 'Syne', fontSize: '1rem', color: '#666688', marginTop: '1.5rem', maxWidth: '540px', lineHeight: 1.7 }}>
          7+ years building production-grade software across Finland & beyond.
          Currently specialising in <span style={{ color: '#00ffe0' }}>Generative AI</span>, LLM integration, and AI agent systems.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#ai" style={{
            fontFamily: 'Space Mono', fontSize: '0.8rem', padding: '0.75rem 1.8rem',
            background: '#00ffe0', color: '#0a0a0f', textDecoration: 'none',
            letterSpacing: '0.1em', fontWeight: 700,
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 20px rgba(0,255,224,0.3)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,255,224,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,224,0.3)'; }}
          >AI SKILLS →</a>
          <a href="https://github.com/hafa786" target="_blank" rel="noreferrer" style={{
            fontFamily: 'Space Mono', fontSize: '0.8rem', padding: '0.75rem 1.8rem',
            border: '1px solid rgba(0,255,224,0.3)', color: '#00ffe0', textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,224,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >GITHUB</a>
          <a href="https://www.linkedin.com/in/hafiz-sikandar/" target="_blank" rel="noreferrer" style={{
            fontFamily: 'Space Mono', fontSize: '0.8rem', padding: '0.75rem 1.8rem',
            border: '1px solid rgba(0,255,224,0.3)', color: '#00ffe0', textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,224,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >LINKEDIN</a>
        </div>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: '#444466', marginTop: '2rem', letterSpacing: '0.1em' }}>
          📍 Vantaa, Finland &nbsp;|&nbsp; (+358) 442467713 &nbsp;|&nbsp; hafizm.shehzad@gmail.com
        </p>
      </div>
    </section>
  );
};

const AISection: React.FC = () => {
  const { ref, inView } = useInView();
  const techItems = [
    { icon: '🤖', title: 'LLM Integration', desc: 'Integrated Claude LLM and Elevenlabs LLM into production health AI systems with real-time inference pipelines.' },
    { icon: '🧠', title: 'AI Agent Design', desc: 'Built and trained multi-agent systems using MCP (Model Context Protocol) for orchestrated task execution.' },
    { icon: '🏥', title: 'Health AI', desc: 'Developed an Intelligent Health Assistant System combining voice AI, LLMs, and clinical data workflows.' },
    { icon: '🔬', title: 'Genomic AI', desc: 'Developed AI agents at Helsinki University\'s FIMM for FinnGen genomic data analysis at scale.' },
    { icon: '⚙️', title: 'AI Infrastructure', desc: 'End-to-end AI deployment on AWS: ECR, EC2, ALB, CloudTrail audit logging, secret management.' },
    { icon: '🔗', title: 'MCP Pipelines', desc: 'Implemented Model Context Protocol pipelines enabling structured, reliable multi-step agent workflows.' },
  ];

  return (
    <section id="ai" style={{ padding: '7rem 2.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', left: '-10%', top: '30%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,255,224,0.06) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)',
      }} />
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#00ffe0', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
          {'>'} SPECIALISATION
        </p>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#f0f0ff', margin: '0 0 1rem' }}>
          AI & Generative <span style={{ color: '#00ffe0' }}>Intelligence</span>
        </h2>
        <p style={{ fontFamily: 'Syne', color: '#666688', fontSize: '1rem', marginBottom: '3.5rem', maxWidth: '560px', lineHeight: 1.7 }}>
          Building intelligent systems at the intersection of LLMs, multi-agent architectures, and real-world production infrastructure.
        </p>

        {/* AI badge strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3.5rem' }}>
          {AI_SKILLS.items.map((item, i) => (
            <span key={i} style={{
              fontFamily: 'Space Mono', fontSize: '0.72rem', padding: '0.4rem 0.9rem',
              border: '1px solid rgba(0,255,224,0.4)', color: '#00ffe0',
              background: 'rgba(0,255,224,0.06)',
              letterSpacing: '0.05em',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(10px)',
              transition: `all 0.4s ease ${i * 0.06}s`,
            }}>{item}</span>
          ))}
        </div>

        {/* cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {techItems.map((item, i) => (
            <div key={i} style={{
              padding: '1.8rem',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.5s ease ${0.1 + i * 0.08}s`,
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,224,0.3)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,224,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: '#00ffe0', margin: '0 0 0.6rem' }}>{item.title}</h3>
              <p style={{ fontFamily: 'Syne', fontSize: '0.88rem', color: '#8888aa', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection: React.FC = () => {
  const { ref, inView } = useInView(0.05);
  return (
    <section id="experience" style={{ padding: '7rem 2.5rem' }}>
      <div ref={ref} style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#00ffe0', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>{'>'} CAREER</p>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#f0f0ff', margin: '0 0 3.5rem' }}>
          Work <span style={{ color: '#00ffe0' }}>Experience</span>
        </h2>

        <div style={{ position: 'relative' }}>
          {/* timeline line */}
          <div style={{ position: 'absolute', left: '0', top: 0, bottom: 0, width: '1px', background: 'rgba(0,255,224,0.15)' }} />

          {JOBS.map((job, i) => (
            <div key={i} style={{
              paddingLeft: '2.5rem', paddingBottom: '3.5rem', position: 'relative',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.55s ease ${i * 0.1}s`,
            }}>
              {/* dot */}
              <div style={{
                position: 'absolute', left: '-5px', top: '6px',
                width: '11px', height: '11px', borderRadius: '50%',
                background: job.highlight ? '#00ffe0' : '#2a2a3a',
                border: '2px solid ' + (job.highlight ? '#00ffe0' : 'rgba(0,255,224,0.3)'),
                boxShadow: job.highlight ? '0 0 12px rgba(0,255,224,0.6)' : 'none',
              }} />

              <div style={{
                padding: '1.6rem 1.8rem',
                border: '1px solid ' + (job.highlight ? 'rgba(0,255,224,0.2)' : 'rgba(255,255,255,0.05)'),
                background: job.highlight ? 'rgba(0,255,224,0.03)' : 'rgba(255,255,255,0.015)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', color: job.highlight ? '#00ffe0' : '#d0d0f0', margin: 0 }}>
                    {job.title}
                  </h3>
                  <span style={{ fontFamily: 'Space Mono', fontSize: '0.7rem', color: '#555577' }}>{job.period}</span>
                </div>
                <p style={{ fontFamily: 'Space Mono', fontSize: '0.72rem', color: '#8888aa', margin: '0 0 1.1rem', letterSpacing: '0.05em' }}>
                  {job.company} &nbsp;·&nbsp; {job.location}
                </p>
                <ul style={{ margin: '0 0 1.2rem', paddingLeft: '1.2rem' }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ fontFamily: 'Syne', fontSize: '0.88rem', color: '#7777aa', lineHeight: 1.7, marginBottom: '0.3rem' }}>{b}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {job.stack.map((s, j) => (
                    <span key={j} style={{
                      fontFamily: 'Space Mono', fontSize: '0.65rem', padding: '0.25rem 0.6rem',
                      background: 'rgba(255,255,255,0.04)', color: '#6666aa',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="skills" style={{ padding: '7rem 2.5rem', background: 'rgba(0,255,224,0.015)' }}>
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#00ffe0', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>{'>'} TECHNICAL</p>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#f0f0ff', margin: '0 0 3rem' }}>
          Skills & <span style={{ color: '#00ffe0' }}>Stack</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {SKILL_GROUPS.map((group, i) => (
            <div key={i} style={{
              padding: '1.6rem',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.09}s`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.1rem' }}>
                <div style={{ width: '3px', height: '20px', background: group.accent }} />
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem', color: group.accent, margin: 0, letterSpacing: '0.05em' }}>{group.label}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {group.items.map((item, j) => (
                  <span key={j} style={{
                    fontFamily: 'Space Mono', fontSize: '0.68rem', padding: '0.3rem 0.65rem',
                    border: `1px solid ${group.accent}28`, color: '#9999bb',
                    background: `${group.accent}08`,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Education card */}
          <div style={{
            padding: '1.6rem',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${SKILL_GROUPS.length * 0.09}s`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.1rem' }}>
              <div style={{ width: '3px', height: '20px', background: '#ff9f43' }} />
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem', color: '#ff9f43', margin: 0, letterSpacing: '0.05em' }}>Education</h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.88rem', color: '#d0d0f0', margin: '0 0 0.2rem' }}>M.Sc. Computer Science</p>
              <p style={{ fontFamily: 'Space Mono', fontSize: '0.68rem', color: '#666688', margin: 0 }}>LUT University, Finland · 2016–2020</p>
            </div>
            <div>
              <p style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: '0.88rem', color: '#d0d0f0', margin: '0 0 0.2rem' }}>B.Sc. Computer Science</p>
              <p style={{ fontFamily: 'Space Mono', fontSize: '0.68rem', color: '#666688', margin: 0 }}>University of Lahore · 2009–2014</p>
            </div>
          </div>

          {/* Languages card */}
          <div style={{
            padding: '1.6rem',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: `all 0.5s ease ${(SKILL_GROUPS.length + 1) * 0.09}s`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.1rem' }}>
              <div style={{ width: '3px', height: '20px', background: '#a29bfe' }} />
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem', color: '#a29bfe', margin: 0, letterSpacing: '0.05em' }}>Languages</h3>
            </div>
            {[
              { lang: 'Urdu', level: 'Native' },
              { lang: 'English', level: 'B2 Professional' },
              { lang: 'Finnish', level: 'A2 Basic' },
            ].map(({ lang, level }) => (
              <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: 'Syne', fontSize: '0.88rem', color: '#9999bb' }}>{lang}</span>
                <span style={{ fontFamily: 'Space Mono', fontSize: '0.68rem', color: '#a29bfe' }}>{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="contact" style={{ padding: '7rem 2.5rem 5rem' }}>
      <div ref={ref} style={{
        maxWidth: '700px', margin: '0 auto', textAlign: 'center',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s ease',
      }}>
        <p style={{ fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#00ffe0', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>{'>'} CONTACT</p>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#f0f0ff', margin: '0 0 1.2rem' }}>
          Let's <span style={{ color: '#00ffe0' }}>Build</span> Together
        </h2>
        <p style={{ fontFamily: 'Syne', fontSize: '1rem', color: '#666688', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Open to software engineering roles, AI consulting, and interesting projects — especially at the frontier of generative AI.
        </p>
        <a href="mailto:hafizm.shehzad@gmail.com" style={{
          display: 'inline-block',
          fontFamily: 'Space Mono', fontSize: '0.85rem', padding: '1rem 2.5rem',
          background: '#00ffe0', color: '#0a0a0f', textDecoration: 'none',
          fontWeight: 700, letterSpacing: '0.1em',
          boxShadow: '0 0 30px rgba(0,255,224,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 40px rgba(0,255,224,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,224,0.35)'; }}
        >hafizm.shehzad@gmail.com</a>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem' }}>
          {[
            { label: 'GitHub', url: 'https://github.com/hafa786' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hafiz-sikandar/' },
          ].map(({ label, url }) => (
            <a key={label} href={url} target="_blank" rel="noreferrer" style={{
              fontFamily: 'Space Mono', fontSize: '0.75rem', color: '#8888aa',
              textDecoration: 'none', letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00ffe0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8888aa')}
            >{label}</a>
          ))}
        </div>

        <p style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: '#333355', marginTop: '4rem', letterSpacing: '0.1em' }}>
          "Failure is not an end state, it is just a decision point."
        </p>
      </div>
    </section>
  );
};

// ── App ────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0a0a0f;
          color: #f0f0ff;
          font-family: 'Syne', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,224,0.3); }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
      <NavBar />
      <Hero />
      <AISection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
};

export default App;
