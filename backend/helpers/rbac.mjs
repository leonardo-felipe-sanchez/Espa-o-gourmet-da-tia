import { supabaseAdmin, criarSupabaseAutenticado } from '../Controlador/supabase.mjs';

/**
 * Verifica se usuário tem uma role específica
 */
export async function temRole(token, role) {
  try {
    const supabaseUser = criarSupabaseAutenticado(token);

    const { data, error } = await supabaseUser
      .from('user_roles')
      .select('role')
      .eq('role', role)
      .single();

    if (error) return false;
    return !!data;
  } catch (error) { 
    console.error('Erro ao verificar role:', error);
    return false;
  }
  
}

/**
 * Pega todas as roles do usuário
 */
export async function obterRoles(userId) {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao obter roles:', error);
      return [];
    }
    return data.map(r => r.role);
  } catch (error) {
    console.error('Erro ao obter roles:', error);
    return [];
  }
}

/**
 * Adicionar role a usuário
 */
export async function adicionarRole(userId, role) {
  try {
    const { error } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: userId,
        role: role,
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao adicionar role:', error);
    return false;
  }
}

/**
 * Remover role de usuário
 */
export async function removerRole(userId, role) {
  try {
    const { error } = await supabaseAdmin
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao remover role:', error);
    return false;
  }
}