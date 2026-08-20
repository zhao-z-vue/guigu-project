# 硅谷甄选运营平台

一个基于 Vue 3 + Vite + Element Plus 的后台管理系统，包含登录鉴权、品牌管理、权限控制等核心功能。

## 🌐 线上地址

https://stirring-rugelach-fb873e.netlify.app

## ✨ 技术栈

- **前端框架**：Vue 3（Composition API）
- **构建工具**：Vite
- **状态管理**：Pinia
- **UI 组件库**：Element Plus
- **网络请求**：Axios
- **代码规范**：ESLint + Prettier + Stylelint + Husky

## 🚀 快速开始

### 环境要求
- Node.js（>= 16.0.0）
- pnpm（>= 7.0.0）

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/zhao-z-vue/guigu-project.git

# 2. 进入项目目录
cd guigu-project

# 3. 安装依赖
pnpm install

# 4. 启动开发服务器
pnpm run dev
```

## 📁 已完成功能

- ✅ 登录与路由鉴权（Token 存储、路由守卫拦截）
- ✅ 品牌管理（列表展示、分页、新增/修改/删除）
- ✅ 权限管理（动态路由、按钮权限控制
- ✅ 前端工程化规范（ESLint + Prettier + Husky）

## 📂 项目结构

```
src/
├── api/            # API 接口请求
├── assets/         # 静态资源
├── components/     # 公共组件
├── router/         # 路由配置
├── store/          # Pinia 状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数（Axios 封装）
└── views/          # 页面组件
```