---
title: git学习笔记
author: 杨少侠
createTime: 2020/04/25 09:55:09
permalink: /article/hefpuq99/
tags:
  - 前端
---

## 基本概念

### 仓库

![git仓库概念](https://pic3.zhimg.com/80/v2-55ac74977563cc66e863b6c71d9b0ab6_1440w.webp)

<!-- more -->

#### 对应一些命令

1. `git add .` 将工作区的文件添加至暂存区
2. `git commit -m "message"` 将暂存区的修改加备注提交至本地仓库
3. `git remote add origin https://github.com/name/name_cangku.git` 把本地仓库与远程仓库连接起来。
4. `git push origin branchName` 将本地仓库里的提交推送至远程仓库的指定分支

### 分支

1. 创建 develop 分支：`git branch develop`
2. 切换至 develop 分支：`git checkout develop`
3. 创建并切换至 develop 分支：`git checkout -b develop`
4. 查看所有分支：`git branch`
5. 在 master 上将 develop 分支合并到 master：`git merge develop`
6. 查看分支合并图：`git log --graph`
7. 删除 develop 分支：`git branch -d develop` （-D）强制删除分支

### 拉取

1. `git pull == git fetch + git merge` 抓取远程分支的提交并合并到当前分支

### Rebase（变基）

普通 merge：
![merge](http://gitbook.liuhui998.com/assets/images/figure/rebase2.png)
rebase：
![rebase](http://gitbook.liuhui998.com/assets/images/figure/rebase3.png)
`git rebase origin` 将当前分支分叉的记录找到最近的一个父节点,将此父节点之后的所有提交历史记录接到 origin 分支的历史记录之后。把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。

### 版本

1. `git log` 查看日志
2. `git reset --hard + 版本号` 回溯到指定版本
3. 回溯到历史的版本后，想要前进到未来的版本，使用`git reflog`它帮你记录了每一次的版本号，还是使用`git reset --hard + 版本号`前进到未来的版本
4. `git push -f origin master` 强制提交到远程仓库

## 全局配置

### 配置邮箱和用户名

```shell
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

## 常见命令简写

| 命令                              | 简写                   | 作用                        |
| --------------------------------- | ---------------------- | --------------------------- |
| `git init`                        | –                      | 创建本地仓库                |
| `git clone '仓库地址`             | –                      | 克隆仓库到本地              |
| `git branch`                      | `gb`                   | 查看本地分支                |
| `git branch -a`                   | `gb -a`                | 查看本地 和 远程的分支      |
| `git branch -d master`            | `gb -d master`         | 删除分支                    |
| `git branch -m master`            | `gb -m master`         | 修改分支名                  |
| `git checkout master`             | `gco`                  | 切换分支                    |
| `git checkout -b master`          | `gco -b master`        | 切换并创建分支              |
| `git status`                      | `gst`                  | 查看是否有文件被修改        |
| `git diff`                        | –                      | 查看是否有文件被修改        |
| `git add .`                       | `gaa`                  | 将文件添加到暂存区          |
| `git commit -m "日志"`            | `gcmsg '日志'`         | 提交暂存区文件到本地仓库中  |
| `git merge 分支名`                | `gm '日志'`            | 合并分支                    |
| `git fetch origin master`         | –                      | 拉取远程分支                |
| `git pull origin master`          | `gl origin`            | 拉取仓库分支                |
| `git push origin master`          | `gp origin`            | 推送分支                    |
| `git push -f origin master`       | `gp -f origin master ` | 强制推送分支                |
| `git push origin --delete master` | –                      | 删除远程分支                |
| `git log`                         | –                      | 查看已经提交的版本          |
| `git log --pretty=oneline`        | `glog'`                | 显示提交历史的树形图/版本号 |

## git 提交信息规范

- fix： Bug 修复
- feat： 一个新的功能或特性
- style：样式修复
- docs: 文档变更
- merge: 分支合并
- refactor: 代码重构，注意和特性、修复区分开
- perf: 提升性能
- build: 开发工具变动(构建、脚手架工具等)
- ci: 修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
- test: 添加一个测试
- revert: 代码回退
- chore: 不属于以上类型的其他类型

## git 工作流

- `master` 归档分支
- `develop` 发布测试分支
- `feature` 新开发的功能分支-拉取自 master
- `release` 发版分支，发版完成后归档到 master
- `hotfix` 热修复分支，紧急修改 bug 后自动合并到 master 和 develop 分支

![git工作流](https://img1.sycdn.imooc.com/5be084120001368312800720.jpg)

![git工作流](http://eshop-bucket.hzpdex.com/web/1717558952395_bb3e2914f5884067a948239d12d43783~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.png)

&nbsp;

## 参考：[Git 笔记 - 程序员都要掌握的 Git](https://juejin.im/post/5d157bf3f265da1bcc1954e6#heading-6)

&nbsp;
