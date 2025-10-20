// ========================================
// SISTEMA AVANÇADO DE MEDIA QUERIES
// ========================================

class MediaQueryManager {
  constructor() {
    this.queries = {
      // Breakpoints
      mobile: window.matchMedia("(max-width: 767px)"),
      tablet: window.matchMedia("(min-width: 768px) and (max-width: 1023px)"),
      desktop: window.matchMedia("(min-width: 1024px) and (max-width: 1439px)"),
      largeDesktop: window.matchMedia("(min-width: 1440px)"),

      // Orientação
      portrait: window.matchMedia("(orientation: portrait)"),
      landscape: window.matchMedia("(orientation: landscape)"),

      // Preferências do usuário
      darkMode: window.matchMedia("(prefers-color-scheme: dark)"),
      lightMode: window.matchMedia("(prefers-color-scheme: light)"),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
      reducedTransparency: window.matchMedia("(prefers-reduced-transparency: reduce)"),
      highContrast: window.matchMedia("(prefers-contrast: high)"),

      // Capacidades de interação
      hover: window.matchMedia("(hover: hover)"),
      noHover: window.matchMedia("(hover: none)"),
      finePointer: window.matchMedia("(pointer: fine)"),
      coarsePointer: window.matchMedia("(pointer: coarse)"),

      // Display
      retina: window.matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"),

      // Aspect ratios
      ultraWide: window.matchMedia("(min-aspect-ratio: 21/9)"),
      square: window.matchMedia("(aspect-ratio: 1/1)"),
    }

    this.callbacks = {}
    this.state = {}

    this.init()
  }

  init() {
    // Registrar todos os listeners
    Object.keys(this.queries).forEach(queryName => {
      const mq = this.queries[queryName]

      // Estado inicial
      this.state[queryName] = mq.matches

      // Listener para mudanças
      mq.addEventListener("change", e => this.handleQueryChange(queryName, e))
    })

    // Log inicial
    console.log("📱 MediaQueryManager inicializado")
    console.log("Estado atual:", this.state)
  }

  handleQueryChange(queryName, event) {
    const oldValue = this.state[queryName]
    const newValue = event.matches

    this.state[queryName] = newValue

    console.log(`🔄 Media Query mudou: ${queryName}`, {
      anterior: oldValue,
      novo: newValue,
    })

    // Executar callbacks registrados
    if (this.callbacks[queryName]) {
      this.callbacks[queryName].forEach(callback => {
        callback(newValue, oldValue)
      })
    }

    // Atualizar UI info panel
    this.updateInfoPanel()
  }

  // Registrar callback para uma query específica
  on(queryName, callback) {
    if (!this.callbacks[queryName]) {
      this.callbacks[queryName] = []
    }
    this.callbacks[queryName].push(callback)
  }

  // Verificar se uma query está ativa
  matches(queryName) {
    return this.state[queryName]
  }

  // Obter breakpoint atual
  getCurrentBreakpoint() {
    if (this.matches("mobile")) return "mobile"
    if (this.matches("tablet")) return "tablet"
    if (this.matches("desktop")) return "desktop"
    if (this.matches("largeDesktop")) return "large-desktop"
    return "unknown"
  }

  // Atualizar painel de informações
  updateInfoPanel() {
    const breakpoint = this.getCurrentBreakpoint()
    const viewport = `${window.innerWidth} × ${window.innerHeight}`
    const orientation = this.matches("portrait") ? "Portrait" : "Landscape"
    const theme = this.matches("darkMode") ? "Dark" : "Light"
    const hover = this.matches("hover") ? "Yes (Mouse)" : "No (Touch)"
    const pointer = this.matches("finePointer") ? "Fine (Mouse)" : "Coarse (Touch)"

    document.getElementById("current-breakpoint").textContent = breakpoint
    document.getElementById("viewport-size").textContent = viewport
    document.getElementById("orientation").textContent = orientation
    document.getElementById("color-scheme").textContent = theme
    document.getElementById("hover-support").textContent = hover
    document.getElementById("pointer-type").textContent = pointer
  }

  // Carregar recurso condicionalmente
  loadResource(queryName, resourceUrl, type = "script") {
    if (this.matches(queryName)) {
      if (type === "script") {
        const script = document.createElement("script")
        script.src = resourceUrl
        script.async = true
        document.body.appendChild(script)
        console.log(`✅ Script carregado (${queryName}):`, resourceUrl)
      } else if (type === "style") {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = resourceUrl
        document.head.appendChild(link)
        console.log(`✅ CSS carregado (${queryName}):`, resourceUrl)
      }
    }
  }
}

