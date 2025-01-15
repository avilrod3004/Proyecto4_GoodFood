# Testing en producción

# Evaluación inicial de estándares y nagevación

## Estándares empleados

## Facilidad de navegación

# Pruebas de usabilidad y velocidad con herramientas automáticas

## WebPageTest

![Resultados del test de rendimiento de la página home en el navegador Firefox en desktop](./images/test_produccion/webpagetest_desktop_firefox_home.png)

Fallos encontrados en la velocidad:
- No se usa el atributo loading="lazy" en las imágenes que devuelve la API.
![Atributo loading="lazy"](./images/test_produccion/webpagetest_desktop_firefox_home_images.png)
- Las tipografías están alojadas en servidores de terceros.
![Tipografías alojadas en servidores de terceros](./images/test_produccion/webpagetest_desktop_firefox_home_fonst.png)

Fallos encontrados en la usabilidad:
- Insuficiente contraste entre el color del texto y el color del fondo del footer.
![Contraste de colores](./images/test_produccion/webpagetest_desktop_firefox_home_color_constrast.png)