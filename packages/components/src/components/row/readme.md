# example-row

Rows are wrappers for columns. They can control the (responsive) spacing and alignment of the columns they contain.

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                                                                                                                                                                            | Type                                                                                                                                                                       | Default                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `gutter`          | `gutter`           | The amount of space between columns. If a single value is provided, this will be applied to all viewport sizes. If multiple values are provided, the first will apply to the small viewport upwards, the second to the medium viewport upwards, the third (if set) to the large viewport upwards, and the fourth (if set) to the extra large viewport. | `RowGutter.Lg \| RowGutter.Md \| RowGutter.None \| RowGutter.Sm \| RowGutter.Xl \| RowGutter.Xs \| RowGutter[]`                                                            | `RowGutter.None`          |
| `horizontalAlign` | `horizontal-align` | Horizontal alignment, follows flexbox justify-content                                                                                                                                                                                                                                                                                                  | `RowHorizontalAlign.Around \| RowHorizontalAlign.Between \| RowHorizontalAlign.Center \| RowHorizontalAlign.Evenly \| RowHorizontalAlign.Left \| RowHorizontalAlign.Right` | `RowHorizontalAlign.Left` |
| `verticalAlign`   | `vertical-align`   | Vertical alignment, follows flexbox align-items                                                                                                                                                                                                                                                                                                        | `RowVerticalAlign.Bottom \| RowVerticalAlign.Middle \| RowVerticalAlign.Stretch \| RowVerticalAlign.Top`                                                                   | `RowVerticalAlign.Top`    |


## Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | Row content: expects `example-col` |


## CSS Custom Properties

| Name           | Description                                    |
| -------------- | ---------------------------------------------- |
| `--gutter`     | Spacing between the columns within the Row     |
| `--neg-gutter` | Negative value to reset spacing in nested Rows |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
