class HorseMascot {
    constructor() {
        this.mascot = document.getElementById('horse-mascot');
        this.speechBubble = document.getElementById('mascot-speech');
        this.reactions = {
            success: ["Neigh-ce work! 🎉", "You're stable-y brilliant! 🌟"],
            hint: ["Hay there! Need a hint? Think about user input... 🤔", "Try looking at how the search results are displayed! 🔍"],
            fail: ["Hold your horses! Try again! 🐎", "That's not quite right, but keep trotting along! 🏃"]
        };
    }

    speak(message, type = 'normal') {
        this.speechBubble.textContent = message;
        this.speechBubble.style.display = 'block';
        
        if (type === 'success') {
            this.mascot.style.transform = 'rotate(360deg)';
        }

        setTimeout(() => {
            this.speechBubble.style.display = 'none';
            this.mascot.style.transform = 'none';
        }, 3000);
    }

    randomReaction(type) {
        const reactions = this.reactions[type];
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        this.speak(reaction, type);
    }
} 