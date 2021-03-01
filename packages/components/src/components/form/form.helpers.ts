import {
    FieldErrorType,
    ErrorMessageTemplates,
    StandardFormElement,
    NameValueArray,
} from '../../utils/interfaces';
import { ValidationMessage, FormData } from '../../utils/interfaces';
import { stringReplacer } from '../../utils/helpers';
import { LabelCssClass } from '../label';
import { ComponentInterface } from '@stencil/core';

export const isValidFormInputElement = (ele: HTMLElement): boolean =>
    (ele.tagName === 'SELECT' && !(ele as HTMLSelectElement).disabled) ||
    ((ele as HTMLInputElement).name &&
        !(ele as HTMLInputElement).disabled &&
        (ele as HTMLInputElement).type !== 'file' &&
        (ele as HTMLInputElement).type !== 'reset' &&
        (ele as HTMLInputElement).type !== 'submit' &&
        (ele as HTMLInputElement).type !== 'button');

export const getValidationAttribute = (errorKey: string): string => {
    switch (errorKey) {
        case FieldErrorType.TooShort:
            return 'minlength';
        case FieldErrorType.TooLong:
            return 'maxlength';
        case FieldErrorType.RangeOverflow:
            return 'max';
        case FieldErrorType.RangeUnderflow:
            return 'min';
        default:
            return null;
    }
};

export const getLabelText = (
    labelEle: HTMLLabelElement | HTMLLegendElement,
    fieldIndex: number,
): string => {
    if (!labelEle) return `Field #${fieldIndex + 1}`;
    const labelInner: HTMLElement = labelEle.querySelector(
        `.${LabelCssClass.LabelText}`,
    );
    return (labelInner && labelInner.innerText !== ''
        ? labelInner.innerText
        : labelEle.innerText
    ).replace('*', '');
};

export const getLabelElements = (
    ele: StandardFormElement,
): NodeList | HTMLLabelElement[] | HTMLLegendElement[] => {
    const isExampleComponent = ele.tagName.indexOf('EXAMPLE-') === 0;
    const isGrpComponent = ele.tagName.includes('-GROUP');
    const isCheckbox =
        ele.tagName === 'INPUT' &&
        (ele as HTMLInputElement).type === 'checkbox';
    const fieldWrapper = ele.closest('.example-field__wrapper');

    if (fieldWrapper && isExampleComponent && isGrpComponent) {
        return [fieldWrapper.querySelector('legend')];
    }

    if (fieldWrapper && (isExampleComponent || isCheckbox)) {
        return [fieldWrapper.querySelector('label')];
    }
    const associatedLabel = document.querySelectorAll(`label[for="${ele.id}"]`);
    return associatedLabel || [];
};

export const getValidationMessage = (
    errorMessageTemplates: ErrorMessageTemplates,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    ele: any,
    fieldIndex: number,
): string => {
    let msg = '';
    Object.keys(errorMessageTemplates).forEach((errorKey): void => {
        if ((ele as StandardFormElement).validity[errorKey]) {
            const labels = getLabelElements(ele as StandardFormElement);
            const labelEle = labels.length === 2 ? labels[1] : labels[0];
            let labelText = getLabelText(
                labelEle as HTMLLabelElement | HTMLLegendElement,
                fieldIndex,
            );
            const valAttr = getValidationAttribute(errorKey);
            const valAttrValue =
                valAttr !== null ? ele.getAttribute(valAttr) : '';
            const msgTemplate = errorMessageTemplates[errorKey];
            const fieldValue = ele.value;
            if (msgTemplate) {
                if (msgTemplate.indexOf('{{fieldName}}') > 0) {
                    labelText = labelText.toLowerCase();
                }
                const replaceArr = [
                    { name: '{{fieldName}}', value: labelText },
                    { name: '{{attrValue}}', value: valAttrValue },
                    { name: '{{fieldValue}}', value: fieldValue },
                ];
                msg = stringReplacer(msgTemplate, replaceArr as NameValueArray);
            }
        }
    });
    return msg;
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getNormalisedFormElements = (
    formElements: HTMLFormControlsCollection,
): HTMLElement[] => {
    const validElements = [];
    const len = formElements?.length || 0;
    for (let i = 0; i < len; i++) {
        const ele = formElements[i];
        if (isValidFormInputElement(ele as StandardFormElement)) {
            validElements.push(ele);
        }
    }
    return validElements;
};

export const serializeForm = (form: HTMLFormElement): FormData => {
    const data = {};
    if (form !== null) {
        const formElements = getNormalisedFormElements(form.elements);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        formElements.forEach((ele: any) => {
            if (
                (isValidFormInputElement(ele) &&
                    ele.type != 'checkbox' &&
                    ele.type != 'radio') ||
                ele.checked
            ) {
                data[`${ele.name}`] = ele.value;
            }
        });
    }
    return data;
};

export const getErrorSummary = (
    form: HTMLFormElement,
    errorMessageTemplates: ErrorMessageTemplates,
): ValidationMessage[] => {
    const formElements = getNormalisedFormElements(form.elements);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return formElements
        .filter(
            (ele: any) => isValidFormInputElement(ele) && !ele.validity.valid,
        )
        .map((ele: any, i: number) => ({
            targetId: ele.id || ele.name,
            message: getValidationMessage(errorMessageTemplates, ele, i),
        }));
    /* eslint-enable @typescript-eslint/no-explicit-any */
};

export const getErrorMessageTemplates = (
    host: ComponentInterface,
): ErrorMessageTemplates => ({
    [FieldErrorType.TypeMismatch]: host.typeMismatch,
    [FieldErrorType.TooShort]: host.tooShort,
    [FieldErrorType.TooLong]: host.tooLong,
    [FieldErrorType.ValueMissing]: host.valueMissing,
    [FieldErrorType.StepMismatch]: host.stepMismatch,
    [FieldErrorType.PatternMismatch]: host.patternMismatch,
    [FieldErrorType.RangeOverflow]: host.rangeOverflow,
    [FieldErrorType.RangeUnderflow]: host.rangeUnderflow,
});
