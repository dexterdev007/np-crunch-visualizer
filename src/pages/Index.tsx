import { useState } from "react";
import Hero from "@/components/Hero";
import FormulaInput from "@/components/FormulaInput";
import StepVisualizer from "@/components/StepVisualizer";
import { ReductionData } from "@/types/reduction";
import { toast } from "sonner";

const Index = () => {
  const [reductionData, setReductionData] = useState<ReductionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormulaSubmit = async (formula: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reduce`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formula })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process formula');
      }

      const data: ReductionData = await response.json();
      setReductionData(data);
      toast.success("Formula processed successfully!");
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
      {reductionData && <StepVisualizer data={reductionData} />}
    </div>
  );
};

export default Index;
