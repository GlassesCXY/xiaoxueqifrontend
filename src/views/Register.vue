<template>
    <div class="container">
        <div class="form-box">
            <h2>Register</h2>
            <form @submit.prevent>
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="formRegister.username" />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="formRegister.email" />
                </div>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="formRegister.name" />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="formRegister.password" />
                </div>

                <button @click="handleRegister">Register</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import {validateRegister} from "@/util/validate.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {register} from "@/api/register.js";

const router = useRouter()
const formRegister = ref({
    username: "",
    password: "",
    email: "",
    name: "",
});

const handleRegister = async () =>{
    const valid = validateRegister(formRegister.value);
    if (!valid){
        console.log("invalid")
        return;
    }

    const registerResult = await register(formRegister.value);
    console.log(registerResult);

    if (registerResult.data.code === 0) {
        ElMessage.success("注册成功");
        router.push("/login")
    } else {
        ElMessage.error(registerResult.msg);
    }
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.form-box {
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
input[type='email'],
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
</style>
