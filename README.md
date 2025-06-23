# Documentación del Challenge

**Challenge a resolver:** [Challenge](DOCS.md)

Dado que se trataba de un proyecto ya parcialmente iniciado, se decidió continuar utilizando **CSS Modules** para respetar el estándar del código existente y poder reutilizar estilos previamente definidos sin modificaciones innecesarias.

## Observaciones relevantes

- La variable `--primary-text-contrast`, utilizada como color de fuente en las _cards_ del _home_, presentaba el mismo valor tanto en modo claro como en modo oscuro, lo que generaba un bajo contraste en este último.  
  Se dejó un comentario en el archivo `theme.css` con una sugerencia de valor más adecuado para el modo oscuro.

- En cuanto a los íconos SVG, se optó por importar todos desde la librería [Heroicons](https://heroicons.com/) para mantener coherencia en el diseño y evitar inconsistencias. Esta decisión se tomó considerando que el proyecto ya contaba con algunos import desde dicha librería, por lo que se priorizó unificar el criterio y reducir posibles duplicaciones de código.

- El botón "X" del drawer podría presentar problemas de contraste visual en ciertos casos, ya que se superpone a una imagen cuyo color no es controlable. Para resolver este inconveniente, se decidió agregar un color de fondo al botón, garantizando así una mejor visibilidad independientemente de la imagen de fondo.

## Etapas del desarrollo

El desarrollo se abordó en distintas etapas para asegurar orden, calidad visual y funcionalidad del proyecto:

1. **Reparación**  
   Validación del CSS ya implementado. Se ajustaron clases y estilos para que los componentes existentes se alineen con el diseño en Figma.

2. **Creación**  
   Desarrollo de los componentes faltantes siguiendo las guías de estilo y estructura del diseño.

3. **Primera revisión de QA**  
   Verificación de variables CSS y comportamiento general de los componentes.

4. **Responsive**  
   Implementación del diseño responsivo para asegurar una correcta visualización en diferentes tamaños de pantalla.

5. **Segunda revisión de QA**  
   Validación del diseño en múltiples dispositivos y navegadores. Se registraron errores en caso de haberlos.

6. **Detalles**  
   Ajustes visuales y funcionales derivados de QA. En esta instancia se agregaron efectos o animaciones menores que aportan a la experiencia del usuario.

7. **Accesibilidad**  
   Revisión del código orientada a mejoras en accesibilidad, priorizando buenas prácticas de SEO y legibilidad del contenido.

8. **Testeo de SEO**  
   Evaluación del rendimiento SEO utilizando Lighthouse.

9. **Deploy (Plus)**  
   Despliegue del proyecto en Netlify para visualización en entorno de producción.

10. **Entrega**  
    Documentación final y entrega del proyecto completo.

## Cómo correr el proyecto localmente

Para ejecutar el proyecto en entorno local:

1. Abrí la terminal y posicionate en la raíz del proyecto.
2. Ejecutá los siguientes comandos:

   ```bash
   npm install
   npm run dev
   ```

## Sitio desplegado

Podés visualizar el sitio en producción en el siguiente enlace:

🔗 https://ylair-admin.netlify.app/
