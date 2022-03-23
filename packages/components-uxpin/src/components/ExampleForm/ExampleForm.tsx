import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';

import { ExampleFormProps, FormRef } from './ExampleForm.types';
import { uniqueKey } from '../../utils/helpers';

/**
 * @uxpinwrappers
 * SkipContainerWrapper
 */
const ExampleForm = (props: ExampleFormProps) => {
    const { children, uxpinRef, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(
        otherProps,
        {
            onSubmit: 'exampleFormSubmit',
            onError: 'exampleFormInvalid',
        },
        uxpinRef as FormRef,
    );
    return (
        <example-form
            {...customElementProps}
            ref={ref}
            key={uniqueKey('example-form')}
        >
            {children}
        </example-form>
    );
};

export default ExampleForm;
