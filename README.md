# gitlab 代码评审辅助工具(Chrome 插件)

**用途:** 在 Merge Request 评审时，替代人工输入 ```#pass``` 指令 

**作者:** @carlos

## 使用简介：

1. clone 仓库到你的本地。

2. build 项目, ``` npm install ```  或者  ```npm run build```

3. 打开 Chrome , 设置 --> 扩展程序 --> 加载已解压的扩展程序 --> 选择项目文件下的 dist 文件夹即可。

###token 配置：
1. 打开 gitlab 账户设置界面，选择 Access Token 后，输入你的 token 名字，然后勾选上该 token 的所有权限范围，点击生成按钮生成一个随机 token。

2. 在 Chrome 的插件栏中，右键点击我们的插件， 选择 ```选项``` 一栏，在弹出的页面中输入我们生成的 token 点击 save 按钮保存。

3. 重启 Chorme ，打开一个指派给 softdev_ merge_bot 这个机器人的 Merge Request ，如果在该 MR 的评论区域下方有一个 Pass Softdev Code Review 按钮，那么说明你安装成功了！