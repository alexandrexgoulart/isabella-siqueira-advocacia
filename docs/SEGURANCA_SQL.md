# Configuração de Segurança - Supabase

## AVISO IMPORTANTE

A chave `service_role` está exposta no código client-side (admin-blog.html). Isso é um **risco de segurança**. Para mitigar:

1. Execute as políticas RLS abaixo
2. Considere migrar para Supabase Edge Functions no futuro

---

## Execute no SQL Editor do Supabase

### 1. Habilitar RLS nas tabelas (se ainda não estiver)

```sql
-- Habilitar RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
```

### 2. Políticas para tabela POSTS

```sql
-- Qualquer pessoa pode ler posts publicados
CREATE POLICY "public_read_posts" ON posts
FOR SELECT USING (publicado = true);

-- Apenas service_role pode inserir (chave do admin)
CREATE POLICY "service_insert_posts" ON posts
FOR INSERT WITH CHECK (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role'
);

-- Apenas service_role pode atualizar
CREATE POLICY "service_update_posts" ON posts
FOR UPDATE USING (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role'
);

-- Apenas service_role pode deletar
CREATE POLICY "service_delete_posts" ON posts
FOR DELETE USING (
    current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role'
);
```

### 3. Políticas para tabela ADMIN_USERS (apenas para auth local)

```sql
-- Serviço pode buscar usuário para autenticação
CREATE POLICY "service_select_admin" ON admin_users
FOR SELECT USING (true);
```

### 4. Revogar permissões de anon (manter apenas via políticas)

```sql
-- Remover grants diretos (manter apenas via políticas RLS)
REVOKE ALL ON public.posts FROM anon;
REVOKE ALL ON public.posts FROM authenticated;
REVOKE ALL ON public.admin_users FROM anon;
REVOKE ALL ON public.admin_users FROM authenticated;

-- Garantir que apenas service_role tem acesso total
GRANT ALL ON public.posts TO service_role;
GRANT ALL ON public.admin_users TO service_role;
```

---

## Verificar configuração atual

```sql
-- Ver se RLS está habilitado
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public';
```

---

## Para máxima segurança (futuro)

Migrar operações de admin para Supabase Edge Functions:
1. Criar função que verifica senha antes de executar operações
2. Usar apenas chave `anon` no client-side
3. Chamar Edge Function para operações de escrita