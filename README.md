# stenciljs-uxpin-merge

**This is an example repository that shows how to use StencilJS components within UXPin Merge.** 

It utilises the [wrapper method of integrating UXPin](https://www.uxpin.com/docs/merge/integrating-your-own-components/#integration-with-wrappers-for-components) and wraps StencilJS build components. 

## Technology

- [StencilJS](https://stenciljs.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [UXPin Merge](https://www.uxpin.com/merge)
- [Lerna Monorepo](https://github.com/lerna/lerna)
- [Yarn](https://yarnpkg.com/)

## Repo Structure

- `packages`
  - `components` - StencilJS built components
  - `components-uxpin` - UXPin wrappers for the `components` package
  - `react-friendly-custom-elements` - contains a hook called `useCustomElement` for using custom elements in `React`
- `lerna.json` - configuration of lerna monorepo

## Usage

### Quick start

`yarn install && yarn start:uxpin` - this will install all dependencies, build `components` package and start UXPin merge in experimental mode

### Commands

- `yarn build:stencil` - will build the `components` package
- `yarn start:stencil` - will start Stencil development server
- `yarn start:uxpin` - will start UXPin merge in expirmental mode (also run `yarn build:stencil`)

## Implementation notes

### Keys

Each component has a unique key applied at run time to ensure that you do not need to re-load the page every time a property is updated. Due to the nature of web components and slot content, React will throw an error when the content changes.

### Slots

Web components use slots to position and style it's content. Each component has a `slot` property so components can be nested into a parent component's slot.

### useCustomElement

Each UXPin wrapper uses `useCustomElement` hook. This hook, inspired by the original [useCustomElement hook](https://www.npmjs.com/package/use-custom-element), bridges the gap between custom elements and react. For example, it will assign event callbacks to listeners and stringify objects for use by custom elements.
