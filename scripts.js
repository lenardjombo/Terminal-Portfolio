document.addEventListener('DOMContentLoaded', function() {
    const predefinedCommands = ['about', 'skills', 'projects', 'social', 'clients'];
    const terminalBody = document.getElementById('terminal-body');
    let awaitingConfirmation = false;
    let suggestedCommand = '';

    function processCommand(command) {
        // Appending the user command
        const output = document.createElement('p');
        output.className = 'output';
        output.textContent = `# user in ~/jombo-leonard $ ${command}`;
        terminalBody.appendChild(output);

        if (awaitingConfirmation) {
            handleConfirmation(command);
        } else {
            if (predefinedCommands.includes(command)) {
                executeCommand(command);
            } else {
                const similarCommand = findSimilarCommand(command);
                if (similarCommand) {
                    awaitingConfirmation = true;
                    suggestedCommand = similarCommand;
                    askForConfirmation(similarCommand);
                } else {
                    showError(command);
                    createInputLine();
                }
            }
        }
    }

    function handleConfirmation(command) {
        if (command.toLowerCase() === 'y') {
            executeCommand(suggestedCommand);
        } else if (command.toLowerCase() === 'n') {
            createInputLine();
        } else {
            const errorOutput = document.createElement('p');
            errorOutput.className = 'output';
            errorOutput.textContent = 'Please enter y or n';
            terminalBody.appendChild(errorOutput);
        }
        awaitingConfirmation = false;
        suggestedCommand = '';
    }

    function findSimilarCommand(input) {
        for (const cmd of predefinedCommands) {
            if (levenshteinDistance(input, cmd) <= 2) {
                return cmd;
            }
        }
        return null;
    }

    function levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    function askForConfirmation(similarCommand) {
        const confirmationOutput = document.createElement('p');
        confirmationOutput.className = 'output';
        confirmationOutput.textContent = `Did you mean "${similarCommand}"? y/n`;
        terminalBody.appendChild(confirmationOutput);
        createInputLine();
    }

    function executeCommand(command) {
        switch(command) {
            case 'about':
                showAbout();
                break;
            case 'skills':
                showSkills();
                break;
            case 'projects':
                showProjects();
                break;
            case 'social':
                showSocialLinks();
                break;
            case 'clients':
                showClients();
                break;
        }
        createInputLine();
    }

    function createInputLine() {
        const existingInputLine = document.querySelector('.input-line');
        if (existingInputLine) {
            existingInputLine.remove();
        }

        const newInputLine = document.createElement('div');
        newInputLine.className = 'input-line';

        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '# user in ~/jombo-leonard $';

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = 'terminal-input';
        newInput.autofocus = true;
        newInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const newCommand = newInput.value.trim();
                processCommand(newCommand);
                newInput.value = '';
            }
        });

        newInputLine.appendChild(prompt);
        newInputLine.appendChild(newInput);
        terminalBody.appendChild(newInputLine);

        newInput.focus();
    }

    function showAbout() {
        const commandOutput = document.createElement('p');
        commandOutput.className = 'command';
        commandOutput.textContent = 'about';
        terminalBody.appendChild(commandOutput);

        const aboutOutput = document.createElement('p');
        aboutOutput.className = 'description';
        aboutOutput.textContent = 'I am a software developer deeply passionate about data science, AI, and machine learning. With a focus on creating robust applications, I specialize in Dart with Flutter for cross-platform mobile development, and JavaScript for interactive front-end experiences. In addition, I have extensive experience with Python, utilizing both Django and Flask frameworks for web development and backend services';
        terminalBody.appendChild(aboutOutput);
    }

    function showSkills() {
        const commandOutput = document.createElement('p');
        commandOutput.className = 'command';
        commandOutput.textContent = 'skills';
        terminalBody.appendChild(commandOutput);
    
        const skillsOutput = document.createElement('div');
        skillsOutput.className = 'output';
    
        const skillsList = document.createElement('ul');
        skillsList.className = 'skills-list';
    
        // Skills array
        const skills = [
            { category: 'Programming Languages', list: ['C++', 'Python', 'Dart'] },
            { category: 'Web Frameworks', list: ['Django', 'Flask', "Django-Rest Api's"] },
            { category: 'JavaScript Libraries', list: ['JavaScript','React'] },
            { category: 'Containerization', list: ['Kubernetes', 'Docker'] },
            { category: 'Network Security', list: ['Knowledge of network security protocols'] },
            { category: 'Soft Skills', list: ['Problem-solving', 'Teamwork', 'Attention to detail'] }
        ];
    
        // Creating list items for each skill category
        skills.forEach(skillCategory => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = skillCategory.category;
            const skillsSubList = document.createElement('ul');
            
            // Creating list items for each skill in the category
            skillCategory.list.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.textContent = skill;
                skillsSubList.appendChild(skillItem);
            });
    
            categoryItem.appendChild(skillsSubList);
            skillsList.appendChild(categoryItem);
        });
    
        skillsOutput.appendChild(skillsList);
        terminalBody.appendChild(skillsOutput);
    }
    

