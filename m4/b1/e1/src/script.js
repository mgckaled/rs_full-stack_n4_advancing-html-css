// ========================================
// DETECÇÃO E MONITORAMENTO DE MEDIA QUERIES
// ========================================

// Função para detectar o breakpoint atual
function getCurrentBreakpoint() {
  const width = window.innerWidth

  if (width < 600) return "mobile"
  if (width >= 600 && width < 900) return "tablet"
  if (width >= 900 && width < 1200) return "desktop"
  return "large-desktop"
}

// Função para logar informações sobre a viewport
function logViewportInfo() {
  const info = {
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: getCurrentBreakpoint(),
    orientation: window.innerWidth > window.innerHeight ? "landscape" : "portrait",
    devicePixelRatio: window.devicePixelRatio,
    timestamp: new Date().toLocaleTimeString(),
  }

  console.log("📊 Viewport Info:", info)
}

// ========================================
// LISTENERS COM MATCHMEDIA
// ========================================

// Definir as media queries que queremos monitorar
const mediaQueries = {
  mobile: window.matchMedia("(max-width: 599px)"),
  tablet: window.matchMedia("(min-width: 600px) and (max-width: 899px)"),
  desktop: window.matchMedia("(min-width: 900px) and (max-width: 1199px)"),
  largeDesktop: window.matchMedia("(min-width: 1200px)"),
  darkMode: window.matchMedia("(prefers-color-scheme: dark)"),
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
  landscape: window.matchMedia("(orientation: landscape)"),
  portrait: window.matchMedia("(orientation: portrait)"),
}

// Handler para mudanças de breakpoint
function handleBreakpointChange(mq, breakpointName) {
  if (mq.matches) {
    console.log(`✅ Breakpoint ativo: ${breakpointName}`)

    // Você pode executar código específico para cada breakpoint
    switch (breakpointName) {
      case "mobile":
        console.log("🔧 Configurações mobile ativadas")
        // Ex: Carregar menu hamburguer
        break
      case "tablet":
        console.log("🔧 Configurações tablet ativadas")
        // Ex: Ajustar grid
        break
      case "desktop":
        console.log("🔧 Configurações desktop ativadas")
        // Ex: Mostrar sidebar
        break
      case "largeDesktop":
        console.log("🔧 Configurações large desktop ativadas")
        // Ex: Mostrar conteúdo extra
        break
    }
  }
}

// Handler para preferências do usuário
function handleUserPreferences(mq, preferenceName) {
  if (mq.matches) {
    console.log(`⚙️ Preferência detectada: ${preferenceName}`)

    switch (preferenceName) {
      case "darkMode":
        console.log("🌙 Modo escuro ativado")
        document.body.classList.add("dark-mode-detected")
        break
      case "reducedMotion":
        console.log("🎬 Movimento reduzido preferido")
        document.body.classList.add("reduced-motion")
        break
    }
  } else {
    // Remover classes quando a preferência não está ativa
    if (preferenceName === "darkMode") {
      document.body.classList.remove("dark-mode-detected")
    }
    if (preferenceName === "reducedMotion") {
      document.body.classList.remove("reduced-motion")
    }
  }
}

// Registrar listeners para breakpoints
Object.keys(mediaQueries).forEach(key => {
  const mq = mediaQueries[key]

  // Handler inicial
  if (["mobile", "tablet", "desktop", "largeDesktop"].includes(key)) {
    handleBreakpointChange(mq, key)
  } else if (["darkMode", "reducedMotion"].includes(key)) {
    handleUserPreferences(mq, key)
  }

  // Listener para mudanças
  mq.addEventListener("change", e => {
    if (["mobile", "tablet", "desktop", "largeDesktop"].includes(key)) {
      handleBreakpointChange(e, key)
    } else if (["darkMode", "reducedMotion"].includes(key)) {
      handleUserPreferences(e, key)
    }
  })
})

// ========================================
// DETECÇÃO DE ORIENTAÇÃO
// ========================================

function handleOrientationChange() {
  const orientation = mediaQueries.portrait.matches ? "portrait" : "landscape"
  console.log(`📱 Orientação mudou para: ${orientation}`)

  // Atualizar atributo data no body para uso no CSS
  document.body.setAttribute("data-orientation", orientation)
}

