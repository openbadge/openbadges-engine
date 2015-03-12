/**
 * Returns bemjson for the class form
 * @param {Object} openbadges
 * @returns {Object}
 */
module.exports = function (openbadges) {
    return {
        block: 'page',
        title: 'Class',
        styles: [
            { elem: 'css', url: '_class.css' }
        ],
        scripts: [
            { elem: 'js', url: '_class.js' },
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
                            mods: { hit: true, current: true },
                            content: 'Create badges'
                        },
                        {
                            elem: 'item',
                            url: '/manual-awarding',
                            mods: { disabled: !openbadges.classes.length },
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
                block: 'class',
                content: [
                    {
                        block: 'form',
                        action: '/class',
                        method: 'post',
                        enctype: 'multipart/form-data',
                        content: [
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Name'
                                    },
                                    {
                                        block: 'input',
                                        name: 'name',
                                        autocomplete: false,
                                        mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                        placeholder: 'name of the badge'
                                    },
                                    ' ',
                                    {
                                        block: 'error',
                                        name: 'name',
                                        mods: { disabled: true },
                                        content: 'Fill this field!'
                                    },
                                    {
                                        block: 'note',
                                        content: 'latin symbols including spaces, underscores and hyphens'
                                    }
                                ]
                            },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Description'
                                    },
                                    {
                                        block: 'input',
                                        name: 'description',
                                        autocomplete: false,
                                        mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                        placeholder: 'some information about the badge',
                                    },
                                    ' ',
                                    {
                                        block: 'error',
                                        name: 'description',
                                        mods: { disabled: true },
                                        content: 'Fill this field!'
                                    }
                                ]
                            },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Emblem'
                                    },
                                    {
                                        block: 'attach',
                                        name: 'image',
                                        mods: { theme: 'simple' },
                                        button: {
                                            block: 'button',
                                            mods: { theme: 'normal', size: 'm' },
                                            text: 'Choose a file'
                                        },
                                        noFileText: ''
                                    }, {
                                        block: 'note',
                                        content: 'PNG image'
                                    }
                                ]
                            },
                            { tag: 'br' },
                            {
                                content: [
                                    {
                                        block: 'label',
                                        content: 'Criteria'
                                    },
                                    {
                                        block: 'input',
                                        name: 'criteria',
                                        autocomplete: false,
                                        mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                        placeholder: 'link to the task for which the badge is awarding',
                                    },
                                    ' ',
                                    {
                                        block: 'error',
                                        name: 'criteria',
                                        mods: { disabled: true },
                                        content: 'Fill this field!'
                                    },
                                    {
                                        block: 'note',
                                        content: 'real URL is expected'
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
                                        text: 'Create',
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
                            }
                        ]
                    }
                ]
            },
            { block: 'VsFoot' }
        ]
    };
};
