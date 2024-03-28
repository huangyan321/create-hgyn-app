<template>
    <el-upload
        v-if="props.type === 'img'"
        class="avatar-uploader"
        v-bind="$attrs"
        :action="publicStore.sourceHttp + '/system/sysFile/uploadFile'"
        :headers="{ token: publicStore.token }"
        :show-file-list="false"
        :data="fileData"
        name="uploadFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        accept=".jpg,.png,.jpeg"
    >
        <img v-if="src" :src="src" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-upload
        v-if="props.type === 'file'"
        ref="file-upload"
        :headers="{ token: publicStore.token }"
        :action="publicStore.sourceHttp + '/system/sysFile/uploadFile'"
        :limit="1"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :auto-upload="false"
        accept=".zip,.img,.bin,.rbl"
    >
        <template #trigger>
            <el-button type="primary">请选择文件</el-button>
        </template>
        <template #tip>
            <div class="el-upload__tip text-red">
                {{ `只能上传zip/img/bin/rbl文件，且不超过${limitFileSize}M` }}
            </div>
        </template>
    </el-upload>
    <el-upload
        v-if="props.type === 'btn'"
        ref="btnUpload"
        name="uploadFile"
        :headers="{ token: publicStore.token }"
        class="btn-upload column justify-center items-center mt-md"
        :action="publicStore.sourceHttp + '/system/sysFile/uploadFile'"
        :show-file-list="false"
        :data="fileData"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        accept=".jpg,.png,.jpeg"
        :limit="1"
    >
        <el-button type="primary">点击上传</el-button>
        <template #tip>
            <div class="el-upload__tip">
                {{ `只能上传jpg/jpeg/png文件，且不超过${limitImageSize}M` }}
            </div>
        </template>
    </el-upload>
    <el-upload
        v-if="props.type === 'excel'"
        ref="upload"
        multiple
        type="drag"
        :show-file-list="true"
        name="file"
        v-bind="$attrs"
        :action="publicStore.sourceHttp + '/excelEasyPoi/importExcel'"
        :headers="{ token: publicStore.token }"
        :data="fileData"
        accept=".xlsx,.xls"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
    >
        <el-button ref="uploadClick" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script lang="ts" setup>
import type {
    ButtonInstance,
    UploadInstance,
    UploadProps,
    UploadRawFile,
} from 'element-plus';
import { ref } from 'vue';
import { genFileId } from 'element-plus';
import usePublic from '@/hooks/usePublic.hook';
import { usePublicStore } from '@/store/modules/public';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from '@/config/serviceLoading';

const publicStore = usePublicStore();
const { notify } = usePublic();
const btnUpload = ref<UploadInstance>();
const uploadClick = ref<ButtonInstance>();
interface IProps {
    type: string;
    fileData: IFileData;
    limitImageSize?: number;
    limitFileSize?: number;
    src?: string;
    props?: any;
}
interface IFileData {
    fileType?: string;
    uploadType?: number;
    importExcelEnum?: string;
}
const props = withDefaults(defineProps<IProps>(), {
    type: 'img',
    fileData: () => {
        return { fileType: 'pic', uploadType: 1 };
    },
    limitImageSize: 10,
    limitFileSize: 100,
    src: '',
    props: {},
});
const emit = defineEmits(['handleSuccess', 'handleError']);
const touchOpen = () => {
    uploadClick.value?.$el && uploadClick.value?.$el.click();
};
const handleSuccess: UploadProps['onSuccess'] = (response) => {
    tryHideFullScreenLoading();
    if (response.code !== 200) {
        notify('error', response.message);
        return;
    }
    if (props.type === 'excel') {
        response.data.message && notify('error', response.data.message);
        return;
    }
    notify('success', response.message);
    emit('handleSuccess', response?.data?.fileSrc);
};
const handleExceed: UploadProps['onExceed'] = (files) => {
    console.log(files);
    btnUpload.value!.clearFiles();
    const file = files[0] as UploadRawFile;
    file.uid = genFileId();
    btnUpload.value!.handleStart(file);
    btnUpload.value!.submit();
};
const handleError: UploadProps['onError'] = (error) => {
    tryHideFullScreenLoading();
    notify('error', '上传失败！');
    emit('handleError', error);
};
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    showFullScreenLoading();
    if (props.type === 'img' || props.type === 'btn') {
        if (rawFile.size / 1024 / 1024 > props.limitImageSize) {
            notify('error', '请上传小于10M的文件!');
            tryHideFullScreenLoading();
            return false;
        }
        return true;
    }
    if (props.type === 'file') {
        if (rawFile.size / 1024 / 1024 > props.limitFileSize) {
            notify('error', '请上传小于100M的文件!');
            tryHideFullScreenLoading();
            return false;
        }
        return true;
    }
    if (props.type === 'excel') {
        let fileTest = rawFile.name.substring(
            rawFile.name.lastIndexOf('.') + 1,
        );
        const allowFile = ['xlsx', 'xls'];
        if (allowFile.indexOf(fileTest) === -1) {
            notify('error', '文件格式错误！');
            return false;
        }
        return true;
    }
};
defineExpose({ touchOpen });
</script>

<style scoped lang="scss"></style>
