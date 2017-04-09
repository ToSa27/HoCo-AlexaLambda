function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

// namespaces
define("NAMESPACE_DISCOVERY", "Alexa.ConnectedHome.Discovery");
define("NAMESPACE_CONTROL", "Alexa.ConnectedHome.Control");
define("NAMESPACE_QUERY", "Alexa.ConnectedHome.Query");

// discovery messages
define("REQUEST_DISCOVER", "DiscoverAppliancesRequest");
define("RESPONSE_DISCOVER", "DiscoverAppliancesResponse");

// control messages - on/off
define("REQUEST_TURN_ON", "TurnOnRequest");
define("RESPONSE_TURN_ON", "TurnOnConfirmation");
define("REQUEST_TURN_OFF", "TurnOffRequest");
define("RESPONSE_TURN_OFF", "TurnOffConfirmation");

// control messages - dimming
define("REQUEST_SET_PERCENTAGE", "SetPercentageRequest");
define("RESPONSE_SET_PERCENTAGE", "SetPercentageConfirmation");
define("REQUEST_DEC_PERCENTAGE", "DecrementPercentageRequest");
define("RESPONSE_DEC_PERCENTAGE", "DecrementPercentageConfirmation");
define("REQUEST_INC_PERCENTAGE", "IncrementPercentageRequest");
define("RESPONSE_INC_PERCENTAGE", "IncrementPercentageConfirmation");

// control messages - temperature
define("REQUEST_SET_TARGET_TEMP", "SetTargetTemperatureRequest");
define("RESPONSE_SET_TARGET_TEMP", "SetTargetTemperatureConfirmation");
define("REQUEST_INC_TARGET_TEMP", "IncrementTargetTemperatureRequest");
define("RESPONSE_INC_TARGET_TEMP", "IncrementTargetTemperatureConfirmation");

// control messages - lock
define("REQUEST_SET_LOCK_STATE", "SetLockStateRequest");
define("RESPONSE_SET_LOCK_STATE", "SetLockStateConfirmation");

// query messages - temperature
define("REQUEST_GET_TEMP", "GetTemperatureReadingRequest");
define("RESPONSE_GET_TEMP", "GetTemperatureReadingResponse");
define("REQUEST_GET_TARGET_TEMP", "GetTargetTemperatureRequest");
define("RESPONSE_GET_TARGET_TEMP", "GetTargetTemperatureResponse");

// query messages - lock
define("REQUEST_GET_LOCK_STATE", "GetLockStateRequest");
define("RESPONSE_GET_LOCK_STATE", "GetLockStateResponse");

// health check messages
define("REQUEST_HEALTH_CHECK", "HealthCheckRequest");
define("RESPONSE_HEALTH_CHECK", "HealthCheckResponse");

// errors
define("ERROR_VALUE_OUT_OF_RANGE", "ValueOutOfRangeError");
define("ERROR_TARGET_OFFLINE", "TargetOfflineError");
define("ERROR_NO_SUCH_TARGET", "NoSuchTargetError");
define("ERROR_BRIDGE_OFFLINE", "BridgeOfflineError");

define("ERROR_DRIVER_INTERNAL", "DriverInternalError");
define("ERROR_DEPENDENT_SERVICE_UNAVAILABLE", "DependentServiceUnavailableError");
define("ERROR_NOT_SUPPORTED_IN_CURRENT_MODE", "NotSupportedInCurrentModeError");
define("ERROR_RATE_LIMIT_EXCEEDED", "RateLimitExceededError");
define("ERROR_TARGET_CONNECTIVITY_UNSTABLE", "TargetConnectivityUnstableError");
define("ERROR_TARGET_BRIDGE_CONNECTIVITY_UNSTABLE", "TargetBridgeConnectivityUnstableError");
define("ERROR_TARGET_FIRMWARE_OUTDATED", "TargetFirmwareOutdatedError");
define("ERROR_TARGET_BRIDGE_FIRMWARE_OUTDATED", "TargetBridgeFirmwareOutdatedError");
define("ERROR_TARGET_HARDWARE_MALFUNCTION", "TargetHardwareMalfunctionError");
define("ERROR_TARGET_BRIDGE_HARDWARE_MALFUNCTION", "TargetBridgetHardwareMalfunctionError");
define("ERROR_UNABLE_TO_GET_VALUE", "UnableToGetValueError");
define("ERROR_UNABLE_TO_SET_VALUE", "UnableToSetValueError");
define("ERROR_UNWILLING_TO_SET_VALUE", "UnwillingToSetValueError");

define("ERROR_EXPIRED_ACCESS_TOKEN", "ExpiredAccessTokenError");
define("ERROR_INVALID_ACCESS_TOKEN", "InvalidAccessTokenError");
define("ERROR_UNSUPPORTED_TARGET", "UnsupportedTargetError");
define("ERROR_UNSUPPORTED_OPERATION", "UnsupportedOperationError");
define("ERROR_UNSUPPORTED_TARGET_SETTING", "UnsupportedTargetSettingError");
define("ERROR_UNEXPECTED_INFO", "UnexpectedInformationReceivedError");