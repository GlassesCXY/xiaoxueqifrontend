<template>
    <div class="header-container">
        <div class="left">
            <span class="welcome">欢迎。</span>
            <span class="time">现在是 {{ currentTime }}</span>
        </div>
        <div class="right">
            <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon color="white" size="22">
            <User />
          </el-icon>

        </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logOut">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export default {
    components: { User },
    name: "Header",
    setup() {
        const router = useRouter();
        const currentTime = ref("");

        const updateCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");
            currentTime.value = `${hours}:${minutes}:${seconds}`;
        };

        onMounted(() => {
            updateCurrentTime();
            setInterval(updateCurrentTime, 1000);
        });

        const logOut = () => {
            router.push("/login");
        };
        return {
            currentTime,
            logOut,
        };
    },
};
</script>
<style>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
}

@-webkit-keyframes fade {
    from {
        opacity: 0.4;
    }
    to {
        opacity: 1;
    }
}

@keyframes fade {
    from {
        opacity: 0.4;
    }
}

.left {
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    width: 400px;
    float: left;
}

.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 400px;
    float: right;
    padding-top: 20px;
}

.welcome {
    color: white;
    font-size: 16px;
    font-weight: 600;
}

.time {
    color: white;
    font-size: 16px;
    font-weight: 600;
}
</style>
