({
    block: 'page',
    title: 'Issuer',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/issuer/_issuer.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/issuer/_issuer.js' },
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
                content: 'Issuer:'
            }
        },
        {
            block: 'form',
            action: '/issuer',
            method: 'post',
            enctype: 'multipart/form-data',
            content: [
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
                            id: 1,
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
                            name: 'url',
                            mods: { theme: 'normal', size: 'm', 'has-clear': true },
                            placeholder: 'URL...'
                        },
                        ' ',
                        {
                            block: 'error',
                            name: 'url',
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
                            id: 'id123',
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
                            name: 'email',
                            mods: { theme: 'normal', size: 'm', 'has-clear': true },
                            placeholder: 'Email...',
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
                    block: 'button',
                    text: 'Create Issuer',
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
