import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';

/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleRow = props => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    // const [showChildren, setShowChildren] = React.useState(false);
    // React.useEffect(() => {
    //     if (!showChildren) {
    //         setShowChildren(true);
    //     }
    // });
    return (
        <example-row {...customElementProps} ref={ref}>
            {children}
        </example-row>
    );
};

const gutter = ['none', 'sm', 'lg'];
ExampleRow.propTypes = {
    gutter: PropTypes.oneOf(gutter),
    justifyContent: PropTypes.oneOf([
        'around',
        'between',
        'center',
        'end',
        'evenly',
        'start',
        'stretch',
    ]),
    alignItems: PropTypes.oneOf(['center', 'end', 'start', 'stretch']),
    children: PropTypes.node,
};

export { ExampleRow as default };
