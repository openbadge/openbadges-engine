/**
 * Returns bemjson for the main page
 * @param {Object} openBadges
 * @returns {Object}
 */
module.exports = function (openBadges) {
    return {
        block: 'page',
        title: 'Open Badges',
        styles: [
            { elem: 'css', url: '_index.css' }
        ],
        scripts: [
            { elem: 'js', url: '_index.js' }
        ],
        mods: {
            theme: 'normal'
        },
        content: [
            {
                block: 'header',
                tag: 'b',
                content: {
                    tag: 'p',
                    content: 'Open Badges:'
                }
            },
            {
                content: [
                    {
                        block: 'link',
                        mods: {
                            theme: 'normal',
                            disabled: openBadges.info.hasIssuer
                        },
                        url: '/issuer',
                        content: 'Create an Issuer'
                    },
                    { tag: 'br' },
                    {
                        block: 'link',
                        mods: {
                            theme: 'normal',
                            disabled: !openBadges.info.hasIssuer
                        },
                        url: '/class',
                        content: 'Create Classes'
                    },
                    { tag: 'br' },
                    {
                        block: 'link',
                        mods: {
                            theme: 'normal',
                            disabled: !openBadges.info.classes.length
                        },
                        url: '/manual-awarding',
                        content: 'Reward Badges'
                    }
                ]
            },
            { tag: 'br' },
            {
                block: 'button',
                url: '/sign-out',
                text: 'Sign out',
                mods: { type: 'link', theme: 'normal', size: 'm', view: 'action' }
            }
        ]
    };
};
