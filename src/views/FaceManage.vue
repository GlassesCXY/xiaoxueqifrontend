<template>
    <div>
        <el-collapse v-model="isFormVisible">
            <el-collapse-item>
                <template #title>
                    上传人脸
                </template>
                <form @submit.prevent="submitForm" class="form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input id="name" v-model="form.name" type="text" placeholder="Enter name" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="age">Age</label>
                        <input id="age" v-model="form.age" type="number" placeholder="Enter age" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" v-model="form.gender" class="form-control">
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="file">File</label>
                        <input id="file" @change="handleFileChange" type="file" accept="image/*" class="form-control" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn">Submit</button>
                    </div>
                </form>
            </el-collapse-item>
        </el-collapse>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="oid" label="OID" width="180"></el-table-column>
            <el-table-column prop="name" label="Name" width="180"></el-table-column>
            <el-table-column prop="age" label="Age" width="180"></el-table-column>
            <el-table-column prop="gender" label="Gender" width="180"></el-table-column>
            <el-table-column label="Actions" width="180">
                <template #default="scope">
                    <el-button @click="deleteFace(scope.row.oid)" type="danger">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="perPage"
                @current-change="handlePageChange">
        </el-pagination>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import 'element-plus/dist/index.css';
import { ElForm, ElFormItem, ElInput, ElButton, ElTable, ElTableColumn, ElUpload, ElOption, ElSelect, ElPagination } from 'element-plus';

export default {
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
        ElTable,
        ElTableColumn,
        ElUpload,
        ElOption,
        ElSelect,
        ElPagination,
    },
    setup() {
        const isFormVisible = ref(false);

        const form = ref({
            name: '',
            age: '',
            gender: '',
            file: null
        });
        const fileList = ref([]);
        const tableData = ref([]);
        const total = ref(0);
        const perPage = ref(10);
        const currentPage = ref(1);

        const fetchData = async (page) => {
            try {
                const response = await axios.get('http://localhost:5000/getfaces', {
                    params: {
                        page: page,
                        per_page: perPage.value,
                    }
                });
                tableData.value = response.data.data;
                total.value = response.data.total;
            } catch (error) {
                console.error(error);
            }
        };

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            form.value.file = file;
        };

        const beforeUpload = () => {
            return false; // Prevent automatic upload
        };

        const uploadFile = async () => {
            const formData = new FormData();
            formData.append('file', form.value.file);
            formData.append('name', form.value.name);
            formData.append('age', form.value.age);
            formData.append('gender', form.value.gender);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data.status === 'success') {
                    fetchData(currentPage.value);
                }
                alert(response.data.message);
            } catch (error) {
                console.error(error);
                alert('Error uploading file');
            }
        };

        const submitForm = () => {
            if (form.value.file && form.value.name && form.value.age && form.value.gender) {
                uploadFile();
            } else {
                alert('Please fill out all fields and select a file');
            }
        };

        const deleteFace = async (oid) => {
            try {
                const response = await axios.post('http://localhost:5000/delete', null, {
                    params: { oid: oid }
                });
                if (response.data.status === 'success') {
                    fetchData(currentPage.value);
                }
                alert(response.data.message);
            } catch (error) {
                console.error(error);
                alert('Error deleting face');
            }
        };

        const handlePageChange = (page) => {
            currentPage.value = page;
            fetchData(page);
        };

        const toggleForm = () => {
            isFormVisible.value = !isFormVisible.value;
        };

        onMounted(() => {
            fetchData(currentPage.value);
        });

        return {
            form,
            fileList,
            tableData,
            total,
            perPage,
            currentPage,
            isFormVisible,
            handleFileChange,
            beforeUpload,
            submitForm,
            deleteFace,
            handlePageChange,
            toggleForm,
        };
    }
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
</style>
