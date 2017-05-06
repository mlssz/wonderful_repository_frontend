import request from 'superagent'

function getParam(name) {
    return sessionStorage.getItem(name) || localStorage.getItem(name);
}

export const getRepo = function(cb) {
    request
        .get('/api/repositories')
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let repo = JSON.parse(res.text);
            cb(repo);
        });
}

export const login = function(cb, params = {}) {
    let isRem = params.isRem;
    let loginState = params.loginState;
    let repo = params.repo;
    let repoId = repo[0].id;
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
    let url = '/api/repository/' + repoId + '/empty-location?num=' + (params.num || 1);
    request
        .get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let statusCode = res.statusCode;
            let body = JSON.parse(res.text);
            if (statusCode === 200) {
                let loc = JSON.parse(res.text).filter((arr) => arr.num !== 0);
                cb(loc);
            } else {
                console.log(statusCode, body);
                alert('失败 ： ' + body.error);
            }
        })
}

export const mergeGoods = function(goods) {
    let _goods = {};
    for (let i in goods) {
        let key = '' + goods[i].repository_id + goods[i].location_id + goods[i].layer + goods[i].import_time;
        if (!_goods[key]) {
            _goods[key] = [];
            goods[i].number = 1;
            goods[i]._id = [goods[i]._id];
            goods[i].id = [goods[i].id];
            _goods[key] = goods[i];
        } else {
            _goods[key].number += 1;
            _goods[key]._id.push(goods[i]._id);
            _goods[key].id.push(goods[i].id);
        }
    }
    return (Object.values(_goods))
}

export const putaway = function(cb, params = {}) {
    let task = params.task;
    let dealPutaway = function(loc) {
        let putawayTimes = loc.length;
        let type = task.type.join('-');
        let description = task.description;
        let import_time = new Date();
        let estimated_export_time = new Date(task.estimated_export_time);
        for (let i = 0; i < putawayTimes; i++) {
            let num = loc[i].num;
            let layer = loc[i].layer;
            let location_id = loc[i].location;
            let repository_id = 1;
            let sender = {
                type: type,
                description: description,
                import_time: import_time,
                estimated_export_time: estimated_export_time,
                height: 1,
                width: 1,
                length: 1,
                repository_id: repository_id,
                location_id: location_id,
                layer: layer,
                num: num,
            };
            request
                .post('/api/materials')
                .send(sender)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    console.log('putaway:', res)
                    let statusCode = res.statusCode;
                    let body = JSON.parse(res.text);
                    if (res.statusCode === 201) {
                        let goods = mergeGoods(body, loc[i].num);
                        cb(goods);
                    } else {
                        console.log(statusCode, body);
                        alert('失败 : ' + body.error);
                    }
                })
        }
    }
    if (!task.repository_id) {
        getLoc(dealPutaway, task)
    } else {
        let loc = [{
            repository: task.repository_id,
            location: task.location_id - 1,
            layer: task.layer - 1,
            num: task.num,
        }];
        dealPutaway(loc);
    }
}

export const getGoodNumber = function(cb, params = {}) {
    let others = params.others ? JSON.stringify(params.others) : '[]';
    others = '?others=' + others;
    let url = '/api/materials' + others;
    request
        .head(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let status = res.status;
            let number = res.header.num;
            cb(number);
        })
}

export const getGood = function(cb, params = {}) {
    if (params.page === undefined)
        params.page = -1;
    let page = params.page ? params.page - 1 : -1;
    page = 'page=' + page;
    let limit = '&limit=' + (params.limit || 10);
    let others = params.others ? JSON.stringify(params.others) : '[]';
    others = '&others=' + others;
    let url = '/api/materials?' + page + limit + others;
    request
        .get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let status = res.status;
            let body = JSON.parse(res.text);
            if (status === 200) {
                cb(body);
            } else
                alert('失败:' + body.error);
        })
}

export const getTask = function(cb, params = {}) {
    let page = params.page === undefined ? -1 : params.page - 1;
    page = 'page=' + page;
    let limit = '&limit=' + (params.limit || 10);
    let others = params.others ? JSON.stringify(params.others) : '[]';
    others = '&others=' + others;
    let url = '/api/tasks?' + page + limit + others;
    request
        .get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let status = res.status;
            let body = JSON.parse(res.text);
            if (status === 200) {
                cb(body);
            } else {
                console.log(status, body);
                alert('失败:' + body.error);
            }
        })
}

export const getTaskNumber = function(cb, params = {}) {
    let others = params.others ? JSON.stringify(params.others) : '[]';
    others = '?others=' + others;
    let url = '/api/tasks' + others;
    request
        .head(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
            let status = res.status;
            if (status === 200) {
                let number = res.header.num;
                cb(number);
            } else {
                console.log(status, res);
            }
        })
}

export const move = function(cb, params = {}) {
    let place = params.place || false;
    let goods = params.goods;
    let destination = params.destination || '';
    let num = goods.length;
    let dealMove = function(loc) {
        let length = loc.length;
        for (let i = 0; i < length; i++) {
            let numberOfPlace = loc[i].num;
            let layer = loc[i].layer;
            let location = loc[i].location;
            let repository = loc[i].repository !== undefined ? loc[i].repository : 1;
            let sender = {
                repository: repository,
                location: location,
                layer: layer,
                destination: destination,
            }
            console.log(sender)
            while (numberOfPlace--) {
                let good = goods.shift();
                let url = '/api/material/' + good._id + '/migrations';
                request
                    .post(url)
                    .send(sender)
                    .set('Accept', 'application/json')
                    .end(function(err, res) {
                        console.log('move:', res)
                        let statusCode = res.statusCode;
                        let body = res.text;
                        if (res.statusCode === 200) {
                            body = JSON.parse(body);
                            console.log(body);
                            // let goods = mergeGoods(body);
                            cb(goods);
                        } else {
                            console.log(statusCode, body);
                            alert('失败 : ' + body.error || body);
                        }
                    })
            }
        }
    }
    if (!place) {
        getLoc(dealMove, {
            num: num
        })
    } else {
        let loc = [place];
        dealMove(loc);
    }
}

export const deleteGood = function(cb, params = {}) {
    let ids = params.id;
    for (let id of ids) {
        let url = '/api/material/' + id;
        request
            .delete(url)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                console.log(status, res)
                let status = res.status;
                let body = JSON.parse(res.text);
            })
    }

}