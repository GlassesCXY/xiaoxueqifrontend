<template>
    <div>
        <el-table :data="emotions" style="width: 100%">
            <el-table-column prop="eid" label="ID" width="80"></el-table-column>
            <el-table-column prop="type" label="Type"></el-table-column>
            <el-table-column prop="emotionDate" label="Date">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.emotionDate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Actions" width="150">
                <template #default="scope">
                    <el-button @click="deleteEmotion(scope.row.eid)" type="danger" size="mini">Delete</el-button>
                    <el-button @click="viewImage(scope.row.eid, 'emotion')" type="primary" size="mini">View</el-button>
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

const emotions = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const imageUrl = ref('');

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:9090/api/emotion/list', {
            params: {
                page: currentPage.value,
                size: pageSize.value
            }
        });
        emotions.value = response.data.emotions;
        total.value = response.data.total;
    } catch (error) {
        console.error(error);
    }
};

const deleteEmotion = async (eid) => {
    try {
        await axios.delete(`http://localhost:9090/api/emotion/${eid}`);
        ElMessage.success('Record deleted successfully');
        fetchData();
    } catch (error) {
        console.error(error);
        ElMessage.error('Failed to delete record');
    }
};

const viewImage = async (id, type) => {
    try {
        const response = await axios.get(`http://localhost:9090/api/${type}/image/${id}`);
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
