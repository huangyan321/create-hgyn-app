/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import fs from 'fs';
import Archiver from 'archiver';

function compressFile(targetDir: string, localFile: string) {
    return new Promise((resolve, reject) => {
        console.log('1-正在压缩文件...');
        const output = fs.createWriteStream(localFile); // 创建文件写入流
        const archive: any = new Archiver('zip', {
            zlib: { level: 9 }, // 设置压缩等级
        });
        output
            .on('close', () => {
                resolve(
                    console.log(
                        '2-压缩完成！共计 ' +
                            (archive.pointer() / 1024 / 1024).toFixed(3) +
                            'MB',
                    ),
                );
            })
            .on('error', (err) => {
                reject(console.error('压缩失败', err));
            });
        archive.pipe(output); // 管道存档数据到文件
        archive.directory(targetDir, 'dist'); // 存储目标文件并重命名
        archive.finalize(); // 完成文件追加 确保写入流完成
    });
}

export default compressFile;
