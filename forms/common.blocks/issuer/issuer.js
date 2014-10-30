modules.define('issuer', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        var buttons = this.findBlocksInside('button'),
                            submitButton = buttons[buttons.length - 1],
                            spin = this.findBlockInside('spin'),
                            attach = this.findBlockInside('attach'),
                            errors = this.findBlocksInside('error'),
                            form = this.findBlockInside('form');

                        submitButton.setMod('disabled');
                        spin.setMod('progress');

                        var isError = false,
                            formVals = qs.parse(form.domElem.serialize());

                        if (!attach.elem('control').val()) {
                            attach.setMod('error');
                            isError = true;
                        }

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
                            submitButton.delMod('disabled');
                            spin.delMod('progress');
                        }
                    });
                }
            }
        }
    }));
});
