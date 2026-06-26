import { supabaseAdmin } from "./Controlador/supabase.mjs";

/**
 * const { data, error } = await supabase.storage.updateBucket("produtos", {
  public: true,
  allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],
  fileSizeLimit: 1024 * 1024 * 10,
});
 */

//const { data, error } = await supabase.storage.listBuckets();

//const { data, error } = await supabase.storage.from("produtos").list("imagens");

import { adicionarRole } from './helpers/rbac.mjs';

async function criarPrimeiroAdmin() {
  try {
    // 1. Criar usuário
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@seusite.com',
      password: 'senha123',
      
    });

    if (authError) throw authError;

    console.log('✅ Usuário criado:', authData.user.id);

    // 2. Adicionar role admin
    await adicionarRole(authData.user.id, 'admin');

    console.log('✅ Role admin adicionada!');
    console.log({
      id: authData.user.id,
      email: authData.user.email,
      roles: ['admin'],
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

criarPrimeiroAdmin();
