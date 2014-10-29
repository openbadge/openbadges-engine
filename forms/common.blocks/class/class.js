modules.define('class', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', function (e) {
                        var _this = this;

                        //var links = this.findBlocksInside('link'),
                        var buttons = this.findBlocksInside('button'),
                            submitButton = buttons[buttons.length - 1],
                            spin = this.findBlockInside('spin');

                        if (this.checkedOnErrors) {
                            submitButton.setMod('disabled');
                            spin.setMod('progress');
                            //links.forEach(function (link) {
                            //    link.setMod('disabled');
                            //});
                            return;
                        }

                        e.preventDefault();

                        var form = this.findBlockInside('form'),
                            attach = this.findBlockInside('attach'),
                            errors = this.findBlocksInside('error'),
                            nameError = errors[0];

                        $(nameError.domElem).text('Fill this field!');

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

                        if (!isError) {
                            $.post('/check-class-existence', formVals, function (data) {
                                if (data === 'Ok!') {
                                    _this.checkedOnErrors = true;
                                    form.domElem.submit();
                                } else {
                                    $(nameError.domElem).text('Exists!');
                                    nameError.delMod('disabled');
                                }
                            });
                        }
                    });
                }
            }
        }
    }));
});
