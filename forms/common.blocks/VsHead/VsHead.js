modules.define(
    'VsHead',
    ['BemView', 'HeadActionBar'],
    function (provide, BemView, HeadActionBar) {
        provide(BemView.decl(this.name, {
            _onHeadPanelSettingsAction: function () {
                this.emit('show-settings');
            }
        }, {
        live: function () {
            this.liveInitOnBlockInsideEvent('settings', HeadActionBar.getName(),
                this.prototype._onHeadPanelSettingsAction);
        }
    }));
});
