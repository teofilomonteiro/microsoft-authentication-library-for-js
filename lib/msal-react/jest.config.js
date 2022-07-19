/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    globals: {
        crypto: require("crypto")
    },
    coverageReporters: [["lcov", {"projectRoot": "../../"}]]
};
