import request from 'superagent'

function getParam(name) {
    return sessionStorage.getItem(name) || localStorage.getItem(name);
}

export const getRepo = function(cb) {
    // request
    //     .get('/api/repositories')
    //     .set('Accept', 'application/json')
    //     .end(function(err, res) {
    //         let repo = JSON.parse(res.text);
    //         cb(repo);
    //     });
    cb([{
        _id: 'test'
    }])
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

export const getLoc = function(cb, params = {}) {
    let repoId = getParam('repoid');
    console.log('getLoc')
    request
        .get('/api/repository/' + repoId + '/empty-location?num=' + (params.num || 1))
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let loc = JSON.parse(res.text);
            cb(loc);
        })
}