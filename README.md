Bibek Shrestha and Angelo De Laurentis under supervision of John Morton for Cal Poly ITS

link to site: https://bbekstha.github.io/

## What we want to show with this site:
    - Reproducing the vanilla js code with Vue.js cdn links to compare pros and cons
    - Single Page app using Vue.JS framework
        - Routing with deep links
        - Dynamic scalable framework
    - Querying APIs (Accessing an open stock API)
        - https://bbekstha.github.io/#/stock
    - Querying protected APIs (Accessing github repos given access token)
        - https://bbekstha.github.io/#/repo
    - Querying OpenID protected API (Handled with redirect to AWS cognito sign in)
        - https://bbekstha.github.io/#/protected
    - Connecting to self made API hosted on Amazon SAM
        - https://bbekstha.github.io/#/personSearch

## Project layout:
   - README.md
      - This file.
   - format.css
      - Contains styling and formatting of the website elements.
   - DOMFunction.js
      - Contains function to create and modify the DOM elements.
   - cookieFunction.js
      - Contains getter and setter methods for cookie storage.
   - stock.js, repo.js, protected.js, personSearch.js
      - Contains functions to handle functionalities of respective components
   - index.js
      - Contains the components, routes and root vue instance.

## Programming approach:
   - index.js
      - Routing navigation and rendering respective components are handled by the vueRouter through the root vue instance.
      - Routes are defined with the path and the component relating to the path.
      - Component for each page is defined with necessary properties, rendering elements and the methods required.
      - Home buttons and deeplinks listed above can be used to navigate to different views
   - stock.js, repo.js, protected.js, personSearch.js
      As mentioned above in the project layout section, these files implement methods to handle the functionalities of the respective pages.

## Pros
   - Routing and navigation between views is lot easier than vanillaJS
      as it is handled through the vue-router
   - Cleaner templates and rendering of the routing views

## Cons
   - Multiple source files as script or functions to read other script files are needed for proper code management of large apps
   - Script files needs to be ordered properly for the functinalities to work without breaking.
