const time = new Date().getTime();
console.info('正在启动服务中...');
const express = require("express");
const multiparty = require("multiparty");
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }))
//解决跨域问题
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// const updateFileConfig
/**上传文件 */
app.post('/upload/file', (req, res) => {
    //其实可以 other何pdf文件不做区分  这样就少一次文件的读写操作，后续可以优化  todo
    let form = new multiparty.Form({ uploadDir: './file/temp' })
    form.parse(req, (err, fields, file) => {
        if (err) {
            res.send({
                code: 10400, message: JSON.stringify(err),
            });
            res.end();
        } else {
            let time = new Date().getTime();
            let version = fields.version[0];
            const fileData = {
                name: fields.name[0],
                key: time,
                desc: fields.desc[0],
                tag: fields.tag[0].split(','),
                user: fields.user[0],
                show: true,
                time,
                ip: '',
                btn: {
                    link: !fields.link[0]?[]:fields.link,
                    preview: [],
                    download: [],
                    detail: ''
                }
            }
            console.log('fileData',fileData)
            console.log('fields', fields)
            console.log('fields.tag[0]', fields.tag[0])
            let len = Object.keys(file).length;
            if (len > 0) {
                Object.keys(file).forEach((ele, index) => {
                    let filename = file[ele][0].originalFilename;
                    if (ele.startsWith('preview')) {
                        fileData.btn.preview.push(filename)
                    }
                    if (ele.startsWith('download')) {
                        fileData.btn.download.push(filename)
                    }
                    let dest_dir = `./file/${ele.startsWith('preview') ? 'pdf' : 'other'}/${filename}`;
                    // console.log('ele', ele)
                    fs.readFile(file[ele][0].path, (error, data) => {
                        fs.writeFile(dest_dir, data, (err => {
                            if (err) {
                                console.log('write file err', err)
                            } else {
                                fs.unlink(file[ele][0].path, (err) => {
                                    if (err) {
                                        console.log(`文件${file[ele][0].path}删除失败`)
                                    }
                                    console.log(`文件【${file[ele][0].path}】删除成功`)
                                })

                            }
                        }))
                    })
                    if (index === len - 1) {
                        fs.readFile('./config/fileConfig.json', (err, data) => {
                            let resultData = JSON.parse(data);
                            resultData.fileList.unshift(fileData);
                            fs.writeFile('./config/fileConfig.json', JSON.stringify(resultData), (err) => {
                                if (err) {
                                    console.log('更新file json失败')
                                }
                                console.log('更新file json成功')
                            })
                        })

                        if (!!version) {
                            fs.readFile('./config/useConfig.json', (err, data) => {
                                let resultData = JSON.parse(data);
                                if (resultData.messNotify.hasOwnProperty(version)) {
                                    let num = resultData.messNotify[version].fileList;
                                    resultData.messNotify[version].fileList = num + 1;
                                } else {
                                    resultData = {
                                        messNotify: {
                                            [version]: {
                                                fileList: 1,
                                                dot: []
                                            },
                                        }
                                    }
                                }
                                fs.writeFile('./config/useConfig.json', JSON.stringify(resultData), (err) => {
                                    if (err) {
                                        console.log('更新use json失败')
                                    }
                                    console.log('更新use json成功')
                                })
                            })
                        }
                    }
                })
            } else {
                fs.readFile('./config/fileConfig.json', (err, data) => {
                    let resultData = JSON.parse(data);
                    resultData.fileList.unshift(fileData);
                    fs.writeFile('./config/fileConfig.json', JSON.stringify(resultData), (err) => {
                        if (err) {
                            console.log('更新file json失败')
                        }
                        console.log('更新file json成功')
                    })
                })

                if (!!version) {
                    fs.readFile('./config/useConfig.json', (err, data) => {
                        let resultData = JSON.parse(data);
                        if (resultData.messNotify.hasOwnProperty(version)) {
                            let num = resultData.messNotify[version].fileList;
                            resultData.messNotify[version].fileList = num + 1;
                        } else {
                            resultData = {
                                messNotify: {
                                    [version]: {
                                        fileList: 1,
                                        dot: []
                                    },
                                }
                            }
                        }
                        fs.writeFile('./config/useConfig.json', JSON.stringify(resultData), (err) => {
                            if (err) {
                                console.log('更新use json失败')
                            }
                            console.log('更新use json成功')
                        })
                    })
                }
            }
            res.send({
                code: 10200, message: 'ok',
            });
            res.end();
        }

    })
})
/**更新使用的json */
app.post('/update/usejson', (req, res) => {
    const version = req.headers['version']
    const { fileListNum, dot } = req.body;
    if (!!version) {
        fs.readFile('./config/useConfig.json', (err, data) => {
            let resultData = JSON.parse(data);
            if (resultData.messNotify.hasOwnProperty(version)) {
                // let num = resultData.messNotify[version].fileList;
                resultData.messNotify[version].fileList = fileListNum;
                resultData.messNotify[version].dot = dot;
            } else {
                resultData = {
                    messNotify: {
                        [version]: {
                            fileList: fileListNum,
                            dot: dot
                        }
                    }
                }
            }
            fs.writeFile('./config/useConfig.json', JSON.stringify(resultData), (err) => {
                if (err) {
                    console.log('更新use json失败')
                }
                console.log('更新use json成功')
            })
        })
        res.send({
            code: 10200, message: 'ok',
        });
        res.end();
    } else {
        console.log('没有获取到 version 的值')
        res.send({
            code: 10500, message: '未获取到version的值',
        });
        res.end();
    }


})

