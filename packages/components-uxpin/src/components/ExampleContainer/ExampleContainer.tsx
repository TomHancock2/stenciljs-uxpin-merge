import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleContainerProps } from './ExampleContainer.types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleContainer = (props: ExampleContainerProps) => {
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

export default ExampleContainer;
