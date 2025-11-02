import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FormulaInput from "@/components/FormulaInput";
import { ReductionData } from "@/types/reduction";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
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
