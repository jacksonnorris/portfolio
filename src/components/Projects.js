import React from 'react';
import portfolioData from '../data/portfolioData.json';
import './css/Projects.scss';

const Projects = () => {
  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="projects-container">
        {portfolioData.projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;