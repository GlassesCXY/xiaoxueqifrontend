<!-- src/components/Chat.vue -->
<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="(message, index) in messages" :key="index" :class="message.role">
                {{ message.content }}
            </div>
        </div>
        <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message here..." />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' }
            ],
            inputMessage: ''
        };
    },
    methods: {
        async sendMessage() {
            if (this.inputMessage.trim() === '') return;

            // Add user's message to the chat
            this.messages.push({ role: 'user', content: this.inputMessage });

            // Call the API
            const response = await this.callAPI(this.inputMessage);

            // Add the model's response to the chat
            this.messages.push({ role: 'assistant', content: response });

            // Clear the input
            this.inputMessage = '';
        },
        async callAPI(content) {
        //调用api完成智慧养老系统的大模型的接入

            try {
                const url = 'http://localhost:5001/api/generate-text';

                const response = await axios.post(url, { content }, { headers: { 'Content-Type': 'application/json' } });

                return response.data.content
            } catch (error) {
                console.error("Error calling the API", error);
                return "Error calling the API.";
            }
        }
    }
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
}

input {
    padding: 0.5rem;
    font-size: 1rem;
}

.system, .assistant {
    background-color: #f1f1f1;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0.5rem 0;
}

.user {
    background-color: #d1e7dd;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0.5rem 0;
    align-self: flex-end;
}
</style>
