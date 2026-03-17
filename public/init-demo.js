setTimeout(async () => {
    // Check if a project is already loaded
    if (globalThis.shesh.activeProject) return;
    
    const demoHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Luigi's Pizza - AI Agent</title>
<style>
  body { font-family: -apple-system, sans-serif; background: #f4f4f5; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
  #chat-container { width: 400px; height: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; }
  #header { background: #e63946; color: white; padding: 20px; text-align: center; font-weight: bold; font-size: 1.2rem; }
  #messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #fafafa; }
  .msg { padding: 10px 15px; border-radius: 18px; max-width: 80%; line-height: 1.4; word-wrap: break-word; }
  .user { background: #007bff; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .agent { background: #e9ecef; color: #333; align-self: flex-start; border-bottom-left-radius: 4px; }
  #input-area { display: flex; padding: 15px; background: white; border-top: 1px solid #eee; }
  input { flex: 1; padding: 12px; border: 1px solid #ccc; border-radius: 20px; outline: none; }
  button { margin-left: 10px; padding: 10px 20px; background: #e63946; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; }
  button:hover { background: #d62828; }
</style>
</head>
<body>
  <div id="chat-container">
    <div id="header">Luigi's Pizza AI Ordering</div>
    <div id="messages"></div>
  </div>
  <div id="input-area" style="width: 400px; background: white; border-radius: 12px; margin-top: 10px; display: flex; padding: 15px;">
    <input type="text" id="userInput" placeholder="Type your order..." />
    <button id="sendBtn">Send</button>
  </div>
  <script src="app.js"></script>
</body>
</html>`;

    const demoJs = `
const messages = [];
const msgsDiv = document.getElementById('messages');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessageBubble(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerText = text;
  msgsDiv.appendChild(div);
  msgsDiv.scrollTop = msgsDiv.scrollHeight;
  return div;
}

addMessageBubble("Hi! I'm the Luigi's Pizza AI assistant. How can I help you today?", 'agent');

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

sendBtn.addEventListener('click', sendMessage);

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  
  messages.push({ role: 'user', content: text });
  addMessageBubble(text, 'user');
  input.value = '';
  
  const loading = addMessageBubble('...', 'agent');
  
  try {
    const res = await fetch('/api/xai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    const data = await res.json();
    loading.remove();
    
    if (data.reply) {
      messages.push({ role: 'assistant', content: data.reply });
      addMessageBubble(data.reply, 'agent');
    } else {
      addMessageBubble('Sorry, the xAI API is not configured. Please add XAI_API_KEY to .env', 'agent');
    }
  } catch(e) {
    loading.remove();
    addMessageBubble('Error connecting to xAI.', 'agent');
  }
}
`;

    await globalThis.shesh.buildWorkspaceProject('owner_agent_demo', {
        'index.html': demoHtml,
        'app.js': demoJs
    });
    console.log("%c[Owner Agent Demo] Pre-loaded! Type shesh.prompt('Make the header blue') to iterate with the agent.", "color: #ff00ff; font-weight: bold; font-size: 14px;");
}, 2000);
