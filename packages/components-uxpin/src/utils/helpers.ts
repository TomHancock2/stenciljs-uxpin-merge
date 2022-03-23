import {
    ExampleField as ExampleFieldCE,
    ExampleForm as ExampleFormCE,
    ExampleInput as ExampleInputCE,
    ExampleLabel as ExampleLabelCE,
    ExampleCol as ExampleColCE,
    ExampleRow as ExampleRowCE,
    ExampleContainer as ExampleContainerCE,
} from 'components/dist/custom-elements/index.js';
const uuidv4 = require('uuid/v4');

export const uniqueKey = (tagName: string): string => `${tagName}-${uuidv4()}`;

export const setUpCustomElements = () => {
    if (!window.customElements.get('example-field')) {
        window.customElements.define('example-field', ExampleFieldCE);
    }
    if (!window.customElements.get('example-label')) {
        window.customElements.define('example-label', ExampleLabelCE);
    }
    if (!window.customElements.get('example-form')) {
        window.customElements.define('example-form', ExampleFormCE);
    }
    if (!window.customElements.get('example-input')) {
        window.customElements.define('example-input', ExampleInputCE);
    }
    if (!window.customElements.get('example-col')) {
        window.customElements.define('example-col', ExampleColCE);
    }
    if (!window.customElements.get('example-row')) {
        window.customElements.define('example-row', ExampleRowCE);
    }
    if (!window.customElements.get('example-container')) {
        window.customElements.define('example-container', ExampleContainerCE);
    }
};
