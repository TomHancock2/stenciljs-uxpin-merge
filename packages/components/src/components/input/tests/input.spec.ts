import { newSpecPage } from '@stencil/core/testing';

import { Input, InputCssClass } from '../';

describe('Input', () => {
    let page;
    let component;
    let ele;
    const loadSpy = jest.fn();
    const unloadSpy = jest.fn();

    beforeEach(async () => {
        page = await newSpecPage({
            components: [Input],
            html: `<div></div>`,
        });

        page.win.addEventListener('exampleInputDidLoad', loadSpy);
        page.win.addEventListener('exampleInputDidUnload', unloadSpy);
        component = page.doc.createElement('example-input');
        component.name = 'test-input';
        page.root.appendChild(component);
        await page.waitForChanges();
        ele = page.rootInstance;
    });

    afterEach(async () => {
        loadSpy.mockClear();
        unloadSpy.mockClear();
    });

    it('builds', () => {
        expect(ele).toBeTruthy();
    });

    it('renders with defaults', async () => {
        // Assert
        expect(ele.type).toBe('text');
        expect(ele.autocomplete).toBe('off');
        expect(ele.autocorrect).toBe('off');
        expect(ele.required).toBe(false);
        expect(ele.optional).toBe(false);
        expect(ele.watermark).toBe(false);
    });

    it('emits exampleInputDidLoad event', async () => {
        expect(loadSpy).toHaveBeenCalledTimes(1);
    });

    it('renders a textarea element when a value of rows is given', async () => {
        ele.rows = 5;
        await page.waitForChanges();
        const textarea = page.body.querySelector('textarea');
        expect(textarea).toBeTruthy();
    });

    it('emits an exampleInput event onInput', async () => {
        const inputSpy = jest.fn();
        const mockEvent = { target: { value: 'a' } };
        page.win.addEventListener('exampleInput', inputSpy);
        ele.onInput(mockEvent);
        expect(inputSpy).toHaveBeenCalledTimes(1);
    });

    it('input change defaults to empty string', async () => {
        const mockEvent = { target: { value: null } };
        ele.onInput(mockEvent);
        await page.waitForChanges();
        expect(ele.value).toBe('');
    });

    it('input change does not modify value if event target is invalid', async () => {
        const mockEvent = { target: null };
        ele.value = 'test';
        await page.waitForChanges();
        ele.onInput(mockEvent);
        await page.waitForChanges();
        expect(ele.value).toBe('test');
    });

    it('emits an exampleFocus event and fires the inputFocus callback', async () => {
        const focusSpy = jest.fn();
        ele.name = 'input-focus';
        await page.waitForChanges();
        page.win.addEventListener('exampleFocus', focusSpy);
        ele.onFocus();
        await page.waitForChanges();
        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('emits an exampleBlur event and fires the inputBlur callback', async () => {
        const blurSpy = jest.fn();
        await page.waitForChanges();
        page.win.addEventListener('exampleBlur', blurSpy);
        ele.onBlur();
        await page.waitForChanges();
        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    it('emits an exampleChange event and fires the relevant callbacks', async () => {
        const changeSpy = jest.fn();
        await page.waitForChanges();
        page.win.addEventListener('exampleChange', changeSpy);
        ele.onChange();
        await page.waitForChanges();
        expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('emits an exampleChange event and fires the relevant callbacks', async () => {
        const inputSpy = jest.fn();
        await page.waitForChanges();
        page.win.addEventListener('exampleInput', inputSpy);
        ele.onInput({ target: { value: 'test' } });
        await page.waitForChanges();
        expect(inputSpy).toHaveBeenCalledTimes(1);
    });

    it('emits an exampleErrorChange event when the error state changes', async () => {
        const errorChangeSpy = jest.fn();
        ele.minlength = 2;
        page.win.addEventListener('exampleErrorChange', errorChangeSpy);
        ele.updateErrors('err msg');
        await page.waitForChanges();
        expect(errorChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('emits an exampleKeyDown event onKeyDown', async () => {
        const keyDownSpy = jest.fn();
        page.win.addEventListener('exampleKeyDown', keyDownSpy);
        ele.handleKeyDown({});
        await page.waitForChanges();
        expect(keyDownSpy).toHaveBeenCalledTimes(1);
    });

    it('clears value on clear button interaction', async () => {
        const clearSpy = jest.fn();
        page.win.addEventListener('exampleClear', clearSpy);
        const nativeInput = page.root.querySelector('input');
        nativeInput.focus = jest.fn();
        ele.value = 'test';
        ele.handleClear();
        await page.waitForChanges();
        expect(ele.value).toBe('');
        expect(clearSpy).toHaveBeenCalledTimes(1);
    });

    it('focusses the input', async () => {
        const nativeInput = page.root.querySelector('input');
        const mockFn = jest.fn();
        nativeInput.focus = mockFn;
        ele.focusHandler();
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('calls the updateErrors function when validate is called', async () => {
        const updateErrorsSpy = jest.fn();
        ele.updateErrors = updateErrorsSpy;

        ele.validate();
        await page.waitForChanges();
        expect(updateErrorsSpy).toHaveBeenCalledTimes(1);
    });

    it('adds a label when label text is provided', async () => {
        ele.multiInputLabel = 'test';
        await page.waitForChanges();
        const label = page.body.querySelector('example-label');
        expect(label).toBeTruthy();
    });

    it('does not add clearable element if rows props is present', async () => {
        ele.clearable = true;
        ele.rows = 3;
        ele.value = 'Initial Value';
        await page.waitForChanges();
        const wrappingClass = page.body.querySelector(
            `.${InputCssClass.Clearable}`,
        );
        const clearElement = page.body.querySelector(`.${InputCssClass.Clear}`);
        expect(wrappingClass).toBeFalsy();
        expect(clearElement).toBeFalsy();
    });

    describe('methods', () => {
        describe('validate', () => {
            it('calls updateErrors', async () => {
                const updateErrorsSpy = jest.fn();
                ele.updateErrors = updateErrorsSpy;
                await page.waitForChanges();
                await ele.validate();
                await page.waitForChanges();
                expect(updateErrorsSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('reset', () => {
            it('resets error and value', async () => {
                await ele.reset();
                await page.waitForChanges();
                expect(ele.value).toBe('');
                expect(ele.error).toBe('');
            });
        });
    });
});
