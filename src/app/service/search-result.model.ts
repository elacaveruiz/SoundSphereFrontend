// search-result.model.ts
export interface SearchResult {
  songs: any[]; // Define los tipos adecuados según los datos que esperas recibir del backend
  artists: any[];
  albums: any[];
  profiles: any[];
}
