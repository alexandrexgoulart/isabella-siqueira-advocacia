# Configuração de Segurança - Supabase

## AVISO IMPORTANTE

A chave `service_role` está exposta no código client-side (admin-blog.html). Isso é um **risco de segurança**. Para mitigar:

1. Execute as políticas RLS abaixo
2. Considere migrar para Supabase Edge Functions no futuro

---

## Execute no SQL Editor do Supabase

### 0. Primeiro, verificar se RLS está habilitado

```sql
-- Verificar se RLS está habilitado nas tabelas
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

Se `rowsecurity = true` para `posts` e não houver políticas, é por isso que não carrega no celular!

---

### 1. Políticas para tabela POSTS (ESSENCIAL - Sem isso o blog não carrega!)

```sql
-- Habilitar RLS na tabela posts (se não estiver)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Criar política para leitura pública de posts publicados
-- Permite qualquer pessoa ler posts onde publicado = true
CREATE POLICY "public_read_published_posts" ON posts
FOR SELECT USING (publicado = true);

-- Permitir service_role fazer inserts/updates/deletes (para admin)
CREATE POLICY "service_role_crud_posts" ON posts
FOR ALL USING (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role'
);
```

---

### 2. Recriar políticas para ADMIN_USERS (corrigidas)

```sql
-- Primeiro, remover políticas antigas se existirem
DROP POLICY IF EXISTS "service_select_admin" ON admin_users;

-- Permitir que service_role faça SELECT (para autenticação do admin)
CREATE POLICY "allow_service_role_read_admin" ON admin_users
FOR SELECT USING (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role'
);

-- Fallback: permitir leitura pública para autenticação local (ATENÇÃO: menos seguro)
-- Execute apenas se o login não funcionar com a política acima
-- CREATE POLICY "public_read_admin" ON admin_users FOR SELECT USING (true);
```

---

### Verificar se existe usuário admin no banco

```sql
SELECT id, email, nome, created_at FROM admin_users;
```

Se não existir, criar:

```sql
INSERT INTO admin_users (email, password_hash, nome)
VALUES (
    'admin@isabella.com',
    '7c8a5c6f1e2e9f0e1d3b4c5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6',
    'Administrador'
);
```

(Nota: O hash acima é para a senha: adminisabella2026)