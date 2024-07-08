<template>
    <div>
        <el-table :data="falls" style="width: 100%">
            <el-table-column prop="fid" label="ID" width="80"></el-table-column>
            <el-table-column prop="fallDate" label="Fall Date">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.fallDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="200">
                <template #default="scope">
                    <el-button @click="deleteFall(scope.row.fid)" type="danger" size="mini">Delete</el-button>
                    <el-button @click="viewImage(scope.row.fid)" type="primary" size="mini">View</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handlePageChange"
        ></el-pagination>

        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="imageUrl" alt="Image"/>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const falls = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const imageUrl = ref('');

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:9090/api/fall/list', {
            params: {
                page: currentPage.value,
                size: pageSize.value
            }
        });
        falls.value = response.data.falls;
        total.value = response.data.total;
    } catch (error) {
        console.error(error);
    }
};

const deleteFall = async (fid) => {
    try {
        await axios.delete(`http://localhost:9090/api/fall/${fid}`);
        ElMessage.success('Record deleted successfully');
        fetchData();
    } catch (error) {
        console.error(error);
        ElMessage.error('Failed to delete record');
    }
};

const viewImage = async (fid) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/fall/image/${fid}`);
        console.log("Image URL:", response.data.url); // 打印 URL 以进行调试
        imageUrl.value = response.data.url;
        dialogVisible.value = true;
    } catch (error) {
        console.error(error);
        ElMessage.error('Failed to get image URL');
    }
};

const handlePageChange = (page) => {
    currentPage.value = page;
    fetchData();
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
};

onMounted(() => {
    fetchData();
});
</script>

<style>
/* 你可以根据需要添加样式 */
</style>
