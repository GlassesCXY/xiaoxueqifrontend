<template>
    <el-scrollbar
    height="100vh">
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                active-text-color="yellow"
                background-color="#545c64"
                text-color="#fff"
        >
            <h3>智慧老人监护系统</h3>
            <el-menu-item index="1" @click="handleMonitor">
                <template #title >
                    <el-icon>
                        <House/>
                    </el-icon>
                    <span >监控首页</span>
                </template>
            </el-menu-item>
            <el-sub-menu index="2" >
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>情绪记录</span>
                </template>
                <el-menu-item index="/home/Record" style="font-size:small;padding-left:65px" @click="handleRecord"> 负面情绪记录</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <MessageBox/>
                    </el-icon>
                    <span>暴力/火情记录</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/home/storage" style="font-size:small;padding-left:65px" @click="handleStorage" >突发事件</el-menu-item>

                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <User/>
                    </el-icon>
                    <span>人脸识别</span>
                </template>
                <el-menu-item index="4-1" style="font-size:small;padding-left:65px" @click="handleOutBound"> 陌生人记录</el-menu-item>
                <el-menu-item index="4-2" style="font-size:small;padding-left:65px" @click="handleManage">人脸管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item @click="handleCar">
                <template #title>
                    <span>用户管理</span>
                </template>
            </el-menu-item>

        </el-menu>

    </el-scrollbar>
</template>

<script lang="ts" setup>
import { roleTypes } from 'element-plus'
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
// import {
//     Document,
//     Menu as IconMenu,
//     Location,
//     Setting,
//     House,
//     MessageBox,
//     Check,
//     Position
// } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}


const handleRecord = () => {
    router.push('/home/emotion/records');
}
const handleOutBound = () => {
    router.push('/home/outBound');
}
const handleStorage = () => {
    router.push('/home/storage');
}
const handleMonitor = () => {
    router.push('/home/monitor');
}

const handleManage = ()=>{
    router.push('/home/face/manage')
}

const handleCar =() => {
    router.push('/home/car');
}

</script>

<style scoped>
@media (min-width: 1024px) {
    .el-menu-vertical-demo{
        width: 200px ;
        min-height: 400px;
        height: 100vh;

        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
    }
    @-webkit-keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
    }
    @keyframes fade {
        from {opacity: .4}

    }

    h3 {
        color: #fff;
        margin: 0px;
        padding-left: 50px;
        padding-bottom: 20px;
        padding-top: 20px;
        font-size: 16px;
        font-weight: 800;
    }
}
</style>