app.post('/update/fileConfig', (req, res) => {
    const bodyData = req.body;
    let key = bodyData.key;
    fs.readFile('./config/fileConfig.json', (err, data) => {
        let resultData = JSON.parse(data);
        let index = resultData.findIndex(ele => ele.key === key);
        resultData[index].name = bodyData.name;
        resultData[index].desc = bodyData.desc;
        resultData[index].tag = bodyData.tag;
        resultData[index].btn.link = bodyData.link;
        fs.writeFile('./config/fileConfig.json', JSON.stringify(resultData), (err) => {
            if (err) {
                console.log('更新file json失败')
            }
            console.log('更新file json成功')
        })
    })
    res.send({
        code: 10200, message: 'ok',
    });
    res.end();
})

app.post('/delete/fileConfig', (req, res) => {
    let key = bodyData.key;
    fs.readFile('./config/fileConfig.json', (err, data) => {
        let resultData = JSON.parse(data);
        let index = resultData.findIndex(ele => ele.key === key);
        resultData.splice(index, 1);
        fs.writeFile('./config/fileConfig.json', JSON.stringify(resultData), (err) => {
            if (err) {
                console.log('更新file json失败')
            }
            console.log('更新file json成功')
        })
    })
    res.send({
        code: 10200, message: 'ok',
    });
    res.end();
})
// app.get('/get/config/standard', (req, res) => {
//     res.send({
//         code: 10200, message: '', data: {
//             minNonconformingTimes,
//             minNonconformingSeconds
//         }
//     });
//     res.end();
// })
/**判断文件是否存在 */
// app.post('/exist/csv/list', (req, res) => {
//     console.log('req',req.body)
//     const { dateList } = req.body;
//     let resultFile = [];
//     let errorFile = [];
//     dateList.forEach((ele, index) => {
//         let path = `./resultFile/${ele}.csv`;
//         if (fs.existsSync(path)) {
//             resultFile.push(ele)
//         } else {
//             errorFile.push(ele)
//         }
//     })
//     res.send({
//         code: 10200, message: '', data: {
//             resultFile,
//             errorFile
//         }
//     });
//     res.end();

// })
/**读取csv文件内容 */
// app.post('/read/csv/list', async (req, res) => {
//     const { fileName } = req.body;
//     // let fileName = ['20220904', '20220905'];
//     let fileLen = fileName.length;
//     let result = [];
//     //先判断文件
//     fileName.forEach(async (ele, index) => {
//         let path = `./resultFile/${ele}.csv`;
//         try {
//             let data = await csv().fromFile(path);
//             data.forEach((item, iindex) => {
//                 let st = transferFullStringToDate(item.start_time);
//                 let et = transferFullStringToDate(item.end_time);
//                 let duration = (et - st) / 1000
//                 item.st = st;
//                 item.et = et;
//                 item.duration = duration;
//                 item.date = ele;
//                 item.dateFormat = formatDate(ele);
//                 item.key = `${ele}-${item?.job_id || iindex}`;
//                 item.status = 'normal';
//                 item.quantity = +item.quantity;
//                 item.message = ""
//                 if (duration < minNonconformingSeconds) {
//                     item.status = 'error';
//                     item.message = `时间不够`
//                 } 
//                 if (+item.quantity < minNonconformingTimes) {
//                     item.status = 'error';
//                     item.message = `${!!item.message?`${item.message};`:''}次数不足`
//                 } 
//             })
//             result = [...result, ...data];
//             if (index === fileLen - 1) {
//                 res.send({
//                     code: 10200, message: '列表返回成功', data: {
//                         result,
//                     }
//                 });
//                 res.end();
//             }
//         } catch (err) {
//             console.log(`${ele}.csv=====>`, err)
//             res.send({
//                 code: 10500, message: err?.message || `读取${ele}.csv内容出错`, data: null
//             });
//             res.end();
//         }
//     })
// })

app.listen(9098, () => {
    console.info(`server start success,port:9098`)
    console.info(`本次启动共花费${(new Date().getTime() - time) / 1000}秒`)
});
