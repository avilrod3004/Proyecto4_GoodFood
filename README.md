# GoodFood

## Tercera entrega. Integración y avance
### Progreso
Nuevas funcionalidades:
- **Inicio de sesión y registro**: Autenticación de usuarios mediante Firebase.
- **Protección de rutas**: Las rutas privadas (usan un layout privado) solo son accesibles si un usuario está logueado. En caso de que no este logueado al intentar acceder a las páginas privadas el usuario es redirigido al formulario de login.
- **LazyLoad**: Se cargan solo los componentes principales cuando el usuario accede a la web. Componentes que no se cargan: páginas de búsqueda de recetas, el perfil de usuario y la página de error 404.
- **Petición a la API**: Llamada a la API en la página de inicio. En la página `/home` se muestran 20 recetas aleatorias. Las recetas están paginadas en grupos de 10 recetas.

Objeto con los datos para hacer la petición:
https://github.com/avilrod3004/Proyecto4_GoodFood/blob/bc5f2a7bd4c920e6cc2ba91268b2f2127ea75415/src/pages/Home.jsx#L12-L16

Hacer la petición al cargar la página:
https://github.com/avilrod3004/Proyecto4_GoodFood/blob/bc5f2a7bd4c920e6cc2ba91268b2f2127ea75415/src/pages/Home.jsx#L23-L40

La llamada es asíncrona, así que si todavía no hay respuesta se muestra un mensaje "Loading..."
https://github.com/avilrod3004/Proyecto4_GoodFood/blob/b95648e98e47522f60ec69ddccc97340ab5c584c/src/pages/Home.jsx#L61-L95

### Demostración llamada a la API
Llamada a la API al cargar la página y se actualiza la interfaz:
![Demostración llamada API](./doc/prueba_llamada_api.gif)

iconos de health -> <a target="_blank" href="https://icons8.com/icon/96736/no-celery">App</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

- Guia detallada
  - Descripción de la aplicación
  - Tecnologías utilizadas
  - Instalación y configuración
- Documentación del código
- Reflexión
- Versión desplegada

# Guía detallada
## Descripción de la aplicación
GoodFood es una aplicación web SPA diseñada para facilitar la búsqueda de recetas.  Su propósito es ayudar a los usuarios a innovar en la cocina, permitiéndoles descubrir nuevas recetas de diferentes características y culturas.

## Pantallas y funcionalidades
1. **Pantalla de inicio**: Da la bienvenida al usuario y lo invita a descubrir nuevas recetas. Un poco más abajo de la portada se muestran 20 recetas aletorias paginadas.
![Inicio 1](./doc/inicio_1.png)
![Inicio 2](./doc/inicio_2.png)

2. **Pantallas de inicio de sesión y de registro**: Estas páginas son accesibles desde el encabezado de la web. Permiten a usurio crear una cuenta o iniciar sesión si ya tiene una cuenta.
![Login](./doc/login.png)
![Registro](./doc/registro.png)

3. **Perfil del usuario**: Después de entrar en su cuenta el usuario es dirigido a su perfil. Desde esta pantalla puede añadir información a su perfil, como: biografiá y enlaces a sus redes sociales, etc. También puede consultar sus recetas guardadas en favoritos. Las recetas se pueden visualizar en dos formatos: tarjetas pequeñas y tarjetas grandes (contienen más información).
![Perfil del usuario](./doc/perfil_usuario.png)
![Perfil del usuario con recetas detalladas](./doc/perfil_usuario_2.png)

4. **Actualizar los datos del usuario**: Desde el encabezado de la página el usuario puede modificar la información que se muestra en su perfil, como: su nombre de usuario, su biografiá, enlaces de sus redes sociales. Y también la información privada del usuario, como: su nombre y apellido, y su número de teléfono. 
De los datos públicos son obligatorios: el nombre del usuario y la biografía. La información que se muestra en el perfil dependerá los campos que haya rellenado.
![Modificar la información del perfil del usuario](./doc/modificar_perfil.png)

5. **Buscar recetas por filtros** (solo para usuarios registrados): Hay 4 pantallas que permiten buscar recetas aplicando filtros: "Quick recipes", "Breakfast", "Lunch/dinner" y "All recipes". Las 3 primeras tienen aplicados unos filtros predeterminados y la última no tiene ningun filtro por defecto.
Todas las busquedas estan paginadas en grupos de 20 recetas por página.
![Paginación](./doc/paginacion.png)

   - **Quick recipes**: Muestra recetas que duran menos de 15 minutos. Aparte el usuario puede añadir más filtros a la busqueda.
![Recetas de menos de 15 minutos](./doc/quickrecipes.png)
    - **Breakfast**: Muestra recetas de desayunos.
![Recetas de desayunos](./doc/breakfast.png)
    - **Lunch/dinner**: Muestra recetas para la hora de comer o cenar.
![Recetas para comer o cenar](./doc/lunch-dinner.png)
    - **All recipes**: No aplica filtros por defecto. La que muestre recetas el usuario debe aplicar como mínimo un filtro.
![Sin aplicar filtros por defecto](./doc/all_recipes_1.png)
![Aplicando un filtro](./doc/all_recipes_2.png)

6. **Información de las recetas** (solo para usuarios registrados): Al pinchar en alguna de las recetas el usuario es redirigido a una página donde puede consultar más información sobre la receta. Desde esta pantalla el usuario puede agregar (o quitar) la receta a favoritos.
![Información sobre una receta](./doc/info_receta.png)

7. **Formulario de contacto**: La web ofrece un formulario de contacto para todos los usuarios:
![Formulario de contacto](./doc/contacto.png)

## Tecnologías utilizadas
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) -> Para la estructura básica de la aplicación web.
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white) -> Para el diseño y los estilos
- ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white) -> Librería basada en JavaScript para construir interfaces de usuario.
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white) -> Para crear una web SPA.
- ![React Toastify](https://img.shields.io/badge/React_Toastify-FFDD00?logo=react&logoColor=black) -> Para usar toasts que informen al usuario según los eventos que suceden.
- ![LocalStorage](https://img.shields.io/badge/LocalStorage-00599C?logo=databricks&logoColor=white) -> Para guardar los datos del usuario en el navegador mientras está usando la web.
- ![Firebase Authentication](https://img.shields.io/badge/Firebase_Auth-FFCA28?logo=firebase&logoColor=black) -> Para gestionar los usuarios registrados.
- ![Firestore](https://img.shields.io/badge/Firestore-FFA000?logo=firebase&logoColor=black) -> Para almacenar de forma persistente los datos de los usuarios.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) -> Herramienta para construir la estructura del proyecto
- ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white) -> Sistema de control de versiones
- ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) -> Repositorio para alojar el código del proyecto.
- ![WebStorm](https://img.shields.io/badge/WebStorm-21D789?logo=webstorm&logoColor=white) -> IDE usado para desarrollar el proyecto.
- ![API](https://img.shields.io/badge/Edaman_recipe_API-0088CC?logo=api&logoColor=white) -> API externa para obtener las recetas. Permite hacer consultas sobre más de 2 millones de recetas. [Edamam recipe API](https://developer.edamam.com/edamam-recipe-api)


