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
import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from "../auth";
export var withAuth = function (WrappedComponent) {
    var displayName = WrappedComponent.displayName || "Component";
    var ComponentWithAuth = function (props) {
        var authProps = useAuth();
        return _jsx(WrappedComponent, __assign({}, authProps, props));
    };
    ComponentWithAuth.displayName = "withAuth(".concat(displayName, ")");
    return ComponentWithAuth;
};
