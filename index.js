process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

var request = require('request');
var alexac = require("./alexa_constants");
var HoCoUrl = "https://home.die-hoffs.net:1885/hoco/api";

// namespace dispatcher
exports.handler = function(event, context, callback) {
    log("Received Message", event);
    var requestedNamespace = event.header.namespace;
    var response = null;
    switch (requestedNamespace) {
        case alexac.NAMESPACE_DISCOVERY:
            handleDiscovery(event, callback);
            break;
        case alexac.NAMESPACE_CONTROL:
            handleControl(event, callback);
            break;
        case alexac.NAMESPACE_QUERY:
            handleQuery(event, callback);
            break;
        default:
            log("Error", "Unsupported namespace " + requestedNamespace);
            handleUnexpectedInfo(requestedNamespace, callback);
            break;
    }
};

// discovery message dispatcher
var handleDiscovery = function(event, callback) {
    var response = null;
    var requestedName = event.header.name;
    switch (requestedName) {
        case alexac.REQUEST_DISCOVER:
            response = HoCo(event, alexac.RESPONSE_DISCOVER, callback);
            break;
        default:
            log("Error", "Unsupported operation " + requestedName);
            handleUnsupportedOperation(callback);
            break;
    }
};

// control message dispatcher
var handleControl = function(event, callback) {
    var response = null;
    var requestedName = event.header.name;
    switch (requestedName) {
        case alexac.REQUEST_TURN_ON:
            response = HoCo(event, alexac.RESPONSE_TURN_ON, callback);
            break;
        case alexac.REQUEST_TURN_OFF:
            response = HoCo(event, alexac.RESPONSE_TURN_OFF, callback);
            break;
        case alexac.REQUEST_SET_PERCENTAGE:
            response = HoCo(event, alexac.RESPONSE_SET_PERCENTAGE, callback);
            break;
        case alexac.REQUEST_DEC_PERCENTAGE:
            response = HoCo(event, alexac.RESPONSE_DEC_PERCENTAGE, callback);
            break;
        case alexac.REQUEST_INC_PERCENTAGE:
            response = HoCo(event, alexac.RESPONSE_INC_PERCENTAGE, callback);
            break;
        case alexac.REQUEST_SET_TARGET_TEMP:
            response = HoCo(event, alexac.RESPONSE_SET_TARGET_TEMP, callback);
            break;
        case alexac.REQUEST_INC_TARGET_TEMP:
            response = HoCo(event, alexac.RESPONSE_INC_TARGET_TEMP, callback);
            break;
        case alexac.REQUEST_SET_LOCK_STATE:
            response = HoCo(event, alexac.RESPONSE_SET_LOCK_STATE, callback);
            break;
        default:
            log("Error", "Unsupported operation" + requestedName);
            handleUnsupportedOperation(callback);
            break;
    }
};

// query message dispatcher
var handleQuery = function(event, callback) {
    var response = null;
    var requestedName = event.header.name;
    switch (requestedName) {
        case alexac.REQUEST_GET_TEMP:
            response = HoCo(event, alexac.RESPONSE_GET_TEMP, callback);
            break;
        case alexac.REQUEST_GET_TARGET_TEMP:
            response = HoCo(event, alexac.RESPONSE_GET_TARGET_TEMP, callback);
            break;
        case alexac.REQUEST_GET_LOCK_STATE:
            response = HoCo(event, alexac.RESPONSE_GET_LOCK_STATE, callback);
            break;
        default:
            log("Error", "Unsupported operation" + requestedName);
            handleUnsupportedOperation(callback);
            break;
    }
};

// error handler
var handleUnsupportedOperation = function(callback) {
    var header = createHeader(alexac.NAMESPACE_CONTROL, alexac.ERROR_UNSUPPORTED_OPERATION);
    var payload = {};
    callback(null, createDirective(header, payload));
};

var handleUnexpectedInfo = function(fault, callback) {
    var header = createHeader(alexac.NAMESPACE_CONTROL, alexac.ERROR_UNEXPECTED_INFO);
    var payload = {
        "faultingParameter": fault
    };
    callback(null, createDirective(header, payload));
};

// message helper
var createMessageId = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

var createHeader = function(namespace, name) {
    return {
        "messageId": createMessageId(),
        "namespace": namespace,
        "name": name,
        "payloadVersion": "2"
    };
};

var createDirective = function(header, payload) {
    return {
        "header": header,
        "payload": payload
    };
};

// logging
var log = function(title, msg) {
    console.log('**** ' + title + ': ' + JSON.stringify(msg));
};

// HoCo communication
var HoCo = function(event, resmsg, callback) {
    log("HoCo: ", event);
    var url = HoCoUrl;
    if (event.payload.appliance)
        if (event.payload.appliance.applianceId)
            url = url + '/' + event.payload.appliance.applianceId;
    url = url + '?token=' + event.payload.accessToken;
    if (event.header.name)
        url = url + '&cmd=' + event.header.name;
    request(url, function(error, response, body) {
        if (error)
            callback("Error in " + event.header.name + ": " + error, null);
        else if (response.statusCode != 200)
            callback("Error in " + event.header.name + ": ResponseCode " + response.statusCode, null);
        else {
            var header = createHeader(event.header.namespace, resmsg);
            var payload = JSON.parse(body);
            var directive = createDirective(header, payload);
            log("HoCo response: ", directive);
            callback(null, directive);
        }
    });
};