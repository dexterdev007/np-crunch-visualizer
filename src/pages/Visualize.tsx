import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StepVisualizer from "@/components/StepVisualizer";
import { ReductionData } from "@/types/reduction";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Visualize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reductionData = location.state?.reductionData as ReductionData | null;

  useEffect(() => {
    if (!reductionData) {
      navigate("/");
    }
  }, [reductionData, navigate]);

  if (!reductionData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Input
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <StepVisualizer data={reductionData} />
    </div>
  );
};

export default Visualize;