// ========================================
// GERENCIADOR DE TEMA
// ========================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector(".theme-toggle")
    this.currentTheme = this.getPreferredTheme()

    this.init()
  }

  init() {
    // Aplicar tema inicial
    this.applyTheme(this.currentTheme)

    // Listener no botão
    this.themeToggle.addEventListener("click", () => this.toggleTheme())

    // Listener para mudanças de preferência do sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (!localStorage.getItem("theme")) {
        this.applyTheme(e.matches ? "dark" : "light")
      }
    })
  }

  getPreferredTheme() {
    const stored = localStorage.getItem("theme")
    if (stored) return stored

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  applyTheme(theme) {
    this.currentTheme = theme
    document.documentElement.setAttribute("data-theme", theme)

    // Atualizar ícone
    const icon = this.themeToggle.querySelector(".theme-icon")
    icon.textContent = theme === "dark" ? "☀️" : "🌙"

    // Salvar preferência
    localStorage.setItem("theme", theme)

    console.log(`🎨 Tema alterado para: ${theme}`)
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.applyTheme(newTheme)

    // Mostrar toast
    showToast(`Tema ${newTheme === "dark" ? "escuro" : "claro"} ativado`)
  }
}

// ========================================
// GERENCIADOR DE SIDEBAR
// ========================================

class SidebarManager {
  constructor() {
    this.sidebar = document.querySelector(".sidebar")
    this.toggle = document.querySelector(".sidebar-toggle")
    this.isOpen = false

    this.init()
  }

  init() {
    if (!this.toggle) return

    this.toggle.addEventListener("click", () => this.toggleSidebar())

    // Fechar ao clicar fora (apenas mobile)
    document.addEventListener("click", e => {
      if (window.innerWidth < 1024) {
        if (this.isOpen && !this.sidebar.contains(e.target)) {
          this.closeSidebar()
        }
      }
    })

    // Fechar com ESC
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeSidebar()
      }
    })
  }

  toggleSidebar() {
    this.isOpen ? this.closeSidebar() : this.openSidebar()
  }

  openSidebar() {
    this.sidebar.classList.add("active")
    this.isOpen = true
    document.body.style.overflow = "hidden"
  }

  closeSidebar() {
    this.sidebar.classList.remove("active")
    this.isOpen = false
    document.body.style.overflow = ""
  }
}

// ========================================
// SISTEMA DE NOTIFICAÇÕES TOAST
// ========================================

function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toastContainer")

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.style.cssText = `
    background: var(--bg-primary);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    animation: slideInRight 0.3s ease-out;
    min-width: 250px;
    border-left: 4px solid var(--color-primary);
  `

  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  }

  toast.innerHTML = `
    <span style="font-size: 1.5rem;">${icons[type]}</span>
    <span style="flex: 1;">${message}</span>
  `

  container.appendChild(toast)

  // Remover após duração
  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease-out"
    setTimeout(() => toast.remove(), 300)
  }, duration)
}

