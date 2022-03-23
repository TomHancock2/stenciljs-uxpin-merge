import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleFieldProps, FieldRef } from './ExampleField.types';
import { uniqueKey } from '../../utils/helpers';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleField = (props: ExampleFieldProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {},
        uxpinRef as FieldRef,
    );
    return (
        <example-field
            {...customElementProps}
            ref={ref}
            key={uniqueKey('example-field')}
        >
            {children}
        </example-field>
    );
};

export default ExampleField;
