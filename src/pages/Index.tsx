import { useState } from "react";
import Hero from "@/components/Hero";
import FormulaInput from "@/components/FormulaInput";
import StepVisualizer from "@/components/StepVisualizer";
import { ReductionData } from "@/types/reduction";

const Index = () => {
  const [reductionData, setReductionData] = useState<ReductionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormulaSubmit = async (formula: string) => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call to edge function
    // For now, using mock data
    setTimeout(() => {
      const mockData: ReductionData = {
        sat: {
          formula: formula,
          explanation: "Original SAT formula in disjunctive normal form"
        },
        cnf3: {
          clauses: [
            ["A", "B", "C"],
            ["¬A", "B", "D"],
            ["¬C", "¬D", "E"]
          ],
          explanation: "Converted to 3-CNF with exactly 3 literals per clause"
        },
        clique: {
          nodes: [
            { id: "A₁", label: "A", clause: 1 },
            { id: "B₁", label: "B", clause: 1 },
            { id: "C₁", label: "C", clause: 1 },
            { id: "¬A₂", label: "¬A", clause: 2 },
            { id: "B₂", label: "B", clause: 2 },
            { id: "D₂", label: "D", clause: 2 },
            { id: "¬C₃", label: "¬C", clause: 3 },
            { id: "¬D₃", label: "¬D", clause: 3 },
            { id: "E₃", label: "E", clause: 3 }
          ],
          edges: [
            { source: "A₁", target: "B₂" },
            { source: "A₁", target: "D₂" },
            { source: "A₁", target: "¬C₃" },
            { source: "A₁", target: "¬D₃" },
            { source: "A₁", target: "E₃" },
            { source: "B₁", target: "¬A₂" },
            { source: "B₁", target: "D₂" },
            { source: "C₁", target: "¬A₂" },
            { source: "C₁", target: "B₂" },
            { source: "C₁", target: "D₂" }
          ],
          explanation: "Graph where nodes are literals and edges connect compatible literals from different clauses"
        }
      };
      setReductionData(mockData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FormulaInput onSubmit={handleFormulaSubmit} isLoading={isLoading} />
      {reductionData && <StepVisualizer data={reductionData} />}
    </div>
  );
};

export default Index;
