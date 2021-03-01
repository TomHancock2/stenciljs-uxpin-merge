import {
    ExampleField as ExampleFieldCE,
    ExampleForm as ExampleFormCE,
    ExampleInput as ExampleInputCE,
    ExampleLabel as ExampleLabelCE,
} from 'components/dist/custom-elements/index.js';

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
};
