"use client";

const chapters = [
  {
    title: "GPU infrastructure",
    text: "NVIDIA H100 and H200 clusters engineered for LLM training, inference and HPC. Liquid-cooled, high-density, built for scale — from single-node inference appliances to multi-rack HGX fabrics.",
  },
  {
    title: "InfiniBand fabric",
    text: "Lossless, low-latency 400G interconnects between GPU nodes. Distributed training across multi-node clusters with the bandwidth and determinism AI workloads demand.",
  },
  {
    title: "High-bandwidth storage",
    text: "All-flash storage tiers tuned to GPU pipelines. GPUDirect integration eliminates storage bottlenecks in AI training — feeding data to the GPU at the speed it can consume.",
  },
  {
    title: "Hybrid AI cloud",
    text: "Train on-premises with H100 clusters. Burst to Azure or HPE GreenLake when capacity demands. Keep sensitive data sovereign across a hybrid AI fabric.",
  },
  {
    title: "AI model serving",
    text: "ML/Ops platforms with distributed training, model serving, experiment tracking and pipeline automation.",
  },
  {
    title: "AI security & governance",
    text: "Model governance, data lineage and secure MLOps. AI workloads protected by the KABO SOC with 24/7 monitoring — accountable from dataset to deployment.",
  },
];
const useCases = [
  ["LLM training", "Large language model training on GPU clusters"],
  ["Computer vision", "Real-time video analytics and image recognition"],
  ["Predictive analytics", "Equipment failure prediction and maintenance"],
  ["Edge AI inference", "On-device AI processing at remote sites"],
  ["Healthcare diagnostics", "AI-assisted radiology and medical imaging"],
  ["Smart city analytics", "Traffic, safety and urban intelligence"],
  ["Fraud detection", "Real-time financial transaction analysis"],
  ["Document intelligence", "OCR, classification and workflow automation"],
];

export function IntelligenceBrief() {
  return (
    <section className="e-intelligence-brief">
      <div className="e-catalog__container">
        <span className="e-catalog__eyebrow">THE FULL AI PLATFORM</span>
        <h2>
          From the first dataset
          <br />
          to the next decision.
        </h2>
        <p className="e-intelligence-intro">
          KABO builds the GPU fabric, storage tiers and MLOps plane that put
          African enterprise inside the AI era. The infrastructure, the
          operating model and the governance are engineered together.
        </p>
        <div className="e-intelligence-grid">
          {chapters.map((chapter, i) => (
            <article key={chapter.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.text}</p>
            </article>
          ))}
        </div>
        <div className="e-pipeline" aria-label="AI operating pipeline">
          {["Data", "Train", "Validate", "Deploy", "Infer", "Monitor"].map(
            (stage, i) => (
              <span key={stage}>
                <small>0{i + 1}</small>
                {stage}
                <i aria-hidden="true">↗</i>
              </span>
            ),
          )}
        </div>
        <h3 className="e-use-case-heading">
          Intelligence applied to your world.
        </h3>
        <div className="e-use-cases">
          {useCases.map(([title, text]) => (
            <div key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
