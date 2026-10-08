
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BrainCircuit,
  ChevronRight,
  CircleHelp,
  Database,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Mail,
  Menu,
  Moon,
  Play,
  Radar,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  UploadCloud,
  X,
  Zap,
} from "lucide-react";

import { predictions, challenges } from "./data";

import {
  predictEmail,
  predictBatch,
  getDatasetInfo,
  getMetrics,
  getHealth,
  getModelRegistry,
  getApiBaseURL,
  setApiBaseURL,
} from "./api";


// ============================================================
// NAVIGATION
// ============================================================

const nav = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/analyzer",
    label: "Email Analyzer",
    icon: Mail,
  },
  {
    to: "/batch",
    label: "Batch Detection",
    icon: UploadCloud,
  },
  {
    to: "/dataset",
    label: "Dataset & Prep",
    icon: Database,
  },
  {
    to: "/model",
    label: "Model Lab",
    icon: BrainCircuit,
  },
  {
    to: "/mlops",
    label: "MLOps Pipeline",
    icon: GitBranch,
  },
  {
    to: "/results",
    label: "Initial Results",
    icon: BarChart3,
  },
  {
    to: "/monitoring",
    label: "Monitoring",
    icon: Radar,
  },
  {
    to: "/challenges",
    label: "Challenges",
    icon: AlertTriangle,
  },
];


// ============================================================
// SHELL
// ============================================================

function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { title: "Model is live", text: "LinearSVC production model is healthy.", time: "Now" },
    { title: "Monitoring active", text: "API and model endpoints are operational.", time: "5 min ago" },
    { title: "Dataset ready", text: "5,169 cleaned samples available.", time: "18 min ago" },
  ];

  const location = useLocation();

  const page =
    nav.find((item) => item.to === location.pathname)?.label ||
    "Overview";

  return (
    <div className={dark ? "app dark" : "app"}>

      <aside className={`sidebar ${open ? "open" : ""}`}>

        <div className="brand">

          <div className="brand-mark">
            <ShieldCheck size={23} />
          </div>

          <div>
            <div className="brand-name">
              SpamShield<span> AI</span>
            </div>

            <div className="brand-sub">
              ML Operations Console
            </div>
          </div>

          <button
            className="icon-btn mobile-only"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>

        </div>


        <div className="workspace">

          <div className="workspace-dot"></div>

          <div>
            <b>Spam Detection</b>
            <small>Production workspace</small>
          </div>

          <ChevronRight size={16} className="muted" />

        </div>


        <div className="nav-label">
          WORKSPACE
        </div>


        <nav>

          {nav.map(({ to, label, icon: Icon }) => (

            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >

              <Icon size={18} />

              <span>{label}</span>

              {label === "Monitoring" && (
                <span className="nav-live"></span>
              )}

            </NavLink>

          ))}

        </nav>


        <div className="nav-label">
          SYSTEM
        </div>


        <nav>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>


          <a
            className="nav-item"
            href="#help"
          >
            <CircleHelp size={18} />
            <span>Documentation</span>
          </a>

        </nav>


        <div className="sidebar-bottom">

          <div className="system-card">

            <div className="status-row">

              <span className="pulse"></span>

              <b>All systems operational</b>

            </div>

            <small>
              API · Model · Pipeline
            </small>

          </div>


          <div className="profile">

            <div className="avatar">
              MS
            </div>

            <div>
              <b>ML Engineer</b>
              <small>Admin workspace</small>
            </div>

            <Bell
              size={16}
              className="muted"
            />

          </div>

        </div>

      </aside>


      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}


      <main className="main">

        <header className="topbar">

          <div className="top-left">

            <button
              className="icon-btn mobile-only"
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>


            <div>

              <span className="eyebrow">
                ML OPERATIONS
              </span>

              <h1>{page}</h1>

            </div>

          </div>


          <div className="top-actions">

            <div className="searchbox">

              <Search size={16} />

              <input
                placeholder="Search project..."
              />

            </div>


            <button
              className="icon-btn"
              onClick={() =>
                setDark((value) => !value)
              }
            >

              {dark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}

            </button>


            <div style={{ position: "relative" }}>

              <button
                className="icon-btn"
                onClick={() => setNotificationsOpen((value) => !value)}
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={18} />
                <i className="notification-dot"></i>
              </button>

              {notificationsOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, width: 340, maxWidth: "calc(100vw - 32px)", background: "#171820", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, boxShadow: "0 20px 55px rgba(0,0,0,0.45)", zIndex: 1000, overflow: "hidden" }}>
                  <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#f5f7ff" }}>Notifications</div>
                      <div style={{ fontSize: 12, color: "#8f93a7", marginTop: 3 }}>System activity & alerts</div>
                    </div>
                    <span style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, background: "rgba(124,92,255,0.15)", color: "#a78bfa" }}>3 new</span>
                  </div>

                  {notifications.map((item) => (
                    <div key={item.title} style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 12 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", marginTop: 5, flex: "0 0 auto", background: "#69e6a7" }} />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <b style={{ fontSize: 13, color: "#eef0f8" }}>{item.title}</b>
                          <span style={{ fontSize: 10, color: "#777b90", whiteSpace: "nowrap" }}>{item.time}</span>
                        </div>
                        <p style={{ margin: "5px 0 0", fontSize: 12, lineHeight: 1.45, color: "#969aaf" }}>{item.text}</p>
                      </div>
                    </div>
                  ))}

                  <button onClick={() => setNotificationsOpen(false)} style={{ width: "100%", border: 0, background: "transparent", color: "#a78bfa", padding: "13px 16px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
                    Close notifications
                  </button>
                </div>
              )}

            </div>

            <div className="model-chip">

              <span className="pulse"></span>

              LinearSVC

              <ChevronRight size={14} />

            </div>

          </div>

        </header>


        <div className="content">
          {children}
        </div>

      </main>

    </div>
  );
}


// ============================================================
// PAGE HEADER
// ============================================================

function PageHeader({
  title,
  subtitle,
  action,
}) {

  return (

    <div className="page-header">

      <div>

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

      {action}

    </div>

  );
}


// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({
  label,
  value,
  suffix = "",
  change,
  icon: Icon,
  tone = "",
}) {

  return (

    <div className="metric-card">

      <div className={`metric-icon ${tone}`}>
        <Icon size={19} />
      </div>


      <div className="metric-info">

        <span>{label}</span>

        <strong>
          {value}
          {suffix}
        </strong>

        <small>{change}</small>

      </div>

    </div>

  );
}


// ============================================================
// SECTION
// ============================================================

function Section({
  title,
  action,
  children,
}) {

  return (

    <section className="panel">

      <div className="panel-head">

        <div>
          <h3>{title}</h3>
        </div>

        {action}

      </div>

      {children}

    </section>

  );

}


// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  children,
  tone = "success",
}) {

  return (
    <span className={`badge ${tone}`}>
      {children}
    </span>
  );

}


// ============================================================
// INFO ROWS
// ============================================================

function getFriendlyError(error, fallback = "Something went wrong.") {

  const message =
    error?.message ||
    String(error || "");

  const normalized = message.toLowerCase();

  if (
    normalized.includes("network error") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("err_connection_refused") ||
    normalized.includes("econnrefused") ||
    normalized.includes("timeout")
  ) {
    return "Backend is not reachable. Make sure api_server.py is running on http://localhost:8000.";
  }

  return message || fallback;
}


