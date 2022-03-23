import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleContainerProps, ContainerRef } from './ExampleContainer.types';
import { uniqueKey } from '../../utils/helpers';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleContainer = (props: ExampleContainerProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef as ContainerRef,
    );
    return (
        <example-container 
            {...customElementProps}
            ref={ref}
            key={uniqueKey('example-container')}
        >
            {children}
        </example-container>
    );
};

export default ExampleContainer;
