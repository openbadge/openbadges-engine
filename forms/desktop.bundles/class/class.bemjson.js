({
    block: 'page',
    title: 'Badge Class',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/class/_class.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/class/_class.js' },
    ],
    content: [
        {
            block: 'header',
            tag: 'b',
            content: {
                tag: 'p',
                content: 'BADGE CLASS:'
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
                            button: 'Выберите файл',
                            noFileText: 'Файл не выбран'
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
                }
            ]
        }
    ]
});
