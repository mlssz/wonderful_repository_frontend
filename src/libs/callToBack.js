import request from 'superagent'

export const getRepo = function(cb) {
    request
        .get('/api/repositories')
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let repo = JSON.parse(res.text);
            cb(repo);
        });
}

export const login = function(cb, params) {
    let isRem = params.isRem;
    let loginState = params.loginState;
    let repoId = params.repoId;
    if (isRem) {
        localStorage.setItem('loginState', JSON.stringify(loginState));
        localStorage.setItem('repoid', repoId);
    } else {
        sessionStorage.setItem('loginState', JSON.stringify(loginState));
        sessionStorage.setItem('repoid', repoId);
    }
    cb();
}