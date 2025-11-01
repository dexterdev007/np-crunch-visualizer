import { useState } from "react";
import { ReductionData } from "@/types/reduction";
import { Button } from "@/components/ui/button";
import { Play, SkipForward } from "lucide-react";
import SATView from "@/components/steps/SATView";
import CNF3View from "@/components/steps/CNF3View";
import CliqueView from "@/components/steps/CliqueView";

interface StepVisualizerProps {
  data: ReductionData;
}

const StepVisualizer = ({ data }: StepVisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = ["SAT", "3-CNF", "Clique"];

  const handlePlayAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setCurrentStep(step);
      }
    }, 2500);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Reduction Steps
            </h2>
            <p className="text-muted-foreground">
              Follow the transformation from SAT to Clique problem
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handlePlayAnimation}
              disabled={isAnimating}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="mr-2 h-4 w-4" />
              Play Animation
            </Button>
            <Button 
              onClick={handleNextStep}
              disabled={currentStep >= steps.length - 1 || isAnimating}
              variant="outline"
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Next Step
            </Button>
          </div>
        </div>

        {/* Step indicators */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => !isAnimating && setCurrentStep(index)}
                    disabled={isAnimating}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      index === currentStep
                        ? "bg-primary text-primary-foreground animate-pulse-glow scale-110"
                        : index < currentStep
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </button>
                  <span className={`mt-2 text-sm font-medium ${
                    index === currentStep ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    index < currentStep ? "bg-secondary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="animate-fade-in">
          {currentStep === 0 && <SATView data={data.sat} />}
          {currentStep === 1 && <CNF3View data={data.cnf3} />}
          {currentStep === 2 && <CliqueView data={data.clique} />}
        </div>
      </div>
    </section>
  );
};

export default StepVisualizer;
