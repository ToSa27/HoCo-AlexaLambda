process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

var request = require('request');

var baseurl = "https://home.die-hoffs.net:1885/hoco/api";

// namespaces
const NAMESPACE_DISCOVERY = "Alexa.ConnectedHome.Discovery";
const NAMESPACE_CONTROL = "Alexa.ConnectedHome.Control";
const NAMESPACE_QUERY = "Alexa.ConnectedHome.Query";

// discovery messages
const REQUEST_DISCOVER = "DiscoverAppliancesRequest";
const RESPONSE_DISCOVER = "DiscoverAppliancesResponse";

// control messages - on/off
const REQUEST_TURN_ON = "TurnOnRequest";
const RESPONSE_TURN_ON = "TurnOnConfirmation";
const REQUEST_TURN_OFF = "TurnOffRequest";
const RESPONSE_TURN_OFF = "TurnOffConfirmation";

// control messages - dimming
const REQUEST_SET_PERCENTAGE = "SetPercentageRequest";
const RESPONSE_SET_PERCENTAGE = "SetPercentageConfirmation";
const REQUEST_DEC_PERCENTAGE = "DecrementPercentageRequest";
const RESPONSE_DEC_PERCENTAGE = "DecrementPercentageConfirmation";
const REQUEST_INC_PERCENTAGE = "IncrementPercentageRequest";
const RESPONSE_INC_PERCENTAGE = "IncrementPercentageConfirmation";

// control messages - temperature
const REQUEST_SET_TARGET_TEMP = "SetTargetTemperatureRequest";
const RESPONSE_SET_TARGET_TEMP = "SetTargetTemperatureConfirmation";
const REQUEST_INC_TARGET_TEMP = "IncrementTargetTemperatureRequest";
const RESPONSE_INC_TARGET_TEMP = "IncrementTargetTemperatureConfirmation";

// control messages - lock
const REQUEST_SET_LOCK_STATE = "SetLockStateRequest";
const RESPONSE_SET_LOCK_STATE = "SetLockStateConfirmation";

// query messages - temperature
const REQUEST_GET_TEMP = "GetTemperatureReadingRequest";
const RESPONSE_GET_TEMP = "GetTemperatureReadingResponse";
const REQUEST_GET_TARGET_TEMP = "GetTargetTemperatureRequest";
const RESPONSE_GET_TARGET_TEMP = "GetTargetTemperatureResponse";

// query messages - lock
const REQUEST_GET_LOCK_STATE = "GetLockStateRequest";
const RESPONSE_GET_LOCK_STATE = "GetLockStateResponse";

// health check messages
const REQUEST_HEALTH_CHECK = "HealthCheckRequest";
const RESPONSE_HEALTH_CHECK = "HealthCheckResponse";

// errors
const ERROR_VALUE_OUT_OF_RANGE = "ValueOutOfRangeError";
const ERROR_TARGET_OFFLINE = "TargetOfflineError";
const ERROR_NO_SUCH_TARGET = "NoSuchTargetError";
const ERROR_BRIDGE_OFFLINE = "BridgeOfflineError";

const ERROR_DRIVER_INTERNAL = "DriverInternalError";
const ERROR_DEPENDENT_SERVICE_UNAVAILABLE = "DependentServiceUnavailableError";
const ERROR_NOT_SUPPORTED_IN_CURRENT_MODE = "NotSupportedInCurrentModeError";
const ERROR_RATE_LIMIT_EXCEEDED = "RateLimitExceededError";
const ERROR_TARGET_CONNECTIVITY_UNSTABLE = "TargetConnectivityUnstableError";
const ERROR_TARGET_BRIDGE_CONNECTIVITY_UNSTABLE = "TargetBridgeConnectivityUnstableError";
const ERROR_TARGET_FIRMWARE_OUTDATED = "TargetFirmwareOutdatedError";
const ERROR_TARGET_BRIDGE_FIRMWARE_OUTDATED = "TargetBridgeFirmwareOutdatedError";
const ERROR_TARGET_HARDWARE_MALFUNCTION = "TargetHardwareMalfunctionError";
const ERROR_TARGET_BRIDGE_HARDWARE_MALFUNCTION = "TargetBridgetHardwareMalfunctionError";
const ERROR_UNABLE_TO_GET_VALUE = "UnableToGetValueError";
const ERROR_UNABLE_TO_SET_VALUE = "UnableToSetValueError";
const ERROR_UNWILLING_TO_SET_VALUE = "UnwillingToSetValueError";

const ERROR_EXPIRED_ACCESS_TOKEN = "ExpiredAccessTokenError";
const ERROR_INVALID_ACCESS_TOKEN = "InvalidAccessTokenError";
const ERROR_UNSUPPORTED_TARGET = "UnsupportedTargetError";
const ERROR_UNSUPPORTED_OPERATION = "UnsupportedOperationError";
const ERROR_UNSUPPORTED_TARGET_SETTING = "UnsupportedTargetSettingError";
const ERROR_UNEXPECTED_INFO = "UnexpectedInformationReceivedError";

