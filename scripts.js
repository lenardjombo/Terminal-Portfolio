document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminal-content');
    const terminalInput = document.getElementById('terminal-input');
    const defaultContent = `
Starting server...
Type '<span class="command">all</span>' to see all commands  '<span class="command">clear</span>' to clear the terminal, and '<span class="command">exit</span>' to close the terminal.`;

    const commands = {
        about: "About: I am a software developer deeply passionate about data science, AI, and machine learning. With a focus on creating robust applications, I specialize in Dart with Flutter for cross-platform mobile development, and JavaScript for interactive front-end experiences. In addition, I have extensive experience with Python, utilizing both Django and Flask frameworks for web development and backend services",
        skills: `
Skills:
    Programming Languages
        - C++
        - Python
        - Dart
    Web Frameworks
        - Django
        - Flask
        - Fast-API
    JavaScript Libraries
        - Threejs
        - React
        -JQuery
    Containerization
        - Kubernetes
        - Docker
        -Podman
    Network Security
        - Knowledge of network security protocols
        -Knowledge in intrusion detection
        -Knowledge in Cloud security
    Soft Skills
        - Problem-solving
        - Teamwork
        - Attention to detail
`,
        projects: `
Projects:
    - <a href="https://github.com/online-r-compiler" target="_blank">Online R Compiler</a>
    - <a href="https://github.com/tm-portfolio" target="_blank">TM-Portfolio</a>
    - <a href="https://github.com/python-compiler" target="_blank">Python Compiler</a>
    - <a href="https://github.com/text-to-speech" target="_blank">Text-To-Speech</a>
    - <a href="https://github.com/sudoku" target="_blank">Sudoku</a>
`,
        socials: `
You can find me on:
    GitHub: <a href="https://github.com/lenardjombo" target="_blank">github.com/lenardjombo</a>
    LinkedIn: <a href="https://linkedin.com/in/lenardjombo" target="_blank">linkedin.com/in/lenardjombo</a>
`,
        clients: `
Clients:
    Mawora Firm: The Mawora firm is a poultry firm. I worked as an IT expert in managing their website for their poultry firm.

    Boldly-Wild: Specializes in communication field and digital marketing experiences. I created and managed a portfolio website for Boldly-Wild.

    CodeX IT firm: Offers bespoke software solutions for enterprise clients. Worked as an intern in designing machine learning models.
`
    };

    function appendToTerminal(content) {
        terminalContent.innerHTML += content + '<br>';
        terminalContent.scrollTop = terminalContent.scrollHeight; // Auto-scroll to bottom
    }

    function clearTerminal() {
        terminalContent.innerHTML = '';
        appendToTerminal(defaultContent);
    }

    function exitTerminal() {
        window.close();
    }

    setTimeout(() => {
        appendToTerminal(defaultContent);
    }, 0);

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            terminalInput.value = '';
            appendToTerminal(`<span class="command">$ ${command}</span>`);
            
            if (command === 'clear') {
                clearTerminal();
            } else if (command === 'exit') {
                exitTerminal();
            } else if (command === 'all') {
                appendToTerminal(`
Available commands:
<span class="command">about</span> - Displays information about me.
<span class="command">skills</span> - Displays my skills.
<span class="command">projects</span> - Displays my projects.
<span class="command">socials</span> - Displays my social media links.
<span class="command">clients</span> - Displays information about my  clients.
<span class="command">clear</span> - Clears the terminal.
<span class="command">exit</span> - Closes the terminal.
`);
            } else if (commands[command]) {
                appendToTerminal(commands[command]);
            } else {
                appendToTerminal(`Command not found: ${command}`);
            }
        }
    });
});
