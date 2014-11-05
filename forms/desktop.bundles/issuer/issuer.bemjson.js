({
    block: 'page',
    title: 'Issuer',
    styles: [
        { elem: 'css', url: '_issuer.css' }
    ],
    scripts: [
        { elem: 'js', url: '_issuer.js' },
    ],
    mods: {
        theme: 'normal'
    },
    content: [
        {
            block : 'VsHead',
            service : 'Open Badges',// '@pilot',
            left : {
                block : 'VsHeadMenu',
                content : [
                    {
                        elem : 'item',
                        mods : { hit : true, current : true },
                        url : '/issuer',
                        content : 'Create an issuer'
                    },
                    {
                        elem : 'item',
                        url : '/class',
                        mods: { disabled: true },
                        content : 'Create classes'
                    },
                    {
                        elem : 'item',
                        url : '/manual-awarding',
                        mods: { disabled: true },
                        content : 'Award badges'
                    }
                ]
            },
            right : {
                block: 'button',
                url: '/sign-out',
                text: 'Sign out',
                mods: { type: 'link', theme: 'normal', size: 'xl', view: 'action' }
            }
        },
        {
            block: 'issuer',
            content: [
                {
                    block: 'form',
                    action: '/issuer',
                    method: 'post',
                    enctype: 'multipart/form-data',
                    content: [
                        {
                            content: [
                                {
                                    block: 'label',
                                    content: 'Name'
                                },
                                {
                                    block: 'input',
                                    name: 'name',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'any string you like...'
                                },
                                ' ',
                                {
                                    block: 'error',
                                    name: 'name',
                                    mods: { disabled: true },
                                    content: 'Fill this field!'
                                }
                            ]
                        },
                        { tag: 'br' },
                        {
                            content: [
                                {
                                    block: 'label',
                                    content: 'URL'
                                },
                                {
                                    block: 'input',
                                    name: 'url',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'real URL with its protocol at the beginning...'
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
                                    block: 'label',
                                    content: 'Description'
                                },
                                {
                                    block: 'input',
                                    name: 'description',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'any string you like...',
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
                                    block: 'label',
                                    content: 'PNG image'
                                },
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
                                    block: 'label',
                                    content: 'Email'
                                },
                                {
                                    block: 'input',
                                    name: 'email',
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'correct email format is expected...',
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
                            content: [
                                {
                                    block: 'label',
                                    content: ''
                                },
                                {
                                    block: 'button',
                                    text: 'Create',
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
                                    mods: { theme: 'normal', size: 'm' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        { block : 'VsFoot'}
    ]
});
