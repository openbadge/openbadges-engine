priv.decl('VsUser', function(user) {
    return {
        block : this.name,
        uid : user.uid,
        login : user.login,
        avatar : user.avatar
    };
});
