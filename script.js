// Store users in localStorage
function saveUsers(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

function loadUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Signup process
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = loadUsers();
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        alert('Username already exists. Please choose a different one.');
    } else {
        users.push({ username, password });
        saveUsers(users);
        alert('Signup successful! You can now log in.');
        window.location.href = "login.html";
    }
});

// Login process
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username);
        window.location.href = "assessment.html";
    } else {
        alert('Invalid username or password.');
    }
});

// Assessment questions
document.addEventListener('DOMContentLoaded', function() {
    const assessment = [
        { question: "What is your job experience?", type: "text" },
        { question: "What field are you interested in?", type: "text" },
        { question: "Preferred job location?", type: "text" },
        { question: "What skills do you have?", type: "text" },
        { question: "Are you willing to relocate?", type: "checkbox" },
    ];

    const assessmentContainer = document.getElementById('assessment-container');
    if (assessmentContainer) {
        assessment.forEach((item, index) => {
            const element = document.createElement('div');
            element.innerHTML = `
                <label>${item.question}</label><br>
                <input type="${item.type}" id="question-${index}"><br>
            `;
            assessmentContainer.appendChild(element);
        });

        document.getElementById('submit-assessment').style.display = 'block';
    }

    // Handle assessment submission
    document.getElementById('submit-assessment')?.addEventListener('click', function() {
        const answers = assessment.map((item, index) => ({
            question: item.question,
            answer: document.getElementById(`question-${index}`).value
        }));

        console.log("Assessment results:", answers);
        alert('Assessment submitted. Thank you!');
    });
});
