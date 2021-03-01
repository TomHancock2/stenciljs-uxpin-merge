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
        ],
        wrapper: 'src/wrappers/ThemeWrapper.js',
    },
    name: 'Example Design System',
};
