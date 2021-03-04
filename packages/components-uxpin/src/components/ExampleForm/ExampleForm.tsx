import * as React from 'react';
import { useCustomElement } from 'react-friendly-custom-elements';
import { ExampleFormProps } from './ExampleForm.types';

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
        uxpinRef
    );
    return (
        <example-form {...customElementProps} ref={ref}>
            <div>{children}</div>
        </example-form>
    );
};

export default ExampleForm;
