import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';

/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleCol = props => {
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
        <example-col {...customElementProps} ref={ref}>
            {children}
        </example-col>
    );
};

const ColSize = [
    'auto','1','2','3','4','5','6','7','8','9','10','11','12',
];
const ColOffset = [
    '0','1','2','3','4','5','6','7','8','9','10','11',
];
const AlignSelf = [
    'start', 'end', 'center', 'stretch',
]

ExampleCol.propTypes = {
    span: PropTypes.oneOf(ColSize),
    offset: PropTypes.oneOf(ColOffset),
    alignSelf: PropTypes.oneOf(AlignSelf),
    children: PropTypes.node,
};

export { ExampleCol as default };
