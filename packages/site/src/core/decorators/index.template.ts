(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'core',
        title: 'Decorators'
    }

    const render = (data, include) => html`
    <h1>Decorators</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();