// ========================================
// MONITORAMENTO DE PERFORMANCE
// ========================================

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      resizeCount: 0,
      lastResize: null,
      orientationChanges: 0,
      themeChanges: 0,
    }

    this.init()
  }

  init() {
    // Monitorar resize
    let resizeTimeout
    window.addEventListener("resize", () => {
      this.metrics.resizeCount++
      this.metrics.lastResize = new Date().toISOString()

      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        console.log("📊 Resize finalizado:", {
          contagem: this.metrics.resizeCount,
          novasDimensões: `${window.innerWidth}×${window.innerHeight}`,
        })
      }, 500)
    })

    // Monitorar mudanças de orientação
    window.matchMedia("(orientation: portrait)").addEventListener("change", () => {
      this.metrics.orientationChanges++
      console.log("🔄 Orientação mudou. Total de mudanças:", this.metrics.orientationChanges)
    })

    // Connection API
    if ("connection" in navigator) {
      const connection = navigator.connection
      console.log("🌐 Informações de conexão:", {
        tipo: connection.effectiveType,
        downlink: connection.downlink + " Mbps",
        rtt: connection.rtt + "ms",
        economiaDeados: connection.saveData,
      })

      // Listener para mudanças de conexão
      connection.addEventListener("change", () => {
        console.log("🌐 Conexão mudou:", {
          novoTipo: connection.effectiveType,
          downlink: connection.downlink + " Mbps",
        })

        // Adaptar conteúdo baseado na conexão
        if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
          showToast("Conexão lenta detectada. Reduzindo recursos...", "warning")
        }
      })
    }
  }

  getMetrics() {
    return this.metrics
  }

  logPerformance() {
    if ("performance" in window) {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("⚡ Performance:", {
        tempoDeCarregamento: Math.round(perfData.loadEventEnd - perfData.fetchStart) + "ms",
        domInterativo: Math.round(perfData.domInteractive - perfData.fetchStart) + "ms",
        domCompleto: Math.round(perfData.domComplete - perfData.fetchStart) + "ms",
      })
    }
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Detectar recursos do dispositivo
function detectDeviceCapabilities() {
  const caps = {
    touchScreen: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    hover: window.matchMedia("(hover: hover)").matches,
    finePointer: window.matchMedia("(pointer: fine)").matches,
    retina: window.devicePixelRatio > 1,
    webGL: (() => {
      try {
        const canvas = document.createElement("canvas")
        return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      } catch (e) {
        return false
      }
    })(),
    serviceWorker: "serviceWorker" in navigator,
    notifications: "Notification" in window,
    geolocation: "geolocation" in navigator,
  }

  console.log("🔍 Capacidades do dispositivo:", caps)
  return caps
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Sistema iniciado")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // Inicializar gerenciadores
  const mqManager = new MediaQueryManager()
  const themeManager = new ThemeManager()
  const sidebarManager = new SidebarManager()
  const perfMonitor = new PerformanceMonitor()

  // Atualizar info panel inicial
  mqManager.updateInfoPanel()

  // Detectar capacidades
  const capabilities = detectDeviceCapabilities()

  // Registrar callbacks personalizados
  mqManager.on("mobile", isActive => {
    if (isActive) {
      showToast("Modo mobile ativado", "info")
    }
  })

  mqManager.on("darkMode", isActive => {
    if (isActive && !localStorage.getItem("theme")) {
      console.log("🌙 Dark mode detectado nas preferências do sistema")
    }
  })

  mqManager.on("reducedMotion", isActive => {
    if (isActive) {
      console.log("♿ Movimento reduzido preferido - desabilitando animações")
      showToast("Animações reduzidas ativadas", "info")
    }
  })

  // Listener de resize otimizado
  const handleResize = debounce(() => {
    mqManager.updateInfoPanel()
  }, 250)

  window.addEventListener("resize", handleResize)

  // Logging de performance
  window.addEventListener("load", () => {
    setTimeout(() => {
      perfMonitor.logPerformance()
    }, 0)
  })

  // Exportar para console
  window.mqManager = mqManager
  window.perfMonitor = perfMonitor
  window.showToast = showToast

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("💡 Comandos disponíveis no console:")
  console.log("   - mqManager.state: Ver estado atual das queries")
  console.log("   - mqManager.getCurrentBreakpoint(): Ver breakpoint atual")
  console.log("   - perfMonitor.getMetrics(): Ver métricas de performance")
  console.log('   - showToast("mensagem"): Mostrar notificação')
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // Adicionar animação aos cards (respeitando reduced motion)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const cards = document.querySelectorAll(".stat-card")
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`
    })
  }

  // Navegação ativa
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault()
      navItems.forEach(nav => nav.classList.remove("active"))
      item.classList.add("active")

      // Fechar sidebar no mobile após clicar
      if (window.innerWidth < 1024) {
        sidebarManager.closeSidebar()
      }
    })
  })

  // Toast de boas-vindas
  setTimeout(() => {
    showToast("Dashboard carregado com sucesso!", "success")
  }, 500)
})

// ========================================
// ADAPTIVE LOADING
// ========================================

// Carregar recursos baseado na conexão
if ("connection" in navigator) {
  const connection = navigator.connection

  if (connection.saveData) {
    console.log("💾 Modo economia de dados ativo")
    document.body.classList.add("data-saver-mode")

    // Desabilitar animações
    document.documentElement.style.setProperty("--transition-fast", "0ms")
    document.documentElement.style.setProperty("--transition-base", "0ms")
    document.documentElement.style.setProperty("--transition-slow", "0ms")
  }

  if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
    console.log("🐌 Conexão lenta detectada - otimizando recursos")

    // Remover elementos pesados
    const charts = document.querySelectorAll(".chart-placeholder")
    charts.forEach(chart => {
      chart.style.minHeight = "100px"
    })
  }
}

// ========================================
// INTERSECTION OBSERVER PARA LAZY LOADING
// ========================================

if ("IntersectionObserver" in window) {
  const observerOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animar bars no gráfico
        if (entry.target.classList.contains("chart-bars")) {
          const bars = entry.target.querySelectorAll(".bar")
          bars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.transform = "scaleY(1)"
              bar.style.opacity = "1"
            }, index * 100)
          })
        }

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observar elementos
  const observeElements = document.querySelectorAll(".stat-card, .chart-container, .chart-bars")
  observeElements.forEach(el => observer.observe(el))
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener("keydown", e => {
  // Ctrl/Cmd + K: Abrir/fechar sidebar
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    const sidebar = document.querySelector(".sidebar")
    const sidebarManager = new SidebarManager()
    if (sidebar) {
      sidebarManager.toggleSidebar()
    }
  }

  // Ctrl/Cmd + D: Toggle tema
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault()
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
      themeToggle.click()
    }
  }

  // ESC: Fechar modais/sidebar
  if (e.key === "Escape") {
    const sidebar = document.querySelector(".sidebar.active")
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
})

// ========================================
// VIEWPORT RESIZE HANDLER AVANÇADO
// ========================================

class ViewportHandler {
  constructor() {
    this.previousWidth = window.innerWidth
    this.previousHeight = window.innerHeight
    this.resizeTimer = null

    this.init()
  }

  init() {
    // Usar ResizeObserver se disponível
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(
        debounce(entries => {
          this.handleResize()
        }, 250)
      )

      resizeObserver.observe(document.body)
    } else {
      // Fallback para window.resize
      window.addEventListener(
        "resize",
        debounce(() => {
          this.handleResize()
        }, 250)
      )
    }
  }

  handleResize() {
    const currentWidth = window.innerWidth
    const currentHeight = window.innerHeight

    // Detectar tipo de mudança
    const widthChanged = currentWidth !== this.previousWidth
    const heightChanged = currentHeight !== this.previousHeight

    if (widthChanged && heightChanged) {
      console.log("📐 Viewport redimensionado (ambas dimensões)")
      this.onBothDimensionsChange()
    } else if (widthChanged) {
      console.log("📐 Largura mudou:", {
        anterior: this.previousWidth,
        nova: currentWidth,
        diferença: currentWidth - this.previousWidth,
      })
      this.onWidthChange(currentWidth, this.previousWidth)
    } else if (heightChanged) {
      console.log("📐 Altura mudou:", {
        anterior: this.previousHeight,
        nova: currentHeight,
        diferença: currentHeight - this.previousHeight,
      })
      this.onHeightChange(currentHeight, this.previousHeight)
    }

    this.previousWidth = currentWidth
    this.previousHeight = currentHeight
  }

  onWidthChange(newWidth, oldWidth) {
    // Detectar cruzamento de breakpoints
    const breakpoints = [768, 1024, 1440]

    breakpoints.forEach(bp => {
      if ((oldWidth < bp && newWidth >= bp) || (oldWidth >= bp && newWidth < bp)) {
        console.log(`🎯 Breakpoint cruzado: ${bp}px`)
        showToast(`Breakpoint ${bp}px cruzado`, "info", 2000)
      }
    })
  }

  onHeightChange(newHeight, oldHeight) {
    // Detectar teclado virtual (mobile)
    if (window.innerWidth < 768) {
      const heightDiff = oldHeight - newHeight

      if (heightDiff > 150) {
        console.log("⌨️ Teclado virtual provavelmente aberto")
        document.body.classList.add("keyboard-visible")
      } else if (heightDiff < -150) {
        console.log("⌨️ Teclado virtual provavelmente fechado")
        document.body.classList.remove("keyboard-visible")
      }
    }
  }

  onBothDimensionsChange() {
    // Provavelmente uma mudança de orientação
    const isPortrait = window.innerHeight > window.innerWidth
    console.log(`🔄 Possível mudança de orientação: ${isPortrait ? "Portrait" : "Landscape"}`)
  }
}

// Inicializar viewport handler
const viewportHandler = new ViewportHandler()

// ========================================
// MEDIA QUERY TESTING UTILITIES
// ========================================

window.MediaQueryTestUtils = {
  // Listar todas as media queries ativas
  listActiveQueries() {
    console.log("📋 Media Queries Ativas:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━")

    Object.keys(window.mqManager.queries).forEach(queryName => {
      const isActive = window.mqManager.matches(queryName)
      if (isActive) {
        console.log(`✅ ${queryName}`)
      }
    })

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━")
  },

  // Simular breakpoint (apenas visual)
  simulateBreakpoint(width, height = 800) {
    console.log(`🎭 Simulando viewport: ${width}×${height}`)
    console.log("💡 Dica: Use DevTools > Responsive Mode para simular de verdade")

    // Calcular breakpoint
    let breakpoint = "mobile"
    if (width >= 1440) breakpoint = "large-desktop"
    else if (width >= 1024) breakpoint = "desktop"
    else if (width >= 768) breakpoint = "tablet"

    console.log(`📱 Breakpoint correspondente: ${breakpoint}`)
  },

  // Testar preferências do usuário
  testUserPreferences() {
    console.log("👤 Preferências do Usuário:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(`🌙 Dark Mode: ${window.mqManager.matches("darkMode")}`)
    console.log(`☀️ Light Mode: ${window.mqManager.matches("lightMode")}`)
    console.log(`🎬 Reduced Motion: ${window.mqManager.matches("reducedMotion")}`)
    console.log(`🔍 High Contrast: ${window.mqManager.matches("highContrast")}`)
    console.log(`👁️ Reduced Transparency: ${window.mqManager.matches("reducedTransparency")}`)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━")
  },

  // Gerar relatório completo
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
      },
      breakpoint: window.mqManager.getCurrentBreakpoint(),
      orientation: window.mqManager.matches("portrait") ? "portrait" : "landscape",
      devicePixelRatio: window.devicePixelRatio,
      preferences: {
        colorScheme: window.mqManager.matches("darkMode") ? "dark" : "light",
        reducedMotion: window.mqManager.matches("reducedMotion"),
        highContrast: window.mqManager.matches("highContrast"),
      },
      capabilities: {
        hover: window.mqManager.matches("hover"),
        pointerType: window.mqManager.matches("finePointer") ? "fine" : "coarse",
        touchScreen: "ontouchstart" in window,
      },
      performance: window.perfMonitor.getMetrics(),
    }

    console.log("📊 RELATÓRIO COMPLETO:")
    console.table(report)

    return report
  },
}

// ========================================
// ANIMAÇÕES ADAPTATIVAS
// ========================================

class AdaptiveAnimations {
  constructor() {
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    this.init()
  }

  init() {
    if (this.prefersReducedMotion) {
      console.log("♿ Animações desabilitadas (reduced motion)")
      document.documentElement.style.setProperty("--transition-fast", "0ms")
      document.documentElement.style.setProperty("--transition-base", "0ms")
      document.documentElement.style.setProperty("--transition-slow", "0ms")
    }

    // Listener para mudanças
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", e => {
      this.prefersReducedMotion = e.matches

      if (e.matches) {
        console.log("♿ Animações desabilitadas")
        this.disableAnimations()
      } else {
        console.log("✨ Animações habilitadas")
        this.enableAnimations()
      }
    })
  }

  disableAnimations() {
    document.documentElement.style.setProperty("--transition-fast", "0ms")
    document.documentElement.style.setProperty("--transition-base", "0ms")
    document.documentElement.style.setProperty("--transition-slow", "0ms")

    // Remover classes de animação
    document.querySelectorAll('[class*="animate"]').forEach(el => {
      el.style.animation = "none"
    })
  }

  enableAnimations() {
    document.documentElement.style.setProperty("--transition-fast", "150ms")
    document.documentElement.style.setProperty("--transition-base", "250ms")
    document.documentElement.style.setProperty("--transition-slow", "350ms")
  }

  // Animação segura (respeita preferências)
  safeAnimate(element, keyframes, options) {
    if (this.prefersReducedMotion) {
      // Aplicar estado final imediatamente
      if (keyframes && keyframes.length > 0) {
        const finalState = keyframes[keyframes.length - 1]
        Object.assign(element.style, finalState)
      }
      return null
    }

    return element.animate(keyframes, options)
  }
}

// Inicializar animações adaptativas
const adaptiveAnimations = new AdaptiveAnimations()
window.adaptiveAnimations = adaptiveAnimations

// ========================================
// EXPORTAÇÕES GLOBAIS
// ========================================

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("🎉 Sistema totalmente carregado!")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("📚 Utilitários disponíveis:")
console.log("   • MediaQueryTestUtils.listActiveQueries()")
console.log("   • MediaQueryTestUtils.testUserPreferences()")
console.log("   • MediaQueryTestUtils.generateReport()")
console.log("   • MediaQueryTestUtils.simulateBreakpoint(width)")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
