import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: plumeTheme({
    plugins: {
      shiki: {
        languages: ['javascript', 'typescript', 'vue', 'bash', 'sh'],
      },
    },
    blog: {
      postCover: 'left', // 文章封面
    },
    navbar: [
      { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
      {
        text: '博客',
        link: '/blog/',
        icon: 'material-symbols:article-outline',
      },
      {
        text: '分类',
        link: '/blog/categories/',
        icon: 'material-symbols:wind-power-outline-rounded',
      },
      {
        text: '归档',
        link: '/blog/archives/',
        icon: 'material-symbols:window-closed-outline-rounded',
      },
    ],
    avatar: {
      url: 'https://static.dingtalk.com/media/lQDPD3phchnTo83NAabNAaaw07x-rTWiZNEGLcKMguzOAA_422_422.jpg',
      name: '杨少侠',
      description: '是兄弟，就来砍我吧',
      circle: true, // 是否为圆形头像,
      location: 'HangZhou，China',
      organization: '里渭水塘无限公司',
    },
    social: [
      { icon: 'github', link: 'https://github.com/Nick110' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64"><path fill="currentColor" d="M43.6 28.5H63V63H1V28.5h19.4v17.2h23V28.5zm0-27.5H20.4v17.3h23V1z"/></svg>',
          name: 'unsplash',
        },
        link: 'https://unsplash.com/@nick_y',
      },
      {
        icon: 'juejin',
        link: 'https://juejin.im/user/59279a91ac502e006c5221ea',
      },
      {
        icon: 'x',
        link: 'https://x.com/NickLavis2',
      },
      {
        icon: 'instagram',
        link: 'https://www.instagram.com/nick.sssssss',
      },
    ],
    navbarSocialInclude: ['github', 'juejin', 'x', 'instagram'],
    logo: 'https://p1.music.126.net/KAR_1udSJMUlUQAXOyH-4g==/18565253836756676.jpg?param=180y180',

    footer: { message: 'What can I say?', copyright: "© 2024 杨少侠's Studio" },
    notFound: {
      quote: '👀你瞅啥？404了，还不赶紧走？',
    },
  }),
  lang: 'zh-CN',
  title: "杨少侠's Studio",
  description: '是兄弟，就来砍我吧',
  notes: false,
  sidebar: 'auto',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png' },
    ],
  ],
})
