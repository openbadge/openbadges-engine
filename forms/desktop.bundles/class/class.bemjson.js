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
            content: [
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/',
                    content : 'Open Badges'
                },
                { tag: 'br' },
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/manual-awarding',
                    content : 'Reward Badges'
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
                    tag: 'b',
                    content: 'Class:'
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
        },
        { tag: 'br' }
    ]
});
