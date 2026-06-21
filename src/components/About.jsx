function About() {
  return (
    <section className="about container py-5">
      <h1>About Me</h1>

      <p>
        Hi! I'm Varshine, currently pursuing B.Sc. Artificial Intelligence and
        Data Science. I'm passionate about Web Development, AI, and Machine
        Learning.
      </p>

      <h2>Education</h2>

      <div className="mb-4">
        <h4>B.Sc. Artificial Intelligence and Data Science</h4>
        <p>KPR College of Arts Science and Research</p>
        <p>2024 – Present | CGPA: 8.1</p>
      </div>

      <div className="mb-4">
        <h4>Higher Secondary Education (HSC)</h4>
        <p>Vivek Vidhayalaya Matriculation Higher Secondary School</p>
        <p>Percentage: 86%</p>
      </div>

      <div className="mb-4">
        <h4>Secondary School Leaving Certificate (SSLC)</h4>
        <p>St. Joseph's Matriculation Higher Secondary School</p>
        <p>Percentage: 67%</p>
      </div>

      <h3>Interests</h3>
      <ul>
        <li>Web Development</li>
        <li>Machine Learning</li>
        <li>Data Science</li>
        <li>Space Technology</li>
      </ul>
    </section>
  );
}

export default About;