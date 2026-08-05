import { useEffect, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import './App.css'

type Theme = 'light' | 'dark'

const experience = [
  {
    period: 'Jul 2021 — Present',
    role: 'Software Engineer',
    company: 'Microsoft · Viva Engage',
    detail:
      'Leading cross-team initiatives across internationalization, accessibility, design systems, developer tooling, and Microsoft 365 integrations.',
  },
  {
    period: 'Dec 2019 — Jun 2021',
    role: 'Software Engineer',
    company: 'QuintoAndar',
    detail:
      'Built React operations tooling, expanded internal design-system libraries, and introduced Jest testing to strengthen quality.',
  },
  {
    period: 'Apr 2019 — Nov 2019',
    role: 'Full-Stack Developer',
    company: 'PRORADIS',
    detail:
      'Developed Flutter mobile applications and C# services for a healthcare platform delivering patient reports and medical imaging.',
  },
  {
    period: 'Aug 2018 — Mar 2019',
    role: 'Web Developer',
    company: 'Vitrio',
    detail:
      'Created high-performing VTEX storefronts and used analytics insights to improve personalized shopping experiences.',
  },
  {
    period: 'Sep 2016 — Jul 2018',
    role: 'Web Developer',
    company: 'epico.digital',
    detail:
      'Delivered client web projects with Bootstrap, Sass, PHP, and Laravel while adopting Angular and Vue.js.',
  },
  {
    period: 'Jun 2016 — Sep 2016',
    role: 'Web Developer',
    company: 'Agência D1UP',
    detail:
      'Built promotional websites with semantic HTML and modern CSS in a multidisciplinary team.',
  },
]

const projects = [
  {
    number: '01',
    title: 'Global by default',
    category: 'Internationalization',
    description:
      'Led the initiative that added support for 11 new languages in Viva Engage, extending a Microsoft 365 experience to more people around the world.',
    tags: ['TypeScript', 'React', 'i18n'],
    visual: 'meridian',
  },
  {
    number: '02',
    title: 'Inclusive at scale',
    category: 'Accessibility',
    description:
      'Improved the web app and its Teams, Outlook, and SharePoint integrations to WCAG 2.1 AA across contrast, keyboard, high-contrast, and 400% zoom.',
    tags: ['WCAG 2.1 AA', 'Microsoft 365', 'Design systems'],
    visual: 'forma',
  },
  {
    number: '03',
    title: 'Engineering leverage',
    category: 'Platform & developer tools',
    description:
      'Re-engineered a quality-of-service pipeline from Bash to TypeScript and created tools that consolidate tickets, incidents, pull requests, and work items.',
    tags: ['TypeScript', 'Node.js', 'Telemetry'],
    visual: 'current',
  },
]

const skills = [
  {
    title: 'Languages & frameworks',
    items: ['TypeScript', 'JavaScript', 'React', 'Node.js', 'HTML & CSS'],
  },
  {
    title: 'Engineering focus',
    items: ['Accessibility', 'Design systems', 'Internationalization', 'Performance', 'Telemetry'],
  },
  {
    title: 'Platforms & tools',
    items: ['Microsoft 365', 'Jest', 'Webpack', 'Azure DevOps', 'CI/CD'],
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  )
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === 'light' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
    </svg>
  )
}

function ContactForm() {
  const [state, handleSubmit] = useForm('meajjwza')

  if (state.succeeded) {
    return (
      <div className="form-success" role="status">
        <span>Message received</span>
        <h3>Thank you for reaching out.</h3>
        <p>I&apos;ll get back to you as soon as I can.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New portfolio inquiry" />
      <div className="field-row">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <ValidationError
            className="form-error"
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me a little about what you're working on..."
          required
        />
        <ValidationError
          className="form-error"
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </label>
      <div className="form-footer">
        <p>
          Prefer email?{' '}
          <a href="mailto:stephanyn7@gmail.com">stephanyn7@gmail.com</a>
        </p>
        <button type="submit" disabled={state.submitting}>
          {state.submitting ? 'Sending...' : 'Send message'}
          <ArrowIcon />
        </button>
      </div>
      <ValidationError
        className="form-error form-error-general"
        errors={state.errors}
      />
    </form>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f3f0e9' : '#151515')
  }, [theme])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Stephany Nusch, home">
          SN<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <ThemeIcon theme={theme} />
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-kicker" data-reveal>
            <span className="status-dot" />
            Vancouver, BC · Front-End & Platform Engineering
          </div>
          <h1 data-reveal>
            I engineer web experiences
            <span>at global scale.</span>
          </h1>
          <div className="hero-bottom" data-reveal>
            <p>
              I&apos;m Stephany, a software engineer specializing in TypeScript
              and React architecture. I build accessible, high-performance
              websites and platforms from Vancouver, BC.
            </p>
            <a className="text-link" href="#work">
              Explore selected work <ArrowIcon />
            </a>
          </div>
          <div className="hero-marker" aria-hidden="true">
            <span>Scroll</span>
            <i />
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="section-label" data-reveal>
            <span>01</span> About
          </div>
          <div className="about-grid">
            <h2 data-reveal>
              I build software that is inclusive, resilient, and designed to
              create <em>lasting impact.</em>
            </h2>
            <div className="about-copy" data-reveal>
              <p>
                For 9+ years, I&apos;ve built high-performance web experiences
                across front-end and platform engineering, including five
                years on Microsoft&apos;s Viva Engage product.
              </p>
              <p>
                As a Vancouver-based website developer, I partner across
                engineering, product, and design to own complex initiatives
                end-to-end. I use automation and AI to scale impact without
                losing sight of the people using what we build.
              </p>
            </div>
          </div>
        </section>

        <section className="experience section-pad" id="experience">
          <div className="section-label" data-reveal>
            <span>02</span> Experience
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" data-reveal key={item.company}>
                <p className="period">{item.period}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p className="company">{item.company}</p>
                </div>
                <p className="experience-detail">{item.detail}</p>
              </article>
            ))}
          </div>
          <a
            className="text-link resume-link"
            href="/Stephany_Nusch_Resume.pdf"
            download
          >
            Download full resume <ArrowIcon />
          </a>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading" data-reveal>
            <div className="section-label">
              <span>03</span> Selected work
            </div>
            <p>Selected impact across products used by millions of people.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" data-reveal key={project.title}>
                <a
                  className={`project-visual ${project.visual}`}
                  href="#experience"
                  aria-label={`Learn more about ${project.title}`}
                >
                  <span className="project-number">{project.number}</span>
                  <div className="visual-art" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="project-action">
                    View experience <ArrowIcon />
                  </span>
                </a>
                <div className="project-copy">
                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section-pad" id="skills">
          <div className="section-label" data-reveal>
            <span>04</span> Capabilities
          </div>
          <div className="skills-grid">
            <h2 data-reveal>Deep front-end expertise. Broad engineering perspective.</h2>
            <div className="skill-columns">
              {skills.map((skill) => (
                <div data-reveal key={skill.title}>
                  <h3>{skill.title}</h3>
                  <ul>
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <p className="section-label" data-reveal>
            <span>05</span> Get in touch
          </p>
          <div className="contact-main" data-reveal>
            <h2>Building something meaningful?</h2>
            <p>
              I&apos;m interested in thoughtful products, inclusive teams, and
              complex engineering problems worth solving.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Stephany Nusch</p>
        <div>
          <a href="mailto:stephanyn7@gmail.com">Email</a>
          <a
            href="https://www.linkedin.com/in/stephanynusch"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <p className="footer-location">Vancouver, BC</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
