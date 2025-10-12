# GridDash

## `/src`

### `index.html`

- Layout semântico com todas as seções
- Simulação de dashboard com dados reais
- Navegação funcional entre seções
- Filtros interativos

### `styles.css`

Demonstra todos os tópicos:

✅ **Grid Template Areas** — Layout principal com notação ASCII-art

```css
grid-template-areas:
    "header header"
    "sidebar content"
    "sidebar footer"
```

✅ **Grid Template Columns/Rows + Shorthand**

```css
grid-template:
    "header header" 70px
    "sidebar content" 1fr
    / 250px 1fr;
```

✅ **Grid Column/Row** — Items ocupam múltiplas células

```css
grid-area: chart-main; /* Usa template areas */
```

✅ **Gap** — Espaçamento consistente

```css
gap: var(--space-lg);
```

✅ **Auto-Fit + Minmax** — Responsividade sem media query

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

✅ **Grid Auto Rows/Columns** — Comportamento automático para items extras

```css
grid-auto-rows: 200px;
```

✅ **Alinhamentos**:

- `justify-items` / `align-items` — Items dentro de células
- `justify-content` / `align-content` — Grid inteiro
- `justify-self` / `align-self` — Item específico (via flex interno)

✅ **Grid vs Flexbox**:

- Grid para layout principal (2D)
- Flexbox para componentes internos (header, sidebar nav)

✅ **Tema Escuro/Claro** com CSS variables

### `script.js`

- Navegação funcional entre seções
- Tema dark/light com localStorage
- Filtros que atualizam dados
- Animações ao scroll
- Responsividade dinâmica
- Console com documentação dos conceitos

---

## 🔍 Tópicos em Ação

| Tópico                    | Onde Ver                          | Como Funciona                                     |
| ------------------------- | --------------------------------- | ------------------------------------------------- |
| **Grid Template Areas**   | `.app-container`                  | Layout em 3 áreas: header, sidebar, content       |
| **Grid Template Columns** | `.dashboard-grid`                 | 6 colunas em desktop, menos em mobile             |
| **Grid Template Rows**    | `.dashboard-grid`                 | Linhas automáticas com `grid-auto-rows`           |
| **Grid Column/Row**       | `.chart-main`, `.chart-table`     | Ocupam múltiplas células                          |
| **Gap**                   | Vários grids                      | `gap: var(--space-lg)` em todos                   |
| **Auto-Fit/Minmax**       | `.stats-grid`, `.responsive-grid` | Responsividade sem media query                    |
| **Alinhamentos**          | `.dashboard-grid`, `.stat-card`   | Centralização e distribuição de items             |
| **Grid Auto**             | `.responsive-grid`                | Items extras criam linhas/colunas automaticamente |
| **Grid vs Flex**          | Throughout                        | Grid: layout; Flexbox: componentes                |

---

## 💡 Dicas para Aprender

1. **Abra o Inspector** (F12) e veja a estrutura do grid em tempo real
2. **Mude o tamanho da tela** — Veja como o grid se adapta
3. **Mude de tema** — CSS variables em ação
4. **Confira o Console** — Tem um resumo dos conceitos de Grid
5. **Experimente!** — Mude valores no CSS e veja o que acontece
