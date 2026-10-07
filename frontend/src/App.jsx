import { useState } from "react";
import "./App.css";

const skills = [
  "Python",
  "JavaScript",
  "React",
  "FastAPI",
  "SQL",
  "LLMs",
  "Prompt Engineering",
  "Git & GitHub",
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio AI",
    category: "GENERATIVE AI",
    description:
      "An AI-powered portfolio that answers questions about my skills, projects, and experience.",
    tags: ["Python", "FastAPI", "LLM", "React"],
    status: "In progress",
  },
  {
    number: "02",
    title: "AI Resume Analyzer",
    category: "LLM APPLICATION",
    description:
      "A project to extract resume information and compare candidate skills with job requirements.",
    tags: ["Python", "Pydantic", "LLM"],
    status: "Planned",
  },
  {
    number: "03",
    title: "AI Assistant",
    category: "AI ENGINEERING",
    description:
      "An AI assistant exploring prompt chaining, structured outputs, and tool calling.",
    tags: ["Python", "LLMs", "Tools"],
    status: "Planned",
  },
];

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error("AI Error:", error);
      setAnswer(
        "Sorry, I couldn't connect to Tanya's AI right now. Please make sure the FastAPI backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portfolio">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <a className="brand" href="#home">
          TJ<span>.</span>
        </a>

        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-button" href="#contact">
          Let's connect ↗
        </a>
      </header>

      {/* ================= MAIN ================= */}

      <main>
        {/* ================= HERO ================= */}

        <section className="hero section" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              OPEN TO OPPORTUNITIES
            </div>

            <p className="eyebrow">HELLO, I'M</p>

            <h1>
              Tanya
              <br />
              <span>Jaiswal.</span>
            </h1>

            <h2>
              Building at the intersection of{" "}
              <span className="accent">AI & software.</span>
            </h2>

            <p className="hero-description">
              I'm a Computer Science graduate exploring AI engineering,
              LLM applications, and full-stack development. I love turning
              ideas into useful, working products.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                Explore my work <span>↗</span>
              </a>

              <a className="secondary-button" href="#about">
                More about me ↓
              </a>
            </div>

            <div className="hero-meta">
              <span>BASED IN INDIA</span>
              <span>COMPUTER SCIENCE</span>
            </div>
          </div>

          {/* ================= HERO VISUAL ================= */}

          <div className="hero-visual">
            <div className="orb orb-one" />
            <div className="orb orb-two" />

            <div className="profile-card">
              <div className="card-top">
                <span className="window-dots">● ● ●</span>
                <span>ABOUT.TXT</span>
              </div>

              <div className="code-lines">
                <p>
                  <span className="code-purple">const</span> developer = {"{"}
                </p>

                <p className="indent">
                  name: <span className="code-green">"Tanya"</span>,
                </p>

                <p className="indent">
                  focus:{" "}
                  <span className="code-green">"AI Engineering"</span>,
                </p>

                <p className="indent">
                  learning: <span className="code-green">"Every day"</span>,
                </p>

                <p className="indent">
                  building:{" "}
                  <span className="code-green">"Real projects"</span>
                </p>

                <p>{"};"}</p>
              </div>

              <div className="card-footer">
                <span className="status-dot" />
                <span>CURIOUS BY DEFAULT</span>
              </div>
            </div>

            <div className="floating-label label-top">
              <span>✳</span> GenAI Explorer
            </div>

            <div className="floating-label label-bottom">
              <span>⌘</span> Builder mindset
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section className="section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">01 / ABOUT</p>

            <h2>
              A little about <span>me.</span>
            </h2>
          </div>

          <div className="about-content">
            <p>
              I'm a recent B.Tech Computer Science graduate building my
              skills in AI engineering and full-stack development. My
              current focus is learning how LLMs, APIs, and web interfaces
              come together to create useful applications.
            </p>

            <p>
              I'm learning by building, debugging, experimenting, and
              documenting my progress—one project at a time.
            </p>
          </div>
        </section>

        {/* ================= SKILLS ================= */}

        <section className="section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">02 / TOOLKIT</p>

            <h2>
              Skills I'm <span>working with.</span>
            </h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-chip" key={skill}>
                <span className="skill-marker">✳</span>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">03 / SELECTED WORK</p>

            <h2>
              Things I'm <span>building.</span>
            </h2>

            <p className="section-description">
              A collection of projects, experiments, and things I'm learning.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-top">
                  <span className="project-number">
                    {project.number}
                  </span>

                  <span className="project-status">
                    {project.status}
                  </span>
                </div>

                <p className="project-category">
                  {project.category}
                </p>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}

        <section className="section contact-section" id="contact">
          <p className="eyebrow">04 / CONTACT</p>

          <h2>
            Have an idea? <span>Let's talk.</span>
          </h2>

          <p>
            Interested in AI, software development, or collaborating on
            something useful? I'd love to connect.
          </p>

          <a
            className="primary-button"
            href="mailto:YOUR_EMAIL@example.com"
          >
            Email me ↗
          </a>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <a className="brand" href="#home">
          TJ<span>.</span>
        </a>

        <p>Designed while learning. Built with curiosity.</p>

        <a href="#home">Back to top ↑</a>
      </footer>

      {/* ================= AI CHAT BUTTON ================= */}

      <button
        className="chat-launcher"
        onClick={() => setChatOpen(!chatOpen)}
        aria-label={
          chatOpen ? "Close AI assistant" : "Open AI assistant"
        }
      >
        {chatOpen ? "×" : "✳"}

        <span>
          {chatOpen ? "Close" : "Ask my AI"}
        </span>
      </button>

      {/* ================= AI CHAT PANEL ================= */}

      {chatOpen && (
        <aside className="chat-panel">
          <div className="chat-header">
            <div>
              <span className="status-dot" />

              <strong>Tanya's AI Assistant</strong>
            </div>

            <button
              className="chat-close"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            <div className="chat-avatar">✳</div>

            <p>
              Hey! I'm Tanya's portfolio assistant. Ask me about
              my skills, projects, education, or experience.
            </p>

            {answer && (
              <div className="ai-answer">
                <span className="chat-note">AI RESPONSE</span>

                <p>{answer}</p>
              </div>
            )}
          </div>

          <div className="chat-input-preview">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAI();
                }
              }}
              placeholder="Ask me something..."
              disabled={loading}
            />

            <button
              onClick={askAI}
              disabled={loading || !question.trim()}
              aria-label="Send message"
            >
              {loading ? "..." : "↑"}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;