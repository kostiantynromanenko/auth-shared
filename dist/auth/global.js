var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./auth";
import { createAuthService } from "./create-auth-service";
import { useNavigate } from "react-router-dom";
export var LoginCallback = function (_a) {
    var _b = _a.redirectUrl, redirectUrl = _b === void 0 ? '/' : _b;
    var handleAuthRedirect = useAuth().handleAuthRedirect;
    var navigate = useNavigate();
    useEffect(function () {
        handleAuthRedirect().then(function () { return navigate(redirectUrl); }).catch();
    }, []);
    return _jsx("div", { children: "Loading..." });
};
var useProvideAuth = function (providerType, config) {
    var authService = useState(function () { return createAuthService(providerType, config); })[0];
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var _b = useState(true), isLoading = _b[0], setLoading = _b[1];
    var _c = useState(''), error = _c[0], setError = _c[1];
    useEffect(function () {
        checkSession().then();
    }, []);
    var signIn = function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.signIn(credentials)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    setError('Sign in error: ' + e_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var signInWithRedirect = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.signInWithRedirect()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    setError('Sign in error: ' + e_2.message);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var signOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.signOut()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    setError('Sign out error: ' + e_3.message);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleAuthRedirect = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user_1, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.handleAuthRedirect()];
                case 2:
                    user_1 = _a.sent();
                    setUser(user_1);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    setError('Auth redirect error: ' + e_4.message);
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var checkSession = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isAuthenticated, authUser, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, authService.isAuthenticated()];
                case 2:
                    isAuthenticated = _a.sent();
                    if (!isAuthenticated) return [3 /*break*/, 4];
                    return [4 /*yield*/, authService.getUser()];
                case 3:
                    authUser = _a.sent();
                    setUser(authUser);
                    return [3 /*break*/, 5];
                case 4:
                    setUser(null);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_5 = _a.sent();
                    setUser(null);
                    return [3 /*break*/, 7];
                case 7:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        user: user,
        error: error,
        isLoading: isLoading,
        handleAuthRedirect: handleAuthRedirect,
        checkSession: checkSession,
        signIn: signIn,
        signInWithRedirect: signInWithRedirect,
        signOut: signOut,
    };
};
export var OktaAuthContextProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var auth = useProvideAuth('okta', config);
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
export var CognitoAuthContextProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth('cognito');
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
