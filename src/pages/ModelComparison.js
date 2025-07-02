import React from "react";
import ModelComparisonWidget from "../components/ModelComparison";

export default function ModelComparisonPage({ forecast }) {
  return (
    <div>
      <h2 className="mb-3">Weather Model Comparison</h2>
      <ModelComparisonWidget forecast={forecast} />
      <p className="mt-3 text-muted">Compare global weather models side-by-side.</p>
    </div>
  );
}
