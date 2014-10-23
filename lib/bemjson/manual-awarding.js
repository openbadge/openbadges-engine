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
        content: {
            block: 'award',
            content: [
                {
                    content: [
                        {
                            block: 'link',
                            mods: { theme: 'normal' },
                            url: '/',
                            content: '<– Open Badges'
                        },
                        { tag: 'br' },
                        {
                            block: 'link',
                            mods: { theme: 'normal' },
                            url: '/class',
                            content: '<– Create Classes'
                        }
                    ]
                },
                {
                    block: 'form',
                    action: '/manual-awarding',
                    method: 'post',
                    enctype: 'multipart/form-data',
                    content: [
                        {
                            content: {
                                tag: 'b',
                                content: 'Awarding:'
                            }
                        },
                        { tag: 'br' },
                        {
                            content: [
                                {
                                    block: 'input',
                                    name: 'email',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'Email...'
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
                            content: {
                                block: 'select',
                                mods: { mode: 'radio', theme: 'normal', size: 'm' },
                                name: 'name',
                                options: getOptions(openBadges.info.classes)
                            }
                        },
                        { tag: 'br' },
                        {
                            block: 'button',
                            text: 'Reward Badge',
                            mods: {
                                type: 'submit',
                                theme: 'normal',
                                size: 'm',
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
        }
    };
};
