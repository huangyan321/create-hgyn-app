<template>
    <el-card :body-style="bodyStyle">
        <el-config-provider :locale="zhCn">
            <router-view>
                <template #default="{ Component, route }">
                    <component
                        :is="Component"
                        v-if="!route.meta.keepAlive"
                        :key="route.fullPath"
                    ></component>
                    <keep-alive v-else>
                        <component
                            :is="Component"
                            :key="route.fullPath"
                        ></component>
                    </keep-alive>
                </template>
            </router-view>
        </el-config-provider>
    </el-card>
</template>

<script lang="ts" setup>
import { watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const router = useRouter();
const bodyStyle = reactive({ padding: '0' });
watch(
    () => router.currentRoute.value.path,
    (n) => {
        if (n === '/main') {
            bodyStyle.padding = '0';
        } else {
            bodyStyle.padding = '20px';
        }
    },
    { immediate: true },
);
</script>

<style scoped lang="scss"></style>
