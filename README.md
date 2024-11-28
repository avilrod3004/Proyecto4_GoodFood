# GoodFood

## Tercera entrega. Integración y avance
### Progreso
Nuevas funcionalidades:
- **Inicio de sesión y registro**: La autenticación de usuarios se realizar mediante Firebase.
- **Protección de rutas**: Las rutas privadas (usan un layout privado) solo son accesibles si un usuario esta logueado. En caso de que no este logueado al intentar acceder a las páginas privadas el usuario es redirigido al formulario de login.
- **Petición a la API**: Llamada a la API en la página de inicio. En la página `/home` se muestran 20 recetas aleatorias. Las recetas están paginadas en grupos de 10 recetas.

Objeto con los datos para hacer la peticion:
https://github.com/avilrod3004/Proyecto4_GoodFood/blob/bc5f2a7bd4c920e6cc2ba91268b2f2127ea75415/src/pages/Home.jsx#L12-L16

Hacer la petición al cargar la página:
https://github.com/avilrod3004/Proyecto4_GoodFood/blob/bc5f2a7bd4c920e6cc2ba91268b2f2127ea75415/src/pages/Home.jsx#L23-L40

