import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    const ensureIndicator = (container, className) => {
      if (!container) return null

      let indicator = container.querySelector(`.${className}`)
      if (!indicator) {
        indicator = document.createElement('div')
        indicator.className = className
        container.appendChild(indicator)
      }

      return indicator
    }

    const getOutline = () => document.querySelector('.VPDocAsideOutline')
      || document.querySelector('.VPDocAside')

    const moveIndicator = (container, indicatorClass, varPrefix, link) => {
      const indicator = ensureIndicator(container, indicatorClass)
      if (!container || !indicator || !link) return

      const containerRect = container.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      indicator.style.setProperty(`--${varPrefix}-indicator-top`, `${linkRect.top - containerRect.top}px`)
      indicator.style.setProperty(`--${varPrefix}-indicator-height`, `${linkRect.height}px`)
      indicator.classList.add('is-visible')
    }

    const moveSidebarToActive = () => {
      const active = document.querySelector('.VPSidebar .item .link.active')
        || document.querySelector('.VPSidebar .item .link[aria-current="page"]')
      moveIndicator(
        document.querySelector('.VPSidebar'),
        'sidebar-hover-indicator',
        'sidebar',
        active
      )
    }

    const moveOutlineMarker = (link) => {
      const outline = getOutline()
      const marker = outline?.querySelector('.outline-marker')
      if (!outline || !marker || !link) return

      const outlineRect = outline.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      marker.style.top = `${linkRect.top - outlineRect.top}px`
      marker.style.height = `${linkRect.height}px`
      marker.style.opacity = '1'
    }

    const moveOutlineToActive = () => {
      const active = document.querySelector('.VPDocAsideOutline .outline-link.active')
        || document.querySelector('.VPDocAsideOutline .outline-link[aria-current="true"]')
        || document.querySelector('.VPDocAsideOutline a')
      moveOutlineMarker(active)
    }

    const bindSidebar = () => {
      const links = document.querySelectorAll('.VPSidebar .item .link')
      links.forEach((link) => {
        if (link.dataset.hoverIndicatorBound === '1') return

        link.dataset.hoverIndicatorBound = '1'
        link.addEventListener('mouseenter', () => moveIndicator(
          document.querySelector('.VPSidebar'),
          'sidebar-hover-indicator',
          'sidebar',
          link
        ))
        link.addEventListener('focus', () => moveIndicator(
          document.querySelector('.VPSidebar'),
          'sidebar-hover-indicator',
          'sidebar',
          link
        ))
      })

      const sidebar = document.querySelector('.VPSidebar')
      if (sidebar && sidebar.dataset.hoverIndicatorLeaveBound !== '1') {
        sidebar.dataset.hoverIndicatorLeaveBound = '1'
        sidebar.addEventListener('mouseleave', moveSidebarToActive)
      }

      moveSidebarToActive()
    }

    const bindOutline = () => {
      const outline = getOutline()
      if (!outline) return

      const links = outline.querySelectorAll('.outline-link, a')
      links.forEach((link) => {
        if (link.dataset.hoverIndicatorBound === '1') return

        link.dataset.hoverIndicatorBound = '1'
        link.addEventListener('mouseenter', () => moveOutlineMarker(link))
        link.addEventListener('focus', () => moveOutlineMarker(link))
      })

      if (outline && outline.dataset.hoverIndicatorLeaveBound !== '1') {
        outline.dataset.hoverIndicatorLeaveBound = '1'
        outline.addEventListener('mouseleave', moveOutlineToActive)
      }

      moveOutlineToActive()
    }

    const bindIndicators = () => {
      bindSidebar()
      bindOutline()
    }

    // ── 主内容区鼠标跟随光晕 ──
    const initContentGlow = () => {
      const doc = document.querySelector('.VPDoc')
      if (!doc || doc.dataset.glowBound === '1') return
      doc.dataset.glowBound = '1'

      // 注入 CSS 变量更新
      const style = document.createElement('style')
      style.textContent = `
        .VPDoc {
          --glow-x: 50%;
          --glow-y: 50%;
        }
      `
      document.head.appendChild(style)

      doc.addEventListener('mousemove', (e) => {
        const rect = doc.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        doc.style.setProperty('--glow-x', `${x}%`)
        doc.style.setProperty('--glow-y', `${y}%`)
      }, { passive: true })
    }

    onMounted(() => {
      bindIndicators()
      initContentGlow()
      window.setTimeout(bindIndicators, 250)
      window.setTimeout(bindIndicators, 800)
      window.setTimeout(initContentGlow, 250)
      window.addEventListener('resize', () => {
        moveSidebarToActive()
        moveOutlineToActive()
      })
      window.addEventListener('scroll', moveOutlineToActive, { passive: true })
    })

    watch(
      () => route.path,
      async () => {
        await nextTick()
        bindIndicators()
      }
    )
  }
}
