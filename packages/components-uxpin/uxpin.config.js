module.exports = {
    components: {
        categories: [
            {
                name: 'Forms',
                include: [
                    'src/components/ExampleForm/ExampleForm.js',
                    'src/components/ExampleField/ExampleField.js',
                    'src/components/ExampleInput/ExampleInput.js',
                ],
            },
            {
                name: 'Layout',
                include: [
                    'src/components/ExampleContainer/ExampleContainer.js',
                    'src/components/ExampleRow/ExampleRow.js',
                    'src/components/ExampleCol/ExampleCol.js',
                ],
            },
        ],
        wrapper: 'src/wrappers/ThemeWrapper.js',
    },
    name: 'Example Design System',
};
