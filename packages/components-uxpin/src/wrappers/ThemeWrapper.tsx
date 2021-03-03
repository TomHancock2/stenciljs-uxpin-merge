import React from 'react';
import { setUpCustomElements } from '../utils/helpers';
import 'components/dist/components/components.css';

export default function UXPinWrapper({ children }: any) {
    setUpCustomElements();
    return <div className="ux-pin-wrapper">{children}</div>
}