function showProjects() {
    const commandOutput = document.createElement('p');
    commandOutput.className = 'command';
    commandOutput.textContent = 'projects';
    terminalBody.appendChild(commandOutput);

    const projectsOutput = document.createElement('p');
    projectsOutput.className = 'description';

    // Defined projects with their links
    const projects = [
        { name: 'Online R Compiler', link: 'https://github.com/lenardjombo/Webserver' },
        { name: 'TM-Portfolio', link: 'https://mawora.netlify.app' },
        { name: 'Python Compiler', link: 'https://github.com/lenardjombo/Python-Compiler' },
        { name: 'Text-To-Speech', link: 'https://github.com/lenardjombo/Text-To-Speech' },
        { name: 'Sudoku', link: 'https://github.com/lenardjombo/Sudoku' }
    ];

    // Created links for each project
    projects.forEach(project => {
        const projectLink = document.createElement('a');
        projectLink.href = project.link;
        projectLink.textContent = project.name;
        projectLink.target = '_blank'; // Open link in new tab

        const separator = document.createTextNode(', '); // Add comma and space between links

        projectsOutput.appendChild(projectLink);
        projectsOutput.appendChild(separator);
    });

    // Removal of  the last separator (comma and space)
    projectsOutput.removeChild(projectsOutput.lastChild);

    terminalBody.appendChild(projectsOutput);
}


function showSocialLinks() {
const commandOutput = document.createElement('p');
commandOutput.className = 'command';
commandOutput.textContent = 'social';
terminalBody.appendChild(commandOutput);

const socialLinksOutput = document.createElement('p');
socialLinksOutput.className = 'description';
socialLinksOutput.innerHTML = 'You can find me on:<br>GitHub: <a href="https://github.com/lenardjombo" target="_blank">github.com/lenardjombo</a><br>LinkedIn: <a href="https://linkedin.com/in/lenardjombo" target="_blank">linkedin.com/in/lenardjombo</a>';
terminalBody.appendChild(socialLinksOutput);
}

function showClients() {
    const commandOutput = document.createElement('p');
    commandOutput.className = 'command';
    commandOutput.textContent = 'clients';
    terminalBody.appendChild(commandOutput);

    const clientsOutput = document.createElement('div');
    clientsOutput.className = 'output';

    const clientsList = document.createElement('ul');
    clientsList.className = 'clients-list';

    // Clients array
    const clients = [
        { name: 'Mawora Firm', description: 'The Mawora firm is a poultry firm.I worked as a an IT expert in managing their website for their poultry firm' },
        { name: 'Boldly-Wild', description: 'Specializes in communication field and digital marketing experiences.I created and managed a portfolio website for Boldy-Wild.' },
        { name: 'CodeX IT firm', description: 'Offers bespoke software solutions for enterprise clients.Worked as an intern in desiging of machine learning models.' }
    ];

    // Creating list items for each client
    clients.forEach(client => {
        const clientItem = document.createElement('li');
        
        const clientName = document.createElement('strong');
        clientName.textContent = client.name;
        
        const clientDescription = document.createElement('span');
        clientDescription.textContent = `: ${client.description}`;

        clientItem.appendChild(clientName);
        clientItem.appendChild(clientDescription);
        
        clientsList.appendChild(clientItem);
    });

    clientsOutput.appendChild(clientsList);
    terminalBody.appendChild(clientsOutput);
}


function showError(command) {
const errorOutput = document.createElement('p');
errorOutput.className = 'output';
errorOutput.textContent = `Command not found: ${command}`;
terminalBody.appendChild(errorOutput);
createInputLine();
}

// Initialize the first input line
createInputLine();

});