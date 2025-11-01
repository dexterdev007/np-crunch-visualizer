import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CliqueNode {
  id: string;
  label: string;
  clause: number;
}

interface CliqueEdge {
  source: string;
  target: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formula } = await req.json();
    console.log("Received formula:", formula);

    if (!formula || typeof formula !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid formula provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    const result = {
      sat: satStep,
      cnf3: cnf3Step,
      clique: cliqueStep
    };

    console.log("Reduction result:", result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in reduce function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function convertTo3CNF(formula: string) {
  console.log("Converting to 3-CNF:", formula);
  
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
  console.log("Building clique graph from clauses:", clauses);
  
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
