import * as React from 'react';
//import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleFormProps } from './ExampleForm.types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleForm = (props: ExampleFormProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {
            onSubmit: 'exampleFormSubmit',
            onError: 'exampleFormInvalid',
        },
        uxpinRef
    );
    return (
        <example-form {...customElementProps} ref={ref}>
            <div>{children}</div>
        </example-form>
    );
};

// ExampleForm.propTypes = {
//     acceptCharset: PropTypes.string,
//     action: PropTypes.string,
//     allowRedirect: PropTypes.bool,
//     autocomplete: PropTypes.string,
//     disabledClearOnSubmit: PropTypes.bool,
//     disabledValidation: PropTypes.bool,
//     enctype: PropTypes.string,
//     errorSummaryHeadingText: PropTypes.string,
//     errorSummaryHeadingLevel: PropTypes.string,
//     hiddenErrorSummary: PropTypes.bool,
//     method: PropTypes.oneOf(['get', 'post']),
//     name: PropTypes.string,
//     optionalLabels: PropTypes.bool,
//     patternMismatch: PropTypes.string,
//     rangeOverflow: PropTypes.string,
//     rangeUnderflow: PropTypes.string,
//     stepMismatch: PropTypes.string,
//     tooLong: PropTypes.string,
//     tooShort: PropTypes.string,
//     typeMismatch: PropTypes.string,
//     valueMissing: PropTypes.string,
//     onSubmit: PropTypes.func,
//     onError: PropTypes.func,
//     children: PropTypes.node,
//     header: PropTypes.node,
//     footer: PropTypes.node,
// };

export { ExampleForm as default };
