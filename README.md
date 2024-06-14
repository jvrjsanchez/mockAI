# mockAI

## The behavioral mock interview API powered by AI

### Quick start for dev team

This README will be updated throughout the development process. The following is a quick start guide for the development team.

# Project Directory

```.
├── liftoff (<- Just a reference)
├── mock_ai
│   ├── README.md
│   ├── api (<- Flask API)
│   ├── app
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
│   └── venv*
    └── README.md
└── README.md

* denotes that this directory is not included in the repository.
```

# Quick start

Clone the repository and navigate to the `mock_ai` directory.

```bash
git clone
cd mock_ai
```

Start your Python virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate
```

To run the Flask API run the following commands.

```bash
npm run flask-dev
```

To run the Next.js and Flask api concurrently, run the following command

```bash
npm run dev
```

Flask API will be running on `http://localhost:3001` and the Next.js app will be running on `http://localhost:3000`.

to run just the Next.js app, run the following command.

```bash
npm run client
```
