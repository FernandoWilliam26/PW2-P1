// src/services/store.svelte.js

// Usamos $state() para manejar el estado principal de la aplicación [cite: 31]
export const appState = $state({
  user: null,    // Aquí guardaremos los datos del usuario cuando haga login
  token: null,   // Aquí guardaremos el "pase VIP" (JWT) [cite: 14]
  products: []   // Aquí guardaremos la lista de productos [cite: 31]
});

// Usamos $derived() para saber si estamos autenticados [cite: 32]
// Esto se actualizará automáticamente si el token cambia
export const isAuthenticated = $derived(() => appState.token !== null);