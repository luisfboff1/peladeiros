# Estrutura Visual dos Componentes - Guia de Referência

## 🏆 RankingsCard - Estrutura com Tabs

```
┌─────────────────────────────────────────────────────────────┐
│ 🏆 Rankings                                                 │
│ Melhores jogadores do grupo                                 │
├─────────────────────────────────────────────────────────────┤
│ ┌───────┬────────────┬─────────┬──────────┐                │
│ │ Geral │ Artilheiros│ Garçons │ Goleiros │ ◄─── Tabs      │
│ └───────┴────────────┴─────────┴──────────┘                │
│                                                              │
│ Ranking baseado em: presença (2pts), gols (3pts)...        │
│                                                              │
│ ┌──────────────────────────────────────────────┐            │
│ │ 🥇 │ João Silva              │    85 pontos │            │
│ │    │ 12 jogos • 8G 5A • 2 MVPs              │            │
│ ├──────────────────────────────────────────────┤            │
│ │ 🥈 │ Pedro Santos            │    72 pontos │            │
│ │    │ 10 jogos • 6G 7A • 1 MVP               │            │
│ ├──────────────────────────────────────────────┤            │
│ │ 🥉 │ Carlos Oliveira         │    68 pontos │            │
│ │    │ 11 jogos • 5G 4A • 1 MVP               │            │
│ ├──────────────────────────────────────────────┤            │
│ │  4 │ Ana Costa               │    54 pontos │            │
│ │    │ 9 jogos • 4G 3A                        │            │
│ └──────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- 4 tabs navegáveis
- Top 3 com medalhas coloridas (ouro, prata, bronze)
- Informações contextuais (jogos, gols, assistências, MVPs)
- Score destacado no lado direito
- Hover effect em cada item

---

## 📊 MyStatsCard - Estatísticas Pessoais

```
┌─────────────────────────────────────────────────────────────┐
│ Minhas Estatísticas                                         │
│ Seu desempenho neste grupo                                  │
├─────────────────────────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │
│ │  ⚽ │ │ 🎯  │ │ 🎁  │ │ 🏆  │ │ ⭐  │ │ 👑  │           │
│ │  12 │ │  8  │ │  5  │ │  7  │ │ 4.5 │ │  2  │           │
│ │Jogos│ │Gols │ │Asst │ │Vits │ │Nota │ │MVPs │           │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘           │
│                                                              │
│ ┌────────────────────────────────────────────────┐          │
│ │ Taxa de Vitória                      70%       │          │
│ │ ███████████████████░░░░░░░░░░░░░░░░░          │          │
│ └────────────────────────────────────────────────┘          │
│                                                              │
│ Tags Recebidas                                              │
│ [mvp (2)] [craque (3)] [defensor (1)]                      │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Grid responsivo: 2 colunas (mobile) → 6 colunas (desktop)
- Ícones emoji para identificação rápida
- Cards com background suave e hover effect
- Barra de progresso para taxa de vitória
- Tags com contadores

---

## 📈 FrequencyCard - Frequência de Jogadores

```
┌─────────────────────────────────────────────────────────────┐
│ 📊 Frequência                                               │
│ Presença nos últimos 10 jogos                               │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐          │
│ │ João Silva              [9 jogos]      90%     │          │
│ │ ███████████████████████████████████░░          │  Verde   │
│ ├────────────────────────────────────────────────┤          │
│ │ Pedro Santos            [7 jogos]      70%     │          │
│ │ ██████████████████████████░░░░░░░░░░           │  Amarelo │
│ ├────────────────────────────────────────────────┤          │
│ │ Carlos Oliveira         [4 jogos]      40%     │          │
│ │ ███████████████░░░░░░░░░░░░░░░░░░░░░           │  Vermelho│
│ └────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Barras de progresso coloridas por performance
  - Verde: ≥80% de presença
  - Amarelo: 50-79% de presença
  - Vermelho: <50% de presença
- Badge com contagem de jogos
- Percentual destacado
- Hover effect em cada linha

---

## 🏟️ RecentMatchesCard - Jogos Recentes

```
┌─────────────────────────────────────────────────────────────┐
│ 🏟️ Jogos Recentes                                          │
│ Últimos 5 jogos finalizados                                 │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐          │
│ │ 📅 28/10/2024              📍 Quadra do Zé     │          │
│ │                                                 │          │
│ │  ┌──────────────┐        ┌──────────────┐     │          │
│ │  │ Time Azul    │   ×    │ Time Vermelho│     │          │
│ │  │      3       │        │      2       │     │          │
│ │  │ 🏆 Vencedor  │        │              │     │          │
│ │  └──────────────┘        └──────────────┘     │          │
│ └────────────────────────────────────────────────┘          │
│                                                              │
│ ┌────────────────────────────────────────────────┐          │
│ │ 📅 21/10/2024              📍 Arena Central    │          │
│ │                                                 │          │
│ │  ┌──────────────┐        ┌──────────────┐     │          │
│ │  │ Time A       │   ×    │ Time B       │     │          │
│ │  │      4       │        │      4       │     │          │
│ │  │              │        │              │     │          │
│ │  └──────────────┘        └──────────────┘     │          │
│ └────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Layout horizontal em desktop, vertical em mobile
- Destaque visual para time vencedor (background verde)
- Badge "🏆 Vencedor"
- Informações de data e local no topo
- Placar em destaque (texto grande e bold)
- Hover effect com shadow

