/**
 * ARQUIVO: SignUp-Simples.jsx
 * 
 * Este é um componente ULTRA simples para testar se o signup funciona
 * Se isso funcionar, o problema é no componente Formulario
 * Se isso não funcionar, o problema é na action/router
 */

import { Form, useActionData } from "react-router-dom";

export function SignUpSimples() {
  const actionData = useActionData();

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h1>Teste Simples de Signup</h1>

      {/* Mostrar erro se houver */}
      {actionData?.erro && (
        <div style={{ backgroundColor: "#fee", color: "#c00", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
          ❌ {actionData.erro}
        </div>
      )}

      {/* Formulário simples */}
      <Form method="POST" encType="multipart/form-data">
        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="seu@email.com"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Senha */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Senha:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Confirmar Senha */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Confirmar Senha:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#f05",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Registrar (Teste)
        </button>
      </Form>

      {/* Debug info */}
      <div style={{ marginTop: "30px", fontSize: "12px", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
        <p>🔍 Informações de Debug:</p>
        <p>- Abra DevTools (F12)</p>
        <p>- Vá pra aba Console</p>
        <p>- Preencha e clique "Registrar"</p>
        <p>- Procure por logs começados com "🚀"</p>
      </div>
    </div>
  );
}
