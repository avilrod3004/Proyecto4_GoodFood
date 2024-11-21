# GoodFood

## Segunda entrega. Estructura y funcionalidad básica
Estructura base:
Los ficheros estan ordenados entre las siguientes carpetas:
- `components` -> Contiene los componentes generales.
- `layouts` -> Componentes que definen las estruturas básicas de las páginas (públicas y privadas).
  - `components` -> Los componentes que forman los layouts.
- `pages` -> Representan las páginas principales de la web.
- `router` -> Enrutamiento de las páginas con React Router.

```plaintext
src/
├── assets/
├── components/
│   └── Button.jsx
├── layouts/
│   ├── LayoutPublic.jsx
│   └── components
│       ├── Footer.jsx
│       └── Navbar.jsx
├── pages/
│   ├── Breakfast.jsx
│   ├── ContactUs.jsx
│   ├── Home.jsx
│   ├── LunchDinner.jsx
│   ├── NotFound.jsx
│   └── Quickrecipes.jsx
├── router/
│   └── index.jsx
└── mian.jsx
```

## Progreso
- Se han creado los componentes que representan las páginas principales de la web: Home, Quickrecipes, Breakfast, Lunch/dinner, Contact us y Not Found.
- Se ha creado el layout público que define el header y el footer que tendrán todas las páginas públicas.
- Configurado el router para navegar por las páginas desde el menú de navegación del header.
- Creado formulario de contacto e implementado la validación de sus campos.

