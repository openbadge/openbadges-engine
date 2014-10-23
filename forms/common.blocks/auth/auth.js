modules.define('auth', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        var button = this.findBlockInside('button'),
                            spin = this.findBlockInside('spin'),
                            error = this.findBlockInside('error'),
                            form = this.findBlockInside('form'),
                            formVals = qs.parse(form.domElem.serialize());

                        button.setMod('disabled');
                        spin.setMod('progress');
                        error.setMod('disabled');

                        e.preventDefault();

                        $.post('/auth', formVals)
                            .error(function (err) {
                                if (err.status === 401 || err.status === 400) {
                                    button.delMod('disabled');
                                    spin.delMod('progress');
                                    error.delMod('disabled');
                                }
                            })
                            .success(function () {
                                window.location.reload();
                            });
                    });
                }
            }
        }
    }));
});
