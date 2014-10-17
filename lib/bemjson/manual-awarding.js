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
            block: 'link',
            mods: { theme: 'normal' },
            url: '/',
            content: '<– Open Badges'
        },
        {
            block: 'header',
            tag: 'b',
            content: {
                tag: 'p',
                content: 'Awarding:'
            }
        },
        {
            block: 'form',
            action: '/manual-awarding',
            method: 'post',
            enctype: 'multipart/form-data',
            content: [
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
        },
        { tag: 'br' },
        {
            block: 'link',
            mods: { theme: 'normal' },
            url: '/class',
            content: '<– Create Classes'
        }
    ]
};
