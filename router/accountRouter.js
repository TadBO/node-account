/**
 * Created by Tuber on 2017/6/26.
 */
//引入模块
const express = require('express');
const router = express.Router();

//引入控制器模块
const accountController = require('../controller/accountController.js');

//配置路由
//登录api接口路由
router.post('/logindata', accountController.postLogin);

//登录页面路由接口
router.get('/login', accountController.getLogin);

//注册api路由接口
router.post('/registerdata', accountController.postRegister);

//注册页面路由接口
router.get('/register', accountController.getRegister);

//验证码接口路由
router.get('/vcode', accountController.vcode);
//将配置的路由暴露出去
module.exports = router;
