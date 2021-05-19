# Micro Frontend Experiments

Project to learn and experiments with micro frontend architecture

## Purpose

- Goal
  - While I was working at an enterprise financial company, I was very impressed with their large
    single page application that brought together 20+ teams' micro apps, available both as a website
    portal and desktop app (OpenFin)
  - Wondering if I could have built something equivalent, I set out to learn about micro frontend
    architecture and to experiment with my own solutions
  - In some cases, I have even created some improvements. By using "remote components" instead of
    dynamic import() statements
    - The time to built and deployed would be cut down from 30-45 minutes to 5 minutes.
    - Instead of having one deployment for all teams once per week, each team could build and deploy
      separately
- Features
  1. Experiments with micro frontend architecture: DynamicImports, Iframes, InjectWholeAppHtml,
     RemoteComponents
  2. Golden Layout
  3. Realtime updates via WebSockets
  4. Site and Desktop/OpenFin version
- Advantages
  - Each team works locally in an environment that accurately reflects the full app
  - Each team can deploy quickly, easily, and independently

---

## Requirements

- Node v12

## Install

- Run the following
  ```
  npm install
  ```

## Run

- Run the following
  ```
  npm start
  ```
- Open the site in your browser `http://localhost:8080`. Login with any username and password.
- Launch OpenFin Desktop version
  ```
  npm run desktop
  ```

---

## Explanations and More Detail

### Try It Out

1. Follow the `Install` and `Run` instructions above.
2. Open http://localhost:8080 in your browser.
3. Login with any username and password
4. Click the settings menu at the top right and try the various options
5. Click the Golden Layout navigation link and try it out
6. Open a 2nd browser. Login with the same username
7. Notice changes to the settings and Golden Layout are mirrored between both windows in real time
   via WebSockets

### Packages

- **router**  
  The key piece of this architecture. It has a few main functions

  - serves all the built JavaScript components
  - proxies standalone apps so they can be viewed in iframes
  - proxies REST and WebSocket requests to the server

  Note: by serving and proxing all requests through a single domain (localhost:8080), we avoid CORS
  errors

- **server**  
  Mock server built with Express to handle REST requests and WebSockets. In the real world, this
  would be a complete microservice backend with databases, caching, etc

- **site**  
  The website. Pulls all the micro front end apps together

- **desktop**  
  The website as a desktop app via OpenFin. (OpenFin is a version of Electron popular with
  enterprise financial companies.)

- **shared-tools**  
  Miscellaneous code shared between multiple packages: React components, TypeScript, and CSS

- **microapp-example**  
  Main example of a micro frontend app

- **microapp-cra**  
  Create React App as a micro frontend app

### Micro Frontend Solutions

I implemented 4 different solutions for a micro frontend framework. You can run the app and use the
settings menu at the top right to try / compare all of them.

1. Dynamic import()
   - Standard/most common solution. Most React apps are probably built this way.
   - Micro apps are loaded using import() statements or React.Lazy()
   - Pros - easy to do. The browser loads each micro app only when it needs it
   - Cons - the parent app's build will get slower and slower as it needs to process every micro
     app's code when it builds
2. Iframe
   - Easiest/oldest solution. Iframes have been around for decades
   - People complain a lot about iframes, but I believe most problems with them are fairly easy to
     overcome
   - You can even refresh the child app when the parent app's prop changes. (See implementation)
   - Pros - very easy and well understood
   - Cons - very slow. Also, you need to run a server for every child app
3. Inject Whole App HTML
   - I invented this innovative/weird solution
   - The parent app makes an XHR to the child app and injects the HTML into itself
   - Pros - very easy. Only requires a few changes to the child app's initialization script
   - Cons - very - pon standard. A little slow. Also, you need to run a server for every child app
4. Load "Remote components - Component" From URL
   - Best solution
   - Each micro app is compiled into a JavaScript file.
   - It's very similar to Dynamic Import except each child is wrapped in a function that exposes it
   - The parent requests this file and loads it as a React component by calling the function
   - Pros - fastest
   - Cons - none that I found

### Shadow DOM

You can also toggling the setting that wraps each micro app in a Shadow DOM. If you aren't familiar
with it, Shadow DOM prevents CSS leaking both in and out across itself.

- Pros - no app can contaminate another app with its own CSS (e.g. see CRA App modifies the color of
  links in the main site nav)
- Cons - some 3rd party libraries do not work (e.g. SlickGrid. See the grid page)

### Key Files to Look At

- Router
  - Symlinking all built React components to serve them from dist  
    packages/router/package.json
  - Serving all built React components and proxying the server packages/router/webpack.config.js
  - Definitions for the micro apps
    packages/router/src/app-and-nav-definitions/app-and-nav-definitions.json
