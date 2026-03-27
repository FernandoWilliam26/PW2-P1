<script>
  import { isAuthenticated, appState } from './services/store.svelte.js';
  import Login from './pages/Login.svelte';
  import Productos from './pages/Productos.svelte';
  import Perfil from './pages/Perfil.svelte'; 

  let rutaActual = $state('productos');
</script>

<main>
  {#if isAuthenticated()}
    <nav class="navbar">
      <div class="brand">TwinS<span>antander</span>.</div>
      <div class="links">
        <button 
          class={rutaActual === 'productos' ? 'activa' : ''} 
          onclick={() => rutaActual = 'productos'}>
          📦 Productos
        </button>
        <button 
          class={rutaActual === 'perfil' ? 'activa' : ''} 
          onclick={() => rutaActual = 'perfil'}>
          👤 Perfil
        </button>
      </div>
      <button class="logout-btn" onclick={() => { appState.token = null; appState.user = null; }}>
        Cerrar Sesión
      </button>
    </nav>
  {/if}
  
  <div class="contenido">
    {#if !isAuthenticated()}
      <Login />
    {:else if rutaActual === 'productos'}
      <Productos />
    {:else if rutaActual === 'perfil'}
      <Perfil />
    {/if}
  </div>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');

  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    color: #1e293b;
    min-height: 100vh;
    background-color: #f8fafc;
    background-image: 
      radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.05) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.05) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(79, 70, 229, 0.05) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.05) 0px, transparent 50%);
    background-attachment: fixed;
  }


  .navbar {
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(255, 255, 255, 0.7); 
    backdrop-filter: blur(20px); 
    padding: 0.8rem 5%;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    border-top: 4px solid #4f46e5; 
    position: sticky; top: 0; z-index: 100;
  }

  .brand { 
    font-size: 1.6rem; 
    font-weight: 800; 
    color: #111827;
    letter-spacing: -1px;
  }
  .brand span { color: #4f46e5; } 

  .links { display: flex; gap: 0.5rem; }
  
  .links button {
    background: transparent; border: none; font-size: 1rem; cursor: pointer;
    padding: 0.5rem 1.2rem; border-radius: 30px; transition: all 0.3s ease;
    color: #64748b; font-weight: 600;
  }
  
  .links button:hover { color: #111827; }
  
  .links button.activa { 
    background: #111827; color: white; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .logout-btn { 
    background-color: transparent; color: #ef4444; 
    border: 1px solid #fee2e2; padding: 0.5rem 1.2rem; 
    border-radius: 30px; cursor: pointer; font-weight: 600;
    transition: all 0.2s;
  }
  .logout-btn:hover { background-color: #fee2e2; }

  .contenido { padding: 2rem 5%; max-width: 1200px; margin: 0 auto; }
</style>