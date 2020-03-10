import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'components',
  enableCache: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    },
    {
      type: 'dist-custom-elements-bundle',
    },
  ],
  copy: [
    {src: 'custom-elements.mjs'}
  ]
};
