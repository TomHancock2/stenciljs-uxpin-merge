import * as React from 'react';

interface AdvancedMapping {
    [key: string]: string | undefined;
}

export const convertCustomElProps = (
    props,
    customMapping = {},
): AdvancedMapping => {
    return Object.keys(props)
        .filter(key => !(props[key] instanceof Function))
        .reduce((acc, key) => {
            const prop = props[key];

            const computedKey = customMapping[key] || key;

            if (prop instanceof Object || prop instanceof Array) {
                return { ...acc, [computedKey]: JSON.stringify(prop) };
            }

            return { ...acc, [computedKey]: prop };
        }, {});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCustomElement = (props, customMapping = {}, reactRef?): any => {
    const ref = reactRef ? reactRef : React.createRef();
    React.useLayoutEffect(() => {
        const { current } = ref;
        let fns;
        if (current) {
            fns = Object.keys(props)
                .filter(key => props[key] instanceof Function)
                .map(key => ({
                    key: customMapping[key] || key,
                    fn: (customEvent): CustomEvent =>
                        props[key](customEvent.detail, customEvent),
                }));
            fns.forEach(({ key, fn }) => current.addEventListener(key, fn));
        }
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (): any => {
            if (current) {
                fns.forEach(({ key, fn }) =>
                    current.removeEventListener(key, fn),
                );
            }
        };
    }, [customMapping, props, ref]);

    const customElementProps = convertCustomElProps(props, customMapping);

    return [customElementProps, ref];
};