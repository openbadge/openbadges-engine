bh.match('VsUser', function(ctx, json) {
    ctx
        .js(true)
        .content({
            block : 'image',
            mix : { block : 'VsUser', elem : 'avatar' },
            url : json.avatar
        });
});
