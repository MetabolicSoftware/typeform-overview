# Typeform overview

Typeform does not yet have a (exportable) overview of the full survey definition / content. To share the underlying logic people need to be granted edit rights.
This projects takes in the json definitions of the surveys that can be downloaded through their API or their [Request data function](https://www.typeform.com/help/a/data-portability-360029616371/) and generates a somewhat human readable overview. This overview could then also be saves as pdf.
It hopefully provides an answer to this [community question](https://community.typeform.com/build-your-typeform-7/is-it-possible-to-export-the-form-content-questions-choices-logics-not-the-result-in-pdf-or-excel-1062).

## Project Setup

```sh
npm install
```

### Loading survey definitions through API

Supply `TYPEFORM_PERSONAL_ACCESS_TOKEN` in an `.env` file, see `.env.example`.

```sh
npm run load-surveys
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## ToDo's

- Link fields and choices in logic the their fields and choices through anchors
- Support more question types
- Fix issues with \*'s in texts
