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
                            form = this.findBlockInside('form'),
                            labels = this.findBlocksInside('label'),
                            awardLabel = labels[labels.length - 1],
                            notes = this.findBlocksInside('note'),
                            awardNote = notes[notes.length - 1];

                        awardLabel.setMod('disabled');

                        error.setMod('disabled');

                        var formVals = qs.parse(form.domElem.serialize());
                        var inputs = this.findBlocksInside('input'),
                            awardUrl = inputs[inputs.length - 1];

                        submitButton.setMod('disabled');
                        spin.setMod('progress');
                        awardUrl.setMod('hidden');
                        awardNote.setMod('disabled');

                        if (formVals.email === '') {
                            error.delMod('disabled');
                            spin.delMod('progress');
                            submitButton.delMod('disabled');
                        } else {
                            $.post('/manual-awarding', formVals, function (data) {
                                spin.delMod('progress');
                                submitButton.delMod('disabled');
                                awardUrl.elem('control').val(data);
                                awardUrl.delMod('hidden');
                                awardLabel.delMod('disabled');
                                awardNote.delMod('disabled');
                            });
                        }
                    });
                }
            }
        }
    }));
});
