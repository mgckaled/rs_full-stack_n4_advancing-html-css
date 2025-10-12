// ============================================
// TEMA ESCURO/CLARO
// ============================================
const themeToggle = document.getElementById("themeToggle")
const htmlElement = document.documentElement

// Verificar tema salvo ou preferência do sistema
const savedTheme = localStorage.getItem("theme") || "light"
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme")
  themeToggle.textContent = "☀️"
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme")
  const isDark = document.body.classList.contains("dark-theme")
  themeToggle.textContent = isDark ? "☀️" : "🌙"
  localStorage.setItem("theme", isDark ? "dark" : "light")
})

// ============================================
// NAVEGAÇÃO E SEÇÕES
// ============================================
const navItems = document.querySelectorAll(".nav-item")
const contentSections = document.querySelectorAll(".content-section")

navItems.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault()

    // Remover active de todos
    navItems.forEach(nav => nav.classList.remove("active"))
    contentSections.forEach(section => (section.style.display = "none"))

    // Adicionar active e mostrar seção
    item.classList.add("active")
    const sectionId = item.getAttribute("data-section")
    const section = document.getElementById(sectionId)
    if (section) {
      section.style.display = "grid"
    }
  })
})

// ============================================
// FILTROS
// ============================================
const applyFiltersBtn = document.getElementById("applyFilters")
const dateFilter = document.getElementById("dateFilter")
const categoryFilter = document.getElementById("categoryFilter")

applyFiltersBtn.addEventListener("click", () => {
  const selectedDate = dateFilter.value
  const selectedCategory = categoryFilter.value

  console.log("Filtros aplicados:")
  console.log("Data:", selectedDate || "Sem filtro de data")
  console.log("Categoria:", selectedCategory || "Todas as categorias")

  // Simular atualização de dados
  updateStatsCards(selectedCategory)
})

// ============================================
// ATUALIZAR STATS CARDS BASEADO EM FILTRO
// ============================================
function updateStatsCards(category) {
  const statValues = {
    sales: ["R$ 185.2K", "3,847", "1,580", "4.9/5.0"],
    marketing: ["R$ 95.6K", "1,234", "892", "4.5/5.0"],
    operations: ["R$ 65.3K", "543", "678", "4.2/5.0"],
    "": ["R$ 125.4K", "2,543", "1,205", "4.8/5.0"],
  }

  const values = statValues[category] || statValues[""]
  const statCards = document.querySelectorAll(".stat-value")

  statCards.forEach((card, index) => {
    if (values[index]) {
      card.textContent = values[index]
      card.style.opacity = "0.5"
      setTimeout(() => {
        card.style.opacity = "1"
      }, 100)
    }
  })
}

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease-out"
    }
  })
}, observerOptions)

// Observar cards
document.querySelectorAll(".stat-card, .chart-card, .insight-card, .product-card").forEach(card => {
  observer.observe(card)
})

// ============================================
// ANIMAÇÃO CSS (adicionar via JavaScript)
// ============================================
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)

// ============================================
// RESPONSIVIDADE DINÂMICA
// ============================================
function handleResize() {
  const width = window.innerWidth
  const dashboardGrid = document.querySelector(".dashboard-grid")

  if (width > 1024) {
    // Desktop: 6 colunas
    dashboardGrid.style.gridTemplateColumns = "repeat(6, 1fr)"
  } else if (width > 768) {
    // Tablet: 4 colunas
    dashboardGrid.style.gridTemplateColumns = "repeat(4, 1fr)"
  } else {
    // Mobile: 1 coluna
    dashboardGrid.style.gridTemplateColumns = "1fr"
  }
}

window.addEventListener("resize", handleResize)
handleResize() // Chamar na inicialização

// ============================================
// INTERATIVIDADE DOS INSIGHT CARDS
// ============================================
const insightCards = document.querySelectorAll(".insight-card")

insightCards.forEach(card => {
  card.addEventListener("click", () => {
    const barFill = card.querySelector(".bar-fill")
    const currentWidth = parseInt(barFill.style.width)
    const newWidth = (currentWidth + 10) % 100 || 10

    barFill.style.width = newWidth + "%"
  })
})

// ============================================
// SIMULAÇÃO DE DADOS EM TEMPO REAL
// ============================================
function updateRealtimeData() {
  const statValues = document.querySelectorAll(".stat-value")

  setInterval(() => {
    // Simular pequenas flutuações
    statValues.forEach((value, index) => {
      if (index === 0) {
        // Receita
        const current = parseFloat(value.textContent.replace("R$ ", "").replace("K", ""))
        const variation = (Math.random() - 0.5) * 5
        value.textContent = "R$ " + (current + variation).toFixed(1) + "K"
      } else if (index === 1) {
        // Pedidos
        const current = parseInt(value.textContent.replace(/,/g, ""))
        const variation = Math.floor((Math.random() - 0.5) * 50)
        value.textContent = (current + variation).toLocaleString("pt-BR")
      }
    })
  }, 5000)
}

// Descomentar para ativar atualização em tempo real
// updateRealtimeData();

// ============================================
// DEMONSTRAÇÃO DE GRID CONCEPTS
// ============================================
console.log("%c=== CSS GRID CONCEPTS DEMONSTRADOS ===", "color: #6366f1; font-weight: bold; font-size: 14px;")
console.log("%c1. Grid Template Areas:", "color: #ec4899; font-weight: bold;")
console.log("   - Layout principal usa grid-template-areas com notação visual")
console.log("   - Header, Sidebar, Content, Footer organizados em áreas")

console.log("%c2. Grid Template Columns/Rows:", "color: #ec4899; font-weight: bold;")
console.log("   - Shorthand: grid-template com linhas, colunas e áreas")
console.log("   - Dashboard grid: 6 colunas em desktop")

console.log("%c3. Grid Column/Row:", "color: #ec4899; font-weight: bold;")
console.log("   - Chart-main ocupa 4 colunas (grid-area: chart-main)")
console.log("   - Chart-table ocupa todas as 6 colunas")

console.log("%c4. Gap:", "color: #ec4899; font-weight: bold;")
console.log("   - Espaçamento consistente entre todos os items")
console.log("   - Responsivo: gap aumenta/diminui com tamanho da tela")

console.log("%c5. Grid Auto Rows:", "color: #ec4899; font-weight: bold;")
console.log("   - Responsive-grid usa repeat(auto-fit, minmax(150px, 1fr))")
console.log("   - Cria colunas automaticamente baseado no espaço disponível")

console.log("%c6. Alinhamentos:", "color: #ec4899; font-weight: bold;")
console.log("   - justify-items/align-items em insight cards")
console.log("   - justify-content/align-content para distribuição no grid")

console.log("%c7. Grid vs Flexbox:", "color: #ec4899; font-weight: bold;")
console.log("   - Grid: layout principal (2D)")
console.log("   - Flexbox: componentes internos (sidebar nav, header items)")

// ============================================
// TOOLTIP INFORMATIVO
// ============================================
document.querySelectorAll("[title]").forEach(element => {
  element.addEventListener("mouseenter", function () {
    const tooltip = document.createElement("div")
    tooltip.textContent = this.getAttribute("title")
    tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            white-space: nowrap;
        `
    document.body.appendChild(tooltip)

    this.addEventListener("mouseleave", () => tooltip.remove())
  })
})
