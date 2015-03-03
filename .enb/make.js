var tech = {
    // essential
    levels: require('enb-bem/techs/levels'),
    fileProvider: require('enb/techs/file-provider'),
    fileCopy: require('enb/techs/file-copy'),
    bemdeclFromBemjson: require('enb-bem/techs/bemdecl-from-bemjson'),
    deps: require('enb-bem/techs/deps-old'),
    files: require('enb-bem/techs/files'),
    bemdeclFromDepsByTech: require('enb-bem/techs/bemdecl-from-deps-by-tech'),
    fileMerge: require('enb/techs/file-merge'),

    // optimization
    borschik: require('enb-borschik/techs/borschik'),

    // css
    cssStylus: require('enb-stylus/techs/css-stylus'),
    cssAutoprefixer: require('enb-autoprefixer/techs/css-autoprefixer'),

    // js
    browserJs: require('enb-diverse-js/techs/browser-js'),
    prependYm: require('enb-modules/techs/prepend-modules'),

    // bemtree
    // bemtree: require('enb-bemxjst/techs/bemtree-old'),

    // bemhtml
    bemhtml: require('enb-bemxjst/techs/bemhtml-old'),
    htmlFromBemjson: require('enb-bemxjst/techs/html-from-bemjson')
};

module.exports = function (config) {
    config.nodes([
            'forms/*.bundles/badge',
            'forms/*.bundles/index',
            'forms/*.bundles/class'
        ], function (nodeConfig) {
        nodeConfig.addTechs([
            [tech.fileProvider, { target: '?.bemdecl.js' }],
        ]);

        nodeConfig.addTargets(['?.bemhtml.js']);
    });

    config.nodes([
            'forms/*.bundles/issuer',
            'forms/*.bundles/auth'
        ], function (nodeConfig) {
        nodeConfig.addTechs([
            [tech.fileProvider, { target: '?.bemjson.js' }],
            [tech.bemdeclFromBemjson],
            [tech.htmlFromBemjson]
        ]);

        nodeConfig.addTargets(['?.html']);
    });

    config.nodes('forms/*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [tech.levels, { levels: getLevels(config) }],
            [tech.deps],
            [tech.files],

            // css
            [tech.cssStylus, { target: '?.noprefix.css' }],
            [tech.cssAutoprefixer, {
                sourceTarget: '?.noprefix.css',
                destTarget: '?.css',
                browserSupport: getBrowsers()
            }],

            // bemtree
            // [tech.bemtree, { devMode: process.env.YENV === 'development' }],

            // bemhtml
            [tech.bemhtml, { devMode: process.env.YENV === 'development' }],

            // client bemhtml
            [tech.bemdeclFromDepsByTech, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [tech.deps, {
                target: '?.bemhtml.deps.js',
                sourceDepsFile: '?.bemhtml.bemdecl.js'
            }],
            [tech.files, {
                target: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [tech.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: process.env.YENV === 'development'
            }],

            // js
            [tech.browserJs],
            [tech.fileMerge, {
                target: '?.pre.js',
                sources: ['?.browser.bemhtml.js', '?.browser.js']
            }],
            [tech.prependYm, { source: '?.pre.js' }]
        ]);

        nodeConfig.addTargets(['_?.css', '_?.js']);

        nodeConfig.addTechs([
            [tech.borschik, { sourceTarget: '?.js', destTarget: '_?.js', freeze:true }],
            [tech.borschik, { sourceTarget: '?.css', destTarget: '_?.css', tech: 'cleancss', freeze: true }]
        ]);
    });
};

function getLevels(config) {
    return [
            { path: 'libs/bem-core/common.blocks', check: false },
            { path: 'libs/bem-core/desktop.blocks', check: false },
            { path: 'libs/bem-components/common.blocks', check: false },
            { path: 'libs/bem-components/desktop.blocks', check: false },
            { path: 'libs/bem-components/design/common.blocks', check: false },
            { path: 'libs/bem-components/design/desktop.blocks', check: false },
            'forms/common.blocks'
        ]
        .map(function (level) {
            return config.resolvePath(level);
        });
}

function getBrowsers() {
    return [
        'last 2 versions',
        'ie 10',
        'opera 12.16'
    ];
}
