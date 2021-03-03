import { NameValue, NameValueArray } from './interfaces';

export const isValidFormInputElement = (ele: HTMLElement): boolean =>
    (ele.tagName === 'SELECT' && !(ele as HTMLSelectElement).disabled) ||
    ((ele as HTMLInputElement).name &&
        !(ele as HTMLInputElement).disabled &&
        (ele as HTMLInputElement).type !== 'file' &&
        (ele as HTMLInputElement).type !== 'reset' &&
        (ele as HTMLInputElement).type !== 'submit' &&
        (ele as HTMLInputElement).type !== 'button');

export const focusOnElement = (evt: MouseEvent) => {
  evt.preventDefault();
  const source: any = evt.currentTarget;
  const targetId: string =
      source && source.hasAttribute('href')
          ? source.getAttribute('href').split('#')[1]
          : source.getAttribute('for');
  let target: any =
      document.querySelector(`#${targetId}`) ||
      document.querySelector(`[name="${targetId}"]`);
  if (target) {
      if (
          !isValidFormInputElement(target) ||
          target.tagName.indexOf('EXAMPLE-') === 0
      ) {
          target.setAttribute('tabIndex', '-1');
          target.focus();
          target.removeAttribute('tabIndex');
      } else {
          target.focus();
      }
  }
};

export const hasFocus = (el: HTMLElement): boolean =>
    el ? el.contains(document.activeElement) : false;

export const nativeTestid = (el: HTMLElement, id?: string): string | null => {
  const dataAttr = el.getAttribute('data-testid');
  return dataAttr ? `${dataAttr}__${id ? id : 'native'}` : null;
};

export const nativeId = (el: HTMLElement, suffix?: string): string | null => {
  let hostId = el.getAttribute('id');
  if (hostId && suffix) {
      hostId += `__${suffix}`;
  }
  return hostId ? hostId : null;
};

export const hasSlotContent = (slotName: string, el: HTMLElement): boolean =>
    !!el.querySelector(`[slot="${slotName}"]`);

export const stringReplacer = (
    str: string,
    replaceArr: NameValueArray = [],
): string => {
    let replacedStr = str;
    replaceArr.forEach((replaceObj: NameValue) => {
        replacedStr = replacedStr.split(replaceObj.name).join(replaceObj.value);
    });
    return replacedStr;
};

export const getResponsiveValuesFromProp = (
    propValue: any
): any[] => {
    let responsiveVals = [];
    if (typeof propValue === 'string' && propValue.indexOf('[') !== -1) {
        responsiveVals = JSON.parse(propValue);
    } else if (typeof propValue === 'string') {
        responsiveVals.push(propValue);
    } else {
        responsiveVals = propValue;
    }
    return responsiveVals;
};

export const getResponsiveLayoutClasses = (
    responsiveValues: any[],
    cssClassEnum: any,
    type: string,
): any | void => {
    if (responsiveValues && responsiveValues.length > 0) {
        if (responsiveValues.length === 1) {
            const singleVal =
                responsiveValues.length === 1 ? responsiveValues[0] : null;
            return {
                [`${cssClassEnum[type]}--${singleVal}`]: !!singleVal,
            };
        } else {
            const valXs =
                responsiveValues.length > 1 ? responsiveValues[0] : null;
            const valSm = responsiveValues[1] ? responsiveValues[1] : null;
            const valMd = responsiveValues[2] ? responsiveValues[2] : null;
            const valLg = responsiveValues[3] ? responsiveValues[3] : null;
            const valXl = responsiveValues[4] ? responsiveValues[4] : null;
            return {
                [`${cssClassEnum[type]}-xs--${valXs}`]: !!valXs,
                [`${cssClassEnum[type]}-sm--${valSm}`]: !!valSm,
                [`${cssClassEnum[type]}-md--${valMd}`]: !!valMd,
                [`${cssClassEnum[type]}-lg--${valLg}`]: !!valLg,
                [`${cssClassEnum[type]}-xl--${valXl}`]: !!valXl,
            };
        }
    }
};
