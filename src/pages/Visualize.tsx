import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import StepVisualizer from "@/components/StepVisualizer";
import { ReductionData } from "@/types/reduction";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Input
        </Button>
      </div>
      <StepVisualizer data={reductionData} />
    </div>
  );
};

export default Visualize;
