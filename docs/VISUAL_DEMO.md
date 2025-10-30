# Visual Demo - Nova Página de Confirmação

## 📱 Visão Geral da Interface

### Cabeçalho
```
┌─────────────────────────────────────────────────────────┐
│  🏠 Peladeiros                     [Olá, João] [Sair]  │
└─────────────────────────────────────────────────────────┘
```

### Página Principal `/events/[eventId]`

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  📅 Sexta-feira, 01/11/2024 às 19:00                   │
│                                                         │
│  Pelada do Grupo X                           [Agendado]│
│  📍 Quadra do Centro Esportivo                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────┐  ┌────────────────┐               │
│  │ 👥 Participantes│  │  Seu Status    │               │
│  │                │  │                │               │
│  │ Confirmados    │  │ ✓ Confirmado   │               │
│  │   8/10         │  │                │               │
│  │                │  │ Posições:      │               │
│  │ ████████░░     │  │ 1ª: ⚽ Atacante │               │
│  │                │  │ 2ª: ⚡ Meio     │               │
│  │ ⏳ 2 na espera │  │                │               │
│  └────────────────┘  └────────────────┘               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Confirmar Presença                                     │
│                                                         │
│  1ª Posição Preferencial *                             │
│  ┌────────┬────────┬────────┬────────┐                │
│  │   🧤   │   🛡️   │   ⚡   │   ⚽   │                │
│  │ Goleiro│Zagueiro│  Meio  │Atacante│                │
│  │        │        │  [✓]   │        │                │
│  └────────┴────────┴────────┴────────┘                │
│                                                         │
│  2ª Posição (Opcional)                                 │
│  ┌────────┬────────┬────────┬────────┐                │
│  │   🧤   │   🛡️   │   ⚡   │   ⚽   │                │
│  │ Goleiro│Zagueiro│  Meio  │Atacante│                │
│  │        │        │        │  [✓]   │                │
│  └────────┴────────┴────────┴────────┘                │
│                                                         │
│  [✓ Confirmar Presença]         [✗ Não Vou]           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👥 Jogadores Confirmados (8)                          │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │ [1] João Silva          ⚽ Atacante / ⚡ Meio│      │
│  │ [2] Pedro Santos        🛡️ Zagueiro         │      │
│  │ [3] Carlos Lima   [GK]  🧤 Goleiro          │      │
│  │ [4] André Costa         ⚡ Meio / 🛡️ Zagueiro│      │
│  │ [5] Lucas Mendes        ⚽ Atacante          │      │
│  │ [6] Rafael Souza        🛡️ Zagueiro / ⚡ Meio│      │
│  │ [7] Bruno Alves         ⚡ Meio              │      │
│  │ [8] Felipe Rocha        ⚽ Atacante / ⚡ Meio│      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  ⏳ Lista de Espera (2)                                │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │ [1] Gustavo Pinto                            │      │
│  │ [2] Thiago Barbosa                           │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Estados da Interface

### Estado 1: Usuário NÃO Confirmado

```
┌────────────────┐
│  Seu Status    │
│                │
│ Você ainda não │
│ confirmou sua  │
│ presença       │
└────────────────┘

Seleção de posições: HABILITADA
Botões: [Confirmar] [Não Vou]
```

### Estado 2: Usuário CONFIRMADO

```
┌────────────────┐
│  Seu Status    │
│                │
│ ✓ Confirmado   │
│                │
│ Posições:      │
│ 1ª: ⚽ Atacante │
│ 2ª: ⚡ Meio     │
└────────────────┘

Seleção de posições: PRÉ-PREENCHIDA (pode alterar)
Botões: [Confirmar] [Não Vou]
```

### Estado 3: Usuário na LISTA DE ESPERA

```
┌────────────────┐
│  Seu Status    │
│                │
│ ⏳ Lista de    │
│    espera      │
│                │
│ Posições:      │
│ 1ª: 🛡️ Zagueiro│
└────────────────┘

Badge: [Lista de espera] (amarelo)
Botões: [Confirmar] [Não Vou]
```

### Estado 4: Evento LOTADO (sem waitlist)

```
┌────────────────┐
│ 👥 Participantes│
│                │
│ Confirmados    │
│   10/10        │
│                │
│ ██████████     │
│                │
│ ✓ Completo     │
└────────────────┘

Mensagem: "Este evento está lotado"
Botões: [Não Vou] (se já estava confirmado)
```

### Estado 5: Evento FINALIZADO

```
┌────────────────────────────┐
│ Pelada do Grupo X [Finalizado]
│ (Badge cinza)
└────────────────────────────┘

Formulário: DESABILITADO
Mensagem: "Este evento já foi finalizado"
Botões: DESABILITADOS
```

## 📱 Responsividade

### Desktop (> 768px)

Grid de posições: **4 colunas**
```
┌────────┬────────┬────────┬────────┐
│   🧤   │   🛡️   │   ⚡   │   ⚽   │
│ Goleiro│Zagueiro│  Meio  │Atacante│
└────────┴────────┴────────┴────────┘
```

Lista de confirmados: **2 colunas**
```
┌──────────────┬──────────────┐
│ [1] João     │ [2] Pedro    │
│ [3] Carlos   │ [4] André    │
└──────────────┴──────────────┘
```

### Mobile (< 640px)

