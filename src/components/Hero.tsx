import { BookOpen, Brain, Network } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center text-white animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 backdrop-blur-sm p-4 border border-white/20">
              <Brain className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            NP-Completeness Visualizer
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Explore the fascinating world of computational complexity through interactive visualizations
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <BookOpen className="h-8 w-8 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Learn SAT</h3>
              <p className="text-sm text-white/80">
                Understand Boolean satisfiability problems and their significance
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Network className="h-8 w-8 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">See 3-CNF</h3>
              <p className="text-sm text-white/80">
                Watch formulas transform into 3-conjunctive normal form
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Brain className="h-8 w-8 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Visualize Clique</h3>
              <p className="text-sm text-white/80">
                Explore graph representations and clique problem reductions
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero;
