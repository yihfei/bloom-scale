export interface BrewData {
  coffee: string;
  roaster: string;
  grindSize: string;
  temp?: number;
  dose: number;
  water: number;
  minutes?: number;
  seconds?: number;
  notes?: string;
}

export interface SavedBrew extends BrewData {
  id: string;
  createdAt: number; // Unix timestamp
}