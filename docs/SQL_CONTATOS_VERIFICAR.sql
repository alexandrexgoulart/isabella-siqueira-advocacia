-- ============================================
-- VERIFICAR O QUE JÁ EXISTE E O QUE FALTA
-- Execute no Supabase SQL Editor
-- ============================================

-- 1: Verificar se a tabela existe
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'contatos';

-- 2: Ver políticas existentes
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'contatos';

-- 3: Ver permissões existentes
SELECT 
    grantee,
    privilege_type,
    table_name
FROM information_schema.table_privileges 
WHERE table_name = 'contatos';

-- 4: Testar INSERT (simular envio do formulário)
INSERT INTO contatos (nome, email, telefone, mensagem, lido)
VALUES ('Teste automático', 'teste@email.com', '(62) 99999-9999', 'Teste de funcionamento', false);

-- 5: Verificar se salvou
SELECT * FROM contatos;