// Listener inicial
handleOrientationChange()

// Listener para mudanças
mediaQueries.portrait.addEventListener("change", handleOrientationChange)
mediaQueries.landscape.addEventListener("change", handleOrientationChange)

// ========================================
// RESIZE DEBOUNCE
// ========================================

// Função debounce para evitar chamadas excessivas
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

// Handler otimizado para resize
const handleResize = debounce(() => {
  logViewportInfo()
}, 250)

// Adicionar listener de resize
window.addEventListener("resize", handleResize)

// ========================================
// FUNCIONALIDADES ESPECÍFICAS POR DISPOSITIVO
// ========================================

// Detectar capacidade de hover
const hasHover = window.matchMedia("(hover: hover)").matches
console.log(`🖱️ Suporte a hover: ${hasHover ? "Sim (mouse)" : "Não (touch)"}`)

if (!hasHover) {
  // Dispositivo touch - adicionar classe para estilização específica
  document.body.classList.add("touch-device")
  console.log("👆 Dispositivo touch detectado")
}

// Detectar tipo de ponteiro
const pointerQuery = window.matchMedia("(pointer: coarse)")
if (pointerQuery.matches) {
  console.log("👆 Ponteiro grosso (touch) detectado - aumentar áreas de toque")
  document.body.classList.add("coarse-pointer")
}

// ========================================
// UTILITÁRIO: CARREGAR RECURSOS CONDICIONALMENTE
// ========================================

function loadResourceForBreakpoint(breakpoint, resourceUrl, resourceType = "script") {
  const currentBreakpoint = getCurrentBreakpoint()

  if (currentBreakpoint === breakpoint) {
    if (resourceType === "script") {
      const script = document.createElement("script")
      script.src = resourceUrl
      document.body.appendChild(script)
      console.log(`📦 Script carregado: ${resourceUrl}`)
    } else if (resourceType === "style") {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = resourceUrl
      document.head.appendChild(link)
      console.log(`🎨 CSS carregado: ${resourceUrl}`)
    }
  }
}

// Exemplo de uso:
// loadResourceForBreakpoint('desktop', 'desktop-features.js', 'script');

// ========================================
// INFORMAÇÕES DE PERFORMANCE
// ========================================

function logPerformanceMetrics() {
  if ("connection" in navigator) {
    const connection = navigator.connection
    console.log("🌐 Informações de conexão:", {
      effectiveType: connection.effectiveType, // '4g', '3g', etc.
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // Round-trip time
      saveData: connection.saveData, // Modo economia de dados
    })

    // Adaptar conteúdo baseado na conexão
    if (connection.saveData) {
      console.log("💾 Modo economia de dados ativo - reduzir uso de dados")
      document.body.classList.add("save-data-mode")
    }
  }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Sistema de Media Queries inicializado")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // Log inicial
  logViewportInfo()
  logPerformanceMetrics()

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.log("💡 Dicas:")
  console.log("   - Redimensione a janela para ver as mudanças")
  console.log("   - Abra o DevTools > Rendering para emular preferências")
  console.log("   - Use Ctrl/Cmd + Shift + M para modo responsivo")
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  // Adicionar informação visual sobre JavaScript ativo
  const infoBox = document.querySelector(".info-box")
  if (infoBox) {
    const jsInfo = document.createElement("p")
    jsInfo.innerHTML =
      "<strong>🟢 JavaScript ativo:</strong> As media queries estão sendo monitoradas. Abra o Console para ver os logs em tempo real."
    jsInfo.style.marginTop = "20px"
    jsInfo.style.padding = "15px"
    jsInfo.style.background = "#e8f5e9"
    jsInfo.style.borderRadius = "8px"
    jsInfo.style.borderLeft = "4px solid #4caf50"
    infoBox.appendChild(jsInfo)
  }
})

// ========================================
// EXPORT PARA USO EXTERNO (se necessário)
// ========================================

window.MediaQueryUtils = {
  getCurrentBreakpoint,
  logViewportInfo,
  mediaQueries,
  loadResourceForBreakpoint,
}
