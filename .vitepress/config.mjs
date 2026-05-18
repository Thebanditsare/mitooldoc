import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'HF 工具箱使用教程',
  description: '面向普通用户的小米解锁、ROOT、线刷与备份恢复教程',
  lang: 'zh-CN',
  base: '/mitooldoc/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    logo: '/favicon.png',
    siteTitle: 'HF 工具箱教程',
    nav: [
      { text: '开始使用', link: '/guide/start' },
      { text: '功能教程', link: '/features/xiaomi-unlock' },
      { text: '常见问题', link: '/guide/faq' }
    ],
    sidebar: [
      {
        text: '基础',
        items: [
          { text: '工具箱介绍', link: '/' },
          { text: '快速开始', link: '/guide/start' },
          { text: '卡密登录与个人中心', link: '/guide/account' },
          { text: '安全注意事项', link: '/guide/safety' }
        ]
      },
      {
        text: '功能教程',
        items: [
          { text: '小米解锁 BL', link: '/features/xiaomi-unlock' },
          { text: '一键 ROOT', link: '/features/root' },
          { text: '一加线刷', link: '/features/oneplus-flash' },
          { text: '隐藏 ROOT', link: '/features/hidden-root' },
          { text: '备份恢复', link: '/features/backup-restore' },
          { text: '捐赠入口', link: '/features/donate' }
        ]
      },
      {
        text: '帮助',
        items: [
          { text: '常见问题', link: '/guide/faq' },
          { text: '故障排查', link: '/guide/troubleshooting' }
        ]
      }
    ],
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium', timeStyle: 'short' } },
    search: { provider: 'local' },
    footer: {
      message: '请在充分理解风险后使用相关功能。',
      copyright: 'Copyright © 2026 HF 科技'
    }
  }
})
