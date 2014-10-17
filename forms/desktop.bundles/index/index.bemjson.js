({
    block: 'page',
    title: 'Open Badges',
    styles: [
        { elem: 'css', url: '/forms/desktop.bundles/index/_index.css' }
    ],
    scripts: [
        { elem: 'js', url: '/forms/desktop.bundles/index/_index.js' }
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
                content: 'Open Badges:'
            }
        },
        {
            content: [
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/issuer',
                    content : 'Create an Issuer'
                },
                { tag: 'br' },
                {
                    block : 'link',
                    mods : { theme : 'normal' },
                    url : '/class',
                    content : 'Create Classes'
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
        { tag: 'br' },
        {
            block: 'button',
            url : '/sign-out',
            text: 'Sign out',
            mods: { type: 'link', theme: 'normal', size: 'm', view: 'action' }
        }
    ]
});
