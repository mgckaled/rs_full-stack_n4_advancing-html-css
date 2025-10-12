# Dashboard

## Layout Principal

- **Sidebar + Main Content** — Flex container com `flex-direction: row`
- **Sidebar fixa** — `flex: 0 0 250px` (não cresce, não encolhe)
- **Main Content responsivo** — `flex: 1` (preenche espaço restante)

## Header

- **Título + Actions** — Usa `flex: 1` no título para empurrar botões para direita
- **Alinhamento** — `justify-content: space-between` + `align-items: center`

### Stats Cards

- **Grid responsivo** — `flex: 1 1 calc(25% - 12px)` em desktop (4 colunas)
- **Multi-line** — `flex-wrap: wrap` quebra para 2 colunas em tablet
- **Mobile** — `flex: 1 1 100%` = 1 coluna

### Product Cards

- **Estrutura interna** — `flex-direction: column` com distribuição inteligente
- **Imagem fixa** — `flex: 0 0 auto` (não cresce)
- **Descrição expansível** — `flex: 1` (preenche espaço entre título e preço)
- **Footer empurrado** — `margin-top: auto` + `flex: 0 0 auto`

### Responsividade

- Desktop (3 colunas) → Tablet (2 colunas) → Mobile (1 coluna)
- Sidebar muda de coluna para linha em mobile
- Header se reorganiza em tamanhos pequenos
