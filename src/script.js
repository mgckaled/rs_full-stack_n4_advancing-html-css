// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

const savedTheme = localStorage.getItem("theme") || "dark"
html.setAttribute("data-theme", savedTheme)
updateThemeIcon(savedTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  // Limpa o conteúdo do botão
  themeToggle.innerHTML = ""

  // Cria o elemento i com o ícone correto
  const icon = document.createElement("i")
  icon.setAttribute("data-lucide", theme === "light" ? "moon" : "sun")

  // Adiciona ao botão
  themeToggle.appendChild(icon)

  // Re-renderiza os ícones Lucide
  lucide.createIcons()
}

// Preview Modal
function openPreview(url, title) {
  const modal = document.getElementById("previewModal")
  const iframe = document.getElementById("previewFrame")
  const modalTitle = document.getElementById("modalTitle")
  const openNewTab = document.getElementById("openNewTab")

  iframe.src = url
  modalTitle.textContent = title
  openNewTab.href = url
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closePreview() {
  const modal = document.getElementById("previewModal")
  const iframe = document.getElementById("previewFrame")

  modal.classList.remove("active")
  iframe.src = ""
  document.body.style.overflow = ""
}

// Close modal on overlay click
document.getElementById("previewModal").addEventListener("click", e => {
  if (e.target.id === "previewModal") {
    closePreview()
  }
})

// Close modal on ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closePreview()
  }
})
