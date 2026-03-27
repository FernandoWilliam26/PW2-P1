<script>
  import { appState } from '../services/store.svelte.js';
  import ProductCard from '../components/ProductCard.svelte';
  import ProductForm from '../components/ProductForm.svelte';

  let productos = $state([]);
  let error = $state('');
  let cargando = $state(true);
  let busqueda = $state(''); 
  let productoSeleccionado = $state(null);


  let totalProductos = $derived(() => productos.length);


  let productosFiltrados = $derived(() => {
    return productos.filter(p => 
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  $effect(() => {
    fetchProductos();
  });

  async function fetchProductos() {
    try {
      const res = await fetch('http://localhost:3000/api/productos', {
        headers: { 'Authorization': `Bearer ${appState.token}` }
      });
      if (!res.ok) throw new Error('Error al cargar productos');
      
      const data = await res.json();
      
  
      productos = data.map(p => ({
        ...p,
        activo: p.activo === true || p.activo === 'true' || p.activo === 1
      }));
      
    } catch (err) {
      error = err.message;
    } finally {
      cargando = false;
    }
  }

  async function guardarProducto(datosProducto) {
    try {
      const url = datosProducto.id 
        ? `http://localhost:3000/api/productos/${datosProducto.id}` 
        : 'http://localhost:3000/api/productos';
        
      const metodo = datosProducto.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${appState.token}`
        },
        body: JSON.stringify({
          nombre: datosProducto.nombre,
          precio: Number(datosProducto.precio),
          activo: Boolean(datosProducto.activo)
        })
      });

      if (!res.ok) throw new Error('No se pudo guardar el producto');
      
      await fetchProductos();
      productoSeleccionado = null;
    } catch (err) {
      alert(err.message);
    }
  }

  function iniciarEdicion(id) {
    productoSeleccionado = productos.find(p => (p.id === id || p._id === id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    productoSeleccionado = null;
  }

  async function borrarProducto(id) {
    if (!confirm('¿Seguro que quieres borrar este producto?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${appState.token}` }
      });
      if (!res.ok) throw new Error('Error al borrar');
      productos = productos.filter(p => p.id !== id && p._id !== id);
    } catch (err) {
      alert(err.message);
    }
  }
</script>

<div class="productos-container">
  
  <div class="hero-banner">
    <div class="hero-texto">
      <h1>Nueva Colección 2026</h1>
      <p>Explora nuestra selección exclusiva de productos con diseño vanguardista y calidad garantizada.</p>
    </div>
  </div>

  <div class="header-seccion">
    <div class="titulo-grupo">
      <h2>Catálogo</h2>
      <span class="badge">{totalProductos()} artículos</span>
    </div>

    <div class="buscador-wrapper">
      <input 
        type="text" 
        placeholder="🔍 Buscar por nombre..." 
        bind:value={busqueda} 
      />
    </div>
  </div>

  <ProductForm 
    onSave={guardarProducto} 
    productoEnEdicion={productoSeleccionado}
    onCancel={cancelarEdicion}
  />

  {#if cargando}
    <div class="aviso">Cargando catálogo...</div>
  {:else if error}
    <div class="aviso error">❌ {error}</div>
  {:else if productosFiltrados().length === 0}
    <div class="aviso">
      {busqueda ? 'No se han encontrado productos que coincidan.' : 'El catálogo está vacío. ¡Añade tu primer producto!'}
    </div>
  {:else}
    <div class="grid">
      {#each productosFiltrados() as producto}
        <ProductCard 
          product={producto} 
          onEdit={iniciarEdicion} 
          onDelete={borrarProducto} 
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .productos-container {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }


  .hero-banner {
    position: relative;
    overflow: hidden;
    background: #111827;
    border-radius: 24px;
    padding: 4rem 3rem;
    color: white;
    margin-bottom: 3rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .hero-banner::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
    z-index: 0;
  }

  .hero-texto { position: relative; z-index: 1; }
  .hero-texto h1 { margin: 0; font-size: 3rem; font-weight: 800; letter-spacing: -1.5px; }
  .hero-texto p { margin: 1rem 0 0 0; color: #94a3b8; max-width: 500px; font-size: 1.1rem; }


  .header-seccion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .titulo-grupo { display: flex; align-items: center; gap: 1rem; }
  .titulo-grupo h2 { font-weight: 800; font-size: 1.8rem; margin: 0; color: #1e293b; }

  .badge { 
    background: #e2e8f0; color: #475569; 
    padding: 0.4rem 1rem; border-radius: 30px; 
    font-weight: 600; font-size: 0.9rem;
  }

  .buscador-wrapper { flex-grow: 1; max-width: 400px; }
  .buscador-wrapper input {
    width: 100%;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    border: 1px solid rgba(0,0,0,0.08);
    background: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }

  .buscador-wrapper input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 4px 15px rgba(79, 70, 229, 0.1);
  }


  .grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 2rem; 
    padding-bottom: 5rem;
  }

  .aviso {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    color: #64748b;
    border: 2px dashed #e2e8f0;
  }

  .error { color: #ef4444; border-color: #fee2e2; background: #fff5f5; }


  @media (max-width: 768px) {
    .hero-banner { padding: 2rem; }
    .hero-texto h1 { font-size: 2rem; }
    .header-seccion { flex-direction: column; align-items: flex-start; }
    .buscador-wrapper { max-width: 100%; }
  }
</style>