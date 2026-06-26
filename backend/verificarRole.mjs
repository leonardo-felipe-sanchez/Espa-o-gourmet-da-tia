import { temRole, obterRoles } from './helpers/rbac.mjs';

/**
 * Middleware que verifica se usuário tem uma role específica
 * Uso: verificarRole('admin')
 */
export function verificarRole(roleRequerida) {
  return async (req, res, next) => {
    try {
      if (!req.usuario || !req.usuario.token) {
        return res.status(401).json({ erro: 'Usuário não autenticado' });
      }

      // Obter roles do usuário
      const roles = await obterRoles(req.usuario.id);

      // Verificar se tem a role
      if (!roles.includes(roleRequerida)) {
        return res.status(403).json({
          erro: `Acesso negado. Role requerida: ${roleRequerida}`,
          rolesDoUsuario: roles,
        });
      }

      // Salvar roles para usar depois
      req.usuario.roles = roles;

      next();

    } catch (error) {
      console.error('Erro no middleware verificarRole:', error);
      res.status(500).json({ erro: error.message });
    }
  };
}