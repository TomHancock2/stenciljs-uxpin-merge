import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleRowProps, RowRef } from './ExampleRow.types';
import { uniqueKey } from '../../utils/helpers';

/**
 * @uxpinwrappers
 * NonResizableWrapper
 */
const ExampleRow = (props: ExampleRowProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef as RowRef,
    );
    return (
        <example-row
            {...customElementProps} 
            ref={ref}
            key={uniqueKey('example-form')}
        >
            {children}
        </example-row>
    );
};

export default ExampleRow;