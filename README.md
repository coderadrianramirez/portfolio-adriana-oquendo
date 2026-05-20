# Projects

Este repositorio contiene dos portfolios independientes.

```
/
├── adriana-oquendo-portfolio/   — Portfolio de Adriana Oquendo (HTML estático)
└── nano-moreno-portfolio/       — Portfolio de Nano Moreno (React + Vite + GSAP)
```

## Adriana Oquendo Portfolio

Sitio estático (HTML / CSS / JS). Servidor local con PowerShell.

```powershell
# Levantar servidor en http://localhost:3000
powershell -ExecutionPolicy Bypass -File adriana-oquendo-portfolio/serve.ps1
```

## Nano Moreno Portfolio

React + Vite + Tailwind CSS + GSAP. Requiere Node.js instalado.

```bash
cd nano-moreno-portfolio
npm install
npm run dev          # http://localhost:5173
```

Preview estático (sin Node.js):

```powershell
powershell -ExecutionPolicy Bypass -File nano-moreno-portfolio/serve.ps1
# http://localhost:5174/preview.html
```
