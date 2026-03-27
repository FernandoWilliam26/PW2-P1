<script>

  let { onSave, productoEnEdicion = null, onCancel = null } = $props();

  let nombre = $state('');
  let precio = $state(0);
  let activo = $state(true);
  let guardando = $state(false);


  $effect(() => {
    if (productoEnEdicion) {
      nombre = productoEnEdicion.nombre;
      precio = productoEnEdicion.precio;
      activo = productoEnEdicion.activo;
    } else {
      nombre = '';
      precio = 0;
      activo = true;
    }
  });

  async function handleSubmit(event) {
    event.preventDefault();
    guardando = true;
    

    const datosProducto = { nombre, precio, activo };
    if (productoEnEdicion) {
      datosProducto.id = productoEnEdicion.id || productoEnEdicion._id;
    }

    await onSave(datosProducto);
    

    nombre = ''; precio = 0; activo = true; guardando = false;
  }
</script>

<div class="form-container">
  <h3>{productoEnEdicion ? '✏️ Editar Producto' : 'Añadir Nuevo Producto'}</h3>
  
  <form onsubmit={handleSubmit}>
    <div class="campo">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" bind:value={nombre} required />
    </div>
    
    <div class="campo">
      <label for="precio">Precio (€):</label>
      <input type="number" id="precio" bind:value={precio} min="0" step="0.01" required />
    </div>

    <div class="campo checkbox-campo">
      <label for="activo">
        <input type="checkbox" id="activo" bind:checked={activo} />
        Producto Activo
      </label>
    </div>

    <div class="botones">
      <button type="submit" disabled={guardando} class="btn-guardar">
        {guardando ? 'Guardando...' : (productoEnEdicion ? 'Actualizar Producto' : 'Guardar Producto')}
      </button>
      
      {#if productoEnEdicion && onCancel}
        <button type="button" class="btn-cancelar" onclick={onCancel}>Cancelar</button>
      {/if}
    </div>
  </form>
</div>

<style>
  .form-container {
    background: white; 
    padding: 2rem; 
    border-radius: 12px; 
    margin-bottom: 2rem; 
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    border: 1px solid #f0f0f0;
  }
  
  h3 { margin-top: 0; color: #111827; font-size: 1.3rem; }

  .campo { margin-bottom: 1.2rem; }
  
  label { font-weight: 600; color: #374151; font-size: 0.95rem; }

  .checkbox-campo label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; margin-top: 1rem;}
  
  input[type="text"], input[type="number"] { 
    width: 100%; 
    padding: 0.8rem; 
    margin-top: 0.4rem; 
    border: 1px solid #d1d5db; 
    border-radius: 6px; 
    box-sizing: border-box;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input[type="text"]:focus, input[type="number"]:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .botones { display: flex; gap: 1rem; margin-top: 2rem; }
  
  .btn-guardar { 
    padding: 0.8rem 1.5rem; 
    background: #4f46e5; 
    color: white; 
    border: none; 
    border-radius: 6px; 
    cursor: pointer; 
    flex: 1; 
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.2s;
  }
  
  .btn-guardar:hover:not(:disabled) { background: #4338ca; }
  .btn-guardar:disabled { background: #a5b4fc; cursor: not-allowed; }
  
  .btn-cancelar { 
    padding: 0.8rem 1.5rem; 
    background: #f3f4f6; 
    color: #374151; 
    border: none; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold;
  }
  .btn-cancelar:hover { background: #e5e7eb; }
</style>