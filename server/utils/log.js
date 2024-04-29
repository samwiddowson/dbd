const config = useRuntimeConfig()
//const outputFile = "node-complete.log"

//useful to configure for file outputs instead (can trace be co-opted for this somehow?)
const { log } = console

const write = (loggingMethod, messageLevel, message) => {
    if (loggingLevel >= loggingLevels[messageLevel]) {
        // try {
        loggingMethod(
            new Date().toISOString(),
            " :: ",
            messageLevel,
            " :: ",
            ...message
        )
        // } catch (err)
        // {
        //     loggingMethod(new Date().toISOString(), messageLevel);
        //     loggingMethod(message);
        // }
    }
}

const messageLevels = {
    FATAL: "FATAL",
    ERROR: "ERROR",
    WARN: "WARN",
    INFO: "INFO",
    DEBUG: "DEBUG",
    TRACE: "TRACE",
}

const loggingLevels = {
    FATAL: 1,
    ERROR: 2,
    WARN: 3,
    INFO: 4,
    DEBUG: 5,
    TRACE: 6,
}

const loggingLevel = loggingLevels[config.loggingLevel || messageLevels.DEBUG]

function info(...msg) {
    write(log, messageLevels.INFO, msg)
}

function debug(...msg) {
    write(log, messageLevels.DEBUG, msg)
}

function warn(...msg) {
    write(log, messageLevels.WARN, msg)
}

function error(...msg) {
    write(log, messageLevels.ERROR, msg)
}

function fatal(...msg) {
    write(log, messageLevels.FATAL, msg)
}

function trace(...msg) {
    write(log, messageLevels.TRACE, msg)
}

export default { info, debug, warn, error, fatal, trace }
