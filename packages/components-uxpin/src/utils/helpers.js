import { 
   TestField,
   TestInput,
   TestLabel
} from 'components/dist/custom-elements-bundle/index.mjs';

export const setUpCustomElements = () => {
    if(!window.customElements.get('test-field'))  {
        window.customElements.define('test-field', TestField)
    }
    if(!window.customElements.get('test-label'))  {
        window.customElements.define('test-label', TestLabel)
    }
    if(!window.customElements.get('test-input')) {
        window.customElements.define('test-input', TestInput);
    }
};
