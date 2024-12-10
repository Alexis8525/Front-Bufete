import { CitasStrategy } from "./citas-strategy.interface";

export class CitasContext<T = any> {
  private strategy!: CitasStrategy<T>;

  setStrategy(strategy: CitasStrategy<T>): void {
    this.strategy = strategy;
  }

  executeStrategy(userId: number): Promise<T[]> {
    if (!this.strategy) {
      return Promise.reject(new Error('Estrategia no definida'));
    }
    return this.strategy.loadCitas(userId);
  }
}
