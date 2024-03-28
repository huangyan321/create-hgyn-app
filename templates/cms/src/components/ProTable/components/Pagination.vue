<template>
    <!-- 分页组件 -->
    <div class="full-width row justify-end items-end pt-md pb-mt mt-md">
        <el-pagination
            :current-page="pageable.pageNum"
            :page-size="pageable.pageSize"
            :page-sizes="[10, 25, 50, 100]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageable.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>

<script setup lang="ts" name="ProPagination">
interface Pageable {
    pageNum: number;
    pageSize: number;
    total: number;
}

interface PaginationProps {
    pageable: Pageable;
    handleSizeChange: (size: number) => void;
    handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
