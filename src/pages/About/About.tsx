import './About.css';

const About = () => (
  <div className="about-container">
    <section>
      <h2>About This App</h2>
      <p>
        Author: <strong>Stanislav Shendryk</strong>
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
      >
        RS School React Course
      </a>
    </section>

    <section>
      <h3>Contact Info</h3>
      <ul>
        <li>
          Telegram:{' '}
          <a
            href="https://t.me/webJoker"
            target="_blank"
            rel="noopener noreferrer"
          >
            webJoker
          </a>
        </li>
        <li>
          Discord:{' '}
          <a
            href="https://discordapp.com/users/673500459750785065"
            target="_blank"
            rel="noopener noreferrer"
          >
            webjoker
          </a>
        </li>
      </ul>
    </section>

    <section>
      <h3>Summary</h3>
      <p>
        I want to fully devote myself to developing Front-end and improve it. I
        have a great desire to work and study in this area. Start my career as a
        junior software engineer.
      </p>
    </section>

    <section>
      <h3>Skills</h3>
      <ul className="skills-list">
        <li>HTML</li>
        <li>CSS, LESS, SASS</li>
        <li>JavaScript (basic)</li>
        <li>Photoshop</li>
        <li>CorelDRAW</li>
        <li>Figma</li>
      </ul>
    </section>

    <section>
      <h3>Code Example</h3>
      <pre>
        <code>{`function getMin() {
  let args = Array.prototype.slice.call(arguments).sort(); 
  return args[0];
}
getMin(3, 0, -3);`}</code>
      </pre>
    </section>

    <section>
      <h3>Experience</h3>
      <p>
        You can see it here:{' '}
        <a
          href="https://github.com/webj0ker/"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/webj0ker
        </a>
      </p>
    </section>

    <section>
      <h3>Education</h3>
      <ul>
        <li>RS School</li>
        <li>htmlacademy</li>
        <li>EPAM</li>
      </ul>
    </section>

    <section>
      <h3>English</h3>
      <p>Pre-Intermediate</p>
    </section>
  </div>
);

export default About;