- Micro Frontend Approaches
  - Remote components - components (the best micro front end solution demoed in this app)currently
    no easy solution exists tha I could find
    - Export RemoteComponent  
      packages/shared-tools/src/components/export-remote-component.tsx
    - Load RemoteComponent  
      packages/site/src/components/micro-frontend-modes/remote-component.tsx
  - Other micro frontend solutions
    - Iframe. Despite being an iframe, changes in props are passed down to the child app  
      packages/site/src/components/micro-frontend-modes/iframe-component.tsx
    - InjectWholeAppHtml. A rather weird and innovative solution for micro front ends
      packages/site/src/components/micro-frontend-modes/inject-whole-app-html-component.tsx

---

## Productionizing This Project for the Real World

If you wanted to adopt this code as the basis of your company's micro frontend solution, you should
do the following

- Server
  - Replace the server with a production grade microservice architecture
- Dev/QA/Prod
  - The router should be modified to serve dev, QA, and prod environments. Dev would be proxied when
    working locally.
- Delete uneeded files
  - Presumably, you should pick 1 of the micro frontend solutions (e.g. remote components) and
    delete the others from
    - packages/site/src/components/micro-frontend-modes
    - packages/site/src/components/top-bar/settings-menu.tsx
    - packages/site/src/redux/reducer.ts
    - packages/router/src/app-and-nav-definitions/app-and-nav-definitions.json
    - packages/microapp-example/webpack.config.app.js v.s.
      packages/microapp-example/webpack.config.components.js
    - packages/microapp-example/src/app v.s. packages/microapp-example/src/components
- Folder structure
  - Each team should get its own monorepo.
  - site and shared-components would go in a "core team"s repo
  - router and desktop would go in another repo
  - Each micro app team would have their own mono repo
- Package names
  - Packages should probably be named with a pattern like "@company/team-name-project-name"
- Local workflow
  - Micro apps would clone their own repo and the router+desktop repo
  - They would use npm link or symlinks to link their projects into the local copy of the router
  - All they would have to do is run their micro app, router, and desktop. Very fast and easy.
  - This would mean each team would be building in a version of the parent app that was as real as
    possible
- Releases
  - When ready, a micro app team would publish their npm package to the company's private npm
  - The team would update their version number in router's package.json
  - Build and release the latest router
  - This would allow teams to deploy quickly, easily, and independently
  - It would be easy to rollback any team's version if necessary

## Notes and Known Issues

- Windows  
  This was developed on a Mac. Presumably the symlink commands would need to be modified for
  Windows. (Work in progress)
- LESS vs SASS/SCSS vs CSS modules  
  In my experience, corporate environments and tools like Gitlab block the installation of SASS/SCSS
  because it downloads a binary file from a remote server. For this reason, I chose LESS which is
  nearly identical. CSS modules with TypeScript typing would be even better.

## Credits

- Micro Frontend Frameworks  
  Cam Jackson and Michael Geers for their phenomenal articles and code samples on micro front ends

  - https://martinfowler.com/articles/micro-frontends.html
  - https://micro-frontends.org
  - https://the-tractor.store
  - https://github.com/naltatis/micro-frontends-in-action-code

- Golden Layout  
  The creators of Golden Layout, an incredible JavaScript library to create flexible panes and
  grids. Additionally, this app's charts and tables have been adapted from the demo on their site
  - https://golden-layout.com

## Learned

This project has been a source of tremendous learning.

- Micro front end architecture and solutions
  - Iframes
    - Passing props through from parent to child
  - Remote components
    - The ideal solution
    - Currently no easy solution exists that I could find
- Webpack
  - Especially how to export React components from one app into another. See
    - libraryTarget and externals:  
      packages/microapp-example/webpack.config.components.js
    - alias:  
      packages/site/webpack.config.js
- Parcel
  - Much faster and easier than Webpack... but doesn't seem to allow exporting a React component
    from one app into another
- Proxies
  - Great way to avoid CORS problems and actually super easy to implement
- Live-server
  - Great npm package for serving single page applications
  - Much faster than Webpack devServer
- ShadowDOM
  - Great for CSS isolation, but... doesn't work will all 3rd party libs (e.g. SlickGrid)
- Lerna
  - Very easy to create a monorepo
  - Alternatively, this syntax is easier than npm link  
    "package-name": "file:../path/to/directory/package-name"
- More knowledge of and practice with
  - WebSockets
  - Golden Layout, especially adapting it to React
  - Wepback plugins
  - JavaScript formats: CommonJS, UMD, modules, etc
