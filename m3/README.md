<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<p align="center">
  <img alt="Logo - Rocketseat" src="../.github/assets/images/logo_rocketseat.png" width="200px" />
</p>

# Módulo 3 - CSS Functions

## Guia de Referência

- [CSS Functions - Guia de Referência](./../.github/docs/content/m3/b1.md)

### Tópicos

- Funções de Transformação
- Funções Matemáticas
- Funções de filtro para cores e imagens
- Funções de cores
- Funções de degradê
- Funções de formas
- Funções que referenciam outros valores
- Outros tópicos avançados

---

## Site interativo - CSS Functions Gallery

Este site demonstra o poder das funções CSS modernas, desde cálculos matemáticos até transformações 3D, filtros avançados e manipulação de cores. Todas as animações e efeitos foram criados usando apenas CSS puro, sem dependências externas.

- [Arquivos do projeto](./src)

### Tecnologias utilizadas

- HTML puro
- CSS
- JavaScript vanilla

### Seções implementadas

1. **Hero com cubo 3D rotativo** - Demonstra `transform3d()`, `perspective()`, `rotateX/Y()`
2. **Feature Cards** - Usam `backdrop-filter`, `radial-gradient()`, efeitos de mouse tracking
3. **Color Mixer interativo** - Demonstra simulação de `color-mix()` com sliders HSL
4. **Shape Morphing** - `clip-path()` com `circle()`, `polygon()`, formas dinâmicas
5. **Gradient Playground** - `linear-gradient()`, `radial-gradient()`, `conic-gradient()`
6. **Transform Gallery** - `rotate()`, `scale()`, `skew()`, `translate()`, transformações 3D
7. **Math Functions Demo** - `calc()`, `min()`, `max()`, `clamp()` com visualização
8. **Filter Effects** - Todos os filtros CSS (blur, brightness, contrast, etc)

### Funções CSS utilizadas

- `calc()`, `clamp()`, `min()`, `max()`
- `hsl()`, `rgba()`, gradientes de cor
- `linear-gradient()`, `radial-gradient()`, `conic-gradient()`
- `transform()` (2D e 3D), `perspective()`, `rotate()`, `scale()`, etc
- `clip-path()` com `circle()`, `polygon()`, `ellipse()`
- `filter()` e `backdrop-filter()`
- `var()` para custom properties
- `@property` para animações de custom properties
- Design tokens com cálculos dinâmicos

### Interatividade JavaScript

- _Intersection Observer_ para animações ao scroll
- _Mouse tracking_ nos cards
- _Color mixer_ funcional
- _Click handlers_ em diversos elementos
- _Parallax effect_
- _Smooth scroll_
