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
  globalStyle: 'src/global/global.css',
  testing: {
      testPathIgnorePatterns: [
          'node_modules',
      ],
      browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  buildEs5: 'prod',
  extras: {
      dynamicImportShim: true,
      shadowDomShim: true,
      safari10: false,
      scriptDataOpts: true,
      appendChildSlotFix: false,
      cloneNodeFix: true,
      slotChildNodesFix: true,
  },
};
