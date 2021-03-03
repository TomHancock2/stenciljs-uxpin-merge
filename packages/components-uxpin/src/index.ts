declare global {
  namespace JSX {
      interface IntrinsicElements {
          'example-form': any;
          'example-field': any;
          'example-input': any;
          'example-container': any;
          'example-col': any;
          'example-row': any;
          'example-label': any;
      }
  }
}
export * from './components/ExampleForm/ExampleForm';
export * from './components/ExampleField/ExampleField';
export * from './components/ExampleInput/ExampleInput';
