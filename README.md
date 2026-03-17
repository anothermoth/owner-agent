# Owner AI Agent Demo (Powered by Shesher & xAI)

This repository duplicates the concept of the Owner.com AI restaurant agent, combining an interactive xAI-powered conversational ordering bot with the **Shesher** autonomous IDE console.

## Features
1. **Restaurant AI Agent**: An ordering chatbot configured to use the xAI API (Grok). It simulates taking pizza orders.
2. **Shesher Iteration Loop**: Using the built-in Shesher browser console, you can dynamically modify the agent's interface and behavior in real time by simply typing prompts like \`shesh.prompt("Make the chat bubbles green")\`.

## Prerequisites
- Node.js installed
- A Gemini API Key (for the Shesher Architect/IDE)
- An xAI API Key (for the conversational Restaurant Agent)

## Setup
1. Clone the repository and navigate into it.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the root directory:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_key
   XAI_API_KEY=your_xai_key
   \`\`\`
4. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
5. Open your browser to \`http://localhost:3000\`.

## Iterating with the Agent
The true power of this repo is the Shesher integration. 
Once the app loads, open your Chrome Developer Tools Console (F12) and type:

\`\`\`javascript
await shesh.prompt("Add a phone call icon to the header to simulate a voice call.");
\`\`\`

The Shesher Architect will automatically rewrite the agent's HTML/JS and hot-reload the UI without you ever leaving the browser!
