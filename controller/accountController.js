/**
 * Created by Tuber on 2017/6/26.
 */
//引入模块
const fs = require('fs');
const path = require('path');
const captchapng = require('captchapng');

//引入数据库帮助模块
const dbhelp = require('../tools/dbhelp.js');

//登录的控制器
exports.postLogin = (req, res) => {
    if(req.session.vcode == req.body.vcode) {
        dbhelp.findOne('account', {"username": req.body.username, "pwd": req.body.pwd}, (err, docs) => {
            if(docs) {
                res.send(`有一个用户${req.body.username}存在`);
            } else {
                res.send('用户不存在或密码错误');
            }
        });
    }else {
        res.send('验证码输入不正确');
    }
}

//登录页面控制器
exports.getLogin = (req, res) => {
    fs.readFile(path.join(__dirname, '../view/login.html'), (err, data) => {
        if(err) {
            throw err;
        }else {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.send(data);
        }
    })
}

//注册api控制器
exports.postRegister = (req, res) => {
    dbhelp.findOne("account", {"username": req.body.username}, (err, result) => {
        if(!result) {
            dbhelp.insertOne("account", {"username": req.body.username, "pwd": req.body.pwd}, (error, data) => {
                if(error) {
                    throw error;
                    res.send("注册失败");
                }else  {
                    res.send("注册成功");
                }
            })
        }else {
            res.send("用户名已存在");
        }
    });
}

//注册界面控制器
exports.getRegister = (req, res) => {
    fs.readFile(path.join(__dirname, '../view/register.html'), (err, data) => {
        if(err) {
            throw err;
        }else {
            res.setHeader('content-type', 'text/html;charset=utf-8');
            res.send(data);
        }
    });
}

//验证码控制器
exports.vcode = (req, res) => {
    req.session.vcode = parseInt(Math.random()*9000+1000);
    let p = new captchapng(80,30,req.session.vcode);  //产生随机数
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    let img = p.getBase64();
    let imgbase64 = new Buffer(img,'base64');
    res.setHeader('content-type', 'image/png');
    res.send(imgbase64);
}


