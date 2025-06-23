# Challenge Documentation

Since this was a partially initiated project, it was decided to continue using **CSS Modules** in order to adhere to the existing code standard and reuse previously defined styles without unnecessary modifications.

## Relevant Notes

- The `--primary-text-contrast` variable, used as the text color for the _home_ cards, had the same value for both light and dark modes, which resulted in poor contrast in dark mode.  
  A comment was left in the `theme.css` file suggesting a more suitable value for dark mode.

- Regarding SVG icons, it was decided to import all of them from the [Heroicons](https://heroicons.com/) library to maintain design consistency. This decision was made considering that the project already included some imports from that library, so the priority was to unify the approach and reduce potential code duplication.

## -The "X" button on the drawer could present contrast issues in certain cases, as it is positioned over an image whose colors are not controllable. To address this issue, a background color was added to the button to ensure better visibility regardless of the underlying image.

## Development Stages

The development process was carried out in multiple stages to ensure structure, visual quality, and functionality:

1. **Fixes**  
   Validation of existing CSS. Classes and styles were adjusted so that current components match the Figma design.

2. **Creation**  
   Development of missing components, following the defined design guidelines and structure.

3. **First QA Review**  
   Validation of CSS variables and general component behavior.

4. **Responsive**  
   Implementation of responsive design to ensure correct layout on different screen sizes.

5. **Second QA Review**  
   Validation of responsive behavior across various devices and browsers. Errors, if any, were documented.

6. **Details**  
   Visual and functional refinements based on QA feedback. Effects or animations were added to enhance user experience when necessary.

7. **Accessibility**  
   Code review focused on accessibility improvements to ensure good SEO practices and site readability.

8. **SEO Testing**  
   SEO performance evaluation using Lighthouse.

9. **Deploy (Plus)**  
   Project deployed to Netlify for production preview.

10. **Delivery**  
    Final documentation and delivery of the completed project.

## How to Run the Project Locally

To run the project locally:

1. Open the terminal and navigate to the root of the project.
2. Run the following commands:

   ```bash
   npm install
   npm run dev
   ```

## Live Site

You can view the deployed site at the following link:

🔗 https://ylair-admin.netlify.app/
