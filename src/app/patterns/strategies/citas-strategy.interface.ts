export interface CitasStrategy<T = any> {
  loadCitas(userId: number): Promise<T[]>;
}
