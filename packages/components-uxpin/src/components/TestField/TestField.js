import * as React from 'react';
import * as PropTypes from 'prop-types';
import useCustomElement from 'use-custom-element';

const TestField = props => {
    const { children, ...otherProps } = props;
    const [customElementProps, ref] = useCustomElement(otherProps);
    return (
        <test-field {...customElementProps} ref={ref}>
            {children}
        </test-field>
    );
};

TestField.propTypes = {
    children: PropTypes.node,
};

export { TestField as default };
