// ============================================
// COLOR MIXER FUNCTIONALITY
// ============================================
const color1Input = document.getElementById("color1")
const color2Input = document.getElementById("color2")
const mixAmountInput = document.getElementById("mix-amount")
const mixerResult = document.getElementById("mixer-result")
const color1Value = document.getElementById("color1-value")
const color2Value = document.getElementById("color2-value")
const mixValue = document.getElementById("mix-value")

function updateColorMixer() {
  const h1 = color1Input.value
  const h2 = color2Input.value
  const mixAmount = mixAmountInput.value

  color1Value.textContent = `${h1}°`
  color2Value.textContent = `${h2}°`
  mixValue.textContent = `${mixAmount}%`

  const color1 = `hsl(${h1} 80% 60%)`
  const color2 = `hsl(${h2} 70% 55%)`

  // Simula color-mix() usando gradiente linear
  const gradient = `linear-gradient(90deg, ${color1} 0%, ${color1} ${mixAmount}%, ${color2} ${mixAmount}%, ${color2} 100%)`

  // Para navegadores com suporte a color-mix()
  if (CSS.supports("background", "color-mix(in srgb, red, blue)")) {
    // Calcula cor misturada aproximada
    const h1Rad = (h1 * Math.PI) / 180
    const h2Rad = (h2 * Math.PI) / 180
    const mix = mixAmount / 100

    const hMixed = Math.round(parseFloat(h1) * mix + parseFloat(h2) * (1 - mix))
    mixerResult.style.background = `hsl(${hMixed} 75% 57.5%)`
  } else {
    mixerResult.style.background = gradient
  }

  mixerResult.textContent = `Mixed: ${Math.round(
    parseFloat(h1) * (mixAmount / 100) + parseFloat(h2) * (1 - mixAmount / 100)
  )}°`
}

color1Input.addEventListener("input", updateColorMixer)
color2Input.addEventListener("input", updateColorMixer)
mixAmountInput.addEventListener("input", updateColorMixer)

// Initialize
updateColorMixer()

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el)
})

// ============================================
// FEATURE CARDS MOUSE TRACKING
// ============================================
const featureCards = document.querySelectorAll(".feature-card")

featureCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    card.style.setProperty("--mouse-x", `${x}%`)
    card.style.setProperty("--mouse-y", `${y}%`)
  })

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--mouse-x", "50%")
    card.style.setProperty("--mouse-y", "50%")
  })
})

// ============================================
// CUBE INTERACTION
// ============================================
const cube = document.querySelector(".cube")
let isPaused = false

if (cube) {
  cube.addEventListener("click", () => {
    isPaused = !isPaused
    if (isPaused) {
      cube.style.animationPlayState = "paused"
    } else {
      cube.style.animationPlayState = "running"
    }
  })
}

// ============================================
// TRANSFORM ITEMS INTERACTION
// ============================================
const transformItems = document.querySelectorAll(".transform-item")

transformItems.forEach(item => {
  item.addEventListener("click", () => {
    item.style.transform = ""
    setTimeout(() => {
      item.style.transform = null
    }, 10)
  })
})

// ============================================
// GRADIENT BOXES INTERACTION
// ============================================
const gradientBoxes = document.querySelectorAll(".gradient-box")

gradientBoxes.forEach(box => {
  box.addEventListener("click", () => {
    const currentTransform = window.getComputedStyle(box).transform
    box.style.transform = currentTransform === "none" ? "scale(0.95)" : "none"
    setTimeout(() => {
      box.style.transform = ""
    }, 200)
  })
})

// ============================================
// SHAPE ITEMS CLICK TO RANDOMIZE
// ============================================
const shapeItems = document.querySelectorAll(".shape-item")

shapeItems.forEach(item => {
  item.addEventListener("click", () => {
    const randomHue = Math.floor(Math.random() * 360)
    item.style.background = `linear-gradient(
          ${Math.random() * 360}deg,
          hsl(${randomHue} ${60 + Math.random() * 40}% ${40 + Math.random() * 30}%),
          hsl(${(randomHue + 60) % 360} ${60 + Math.random() * 40}% ${40 + Math.random() * 30}%)
        )`
  })
})

// ============================================
// FILTER ITEMS INTERACTION
// ============================================
const filterItems = document.querySelectorAll(".filter-item")

filterItems.forEach(item => {
  item.addEventListener("click", () => {
    const isActive = item.style.filter !== ""
    filterItems.forEach(i => (i.style.filter = ""))

    if (!isActive) {
      if (item.classList.contains("filter-blur")) {
        item.style.filter = "blur(8px)"
      } else if (item.classList.contains("filter-brightness")) {
        item.style.filter = "brightness(1.5)"
      } else if (item.classList.contains("filter-contrast")) {
        item.style.filter = "contrast(2)"
      } else if (item.classList.contains("filter-grayscale")) {
        item.style.filter = "grayscale(100%)"
      } else if (item.classList.contains("filter-hue")) {
        item.style.filter = "hue-rotate(180deg)"
      } else if (item.classList.contains("filter-saturate")) {
        item.style.filter = "saturate(3)"
      } else if (item.classList.contains("filter-invert")) {
        item.style.filter = "invert(1)"
      } else if (item.classList.contains("filter-sepia")) {
        item.style.filter = "sepia(100%)"
      } else if (item.classList.contains("filter-drop-shadow")) {
        item.style.filter = "drop-shadow(0 10px 20px rgba(138, 43, 226, 0.8))"
      } else if (item.classList.contains("filter-combined")) {
        item.style.filter = "contrast(1.5) brightness(1.2) saturate(1.5) hue-rotate(45deg)"
      }
    }
  })
})

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
let ticking = false

function updateParallax() {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
    heroContent.style.opacity = Math.max(0, 1 - scrolled / 600)
  }

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax)
    ticking = true
  }
})

// ============================================
// DYNAMIC VIEWPORT HEIGHT FIX
// ============================================
function setVH() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
}

setVH()
window.addEventListener("resize", setVH)

// ============================================
// PERFORMANCE MONITORING
// ============================================
if ("PerformanceObserver" in window) {
  const perfObserver = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn("Long task detected:", entry)
      }
    }
  })

  try {
    perfObserver.observe({ entryTypes: ["longtask"] })
  } catch (e) {
    // longtask não suportado
  }
}

// ============================================
// SMOOTH SCROLL POLYFILL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ============================================
// INITIAL ANIMATION TRIGGER
// ============================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1"

  // Trigger first section animations
  const firstSection = document.querySelector(".hero")
  if (firstSection) {
    firstSection.querySelectorAll(".fade-in").forEach(el => {
      el.classList.add("visible")
    })
  }
})

// ============================================
// ACCESSIBILITY: Keyboard Navigation
// ============================================
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    // Reset all active states
    filterItems.forEach(i => (i.style.filter = ""))
    if (cube) cube.style.animationPlayState = "running"
  }
})

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
  "%cCSS Functions Gallery",
  "font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #8a2be2, #00bfff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
)
console.log("%cExplore the power of modern CSS!", "font-size: 14px; color: #8a2be2;")
console.log(
  "Functions used: calc(), clamp(), min(), max(), color-mix(), hsl(), linear-gradient(), radial-gradient(), conic-gradient(), clip-path(), filter(), transform(), backdrop-filter(), var(), and many more!"
)
