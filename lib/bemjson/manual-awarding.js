// GET request --> http://HOST/manual-awarding

module.exports = {
    block: 'page',
    title: 'Manual Awarding',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/badge/_badge.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/badge/_badge.js' },
    ],
    mods: {
        theme: 'normal'
    },
    content: [
        {
            content: [
                {
                    block: 'link',
                    mods: { theme: 'normal' },
                    url: '/',
                    content: 'Open Badges'
                },
                { tag: 'br' },
                {
                    block: 'link',
                    mods: { theme: 'normal' },
                    url: '/class',
                    content: 'Create Classes'
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
                    tag: 'b',
                    content: 'Awarding:'
                },
                { tag: 'br' },
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
                { tag: 'br' },
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
};
