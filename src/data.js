export const dashboardMetrics = {
  accuracy: 97.8,
  precision: 96.9,
  recall: 95.7,
  f1: 96.3,
  samples: 55000,
  latency: 84,
  drift: 3.2
};

export const modelInfo = {
  name: "SpamShield Classification Model",
  version: "v1.4.0",
  status: "Production",
  algorithm: "TF-IDF + Logistic Regression",
  framework: "scikit-learn",
  trainedAt: "2026-09-30 18:42",
  datasetVersion: "dataset-v3.2",
  threshold: 0.50
};

export const pipeline = [
  { id: 1, title: "Data Source", detail: "Public spam / ham email corpus", state: "done" },
  { id: 2, title: "Data Processing", detail: "Cleaning, tokenization & vectorization", state: "done" },
  { id: 3, title: "Model Development", detail: "Feature engineering & model selection", state: "done" },
  { id: 4, title: "Model Training", detail: "Train / validation / test workflow", state: "done" },
  { id: 5, title: "Model Registry", detail: "Versioned model artifacts", state: "done" },
  { id: 6, title: "Deployment", detail: "REST inference service", state: "done" },
  { id: 7, title: "Monitoring", detail: "Latency, drift & prediction quality", state: "active" }
];

export const metricTrend = [
  { name: "Jan", accuracy: 94.2, f1: 92.8 },
  { name: "Feb", accuracy: 95.1, f1: 93.9 },
  { name: "Mar", accuracy: 95.8, f1: 94.7 },
  { name: "Apr", accuracy: 96.4, f1: 95.1 },
  { name: "May", accuracy: 96.8, f1: 95.8 },
  { name: "Jun", accuracy: 97.2, f1: 96.0 },
  { name: "Jul", accuracy: 97.5, f1: 96.2 },
  { name: "Aug", accuracy: 97.7, f1: 96.4 },
  { name: "Sep", accuracy: 97.8, f1: 96.3 }
];

export const volumeTrend = [
  { name: "Mon", spam: 310, ham: 890 },
  { name: "Tue", spam: 420, ham: 1030 },
  { name: "Wed", spam: 380, ham: 970 },
  { name: "Thu", spam: 510, ham: 1110 },
  { name: "Fri", spam: 460, ham: 990 },
  { name: "Sat", spam: 250, ham: 620 },
  { name: "Sun", spam: 210, ham: 570 }
];

export const predictions = [
  { id: "EML-10482", subject: "You have won a free iPhone!", label: "Spam", confidence: 99.2, time: "10:41:18" },
  { id: "EML-10481", subject: "Meeting moved to 3 PM", label: "Ham", confidence: 98.1, time: "10:39:42" },
  { id: "EML-10480", subject: "URGENT: claim your cash reward", label: "Spam", confidence: 99.7, time: "10:38:09" },
  { id: "EML-10479", subject: "Your Amazon order has shipped", label: "Ham", confidence: 97.4, time: "10:36:27" },
  { id: "EML-10478", subject: "Exclusive loan offer — apply now", label: "Spam", confidence: 98.8, time: "10:34:51" }
];

export const challenges = [
  ["Data Quality", "Duplicate, noisy and inconsistent email text can reduce model reliability.", "Implemented text cleaning, duplicate handling and validation checks."],
  ["Class Imbalance", "Spam and legitimate messages may not be evenly distributed.", "Tracked class distribution and used stratified splitting / class-aware evaluation."],
  ["Feature Drift", "Spam patterns and vocabulary evolve over time.", "Added monitoring for input drift and scheduled retraining readiness."],
  ["False Positives", "Legitimate messages incorrectly flagged as spam can hurt user trust.", "Expose confidence, threshold controls and precision/recall monitoring."]
];
