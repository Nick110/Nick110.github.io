import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { plumeTheme } from "vuepress-theme-plume";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: plumeTheme({
    favicon: '../images/favicon.ico ',
    navbar: [
      { text: "首页", link: "/", icon: "material-symbols:home-outline" },
      {
        text: "博客",
        link: "/blog/",
        icon: "material-symbols:article-outline",
      },
    ],
    avatar: {
      url: "https://static.dingtalk.com/media/lQDPD3phchnTo83NAabNAaaw07x-rTWiZNEGLcKMguzOAA_422_422.jpg",
      name: "杨少侠",
      description: "是兄弟，就来砍我吧",
      circle: true, // 是否为圆形头像,
      location: "HangZhou，China",
      organization: '里渭水塘无限公司',
    },
    social: [
      { icon: "github", link: "https://github.com/Nick110" },
      {
        icon: "juejin",
        link: "https://juejin.im/user/59279a91ac502e006c5221ea",
      },
      {
        icon: "x",
        link: "https://x.com/NickLavis2",
      },
      {
        icon: "instagram",
        link: "https://www.instagram.com/nick.sssssss",
      },
    ],
    navbarSocialInclude: ["github", "juejin", "x", "instagram"],
    logo: "https://p1.music.126.net/KAR_1udSJMUlUQAXOyH-4g==/18565253836756676.jpg?param=180y180",
    notFound: {
      quote: "👀你瞅啥？404了，还不赶紧走？"
    }
  }),
  lang: "zh-CN",
  title: "杨少侠's Studio",
  description: "是兄弟，就来砍我吧",
  notes: {
    dir: '/notes/', // 声明所有笔记的目录
    link: '/note', // 声明所有笔记默认的链接前缀， 默认为 '/'
  }
});
