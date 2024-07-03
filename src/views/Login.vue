<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Login</h2>
            <form @submit.prevent>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="formLogin.username" />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="formLogin.password" />
                </div>
                <button @click="handleLogin">Login</button>
                <button class="register" @click="regis">Register</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import {login} from "@/api/login.js";
import {validateLogin} from "@/util/validate.js";
import {ref} from "vue";

const router = useRouter();
const userStore = useUserStore()
const regis = async () =>{
    console.log("reg");
    router.push("/register");
};
const formLogin = ref({
    username: "",
    password: "",
});
const handleLogin = async () =>{
    console.log("log");
    const valid = validateLogin(formLogin.value);

    if (!valid) return;

    const loginResult = await login(formLogin.value)
        .catch((error) =>{
            console.log("稍后再试");
            ElMessage.error("稍后再试")
        });
    console.log(loginResult);




    if (loginResult.data.code === 0) {
        //后端定义code为0表示登录成功
        ElMessage.success("登录成功，欢迎你");
        userStore.setUserId(formLogin.value.username);

        console.log("login success");
        router.push("/home");
    } else {
        ElMessage.error(loginResult.data.msg);

    }

};


</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-box {
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type='text'],
input[type='password'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.register {
    margin-top: 10px;
}

</style>