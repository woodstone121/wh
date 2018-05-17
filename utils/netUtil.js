
function requestConfig() {
    this.showLoading = true;
    this.enableLog = false;
    this.page;
    this.urlTail;
    this.params;
    this.canUseWxLoading = true;
    this.netMethod = 'POST';

    var that = this;
    this.callback = {
        onPre: function () {
            if (that.showLoading) {
                that.showNetworkLoading(that, that.canUseWxLoading);
            }
        },
        onEnd: function () {
            if (that.showLoading) {
                that.hideNetworkLoading(that, that.canUseWxLoading);
            }
        },
        onSuccess: function (data) {

        },
        onError: function (errorType, code, msg) {

        }
    }

    this.setMethodGet = function () {
        this.netMethod = 'GET';
        return this;
    }

    this.send = function () {
        request(this);
    }

    this.setShowLoading = function (isShowLoading) {
        this.showLoading = isShowLoading;
        return this;
    }
}

function buildRequest(page, urlTail, params, callback) {
    var config = new requestConfig();
    config.page = page;
    config.urlTail = urlTail;
    config.params = params;
    try {
        if (wx.canIUse('showLoading')) {
            config.canUseWxLoading = true;
        } else {
            config.canUseWxLoading = false;
        }
    } catch (error) {
        config.canUseWxLoading = false;
    }

    if (isFunction(callback.onPre)) {
        config.callback.onPre = callback.onPre;
    }
    if (isFunction(callback.onEnd)) {
        config.callback.onEnd = callback.onEnd;
    }
    if (isFunction(callback.onSuccess)) {
        config.callback.onSuccess = callback.onSuccess;
    }
    if (isFunction(callback.onError)) {
        config.callback.onError = callback.onError;
    }

    return config;
}

function request(requestConfig) {

    var contentType = 'application/json;charset=UTF-8';
    var hearderData = {
        'Content-Type': contentType
    }

    if (isFunction(requestConfig.callback.onPre)) {
        requestConfig.callback.onPre();
    }

    var wholeUrl = requestConfig.urlTail;
    // config base url
    var baseUrl = "TO DO";
    if (wholeUrl.indexOf('://') < 0) {
        wholeUrl = baseUrl + requestConfig.urlTail;
    }

    if (requestConfig.netMethod == 'GET') {
        var paramStr = objToStr("&", requestConfig.params);
        paramStr = paramStr.substring(0, paramStr.length - 1);
        wholeUrl = wholeUrl + "?" + paramStr;
    } else if (requestConfig.netMethod == 'POST') {

    }

    if (requestConfig.enableLog) {
        var requestLog = {
            url: wholeUrl,
            header: hearderData,
            data: requestConfig.params
        }
        console.info("■■■■■■■■■■■■■■■■ [Request]");
        console.info(requestLog);
    }
}

function showNetworkLoading(that, canUseWxLoading) {
    if (canUseWxLoading) {
        wx.showLoading({
            title: "加载中",
            mask: true
        })
    } else {
        wx.showToast({
            title: "加载中",
            icon: "loading",
            mask: true,
            duration: 60000
        })
    }
}

function hideNetworkLoading(that, canUseWxLoading) {
    if (canUseWxLoading) {
        wx.hideLoading();
    } else {
        wx.hideToast();
    }
}

function isFunction(value) {
    if (typeof (value) == 'function') {
        return true;
    } else {
        return false;
    }
}

function objToStr(appendixStr, obj) {
    var str = "";
    for (var p in obj) { // 方法
        if (typeof (obj[p]) == "function") {
            // obj [ p ]() ; //调用方法

        } else if (obj[p] != undefined && obj[p] != null) { // p 为属性名称，obj[p]为对应属性的值
            str += p + "=" + obj[p] + appendixStr;
        }
    }
    return str;
}