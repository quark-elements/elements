(function () {
    const { ComponentDataProcessor } = require('./ComponentDataProcessor');
    const allData = ComponentDataProcessor('material');

    module.exports = () => {
        return allData;
    };
})();