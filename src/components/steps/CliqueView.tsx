import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { CliqueStep } from "@/types/reduction";
import { Network } from "lucide-react";
import cytoscape from "cytoscape";

interface CliqueViewProps {
  data: CliqueStep;
}

const CliqueView = ({ data }: CliqueViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data.nodes.length) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...data.nodes.map(node => ({
          data: { 
            id: node.id, 
            label: node.label,
            clause: node.clause
          }
        })),
        ...data.edges.map((edge, i) => ({
          data: { 
            id: `e${i}`, 
            source: edge.source, 
            target: edge.target 
          }
        }))
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'hsl(217, 91%, 35%)',
            'label': 'data(label)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '14px',
            'font-weight': 'bold',
            'width': '50px',
            'height': '50px',
            'border-width': '3px',
            'border-color': 'hsl(197, 71%, 48%)',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'hsl(197, 71%, 48%)',
            'opacity': 0.6,
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'background-color': 'hsl(27, 96%, 61%)',
            'border-color': 'hsl(27, 96%, 51%)',
          }
        }
      ],
      layout: {
        name: 'circle',
        animate: true,
        animationDuration: 1000,
        padding: 50
      }
    });

    // Add interactivity
    cy.on('tap', 'node', function(evt) {
      const node = evt.target;
      const connectedEdges = node.connectedEdges();
      const connectedNodes = connectedEdges.connectedNodes();
      
      // Highlight connected elements
      cy.elements().removeClass('highlighted');
      node.addClass('highlighted');
      connectedNodes.addClass('highlighted');
      connectedEdges.addClass('highlighted');
    });

    return () => {
      cy.destroy();
    };
  }, [data]);

  return (
    <Card className="p-8 shadow-card animate-slide-in-right">
      <div className="flex items-start gap-4 mb-6">
        <div className="rounded-lg bg-accent/10 p-3">
          <Network className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Clique Graph
          </h3>
          <p className="text-muted-foreground">
            {data.explanation}
          </p>
        </div>
      </div>

      <div className="bg-gradient-card rounded-lg border-2 border-accent/20 overflow-hidden">
        <div 
          ref={containerRef} 
          className="w-full h-[500px]"
        />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-secondary" />
            Nodes
          </h4>
          <p className="text-sm text-muted-foreground">
            Each node represents a literal from a clause. Nodes are colored by their source clause 
            and labeled with the literal they represent.
          </p>
        </div>
        
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <div className="w-4 h-1 bg-secondary" />
            Edges
          </h4>
          <p className="text-sm text-muted-foreground">
            Edges connect literals from different clauses that don't contradict each other 
            (e.g., A and ¬A cannot both be true).
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold text-foreground mb-2">What is the Clique Problem?</h4>
        <p className="text-sm text-muted-foreground">
          A clique of size k in this graph corresponds to a satisfying assignment for the 3-CNF formula. 
          Finding a clique of size k (where k is the number of clauses) proves the original SAT formula 
          is satisfiable. This reduction shows that 3-SAT and Clique are equally hard problems.
        </p>
      </div>
    </Card>
  );
};

export default CliqueView;
