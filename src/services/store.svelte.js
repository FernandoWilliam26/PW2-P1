// src/services/store.svelte.js

// Usamos $state() para manejar el estado principal de la aplicación [cite: 31]
export const appState = $state({
  user: null,    
  token: null,   
  products: []   
});

// En Svelte 5, una función normal que lee un $state ya es reactiva por defecto.
// Así evitamos el error de exportación del $derived.
export const isAuthenticated = () => appState.token !== null;