<div align="center">

<img src="dashboard-banner.webp" alt="ReliefLink AI Dashboard" width="800" />

<br/>

# 🛰️ R E L I E F L I N K &nbsp; A I

### ⚡ Autonomous Crisis Coordination Command Center ⚡

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Vertex AI](https://img.shields.io/badge/Vertex_AI-Gemini_1.5-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/vertex-ai)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![CSS](https://img.shields.io/badge/Glassmorphism-CSS-blueviolet?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![SDG 11](https://img.shields.io/badge/UN_SDG-11-F5A623?style=for-the-badge)](https://sdgs.un.org/goals/goal11)
[![SDG 13](https://img.shields.io/badge/UN_SDG-13-48773E?style=for-the-badge)](https://sdgs.un.org/goals/goal13)

<br/>

*Scaling global disaster response with predictive intelligence.*  
*Built for the **Google Solution Challenge 2026**.*

<br/>

[🚀 Live Demo](#-quick-start) &nbsp;•&nbsp; [📹 Watch Video](#) &nbsp;•&nbsp; [📖 Docs](#-architecture) &nbsp;•&nbsp; [🐛 Report Bug](https://github.com/vaishnavi-ctrl-jpg/RELIEFLINK-AI-/issues)

---

</div>

<br/>

## 💡 The Problem

> **70% of disaster response delays stem from coordination gaps.**  
> When a crisis strikes, fragmented tools, slow dispatching, and zero predictive intelligence cost precious time — and lives.

**ReliefLink AI** solves this by centralizing disaster intelligence into a single, AI-powered Command Center that doesn't just *react* — it **predicts**.

<br/>

## 🌍 UN Sustainable Development Goals

<div align="center">

| | Goal | How ReliefLink Contributes |
|:---:|:---|:---|
| 🏙️ | **SDG 11 — Sustainable Cities** | Intelligent resource allocation to protect vulnerable populations during urban crises |
| 🌿 | **SDG 13 — Climate Action** | Predictive AI to strengthen adaptive capacity against climate-related disasters |

</div>

<br/>

## ✨ Feature Highlights

<div align="center">

```mermaid
mindmap
  root((🛰️ Command Center HUD))
    (📡 Elite GIS Map)
      Tactical coordinate grid
      Satellite radar sweep
      Pulsing crisis heat zones
      Interactive intel cards
    (🧠 Vertex AI Engine)
      Predictive hotspot forecasting
      Semantic skill matching
      Autonomous volunteer dispatch
      Real-time demand analysis
    (💎 Premium UX)
      Glassmorphic panels
      Indigo brand gradients
      Shimmer skeleton loaders
      Toast notification system
    (👥 Coordination Suite)
      Deep volunteer profiles
      Integrated tactical chat
      Incident tracking & mgmt
      Performance analytics
```

</div>

<br/>

## 🧠 Powered by Google Cloud

<div align="center">

```mermaid
graph TD
    %% Styling
    classDef default fill:#1E293B,stroke:#38BDF8,stroke-width:2px,color:#fff,rx:8px,ry:8px
    classDef ai fill:#312E81,stroke:#8B5CF6,stroke-width:2px,color:#fff,rx:8px,ry:8px
    classDef action fill:#065F46,stroke:#10B981,stroke-width:2px,color:#fff,rx:8px,ry:8px
    classDef ui fill:#0F172A,stroke:#6366F1,stroke-width:2px,color:#fff,rx:8px,ry:8px
    classDef incoming fill:#7F1D1D,stroke:#EF4444,stroke-width:2px,color:#fff,rx:8px,ry:8px

    %% Nodes
    A[🚨 Incident Trigger in Sector 7]:::incoming --> B[ReliefLink API Layer<br/>/api/match & /api/intelligence]
    B --> C{☁️ Google Cloud Vertex AI<br/>Gemini 1.5 Flash SDK}:::ai
    C --> D[🔮 Predictive Hotspot Analysis]:::ai
    C --> E[⚡ Semantic Volunteer Dispatch]:::ai
    D --> F[📊 Command Center HUD<br/>Dashboard • Map • Feed]:::ui
    E --> F
    E --> G[🚀 Field Responder Deployed]:::action
```

</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---|:---|
| ⚙️ | **Next.js 16.2.3** | Server-side rendering & API routes |
| 🧠 | **Vertex AI (Gemini 1.5 Flash)** | Predictive analytics & semantic matching |
| ⚛️ | **React 19** | Component-driven UI architecture |
| 🎨 | **Vanilla CSS** | Glassmorphism, gradients & animations |
| 🔤 | **Outfit** | Premium geometric typography |
| 🔐 | **GCP Service Account** | Enterprise-grade authentication |

</div>

<br/>

## 🚦 Quick Start

```bash
# 1️⃣  Clone
git clone https://github.com/vaishnavi-ctrl-jpg/RELIEFLINK-AI-
cd RELIEFLINK-AI-

# 2️⃣  Install
npm install

# 3️⃣  Configure (.env.local)
GOOGLE_CLOUD_PROJECT=your-project-id
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# 4️⃣  Launch
npm run dev
```

> 💡 **Need a Service Account key?**  
> [IAM Console](https://console.cloud.google.com/iam-admin/serviceaccounts) → Create Account → **Vertex AI User** role → Keys → JSON

<br/>

## 📁 Project Structure

```
relieflink-ai/
│
├── 📂 app/
│   ├── 📂 api/
│   │   ├── 🧠 match/            ← Vertex AI Dispatch Engine
│   │   ├── 🔮 intelligence/     ← Predictive Analytics API
│   │   ├── 📋 request/          ← Incident CRUD
│   │   └── 👥 volunteers/       ← Responder Network API
│   │
│   ├── 📂 components/
│   │   └── 🧭 Sidebar.js        ← Glassmorphic Navigation HUD
│   │
│   ├── 🗺️  map/                 ← Elite GIS Command Map
│   ├── 🚨 incidents/            ← Crisis Management Console
│   ├── 👥 volunteers/           ← Responder Directory
│   ├── 📊 analytics/            ← Performance Dashboards
│   ├── ⚙️  settings/            ← System Configuration
│   ├── ❓ help/                  ← Support Hub
│   ├── 🎨 globals.css           ← Indigo Design System
│   └── 📄 page.js               ← Main Dashboard
│
├── 📂 lib/
│   └── 💾 store.js              ← In-memory Data Layer
│
└── 📂 public/                   ← Static Assets & Profiles
```

<br/>

## 🎖️ The Vision

<div align="center">

> *"In a crisis, every second counts.*  
> *ReliefLink AI ensures no call for help goes unanswered."*

<br/>

---

**🏆 Developed for the Google Solution Challenge 2026 🏆**

Made with 💜 by [**Vaishnavi**](https://github.com/vaishnavi-ctrl-jpg)

<br/>

<a href="https://github.com/vaishnavi-ctrl-jpg/RELIEFLINK-AI-">
  <img src="https://img.shields.io/badge/⭐_Star_This_Repo-171515?style=for-the-badge&logo=github&logoColor=white" />
</a>

</div>
