"use strict";
function uniqueID() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    const identifier = `${timestamp}-${randomPart}`;
    return identifier;
}
module.exports = { uniqueID }; //has to be destructured when imported
