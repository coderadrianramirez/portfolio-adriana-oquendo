# Adriana Oquendo — Portafolio

Portafolio profesional de diseño y desarrollo web. Sitio estático de una sola página construido con React 18 (CDN), Tailwind CSS (CDN) y Lucide Icons.

## Tecnologías

- **React 18** — vía CDN (UMD), sin bundler
- **Tailwind CSS** — vía CDN Play
- **Babel Standalone** — transpilación JSX en el navegador
- **Syne + Plus Jakarta Sans** — tipografías vía Google Fonts

## Estructura del proyecto

```
.
├── index.html          # Aplicación completa (single file)
├── serve.ps1           # Servidor de desarrollo local (PowerShell/.NET)
├── package.json        # Metadatos del proyecto
├── vercel.json         # Configuración de deploy en Vercel
└── .claude/
    └── launch.json     # Configuración del servidor de preview
```

## Desarrollo local

Ejecutar el servidor estático con PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Luego abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> No se requiere `npm install` ni ninguna dependencia local.

## Deploy en Vercel

### Opción 1 — Vercel Dashboard (recomendado)

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar el repositorio `portfolio-adriana-oquendo`
3. Configurar con estos valores exactos:

| Campo | Valor |
|---|---|
| **Framework Preset** | `Other` |
| **Root Directory** | `.` *(dejar vacío / raíz del repo)* |
| **Build Command** | *(dejar vacío)* |
| **Output Directory** | *(dejar vacío)* |
| **Install Command** | *(dejar vacío)* |

4. Hacer clic en **Deploy** — listo.

### Opción 2 — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### ¿Por qué no hay build step?

Este proyecto es un sitio **100% estático**. React y Tailwind se cargan desde CDNs públicos en runtime. No hay proceso de compilación: Vercel sirve `index.html` directamente tal como está.

## Secciones del portafolio

- **Hero** — Título de impacto con animaciones de entrada
- **Logo Carousel** — Tira de tecnologías con scroll infinito CSS
- **Sobre mí** — Biografía con composición geométrica
- **Servicios** — Grid de 6 servicios con íconos
- **Trabajos destacados** — 3 proyectos con mockup de browser
- **Todos los trabajos** — Galería completa (9 proyectos) con filtros
- **Testimonios** — Opiniones de clientes
- **Contacto** — Formulario + información directa

## Licencia

MIT © Adriana Oquendo
