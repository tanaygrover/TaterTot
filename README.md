# Reading Roundup Dashboard

An automated content intelligence platform for luxury PR that collects, summarizes, and organizes articles from 40+ publications using AI.

## Overview

This system automates PR research workflows by scraping articles from luxury publications, generating AI summaries using BART transformer models, and delivering bi-weekly reports through an interactive dashboard.

**Key Features:**
- Automated article collection from 40+ luxury publications
- AI-powered summarization (BART-large-CNN)
- Weekly PDF reports with journalist attribution
- React dashboard with authentication
- GitHub Actions-based scheduling

## Tech Stack

**Frontend:**
- React 19, Vite 7, Tailwind CSS 4
- Google Sheets API for data access
- GitHub Actions API for pipeline control

**Backend:**
- Python 3.10
- Transformers library (BART model)
- BeautifulSoup, CloudScraper, Newspaper3k
- Google Sheets API for storage
- ReportLab for PDF generation

**Infrastructure:**
- GitHub Actions for CI/CD
- Google Sheets as database
- GitHub Artifacts for PDF storage

## Setup

### Prerequisites
- Google Cloud Platform account (service account credentials)
- GitHub account with Actions enabled
- Node.js 20.19+
- Python 3.10+

### Backend Setup

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Add Google service account credentials:
```bash
# Place credentials.json in backend/
cp path/to/credentials.json backend/credentials.json
```

3. Set environment variables:
```bash
export GOOGLE_SHEET_ID=your-sheet-id
```

4. Run pipeline:
```bash
python pipeline_runner.py
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

3. Run development server:
```bash
npm run dev
```

### GitHub Actions Setup

1. Add repository secrets:
   - `GOOGLE_CREDENTIALS` - Service account JSON
   - `GOOGLE_SHEET_ID` - Spreadsheet ID

2. Workflow triggers automatically on manual dispatch

## Usage

**Trigger Pipeline:**
- Via dashboard: Click "Run Pipeline" button
- Via GitHub: Actions → Run workflow

**View Results:**
- Dashboard displays articles after pipeline completes
- Download PDF from GitHub Actions artifacts

**Typical Runtime:** 3-7 minutes

## Project Structure
```
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Auth context
│   │   └── services/       # API integrations
│   └── package.json
├── backend/
│   ├── AgentCollector.py   # Web scraping
│   ├── AgentSumm.py        # AI summarization
│   ├── PDFGenerator.py     # Report generation
│   ├── google_storage.py   # Database operations
│   └── pipeline_runner.py  # Main orchestrator
├── .github/
│   └── workflows/
│       └── collect-articles.yml
└── README.md
```

## Architecture

**Data Flow:**
1. User triggers pipeline via dashboard
2. GitHub Actions executes workflow
3. Pipeline scrapes 40+ publications
4. BART model generates summaries
5. Results saved to Google Sheets
6. PDF report uploaded to GitHub Artifacts
7. User views articles in dashboard


## License

MIT License

## Author

Tanay Grover
