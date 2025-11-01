import { Card } from "@/components/ui/card";
import { CNF3Step } from "@/types/reduction";
import { ListTree } from "lucide-react";

interface CNF3ViewProps {
  data: CNF3Step;
}

const CNF3View = ({ data }: CNF3ViewProps) => {
  return (
    <Card className="p-8 shadow-card animate-slide-in-right">
      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-lg bg-secondary/10 p-3">
          <ListTree className="h-6 w-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            3-CNF Conversion
          </h3>
          <p className="text-muted-foreground">
            {data.explanation}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.clauses.map((clause, index) => (
          <div 
            key={index}
            className="bg-gradient-card rounded-lg p-6 border-2 border-secondary/20 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Clause {index + 1}
              </span>
              <div className="flex gap-3 text-xl font-mono font-bold text-secondary">
                {clause.map((literal, i) => (
                  <span key={i}>
                    {literal}
                    {i < clause.length - 1 && (
                      <span className="mx-2 text-muted-foreground font-normal">∨</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">What is 3-CNF?</h4>
        <p className="text-sm text-muted-foreground">
          3-Conjunctive Normal Form (3-CNF) is a standardized format where a formula is expressed 
          as a conjunction (AND) of clauses, where each clause is a disjunction (OR) of exactly 
          three literals. Any SAT formula can be converted to 3-CNF in polynomial time.
        </p>
      </div>
    </Card>
  );
};

export default CNF3View;
