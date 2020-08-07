# umi project

## 环境准备

首先得有 [node](https://nodejs.org/en/)，并确保 node 版本是 10.13 或以上。（mac 下推荐使用 [nvm](https://github.com/creationix/nvm) 来管理 node 版本）

```bash
$ node -v
v10.13.0
```

推荐使用 yarn 管理 npm 依赖，并使用[国内源](https://github.com/yiminghe/tyarn)（阿里用户使用内网源）。

```bash
# 国内源
$ npm i yarn tyarn -g
# 后面文档里的 yarn 换成 tyarn
$ tyarn -v

# 阿里内网源
$ tnpm i yarn @ali/yarn -g
# 后面文档里的 yarn 换成 ayarn
$ ayarn -v
```
# 脚手架
先找个地方建个空目录。

```bash
$ mkdir myapp && cd myapp
```
通过官方工具创建项目

```bash
$ yarn create @umijs/umi-app
# 或 npx @umijs/create-umi-app
```
# 安装依赖
```bash
$ yarn
```
# 启动项目
```bash
$ yarn start
```
# 部署发布
## 构建
```bash
$ yarn build
```
构建产物默认生成到 ./dist 下，然后通过 tree 命令查看
```bash
tree ./dist
./dist
├── index.html
├── umi.css
└── umi.js
```
## 本地验证
发布之前，可以通过 serve 做本地验证
```bash
$ yarn global add serve
$ serve ./dist

   ┌────────────────────────────────────────────────────┐
   │                                                    │
   │   Serving!                                         │
   │                                                    │
   │   - Local:            http://localhost:5000        │
   │   - On Your Network:  http://192.168.12.34:5000    │
   │                                                    │
   │   Copied local address to clipboard!               │
   │                                                    │
   └────────────────────────────────────────────────────┘

```
# 路由
手动创建或者使用下面的命令。
建立pages下面的单页面about：
```bash
$ umi g page about
```
建立文件夹more(默认是js和css)：
```bash
$ umi g page more/index --typescript --less
```