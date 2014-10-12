modules.define('form', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        var buttons = this.findBlocksInside('button'),
                            links = this.findBlocksInside('link');

                        buttons[buttons.length - 1].setMod('disabled');
                        this.findBlockInside('spin').setMod('progress');

                        links.forEach(function (link) {
                            link.setMod('disabled');
                        });

                        var isError = false,
                            formVals = qs.parse(this.domElem.serialize()),
                            attach = this.findBlockInside('attach'),
                            errors = this.findBlocksInside('error');

                        if (attach && !attach.elem('control').val()) { isError = true; }

                        Object.keys(formVals).forEach(function (val) {
                            if (formVals[val] === '') {
                                errors.forEach(function (err) {
                                    if (err.domElem.attr('name') === val) {
                                        err.delMod('disabled');
                                        isError = true;
                                    }
                                });
                            } else {
                                errors.forEach(function (err) {
                                    if (err.domElem.attr('name') === val) {
                                        err.setMod('disabled');
                                    }
                                });
                            }
                        });

                        if (isError) {
                            e.preventDefault();
                            this.findBlockInside('spin').delMod('progress');
                            buttons[buttons.length - 1].delMod('disabled');

                            links.forEach(function (link) {
                                link.delMod('disabled');
                            });
                        }
                    });
                }
            }
        }
    }));
});
