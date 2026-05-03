import Dexie, { type Table } from 'dexie';

export interface Simulation {
  id?: number;
  decision_input: string;
  regret_score: number;
  timestamp: number;
}

export interface Vector {
  id?: number;
  embedding: number[];
  context_tags: string[];
  outcome_score: number;
}

export interface Outcome {
  id?: number;
  sim_id: number;
  timeframe: string;
  persona_type: string;
  narrative_blob: string;
}

export interface Config {
  key: string;
  value: any;
}

export class AuditDB extends Dexie {
  simulations!: Table<Simulation>;
  vectors!: Table<Vector>;
  outcomes!: Table<Outcome>;
  configs!: Table<Config>;

  constructor() {
    super('AUDIT_DB');
    this.version(2).stores({
      simulations: '++id, decision_input, regret_score, timestamp',
      vectors: '++id, embedding, context_tags, outcome_score',
      outcomes: '++id, sim_id, timeframe, persona_type, narrative_blob',
      configs: 'key, value'
    });
  }
}

export const db = new AuditDB();
