#!/bin/bash
# =============================================================================
# update-project-memory.sh
# Lê o projeto atual e atualiza automaticamente .claude/memory/project/
#
# USO:
#   bash .claude/tools/update-project-memory.sh
#   bash .claude/tools/update-project-memory.sh --full   (inclui análise de TODOs)
# =============================================================================
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
MEMORY_DIR="$PROJECT_DIR/.claude/memory/project"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
FULL_MODE="${1:-}"

echo "=== Atualizando Memória do Projeto ==="
echo "Diretório: $PROJECT_DIR"
echo ""

mkdir -p "$MEMORY_DIR"

# ─── DETECTAR NOME DO PROJETO ─────────────────────────────────────────────────
PROJECT_NAME=""
PROJECT_TYPE="desconhecido"
PACKAGE_MANAGER=""

if git -C "$PROJECT_DIR" remote get-url origin &>/dev/null 2>&1; then
  REMOTE=$(git -C "$PROJECT_DIR" remote get-url origin 2>/dev/null || echo "")
  PROJECT_NAME=$(basename "$REMOTE" .git 2>/dev/null || echo "")
fi
if [ -z "$PROJECT_NAME" ] && [ -f "$PROJECT_DIR/package.json" ]; then
  PROJECT_NAME=$(grep '"name"' "$PROJECT_DIR/package.json" 2>/dev/null | head -1 | sed 's/.*"name": *"\([^"]*\)".*/\1/' || echo "")
fi
[ -z "$PROJECT_NAME" ] && PROJECT_NAME=$(basename "$PROJECT_DIR")

# ─── DETECTAR STACK ───────────────────────────────────────────────────────────
TECHS=()
if [ -f "$PROJECT_DIR/package.json" ]; then
  PACKAGE_MANAGER="npm"
  [ -f "$PROJECT_DIR/yarn.lock" ]       && PACKAGE_MANAGER="yarn"
  [ -f "$PROJECT_DIR/pnpm-lock.yaml" ]  && PACKAGE_MANAGER="pnpm"
  [ -f "$PROJECT_DIR/bun.lockb" ]       && PACKAGE_MANAGER="bun"
  for fw in next react vue nuxt svelte astro express fastify nestjs; do
    grep -q "\"$fw\"" "$PROJECT_DIR/package.json" 2>/dev/null && TECHS+=("$fw")
  done
  [ -f "$PROJECT_DIR/tsconfig.json" ] && TECHS+=("TypeScript") || TECHS+=("JavaScript")
  PROJECT_TYPE="web"
fi
if [ -f "$PROJECT_DIR/requirements.txt" ] || [ -f "$PROJECT_DIR/pyproject.toml" ]; then
  TECHS+=("Python")
  [ -f "$PROJECT_DIR/manage.py" ] && TECHS+=("Django")
  [ -f "$PROJECT_DIR/app.py" ]    && TECHS+=("Flask")
  PROJECT_TYPE="backend"
fi
[ -f "$PROJECT_DIR/go.mod" ]     && TECHS+=("Go")
[ -f "$PROJECT_DIR/Cargo.toml" ] && TECHS+=("Rust")
[ -f "$PROJECT_DIR/Dockerfile" ] && TECHS+=("Docker")
[ -f "$PROJECT_DIR/prisma/schema.prisma" ] && TECHS+=("Prisma")
TECH_STACK=$(IFS=", "; echo "${TECHS[*]:-Não detectado}")

# ─── FASE DO PROJETO ──────────────────────────────────────────────────────────
PHASE="Início"
if [ -d "$PROJECT_DIR/.git" ]; then
  CC=$(git -C "$PROJECT_DIR" rev-list --count HEAD 2>/dev/null || echo "0")
  [ "$CC" -gt 200 ] && PHASE="Manutenção/Produção"
  [ "$CC" -gt 50 ]  && [ "$CC" -le 200 ] && PHASE="Desenvolvimento avançado"
  [ "$CC" -gt 10 ]  && [ "$CC" -le 50 ]  && PHASE="Desenvolvimento"
fi

