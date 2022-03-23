import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleColProps, ColRef } from './ExampleCol.types';
import { uniqueKey } from '../../utils/helpers';

/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleCol = (props: ExampleColProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef as ColRef,
    );
    return (
        <example-col 
            {...customElementProps} 
            ref={ref}
            key={uniqueKey('example-col')}
        >
            {children}
        </example-col>
    );
};

export default ExampleCol;