// namespace dispatcher
exports.handler = function(event, context, callback) {
    log("Received Directive", event);
    var requestedNamespace = event.header.namespace;
    var response = null;
    switch (requestedNamespace) {
        case NAMESPACE_DISCOVERY:
            handleDiscovery(event, callback);
            break;
        case NAMESPACE_CONTROL:
            handleControl(event, callback);
            break;
        case NAMESPACE_QUERY:
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
        case REQUEST_DISCOVER:
            response = HoCo(event, RESPONSE_DISCOVER, callback);
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
        case REQUEST_TURN_ON:
            response = HoCo(event, RESPONSE_TURN_ON, callback);
            break;
        case REQUEST_TURN_OFF:
            response = HoCo(event, RESPONSE_TURN_OFF, callback);
            break;
        case REQUEST_SET_PERCENTAGE:
            response = HoCo(event, RESPONSE_SET_PERCENTAGE, callback);
            break;
        case REQUEST_DEC_PERCENTAGE:
            response = HoCo(event, RESPONSE_DEC_PERCENTAGE, callback);
            break;
        case REQUEST_INC_PERCENTAGE:
            response = HoCo(event, RESPONSE_INC_PERCENTAGE, callback);
            break;
        case REQUEST_SET_TARGET_TEMP:
            response = HoCo(event, RESPONSE_SET_TARGET_TEMP, callback);
            break;
        case REQUEST_INC_TARGET_TEMP:
            response = HoCo(event, RESPONSE_INC_TARGET_TEMP, callback);
            break;
        case REQUEST_SET_LOCK_STATE:
            response = HoCo(event, RESPONSE_SET_LOCK_STATE, callback);
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
        case REQUEST_GET_TEMP:
            response = HoCo(event, RESPONSE_GET_TEMP, callback);
            break;
        case REQUEST_GET_TARGET_TEMP:
            response = HoCo(event, RESPONSE_GET_TARGET_TEMP, callback);
            break;
        case REQUEST_GET_LOCK_STATE:
            response = HoCo(event, RESPONSE_GET_LOCK_STATE, callback);
            break;
        default:
            log("Error", "Unsupported operation" + requestedName);
            handleUnsupportedOperation(callback);
            break;
    }
};

/*
// discovery message handler
var handleDiscoveryDiscover = function(event, callback) {
    callHoCo('devices', null, event.payload.accessToken, function(err, res) {
        if (err)
            callback("Error in handleDiscoveryDiscover: " + err, null);
        else {
            var header = createHeader(NAMESPACE_DISCOVERY, RESPONSE_DISCOVER);
            var payload = {
                "discoveredAppliances": res
            };
            callback(null, createDirective(header, payload));
        }
    });
};

// control message handler
var handleControlTurnOn = function(event, callback) {
    callHoCo(event.payload.appliance.applianceId, 'on', event.payload.accessToken, function(err, res) {
        if (err)
            callback("Error in handleControlTurnOn: " + err, null);
        else {
            var header = createHeader(NAMESPACE_CONTROL, RESPONSE_TURN_ON);
            var payload = {};
            callback(null, createDirective(header, payload));
        }
    });
};

var handleControlTurnOff = function(event, callback) {
    callHoCo(event.payload.appliance.applianceId, 'off', event.payload.accessToken, function(err, res) {
        if (err)
            callback("Error in handleControlTurnOff: " + err, null);
        else {
            var header = createHeader(NAMESPACE_CONTROL, RESPONSE_TURN_OFF);
            var payload = {};
            callback(null, createDirective(header, payload));
        }
    });
};

// query message handler
var handleQueryGetTemp = function(event, callback) {
    callHoCo(event.payload.appliance.applianceId, 'temp', event.payload.accessToken, function(err, res) {
        if (err)
            callback("Error in handleQueryGetTemp: " + err, null);
        else {
            var header = createHeader(NAMESPACE_CONTROL, RESPONSE_GET_TEMP);
            var payload = {};
            callback(null, createDirective(header, payload));
        }
    });
};
*/

// error handler
var handleUnsupportedOperation = function(callback) {
    var header = createHeader(NAMESPACE_CONTROL, ERROR_UNSUPPORTED_OPERATION);
    var payload = {};
    callback(null, createDirective(header, payload));
};

var handleUnexpectedInfo = function(fault, callback) {
    var header = createHeader(NAMESPACE_CONTROL, ERROR_UNEXPECTED_INFO);
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

/*
var createDirective = function(namespace, name, payload) {
    return {
        "header": createHeader(namespace, name),
        "payload": payload
    };
};
*/

// logging
var log = function(title, msg) {
    console.log('**** ' + title + ': ' + JSON.stringify(msg));
};

// HoCo communication
/*
var callHoCo = function(applianceId, cmd, token, callback) {
    var url = baseurl;
    if (applianceId)
        url = url + '/' + applianceId;
    url = url + '?token=' + token;
    if (cmd)
        url = url + '&cmd=' + cmd;
    request(url, function(error, response, body) {
        if (error) {
            callback(error, null);
            return;
        }
        if (response.statusCode == 200) {
            callback(null, JSON.parse(body));
        } else {
            callback("Bad Response StatusCode " + response.statusCode, null);
        }
    });
};

var callHoCoCmd = function(event, resmsg, callback) {
    callHoCo(event.payload.appliance.applianceId, event.header.name, event.payload.accessToken, function(err, res) {
        if (err)
            callback("Error in " + event.header.name + ": " + err, null);
        else {
            var header = createHeader(event.header.namespace, resmsg);
            var payload = res;
            callback(null, createDirective(header, payload));
        }
    });
};
*/

var HoCo = function(event, resmsg, callback) {
    var url = baseurl;
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
            callback(null, createDirective(header, payload));
        }
    });
};