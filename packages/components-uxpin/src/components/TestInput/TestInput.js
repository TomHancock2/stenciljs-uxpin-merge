import * as React from 'react';
import * as PropTypes from 'prop-types';
import useCustomElement from 'use-custom-element';

const TestInput = props => {
    const { ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(otherProps);
    return (
        <test-input {...customElementProps} ref={ref}></test-input>
    );
};

TestInput.propTypes = {
    placeholder: PropTypes.string,
};

export { TestInput as default };