function InfoRows({ rows }) {

  return (

    <div className="info-rows">

      {rows.map(([key, value]) => (

        <div key={key}>

          <span>{key}</span>

          <b>{value}</b>

        </div>

      ))}

    </div>

  );

}


// ============================================================
// OVERVIEW
// ============================================================

function Overview() {

  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadMetrics = async () => {

      try {

        const { getMetrics } =
          await import("./api");

        const data =
          await getMetrics();

        setMetrics(data);

      } catch (error) {

        console.error(
          "Metrics error:",
          error
        );

        setError(
          getFriendlyError(
            error,
            "Unable to load model metrics."
          )
        );

      } finally {

        setLoading(false);

      }

    };

    loadMetrics();

  }, []);


  const accuracy =
    metrics?.accuracy || 0;

  const precision =
    metrics?.precision || 0;

  const recall =
    metrics?.recall || 0;

  const f1 =
    metrics?.f1 || 0;


  return (

    <>

      <PageHeader
        title="Good morning, ML Engineer 👋"
        subtitle="Here’s the current health of your email spam detection system."
        action={
          <div style={{ display: "flex", gap: "10px" }}>
            {error && (
              <button
                className="btn secondary"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={15} />
                Retry
              </button>
            )}
            <NavLink
              to="/analyzer"
              className="btn primary"
            >
              <Play size={15} />
              Run inference
            </NavLink>
          </div>
        }
      />


      {error && (
        <div className="panel" style={{ marginBottom: "18px", borderColor: "rgba(255,180,80,0.25)" }}>
          <div className="alert-row">
            <span className="alert-icon amber">
              <AlertTriangle size={16} />
            </span>
            <div>
              <b>Unable to load live metrics</b>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="hero-strip">

        <div className="hero-copy">

          <div className="tag">
            <Sparkles size={13} />
            AI MODEL LIVE
          </div>

          <h3>
            SpamShield is protecting your inbox.
          </h3>

          <p>
            Production spam detection model
            is online and connected to the
            Flask inference API.
          </p>

        </div>


        <div className="hero-stat">

          <span>Model accuracy</span>

          <b>
            {loading
              ? "..."
              : `${accuracy}%`}
          </b>

          <small>
            Real evaluation result
          </small>

        </div>


        <div className="hero-stat">

          <span>Test samples</span>

          <b>
            {loading
              ? "..."
              : metrics?.testingSamples || 1034}
          </b>

          <small>
            Holdout evaluation set
          </small>

        </div>

      </div>


      <div className="metric-grid">

        <MetricCard
          label="Accuracy"
          value={
            loading ? "..." : accuracy
          }
          suffix="%"
          change="Actual model result"
          icon={Gauge}
          tone="violet"
        />


        <MetricCard
          label="Precision"
          value={
            loading ? "..." : precision
          }
          suffix="%"
          change="Spam class"
          icon={ShieldCheck}
          tone="blue"
        />


        <MetricCard
          label="Recall"
          value={
            loading ? "..." : recall
          }
          suffix="%"
          change="Spam class"
          icon={Radar}
          tone="cyan"
        />


        <MetricCard
          label="F1 Score"
          value={
            loading ? "..." : f1
          }
          suffix="%"
          change="Spam class"
          icon={Activity}
          tone="green"
        />

      </div>


      <div className="grid-2">

        <Section
          title="Production model"
          action={
            <NavLink
              className="text-link"
              to="/model"
            >
              View model
              <ChevronRight size={14} />
            </NavLink>
          }
        >

          <div className="model-summary">

            <div className="model-logo">
              <BrainCircuit size={27} />
            </div>

            <div className="model-main">

              <h4>
                Email Spam Detection Model
              </h4>

              <p>
                LinearSVC · scikit-learn
              </p>

            </div>

            <StatusBadge>
              ● Production
            </StatusBadge>

          </div>


          <div className="info-grid">

            <div>
              <span>Algorithm</span>
              <b>LinearSVC</b>
            </div>

            <div>
              <span>Features</span>
              <b>TF-IDF</b>
            </div>

            <div>
              <span>Training</span>
              <b>4,135</b>
            </div>

            <div>
              <span>Testing</span>
              <b>1,034</b>
            </div>

          </div>

        </Section>


        <Section
          title="Pipeline health"
          action={
            <NavLink
              className="text-link"
              to="/mlops"
            >
              Open pipeline
              <ChevronRight size={14} />
            </NavLink>
          }
        >

          <div className="pipeline-mini">

            {[
              "Data",
              "Prep",
              "Train",
              "Model",
              "Deploy",
              "Monitor",
            ].map((item, index) => (

              <React.Fragment key={item}>

                <div
                  className={`mini-stage ${
                    index < 5
                      ? "done"
                      : "active"
                  }`}
                >

                  <span>
                    {index < 5
                      ? "✓"
                      : "●"}
                  </span>

                  <small>{item}</small>

                </div>


                {index < 5 && (
                  <div className="mini-line"></div>
                )}

              </React.Fragment>

            ))}

          </div>


          <div className="pipeline-note">

            <span className="pulse"></span>

            <b>Monitoring active</b>

            <span>·</span>

            <span>API connected</span>

          </div>

        </Section>

      </div>


      <div className="grid-2">

        <Section
          title="Recent predictions"
          action={
            <NavLink
              className="text-link"
              to="/results"
            >
              View all
              <ChevronRight size={14} />
            </NavLink>
          }
        >

          <PredictionTable compact />

        </Section>


        <Section title="System snapshot">

          <div className="snapshot">

            <div className="snapshot-row">

              <div>
                <span className="snap-dot green"></span>
                API Service
              </div>

              <StatusBadge>
                Healthy
              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>
                <span className="snap-dot green"></span>
                Model Endpoint
              </div>

              <StatusBadge>
                Healthy
              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>
                <span className="snap-dot green"></span>
                Dataset API
              </div>

              <StatusBadge>
                Available
              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>
                <span className="snap-dot green"></span>
                Metrics API
              </div>

              <StatusBadge>
                Available
              </StatusBadge>

            </div>

          </div>

        </Section>

      </div>

    </>

  );

}


// ============================================================
// PREDICTION TABLE
// ============================================================

function PredictionTable({ compact = false }) {

  const rows = compact
    ? predictions.slice(0, 4)
    : predictions;


  return (

    <div className="table-wrap">

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Prediction</th>
            <th>Confidence</th>
            <th>Time</th>
          </tr>

        </thead>


        <tbody>

          {rows.map((row) => (

            <tr key={row.id}>

              <td className="mono">
                {row.id}
              </td>

              <td className="truncate">
                {row.subject}
              </td>

              <td>

                <StatusBadge
                  tone={
                    row.label === "Spam"
                      ? "danger"
                      : "success"
                  }
                >
                  {row.label}
                </StatusBadge>

              </td>

              <td>
                <b>{row.confidence}%</b>
              </td>

              <td className="muted">
                {row.time}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}


// ============================================================
// EMAIL ANALYZER
// ============================================================

function Analyzer() {

  const [subject, setSubject] =
    useState("");

  const [body, setBody] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  const analyze = async () => {

    if (
      !subject.trim() &&
      !body.trim()
    ) {
      setError("Please enter an email subject or body before detecting spam.");
      return;
    }


    setLoading(true);
    setError("");
    setResult(null);


    try {

      const { predictEmail } =
        await import("./api");


      const data =
        await predictEmail({
          subject,
          body,
        });


      setResult({

        label:
          data.prediction === "SPAM"
            ? "Spam"
            : "Ham",

        confidence:
          Number(
            data.confidence || 0
          ),

        indicators: [

          data.spam_pattern_score > 0
            ? `Spam pattern score: ${data.spam_pattern_score}`
            : null,

          data.spamPatternScore > 0
            ? `Spam pattern score: ${data.spamPatternScore}`
            : null,

          data.ml_prediction
            ? `ML model: ${data.ml_prediction}`
            : null,

          data.mlPrediction
            ? `ML model: ${data.mlPrediction}`
            : null,

        ].filter(Boolean),

      });

    } catch (err) {

      console.error(
        "Prediction error:",
        err
      );

      setError(
        getFriendlyError(
          err,
          "Prediction failed. Please try again."
        )
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <>

      <PageHeader
        title="Email Analyzer"
        subtitle="Run a real-time prediction using the trained LinearSVC model."
      />


      <div className="analyzer-layout">

        <Section
          title="Analyze an email"
          action={
            <span className="tiny-label">
              REAL-TIME INFERENCE
            </span>
          }
        >

          <div className="field">

            <label>Subject</label>

            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Congratulations! You have won..."
            />

          </div>


          <div className="field">

            <label>Email body</label>

            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                if (error) setError("");
              }}
              placeholder="Paste the email content here..."
              rows="12"
            />

          </div>


          {error && (

            <div
              className="alert-row"
              style={{
                marginBottom:
                  "14px",
              }}
            >

              <span className="alert-icon amber">
                <AlertTriangle size={16} />
              </span>

              <div>

                <b>
                  Prediction error
                </b>

                <p>{error}</p>

              </div>

            </div>

          )}


          <div className="composer-footer">

            <span className="muted">
              Content is sent to your local
              Flask inference API.
            </span>


            <button
              className="btn primary"
              onClick={analyze}
              disabled={loading}
            >

              {loading ? (
                <RefreshCw
                  className="spin"
                  size={15}
                />
              ) : (
                <Zap size={15} />
              )}

              {loading
                ? "Analyzing..."
                : "Detect spam"}

            </button>

          </div>

        </Section>


        <Section
          title="Prediction"
          action={
            result ? (
              <StatusBadge
                tone={
                  result.label === "Spam"
                    ? "danger"
                    : "success"
                }
              >
                {result.label}
              </StatusBadge>
            ) : (
              <span className="tiny-label">
                WAITING
              </span>
            )
          }
        >

          {!result ? (

            <div className="empty-state">

              <div className="empty-icon">
                <BrainCircuit size={28} />
              </div>

              <h4>No prediction yet</h4>

              <p>
                Enter an email and run
                inference to see the
                model output.
              </p>

            </div>

          ) : (

            <div className="result-card">

              <div
                className={`result-ring ${
                  result.label === "Spam"
                    ? "danger"
                    : "safe"
                }`}
              >

                <b>
                  {Number(
                    result.confidence
                  ).toFixed(1)}
                  %
                </b>

                <span>confidence</span>

              </div>


              <h3>
                {result.label === "Spam"
                  ? "Likely spam"
                  : "Likely legitimate"}
              </h3>


              <p>
                The trained model
                classified this message
                as{" "}
                <b>{result.label}</b>.
              </p>


              <div className="explain">

                <h4>Signals detected</h4>

                {(
                  result.indicators?.length
                    ? result.indicators
                    : [
                        "No high-risk indicators returned",
                      ]
                ).map((signal) => (

                  <div
                    className="signal"
                    key={signal}
                  >

                    <span>✓</span>

                    {signal}

                  </div>

                ))}

              </div>


              <button
                className="btn secondary full"
                onClick={() =>
                  setResult(null)
                }
              >
                Clear result
              </button>

            </div>

          )}

        </Section>

      </div>

    </>

  );

}


// ============================================================
// BATCH DETECTION
// ============================================================

function Batch() {

  const [file, setFile] =
    useState(null);

  const [running, setRunning] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");


  const run = async () => {

    if (!file) {
      setError("Please select a CSV file before running batch detection.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are supported.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("The CSV file must be smaller than 50 MB.");
      return;
    }


    setRunning(true);
    setError("");
    setResult(null);


    try {
console.log("BATCH BUTTON CLICKED");
      const { predictBatch } =
        await import("./api");


      const data =
        await predictBatch(file);


      console.log(
        "BATCH API RESPONSE:",
        data
      );


      /*
       * Backend may return:
       * {
       *   predictions: [...]
       * }
       *
       * OR:
       *
       * {
       *   results: [...]
       * }
       *
       * OR summary values directly.
       */


      const predictionsList =
        Array.isArray(
          data?.predictions
        )
          ? data.predictions
          : Array.isArray(
              data?.results
            )
          ? data.results
          : [];


      let total =
        predictionsList.length;

      let spam = 0;

      let ham = 0;

      let confidenceTotal = 0;


      predictionsList.forEach(
        (item) => {

          const prediction =
            item?.prediction ??
            item?.label ??
            item?.result ??
            "";


          if (
            String(prediction)
              .toUpperCase() ===
            "SPAM"
          ) {

            spam++;

          } else if (
            String(prediction)
              .toUpperCase() ===
            "HAM"
          ) {

            ham++;

          }


          confidenceTotal +=
            Number(
              item?.confidence || 0
            );

        }
      );


      /*
       * If backend already provides
       * these values, use them.
       */

      if (
        data?.total !== undefined
      ) {

        total =
          Number(data.total);

      }


      if (
        data?.spam !== undefined
      ) {

        spam =
          Number(data.spam);

      }


      if (
        data?.ham !== undefined
      ) {

        ham =
          Number(data.ham);

      }


      let averageConfidence = 0;


      if (
        data?.averageConfidence !==
        undefined
      ) {

        averageConfidence =
          Number(
            data.averageConfidence
          );

      } else if (total > 0) {

        averageConfidence =
          confidenceTotal /
          total;

      }


      setResult({

        total,

        spam,

        ham,

        averageConfidence:
          Number(
            averageConfidence
          ).toFixed(2),

        predictions:
          predictionsList,

      });


    } catch (err) {

      console.error(
        "Batch prediction error:",
        err
      );


      setError(
        getFriendlyError(
          err,
          "Batch prediction failed. Please try again."
        )
      );


    } finally {

      setRunning(false);

    }

  };


  return (

    <>

      <PageHeader
        title="Batch Detection"
        subtitle="Upload a CSV dataset and classify multiple emails using the trained model."
      />


      <div className="grid-2">

        <Section title="Upload dataset">

          <label className="dropzone">

            <input
              type="file"
              accept=".csv"
              onChange={(e) => {

                const selectedFile =
                  e.target.files?.[0] || null;

                setFile(selectedFile);
                setResult(null);
                setError("");

                if (selectedFile && !selectedFile.name.toLowerCase().endsWith(".csv")) {
                  setError("Only CSV files are supported.");
                } else if (selectedFile && selectedFile.size > 50 * 1024 * 1024) {
                  setError("The CSV file must be smaller than 50 MB.");
                }

              }}
            />


            <div className="upload-icon">
              <UploadCloud size={28} />
            </div>


            <h4>

              {file
                ? file.name
                : "Drop your dataset here"}

            </h4>


            <p>

              {file
                ? `${(
                    file.size / 1024
                  ).toFixed(
                    1
                  )} KB ready`
                : "CSV up to 50 MB"}

            </p>


            <span className="btn secondary">
              Browse files
            </span>

          </label>


          <div className="batch-checks">

            <span>
              ✓ CSV supported
            </span>

            <span>
              ✓ UTF-8 supported
            </span>

            <span>
              ✓ Real API prediction
            </span>

          </div>


          {error && (

            <div
              className="alert-row"
              style={{
                marginBottom:
                  "14px",
              }}
            >

              <span className="alert-icon amber">
                <AlertTriangle size={16} />
              </span>


              <div>

                <b>
                  Batch prediction error
                </b>

                <p>{error}</p>

              </div>

            </div>

          )}


          <button
            className="btn primary full"
            disabled={running}
            onClick={run}
          >

            {running ? (
              <RefreshCw
                className="spin"
                size={15}
              />
            ) : (
              <Play size={15} />
            )}


            {running
              ? "Running batch inference..."
              : "Run batch detection"}

          </button>

        </Section>


        <Section title="Run summary">

          {!result ? (

            <div className="empty-state compact">

              <div className="empty-icon">
                <BarChart3 size={24} />
              </div>

              <h4>
                No batch run yet
              </h4>

              <p>
                Upload a CSV file to
                generate real predictions.
              </p>

            </div>

          ) : (

            <div className="batch-result">

              <div className="batch-top">

                <StatusBadge>
                  Completed
                </StatusBadge>

                <span className="muted">
                  Live API result
                </span>

              </div>


              <div className="batch-kpis">

                <div>

                  <b>
                    {result.total}
                  </b>

                  <span>
                    emails
                  </span>

                </div>


                <div>

                  <b>
                    {result.spam}
                  </b>

                  <span>
                    spam
                  </span>

                </div>


                <div>

                  <b>
                    {result.ham}
                  </b>

                  <span>
                    ham
                  </span>

                </div>


                <div>

                  <b>
                    {result.averageConfidence}%
                  </b>

                  <span>
                    avg. confidence
                  </span>

                </div>

              </div>


              <div className="progress">

                <span
                  style={{
                    width:
                      `${
                        result.total
                          ? (
                              result.spam /
                              result.total
                            ) *
                            100
                          : 0
                      }%`,
                  }}
                />

              </div>


              <p className="muted">

                {result.spam} of{" "}
                {result.total}{" "}
                messages classified
                as spam.

              </p>


              {result.predictions?.length >
                0 && (

                <div
                  style={{
                    marginTop:
                      "18px",
                  }}
                >

                  <b>
                    First 5 predictions
                  </b>


                  <div
                    style={{
                      marginTop:
                        "10px",
                    }}
                  >

                    {result.predictions
                      .slice(0, 5)
                      .map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            key={index}
                            className="snapshot-row"
                          >

                            <span>
                              Email{" "}
                              {index + 1}
                            </span>


                            <StatusBadge
                              tone={
                                String(
                                  item?.prediction ??
                                    item?.label ??
                                    ""
                                ).toUpperCase() ===
                                "SPAM"
                                  ? "danger"
                                  : "success"
                              }
                            >

                              {item?.prediction ??
                                item?.label ??
                                "Unknown"}

                            </StatusBadge>

                          </div>

                        )
                      )}

                  </div>

                </div>

              )}

            </div>

          )}

        </Section>

      </div>

    </>

  );

}


// ============================================================
// DATASET
// ============================================================

function Dataset() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const loadDataset =
    async () => {

      setLoading(true);
      setError("");


      try {

        const {
          getDatasetInfo,
        } = await import("./api");


        const result =
          await getDatasetInfo();


        setData(result);


      } catch (err) {

        setError(
          err.message ||
            "Unable to load dataset"
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadDataset();

  }, []);


  return (

    <>

      <PageHeader
        title="Dataset & Data Preparation"
        subtitle="Live information from the spam.csv dataset and the actual training pipeline."
        action={
          <button
            className="btn secondary"
            onClick={loadDataset}
            disabled={loading}
          >

            <RefreshCw
              size={15}
              className={
                loading
                  ? "spin"
                  : ""
              }
            />

            Refresh

          </button>
        }
      />


      {error && (

        <div
          className="panel"
          style={{
            marginBottom:
              "18px",
          }}
        >
          <p>{error}</p>
        </div>

      )}


      <div className="metric-grid">

        <MetricCard
          label="Total samples"
          value={
            loading
              ? "..."
              : data?.totalSamples || 0
          }
          change="Raw dataset"
          icon={Database}
          tone="violet"
        />


        <MetricCard
          label="Spam samples"
          value={
            loading
              ? "..."
              : data?.spamCount || 0
          }
          change="Spam class"
          icon={AlertTriangle}
          tone="amber"
        />


        <MetricCard
          label="Ham samples"
          value={
            loading
              ? "..."
              : data?.hamCount || 0
          }
          change="Ham class"
          icon={Mail}
          tone="green"
        />


        <MetricCard
          label="Columns"
          value={
            loading
              ? "..."
              : data?.columns?.length || 0
          }
          change="CSV columns"
          icon={FileText}
          tone="blue"
        />

      </div>


      <div className="grid-2">

        <Section title="Data source">

          <InfoRows
            rows={[

              [
                "Source",
                data?.source ||
                  "dataset/spam.csv",
              ],

              [
                "Filename",
                data?.filename ||
                  "spam.csv",
              ],

              [
                "Samples",
                data?.totalSamples ||
                  0,
              ],

              [
                "Classes",
                "Spam · Ham",
              ],

              [
                "Label column",
                data?.labelColumn ||
                  "v1",
              ],

              [
                "Text column",
                data?.textColumn ||
                  "v2",
              ],

            ]}
          />

        </Section>


        <Section title="Actual preprocessing">

          <div className="vertical-flow">

            {[
              "Load spam.csv",
              "Select v1 and v2 columns",
              "Remove missing values",
              "Remove duplicate messages",
              "Convert ham/spam to 0/1",
              "Stratified 80/20 train-test split",
            ].map(
              (item, index) => (

                <div
                  className="flow-row"
                  key={item}
                >

                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <b>{item}</b>

                  <StatusBadge>
                    Done
                  </StatusBadge>

                </div>

              )
            )}

          </div>

        </Section>

      </div>


      <Section title="Dataset columns">

        <div className="feature-grid">

          {(
            data?.columns || [
              "v1",
              "v2",
              "Unnamed: 2",
              "Unnamed: 3",
              "Unnamed: 4",
            ]
          ).map(
            (column, index) => (

              <div
                className="feature-card"
                key={column}
              >

                <div className="feature-num">
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </div>

                <b>{column}</b>

                <span>
                  Dataset column
                </span>

              </div>

            )
          )}

        </div>

      </Section>

    </>

  );

}


// ============================================================
// MODEL LAB
// ============================================================

function Model() {

  const [metrics, setMetrics] =
    useState(null);

  const [metricsError, setMetricsError] =
    useState("");

  // ==========================================================
  // MODEL REGISTRY - ADDITION ONLY
  // Existing metrics/model UI is preserved.
  // ==========================================================

  const [registry, setRegistry] =
    useState(null);

  const [registryLoading, setRegistryLoading] =
    useState(true);

  const [registryError, setRegistryError] =
    useState("");


  useEffect(() => {

    const load =
      async () => {

        try {

          setMetricsError("");

          const {
            getMetrics,
          } = await import("./api");

          setMetrics(
            await getMetrics()
          );

        } catch (error) {

          console.error(error);
          setMetricsError(
            getFriendlyError(
              error,
              "Unable to load model metrics."
            )
          );

        }

      };

    load();

  }, []);


  const model =
    metrics?.model || {};


  // ==========================================================
  // LOAD MODEL REGISTRY
  // ==========================================================

  useEffect(() => {

    const loadRegistry = async () => {

      setRegistryLoading(true);
      setRegistryError("");

      try {

        const data =
          await getModelRegistry();

        setRegistry(
          data.registry || {}
        );

      } catch (error) {

        console.error(
          "Model Registry error:",
          error
        );

        setRegistryError(
          getFriendlyError(
            error,
            "Unable to load model registry."
          )
        );

      } finally {

        setRegistryLoading(false);

      }

    };

    loadRegistry();

  }, []);


  return (

    <>

      <PageHeader
        title="Model Lab"
        subtitle="Actual model architecture, training strategy and evaluation metrics."
      />


      <div className="model-banner">

        <div className="model-logo big">
          <BrainCircuit size={32} />
        </div>


        <div>

          <span className="tag">
            PRODUCTION MODEL
          </span>

          <h3>
            {model.name ||
              "Email Spam Detection Model"}
          </h3>

          <p>
            {model.algorithm ||
              "LinearSVC"}
            {" · "}
            {model.framework ||
              "scikit-learn"}
          </p>

        </div>


        <StatusBadge>
          ● Live
        </StatusBadge>

      </div>


      <div className="grid-2">

        <Section title="Model architecture">

          <div className="architecture">

            <div className="arch-node">

              Email text

              <small>
                Subject + Body
              </small>

            </div>


            <ChevronRight />


            <div className="arch-node">

              TF-IDF

              <small>
                Word + Character
              </small>

            </div>


            <ChevronRight />


            <div className="arch-node accent">

              LinearSVC

              <small>
                Binary classifier
              </small>

            </div>


            <ChevronRight />


            <div className="arch-node">

              Prediction

              <small>
                Spam / Ham
              </small>

            </div>

          </div>

        </Section>


        <Section title="Training approach">

          <InfoRows
            rows={[

              [
                "Strategy",
                "Supervised binary classification",
              ],

              [
                "Split",
                "80 / 20 stratified",
              ],

              [
                "Features",
                "Word + Character TF-IDF",
              ],

              [
                "Classifier",
                "LinearSVC",
              ],

              [
                "Framework",
                "scikit-learn",
              ],

            ]}
          />

        </Section>

      </div>


      {metricsError && (
        <div className="panel" style={{ marginBottom: "18px" }}>
          <div className="alert-row">
            <span className="alert-icon amber">
              <AlertTriangle size={16} />
            </span>
            <div style={{ flex: 1 }}>
              <b>Model metrics unavailable</b>
              <p>{metricsError}</p>
            </div>
          </div>
        </div>
      )}

      <Section title="Evaluation metrics">

        <div className="evaluation-grid">

          {[
            [
              "Accuracy",
              metrics?.accuracy || 0,
              "Overall correct predictions",
            ],

            [
              "Precision",
              metrics?.precision || 0,
              "Spam predictions that are correct",
            ],

            [
              "Recall",
              metrics?.recall || 0,
              "Spam messages successfully detected",
            ],

            [
              "F1 Score",
              metrics?.f1 || 0,
              "Balance of precision and recall",
            ],

          ].map(
            ([
              name,
              value,
              description,
            ]) => (

              <div
                className="eval-card"
                key={name}
              >

                <div className="eval-top">

                  <span>{name}</span>

                  <b>{value}%</b>

                </div>


                <div className="eval-bar">

                  <span
                    style={{
                      width:
                        `${Math.min(
                          Number(value),
                          100
                        )}%`,
                    }}
                  ></span>

                </div>


                <small>
                  {description}
                </small>

              </div>

            )
          )}

        </div>

      </Section>

      {/* ============================================================
          MODEL REGISTRY - ADDITION ONLY
          Existing Model Lab sections above remain unchanged.
      ============================================================ */}

      <Section title="Model Registry">

        {registryLoading ? (

          <div className="empty-state compact">

            <div className="empty-icon">
              <RefreshCw
                size={24}
                className="spin"
              />
            </div>

            <h4>
              Loading model registry...
            </h4>

            <p>
              Fetching registered model metadata from the Flask backend.
            </p>

          </div>

        ) : registryError ? (

          <div className="empty-state compact">
            <div className="empty-icon">
              <AlertTriangle size={24} />
            </div>
            <h4>Model registry unavailable</h4>
            <p>{registryError}</p>
            <button
              className="btn secondary"
              onClick={async () => {
                setRegistryLoading(true);
                try {
                  const data = await getModelRegistry();
                  setRegistry(data.registry || {});
                  setRegistryError("");
                } catch (error) {
                  setRegistryError(getFriendlyError(error, "Unable to load model registry."));
                } finally {
                  setRegistryLoading(false);
                }
              }}
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>

        ) : (

          <>

            {registry?.models?.length > 0 ? (

              registry.models.map(
                (registeredModel, index) => (

                  <div key={registeredModel.model_id || index}>

                    <div className="model-summary">

                      <div className="model-logo">
                        <Database size={24} />
                      </div>

                      <div className="model-main">

                        <h4>
                          {registeredModel.name ||
                            "Email Spam Detection Model"}
                        </h4>

                        <p>
                          {registeredModel.algorithm ||
                            "LinearSVC"}
                          {" · "}
                          {registeredModel.framework ||
                            "scikit-learn"}
                          {" · Model ID: "}
                          {registeredModel.model_id ||
                            "spam-detector-v1"}
                        </p>

                      </div>

                      <StatusBadge>
                        ● {registeredModel.status || "Production"}
                      </StatusBadge>

                    </div>


                    <div className="info-grid" style={{ marginTop: "18px" }}>

                      <div>
                        <span>Version</span>
                        <b>{registeredModel.version || "v1.0"}</b>
                      </div>

                      <div>
                        <span>Algorithm</span>
                        <b>{registeredModel.algorithm || "LinearSVC"}</b>
                      </div>

                      <div>
                        <span>Accuracy</span>
                        <b>{registeredModel.evaluation?.accuracy ?? 0}%</b>
                      </div>

                      <div>
                        <span>Precision</span>
                        <b>{registeredModel.evaluation?.precision ?? 0}%</b>
                      </div>

                      <div>
                        <span>Recall</span>
                        <b>{registeredModel.evaluation?.recall ?? 0}%</b>
                      </div>

                      <div>
                        <span>F1 Score</span>
                        <b>{registeredModel.evaluation?.f1_score ?? 0}%</b>
                      </div>

                    </div>


                    <div className="grid-2" style={{ marginTop: "18px" }}>

                      <Section title="Model artifacts">

                        <InfoRows
                          rows={[
                            [
                              "Model",
                              registeredModel.artifacts?.model ||
                                "models/spam_model.pkl",
                            ],
                            [
                              "Vectorizer",
                              registeredModel.artifacts?.vectorizer ||
                                "models/tfidf_vectorizer.pkl",
                            ],
                            [
                              "Created",
                              registeredModel.created_at ||
                                "2026-10-07",
                            ],
                          ]}
                        />

                      </Section>


                      <Section title="Training dataset">

                        <InfoRows
                          rows={[
                            [
                              "Original samples",
                              registeredModel.training_dataset?.original_samples ??
                                5572,
                            ],
                            [
                              "Cleaned samples",
                              registeredModel.training_dataset?.cleaned_samples ??
                                5169,
                            ],
                            [
                              "Training samples",
                              registeredModel.training_dataset?.training_samples ??
                                4135,
                            ],
                            [
                              "Testing samples",
                              registeredModel.training_dataset?.testing_samples ??
                                1034,
                            ],
                          ]}
                        />

                      </Section>

                    </div>


                    <div style={{ marginTop: "18px" }}>

                      <Section title="Registered confusion matrix">

                        <div className="matrix">

                          <div></div>

                          <div className="axis">
                            Predicted Ham
                          </div>

                          <div className="axis">
                            Predicted Spam
                          </div>

                          <div className="axis y">
                            Actual Ham
                          </div>

                          <div className="cell high">
                            TN
                            <br />
                            <b>
                              {registeredModel.confusion_matrix?.[0]?.[0] ?? 0}
                            </b>
                          </div>

                          <div className="cell low">
                            FP
                            <br />
                            <b>
                              {registeredModel.confusion_matrix?.[0]?.[1] ?? 0}
                            </b>
                          </div>

                          <div className="axis y">
                            Actual Spam
                          </div>

                          <div className="cell low">
                            FN
                            <br />
                            <b>
                              {registeredModel.confusion_matrix?.[1]?.[0] ?? 0}
                            </b>
                          </div>

                          <div className="cell high">
                            TP
                            <br />
                            <b>
                              {registeredModel.confusion_matrix?.[1]?.[1] ?? 0}
                            </b>
                          </div>

                        </div>

                      </Section>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="empty-state compact">

                <div className="empty-icon">
                  <Database size={24} />
                </div>

                <h4>
                  No registered model found
                </h4>

                <p>
                  The model registry is currently empty.
                </p>

              </div>

            )}

          </>

        )}

      </Section>

    </>

  );

}


// ============================================================
// MLOPS
// ============================================================

function MLOps() {

  const stages = [

    [
      "01",
      "Data",
      "spam.csv loaded",
    ],

    [
      "02",
      "Preprocessing",
      "Missing and duplicate removal",
    ],

    [
      "03",
      "Feature Engineering",
      "Word + Character TF-IDF",
    ],

    [
      "04",
      "Training",
      "LinearSVC training",
    ],

    [
      "05",
      "Evaluation",
      "Accuracy and classification report",
    ],

    [
      "06",
      "Deployment",
      "Flask REST API",
    ],

    [
      "07",
      "Monitoring",
      "Health and metrics endpoints",
    ],

  ];


  return (

    <>

      <PageHeader
        title="MLOps Pipeline"
        subtitle="Actual end-to-end lifecycle implemented in this project."
      />


      <Section title="Lifecycle status">

        <div className="pipeline-large">

          {stages.map(
            (
              [
                number,
                title,
                detail,
              ],
              index
            ) => (

              <React.Fragment
                key={number}
              >

                <div className="stage done">

                  <div className="stage-icon">
                    ✓
                  </div>


                  <div>

                    <span>
                      STAGE {number}
                    </span>

                    <h4>{title}</h4>

                    <p>{detail}</p>

                  </div>


                  <StatusBadge>
                    Completed
                  </StatusBadge>

                </div>


                {index <
                  stages.length - 1 && (
                  <div className="connector"></div>
                )}

              </React.Fragment>

            )
          )}

        </div>

      </Section>


      <div className="grid-2">

        <Section title="Deployment">

          <InfoRows
            rows={[

              [
                "Serving",
                "Flask REST inference API",
              ],

              [
                "Environment",
                "Local / Development",
              ],

              [
                "Model",
                "LinearSVC",
              ],

              [
                "Health",
                "Operational",
              ],

              [
                "Endpoints",
                "/health · /predict · /metrics",
              ],

            ]}
          />

        </Section>


        <Section title="Monitoring hooks">

          <InfoRows
            rows={[

              [
                "Health check",
                "/health",
              ],

              [
                "Model metrics",
                "/metrics",
              ],

              [
                "Dataset information",
                "/dataset",
              ],

              [
                "Single prediction",
                "/predict",
              ],

              [
                "Batch prediction",
                "/batch/predict",
              ],

            ]}
          />

        </Section>

      </div>

    </>

  );

}


// ============================================================
// RESULTS
// ============================================================

function Results() {

  const [metrics, setMetrics] =
    useState(null);


  useEffect(() => {

    const load =
      async () => {

        try {

          const {
            getMetrics,
          } = await import("./api");

          setMetrics(
            await getMetrics()
          );

        } catch (error) {

          console.error(error);

        }

      };

    load();

  }, []);


  const matrix =
    metrics?.confusionMatrix || [
      [903, 0],
      [10, 121],
    ];


  return (

    <>

      <PageHeader
        title="Initial Results"
        subtitle="Actual evaluation results from the trained spam detection model."
      />


      <div className="grid-2">

        <Section title="Model performance">

          <div className="big-metric">

            <b>
              {metrics?.accuracy || 0}%
            </b>

            <span>
              accuracy on the evaluation set
            </span>

          </div>


          <div className="bar-metrics">

            {[
              [
                "Precision",
                metrics?.precision || 0,
              ],

              [
                "Recall",
                metrics?.recall || 0,
              ],

              [
                "F1 Score",
                metrics?.f1 || 0,
              ],

            ].map(
              ([name, value]) => (

                <div key={name}>

                  <div>

                    <span>{name}</span>

                    <b>{value}%</b>

                  </div>


                  <div className="eval-bar">

                    <span
                      style={{
                        width:
                          `${Math.min(
                            Number(value),
                            100
                          )}%`,
                      }}
                    ></span>

                  </div>

                </div>

              )
            )}

          </div>

        </Section>


        <Section title="Confusion matrix">

          <div className="matrix">

            <div></div>

            <div className="axis">
              Predicted Ham
            </div>

            <div className="axis">
              Predicted Spam
            </div>


            <div className="axis y">
              Actual Ham
            </div>


            <div className="cell high">

              TN

              <br />

              <b>
                {matrix?.[0]?.[0] || 0}
              </b>

            </div>


            <div className="cell low">

              FP

              <br />

              <b>
                {matrix?.[0]?.[1] || 0}
              </b>

            </div>


            <div className="axis y">
              Actual Spam
            </div>


            <div className="cell low">

              FN

              <br />

              <b>
                {matrix?.[1]?.[0] || 0}
              </b>

            </div>


            <div className="cell high">

              TP

              <br />

              <b>
                {matrix?.[1]?.[1] || 0}
              </b>

            </div>

          </div>

        </Section>

      </div>


      <Section title="Classification report">

        <div className="info-grid">

          <div>
            <span>HAM Precision</span>
            <b>99%</b>
          </div>

          <div>
            <span>HAM Recall</span>
            <b>100%</b>
          </div>

          <div>
            <span>SPAM Precision</span>
            <b>100%</b>
          </div>

          <div>
            <span>SPAM Recall</span>
            <b>92%</b>
          </div>

          <div>
            <span>SPAM F1</span>
            <b>96%</b>
          </div>

          <div>
            <span>Macro F1</span>
            <b>98%</b>
          </div>

        </div>

      </Section>


      <Section
        title="Sample predictions"
        action={
          <StatusBadge>
            Evaluation set
          </StatusBadge>
        }
      >

        <PredictionTable />

      </Section>

    </>

  );

}


// ============================================================
// MONITORING
// ============================================================

function Monitoring() {

  const [health, setHealth] =
    useState({
      connected: false,
      status: "Checking...",
      modelLoaded: false,
    });


  const [metrics, setMetrics] =
    useState({
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1: 0,
    });


  const [loading, setLoading] =
    useState(true);


  const [lastChecked, setLastChecked] =
    useState(null);


  const [error, setError] =
    useState("");


  const loadMonitoringData =
    async () => {

      setLoading(true);
      setError("");


      try {

        const {
          getHealth,
          getMetrics,
        } = await import("./api");


        const [
          healthData,
          metricsData,
        ] = await Promise.all([
          getHealth(),
          getMetrics(),
        ]);


        setHealth({
          connected: true,
          status:
            healthData.status ||
            "healthy",
          modelLoaded:
            Boolean(
              healthData.model_loaded
            ),
        });


        setMetrics({
          accuracy:
            Number(
              metricsData.accuracy ||
                0
            ),
          precision:
            Number(
              metricsData.precision ||
                0
            ),
          recall:
            Number(
              metricsData.recall ||
                0
            ),
          f1:
            Number(
              metricsData.f1 ||
                0
            ),
        });


        setLastChecked(
          new Date().toLocaleTimeString()
        );


      } catch (err) {

        console.error(
          "Monitoring error:",
          err
        );


        setHealth({
          connected: false,
          status: "offline",
          modelLoaded: false,
        });


        setError(
          err.message ||
            "Unable to connect to backend"
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadMonitoringData();

  }, []);


  return (

    <>

      <PageHeader
        title="Monitoring"
        subtitle="Track API health, model status and live evaluation metrics."
        action={

          <button
            className="btn secondary"
            onClick={
              loadMonitoringData
            }
            disabled={loading}
          >

            <RefreshCw
              size={15}
              className={
                loading
                  ? "spin"
                  : ""
              }
            />

            {loading
              ? "Checking..."
              : "Refresh"}

          </button>

        }
      />


      {error && (

        <div
          className="panel"
          style={{
            marginBottom:
              "18px",
          }}
        >

          <div className="alert-row">

            <span className="alert-icon amber">
              <AlertTriangle size={16} />
            </span>


            <div>

              <b>
                Backend connection problem
              </b>

              <p>{error}</p>

            </div>

          </div>

        </div>

      )}


      <div className="metric-grid">

        <MetricCard
          label="API Status"
          value={
            health.connected
              ? "Healthy"
              : "Offline"
          }
          change={
            health.connected
              ? "Backend connected"
              : "Backend unavailable"
          }
          icon={Zap}
          tone={
            health.connected
              ? "green"
              : "amber"
          }
        />


        <MetricCard
          label="Model Status"
          value={
            health.modelLoaded
              ? "Loaded"
              : "Unavailable"
          }
          change={
            health.modelLoaded
              ? "Model loaded successfully"
              : "Model not loaded"
          }
          icon={BrainCircuit}
          tone={
            health.modelLoaded
              ? "blue"
              : "amber"
          }
        />


        <MetricCard
          label="Accuracy"
          value={
            loading
              ? "..."
              : metrics.accuracy
          }
          suffix="%"
          change="Live model evaluation"
          icon={Gauge}
          tone="violet"
        />


        <MetricCard
          label="F1 Score"
          value={
            loading
              ? "..."
              : metrics.f1
          }
          suffix="%"
          change="Live model evaluation"
          icon={Activity}
          tone="green"
        />

      </div>


      <div className="grid-2">

        <Section
          title="System health"
          action={
            health.connected ? (
              <StatusBadge>
                ● Healthy
              </StatusBadge>
            ) : (
              <StatusBadge tone="danger">
                ● Offline
              </StatusBadge>
            )
          }
        >

          <div className="snapshot">

            <div className="snapshot-row">

              <div>

                <span
                  className={`snap-dot ${
                    health.connected
                      ? "green"
                      : "amber"
                  }`}
                ></span>

                API Service

              </div>


              <StatusBadge
                tone={
                  health.connected
                    ? "success"
                    : "danger"
                }
              >

                {health.connected
                  ? "Healthy"
                  : "Offline"}

              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>

                <span
                  className={`snap-dot ${
                    health.modelLoaded
                      ? "green"
                      : "amber"
                  }`}
                ></span>

                ML Model

              </div>


              <StatusBadge
                tone={
                  health.modelLoaded
                    ? "success"
                    : "warning"
                }
              >

                {health.modelLoaded
                  ? "Loaded"
                  : "Unavailable"}

              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>

                <span className="snap-dot green"></span>

                Prediction API

              </div>


              <StatusBadge
                tone={
                  health.connected
                    ? "success"
                    : "danger"
                }
              >

                {health.connected
                  ? "Available"
                  : "Offline"}

              </StatusBadge>

            </div>


            <div className="snapshot-row">

              <div>

                <span className="snap-dot green"></span>

                Dataset API

              </div>


              <StatusBadge
                tone={
                  health.connected
                    ? "success"
                    : "danger"
                }
              >

                {health.connected
                  ? "Available"
                  : "Offline"}

              </StatusBadge>

            </div>

          </div>

        </Section>


        <Section
          title="Model quality"
          action={
            <StatusBadge>
              Live metrics
            </StatusBadge>
          }
        >

          <InfoRows
            rows={[

              [
                "Accuracy",
                `${metrics.accuracy}%`,
              ],

              [
                "Precision",
                `${metrics.precision}%`,
              ],

              [
                "Recall",
                `${metrics.recall}%`,
              ],

              [
                "F1 Score",
                `${metrics.f1}%`,
              ],

            ]}
          />

        </Section>

      </div>


      <Section title="Monitoring status">

        <div className="alerts">

          <div className="alert-row">

            <span className="alert-icon green">
              <ShieldCheck size={16} />
            </span>


            <div>

              <b>
                Backend health check
              </b>

              <p>
                {health.connected
                  ? "Flask API is responding normally."
                  : "Flask API is not reachable."}
              </p>

            </div>


            <span>
              {health.connected
                ? "Healthy"
                : "Offline"}
            </span>

          </div>


          <div className="alert-row">

            <span className="alert-icon blue">
              <BrainCircuit size={16} />
            </span>


            <div>

              <b>
                Model availability
              </b>

              <p>
                {health.modelLoaded
                  ? "Trained spam detection model is loaded."
                  : "Trained model could not be loaded."}
              </p>

            </div>


            <span>
              {health.modelLoaded
                ? "Ready"
                : "Check"}
            </span>

          </div>


          <div className="alert-row">

            <span className="alert-icon green">
              <Activity size={16} />
            </span>


            <div>

              <b>
                Model evaluation
              </b>

              <p>
                Current accuracy is{" "}
                <b>
                  {metrics.accuracy}%
                </b>{" "}
                with F1 score{" "}
                <b>
                  {metrics.f1}%
                </b>.
              </p>

            </div>


            <span>
              Verified
            </span>

          </div>

        </div>

      </Section>


      <div
        className="muted"
        style={{
          marginTop: "14px",
          fontSize: "12px",
        }}
      >
        Last checked:{" "}
        {lastChecked || "Checking..."}
      </div>

    </>

  );

}


// ============================================================
// CHALLENGES
// ============================================================

function Challenges() {

  return (

    <>

      <PageHeader
        title="Challenges & Solutions"
        subtitle="Engineering risks identified during implementation and the controls used to address them."
      />


      <div className="challenge-grid">

        {challenges.map(
          (
            [
              title,
              problem,
              solution,
            ],
            index
          ) => (

            <div
              className="challenge-card"
              key={title}
            >

              <div className="challenge-number">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </div>


              <div className="tag">
                CHALLENGE
              </div>


              <h3>{title}</h3>


              <p>{problem}</p>


              <div className="solution">

                <ShieldCheck size={17} />

                <div>

                  <span>
                    SOLUTION
                  </span>

                  <b>{solution}</b>

                </div>

              </div>

            </div>

          )
        )}

      </div>


      <Section title="Implementation progress">

        <div className="progress-grid">

          {[
            "Data collection",
            "Preprocessing",
            "Model development",
            "Model training",
            "Model evaluation",
            "REST API deployment",
            "Monitoring",
          ].map((item) => (

            <div
              className="progress-item"
              key={item}
            >

              <div className="progress-check">
                ✓
              </div>


              <div>

                <b>{item}</b>

                <small>
                  Completed
                </small>

              </div>

            </div>

          ))}

        </div>

      </Section>

    </>

  );

}


// ============================================================
// SETTINGS
// ============================================================

function SettingsPage() {

  const [apiUrl, setApiUrl] = useState(() => getApiBaseURL());
  const [timeout, setTimeoutValue] = useState(() => {
    return localStorage.getItem("spamshield_timeout") || "30000";
  });
  const [connection, setConnection] = useState("idle");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const normalizeUrl = (value) =>
    value.trim().replace(/\/+$/, "");

  const testConnection = async () => {
    const url = normalizeUrl(apiUrl);

    if (!url) {
      setConnection("error");
      setMessage("Please enter an API base URL.");
      return;
    }

    setConnection("checking");
    setMessage("");

    try {
      const response = await fetch(`${url}/health`, {
        method: "GET",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.status !== "healthy") {
        throw new Error(data?.error || "Backend is not healthy.");
      }

      setConnection("connected");
      setMessage("Backend connected successfully.");
    } catch (error) {
      setConnection("error");
      setMessage(
        error.message ||
          "Unable to connect to the Flask backend."
      );
    }
  };

  const saveSettings = async () => {
    const url = normalizeUrl(apiUrl);
    const timeoutNumber = Number(timeout);

    if (!url) {
      setConnection("error");
      setMessage("API base URL cannot be empty.");
      return;
    }

    if (!Number.isFinite(timeoutNumber) || timeoutNumber < 1000) {
      setConnection("error");
      setMessage("Timeout must be at least 1000 ms.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      setApiBaseURL(url);
      localStorage.setItem(
        "spamshield_timeout",
        String(timeoutNumber)
      );

      setApiUrl(url);
      setTimeoutValue(String(timeoutNumber));
      setConnection("saved");
      setMessage("Settings saved successfully.");
    } catch (error) {
      setConnection("error");
      setMessage(
        error.message || "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = () => {
    const defaultUrl = "http://localhost:8000";
    const defaultTimeout = "30000";

    setApiBaseURL(defaultUrl);
    localStorage.setItem("spamshield_timeout", defaultTimeout);
    setApiUrl(defaultUrl);
    setTimeoutValue(defaultTimeout);
    setConnection("saved");
    setMessage("Settings reset to default values.");
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure the frontend connection to your spam detection inference service."
      />

      <Section title="API connection">
        <div className="settings-form">
          <div className="field">
            <label>API base URL</label>
            <input
              value={apiUrl}
              onChange={(e) => {
                setApiUrl(e.target.value);
                setConnection("idle");
                setMessage("");
              }}
              placeholder="http://localhost:8000"
            />
          </div>

          <div className="field">
            <label>Inference timeout (ms)</label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={timeout}
              onChange={(e) => {
                setTimeoutValue(e.target.value);
                setConnection("idle");
                setMessage("");
              }}
            />
          </div>

          <div className="field">
            <label>Model</label>
            <input
              value="LinearSVC"
              readOnly
            />
          </div>

          <div className="field">
            <label>Features</label>
            <input
              value="Word + Character TF-IDF"
              readOnly
            />
          </div>
        </div>

        {connection !== "idle" && (
          <div
            className="alert-row"
            style={{ marginTop: "16px" }}
          >
            <span
              className={`alert-icon ${
                connection === "error" ? "amber" : "green"
              }`}
            >
              {connection === "checking" ? (
                <RefreshCw size={16} className="spin" />
              ) : connection === "error" ? (
                <AlertTriangle size={16} />
              ) : (
                <ShieldCheck size={16} />
              )}
            </span>
            <div>
              <b>
                {connection === "checking"
                  ? "Checking connection..."
                  : connection === "error"
                  ? "Connection error"
                  : connection === "saved"
                  ? "Settings saved"
                  : "Backend connected"}
              </b>
              <p>{message}</p>
            </div>
          </div>
        )}

        <div
          className="composer-footer"
          style={{ marginTop: "18px" }}
        >
          <span className="muted">
            Settings are stored locally in this browser.
          </span>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              className="btn secondary"
              onClick={resetSettings}
              disabled={saving || connection === "checking"}
            >
              Reset
            </button>

            <button
              className="btn secondary"
              onClick={testConnection}
              disabled={saving || connection === "checking"}
            >
              {connection === "checking" && (
                <RefreshCw size={15} className="spin" />
              )}
              Test connection
            </button>

            <button
              className="btn primary"
              onClick={saveSettings}
              disabled={saving || connection === "checking"}
            >
              {saving ? (
                <RefreshCw size={15} className="spin" />
              ) : (
                <Settings size={15} />
              )}
              {saving ? "Saving..." : "Save settings"}
            </button>
          </div>
        </div>
      </Section>

      <Section title="Current configuration">
        <InfoRows
          rows={[
            ["API URL", getApiBaseURL()],
            ["Timeout", `${timeout} ms`],
            ["Algorithm", "LinearSVC"],
            ["Features", "Word + Character TF-IDF"],
            ["Backend", connection === "connected" ? "Healthy" : "Ready to test"],
          ]}
        />
      </Section>
    </>
  );
}


// ============================================================
// APP
// ============================================================

export default function App() {

  return (

    <Shell>

      <Routes>

        <Route
          path="/"
          element={<Overview />}
        />

        <Route
          path="/analyzer"
          element={<Analyzer />}
        />

        <Route
          path="/batch"
          element={<Batch />}
        />

        <Route
          path="/dataset"
          element={<Dataset />}
        />

        <Route
          path="/model"
          element={<Model />}
        />

        <Route
          path="/mlops"
          element={<MLOps />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/monitoring"
          element={<Monitoring />}
        />

        <Route
          path="/challenges"
          element={<Challenges />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>

    </Shell>

  );

}
