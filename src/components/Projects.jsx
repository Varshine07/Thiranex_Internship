import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="projects container py-5">
      <h1>Projects</h1>

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project._id}>
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <p>
                  <strong>Technologies:</strong><br />
                  {project.technologies}
                </p>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-info"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;