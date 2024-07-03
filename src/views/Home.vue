<template>
    <div class="common-layout">
        <el-container style="height: 100vh">
            <el-aside width="200px">
                <Sidebar />
            </el-aside>

            <el-container>
                <el-header>
                    <Header />
                </el-header>
                <el-main>
                    <el-scrollbar>
                        <router-view></router-view>
                    </el-scrollbar>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>
<style>
.el-header {
    padding: 0;
}
</style>