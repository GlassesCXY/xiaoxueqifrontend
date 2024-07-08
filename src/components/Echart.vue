<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="12">
                    <div ref="lineChart" style="height: 400px;"></div>
                </el-col>
                <el-col :span="12">
                    <div ref="barChart" style="height: 400px;"></div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const lineChart = ref(null);
const barChart = ref(null);

const lineChartInstance = ref(null);
const barChartInstance = ref(null);

const fetchChartData = async () => {
    try {
        const dateResponse = await axios.get('http://localhost:9090/api/emotion/countByDate');
        const typeResponse = await axios.get('http://localhost:9090/api/emotion/countByType');

        const dates = dateResponse.data.map(item => item.date);
        const dateCounts = dateResponse.data.map(item => item.count);

        const types = typeResponse.data.map(item => item.type);
        const typeCounts = typeResponse.data.map(item => item.count);

        renderLineChart(dates, dateCounts);
        renderBarChart(types, typeCounts);
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }
};

const renderLineChart = (dates, counts) => {
    if (lineChartInstance.value) {
        lineChartInstance.value.dispose();
    }
    lineChartInstance.value = echarts.init(lineChart.value);

    const option = {
        title: {
            text: 'Emotion Count Over Last 5 Days',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: dates,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Count',
                type: 'line',
                data: counts,
            },
        ],
    };

    lineChartInstance.value.setOption(option);
};

const renderBarChart = (types, counts) => {
    if (barChartInstance.value) {
        barChartInstance.value.dispose();
    }
    barChartInstance.value = echarts.init(barChart.value);

    const option = {
        title: {
            text: 'Emotion Type Count',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: types,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Count',
                type: 'bar',
                data: counts,
            },
        ],
    };

    barChartInstance.value.setOption(option);
};

onMounted(() => {
    fetchChartData();
});
</script>

<style scoped>
.el-card {
    margin: 20px;
}
</style>
