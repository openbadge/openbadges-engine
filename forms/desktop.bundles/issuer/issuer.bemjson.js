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
                        content : 'Issuer'
                    },
                    {
                        elem : 'item',
                        url : '/class',
                        mods: { disabled: true },
                        content : 'Create badges'
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
                                    autocomplete: false,
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'organization which is going to award badges'
                                },
                                ' ',
                                {
                                    block: 'error',
                                    name: 'name',
                                    mods: { disabled: true },
                                    content: 'Fill this field!'
                                },
                                {
                                    block: 'note',
                                    content: 'latin symbols including spaces, underscores and hyphens'
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
                                    autocomplete: false,
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'site of the organization'
                                },
                                ' ',
                                {
                                    block: 'error',
                                    name: 'url',
                                    mods: { disabled: true },
                                    content: 'Fill this field!'
                                },
                                {
                                    block: 'note',
                                    content: 'real url is expected'
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
                                    autocomplete: false,
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'some information about the organization',
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
                                    content: 'Emblem'
                                },
                                {
                                    block: 'attach',
                                    name: 'image',
                                    mods: { theme: 'simple' },
                                    button: {
                                        block: 'button',
                                        mods : { theme : 'normal', size: 'm' },
                                        text : 'Choose a file'
                                    },
                                    noFileText: ''
                                },
                                {
                                    block: 'note',
                                    content: 'PNG image'
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
                                    autocomplete: false,
                                    mods: { theme: 'normal', size: 'm', 'has-clear': true },
                                    placeholder: 'email of the organization',
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
                                    mods: { theme: 'normal', size: 'l' }
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
