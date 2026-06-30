import { useState } from "react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert("Message sent successfully! 🚀");

      setFormData({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      alert("Error sending message!");
      console.log(error);
    }
  };

  return (
    <section className="contact container py-5">
      <h1>Contact Me</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="5"
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button className="btn btn-primary">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;