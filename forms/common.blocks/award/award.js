modules.define('award', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        e.preventDefault();
                        var buttons = this.findBlocksInside('button'),
                            submitButton = buttons[buttons.length - 1],
                            spin = this.findBlockInside('spin'),
                            error = this.findBlockInside('error'),
                            form = this.findBlockInside('form');

                        error.setMod('disabled');

                        var formVals = qs.parse(form.domElem.serialize());
                        var awardUrl = this.findBlockInside('awardUrl');

                        submitButton.setMod('disabled');
                        spin.setMod('progress');
                        $(awardUrl.domElem).text('');

                        if (formVals.email === '') {
                            error.delMod('disabled');
                            spin.delMod('progress');
                            submitButton.delMod('disabled');
                        } else {
                            $.post('/manual-awarding', formVals, function (data) {
                                spin.delMod('progress');
                                submitButton.delMod('disabled');
                                $(awardUrl.domElem).text(data);
                            });
                        }
                    });
                }
            }
        }
    }));
});
