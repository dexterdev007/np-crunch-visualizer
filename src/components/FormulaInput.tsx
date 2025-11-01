import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";

interface FormulaInputProps {
  onSubmit: (formula: string) => void;
  isLoading: boolean;
}

const FormulaInput = ({ onSubmit, isLoading }: FormulaInputProps) => {
  const [formula, setFormula] = useState("(A OR B) AND (NOT A OR C)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formula.trim()) {
      toast.error("Please enter a Boolean formula");
      return;
    }
    
    onSubmit(formula);
  };

  const exampleFormulas = [
    "(A OR B) AND (NOT A OR C)",
    "(X OR Y OR Z) AND (NOT X OR W)",
    "(P OR Q) AND (NOT P OR R) AND (NOT Q OR R)"
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 shadow-card animate-fade-in">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Enter a Boolean Formula
            </h2>
            <p className="text-muted-foreground">
              Input a SAT formula and watch it transform through 3-CNF to a Clique problem
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g., (A OR B) AND (NOT A OR C)"
                className="flex-1 text-lg h-12"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="h-12 px-8 bg-accent hover:bg-accent/90"
              >
                {isLoading ? "Processing..." : "Visualize"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Syntax Guide:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Use OR, AND for operators</li>
                  <li>• Use NOT for negation</li>
                  <li>• Use parentheses for grouping</li>
                  <li>• Variables: A-Z (case-sensitive)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleFormulas.map((example, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFormula(example)}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default FormulaInput;
