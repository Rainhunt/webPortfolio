Welcome to my Web Portfolio.

Folders:
The project is sorted into images, pages, and style folders, wherein the respective files for the site (excluding the landing pages which each have their own style and image folders) are located.
The pages folder contains eng and heb sections, where a Hebrew version of the site will be implemented at a later date. Within the language folder is the home page (labeled index), the transition pages, and the landing page project folders.
The style folder contains all the CSS for the home page and transition pages, written in SASS and sorted into their own folders.

SASS:
_setup defines the variables, break points (<768px, <1200px, and >1200px), and default styling for elements across the site.
The rest of the styling is broken down by section, and labeled accordingly.
The transition pages all use the same style sheet, and that style sheet imports the setup, nav, logobanner, and footer from the home page.

Projects:
Each project is responsive and has both phone and desktop styles, with a breakpoint at 768px width.
Different styles of writing have been used across the various projects-
    The Coffee project writes the CSS in the head of the HTML page.
    The Free Consultation and Trailblazer projects link to an external CSS sheet.
    The Discovery and the Here And Now projects' styles are written in SASS.
    The Lead The Way project is written using Bootstrap.

Apps:
The apps have been written in javascript and typescript. The projects are responsive and functional, using a variety of technologies such as APIs, HTML canvases, OOP concepts, and complex logic to allow for a dynamic and interactive experience. 
For the javascript apps, care has been taken to split the file into readable sections. The typescript apps have a src and an out folder, where the code is written and compiled respectively. The page is displayed on the index.html and all images and other media are stored in the media folder. The src folder contains main.ts, the file that the index links to (the compiled version), a classes folder, a utils folder and a file for types.