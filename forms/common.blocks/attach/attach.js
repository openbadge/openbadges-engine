modules.define('attach', ['i-bem__dom'], function (provide, BEMDOM) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.__base.apply(this, arguments);
                    this.clear();
                }
            }
        }
    }));
});
