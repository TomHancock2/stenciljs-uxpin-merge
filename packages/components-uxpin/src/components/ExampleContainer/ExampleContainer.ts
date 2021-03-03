import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useCustomElement } from 'react-friendly-custom-elements';
/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleContainer = props => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef
    );
    const [showChildren, setShowChildren] = React.useState(false);
    React.useEffect(() => {
        if (!showChildren) {
            setShowChildren(true);
        }
    });
    return (
        <example-container {...customElementProps} ref={ref}>
            {showChildren ? children: null}
        </example-container>
    );
};

ExampleContainer.propTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.node,
};

export { ExampleContainer as default };
