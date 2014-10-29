priv.decl('VsHead', function(ctx) {
    return {
        block : this.name,
        service : ctx.app.title,
        left : priv.build('VsHeadMenu', { urlCurrent : ctx.request.url, router : ctx.router }),
        right : [
            priv.build('HeadActionBar', ctx),
            priv.build('VsUser', ctx.user)
        ]
    };
});
