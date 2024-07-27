const socket = io('http://localhost:3000');
const usernamePrompt = document.getElementById('usernamePrompt');
const chatRoom = document.getElementById('chatRoom');
const userCount = document.getElementById('userCount');

document.getElementById('enterChat').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value;
    if (username) {
        socket.emit('new user', username);
        usernamePrompt.style.display = 'none';
        chatRoom.style.display = 'block';
    }
});

document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        socket.emit('chat message', { user: socket.username, message });
        document.getElementById('messageInput').value = '';
    }
});

socket.on('chat message', (data) => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${data.user}: ${data.message}`;
    document.getElementById('messages').appendChild(messageDiv);
});

socket.on('update user count', (count) => {
    userCount.textContent = count;
});
