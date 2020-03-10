import React from 'react';
import { setUpCustomElements } from '../utils/helpers';

export default function UXPinWrapper({ children }) {
    setUpCustomElements();
    return <div class="theme-class">{children}</div>;
}
