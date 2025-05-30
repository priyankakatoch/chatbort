document.addEventListener('DOMContentLoaded', function () {
    const chatWindow = document.getElementById('messages');
    const userInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const botEyes = document.querySelector('.bot-eyes');
    const botArms = document.querySelector('.bot-arms');
    
    // Initialize the chatbot
    const bot = new ChatBot();

    function setBotExpression(eyesClass, armsClass) {
        // Remove all existing classes
        botEyes.classList.remove('happy', 'surprised', 'thinking', 'blinking');
        botArms.classList.remove('waving', 'thinking', 'surprised');
        
        // Add new classes
        if (eyesClass) botEyes.classList.add(eyesClass);
        if (armsClass) botArms.classList.add(armsClass);
    }

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerText = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Set bot expression based on message type
        if (sender === 'user') {
            setBotExpression('thinking', 'thinking');
        } else {
            // Randomly choose an expression for bot responses
            const expressions = [
                { eyes: 'happy', arms: 'waving' },
                { eyes: 'surprised', arms: 'surprised' },
                { eyes: 'thinking', arms: 'thinking' }
            ];
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            setBotExpression(randomExpression.eyes, randomExpression.arms);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        
        // Display user message
        appendMessage('user', text);
        userInput.value = '';
        
        // Generate and display bot response
        setTimeout(() => {
            const botResponse = bot.generateResponse(text);
            appendMessage('bot', botResponse);
        }, 500);
    }

    // Initial bot expression
    setBotExpression('happy', 'waving');
});
