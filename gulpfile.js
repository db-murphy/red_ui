'use strict';
const gulp      = require('gulp');
const src       = process.cwd() + '/src';
const build     = process.cwd() + '/build';
const assets    = process.cwd() + '/dist';
const example    = process.cwd() + '/example';
const lib       = process.cwd() + '/lib';
const shell     = require('shelljs');
const color     = require('colorful');
const version   = require('./package.json').version;
const sftp      = require('gulp-sftp');

// 发布版本
gulp.task('dist', () => {
    // 生成版本代码
    var dist_version = () => {
        gulp.src(build + '/**/*')
            .pipe(gulp.dest(assets + '/' + version))
            .on('end', () => {

            });
    }

    if(shell.ls(assets).indexOf(version) != -1) {
        // 版本已存在
        setTimeout(() => {
            process.stdout.write(color.green(version +' 版本已存在, 是否替换?(y/n):'));
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', (data) => {
                var new_data = data.replace(/\n/g, '');

                if(new_data == 'y') {
                    // 覆盖
                    dist_version(version);
                }

                // 终止进程
                process.stdin.pause();
            });
        }, 500);

    }else{
        // 发布新版本
        dist_version(version);
    }
});

// 部署代码到测试服务器
gulp.task('deploy', () => {
    gulp.src(build + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/red_ui/build',
            user: 'root',
            pass: 'globalwide',
            callback: () => {

            }
        }));
    gulp.src(assets + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/red_ui/dist',
            user: 'root',
            pass: 'globalwide',
            callback: () => {

            }
        }));
    gulp.src(example + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/red_ui/example',
            user: 'root',
            pass: 'globalwide',
            callback: () => {

            }
        }));
    gulp.src(lib + '/**/*')
        .pipe(sftp({
            host: '192.168.192.60',
            remotePath: '/var/www/html/shangou/red_ui/lib',
            user: 'root',
            pass: 'globalwide',
            callback: () => {

            }
        }));
})

// 默认任务
gulp.task('default', ['deploy']);
