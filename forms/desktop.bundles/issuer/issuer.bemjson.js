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
            content: [
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/',
                    content : 'Open Badges'
                }
            ]
        },
        {
            block: 'form',
            action: '/issuer',
            method: 'post',
            enctype: 'multipart/form-data',
            content: [
                {
                    tag: 'b',
                    content: 'Issuer:'
                },
                { tag: 'br' },
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
});
