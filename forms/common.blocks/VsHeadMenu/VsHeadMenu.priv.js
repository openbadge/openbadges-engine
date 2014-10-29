priv.decl('VsHeadMenu', function(ctx) {
    var router = ctx.router,
        // FIXME(varankinv@): move `menu` somewhere
        menu = [
            {
                url : router.reverse({ controller : 'experiments', action : 'showExperiments' }),
                title : i18n('Эксперименты')
            },
            {
                url : router.reverse({ controller : 'archive', action : 'showArchive' }),
                title : i18n('Архив')
            },
            {
                url : router.reverse({ controller : 'history', action : 'showHistory' }),
                title : i18n('Журнал изменений')
            }
        ];
    return {
        block : 'VsHeadMenu',
        content : priv.build('VsHeadMenu__list', { list : menu, urlCurrent : ctx.urlCurrent })
    };
});

priv.decl('VsHeadMenu__list', function(ctx) {
    var urlCurrent = ctx.urlCurrent;
    return ctx.list.map(function(item) {
        var url = item.url,
            menuItem = {
                elem : 'item',
                mods : {},
                url : url,
                content : item.title
            };

        if(urlCurrent.indexOf(url) === 0) {
            var mods = menuItem.mods;
            mods.hit = true;
            if(urlCurrent === url) {
                mods.current = true;
            }
        }

        return menuItem;
    });
});
