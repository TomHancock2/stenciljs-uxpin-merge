import React from 'react';
import { setUpCustomElements } from '../utils/helpers';
import 'components/dist/components/components.css';

export default function UXPinWrapper({ children }) {
    setUpCustomElements();
    return <div className="ux-pin-wrapper">{children}</div>
}