---

## 👥 GroupsCard (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│ Meus Grupos                                                 │
│ 3 grupos                                                    │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐          │
│ │ Pelada da Firma                      [Admin]   │          │
│ │ Grupo dos amigos do trabalho                   │          │
│ │ 👥 15 membros                                  │          │
│ ├────────────────────────────────────────────────┤          │
│ │ Futebol de Sábado                   [Membro]   │          │
│ │ Racha todo sábado às 9h                        │          │
│ │ 👥 22 membros                                  │          │
│ ├────────────────────────────────────────────────┤          │
│ │ Racha da Praia                      [Membro]   │          │
│ │ Beach soccer aos domingos                      │          │
│ │ 👥 12 membros                                  │          │
│ └────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Cards clicáveis com hover effect
- Badge de role (Admin/Membro)
- Descrição truncada em 2 linhas
- Contador de membros com emoji
- Shadow em hover

---

## 📅 UpcomingEventsCard (Dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│ Próximas Peladas                                            │
│ 2 eventos agendados                                         │
├─────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────┐          │
│ │ Pelada da Firma         [✓ Confirmado]         │          │
│ │ 📅 Sábado, 2 Nov 2024 às 09:00                 │          │
│ │ 📍 Quadra do Zé                                │          │
│ │ 👥 18/20 confirmados                           │          │
│ │ ███████████████████████████████████████░░      │  (90%)   │
│ ├────────────────────────────────────────────────┤          │
│ │ Futebol de Sábado      [⏳ Lista de espera]    │          │
│ │ 📅 Sábado, 2 Nov 2024 às 14:00                 │          │
│ │ 📍 Arena Central                               │          │
│ │ 👥 20/20 confirmados                           │          │
│ │ ████████████████████████████████████████       │  (100%)  │
│ └────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- Status badge colorido (Confirmado/Espera/Recusado)
- Informações de data, horário e local
- Barra de progresso de vagas
  - Verde: lotado (≥100%)
  - Amarelo: quase lotado (≥70%)
  - Azul: vagas disponíveis (<70%)
- Contador visual de confirmados
- Hover effect com shadow

---

## 📱 Responsividade - Breakpoints

### Mobile (< 640px)
```
┌─────────────────┐
│   Card Stack    │
│  ┌───────────┐  │
│  │  Stat 1   │  │
│  │  Stat 2   │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │  Stat 3   │  │
│  │  Stat 4   │  │
│  └───────────┘  │
└─────────────────┘
```

### Tablet (640px - 1024px)
```
┌─────────────────────────────┐
│     Card Grid 2 Cols        │
│  ┌────────┐   ┌────────┐   │
│  │ Stat 1 │   │ Stat 2 │   │
│  │ Stat 3 │   │ Stat 4 │   │
│  └────────┘   └────────┘   │
└─────────────────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────────┐
│         Card Grid 4-6 Cols               │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│  │St 1│ │St 2│ │St 3│ │St 4│ │St 5│    │
│  └────┘ └────┘ └────┘ └────┘ └────┘    │
└──────────────────────────────────────────┘
```

---

## 🎨 Sistema de Cores

### Badges de Status
- **Confirmado**: `variant="default"` (verde)
- **Lista de espera**: `variant="secondary"` (cinza)
- **Recusado**: `variant="outline"` (borda apenas)
- **Admin**: `variant="default"` (azul)
- **Membro**: `variant="secondary"` (cinza)

### Medalhas de Ranking
- **1º lugar**: Fundo amarelo (#EAB308) com texto escuro
- **2º lugar**: Fundo prata (#CBD5E1) com texto escuro
- **3º lugar**: Fundo laranja (#EA580C) com texto claro
- **Demais**: Fundo muted com texto muted

### Barras de Progresso
- **Verde**: ≥80% ou completo
- **Amarelo**: 50-79%
- **Vermelho**: <50%
- **Azul**: Padrão para eventos

---

## 🔄 Estados de Interação

### Hover States
- Cards: `hover:bg-accent hover:shadow-md`
- Linhas de ranking: `hover:bg-accent`
- Botões: `hover:bg-primary/90`

### Transições
- Padrão: `transition-colors` (200ms)
- Cards: `transition-all` (300ms)
- Barras: `transition-all` para animação suave

### Focus States
- Tabs: `ring-2 ring-ring ring-offset-2`
- Inputs: Borda destacada
- Links: Outline visível

---

Esta estrutura garante uma experiência consistente, profissional e acessível em todos os dispositivos! 🎉
