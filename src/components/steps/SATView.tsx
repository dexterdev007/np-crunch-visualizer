import { Card } from "@/components/ui/card";
import { SATStep } from "@/types/reduction";
import { FileText } from "lucide-react";

interface SATViewProps {
  data: SATStep;
}

const SATView = ({ data }: SATViewProps) => {
  return (
    <Card className="p-8 shadow-card animate-slide-in-right">
      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-lg bg-primary/10 p-3">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            SAT Formula
          </h3>
          <p className="text-muted-foreground">
            {data.explanation}
          </p>
        </div>
      </div>

      <div className="bg-gradient-card rounded-lg p-8 border-2 border-primary/20">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Boolean Formula
          </p>
          <div className="text-3xl font-mono font-bold text-primary">
            {data.formula}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">What is SAT?</h4>
        <p className="text-sm text-muted-foreground">
          The Boolean Satisfiability Problem (SAT) asks whether there exists an assignment of 
          truth values to variables that makes the entire formula true. SAT was the first problem 
          proven to be NP-complete, making it a cornerstone of computational complexity theory.
        </p>
      </div>
    </Card>
  );
};

export default SATView;
