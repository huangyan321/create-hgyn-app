/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import config from './config/deploy-config';
import run from './build';
import { componentPath } from './utils/paths';
import fs from 'fs';
import { versionHandle, useTime, getCurrentTime } from './utils/utils';
import gulp from 'gulp';
import { gulpSshCmd, gulpSSH } from './utils/handle-command';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/**
 *
 * @param done
 * @returns void
 * @describtion  读取-写入新的pkg版本号
 */
const readPkg = async (done) => {
    rl.question('是否更新版本号?(y更新/n不更新):', (e: string) => {
        if (!e) {
            rl.close();
        }
        if (e === 'y') {
            fs.readFile(
                `${componentPath}/package.json`,
                'utf-8',
                (err, data: any) => {
                    if (err) console.log(`Task Err:${err}`);
                    data = JSON.parse(data);
                    console.log(`Task Console:now version-${data.version}`);
                    data.version = `DNK_S_DOP_MP_V${versionHandle(
                        data.version,
                    )}_${useTime('nowMonth')}`;
                    fs.writeFile(
                        `${componentPath}/package.json`,
                        JSON.stringify(data, null, '\t'),
                        (err) => {
                            if (err) throw err;
                            console.log(
                                `Task Complete:new pkg version writed_${data.version}`,
                            );
                            done();
                        },
                    );
                },
            );
        }
        if (e === 'n') {
            console.log('Task Complete:no new version writed');
            done();
        }
    });
};
/**
 * @describtion 删除本地已打包文件
 */
const deleteDist = async (done) => {
    await run(`rm -rf ${componentPath}/dist/*`);
    console.log('Task Complete:old dist delete');
    done();
};
/**
 * @describtion 打包
 */
const buildDist = async (done) => {
    console.log('Task Start:yarn build');
    await run('yarn build');
    done();
};
const SELECT_CONFIG = config[0]; // 所选部署项目的配置信息

gulp.task('delete-dist', (done) => {
    deleteDist(done);
});
gulp.task('handle-pkg', (done) => {
    readPkg(done);
});
gulp.task('build-dist', (done) => {
    buildDist(done);
});
gulp.task('backup', () => {
    return gulpSshCmd(
        `
            if [ ! -d /home/dnake/nginx/data/backup ];
            then mkdir backup
            echo backup not exist!
            else 
            echo backup exist!
            fi
            `,
    );
});
gulp.task('cp-remove', () => {
    return gulpSshCmd(
        `
         if [ -d ${SELECT_CONFIG.releaseDir} ];
         echo ${SELECT_CONFIG.releaseDir} exist!
         then cp -r ${SELECT_CONFIG.deployDir}${SELECT_CONFIG.releaseDir}/ ${
            SELECT_CONFIG.deployDir
        }backup/${SELECT_CONFIG.releaseDir}_${getCurrentTime()}
        rm -rf ${SELECT_CONFIG.deployDir}${SELECT_CONFIG.releaseDir}/*}
        else 
        echo ${SELECT_CONFIG.releaseDir} not exist!
        fi
        `,
    );
});

gulp.task('upload', () => {
    return gulp
        .src(`../dist/**/*`)
        .pipe(gulpSSH.dest(SELECT_CONFIG.deployDir + SELECT_CONFIG.releaseDir));
});
gulp.task(
    'default',
    gulp.series(
        'delete-dist',
        'handle-pkg',
        'build-dist',
        'backup',
        'cp-remove',
        'upload',
    ),
);
