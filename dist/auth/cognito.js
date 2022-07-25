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
import { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthContext } from './auth';
export var CognitoAuth = Auth;
var useProvideAuth = function () {
    var _a = useState(null), user = _a[0], setUser = _a[1];
    var _b = useState(true), isLoading = _b[0], setLoading = _b[1];
    useEffect(function () {
        Hub.listen('auth', function () { return checkUser(); });
        checkUser().then();
        return function () {
            Hub.remove('auth', function () { return checkUser(); });
        };
    }, []);
    var checkUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var cognitoUser, authUser, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, Auth.currentAuthenticatedUser()];
                case 1:
                    cognitoUser = _a.sent();
                    if (cognitoUser) {
                        authUser = {
                            username: cognitoUser.getUsername(),
                            email: cognitoUser.getUsername()
                        };
                        setUser(authUser);
                    }
                    else {
                        setUser(null);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    setUser(null);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var signIn = function (_a) {
        var username = _a.username, password = _a.password;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, CognitoAuth.signIn({ username: username, password: password })];
            });
        });
    };
    var signOut = function () { return CognitoAuth.signOut(); };
    return {
        user: user,
        isLoading: isLoading,
        signIn: signIn,
        signOut: signOut,
    };
};
export var checkSession = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                return [4 /*yield*/, CognitoAuth.currentAuthenticatedUser()];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, CognitoAuth.federatedSignIn()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 6];
            case 4:
                e_2 = _a.sent();
                return [4 /*yield*/, CognitoAuth.federatedSignIn()];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
export var CognitoAuthProvider = function (_a) {
    var children = _a.children;
    var auth = useProvideAuth();
    return _jsx(AuthContext.Provider, __assign({ value: auth }, { children: children }));
};
var CognitoAuthService = /** @class */ (function () {
    function CognitoAuthService() {
    }
    CognitoAuthService.prototype.signIn = function () {
        return Promise.resolve();
    };
    CognitoAuthService.prototype.signOut = function () {
        return Promise.resolve();
    };
    CognitoAuthService.prototype.checkSession = function () {
        return CognitoAuth.currentAuthenticatedUser().then(function (user) { return ({
            username: user.getUsername(),
            email: user.getUsername()
        }); });
    };
    return CognitoAuthService;
}());
export { CognitoAuthService };
