# example-form



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                     | Description                                                                                                                                                                                                                                  | Type                                                                                          | Default                               |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| `acceptCharset`            | `accept-charset`              | A space- or comma-delimited list of character encodings that the server accepts                                                                                                                                                              | `string`                                                                                      | `undefined`                           |
| `action`                   | `action`                      | The URI of a program that processes the form information                                                                                                                                                                                     | `string`                                                                                      | `undefined`                           |
| `allowRedirect`            | `allow-redirect`              | If set to true, the form will submit to the server, if false, that default behavior will be prevented and an ajax call can be made                                                                                                           | `boolean`                                                                                     | `false`                               |
| `autocomplete`             | `autocomplete`                | Indicates whether input elements can by default have their values automatically completed by the browser                                                                                                                                     | `"off" \| "on"`                                                                               | `'off'`                               |
| `disabledClearOnSubmit`    | `disabled-clear-on-submit`    | Sets whether to use clear the form when successfully submitted or not. Setting to true will leave the form fields populated.                                                                                                                 | `boolean`                                                                                     | `false`                               |
| `disabledValidation`       | `disabled-validation`         | Sets whether to use default HTML 5 validation or not. Setting to true will allow consumers to use their own validation engine                                                                                                                | `boolean`                                                                                     | `false`                               |
| `enctype`                  | `enctype`                     | When the value of the method attribute is post, enctype is the MIME type of content that is used to submit the form to the server                                                                                                            | `string`                                                                                      | `undefined`                           |
| `errorSummaryHeadingLevel` | `error-summary-heading-level` | Level of error summary heading for semantics                                                                                                                                                                                                 | `HeadingLevel.H2 \| HeadingLevel.H3 \| HeadingLevel.H4 \| HeadingLevel.H5 \| HeadingLevel.H6` | `HeadingLevel.H3`                     |
| `errorSummaryHeadingText`  | `error-summary-heading-text`  | Text to be displayed in the title of the error summary                                                                                                                                                                                       | `string`                                                                                      | `FormDefaultText.ErrorSummaryHeading` |
| `hiddenErrorSummary`       | `hidden-error-summary`        | Sets whether to show the error summary on submit. Will be ignored if validate is false                                                                                                                                                       | `boolean`                                                                                     | `false`                               |
| `method`                   | `method`                      | The HTTP method that the browser uses to submit the form                                                                                                                                                                                     | `"get" \| "post"`                                                                             | `'get'`                               |
| `name`                     | `name`                        | Name of the form                                                                                                                                                                                                                             | `string`                                                                                      | `undefined`                           |
| `optionalLabels`           | `optional-labels`             | When set to true, labels show an 'optional' label and not a required label                                                                                                                                                                   | `boolean`                                                                                     | `undefined`                           |
| `patternMismatch`          | `pattern-mismatch`            | Error message to be displayed when the characters does fulfil the pattern provided by the `pattern` prop. {{fieldName}} is replaced by the text from the field's `label`                                                                     | `string`                                                                                      | `FormDefaultText.PatternMismatch`     |
| `rangeOverflow`            | `range-overflow`              | Error message to be displayed when the number value exceed the `max` property. {{fieldName}} and {{attrValue}} are replaced by the text from the field's `label` and the value of `max` respectively.                                        | `string`                                                                                      | `FormDefaultText.RangeOverflow`       |
| `rangeUnderflow`           | `range-underflow`             | Error message to be displayed when the number value is lower than the `min` property. {{fieldName}} and {{attrValue}} are replaced by the text from the field's `label` and the value of `min` respectively.                                 | `string`                                                                                      | `FormDefaultText.RangeUnderflow`      |
| `stepMismatch`             | `step-mismatch`               | Error message to be displayed when the number of characters exceed the `maxlength` property. {{fieldName}} and {{attrValue}} are replaced by the text from the field's `label` and the value of `maxlength` respectively.                    | `string`                                                                                      | `FormDefaultText.StepMismatch`        |
| `target`                   | `target`                      | A name or keyword indicating where to display the response that is received after submitting the form                                                                                                                                        | `string`                                                                                      | `undefined`                           |
| `tooLong`                  | `too-long`                    | Error message to be displayed when the number of characters exceed the `maxlength` property. {{fieldName}} and {{attrValue}} are replaced by the text from the field's `label` and the value of `maxlength` respectively.                    | `string`                                                                                      | `FormDefaultText.TooLong`             |
| `tooShort`                 | `too-short`                   | Error message to be displayed when there are not enough characters to equal or exceed the `minlength` property. {{fieldName}} and {{attrValue}} are replaced by the text from the field's `label` and the value of `minlength` respectively. | `string`                                                                                      | `FormDefaultText.TooShort`            |
| `typeMismatch`             | `type-mismatch`               | Error message to be displayed when the field value is not the correct syntax. {{fieldName}} is replaced by the text from the field's `label`                                                                                                 | `string`                                                                                      | `FormDefaultText.TypeMismatch`        |
| `valueMissing`             | `value-missing`               | Error message to be displayed when the input is required and no value has been entered. {{fieldName}} is replaced by the text from the field's `label`                                                                                       | `string`                                                                                      | `FormDefaultText.ValueMissing`        |


## Events

| Event                | Description                                                                                                                                           | Type                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `exampleFormInvalid` | Emitted when the value has changed. Contains an `NameValueArray` where `name` and `value` are the `id` of the field and the associated error message. | `CustomEvent<ValidationMessage[]>`   |
| `exampleFormSubmit`  | Emitted when the value has changed. Contains a object element name and values.                                                                        | `CustomEvent<{ [x: string]: any; }>` |


## Methods

### `reset() => Promise<void>`

Programatically reset the form

#### Returns

Type: `Promise<void>`



### `submit() => Promise<void>`

Programatically submit the form

#### Returns

Type: `Promise<void>`




## Slots

| Slot       | Description                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
|            | Form content                                                                                                     |
| `"alert"`  | Section to place error summary when the app is in control of validation (has a `class` of `example-form__alert`) |
| `"footer"` | Section to place form controls (has a `class` of `example-form__footer`)                                         |
| `"header"` | Section to place form heading and intro text (has a `class` of `example-form__header`)                           |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
