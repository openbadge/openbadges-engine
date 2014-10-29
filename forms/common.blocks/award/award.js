modules.define('award', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        var buttons = this.findBlocksInside('button'),
                            submitButton = buttons[buttons.length - 1],
                            spin = this.findBlockInside('spin'),
                            error = this.findBlockInside('error'),
                        //    links = this.findBlocksInside('link'),
                            form = this.findBlockInside('form');

                        //links.forEach(function (link) {
                        //    link.setMod('disabled');
                        //});
                        submitButton.setMod('disabled');
                        spin.setMod('progress');

                        if (qs.parse(form.domElem.serialize()).email === '') {
                            e.preventDefault();
                            error.delMod('disabled');
                            spin.delMod('progress');
                            submitButton.delMod('disabled');
                            //links.forEach(function (link) {
                            //    link.delMod('disabled');
                            //});
                        }
                    });
                }
            }
        }
    }));
});
