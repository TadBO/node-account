/**
 * Created by Tuber on 2017/6/26.
 */
//引入需要的模块
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');


//引入自定义模块
const accountRouter = require('./router/accountRouter.js');

//设置请求主体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//设置session值
app.use(session({
    secret: 'keybord cat'
}))

//静态资源加载
app.use(express.static(path.join(__dirname, './public')));
//路由接收
app.use('/account', accountRouter);


//监听端口
app.listen(3000, (err) => {
    if(err) throw err;
        console.log('3000端口已启动');
    });