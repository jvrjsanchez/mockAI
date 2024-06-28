# mockAI

## The behavioral mock interview API powered by AI

### Quick start for dev team

This README will be updated throughout the development process. The following is a quick start guide for the development team. RUNNING npm run dev or npm run flask-dev `will install the requirements.txt for you.` You still need to do an npm install in the root directory of mock_ai.

# Table of Contents

1. [Project Overview](#mockai)
2. [Quick Start for Dev Team](#quick-start-for-dev-team)
3. [Project Directory](#project-directory-anchor)
4. [Quick Start](#quick-start)
   - [Clone and Install](#clone-and-install)
   - [Environment Variables](#environment-variables)
   - [Start Virtual Environment](#start-virtual-environment)
   - [Running the Flask API](#running-the-flask-api)
   - [Running Concurrently](#running-concurrently)
   - [Running Just the Next.js App](#running-just-the-nextjs-app)

<strong><a id="project-directory-anchor"></a>📁 Project Directory</strong>

<details>
<summary>Click to expand</summary>

```.
├── liftoff (<- Just a reference)
├── mock_ai
│   ├── README.md
│   ├── flask_api (<- Flask API)
│   │   ├── index.py
│   │   ├── env.example
│   │   ├── .env *
│   │   ├── tmp
│   │   ├── audio_analysis.py
│   │   ├── database.py
│   │   ├── sample-data
│   ├── app
│   │   ├── api
│   │   ├── interview
│   │   ├── results
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   ├── components
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public
│   ├── requirements.txt
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── types
│   ├── MockAI.db
│   └── venv*
│   └── README.md
└── README.md

* denotes that this directory is not included in the repository.
```

</details>
<br>
<br>

# Quick start

### Clone and Install

To set up the project, follow these steps:

1. **Clone the repository**: Use the following command to clone the `mockAI` repository to your local machine.

   ```bash
   git clone git@github.com:jvrjsanchez/mockAI.git
   ```

2. **Navigate to the project directory**: Change your current directory to the `mock_ai` folder.

   ```bash
   cd mock_ai
   ```

3. **Install dependencies**: Run the following command to install the necessary Node.js packages defined in the `package.json` file.

   ```bash
   npm install
   ```

### Environment Variables

To set up the necessary environment variables:

1. Navigate to the `flask_api` directory within the project.
2. Locate the `.env.example` file. This file contains a template of the environment variables required by the project.
3. Create a new file named `.env` in the same directory.
4. Copy the contents of `.env.example` into your `.env` file.
5. Replace `your_api_key_here` with your actual API key value.

```bash
DG_API_KEY=your_api_key_here
```

Get your free API key from [Deepgram](https://www.deepgram.com/).

### Start Virtual Environment

Start your Python virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate
```

### Running the Flask API

To run the Flask API as a `standalone` run the following commands: `Note: This script will install the requirements.txt file for you.`

```bash
npm run flask-dev
```

### Running Concurrently

To run the Next.js and Flask api `concurrently`, run the following command. This will also install the requirements.txt file for the Flask API:

```bash
npm run dev
```

Flask API will be running on `http://localhost:3001` and the Next.js app will be running on `http://localhost:3000`.

### Running Just the Next.js App

To run `just` the Next.js app, run the following command:

```bash
npm run client
```
