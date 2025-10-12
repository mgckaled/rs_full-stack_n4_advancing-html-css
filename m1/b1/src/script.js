// Ativar botão de scroll quando scroll > 200px
const scrollToTopBtn = document.getElementById("scrollToTop")
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.classList.add("show")
  } else {
    scrollToTopBtn.classList.remove("show")
  }
})

// Scroll suave ao clicar
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// Navegação ativa baseada no scroll
const navLinks = document.querySelectorAll("nav a")
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")
  sections.forEach(section => {
    const sectionTop = section.offsetTop
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach(link => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})
