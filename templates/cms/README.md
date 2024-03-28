# vue3-admin-template

<h4 align="center">Vue3管理平台模板</h4>

## 😶  **主版本分支**：**`master`**

## 📚  **开发分支**：**`dev`**

## 总览

1. vite vue3 pina ts vitest 项目
2. ui框架element-plus@^2.2.16
3. volta管理npm环境
4. vitest编写单元测试
5. 为了避免重写登录相关信息配置的逻辑（字典、系统参数、角色权限、文件资源域名、按钮权限），前置需要通用的系统信息API支持，参考/src/api/module/ -role dict params sysinfo
6. 角色权限过滤查阅/src/utils/utils - flatTreeData

## 整体介绍

- 框架：基于 `Vue3` 框架编写，使用 `hooks` 写法抽离部分逻辑，使代码结构更加清晰；

- 类型：使用 `TypeScript` 进行类型约束，减少未知错误发生概率，可以大胆修改逻辑内容；

- 性能：多处性能优化，使用页面懒加载、组件动态注册、数据滚动加载等方式，提升页面渲染速度；

- 存储：拥有本地记忆，部分配置项采用 `storage` 存储本地，提升使用体验；

- 封装：项目进行了详细的工具类封装如：路由、存储、加/解密、文件处理、主题、NaiveUI 全局方法、组件等

开发环境：

| 名称 | 版本    | 名称    | 版本  |
| ---- | ------- | ------- | ----- |
| node | 16.5.x | npm     | 7.19.x |
| yarn | 1.22.x   | windows | 10    |

## 相关文档

- [Vue3](https://vuejs.org/)
- [Pina](https://pinia.vuejs.org/)
- [vitest](https://vitest.dev/guide/)
- [vite](https://cn.vitejs.dev/config/build-options.html#build-target)
- [TypeScript](https://www.tslang.cn/index.html)

## 运行

```shell
# npm
npm run dev

#yarn
yarn dev

#pnpm
pnpm dev

```

## 编译

```shell
#npm 
npm run build

#yarn
yarn build

```

## 测试

```shell
yarn test

```

## 代码提交

```shell
yarn commit

```

## 代码提交规范

- feat: 新功能
- fix: 修复 Bug
- docs: 文档修改
- perf: 性能优化
- revert: 版本回退
- ci: CICD 集成相关
- test: 添加测试代码
- refactor: 代码重构
- build: 影响项目构建或依赖修改
- style: 不影响程序逻辑的代码修改
- chore: 不属于以上类型的其他类型(日常事务)

## 支持 browserlist

- Edge ≥ 79
- Firefox ≥ 78
- Chrome ≥ 64
- Safari ≥ 12

## vscode预装插件

1. volar
2. vscode-typescript-vue-plugin
3. todo-tree
4. editorconfig
