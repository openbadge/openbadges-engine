/**
 * Returns bemjson for the class form
 * @param {Object} openBadges
 * @returns {Object}
 */
module.exports = function (openBadges) {
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
        content: {
            block: 'class',
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
                            mods: {
                                theme: 'normal',
                                disabled: !openBadges.info.classes.length
                            },
                            url: '/manual-awarding',
                            content: 'Reward Badges –>'
                        }
                    ]
                },
                {
                    block: 'form',
                    action: '/class',
                    method: 'post',
                    enctype: 'multipart/form-data',
                    content: [
                        {
                            content: {
                                tag: 'b',
                                content: 'Class:'
                            }
                        },
                        { tag: 'br' },
                        {
                            content: [
                                {
                                    block: 'input',
                                    name: 'name',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'Name...'
                                },
                                ' ',
                                {
                                    block: 'error',
                                    name: 'name',
                                    mods: { disabled: true },
                                    content: 'Fill this field!'
                                },
                            ]
                        },
                        { tag: 'br' },
                        {
                            content: [
                                {
                                    block: 'input',
                                    name: 'description',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'Description...',
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
                                    block: 'attach',
                                    name: 'image',
                                    id: 'image1',
                                    mods: { theme: 'simple' },
                                    button: 'Choose a file',
                                    noFileText: 'Not chosen'
                                }
                            ]
                        },
                        { tag: 'br' },
                        {
                            content: [
                                {
                                    block: 'input',
                                    name: 'criteria',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'criteria...',
                                },
                                ' ',
                                {
                                    block: 'error',
                                    name: 'criteria',
                                    mods: { disabled: true },
                                    content: 'Fill this field!'
                                }
                            ]
                        },
                        { tag: 'br' },
                        {
                            block: 'button',
                            text: 'Create Class',
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
