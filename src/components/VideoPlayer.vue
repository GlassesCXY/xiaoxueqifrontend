<template>
    <div id="imageContainer">
        <img id="imageDisplay" :src="videoSrc" alt="Received Image" />
    </div>
</template>

<script>
export default {
    props: {
        websocketUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            videoSrc: '',
            socket: null,
        };
    },
    watch: {
        websocketUrl: 'initializeWebSocket'
    },
    mounted() {
        this.initializeWebSocket(this.websocketUrl);
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.close();
        }
    },
    methods: {
        initializeWebSocket(url) {
            if (this.socket) {
                this.socket.close();
            }

            this.socket = new WebSocket(url);

            this.socket.onopen = () => {
                console.log('Connected to the WebSocket server.');
            };

            this.socket.onmessage = (event) => {
                console.log('Received message from WebSocket');
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
        }
    }
};
</script>

<style scoped>
#imageContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

img {
    max-width: 70vw;
    max-height: 70vh;
}
</style>
