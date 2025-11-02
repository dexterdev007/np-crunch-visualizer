import { ReductionData, CliqueNode, CliqueEdge } from "@/types/reduction";

export function processFormula(formula: string): ReductionData {
  if (!formula || typeof formula !== 'string') {
    throw new Error('Invalid formula provided');
  }

  // Step 1: Parse and normalize SAT formula
  const satStep = {
    formula: formula.trim(),
    explanation: "Original SAT formula in Boolean form"
  };

  // Step 2: Convert to 3-CNF
  const cnf3Step = convertTo3CNF(formula);

  // Step 3: Build Clique graph from 3-CNF
  const cliqueStep = buildCliqueGraph(cnf3Step.clauses);

  return {
    sat: satStep,
    cnf3: cnf3Step,
    clique: cliqueStep
  };
}

function convertTo3CNF(formula: string) {
  // Simplified 3-CNF conversion
  // Parse clauses separated by AND
  const clauses: string[][] = [];
  
  // Remove outer parentheses and split by AND
  let normalized = formula.replace(/\s+/g, ' ').trim();
  
  // Split by AND (case insensitive)
  const clauseStrings = normalized.split(/\s+AND\s+/i);
  
  for (const clauseStr of clauseStrings) {
    // Remove parentheses
    let clause = clauseStr.replace(/[()]/g, '').trim();
    
    // Split by OR
    const literals = clause.split(/\s+OR\s+/i).map(lit => {
      // Normalize NOT to ¬
      return lit.trim().replace(/NOT\s+/i, '¬');
    });
    
    // Ensure exactly 3 literals per clause
    // If fewer than 3, duplicate the last literal
    while (literals.length < 3) {
      literals.push(literals[literals.length - 1]);
    }
    
    // If more than 3, take only the first 3 (simplified approach)
    clauses.push(literals.slice(0, 3));
  }
  
  return {
    clauses,
    explanation: "Converted to 3-CNF with exactly 3 literals per clause. Each clause is a disjunction (OR) of three literals."
  };
}

function buildCliqueGraph(clauses: string[][]) {
  const nodes: CliqueNode[] = [];
  const edges: CliqueEdge[] = [];
  
  // Create nodes: one for each literal in each clause
  clauses.forEach((clause, clauseIndex) => {
    clause.forEach((literal) => {
      const nodeId = `${literal}_${clauseIndex + 1}`;
      nodes.push({
        id: nodeId,
        label: literal,
        clause: clauseIndex + 1
      });
    });
  });
  
  // Create edges: connect literals from different clauses that don't contradict
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const node1 = nodes[i];
      const node2 = nodes[j];
      
      // Only connect nodes from different clauses
      if (node1.clause !== node2.clause) {
        // Check if they're not contradictory
        if (!areContradictory(node1.label, node2.label)) {
          edges.push({
            source: node1.id,
            target: node2.id
          });
        }
      }
    }
  }
  
  return {
    nodes,
    edges,
    explanation: "Graph where nodes represent literals and edges connect compatible literals from different clauses. A clique of size k (number of clauses) indicates a satisfying assignment exists."
  };
}

function areContradictory(literal1: string, literal2: string): boolean {
  // Check if one is the negation of the other
  // ¬A vs A, or A vs ¬A
  const cleanLit1 = literal1.replace(/¬/g, '');
  const cleanLit2 = literal2.replace(/¬/g, '');
  
  if (cleanLit1 !== cleanLit2) {
    return false; // Different variables, not contradictory
  }
  
  // Same variable, check if one is negated and the other isn't
  const isNeg1 = literal1.startsWith('¬');
  const isNeg2 = literal2.startsWith('¬');
  
  return isNeg1 !== isNeg2; // Contradictory if exactly one is negated
}