Grid de posições: **2 colunas**
```
┌────────┬────────┐
│   🧤   │   🛡️   │
│ Goleiro│Zagueiro│
├────────┼────────┤
│   ⚡   │   ⚽   │
│  Meio  │Atacante│
└────────┴────────┘
```

Lista de confirmados: **1 coluna**
```
┌──────────────┐
│ [1] João     │
│ [2] Pedro    │
│ [3] Carlos   │
└──────────────┘
```

## 🎯 Interações do Usuário

### 1. Seleção de Posição

```
Estado inicial:
┌────────┐
│   ⚽   │  ← Borda cinza clara
│Atacante│
└────────┘

Hover:
┌────────┐
│   ⚽   │  ← Borda azul clara (cursor: pointer)
│Atacante│
└────────┘

Selecionado (1ª posição):
┌────────┐
│   ⚽   │  ← Fundo azul claro, borda azul
│Atacante│  ← Shadow destacado
│   [1]  │  ← Badge "1" no canto
└────────┘

Selecionado (2ª posição):
┌────────┐
│   ⚽   │  ← Fundo verde claro, borda verde
│Atacante│
│   [2]  │  ← Badge "2" no canto
└────────┘
```

### 2. Feedback de Confirmação

**Sucesso:**
```
┌─────────────────────────────────┐
│ ✓ Presença confirmada!          │
│   Sua confirmação foi registrada│
└─────────────────────────────────┘
(Toast verde, 3 segundos)
```

**Erro - Posição não selecionada:**
```
┌─────────────────────────────────┐
│ ⚠ Posição obrigatória           │
│   Selecione pelo menos sua      │
│   posição preferencial          │
└─────────────────────────────────┘
(Toast vermelho, 5 segundos)
```

**Erro - Posições duplicadas:**
```
┌─────────────────────────────────┐
│ ⚠ Posições duplicadas            │
│   Selecione posições diferentes │
│   para 1ª e 2ª opção            │
└─────────────────────────────────┘
(Toast vermelho, 5 segundos)
```

### 3. Loading State

```
┌─────────────────────────────────┐
│ [⏳ Confirmar Presença]          │
│    (Spinner animado)             │
└─────────────────────────────────┘
(Botão desabilitado, cursor: wait)
```

## 🔄 Fluxo Completo de Confirmação

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  1. PÁGINA CARREGA                                   │
│     └─► Busca dados do evento                       │
│     └─► Busca participantes                         │
│     └─► Verifica status do usuário                  │
│                                                      │
│  2. USUÁRIO SELECIONA 1ª POSIÇÃO                    │
│     └─► Estado atualizado (visual feedback)         │
│     └─► Botão "Confirmar" habilitado                │
│                                                      │
│  3. USUÁRIO SELECIONA 2ª POSIÇÃO (opcional)         │
│     └─► Estado atualizado                           │
│     └─► Validação: diferente da 1ª?                 │
│                                                      │
│  4. USUÁRIO CLICA "CONFIRMAR PRESENÇA"              │
│     └─► Validação client-side                       │
│     │   ├─► 1ª posição selecionada? ✓              │
│     │   └─► Posições diferentes? ✓                  │
│     │                                                │
│     └─► Envia request para API                      │
│         POST /api/events/[id]/rsvp                  │
│         {                                            │
│           status: "yes",                             │
│           role: "line",                              │
│           preferredPosition: "forward",              │
│           secondaryPosition: "midfielder"            │
│         }                                            │
│                                                      │
│  5. API PROCESSA                                     │
│     └─► Valida dados (Zod schema)                   │
│     └─► Verifica membership no grupo                │
│     └─► Verifica vagas disponíveis                  │
│     │   ├─► Tem vaga? → status = "yes"             │
│     │   └─► Lotado? → status = "waitlist"          │
│     │                                                │
│     └─► Salva no banco                              │
│         UPDATE event_attendance                      │
│         SET preferred_position = 'forward',          │
│             secondary_position = 'midfielder'        │
│                                                      │
│  6. RESPOSTA RETORNA                                 │
│     └─► Toast de sucesso aparece                    │
│     └─► Página atualiza (router.refresh())          │
│     └─► Novo status é exibido                       │
│     └─► Lista de confirmados atualiza               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 🎨 Paleta de Cores

```
Confirmado:       Verde (#10b981)
Lista de Espera:  Amarelo (#eab308)
Não Confirmado:   Cinza (#6b7280)
Finalizado:       Cinza escuro (#374151)

Seleção 1ª:       Azul (#3b82f6)
Seleção 2ª:       Verde (#10b981)

Hover:            Azul claro (#dbeafe)
Borda ativa:      Azul (#2563eb)
```

## 📊 Exemplo de Dados

### Evento
```typescript
{
  id: "123e4567-e89b-12d3-a456-426614174000",
  group_name: "Pelada do Grupo X",
  starts_at: "2024-11-01T19:00:00Z",
  venue_name: "Quadra do Centro Esportivo",
  max_players: 10,
  confirmed_count: 8,
  waitlist_count: 2,
  status: "scheduled"
}
```

### Participante Confirmado
```typescript
{
  id: "user-123",
  name: "João Silva",
  image: null,
  role: "line",
  preferred_position: "forward",
  secondary_position: "midfielder",
  created_at: "2024-10-30T10:00:00Z"
}
```

---

**Nota**: Esta é uma representação visual em texto. A interface real usa componentes React com Tailwind CSS e shadcn/ui para aparência moderna e responsiva.
