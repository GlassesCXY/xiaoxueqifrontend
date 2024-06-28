<template>
    <div id="imageContainer">
        <img id="imageDisplay" :src="videoSrc" alt="Received Image" />
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            videoSrc: '',
            socket: null,
        };
    },
    mounted() {
        this.socket = new WebSocket('ws://localhost:8080'); // 使用WebSocket连接

        this.socket.onopen = () => {
            console.log('Connected to the WebSocket server.');
        };

        this.socket.onmessage = (event) => {
            const imgBlob = new Blob([event.data], { type: 'image/jpeg' });
            const imgUrl = URL.createObjectURL(imgBlob);
            this.videoSrc = imgUrl;
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        this.socket.onclose = () => {
            console.log('Disconnected from the WebSocket server.');
        };
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.close();
        }
    },
};
</script>

<style scoped>
#imageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

img {
    max-width: 100%;
    max-height: 90vh;
}
</style>
