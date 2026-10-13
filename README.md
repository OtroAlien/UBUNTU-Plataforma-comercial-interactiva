# UBUNTU | Plataforma comercial interactiva

Demo de Fase 1 para UBUNTU, desarrollada por Sodium Software. Presenta la identidad visual, navegación, búsqueda local, categorías y primeras tarjetas comerciales ficticias. El repositorio fue iniciado desde cero.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abrí la URL que indique Vite. Para comprobar el paquete de producción:

```bash
npm run build
npm run preview
```

El proyecto está preparado para desplegarse como aplicación Vite en Vercel.

## Arquitectura

- `src/App.tsx`: home y componentes específicos de esta fase.
- `src/components/ui/button.tsx`: botón reutilizable compatible con la convención de shadcn/ui.
- `src/data/businesses.ts`: comercios, categorías y localidades ficticias.
- `src/index.css`: tokens visuales, layouts, estados y responsive.
- `public/images`: imágenes originales generadas para esta demo y optimizadas en WebP.

Stack: React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, Motion, Lucide React y React Router.

## Alcance de esta fase

La búsqueda filtra los seis negocios de muestra por texto, categoría y localidad. Las tarjetas abren una vista previa. Las secciones de promociones, revista y captación comercial presentan el concepto e indican expresamente que su funcionalidad llegará en otra fase. No hay backend, autenticación, cobros ni enlaces de contacto ficticios.

El logotipo actual es un placeholder tipográfico. Todos los comercios y datos son inventados para la demo y no representan negocios reales. Las imágenes se generaron con ImageGen y se guardaron en el propio repositorio.

## Próximas fases propuestas

1. Directorio completo con fichas individuales y mapa.
2. Publicidad y beneficios cruzados.
3. Revista digital, gravedad y minijuego.
4. Panel administrativo demostrativo.
5. Pulido general, accesibilidad y rendimiento.
