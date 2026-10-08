# SpamShield AI — Advanced Email Spam Detection Frontend

A production-style React + Vite frontend for an Email Spam Detection / MLOps project.

## Included modules

- Overview dashboard
- Single Email Analyzer
- Batch CSV/XLSX Detection
- Dataset & Data Preparation
- ML Model Lab
- MLOps Pipeline
- Initial Results
- Monitoring
- Challenges & Solutions
- Settings / API connection

## Rubric coverage

The UI directly maps to the project-review rubric:

1. System Architecture
2. Technology Stack / project infrastructure
3. Dataset & Data Preparation
4. ML Model — algorithm, architecture, training, metrics
5. MLOps Pipeline — data → processing → training → registry → deployment → monitoring
6. Initial Results — metrics, observations, sample predictions, confusion matrix
7. Challenges & Solutions
8. Implementation Progress
9. Deployment / monitoring readiness

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Open the URL printed by Vite, normally:

http://localhost:5173

## Backend integration

Set:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

The frontend expects these optional endpoints:

- `POST /predict`
  - body: `{ "subject": "...", "body": "..." }`
- `POST /batch/predict`
  - multipart field: `file`
- `GET /health`

If the prediction API is unavailable, the single-email analyzer uses a small local demo fallback so the UI can still be demonstrated.

## Important

Replace the demo metric values, dataset size, algorithm name and sample outputs in `src/data.js` with your actual trained-model results before final submission/demo. The UI is intentionally structured so those values are centralized and easy to update.
