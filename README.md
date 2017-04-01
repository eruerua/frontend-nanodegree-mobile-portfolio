## 如何运行

[下载](https://github.com/eruerua/frontend-nanodegree-mobile-portfolio)项目到任意位置，运行index即可，或者可以直接打开[地址](https://eruerua.github.io/)

## 构建工具

使用了grunt中的uglify，cssmin，imgmin，work构建工具，在确定系统安装grunt后，即可使用npm install安装必要的工具，安装完毕后输入grunt 即可运行工作流。

## 优化过程

- 根据pagespeed的反馈，index.html 存在阻止呈现的外部文件分别为

  1. fonts.googleapis.com/css?family=Open+Sans:400,700,
  2. style.min.css,
  3. print.min.css,
  4. http://www.google-analytics.com/analytics.js

  对于js可以采用异步加载的方式；对于关键部位而且体量不大的css直接采用内嵌到html的方法；对于print可以采用媒体查询的方式，在需要的时候可以加载；对于google字体如果不需要，就可以直接删除掉。

- 采用grunt工作流方式压缩照片和css，js。

- 对于pizza.html滚动的优化，通过录制滚动Timeline发现main.js的updatePositions()函数中document.body.scrollTop在循环体中导致Forced reflow，所以在循环体外把document.body.scrollTop赋值给变量，然后代入到循环体中，即可避免。

- 同样录制pizza尺寸变化滑块的Timeline，发现determineDX引发的Forced reflow，采用课程提出的解决方法重写了changePizzaSizes函数，避免不必要的浪费