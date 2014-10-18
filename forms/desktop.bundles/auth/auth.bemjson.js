({
    block: 'page',
    title: 'Authorization',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/auth/_auth.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/auth/_auth.js' },
    ],
    mods: {
        theme: 'normal'
    },
    content: [
        {
            block: 'form',
            action: '/auth',
            method: 'post',
            content: [
                {
                    tag: 'b',
                    content: 'Authorization:'
                },
                { tag: 'br' },
                { tag: 'br' },
                {
                    content: [
                        {
                            block: 'input',
                            name: 'username',
                            mods: { theme: 'normal', size: 'm', 'has-clear': true },
                            placeholder: 'Username...'
                        },
                        ' ',
                        {
                            block: 'error',
                            name: 'username',
                            id: 1,
                            mods: { disabled: true },
                            content: 'Fill this field!'
                        }
                    ]
                },
                { tag: 'br' },
                {
                    content: [
                        {
                            block: 'input',
                            name: 'password',
                            mods: { theme: 'normal', size: 'm', 'has-clear': true, type: 'password' },
                            placeholder: 'Password...'
                        },
                        ' ',
                        {
                            block: 'error',
                            name: 'password',
                            id: 1,
                            mods: { disabled: true },
                            content: 'Fill this field!'
                        }
                    ]
                },
                { tag: 'br' },
                {
                    block: 'button',
                    text: 'Sign In',
                    mods: { type: 'submit', theme: 'normal', size: 'm', view: 'action' }
                },
                ' ',
                {
                    block: 'spin',
                    mods: { theme: 'normal', size: 'm' }
                }
            ]
        }
    ]
});
