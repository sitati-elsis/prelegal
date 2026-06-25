# prelegal

A toolset for pre-legal document processing, consisting of a dataset of legal document templates and a web application for generating completed agreements.

## Contents

- **`templates/`** — CommonPaper legal document templates (Markdown), including Mutual NDA, CSA, DPA, SLA, PSA, and more
- **`catalog.json`** — Machine-readable index of all available templates
- **`frontend/`** — Next.js web application for creating a completed Mutual NDA from a form

---

## Mutual NDA Creator (frontend/)

A web application that lets users fill in key details via a form and instantly preview a completed Mutual Non-Disclosure Agreement. The document can be downloaded as Markdown or printed/saved as a PDF.

### Features

- Live side-by-side preview — filled values are highlighted in the document as you type
- Cover page fields: parties, purpose, effective date, MNDA term, term of confidentiality, governing law, and jurisdiction
- Download the completed agreement as a `.md` file
- Print or save as PDF via the browser print dialogue

### Prerequisites

- Node.js 20.9 or later
- npm

### Local setup

```bash
# From the repo root
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Building for production

```bash
cd frontend
npm run build
npm start
```

---

## Legal document templates

The `templates/` directory contains open-source CommonPaper standard agreements, free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See `catalog.json` for the full list with descriptions.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request against `main`

## Licence

Proprietary -- Postcode Lottery Group
