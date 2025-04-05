import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import styled from "styled-components";


const TerminalContainer = styled.div`
  background: ${(props) => (props.theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
  width: 90%;
  height: 90vh;
  margin: 0 auto; /* Removed 50px margin to center vertically */
  padding: 20px;
  font-family: "Courier New", Courier, monospace;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;


const TerminalHeader = styled.div`
  background: ${(props) => (props.theme === "dark" ? "#2c2c2c" : "#ddd")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
  padding: 10px 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
  flex-direction: column;
  gap: 10px;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    background: ${(props) => props.color};
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => (props.theme === "dark" ? "#fff" : "#000")};
    }
  }
`;


const TerminalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 10px;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Cursor = styled.span`
  background: ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
  width: 8px;
  height: 16px;
  display: inline-block;
  animation: blink 0.8s infinite;
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: 1px solid ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
  color: ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.theme === "dark" ? "#ff0000" : "#333")};
    color: ${(props) => (props.theme === "dark" ? "#000" : "#fff")};
  }
`;

const Terminal = () => {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [theme, setTheme] = useState("dark");

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const newOutput = [...output];
      switch (command.trim().toLowerCase()) {
        case "about":
          newOutput.length=0;
          newOutput.push(
            "I am a competitive programmer skilled in React, Node.js, and more.\n" +
            "I also explore machine learning, blockchain, and ethical hacking."
          );
          break;
        case "skills":
          newOutput.length=0;
          newOutput.push(
            "Skills:\n" +
            "- Programming: C,C++, Python, JavaScript,Java,\n" +
            "- Machine Learning: TensorFlow, PyTorch\n" +
            "- Web Dev: MERN , Flask , Django\n" +
            "- Blockchain: Solidity, Ethereum\n" +
            "- Ethical Hacking: Kali Linux, Metasploit"
          );
          break;
        case "projects":
          newOutput.length=0;
          newOutput.push(
            "Projects:\n" +
            "- URL Shortner\n" +
            "- Random Chat Web App\n" +
            "- Personal Portfolio Terminal\n" +
            "- Whiteboard Web App\n" +
            "- Notes Web App\n"

          );
          break;
        case "hobbies":
          newOutput.length=0;
          newOutput.push(
            "Hobbies:\n" +
            "- Solving competitive programming challenges\n" +
            "- Ethical hacking\n" +
            "- Exploring AI advancements"
          );
          break;
        // case "achievements":
        //   newOutput.push(
        //     "Achievements:\n" +
        //     "- B\n" +
        //     "- Built a blockchain app with 100+ active users\n" +
        //     "- Completed advanced ethical hacking certification"
        //   );
        //   break;
        case "goals":
          newOutput.length=0;
          newOutput.push(
            "Goals:\n" +
            "- Build scalable AI-based systems\n" +
            "- Contribute to open-source blockchain projects\n" +
            "- Participate in global hackathons"
          );
          break;
        case "contact":
          newOutput.length=0;
          newOutput.push(
            "Contact Information:\n" +
            "- Email: satyamkumarverman@gmail.com\n" +
            "- GitHub: https://github.com/skvprogrammer\n" +
            "- Linktree: https://linktr.ee/skvprogrammer"
          );
          break;
        case "help":
          newOutput.length=0;
          newOutput.push(
            "Available commands:\n" +
            "- about: Learn about me\n" +
            "- skills: See my skill set\n" +
            "- projects: Explore my projects\n" +
            "- hobbies: Know what I do for fun\n" +
            "- achievements: See my accomplishments\n" +
            "- goals: My future ambitions\n" +
            "- contact: Get my contact info\n" +
            "- clear: Clear the terminal"
          );
          break;
        case "clear":
          setOutput([]);
          setCommand("");
          return;
        default:
          newOutput.push(`'${command}' is not recognized as a command.`);
      }
      setOutput(newOutput);
      setCommand("");
    }
  };

  return (
    <TerminalContainer theme={theme}>
      <TerminalHeader theme={theme}>
        {/* <HeaderButtons>
          <span color="#ff5f56" />
          <span color="#ffbd2e" />
          <span color="#27c93f" />
        </HeaderButtons>
        <Menu theme={theme}>
        <a href="https://linktr.ee/skvprogrammer" target="_blank" rel="noopener noreferrer">SATYAM KUMAR VERMAN - I like to work with tech</a>
          <a href="https://github.com/skvprogrammer" target="_blank" rel="noopener noreferrer"> | <b>GitHub</b> |</a>
          <a href="https://linktr.ee/skvprogrammer" target="_blank" rel="noopener noreferrer"> | <b>Linktree</b> |</a>
         
          <br></br>
        
        </Menu> */}
        {/* <LogoContainer theme={theme}>
          <h6>Satyam Kumar Verman <sup>I love to work with tech</sup></h6>
        </LogoContainer> */}
        <ThemeToggle
          theme={theme}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </ThemeToggle>
        <img 
  src="dev.png" 
  alt="Developer Logo"
  style={{
    opacity: 0.8,
    zIndex: 10,
    height: "100px",
    width: "200px",
    filter: "drop-shadow(0 0 10px #00ffcc)",
    transition: "transform 0.3s ease, filter 0.3s ease",
    transform: "scale(1)",
    borderRadius:"50px"
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.filter = "drop-shadow(0 0 15px #00ffee)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.filter = "drop-shadow(0 0 10px #00ffcc)";
  }}
/>

<ul style={{
  display: 'flex',
  gap: '0.7rem',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  color: '#00ff00',
}}>
  <li>
    <a 
      href="https://omezle.fun"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#00ff00',
        textDecoration: 'none',
        transition: 'color 0.2s ease, text-shadow 0.3s ease',
      }}
      onMouseOver={e => {
        e.currentTarget.style.textShadow = '0 0 5px #00ff00';
        e.currentTarget.style.color = '#66ff66';
      }}
      onMouseOut={e => {
        e.currentTarget.style.textShadow = 'none';
        e.currentTarget.style.color = '#00ff00';
      }}
    >
      Omezle
    </a>
  </li>
  <li>
    <a 
      href="https://paskal.site"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#00ff00',
        textDecoration: 'none',
        transition: 'color 0.2s ease, text-shadow 0.3s ease',
      }}
      onMouseOver={e => {
        e.currentTarget.style.textShadow = '0 0 5px #00ff00';
        e.currentTarget.style.color = '#66ff66';
      }}
      onMouseOut={e => {
        e.currentTarget.style.textShadow = 'none';
        e.currentTarget.style.color = '#00ff00';
      }}
    >
      Paskal
    </a>
  </li>

  <li>
    <a 
      href="https://linktree.com/skvprogrammer"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#00ff00',
        textDecoration: 'none',
        transition: 'color 0.2s ease, text-shadow 0.3s ease',
      }}
      onMouseOver={e => {
        e.currentTarget.style.textShadow = '0 0 5px #00ff00';
        e.currentTarget.style.color = '#66ff66';
      }}
      onMouseOut={e => {
        e.currentTarget.style.textShadow = 'none';
        e.currentTarget.style.color = '#00ff00';
      }}
    >
      Linktree
    </a>
  </li>
</ul>

      </TerminalHeader>
      <TerminalBody>
        <h3>
          <TypeAnimation
            sequence={[
              "Satyam Kumar Verman!",
              2000,
              "Type 'help' to get started.",
              2000,
            ]}
            wrapper="span"
            cursor={false}
            repeat={Infinity}
          />
        </h3>
        <div>
          {output.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {line.split("\n").map((text, idx) => (
                <React.Fragment key={idx}>
                  {text}
                  <br />
                </React.Fragment>
              ))}
            </motion.div>
          ))}
        </div>
      </TerminalBody>
      <Line>
        <FaChevronRight />
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommand}
          style={{
            background: "transparent",
            color: theme === "dark" ? "#ff0000" : "#333",
            border: "none",
            outline: "none",
            fontWeight: "bolder",
            flex: 1,
          }}
          autoFocus
        />
        <Cursor theme={theme} />
      </Line>
    </TerminalContainer>
  );
};

export default Terminal;
