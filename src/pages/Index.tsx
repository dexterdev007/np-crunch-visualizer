import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FormulaInput from "@/components/FormulaInput";
import { toast } from "sonner";
import { processFormula } from "@/utils/satReduction";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormulaSubmit = async (formula: string) => {
    setIsLoading(true);
    
    try {
      const data = processFormula(formula);
      toast.success("Formula processed successfully!");
      navigate("/visualize", { state: { reductionData: data } });
    } catch (error) {
      console.error('Error processing formula:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process formula');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FormulaInput onSubmit={handleFormulaSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Index;
