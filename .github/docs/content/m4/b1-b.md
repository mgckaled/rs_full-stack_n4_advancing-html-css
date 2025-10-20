<!-- markdownlint-disable MD024 -->

# Casos de Uso Práticos - Media Queries

## Índice

- [Casos de Uso Práticos - Media Queries](#casos-de-uso-práticos---media-queries)
  - [Índice](#índice)
  - [1. Menu Hambúrguer Responsivo](#1-menu-hambúrguer-responsivo)
    - [CSS](#css)
    - [JavaScript](#javascript)
  - [2. Grid Adaptativo com `auto-fit`](#2-grid-adaptativo-com-auto-fit)
    - [CSS - Abordagem Moderna](#css---abordagem-moderna)
  - [3. Tipografia Fluida](#3-tipografia-fluida)
    - [CSS - Usando `clamp()`](#css---usando-clamp)
  - [4. Imagens Responsivas](#4-imagens-responsivas)
    - [HTML](#html)
    - [CSS - Background Images](#css---background-images)
  - [5. Dark Mode Automático](#5-dark-mode-automático)
    - [CSS](#css-1)
    - [JavaScript - Toggle Manual](#javascript---toggle-manual)
  - [6. Tabelas Responsivas](#6-tabelas-responsivas)
    - [CSS - Abordagem Card](#css---abordagem-card)
    - [HTML](#html-1)
  - [7. Cards Adaptativos](#7-cards-adaptativos)
    - [CSS](#css-2)
  - [8. Layout de Dashboard](#8-layout-de-dashboard)
    - [CSS](#css-3)
  - [9. Formulários Responsivos](#9-formulários-responsivos)
    - [CSS](#css-4)
  - [10. Animações Condicionais](#10-animações-condicionais)
    - [CSS](#css-5)

---

## 1. Menu Hambúrguer Responsivo

### CSS

```css
/* Base: Mobile - Menu em coluna */
.nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
  z-index: 1000;
}

.nav.active {
  left: 0;
}

.hamburger {
  display: block;
  cursor: pointer;
}

/* Desktop: Menu horizontal normal */
@media (min-width: 768px) {
  .nav {
    position: static;
    flex-direction: row;
    width: auto;
    height: auto;
    background: transparent;
  }
  
  .hamburger {
    display: none;
  }
}
```

### JavaScript

```javascript
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Fechar ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove('active');
  }
});
```

---

## 2. Grid Adaptativo com `auto-fit`

### CSS - Abordagem Moderna

```css
/* Grid que se adapta automaticamente */
.gallery {
  display: grid;
  gap: 20px;
  
  /* Auto-fit: cria quantas colunas couberem */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* Ajuste fino para mobile */
@media (max-width: 600px) {
  .gallery {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* Tablets: força 2 colunas */
@media (min-width: 600px) and (max-width: 900px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3-4 colunas baseado no espaço */
@media (min-width: 900px) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

---

## 3. Tipografia Fluida

### CSS - Usando `clamp()`

```css
/* Tipografia que escala suavemente */
:root {
  /* Escala entre mobile e desktop */
  --font-size-h1: clamp(2rem, 5vw, 4rem);
  --font-size-h2: clamp(1.5rem, 4vw, 3rem);
  --font-size-body: clamp(1rem, 2vw, 1.125rem);
}

h1 {
  font-size: var(--font-size-h1);
}

/* Alternativa com media queries */
body {
  font-size: 16px;
  line-height: 1.5;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
    line-height: 1.6;
  }
}

@media (min-width: 1200px) {
  body {
    font-size: 20px;
    line-height: 1.7;
  }
}
```

---

## 4. Imagens Responsivas

### HTML

```html
<picture>
  <!-- Large screens: imagem grande -->
  <source 
    media="(min-width: 1200px)" 
    srcset="image-large.webp">
  
  <!-- Tablets: imagem média -->
  <source 
    media="(min-width: 768px)" 
    srcset="image-medium.webp">
  
  <!-- Mobile: imagem pequena -->
  <img 
    src="image-small.webp" 
    alt="Responsive image"
    loading="lazy">
</picture>
```

### CSS - Background Images

```css
.hero {
  background-image: url('hero-small.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-medium.jpg');
    height: 500px;
  }
}

@media (min-width: 1200px) {
  .hero {
    background-image: url('hero-large.jpg');
    height: 700px;
  }
}

/* Retina/HiDPI */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .hero {
    background-image: url('hero-large@2x.jpg');
  }
}
```

---

## 5. Dark Mode Automático

### CSS

```css
:root {
  /* Light theme (padrão) */
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #dddddd;
  --link-color: #0066cc;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --border-color: #444444;
    --link-color: #66b3ff;
  }
}

/* Uso das variáveis */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

a {
  color: var(--link-color);
}
```

### JavaScript - Toggle Manual

```javascript
class ThemeToggle {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'auto';
    this.applyTheme();
  }
  
  applyTheme() {
    if (this.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (this.theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Auto: respeitar preferência do sistema
      document.documentElement.removeAttribute('data-theme');
    }
  }
  
  toggle() {
    const themes = ['light', 'dark', 'auto'];
    const current = themes.indexOf(this.theme);
    this.theme = themes[(current + 1) % themes.length];
    
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }
}
```

---

## 6. Tabelas Responsivas

### CSS - Abordagem Card

```css
/* Desktop: tabela normal */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Mobile: converte para cards */
@media (max-width: 768px) {
  .data-table thead {
    display: none;
  }
  
  .data-table tbody tr {
    display: block;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background: white;
  }
  
  .data-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .data-table tbody td:last-child {
    border-bottom: none;
  }
  
  /* Adiciona labels via CSS */
  .data-table tbody td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #666;
  }
}
```

### HTML

```html
<table class="data-table">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Nome">João Silva</td>
      <td data-label="Email">joao@email.com</td>
      <td data-label="Status">Ativo</td>
    </tr>
  </tbody>
</table>
```

---

## 7. Cards Adaptativos

### CSS

```css
.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  /* Mobile: layout vertical */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Tablet: layout horizontal */
@media (min-width: 600px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
  
  .card-image {
    width: 200px;
    height: 150px;
    flex-shrink: 0;
  }
}

/* Desktop: hover effects */
@media (min-width: 1024px) and (hover: hover) {
  .card {
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }
}

/* Touch devices: sem hover */
@media (hover: none) {
  .card:active {
    transform: scale(0.98);
  }
}
```

---

## 8. Layout de Dashboard

### CSS

```css
.dashboard {
  display: grid;
  gap: 20px;
  padding: 20px;
}

/* Mobile: 1 coluna */
@media (max-width: 767px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .dashboard-sidebar {
    order: 2; /* Sidebar vai para baixo */
  }
  
  .dashboard-main {
    order: 1;
  }
}

/* Tablet: 2 colunas */
@media (min-width: 768px) and (max-width: 1023px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .dashboard-header {
    grid-column: 1 / -1; /* Span full width */
  }
}

/* Desktop: layout complexo */
@media (min-width: 1024px) {
  .dashboard {
    grid-template-columns: 250px 1fr 300px;
    grid-template-areas:
      "sidebar header header"
      "sidebar main   aside"
      "sidebar main   aside";
  }
  
  .dashboard-sidebar { grid-area: sidebar; }
  .dashboard-header { grid-area: header; }
  .dashboard-main { grid-area: main; }
  .dashboard-aside { grid-area: aside; }
}
```

---

## 9. Formulários Responsivos

### CSS

```css
.form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  font-size: 14px;
}

.form-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px; /* Previne zoom no iOS */
}

/* Mobile: campos ocupam largura total */
@media (max-width: 767px) {
  .form {
    grid-template-columns: 1fr;
  }
  
  .form-button {
    width: 100%;
    min-height: 48px; /* Área de toque adequada */
  }
}

/* Tablet: 2 colunas para alguns campos */
@media (min-width: 768px) {
  .form {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-group.full-width {
    grid-column: 1 / -1;
  }
}

/* Desktop: melhor espaçamento */
@media (min-width: 1024px) {
  .form {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .form-input:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
}

/* Touch devices: aumentar áreas de toque */
@media (pointer: coarse) {
  .form-input,
  .form-button {
    min-height: 44px;
    font-size: 16px;
  }
}
```

---

## 10. Animações Condicionais

### CSS

```css
/* Animações padrão */
.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: scale(1.05);
}

/* Desabilitar animações para quem prefere */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .button:hover {
    transform: none;
  }
```