# ─── GIT INFO ─────────────────────────────────────────────────────────────────
GIT_STATUS=""
RECENT_COMMITS=""
RECENT_FILES=""
if [ -d "$PROJECT_DIR/.git" ]; then
  BRANCH=$(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "main")
  UNCOMMITTED=$(git -C "$PROJECT_DIR" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  GIT_STATUS="Branch: $BRANCH | Arquivos não commitados: $UNCOMMITTED"
  RECENT_COMMITS=$(git -C "$PROJECT_DIR" log --oneline -10 2>/dev/null || echo "")
  RECENT_FILES=$(git -C "$PROJECT_DIR" diff --name-only HEAD~5 HEAD 2>/dev/null | grep -v node_modules | head -20 || echo "")
fi

# ─── ESTRUTURA ────────────────────────────────────────────────────────────────
DIR_STRUCTURE=$(find "$PROJECT_DIR" -maxdepth 2 -type d \
  -not -path "*/node_modules*" -not -path "*/.git*" \
  -not -path "*/.claude*" -not -path "*/dist*" \
  -not -path "*/.next*" -not -path "*/build*" \
  2>/dev/null | sed "s|$PROJECT_DIR/||" | sort | head -30 || echo "")

# ─── TODOs (apenas no modo --full) ────────────────────────────────────────────
TODOS=""
if [ "$FULL_MODE" = "--full" ]; then
  TODOS=$(grep -rn "TODO\|FIXME\|HACK\|XXX" \
    --include="*.ts" --include="*.tsx" --include="*.js" \
    --include="*.py" --include="*.go" --include="*.rs" \
    "$PROJECT_DIR" 2>/dev/null | grep -v node_modules | grep -v ".git" | head -20 || echo "Nenhum")
fi

# ─── ESCREVER current_project.md ──────────────────────────────────────────────
cat > "$MEMORY_DIR/current_project.md" << EOF
---
name: $PROJECT_NAME
description: Contexto atual — gerado automaticamente em $TIMESTAMP
type: project
generated: true
---

# Contexto do Projeto: $PROJECT_NAME

## Identificação
- **Nome:** $PROJECT_NAME
- **Tipo:** $PROJECT_TYPE
- **Fase:** $PHASE
- **Stack:** $TECH_STACK
- **Package Manager:** ${PACKAGE_MANAGER:-N/A}
- **Git:** $GIT_STATUS

## Estrutura Principal
\`\`\`
$DIR_STRUCTURE
\`\`\`

## Últimos 10 Commits
\`\`\`
$RECENT_COMMITS
\`\`\`

## Arquivos Modificados Recentemente
\`\`\`
$RECENT_FILES
\`\`\`
EOF

if [ -n "$TODOS" ] && [ "$FULL_MODE" = "--full" ]; then
  cat >> "$MEMORY_DIR/current_project.md" << EOF

## TODOs e FIXMEs
\`\`\`
$TODOS
\`\`\`
EOF
fi

cat >> "$MEMORY_DIR/current_project.md" << EOF

## Instruções para o Claude
- Consulte este arquivo antes de iniciar qualquer tarefa
- Execute \`/save-session\` ao final de cada sessão
- Execute \`/resume-session\` para retomar sessão anterior
- Atualize este contexto com: \`bash .claude/tools/update-project-memory.sh\`
EOF

# ─── ESCREVER CONTEXT_SNAPSHOT.md ─────────────────────────────────────────────
cat > "$MEMORY_DIR/CONTEXT_SNAPSHOT.md" << EOF
# Context Snapshot — $PROJECT_NAME
Gerado em: $TIMESTAMP

Stack: $TECH_STACK
Package Manager: ${PACKAGE_MANAGER:-N/A}
Fase: $PHASE
Git: $GIT_STATUS

## Commits Recentes
$RECENT_COMMITS

## Arquivos Recentes
$RECENT_FILES
EOF

echo "✅ Memória do projeto atualizada!"
echo "   → $MEMORY_DIR/current_project.md"
echo "   → $MEMORY_DIR/CONTEXT_SNAPSHOT.md"
echo ""
echo "📌 Inicie o Claude Code — ele vai carregar este contexto automaticamente."
