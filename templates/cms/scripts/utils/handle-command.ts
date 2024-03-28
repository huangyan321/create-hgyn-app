/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import GulpSSH from 'gulp-ssh';
import gulp from 'gulp';
import Config from '../config/deploy-config';

const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: Config[0].ssh,
});
const gulpSshCmd = (cmd: string, path = 'commands.log') => {
    return gulpSSH.shell(cmd, { filePath: path }).pipe(gulp.dest('logs'));
};
export { gulpSshCmd, gulpSSH };
