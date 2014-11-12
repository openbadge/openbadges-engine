modules.define('issuer', ['i-bem__dom', 'jquery', 'querystring'], function (provide, BEMDOM, $, qs) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    var inputs = this.findBlocksInside('input'),
                        nameInput = inputs[0],
                        buttons = this.findBlocksInside('button'),
                        submitButton = buttons[buttons.length - 1],
                        spin = this.findBlockInside('spin'),
                        attach = this.findBlockInside('attach'),
                        form = this.findBlockInside('form'),
                        errors = this.findBlocksInside('error'),
                        nameError = errors[0];

                    var url = window.location.href,
                        queriesStartIndex = url.indexOf('?') + 1,
                        data = queriesStartIndex ? url.substring(queriesStartIndex).split('&') : [],
                        inpVals = {};

                    queriesStartIndex && attach.elem('no-file').text('PNG image is expected') && attach.setMod('error');

                    for (var i = 0; i < data.length; i++) {
                        var key = data[i].substring(0, data[i].indexOf('=')).replace(/%20/g, ' '),
                            value = data[i].substring(data[i].indexOf('=') + 1).replace(/%20/g, ' ');

                        inpVals[key] = value;
                    }

                    Object.keys(inpVals).forEach(function (val) {
                        inputs.forEach(function (input) {
                            if (input.elem('control').attr('name') === val) {
                                input.elem('control').val(inpVals[val]);
                            }
                        })
                    });

                    this.bindTo('submit', function (e) {
                        submitButton.setMod('disabled');
                        spin.setMod('progress');

                        nameError.domElem.text('Fill this field!');

                        var isError = false,
                            formVals = qs.parse(form.domElem.serialize());

                        if (!attach.elem('control').val()) {
                            attach.elem('no-file').text('Not chosen');
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

                        var nameInputVal = nameInput.elem('control').val();
                        if (/[^A-Za-z0-9_\- ]/.test(nameInputVal)) {
                            nameError.domElem.text('Invalid class name!');
                            nameError.delMod('disabled');
                            isError = true;
                        }

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
