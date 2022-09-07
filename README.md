# Interview Web Api
## Instruction: How to start
Type 3 simple commands into your terminal: 

1. Grab the files!
```bash
git clone git@github.com:dqhl76/Interview-web-api.git
```

2. Install Dependencies
```bash
cd Interview-web-api
npm install
```

3. Run!
```bash
npm run dev
```

Then you can access the app via http://localhost:8888

## 常见命令：

- `npm run dev` **最常用的指令**，用来在开发时运行ts程序
- `npm run build` 将ts程序编译为js程序
- `npm run start` 运行编译后的js程序
- `npm run build && npm run start` 部署时请运行这个
- `npm run lint` 检查你的ts程序中的格式问题
- `npm run lint:fix` 将使用lint中发现的问题解决掉，同时提交时也会进行fix
## git相关的开发规范
每个 commit 应尽量小，需要按照 [ng4 的提交规范](https://www.npmjs.com/package/@commitlint/config-conventional#type-enum) 填写你的 commit 信息。

举个例子，你修复了调试模块的变量获取问题，提交信息可以如下所示：

```txt
fix: fix variable acquisition under the debug panel
```

这里附上简要相关内容：

请全程保持小写

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动