<script>
  import { appState } from '../services/store.svelte.js';

  let nombreUsuario = $derived(() => appState.user?.username || 'Usuario Desconocido');
</script>

<div class="perfil-container">
  <h2>Mi Perfil</h2>
  <div class="tarjeta-perfil">
    <div class="avatar">👤</div>
    <div class="info">
      <h3>{nombreUsuario()}</h3>
      <p>Rol: Administrador</p>
      <p>Estado de la cuenta: Activa</p>
    </div>
  </div>
</div>

<style>
  .perfil-container { max-width: 600px; margin: 0 auto; text-align: center; }
  .tarjeta-perfil { 
    display: flex; gap: 2rem; align-items: center; justify-content: center;
    background: #f4f4f9; padding: 2rem; border-radius: 12px; margin-top: 2rem;
  }
  .avatar { font-size: 4rem; }
  .info { text-align: left; }
</style>