class Challenge {
    constructor(level, description, validator) {
        this.level = level;
        this.description = description;
        this.validator = validator;
        this.completed = false;
    }

    analyzePayload(input) {
        let analysis = [];
        
        if (input.includes('>') || input.includes('<')) {
            analysis.push({
                issue: "HTML tags detected - might be filtered",
                tip: "Try learning about HTML encoding techniques",
                resource: "https://www.w3schools.com/html/html_entities.asp"
            });
        }

        if (input.includes('"') || input.includes("'")) {
            analysis.push({
                issue: "Quotes detected - encode and try again",
                tip: "Learn about different quote bypass techniques",
                resource: "https://owasp.org/www-community/xss-filter-evasion-cheatsheet"
            });
        }

        if (input.toLowerCase().includes('script')) {
            analysis.push({
                issue: "'script' might be blocked",
                tip: "There are many other event handlers in HTML. Research 'DOM event handlers'",
                resource: "https://developer.mozilla.org/en-US/docs/Web/Events"
            });
        }

        if (input.toLowerCase().includes('alert')) {
            analysis.push({
                issue: "Direct JavaScript functions might be filtered",
                tip: "Try learning about JavaScript obfuscation techniques",
                tool: "https://obfuscator.io"
            });
        }

        return analysis;
    }
}

const challenges = {
    level1: new Challenge(
        1,
        "Craft an XSS payload to make the horse speak!",
        (input) => {
            return input.toLowerCase().includes('alert(') || 
                   input.toLowerCase().includes('console.log(') ||
                   input.toLowerCase().includes('prompt(');
        }
    )
};

function processSearch(query) {
    const resultDiv = document.getElementById('search-results');
    const horseMascot = new HorseMascot();
    
    resultDiv.innerHTML = `<div>Search results for: ${query}</div>`;
    
    const analysis = challenges.level1.analyzePayload(query);
    
    if (analysis.length > 0) {
        let feedback = '<div class="payload-analysis">';
        feedback += '<h3> Improve your payload</h3>';
        feedback += '<ul>';
        analysis.forEach(item => {
            feedback += `
                <li>
                    <strong>${item.issue}</strong><br>
                    💡 ${item.tip}<br>
                    ${item.resource ? `🔗 <a href="${item.resource}" target="_blank">Learn about this</a>` : ''}
                    ${item.tool ? `🛠️ <a href="${item.tool}" target="_blank">Try this tool</a>` : ''}
                </li>`;
        });
        feedback += '</ul>';
        feedback += '</div>';
        
        resultDiv.innerHTML += feedback;
        horseMascot.speak("Keep experimenting! Every failed attempt teaches something new!", "hint");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-box');
    
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processSearch(e.target.value);
        }
    });

    searchBox.addEventListener('input', (e) => {
        processSearch(e.target.value);
    });
});

function getHint(currentPayload) {
    const hints = {
        script: "Think about alternative ways to execute JavaScript without using <script> tags",
        alert: "JavaScript functions can be called in many different ways",
        default: "Start by understanding how HTML elements can execute JavaScript"
    };

    for (let key in hints) {
        if (currentPayload.toLowerCase().includes(key)) {
            return hints[key];
        }
    }
    return hints.default;
} 