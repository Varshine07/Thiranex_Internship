function Skills() {
  return (
    <section className="skills container py-5">
      <h1>Skills</h1>

      <h3>Technical Skills</h3>

      <div className="mb-4">
        <h5>HTML/CSS</h5>
        <div className="progress">
          <div className="progress-bar" style={{ width: "95%" }}>
            95%
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>JavaScript</h5>
        <div className="progress">
          <div className="progress-bar" style={{ width: "85%" }}>
            85%
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>React</h5>
        <div className="progress">
          <div className="progress-bar" style={{ width: "80%" }}>
            80%
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>Node.js</h5>
        <div className="progress">
          <div className="progress-bar" style={{ width: "75%" }}>
            75%
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h5>Python</h5>
        <div className="progress">
          <div className="progress-bar" style={{ width: "90%" }}>
            90%
          </div>
        </div>
      </div>

      <h3>Soft Skills</h3>
      <ul>
        <li>Teamwork</li>
        <li>Time Management</li>
        <li>Responsibility</li>
        <li>Communication Skills</li>
        <li>Problem Solving</li>
        <li>Adaptability</li>
      </ul>
    </section>
  );
}

export default Skills;