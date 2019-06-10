import babel from 'rollup-plugin-babel';

const pkg = require('./package.json');

export default {
    input: pkg.module,
    output: {
        name: pkg.name
            .split('-')
            .map((str,i) =>
                i === 0 ?
                    str :
                    (str.substring(0,1).toUpperCase() + str.substring(1))
            )
            .join(''),
        file: pkg.main,
        format: 'umd',
        globals: {
            d3: 'd3',
            webcharts: 'webCharts'
        },
    },
    external: (function() {
        var dependencies = pkg.dependencies;

        return Object.keys(dependencies);
    }()),
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                [ '@babel/preset-env' ]
            ],
            babelrc: false
        })
    ]
};
