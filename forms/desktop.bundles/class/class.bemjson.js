({
    block: 'page',
    title: 'Class',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/class/_class.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/class/_class.js' },
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
                content: 'Badge Class:'
            }
        },
        {
            block: 'form',
            action: '/class',
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
                        size: 'l',
                        view: 'action'
                    }
                },
                ' ',
                {
                    block: 'spin',
                    mods: { theme: 'normal', size: 'l' }
                },
                { tag: 'br' },
                { tag: 'br' },
                { tag: 'br' },
                '----------------------',
                { tag: 'br' },
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/manual-awarding',
                    content : 'Reward Badges'
                },
                { tag: 'br' },
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/',
                    content : 'Open Badges'
                }
            ]
        }
    ]
});
