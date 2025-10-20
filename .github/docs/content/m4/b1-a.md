# Guia Completo: CSS Media Queries

> [Voltar](../../../../m4/README.md) a página anterio

## Índice

- [Guia Completo: CSS Media Queries](#guia-completo-css-media-queries)
  - [Índice](#índice)
  - [Conceito e Introdução](#conceito-e-introdução)
    - [O que são Media Queries?](#o-que-são-media-queries)
    - [Por que são importantes?](#por-que-são-importantes)
    - [Analogia](#analogia)
  - [Sintaxe Fundamental](#sintaxe-fundamental)
    - [Estrutura Básica](#estrutura-básica)
    - [Exemplo Mais Simples](#exemplo-mais-simples)
    - [Como Ler uma Media Query](#como-ler-uma-media-query)
  - [Anatomia de uma Media Query](#anatomia-de-uma-media-query)
    - [Componentes](#componentes)
  - [Evolução Histórica](#evolução-histórica)
    - [CSS2 (1998) - Media Types](#css2-1998---media-types)
    - [CSS3 Media Queries (2012) - Revolução](#css3-media-queries-2012---revolução)
    - [Media Queries Level 4 (2017-presente)](#media-queries-level-4-2017-presente)
    - [Media Queries Level 5 (Em desenvolvimento)](#media-queries-level-5-em-desenvolvimento)
  - [Tipos de Mídia](#tipos-de-mídia)
    - [Tipos Principais](#tipos-principais)
    - [Tipos Obsoletos (evitar)](#tipos-obsoletos-evitar)
    - [Exemplos Práticos](#exemplos-práticos)
  - [Media Features Essenciais](#media-features-essenciais)
    - [1. Dimensões da Viewport](#1-dimensões-da-viewport)
      - [`width` (Largura)](#width-largura)
      - [`height` (Altura)](#height-altura)
    - [2. Orientação](#2-orientação)
    - [3. Aspect Ratio (Proporção)](#3-aspect-ratio-proporção)
    - [4. Resolution (Resolução/DPI)](#4-resolution-resoluçãodpi)
    - [5. Preferências do Usuário (Level 4)](#5-preferências-do-usuário-level-4)
      - [Modo Escuro](#modo-escuro)
      - [Movimento Reduzido](#movimento-reduzido)
      - [Contraste](#contraste)
    - [6. Capacidades de Interação (Level 4)](#6-capacidades-de-interação-level-4)
      - [Hover](#hover)
      - [Pointer](#pointer)
  - [Operadores Lógicos](#operadores-lógicos)
    - [`and` - Todas as condições devem ser verdadeiras](#and---todas-as-condições-devem-ser-verdadeiras)
    - [`or` (vírgula) - Qualquer condição pode ser verdadeira](#or-vírgula---qualquer-condição-pode-ser-verdadeira)
    - [`not` - Inverte a condição](#not---inverte-a-condição)
    - [`only` - Oculta de navegadores antigos](#only---oculta-de-navegadores-antigos)
    - [Combinações Complexas](#combinações-complexas)
  - [Breakpoints e Estratégias](#breakpoints-e-estratégias)
    - [Breakpoints Comuns (Bootstrap-style)](#breakpoints-comuns-bootstrap-style)
    - [Abordagem Mobile-First (Recomendada)](#abordagem-mobile-first-recomendada)
    - [Abordagem Desktop-First](#abordagem-desktop-first)
    - [Breakpoints Baseados em Conteúdo (Ideal)](#breakpoints-baseados-em-conteúdo-ideal)
  - [Media Queries Modernas (Level 4 e 5)](#media-queries-modernas-level-4-e-5)
    - [Range Syntax (Sintaxe de Intervalo)](#range-syntax-sintaxe-de-intervalo)
      - [Sintaxe Antiga vs Nova](#sintaxe-antiga-vs-nova)
      - [Comparações](#comparações)
    - [Custom Media Queries (Rascunho Level 5)](#custom-media-queries-rascunho-level-5)
    - [Preferências Avançadas](#preferências-avançadas)
    - [Detecção de Display Modes](#detecção-de-display-modes)
  - [Dicas e Macetes Avançados](#dicas-e-macetes-avançados)
    - [1. Use EM/REM em vez de Pixels](#1-use-emrem-em-vez-de-pixels)
    - [2. Organize Media Queries no Componente](#2-organize-media-queries-no-componente)
    - [3. Container Queries (Nova Alternativa!)](#3-container-queries-nova-alternativa)
    - [4. Use CSS Custom Properties](#4-use-css-custom-properties)
    - [5. Combine com `:has()` para Lógica Condicional](#5-combine-com-has-para-lógica-condicional)
    - [6. Feature Queries + Media Queries](#6-feature-queries--media-queries)
    - [7. Evite Conflitos com Ordem Correta](#7-evite-conflitos-com-ordem-correta)
    - [8. Print-Friendly com Media Queries](#8-print-friendly-com-media-queries)
    - [9. JavaScript + Media Queries](#9-javascript--media-queries)
    - [10. Fallbacks para Navegadores Antigos](#10-fallbacks-para-navegadores-antigos)
  - [Performance e Otimização](#performance-e-otimização)
    - [1. Carregamento Condicional de CSS](#1-carregamento-condicional-de-css)
    - [2. Minimize Recalculações](#2-minimize-recalculações)
    - [3. Use will-change com Cuidado](#3-use-will-change-com-cuidado)
    - [4. Lazy Loading de Imagens por Resolução](#4-lazy-loading-de-imagens-por-resolução)
  - [Debugging e Testes](#debugging-e-testes)
    - [Ferramentas do Chrome DevTools](#ferramentas-do-chrome-devtools)
    - [Dica de Debugging](#dica-de-debugging)
    - [Teste de Acessibilidade](#teste-de-acessibilidade)
  - [Recursos Adicionais](#recursos-adicionais)
    - [Suporte dos Navegadores](#suporte-dos-navegadores)
    - [Ferramentas Úteis](#ferramentas-úteis)
    - [Leitura Recomendada](#leitura-recomendada)
  - [Resumo - Boas Práticas](#resumo---boas-práticas)

---

## Conceito e Introdução

### O que são Media Queries?

**Media Queries** são uma tecnologia CSS que permite aplicar estilos condicionalmente, baseados em características do dispositivo ou viewport onde o conteúdo está sendo renderizado. Elas são a espinha dorsal do **Responsive Web Design**.

### Por que são importantes?

- **Adaptabilidade**: Permitem criar interfaces que se adaptam a diferentes dispositivos
- **Experiência do Usuário**: Otimizam a apresentação do conteúdo para cada contexto
- **Acessibilidade**: Respeitam preferências do usuário (modo escuro, movimento reduzido)
- **Performance**: Carregam recursos específicos apenas quando necessário

### Analogia

Imagine que você é um arquiteto projetando uma casa que magicamente se transforma:

- Em um smartphone: compacta, com cômodos verticalizados
- Em um tablet: intermediária, com melhor distribuição
- Em um desktop: espaçosa, com layout horizontal amplo

Media queries são as "regras de transformação" dessa casa mágica.

---

## Sintaxe Fundamental

### Estrutura Básica

```css
@media tipo-de-midia and (característica: valor) {
  /* Estilos aplicados quando a condição é verdadeira */
  seletor {
    propriedade: valor;
  }
}
```

### Exemplo Mais Simples

```css
/* Estilos aplicados APENAS em telas menores que 600px */
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}
```

### Como Ler uma Media Query

Leia como uma sentença em português:

```css
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* ... */
}
```

**Tradução**: "Aplique estes estilos quando o dispositivo for uma tela E a largura mínima for 768px E a largura máxima for 1024px"

---

## Anatomia de uma Media Query

```plaintext
@media [tipo] [operador] ([característica]: [valor]) [operador] ([característica]: [valor]) {
   └─┬─┘  └┬┘    └──┬──┘        └────┬────┘        └────┬────┘        └───┬───┘
     │     │        │                  │                   │                 │
  Regra  Tipo   Operador         Característica        Valor             Operador
   CSS          Lógico            (Media Feature)                         Lógico
```

### Componentes

1. **@media**: Declaração da regra CSS
2. **Tipo**: `screen`, `print`, `all`, etc. (opcional)
3. **Operadores**: `and`, `not`, `only`, `,` (OR)
4. **Características**: `width`, `height`, `orientation`, etc.
5. **Valores**: Medidas, palavras-chave específicas

---

## Evolução Histórica

### CSS2 (1998) - Media Types

```css
/* Primeira forma de adaptar CSS */
@media print {
  body { color: black; }
}
```

**Limitações**: Apenas tipos de mídia (print, screen, handheld), sem queries reais.

### CSS3 Media Queries (2012) - Revolução

```css
/* Nascimento do Responsive Design */
@media (max-width: 768px) {
  .sidebar { display: none; }
}
```

**Inovações**:

- Consultas baseadas em características do dispositivo
- Operadores lógicos
- Possibilitou o design responsivo moderno

### Media Queries Level 4 (2017-presente)

```css
/* Range Syntax - muito mais legível */
@media (400px <= width <= 1000px) {
  /* Estilos para larguras entre 400px e 1000px */
}

/* Preferências do usuário */
@media (prefers-color-scheme: dark) {
  body { background: #000; color: #fff; }
}
```

**Novidades**:

- Sintaxe de intervalo (range)
- Media features para preferências (dark mode, reduced motion)
- Detecção de capacidades do dispositivo

### Media Queries Level 5 (Em desenvolvimento)

```css
/* Queries personalizadas com JavaScript */
@media (--minha-condicao: true) {
  /* Estilos customizados */
}

/* Detecção de ambiente */
@media (environment-blending: additive) {
  /* Para dispositivos de realidade aumentada */
}
```

---

## Tipos de Mídia

### Tipos Principais

| Tipo     | Descrição                               | Uso Comum               |
| -------- | --------------------------------------- | ----------------------- |
| `all`    | Todos os dispositivos (padrão)          | Estilos universais      |
| `screen` | Telas (monitores, tablets, smartphones) | Web design responsivo   |
| `print`  | Impressão                               | Versões para impressora |
| `speech` | Leitores de tela                        | Acessibilidade          |

### Tipos Obsoletos (evitar)

- `handheld` - Obsoleto
- `projection` - Obsoleto
- `tty` - Obsoleto
- `tv` - Obsoleto

### Exemplos Práticos

```css
/* Estilos para impressão */
@media print {
  header, footer, nav { display: none; }
  body { font-size: 12pt; color: black; }
  a::after { content: " (" attr(href) ")"; }
}

/* Estilos para telas */
@media screen {
  body { background: linear-gradient(to bottom, #667eea, #764ba2); }
}

/* Estilos para leitores de tela */
@media speech {
  .visually-hidden { 
    speak: always; 
  }
}
```

---

## Media Features Essenciais

### 1. Dimensões da Viewport

#### `width` (Largura)

```css
/* Mobile First - de baixo para cima */
/* Base: mobile (< 600px) */
body { font-size: 14px; }

/* Tablet (>= 600px) */
@media (min-width: 600px) {
  body { font-size: 16px; }
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
  body { font-size: 18px; }
}
```

```css
/* Desktop First - de cima para baixo */
/* Base: desktop */
body { font-size: 18px; }

/* Tablet (<= 1024px) */
@media (max-width: 1024px) {
  body { font-size: 16px; }
}

/* Mobile (<= 600px) */
@media (max-width: 600px) {
  body { font-size: 14px; }
}
```

#### `height` (Altura)

```css
/* Útil para dispositivos com tela curta */
@media (max-height: 600px) {
  header { padding: 10px 0; } /* Reduz padding vertical */
  .hero { min-height: 300px; } /* Ajusta altura mínima */
}
```

### 2. Orientação

```css
/* Retrato (portrait) - altura > largura */
@media (orientation: portrait) {
  .gallery { 
    grid-template-columns: repeat(2, 1fr); 
  }
}

/* Paisagem (landscape) - largura > altura */
@media (orientation: landscape) {
  .gallery { 
    grid-template-columns: repeat(4, 1fr); 
  }
}
```

### 3. Aspect Ratio (Proporção)

```css
/* Telas ultra-wide */
@media (min-aspect-ratio: 21/9) {
  .container { max-width: 1600px; }
}

/* Telas quadradas ou próximas */
@media (aspect-ratio: 1/1) {
  .content { padding: 40px; }
}
```

### 4. Resolution (Resolução/DPI)

```css
/* Telas Retina/HiDPI */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi),
       (min-resolution: 2dppx) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: 100px 50px;
  }
}
```

### 5. Preferências do Usuário (Level 4)

#### Modo Escuro

```css
/* Light mode (padrão) */
:root {
  --bg-color: white;
  --text-color: black;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

#### Movimento Reduzido

```css
/* Animações normais */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

/* Usuário prefere menos movimento */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  
  .card:hover {
    transform: none; /* Remove transformação */
    opacity: 0.8; /* Feedback alternativo */
  }
}
```

#### Contraste

```css
/* Usuário prefere alto contraste */
@media (prefers-contrast: high) {
  body {
    color: #000;
    background: #fff;
  }
  
  button {
    border: 3px solid currentColor;
    font-weight: bold;
  }
}
```

### 6. Capacidades de Interação (Level 4)

#### Hover

```css
/* Dispositivos que suportam hover (mouse) */
@media (hover: hover) {
  button:hover {
    background-color: #0056b3;
  }
}

/* Dispositivos SEM hover (touch) */
@media (hover: none) {
  button:active {
    background-color: #0056b3;
  }
}
```

#### Pointer

```css
/* Ponteiro preciso (mouse) */
@media (pointer: fine) {
  button {
    padding: 8px 16px; /* Botões menores OK */
  }
}

/* Ponteiro impreciso (touch) */
@media (pointer: coarse) {
  button {
    padding: 16px 24px; /* Botões maiores */
    min-height: 44px; /* Área de toque adequada */
  }
}
```

---

## Operadores Lógicos

### `and` - Todas as condições devem ser verdadeiras

```css
/* Tablets em paisagem */
@media screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .sidebar { width: 300px; }
}
```

### `or` (vírgula) - Qualquer condição pode ser verdadeira

```css
/* Mobile OU tablets pequenos */
@media (max-width: 600px), (max-width: 768px) and (orientation: portrait) {
  .menu { display: none; }
}
```

### `not` - Inverte a condição

```css
/* Tudo EXCETO impressão */
@media not print {
  .no-print { display: block; }
}

/* Tudo EXCETO telas pequenas */
@media not screen and (max-width: 600px) {
  .desktop-only { display: block; }
}
```

### `only` - Oculta de navegadores antigos

```css
/* Navegadores antigos ignoram completamente esta regra */
@media only screen and (min-width: 768px) {
  /* Estilos modernos */
}
```

### Combinações Complexas

```css
/* Desktop em dark mode OU mobile com alto contraste */
@media 
  (min-width: 1024px) and (prefers-color-scheme: dark),
  (max-width: 600px) and (prefers-contrast: high) {
  .card {
    border: 2px solid white;
  }
}
```

---

## Breakpoints e Estratégias

### Breakpoints Comuns (Bootstrap-style)

```css
/* Extra Small devices (phones) */
/* Base styles - sem media query */

/* Small devices (tablets, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }

/* Extra Extra Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) { }
```

### Abordagem Mobile-First (Recomendada)

```css
/* Base: Mobile (320px+) */
.container {
  padding: 15px;
  width: 100%;
}

.grid {
  display: block;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .container {
    padding: 30px;
    max-width: 720px;
    margin: 0 auto;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  .container {
    max-width: 1200px;
  }
  
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Abordagem Desktop-First

```css
/* Base: Desktop */
.container {
  max-width: 1200px;
  padding: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Tablet: 1024px- */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 30px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

/* Mobile: 768px- */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 15px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
```

### Breakpoints Baseados em Conteúdo (Ideal)

```css
/* Não use pixels arbitrários! Teste onde o layout quebra */

/* Quando o título começa a quebrar em 2 linhas */
@media (min-width: 450px) {
  h1 { font-size: 2.5rem; }
}

/* Quando há espaço para sidebar */
@media (min-width: 850px) {
  main { display: flex; }
  .sidebar { width: 250px; }
}

/* Quando a navegação cabe horizontalmente */
@media (min-width: 680px) {
  nav { flex-direction: row; }
}
```

## Media Queries Modernas (Level 4 e 5)

### Range Syntax (Sintaxe de Intervalo)

#### Sintaxe Antiga vs Nova

```css
/* ❌ Antiga (verbose) */
@media (min-width: 400px) and (max-width: 1000px) {
  /* ... */
}

/* ✅ Nova (concisa) */
@media (400px <= width <= 1000px) {
  /* ... */
}
```

#### Comparações

```css
/* Maior que */
@media (width > 600px) { }

/* Maior ou igual */
@media (width >= 600px) { }

/* Menor que */
@media (width < 1200px) { }

/* Menor ou igual */
@media (width <= 1200px) { }

/* Intervalo */
@media (600px < width < 1200px) { }
```

### Custom Media Queries (Rascunho Level 5)

```css
/* Define queries reutilizáveis */
@custom-media --mobile (max-width: 600px);
@custom-media --tablet (600px < width <= 1024px);
@custom-media --desktop (width > 1024px);
@custom-media --dark (prefers-color-scheme: dark);

/* Uso */
@media (--mobile) {
  .menu { display: none; }
}

@media (--desktop) and (--dark) {
  body { background: #000; }
}
```

**Nota**: Custom media queries ainda não são suportadas nativamente. Use PostCSS para transpilação.

### Preferências Avançadas

```css
/* Transparência reduzida (para usuários com problemas visuais) */
@media (prefers-reduced-transparency: reduce) {
  .glass-effect {
    backdrop-filter: none;
    background: solid rgba(255, 255, 255, 1);
  }
}

/* Dados econômicos */
@media (prefers-reduced-data: reduce) {
  .hero {
    background-image: none;
    background-color: #ccc;
  }
  
  video {
    display: none;
  }
}
```

### Detecção de Display Modes

```css
/* PWA rodando como app standalone */
@media (display-mode: standalone) {
  .install-prompt { display: none; }
  .app-header { padding-top: env(safe-area-inset-top); }
}

/* PWA rodando no navegador */
@media (display-mode: browser) {
  .app-header { /* estilos normais */ }
}
```

---

## Dicas e Macetes Avançados

### 1. Use EM/REM em vez de Pixels

```css
/* ❌ Ruim: quebra quando usuário aumenta zoom do texto */
@media (min-width: 768px) { }

/* ✅ Bom: respeita preferências de tamanho de fonte */
@media (min-width: 48em) { /* 768px / 16px = 48em */ }
```

**Cálculo**: `pixels / 16 = em` (assumindo base de 16px)

### 2. Organize Media Queries no Componente

```css
/* ✅ Mantenha relacionado junto */
.card {
  padding: 20px;
  background: white;
}

@media (min-width: 768px) {
  .card {
    padding: 30px;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
}
```

### 3. Container Queries (Nova Alternativa!)

```css
/* Em vez de media queries baseadas no viewport */
.sidebar {
  container-type: inline-size;
}

/* Estilize baseado no CONTAINER, não no viewport */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

### 4. Use CSS Custom Properties

```css
:root {
  --spacing-small: 10px;
  --spacing-medium: 20px;
  --spacing-large: 30px;
}

@media (min-width: 768px) {
  :root {
    --spacing-small: 15px;
    --spacing-medium: 30px;
    --spacing-large: 45px;
  }
}

/* Uso consistente */
.container {
  padding: var(--spacing-medium);
}
```

### 5. Combine com `:has()` para Lógica Condicional

```css
/* Ajusta layout se houver sidebar */
@media (min-width: 1024px) {
  main:has(.sidebar) {
    display: grid;
    grid-template-columns: 1fr 300px;
  }
}
```

### 6. Feature Queries + Media Queries

```css
/* Suporte a Grid + Tela grande */
@supports (display: grid) {
  @media (min-width: 768px) {
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
}
```

### 7. Evite Conflitos com Ordem Correta

```css
/* ❌ Ruim: ordem errada causa conflitos */
@media (min-width: 1024px) {
  .box { width: 800px; }
}
@media (min-width: 768px) {
  .box { width: 600px; } /* Nunca será aplicado! */
}

/* ✅ Bom: ordem crescente (mobile-first) */
@media (min-width: 768px) {
  .box { width: 600px; }
}
@media (min-width: 1024px) {
  .box { width: 800px; }
}
```

### 8. Print-Friendly com Media Queries

```css
@media print {
  /* Remove elementos desnecessários */
  nav, aside, .no-print { display: none; }
  
  /* Otimiza cores */
  * {
    color: black !important;
    background: white !important;
  }
  
  /* Adiciona URLs */
  a[href]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
  }
  
  /* Controla quebras de página */
  h1, h2, h3 {
    page-break-after: avoid;
  }
  
  pre, blockquote {
    page-break-inside: avoid;
  }
}
```

### 9. JavaScript + Media Queries

```javascript
// Detectar media queries no JavaScript
const mediaQuery = window.matchMedia('(min-width: 768px)');

function handleTabletChange(e) {
  if (e.matches) {
    console.log('Tela >= 768px');
  } else {
    console.log('Tela < 768px');
  }
}

// Listener
mediaQuery.addEventListener('change', handleTabletChange);

// Checar uma vez
handleTabletChange(mediaQuery);
```

### 10. Fallbacks para Navegadores Antigos

```css
/* Fallback primeiro */
.container {
  width: 100%;
  max-width: 1200px;
}

/* Enhancement progressivo */
@supports (display: grid) {
  @media (min-width: 768px) {
    .container {
      display: grid;
    }
  }
}
```

---

## Performance e Otimização

### 1. Carregamento Condicional de CSS

```html
<!-- Carrega CSS apenas para impressão -->
<link rel="stylesheet" href="print.css" media="print">

<!-- Carrega CSS apenas para telas grandes -->
<link rel="stylesheet" href="desktop.css" media="(min-width: 1024px)">
```

### 2. Minimize Recalculações

```css
/* ❌ Ruim: muitas breakpoints desnecessárias */
@media (min-width: 320px) { }
@media (min-width: 375px) { }
@media (min-width: 425px) { }
@media (min-width: 768px) { }
/* ... */

/* ✅ Bom: breakpoints significativos apenas */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
@media (min-width: 1440px) { }
```

### 3. Use will-change com Cuidado

```css
@media (min-width: 768px) and (hover: hover) {
  .card {
    transition: transform 0.3s;
  }
  
  .card:hover {
    will-change: transform; /* Apenas quando necessário */
    transform: scale(1.05);
  }
}
```

### 4. Lazy Loading de Imagens por Resolução

```html
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="image-large.jpg">
  <source 
    media="(min-width: 768px)" 
    srcset="image-medium.jpg">
  <img 
    src="image-small.jpg" 
    alt="Responsive image" 
    loading="lazy">
</picture>
```

---

## Debugging e Testes

### Ferramentas do Chrome DevTools

1. **Responsive Mode**: `Ctrl/Cmd + Shift + M`
2. **Emulate CSS media features**:
   - DevTools → ⋮ → More tools → Rendering
   - Emulate CSS prefers-color-scheme
   - Emulate CSS prefers-reduced-motion

### Dica de Debugging

```css
/* Visualize breakpoints ativos */
body::after {
  content: 'Mobile';
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background: red;
  color: white;
  z-index: 9999;
}

@media (min-width: 768px) {
  body::after { content: 'Tablet'; background: orange; }
}

@media (min-width: 1024px) {
  body::after { content: 'Desktop'; background: green; }
}

@media (min-width: 1440px) {
  body::after { content: 'Large Desktop'; background: blue; }
}
```

### Teste de Acessibilidade

```css
/* Verificar se respeitou preferências */
@media (prefers-reduced-motion: reduce) {
  * {
    outline: 2px solid red; /* Debug visual */
  }
}
```

---

## Recursos Adicionais

### Suporte dos Navegadores

- [Can I Use - Media Queries](https://caniuse.com/css-mediaqueries)
- [MDN - Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

### Ferramentas Úteis

- **Responsive Viewer**: Extensão para testar múltiplas resoluções
- **Polypane**: Browser para desenvolvimento responsivo
- **Responsively App**: App desktop para testes responsivos

### Leitura Recomendada

- "Responsive Web Design" - Ethan Marcotte (livro que cunhou o termo)
- [Web.dev - Responsive Design](https://web.dev/responsive-web-design-basics/)
- [CSS Tricks - A Complete Guide to CSS Media Queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/)

---

## Resumo - Boas Práticas

✅ **FAÇA**:

- Use abordagem mobile-first
- Prefira `em`/`rem` em vez de `px`
- Teste em dispositivos reais
- Respeite preferências do usuário
- Mantenha breakpoints baseados em conteúdo
- Use Container Queries quando possível

❌ **NÃO FAÇA**:

- Breakpoints para cada dispositivo específico
- Muitas media queries desnecessárias
- Ignorar preferências de acessibilidade
- Testar apenas em um navegador
- Usar `max-device-width` (obsoleto)

---

**Última atualização**: Outubro 2025
**Compatibilidade**: CSS3 Media Queries Level 4 (Level 5 em desenvolvimento)
