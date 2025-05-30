class ChatBot {
    constructor() {
        this.name = "AI Bot";
        this.responses = {
            greeting: [
                "Hi!",
                "Hello!",
                "Hey there!",
                "Hi there!"
            ],
            farewell: [
                "Goodbye!",
                "See you later!",
                "Bye!",
                "Take care!"
            ],
            default: [
                "I'm not sure I understand. Could you rephrase that?",
                "Interesting! Tell me more about that.",
                "I'm still learning. Could you elaborate?"
            ]
        };
    }

    generateResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Handle name change command
        if (input.startsWith("change your name to")) {
            const newName = input.replace("change your name to", "").trim();
            if (newName) {
                this.name = newName;
                return `My name has been changed to ${newName}!`;
            }
        }

        // Handle open tab command
        if (input.startsWith("open")) {
            const website = input.replace("open", "").trim();
            if (website) {
                this.openWebsite(website);
                return `Opening ${website} for you!`;
            }
        }

        // Handle WhatsApp command
        if (input.includes("whatsapp")) {
            this.openWhatsApp();
            return "Opening WhatsApp for you!";
        }

        // Simple pattern matching for greetings
        if (input.match(/^(hi|hello|hey|greetings)/)) {
            return this.getRandomResponse('greeting');
        }
        
        if (input.match(/^(bye|goodbye|see you|farewell)/)) {
            return this.getRandomResponse('farewell');
        }

        return this.getRandomResponse('default');
    }

    getRandomResponse(type) {
        const responses = this.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    openWebsite(website) {
        let url;
        switch(website.toLowerCase()) {
            case 'google':
                url = 'https://www.google.com';
                break;
            case 'youtube':
                url = 'https://www.youtube.com';
                break;
            case 'facebook':
                url = 'https://www.facebook.com';
                break;
            case 'twitter':
                url = 'https://www.twitter.com';
                break;
            case 'instagram':
                url = 'https://www.instagram.com';
                break;
            default:
                url = `https://www.${website}.com`;
        }
        window.open(url, '_blank');
    }

    openWhatsApp() {
        window.open('https://web.whatsapp.com', '_blank');
    }
}

// Export the ChatBot class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatBot;
} 