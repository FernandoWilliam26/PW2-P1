<script>
  let { product, onDelete, onEdit } = $props();
  let imagenPlaceholder = `https://ui-avatars.com/api/?name=${product.nombre}&background=random&color=fff&size=300&font-size=0.33`;
</script>

<div class="tarjeta-tienda">
  <div class="imagen-contenedor">
    <img src={imagenPlaceholder} alt={product.nombre} />
<span class="etiqueta-estado {(product.activo === true || product.activo === 'true') ? 'stock' : 'agotado'}">
  {(product.activo === true || product.activo === 'true') ? 'En Stock' : 'Agotado'}
</span>
  </div>
  
  <div class="contenido-tarjeta">
    <h3 class="titulo">{product.nombre}</h3>
    <p class="precio">{product.precio} €</p>
    
    <div class="acciones">
      <button class="btn-editar" onclick={() => onEdit(product.id || product._id)}>
        ✏️ Editar
      </button>
      <button class="btn-borrar" onclick={() => onDelete(product.id || product._id)} title="Borrar producto">
        🗑️
      </button>
    </div>
  </div>
</div>

<style>

  .tarjeta-tienda {
    background: white;
    border-radius: 16px; 
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03); 
    border: none; 
   
  }

  .tarjeta-tienda:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .imagen-contenedor {
    position: relative;
    width: 100%;
    height: 180px;
    background: #f8f9fa;
  }

  .imagen-contenedor img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .etiqueta-estado {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
  }

  .stock { background-color: #10b981; } 
  .agotado { background-color: #ef4444; } 

  .contenido-tarjeta {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .titulo {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #1f2937;
  }

.precio {
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827; 
    margin: 0 0 1rem 0;
  }

  .acciones {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
  }

.btn-editar {
    flex-grow: 1;
    background-color: #111827; /* Botón negro elegante */
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }
  
  .btn-editar:hover { 
    background-color: #4f46e5; 
    transform: scale(1.02);
  }

  .btn-borrar {
    background-color: #fee2e2;
    color: #ef4444;
    border: none;
    padding: 0.6rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-borrar:hover { background-color: #fca5a5; }
</style>