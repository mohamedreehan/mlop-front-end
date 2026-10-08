import axios from "axios";

// ============================================================
// API BASE URL
// ============================================================

// Settings page se saved URL use hoga.
// Agar saved URL nahi hai, localhost:8000 default rahega.
const savedBaseURL =
  localStorage.getItem("spam_api_base_url") ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

// Axios instance
export const api = axios.create({
  baseURL: savedBaseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// UPDATE API BASE URL
// ============================================================

export function setApiBaseURL(url) {
  const cleanUrl = String(url || "").trim().replace(/\/+$/, "");

  if (!cleanUrl) {
    throw new Error("API base URL cannot be empty.");
  }

  localStorage.setItem("spam_api_base_url", cleanUrl);
  api.defaults.baseURL = cleanUrl;

  return cleanUrl;
}

// ============================================================
// GET CURRENT API BASE URL
// ============================================================

export function getApiBaseURL() {
  return api.defaults.baseURL;
}

// ============================================================
// EMAIL PREDICTION
// ============================================================

export async function predictEmail({
  subject = "",
  body = "",
}) {
  const message = `${subject}\n${body}`.trim();

  if (!message) {
    throw new Error(
      "Please enter an email subject or body."
    );
  }

  try {
    const response = await api.post("/predict", {
      message,
    });

    const data = response.data;

    if (!data?.success) {
      throw new Error(
        data?.error ||
          "Prediction failed."
      );
    }

    return {
      ...data,

      prediction:
        data.prediction || "",

      confidence: Number(
        data.confidence ?? 0
      ),

      indicators:
        data.indicators || [],

      mlPrediction:
        data.ml_prediction ||
        data.mlPrediction ||
        "",

      spamPatternScore: Number(
        data.spam_pattern_score ??
          data.spamPatternScore ??
          0
      ),
    };

  } catch (error) {
    if (error?.response) {
      throw new Error(
        error.response.data?.error ||
          `Prediction failed (${error.response.status}).`
      );
    }

    if (error?.code === "ECONNABORTED") {
      throw new Error(
        "Request timed out. Please try again."
      );
    }

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Backend is not connected. Please start the Flask API."
      );
    }

    throw error;
  }
}

// ============================================================
// HEALTH CHECK
// ============================================================

export async function getHealth() {
  try {
    const response =
      await api.get("/health");

    return response.data;

  } catch (error) {
    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Backend is unavailable."
      );
    }

    throw error;
  }
}

// ============================================================
// BATCH PREDICTION
// ============================================================

export async function predictBatch(file) {

  if (!file) {
    throw new Error(
      "Please select a CSV file first."
    );
  }

  // File type validation
  const fileName =
    file.name?.toLowerCase() || "";

  if (!fileName.endsWith(".csv")) {
    throw new Error(
      "Only CSV files are supported."
    );
  }

  // 50 MB limit
  const maxSize =
    50 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error(
      "File size must be 50 MB or less."
    );
  }

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  try {

    const response =
      await api.post(
        "/batch/predict",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
          timeout: 120000,
        }
      );

    const data =
      response.data;

    if (!data?.success) {
      throw new Error(
        data?.error ||
          "Batch prediction failed."
      );
    }

    return {
      ...data,

      success: true,

      total: Number(
        data.total ?? 0
      ),

      spam: Number(
        data.spam ?? 0
      ),

      ham: Number(
        data.ham ?? 0
      ),

      averageConfidence:
        Number(
          data.average_confidence ??
            data.averageConfidence ??
            0
        ),

      predictions:
        data.predictions ||
        data.results ||
        [],
    };

  } catch (error) {

    if (error?.response) {
      throw new Error(
        error.response.data?.error ||
          `Batch prediction failed (${error.response.status}).`
      );
    }

    if (
      error?.code ===
        "ECONNABORTED"
    ) {
      throw new Error(
        "Batch request timed out. Please try a smaller CSV file."
      );
    }

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Backend is not connected. Please start the Flask API."
      );
    }

    throw error;
  }
}

// ============================================================
// DATASET INFORMATION
// ============================================================

export async function getDatasetInfo() {

  try {

    const response =
      await api.get("/dataset");

    const data =
      response.data;

    if (!data?.success) {
      throw new Error(
        data?.error ||
          "Failed to load dataset."
      );
    }

    return {
      ...data,

      columns:
        data.columns ||
        [
          data.label_column ||
            "v1",
          data.text_column ||
            "v2",
        ],

      totalSamples: Number(
        data.total_samples ??
          data.totalSamples ??
          0
      ),

      spamCount: Number(
        data.spam_count ??
          data.spamCount ??
          0
      ),

      hamCount: Number(
        data.ham_count ??
          data.hamCount ??
          0
      ),

      labelColumn:
        data.label_column ||
        data.labelColumn ||
        "v1",

      textColumn:
        data.text_column ||
        data.textColumn ||
        "v2",
    };

  } catch (error) {

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Unable to connect to the dataset API."
      );
    }

    if (error?.response) {
      throw new Error(
        error.response.data?.error ||
          `Failed to load dataset (${error.response.status}).`
      );
    }

    throw error;
  }
}

// ============================================================
// MODEL METRICS
// ============================================================

export async function getMetrics() {

  try {

    const response =
      await api.get("/metrics");

    const data =
      response.data;

    if (!data?.success) {
      throw new Error(
        data?.error ||
          "Failed to load metrics."
      );
    }

    return {
      ...data,

      accuracy: Number(
        data.accuracy ?? 0
      ),

      precision: Number(
        data.precision ?? 0
      ),

      recall: Number(
        data.recall ?? 0
      ),

      f1: Number(
        data.f1 ?? 0
      ),

      samples: Number(
        data.samples ?? 0
      ),

      trainingSamples:
        Number(
          data.training_samples ??
            data.trainingSamples ??
            0
        ),

      testingSamples:
        Number(
          data.testing_samples ??
            data.testingSamples ??
            0
        ),

      model:
        data.model || {},

      classificationReport:
        data.classification_report ||
        data.classificationReport ||
        {},

      confusionMatrix:
        data.confusion_matrix ||
        data.confusionMatrix ||
        [],
    };

  } catch (error) {

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Unable to connect to the metrics API."
      );
    }

    if (error?.response) {
      throw new Error(
        error.response.data?.error ||
          `Failed to load metrics (${error.response.status}).`
      );
    }

    throw error;
  }
}

// ============================================================
// MODEL INFO
// ============================================================

export async function getModelInfo() {

  try {

    const response =
      await api.get("/metrics");

    return response.data;

  } catch (error) {

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Unable to connect to the model API."
      );
    }

    throw error;
  }
}

// ============================================================
// MODEL REGISTRY
// ============================================================

export async function getModelRegistry() {

  try {

    const response =
      await api.get(
        "/model-registry"
      );

    const data =
      response.data;

    if (!data?.success) {
      throw new Error(
        data?.error ||
          "Failed to load model registry."
      );
    }

    return data;

  } catch (error) {

    if (
      error?.code ===
        "ERR_NETWORK" ||
      error?.message ===
        "Network Error"
    ) {
      throw new Error(
        "Model registry is unavailable. Please make sure the Flask backend is running."
      );
    }

    if (error?.response) {
      throw new Error(
        error.response.data?.error ||
          `Model registry request failed (${error.response.status}).`
      );
    }

    throw error;
  }
}

// ============================================================
// BACKEND CONNECTION CHECK
// ============================================================

export async function checkBackend() {

  try {

    const data =
      await getHealth();

    return (
      data?.status ===
      "healthy"
    );

  } catch {

    return false;

  }
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;