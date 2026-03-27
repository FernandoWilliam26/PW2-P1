<script>
  import { appState } from '../services/store.svelte.js';

  let username = $state('');
  let password = $state('');
  let errorMessage = $state('');
  let isLoading = $state(false);

  async function handleLogin(event) {
    event.preventDefault();
    errorMessage = '';
    isLoading = true;

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Credenciales incorrectas');
      }

      // Guardamos el token y el usuario en nuestro estado global
      appState.token = data.token;
      appState.user = { username };
      
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="login-page">
  <div class="login-card">
    <div class="login-header">
      <div class="logo-icon">🚀</div>
      <h1>Bienvenido de nuevo</h1>
      <p>Introduce tus credenciales para acceder al panel</p>
    </div>

    <form onsubmit={handleLogin}>
      <div class="input-group">
        <label for="username">Usuario</label>
        <input 
          type="text" 
          id="username" 
          placeholder="Ej: admin" 
          bind:value={username} 
          required 
        />
      </div>

      <div class="input-group">
        <label for="password">Contraseña</label>
        <input 
          type="password" 
          id="password" 
          placeholder="••••••••" 
          bind:value={password} 
          required 
        />
      </div>

      {#if errorMessage}
        <div class="error-bubble">
          <span>⚠️</span> {errorMessage}
        </div>
      {/if}

      <button type="submit" disabled={isLoading} class="login-btn">
        {#if isLoading}
          <span class="spinner"></span> Verificando...
        {:else}
          Entrar al Sistema
        {/if}
      </button>
    </form>

    <div class="login-footer">
      <p>Práctica de Programación Web 2 — 2026</p>
    </div>
  </div>
</div>

<style>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh; /* Para que no pegue al borde inferior del navegador */
  }

  .login-card {
    background: white;
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    border: 1px solid rgba(0,0,0,0.03);
    animation: slideUp 0.6s ease-out;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .login-header h1 {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0;
    color: #111827;
    letter-spacing: -0.5px;
  }

  .login-header p {
    color: #64748b;
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .input-group label {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: #334155;
  }

  .input-group input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-size: 1rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .input-group input:focus {
    outline: none;
    border-color: #4f46e5;
    background: white;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }

  .error-bubble {
    background: #fff1f2;
    color: #e11d48;
    padding: 0.8rem;
    border-radius: 12px;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid #ffe4e6;
  }

  .login-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
  }

  .login-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }

  .login-footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.75rem;
    color: #94a3b8;
    border-top: 1px solid #f1f5f9;
    padding-top: 1.5rem;
  }

  /* Pequeño spinner para el loading */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>