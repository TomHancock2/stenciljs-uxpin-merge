import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleField = props => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    const showChildren = true;
    // const [showChildren, setShowChildren] = React.useState(false);
    // React.useEffect(() => {
    //     if (!showChildren) {
    //         setShowChildren(true);
    //     }
    // });
    return (
        <example-field {...customElementProps} ref={ref}>
            {showChildren ? children : null}
        </example-field>
    );
};

ExampleField.propTypes = {
    error: PropTypes.string,
    hiddenLabel: PropTypes.bool,
    hint: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    join: PropTypes.bool,
    optional: PropTypes.bool,
    optionalText: PropTypes.string,
    patternMismatch: PropTypes.string,
    rangeOverflow: PropTypes.string,
    rangeUnderflow: PropTypes.string,
    stepMismatch: PropTypes.string,
    tooLong: PropTypes.string,
    tooShort: PropTypes.string,
    typeMismatch: PropTypes.string,
    valueMissing: PropTypes.string,
    children: PropTypes.node,
};

export { ExampleField as default };
