# KalazantiWebsite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```






Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Project Structure (Clean Feature Architecture)

The project follows a clean, feature-driven architecture:

```
src/app/
├── core/                  # App-wide singletons, layout & core configuration
│   ├── config/            # App and API configuration (app.config.ts, api.config.ts)
│   ├── navigation/        # Global navigation components & models (menu, nav-item)
│   └── index.ts           # Barrel export for core module
├── features/              # Feature modules (self-contained domain units)
│   ├── about/             # Rólunk page feature
│   ├── hirek/             # Hírek / Blog feature
│   │   ├── components/    # hirek-lista, hir-elem, hir-reszletek
│   │   ├── models/        # blog-post.model.ts
│   │   ├── services/      # blog.service.ts
│   │   └── index.ts
│   ├── home/              # Kezdőlap feature
│   ├── kapcsolat/         # Kapcsolat feature
│   ├── not-found/         # 404 Not Found feature
│   └── programok/         # Programok feature
├── shared/                # Reusable UI components, pipes, directives
│   ├── components/        # loading-screen, and future reusable widgets
│   └── index.ts           # Barrel export for shared components
├── app.config.ts          # Core config re-export
├── app.routes.ts          # Root routing configuration
└── app.ts / app.html      # App shell root component
```

Path aliases configured in `tsconfig.json`:
- `@core/*` -> `src/app/core/*`
- `@shared/*` -> `src/app/shared/*`
- `@features/*` -> `src/app/features/*`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
