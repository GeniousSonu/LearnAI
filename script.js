document.querySelector('.theme-toggle.yellow').addEventListener('click', () => {
  document.body.style.backgroundColor = '#2c3e50';
  document.body.style.color = '#ecf0f1';
});

document.querySelector('.theme-toggle.gray').addEventListener('click', () => {
  document.body.style.backgroundColor = '#7f8c8d';
  document.body.style.color = '#ecf0f1';
});

document.addEventListener('DOMContentLoaded', (event) => {
  const chatBtn = document.querySelector('.chat-btn');
  const chatWindow = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatbox = document.getElementById('chatbox');
  const userInput = document.getElementById('userInput');

  chatBtn.addEventListener('click', () => {
    chatWindow.style.display = 'block';
  });

  closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });


  // Add message to chatbox
  function addMessageToChatbox(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + sender;
    messageElement.innerText = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // Send message to Dialogflow and handle response
  async function sendMessage() {
    const message = userInput.value;
    if (!message) return;

    addMessageToChatbox(message, 'user');
    userInput.value = '';

    try {
      const response = await axios.post('http://localhost:3000/webhook', { message });
      addMessageToChatbox(response.data.reply, 'bot');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // Listen for Enter key to send message
  userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
