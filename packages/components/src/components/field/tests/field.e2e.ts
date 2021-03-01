import { E2EElement, newE2EPage } from '@stencil/core/testing';

import { FieldCssClass } from '../field.types';
import { LabelCssClass } from '../../label';
import { GlobalCssClass } from '../../../utils/interfaces';
let page;
const singleInput = (): string => {
    return `<example-input name="single-input-name" id="singleInput"></example-input>`;
};
const singleRequiredInput = (): string => {
    return `<example-input required name="singleRequiredInputName" id="singleInput"></example-input>`;
};
const multipleInputs = (): string => {
    return `<example-radio-group name="testName" id="multiInput">
        <example-radio value="opt1">Option 1</example-radio>
        <example-radio value="opt2">Option 2</example-radio>
        <example-radio value="opt3">Option 3</example-radio>
    </example-radio-group>`;
};
const multipleInputs2 = `
    <example-select required name="test-select" id="mutli-select" multi-input-label="Test select">
        <option value="1">One</option>
        <option value="1">One</option>
    </example-select>
    <example-input required name="test-input" id="multi-input" multi-input-label="Test input"></example-input>
`;
const renderField = async (
    content?: string,
    attrs?: string,
): Promise<E2EElement> => {
    page = await newE2EPage();

    await page.setContent(
        `<example-field class="testClass" id="testId" label="test label" ${attrs}>${content}</example-field>`,
    );

    return await page.find('example-field');
};
const renderFieldWithFormWrapper = async (
    content: string,
    formAttrs?: string,
    attrs?: string,
): Promise<E2EElement> => {
    page = await newE2EPage();

    await page.setContent(
        `<example-form ${formAttrs}>
            <example-field class="testClass" id="testId" label="test label" ${attrs}>${content}</example-field>
        </example-form>`,
    );

    return await page.find('example-form');
};

