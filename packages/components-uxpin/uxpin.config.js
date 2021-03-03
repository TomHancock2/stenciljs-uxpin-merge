module.exports = {
    components: {
        categories: [
            {
                name: 'Forms',
                include: [
                    'src/components/ExampleForm/ExampleForm.tsx',
                    'src/components/ExampleField/ExampleField.tsx',
                    'src/components/ExampleInput/ExampleInput.tsx',
                ],
            },
            {
                name: 'Layout',
                include: [
                    'src/components/ExampleContainer/ExampleContainer.tsx',
                    'src/components/ExampleRow/ExampleRow.tsx',
                    'src/components/ExampleCol/ExampleCol.tsx',
                ],
            },
        ],
        wrapper: 'src/wrappers/ThemeWrapper.tsx',
    },
    name: 'Example Design System',
};
