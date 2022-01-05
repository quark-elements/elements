(function () {
    const baseName = 'core';
    const { ComponentNavigatorProcessor } = require('./ComponentDataProcessor');
    const { componentPages, baseComponentPages } = ComponentNavigatorProcessor(baseName);

    module.exports = () => {
        return [
            {
                label: 'Getting Started',
                items: [
                    {
                        url: `/${baseName}/`,
                        label: 'Overview'
                    },
                    {
                        url: `/${baseName}/installation/`,
                        label: 'Installation'
                    },
                    {
                        url: `/${baseName}/usage/`,
                        label: 'Usage'
                    },
                    {
                        url: `/${baseName}/theming/`,
                        label: 'Theming'
                    }
                ]
            },
            /*
            {
                label: 'Components',
                items: componentPages
            },
            */
            {
                label: 'Base Components',
                items: baseComponentPages
            },
            {
                label: 'Mixins',
                items: [
                    {
                        url: `/${baseName}/mixins/`,
                        label: 'Overview'
                    }
                ]
            },
            {
                label: 'Controllers',
                items: [
                    {
                        url: `/${baseName}/controllers/`,
                        label: 'Overview'
                    }
                ]
            },
            {
                label: 'Styles',
                items: [
                    {
                        url: `/${baseName}/styles/`,
                        label: 'Overview'
                    }
                ]
            }
        ];
    }
})();