describe('example-field tests', () => {
    let element;

    describe('basic rendering tests', () => {
        it('renders with correct classes and id', async () => {
            element = await renderField();
            expect(element).toHaveClasses([
                'hydrated',
                FieldCssClass.Base,
                'testClass',
            ]);
            expect(element).toEqualAttribute('id', 'testId');
        });

        it('renders children when single input is passed in', async () => {
            element = await renderField(singleInput());

            const child = await element.find('#singleInput');
            expect(child).toBeTruthy();
        });

        it('renders children when group inputs are passed in', async () => {
            element = await renderField(multipleInputs());

            const child = await element.find('#multiInput');
            expect(child).toBeTruthy();
        });

        it('renders children when multiple (different) inputs are passed in', async () => {
            element = await renderField(multipleInputs2);

            const select = await element.find('.example-select');
            const selectLabel = await select.find('label');
            const input = await element.find('.example-input');
            const inputLabel = await input.find('label');
            expect(select).toBeTruthy();
            expect(input).toBeTruthy();
            expect(selectLabel.innerText).toBe('*Test select');
            expect(inputLabel.innerText).toBe('*Test input');
        });

        it('renders wrapper div when inputGroup prop not set (default is false)', async () => {
            element = await renderField(multipleInputs());

            const wrapper = await element.find('.example-field__wrapper');
            expect(wrapper.tagName).toBe('DIV');
        });

        it('renders label correctly when inputGroup prop not set (default is false)', async () => {
            element = await renderField(multipleInputs());

            const label = await element.find('.example-label__label');
            expect(label.tagName).toBe('LABEL');
            expect(label.textContent).toBe('test label');
        });

        it('renders label for attribute correctly for optional input when input name is set', async () => {
            element = await renderField(singleInput());

            const label = await element.find('.example-label__label');
            expect(label).toEqualAttribute('for', 'single-input-name');
        });

        it('renders label for attribute correctly for required input when input name is set', async () => {
            element = await renderField(singleRequiredInput());

            const label = await element.find('.example-label__label');
            expect(label).toEqualAttribute('for', 'singleRequiredInputName');
        });

        it('renders label for attribute correctly for optional input when input name is not set', async () => {
            element = await renderField(
                `<example-input id="singleInput"></example-input>`,
            );

            const label = await element.find('.example-label__label');
            expect(label).toEqualAttribute('for', 'example-input-0');
        });

        it('renders label for attribute correctly for required input when input name is not set', async () => {
            element = await renderField(
                `<example-input required id="singleInput"></example-input>`,
            );

            const label = await element.find('.example-label__label');
            expect(label).toEqualAttribute('for', 'example-input-0');
        });
    });

    describe('hiddenLabel prop tests', () => {
        it(`hides label when hiddenLabel is true`, async () => {
            element = await renderField(singleInput(), `hidden-label="true"`);

            const label = await element.find('.example-label');
            expect(label).toHaveClass('example-label--hidden');
        });

        it(`hides legend when hiddenLabel is true (input groups)`, async () => {
            element = await renderField(
                singleInput(),
                `input-group="true" hidden-label="true"`,
            );

            const legend = await element.find('legend');
            expect(legend).toHaveClass('example-label--hidden');
        });
    });

    describe('optional prop tests', () => {
        it(`doesn't render optional element when optional labels is true at form level`, async () => {
            element = await renderFieldWithFormWrapper(
                singleInput(),
                `optional-labels="false"`,
                `optional-text="optional"`,
            );

            const optionalEle = await element.find(
                `.${LabelCssClass.Optional}`,
            );
            expect(optionalEle).toBeFalsy();
        });

        it(`does render optional element when optional labels is true at form level`, async () => {
            element = await renderFieldWithFormWrapper(
                singleInput(),
                `optional-labels`,
                `optional-text="optional"`,
            );

            const optionalEle = await element.find(
                `.${LabelCssClass.Optional}`,
            );

            expect(optionalEle).toBeTruthy();
        });

        it(`sets the optional text correctly when optional labels is true at form level`, async () => {
            const optionalText = '(optional)';
            element = await renderFieldWithFormWrapper(
                singleInput(),
                `optional-labels="true"`,
                `optional-text="${optionalText}"`,
            );

            const optionalEle = await element.find(
                `.${LabelCssClass.Optional}`,
            );
            expect(optionalEle.textContent).toContain(optionalText);
        });

        it(`doesn't render optional element when optional labels is true at form level but input is required`, async () => {
            element = await renderFieldWithFormWrapper(
                singleRequiredInput(),
                `optional-labels="true"`,
                `optional-text="optional"`,
            );

            const optionalEle = await element.find(
                `.${LabelCssClass.Optional}`,
            );
            expect(optionalEle).toBeFalsy();
        });
    });

    describe('inputGroup rendering tests', () => {
        it('renders wrapper div when inputGroup set to false', async () => {
            element = await renderField(singleInput(), `input-group="false"`);

            const wrapper = await element.find('.example-field__wrapper');
            expect(wrapper.tagName).toBe('DIV');
        });

        it('renders label when inputGroup is set to false', async () => {
            element = await renderField(singleInput(), `input-group="false"`);

            const label = await element.find('label');
            expect(label.textContent).toBe('test label');
        });

        it('renders wrapper fieldset when inputGroup set to true', async () => {
            element = await renderField(multipleInputs(), `input-group="true"`);

            const wrapper = await element.find('.example-field__wrapper');
            expect(wrapper.tagName).toBe('FIELDSET');
        });

        it('renders legend correctly when inputGroup set to true', async () => {
            element = await renderField(multipleInputs(), `input-group="true"`);

            const legend = await element.find('.example-field__legend');
            expect(legend.tagName).toBe('LEGEND');
            expect(legend.textContent).toBe('test label');
        });
    });

    describe('error rendering tests', () => {
        it('adds the error class', async () => {
            const attrs = `error="Test error"`;
            element = await renderField(singleInput(), attrs);
            const formElement = await element.querySelector(
                `.${GlobalCssClass.FormElement}`,
            );
            expect(element).toHaveClass(FieldCssClass.Invalid);
            expect(formElement).toHaveClass(GlobalCssClass.FormElementInvalid);
        });

        it('renders the error message', async () => {
            const attrs = `error="Test error"`;
            element = await renderField(singleInput(), attrs);

            const errorText = await element.find(`.${FieldCssClass.Errors}`);
            expect(errorText.textContent).toContain('Test error');
        });

        it('renders children when single input is passed in', async () => {
            element = await renderField(singleRequiredInput());
            element.value = 'test';
            await page.waitForChanges();
            expect(element).not.toHaveClass(FieldCssClass.Invalid);
        });
    });

    describe('hint rendering tests', () => {
        it('adds hint text', async () => {
            const attrs = `hint='Hint Text'`;
            element = await renderField(singleInput(), attrs);

            const label = await element.find('example-field label');
            expect(label.textContent).toContain('Hint Text');
        });
    });

    describe('inline rendering tests', () => {
        it('adds the inline class', async () => {
            const attrs = `inline`;
            element = await renderField(singleInput(), attrs);

            expect(element).toHaveClass(FieldCssClass.Inline);
        });
    });

    describe('join rendering tests', () => {
        it('adds the join class', async () => {
            const attrs = `join`;
            element = await renderField(singleInput(), attrs);

            expect(element).toHaveClass(FieldCssClass.Join);
        });
    });
});
