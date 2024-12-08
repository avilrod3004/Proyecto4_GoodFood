# GoodFood

- Guia detallada
  - [Descripción de la aplicación](https://github.com/avilrod3004/Proyecto4_GoodFood/tree/4_2_firestorage?tab=readme-ov-file#descripci%C3%B3n-de-la-aplicaci%C3%B3n)
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
![Inicio 1](images/inicio_1.png)
![Inicio 2](images/inicio_2.png)

2. **Pantallas de inicio de sesión y de registro**: Estas páginas son accesibles desde el encabezado de la web. Permiten a usurio crear una cuenta o iniciar sesión si ya tiene una cuenta.
![Login](images/login.png)
![Registro](images/registro.png)

3. **Perfil del usuario**: Después de entrar en su cuenta el usuario es dirigido a su perfil. Desde esta pantalla puede añadir información a su perfil, como: biografiá y enlaces a sus redes sociales, etc. También puede consultar sus recetas guardadas en favoritos. Las recetas se pueden visualizar en dos formatos: tarjetas pequeñas y tarjetas grandes (contienen más información).
![Perfil del usuario](images/perfil_usuario.png)
![Perfil del usuario con recetas detalladas](images/perfil_usuario_2.png)

4. **Actualizar los datos del usuario**: Desde el encabezado de la página el usuario puede modificar la información que se muestra en su perfil, como: su nombre de usuario, su biografiá, enlaces de sus redes sociales. Y también la información privada del usuario, como: su nombre y apellido, y su número de teléfono. 
De los datos públicos son obligatorios: el nombre del usuario y la biografía. La información que se muestra en el perfil dependerá los campos que haya rellenado.
![Modificar la información del perfil del usuario](images/modificar_perfil.png)

5. **Buscar recetas por filtros** (solo para usuarios registrados): Hay 4 pantallas que permiten buscar recetas aplicando filtros: "Quick recipes", "Breakfast", "Lunch/dinner" y "All recipes". Las 3 primeras tienen aplicados unos filtros predeterminados y la última no tiene ningun filtro por defecto.
Todas las busquedas estan paginadas en grupos de 20 recetas por página.
![Paginación](images/paginacion.png)

   - **Quick recipes**: Muestra recetas que duran menos de 15 minutos. Aparte el usuario puede añadir más filtros a la busqueda.
![Recetas de menos de 15 minutos](images/quickrecipes.png)
    - **Breakfast**: Muestra recetas de desayunos.
![Recetas de desayunos](images/breakfast.png)
    - **Lunch/dinner**: Muestra recetas para la hora de comer o cenar.
![Recetas para comer o cenar](images/lunch-dinner.png)
    - **All recipes**: No aplica filtros por defecto. La que muestre recetas el usuario debe aplicar como mínimo un filtro.
![Sin aplicar filtros por defecto](images/all_recipes_1.png)
![Aplicando un filtro](images/all_recipes_2.png)

6. **Información de las recetas** (solo para usuarios registrados): Al pinchar en alguna de las recetas el usuario es redirigido a una página donde puede consultar más información sobre la receta. Desde esta pantalla el usuario puede agregar (o quitar) la receta a favoritos.
![Información sobre una receta](images/info_receta.png)

7. **Formulario de contacto**: La web ofrece un formulario de contacto para todos los usuarios:
![Formulario de contacto](images/contacto.png)

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

## Instalación y configuración
1. Instalar node, comprobar si esta instalado con el comando `node --version`
2. Clonar el repositorio.
3. Abrir la carpeta del proyecto y ejecutar el comando `npm install` para instalar todas las dependencias.
4. Añadir las variables de entorno de firebase y de la API en un fichero `.env.local`, siguiendo esta estructura:
```
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_RECIPES_API_ID=""
VITE_RECIPES_API_KEY=""
```
5. Ejecutar el proyecto en local con este comando `npm run dev`.

# Documentación del código
aaa

# Reflexión

# Versión desplegada
[GoodFood desplegado de Netlify](fanciful-vacherin-2a3294.netlify.app/)
