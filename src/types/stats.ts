
export interface StatsData {
  name: string;
  values: number[];
  type: 'continuous' | 'discrete' | 'categorical';
}
