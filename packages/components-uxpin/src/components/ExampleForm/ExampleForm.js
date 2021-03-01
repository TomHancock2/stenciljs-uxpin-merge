import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleForm = props => {
    const { children, header, uxpinref, footer, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {
            onSubmit: 'exampleFormSubmit',
            onError: 'exampleFormInvalid',
        },
        uxpinref
    );
    const showChildren = true;
    // const [showChildren, setShowChildren] = React.useState(false);
    // React.useEffect(() => {
    //     if (!showChildren) {
    //         setShowChildren(true);
    //     }
    // });
    return (
        <example-form {...customElementProps} ref={ref}>
            <div>{showChildren ? children : null}</div>
        </example-form>
    );
};

ExampleForm.propTypes = {
    acceptCharset: PropTypes.string,
    action: PropTypes.string,
    allowRedirect: PropTypes.bool,
    autocomplete: PropTypes.string,
    disabledClearOnSubmit: PropTypes.bool,
    disabledValidation: PropTypes.bool,
    enctype: PropTypes.string,
    errorSummaryHeadingText: PropTypes.string,
    errorSummaryHeadingLevel: PropTypes.string,
    hiddenErrorSummary: PropTypes.bool,
    method: PropTypes.oneOf(['get', 'post']),
    name: PropTypes.string,
    optionalLabels: PropTypes.bool,
    patternMismatch: PropTypes.string,
    rangeOverflow: PropTypes.string,
    rangeUnderflow: PropTypes.string,
    stepMismatch: PropTypes.string,
    tooLong: PropTypes.string,
    tooShort: PropTypes.string,
    typeMismatch: PropTypes.string,
    valueMissing: PropTypes.string,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    children: PropTypes.node,
    header: PropTypes.node,
    footer: PropTypes.node,
};

export { ExampleForm as default };
