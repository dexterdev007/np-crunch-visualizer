export interface SATStep {
  formula: string;
  explanation: string;
}

export interface CNF3Step {
  clauses: string[][];
  explanation: string;
}

export interface CliqueNode {
  id: string;
  label: string;
  clause: number;
}

export interface CliqueEdge {
  source: string;
  target: string;
}

export interface CliqueStep {
  nodes: CliqueNode[];
  edges: CliqueEdge[];
  explanation: string;
}

export interface ReductionData {
  sat: SATStep;
  cnf3: CNF3Step;
  clique: CliqueStep;
}
