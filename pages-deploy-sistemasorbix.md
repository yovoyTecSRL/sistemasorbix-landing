# 🚀 Guía de Deploy — sistemasorbix.com en GitHub Pages

Este documento describe cómo desplegar la landing oficial de **Orbix AI Systems** en `sistemasorbix.com` con **GitHub Pages + HTTPS automático**.

---

## 1. Workflow de Deploy

Crea/actualiza el archivo `.github/workflows/pages.yml`:

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

concurrency:
  group: pages
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .   # ⚡ Cambiar a 'dist' si hay carpeta de build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
