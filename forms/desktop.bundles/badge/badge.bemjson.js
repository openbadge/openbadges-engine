({
    block: 'page',
    title: 'Manual Awarding',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/badge/_badge.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/badge/_badge.js' },
    ],
    content: [
        {
            block: 'header',
            tag: 'b',
            content: {
                tag: 'p',
                content: 'AWARDING:'
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
                            id: 1,
                            mods: { disabled: true },
                            content: 'Fill this field!'
                        },
                    ]
                },
                { tag: 'br' },
                {
                    block: 'select',
                    mods: { mode: 'radio', theme: 'normal', size: 'm' },
                    name: 'select1',
                    options: [ { val: '', text: '', checked: true } ]
                },
                { tag: 'br' },
                { tag: 'br' },
                {
                    block: 'button',
                    text: 'Reward Badge',
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
});
