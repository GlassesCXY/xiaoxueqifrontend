<template>
    <el-button @click="changeEmo">情感检测</el-button>
    <el-button @click="changeFall">跌倒检测</el-button>
    <el-button @click="changeStranger">陌生人检测</el-button>
    <el-button @click="changeEvent">特殊事件检测</el-button>
    <div class="video-grid">
        <video-player :websocket-url="url" />
    </div>
</template>

<script setup>
import VideoPlayer from "@/components/VideoPlayer.vue";
import {ref} from "vue";

const url = ref("ws://localhost:8080")
const changeEmo = ()=>{
    url.value = "ws://localhost:8080"
}
const changeFall = ()=>{
    url.value = "ws://localhost:8081"
}
const changeStranger = ()=>{
    url.value = "ws://localhost:8082"
}
const changeEvent = ()=>{
    url.value = "ws://localhost:8083"
}

</script>

<style>
.video-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 可选：网格项之间的间距 */
}

video-player {
    flex: 1 1 calc(50% - 10px); /* 每个 VideoPlayer 占 50% 宽度，减去 gap 的一半 */
    height: 45vh; /* 设置高度为视口高度的 45%，根据需要调整 */
    box-sizing: border-box;
}
</style>
