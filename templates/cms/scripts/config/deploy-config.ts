/*
  ssh: 连接服务器用户信息
  targetDir: 需要压缩的文件目录（启用本地压缩后生效）
  targetFile: 指定上传文件名称（config.js同级目录）
  openCompress: 关闭后，将跳过本地文件压缩，直接上传同级目录下指定文件
  openBackUp: 开启后，若远端存在相同目录，则会修改原始目录名称，不会直接覆盖
  deployDir: 指定远端部署地址
  releaseDir: 指定远端部署地址下的发布目录名称
  */

const config = [
    {
        name: 'device-admin',
        ssh: {
            host: '192.168.96.109',
            port: 22,
            username: 'root',
            password: 'dnk321',
            projectName: 'device-admin',
            commands: [],
        },
        targetDir: 'C:/Users/Administrator/Desktop/project/device-admin/dist', // 目标目录
        targetFile: 'dist.zip', // 目标文件
        openCompress: true, // 是否开启本地压缩
        openBackUp: true, // 是否开启远端备份
        deployDir: '/home/dnake/nginx/data/', // 远端目录
        releaseDir: 'device-admin', // 发布目录
    },
];
interface Config {
    name: string;
    ssh: sshInfo;
    targetDir: string;
    targetFile: string;
    openCompress: boolean;
    openBackUp: boolean;
    deployDir: string;
    releaseDir: string;
}
interface sshInfo {
    host: string;
    port: number;
    username: string;
    password: string;
    passphrase?: string;
    projectName: string;
    commands: string[];
}
export type { Config };
export default config;
