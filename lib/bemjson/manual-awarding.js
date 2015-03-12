/**
 * Returns bemjson for the manual awarding form
 * @param {Object} openbadges
 * @returns {Object}
 */
module.exports = function (openbadges) {
    /**
     * Returns the list of options for block 'select' according to created classes
     * @param {Object} classes
     * @returns {Object}
     */
    function getOptions(classes) {
        var first = classes[0].name;
        return classes.map(function (_class) {
            return {
                val: _class.name,
                text: _class.name.replace(/_/g, ' '),
                checked: first === _class.name
            };
        });
    }

    return {
        block: 'page',
        title: 'Manual Awarding',
        styles: [
            { elem: 'css', url: '_badge.css' }
        ],
        scripts: [
            { elem: 'js', url: '_badge.js' },
        ],
        mods: {
            theme: 'normal'
        },
        content: [
            {
                block: 'VsHead',
                service: 'Open Badges',// '@pilot',
                left: {
                    block: 'VsHeadMenu',
                    content: [
                        {
                            elem: 'item',
                            mods: { disabled: true },
                            url: '/issuer',
                            content: 'Issuer'
                        },
                        {
                            elem: 'item',
                            url: '/class',
                            mods: { disabled: false },
                            content: 'Create badges'
                        },
                        {
                            elem: 'item',
                            url: '/manual-awarding',
                            mods: { hit: true, current: true },
                            content: 'Award badges'
                        }
                    ]
                },
                right: {
                    block: 'button',
                    url: '/sign-out',
                    text: 'Sign out',
                    mods: { type: 'link', theme: 'normal', size: 'xl', view: 'action' }
                }
            },
            {
                block: 'award',
                content: [
                    {
                        block: 'form',
                        action: '/manual-awarding',
                        method: 'post',
                        enctype: 'multipart/form-data',
                        content: [
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Email'
                                    },
                                    {
                                        block: 'input',
                                        name: 'email',
                                        autocomplete: false,
                                        mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                        placeholder: 'a badge will be awarded to this email'
                                    },
                                    ' ',
                                    {
                                        block: 'error',
                                        name: 'email',
                                        mods: { disabled: true },
                                        content: 'Fill this field!'
                                    },
                                    {
                                        block: 'note',
                                        content: 'real email address is expected'
                                    }
                                ]
                            },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Badge'
                                    },
                                    {
                                        block: 'select',
                                        mods: { mode: 'radio', theme: 'normal', size: 'm' },
                                        name: 'name',
                                        options: getOptions(openbadges.classes)
                                    }
                                ]
                            },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: ''
                                    },
                                    {
                                        block: 'button',
                                        text: 'Reward',
                                        mods: {
                                            type: 'submit',
                                            theme: 'normal',
                                            size: 'l',
                                            view: 'action'
                                        }
                                    },
                                    ' ',
                                    {
                                        block: 'spin',
                                        mods: { theme: 'normal', size: 'l' }
                                    }
                                ]
                            },
                            { tag: 'br' },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Award URL',
                                        mods: { disabled: true, bold: true }
                                    },
                                    {
                                        block: 'input',
                                        autocomplete: false,
                                        mods: { theme: 'normal', size: 'm', hidden: true }
                                    },
                                    {
                                        block: 'note',
                                        content: 'this URL can be used for receiving the badge',
                                        mods: { disabled: true }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            { block: 'VsFoot' }
        ]
    };
};
