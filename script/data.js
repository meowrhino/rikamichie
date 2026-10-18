// ============================================
// MÓDULO COMPARTIDO - Carga de los datos (data/site.json)
// ============================================

import { loadSite } from './carga.js';

// Caché global de los datos
let dataCache = null;
let dataPromise = null;

/**
 * Carga data.json una sola vez y lo cachea
 * @returns {Promise<Object>} Los datos de data.json
 */
export async function loadData() {
  // Si ya está en caché, devolverlo inmediatamente
  if (dataCache) {
    return dataCache;
  }
  
  // Si ya hay una petición en curso, reutilizarla
  if (dataPromise) {
    return dataPromise;
  }
  
  // Hacer la petición y cachearla
  dataPromise = loadSite() // data/site.json → la forma de antes (script/carga.js)
    .then((data) => {
      dataCache = data;
      console.log('✅ datos cargados y cacheados');
      return data;
    })
    .catch((error) => {
      console.error('❌ Error cargando los datos:', error);
      dataPromise = null; // Resetear para permitir reintentos
      throw error;
    });
  
  return dataPromise;
}

/**
 * Obtiene una sección específica de data.json
 * @param {string} seccion - Nombre de la sección (arriba, abajo, izquierda, derecha)
 * @returns {Promise<Object>} Los datos de la sección
 */
export async function getSeccion(seccion) {
  const data = await loadData();
  
  if (!data[seccion]) {
    console.warn(`⚠️ No se encontró la sección '${seccion}' en data.json`);
    return null;
  }
  
  return data[seccion];
}

/**
 * Limpia el caché (útil para testing o recargas)
 */
export function clearCache() {
  dataCache = null;
  dataPromise = null;
  console.log('🗑️ Caché de data.json limpiado');
}

// Exportar el caché para compatibilidad
export { dataCache };
