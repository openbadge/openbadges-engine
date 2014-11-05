/**
 * Returns bemjson for the manual awarding form
 * @param {Object} openBadges
 * @returns {Object}
 */
module.exports = function (openBadges) {
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
                block : 'VsHead',
                service : 'Open Badges',// '@pilot',
                left : {
                    block : 'VsHeadMenu',
                    content : [
                        {
                            elem : 'item',
                            mods : { disabled : true },
                            url : '/issuer',
                            content : 'Create an issuer'
                        },
                        {
                            elem : 'item',
                            url : '/class',
                            mods: { disabled : false },
                            content : 'Create classes'
                        },
                        {
                            elem : 'item',
                            url : '/manual-awarding',
                            mods: { hit : true, current : true },
                            content : 'Award badges'
                        }
                    ]
                },
                right : {
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
                                        mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                        placeholder: 'real email address is expected...'
                                    },
                                    ' ',
                                    {
                                        block: 'error',
                                        name: 'email',
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
                                        content: 'Badge'
                                    },
                                    {
                                        block: 'select',
                                        mods: { mode: 'radio', theme: 'normal', size: 'm' },
                                        name: 'name',
                                        options: getOptions(openBadges.info.classes)
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
                                        mods: { theme: 'normal', size: 'm' }
                                    }
                                ]
                            }
                        ]
                    },
                    { tag: 'br' },
                    { block: 'awardUrl' }
                ]
            },
            { block : 'VsFoot'}
        ]
    };
};
