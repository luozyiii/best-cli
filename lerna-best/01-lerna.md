# Lerna 简介

create-react-app、babel、vue-cli 都使用它管理项目

## 原生脚手架开发痛点

> package 越多，管理复杂度越高

- 痛点一：重复操作
  多 package 本地 link、多 package 依赖安装、多 package 单元测试、多 package 代码提交、多 package 代码分布

- 痛点二：版本一致性
  发布时版本一致性、发布后相互依赖版本升级

## Lerna 简介

[lerna](https://www.lernajs.cn/) 是一个优化基于 git + npm 的多 package 项目的管理

### 优势

- 大幅减少重复操作
- 提升操作的标准化
  > Lerna 是架构优化的产物，它揭示了一个架构真理：项目复杂度提升后，就需要对项目进行架构优化。架构优化的主要目标往往是以效能为核心的。

## lerna 开发脚手架流程

##### 项目的初始化

- 初始化 npm 项目
- 安装 lerna
- lerna init 初始化项目

##### 创建 package

- lerna create 创建 package
- lerna add 安装依赖
- lerna link 链接依赖

##### 脚手架的开发和测试

- lerna exec 执行 shell 脚本
- lerna run 执行 npm 命令
- lerna clear 清空依赖
- lerna bootstrap 重装依赖

##### 脚手架发布上线

- lerna version 、bump version
- lerna changed 查看上版本以来所有的变更
- lerna diff 查看 diff
- lerna publish 项目发布
