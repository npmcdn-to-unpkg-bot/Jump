'use strict';var route_config_decorator_1 = require('./route_config_decorator');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
/**
 * Given a JS Object that represents a route config, returns a corresponding Route, AsyncRoute,
 * AuxRoute or Redirect object.
 *
 * Also wraps an AsyncRoute's loader function to add the loaded component's route config to the
 * `RouteRegistry`.
 */
function normalizeRouteConfig(config, registry) {
    if (config instanceof route_config_decorator_1.AsyncRoute) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new route_config_decorator_1.AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AuxRoute) {
        return config;
    }
    if ((+!!config.component) + (+!!config.redirectTo) + (+!!config.loader) != 1) {
        throw new exceptions_1.BaseException("Route config should contain exactly one \"component\", \"loader\", or \"redirectTo\" property.");
    }
    if (config.as && config.name) {
        throw new exceptions_1.BaseException("Route config should contain exactly one \"as\" or \"name\" property.");
    }
    if (config.as) {
        config.name = config.as;
    }
    if (config.loader) {
        var wrappedLoader = wrapLoaderToReconfigureRegistry(config.loader, registry);
        return new route_config_decorator_1.AsyncRoute({
            path: config.path,
            loader: wrappedLoader,
            name: config.name,
            data: config.data,
            useAsDefault: config.useAsDefault
        });
    }
    if (config.aux) {
        return new route_config_decorator_1.AuxRoute({ path: config.aux, component: config.component, name: config.name });
    }
    if (config.component) {
        if (typeof config.component == 'object') {
            var componentDefinitionObject = config.component;
            if (componentDefinitionObject.type == 'constructor') {
                return new route_config_decorator_1.Route({
                    path: config.path,
                    component: componentDefinitionObject.constructor,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else if (componentDefinitionObject.type == 'loader') {
                return new route_config_decorator_1.AsyncRoute({
                    path: config.path,
                    loader: componentDefinitionObject.loader,
                    name: config.name,
                    data: config.data,
                    useAsDefault: config.useAsDefault
                });
            }
            else {
                throw new exceptions_1.BaseException("Invalid component type \"" + componentDefinitionObject.type + "\". Valid types are \"constructor\" and \"loader\".");
            }
        }
        return new route_config_decorator_1.Route(config);
    }
    if (config.redirectTo) {
        return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
    }
    return config;
}
exports.normalizeRouteConfig = normalizeRouteConfig;
function wrapLoaderToReconfigureRegistry(loader, registry) {
    return function () {
        return loader().then(function (componentType) {
            registry.configFromComponent(componentType);
            return componentType;
        });
    };
}
function assertComponentExists(component, path) {
    if (!lang_1.isType(component)) {
        throw new exceptions_1.BaseException("Component for route \"" + path + "\" is not defined, or is not a class.");
    }
}
exports.assertComponentExists = assertComponentExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfY29uZmlnX25vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfbm9ybWFsaXplci50cyJdLCJuYW1lcyI6WyJub3JtYWxpemVSb3V0ZUNvbmZpZyIsIndyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkiLCJhc3NlcnRDb21wb25lbnRFeGlzdHMiXSwibWFwcGluZ3MiOiJBQUFBLHVDQUFxRSwwQkFBMEIsQ0FBQyxDQUFBO0FBRWhHLHFCQUEyQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3RELDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBSS9FOzs7Ozs7R0FNRztBQUNILDhCQUFxQyxNQUF1QixFQUN2QixRQUF1QjtJQUMxREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsWUFBWUEsbUNBQVVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2pDQSxJQUFJQSxhQUFhQSxHQUFHQSwrQkFBK0JBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1FBQzdFQSxNQUFNQSxDQUFDQSxJQUFJQSxtQ0FBVUEsQ0FBQ0E7WUFDcEJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO1lBQ2pCQSxNQUFNQSxFQUFFQSxhQUFhQTtZQUNyQkEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUE7WUFDakJBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBO1lBQ2pCQSxZQUFZQSxFQUFFQSxNQUFNQSxDQUFDQSxZQUFZQTtTQUNsQ0EsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0E7SUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsWUFBWUEsOEJBQUtBLElBQUlBLE1BQU1BLFlBQVlBLGlDQUFRQSxJQUFJQSxNQUFNQSxZQUFZQSxpQ0FBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeEZBLE1BQU1BLENBQWtCQSxNQUFNQSxDQUFDQTtJQUNqQ0EsQ0FBQ0E7SUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0VBLE1BQU1BLElBQUlBLDBCQUFhQSxDQUNuQkEsZ0dBQTBGQSxDQUFDQSxDQUFDQTtJQUNsR0EsQ0FBQ0E7SUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsSUFBSUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLE1BQU1BLElBQUlBLDBCQUFhQSxDQUFDQSxzRUFBa0VBLENBQUNBLENBQUNBO0lBQzlGQSxDQUFDQTtJQUNEQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNkQSxNQUFNQSxDQUFDQSxJQUFJQSxHQUFHQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQTtJQUMxQkEsQ0FBQ0E7SUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDbEJBLElBQUlBLGFBQWFBLEdBQUdBLCtCQUErQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDN0VBLE1BQU1BLENBQUNBLElBQUlBLG1DQUFVQSxDQUFDQTtZQUNwQkEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUE7WUFDakJBLE1BQU1BLEVBQUVBLGFBQWFBO1lBQ3JCQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQTtZQUNqQkEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsSUFBSUE7WUFDakJBLFlBQVlBLEVB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QUFNQSxDQUFDQSxhQUFhQSxDQUFDQTtRQUN2QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDTEEsQ0FBQ0EsQ0FBQ0E7QUFDSkEsQ0FBQ0E7QUFFRCwrQkFBc0MsU0FBZSxFQUFFLElBQVk7SUFDakVDLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLGFBQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQ3ZCQSxNQUFNQSxJQUFJQSwwQkFBYUEsQ0FBQ0EsMkJBQXdCQSxJQUFJQSwwQ0FBc0NBLENBQUNBLENBQUNBO0lBQzlGQSxDQUFDQTtBQUNIQSxDQUFDQTtBQUplLDZCQUFxQix3QkFJcEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXN5bmNSb3V0ZSwgQXV4Um91dGUsIFJvdXRlLCBSZWRpcmVjdCwgUm91dGVEZWZpbml0aW9ufSBmcm9tICcuL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3InO1xuaW1wb3J0IHtDb21wb25lbnREZWZpbml0aW9ufSBmcm9tICcuLi9yb3V0ZV9kZWZpbml0aW9uJztcbmltcG9ydCB7aXNUeXBlLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtSb3V0ZVJlZ2lzdHJ5fSBmcm9tICcuLi9yb3V0ZV9yZWdpc3RyeSc7XG5cblxuLyoqXG4gKiBHaXZlbiBhIEpTIE9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSByb3V0ZSBjb25maWcsIHJldHVybnMgYSBjb3JyZXNwb25kaW5nIFJvdXRlLCBBc3luY1JvdXRlLFxuICogQXV4Um91dGUgb3IgUmVkaXJlY3Qgb2JqZWN0LlxuICpcbiAqIEFsc28gd3JhcHMgYW4gQXN5bmNSb3V0ZSdzIGxvYWRlciBmdW5jdGlvbiB0byBhZGQgdGhlIGxvYWRlZCBjb21wb25lbnQncyByb3V0ZSBjb25maWcgdG8gdGhlXG4gKiBgUm91dGVSZWdpc3RyeWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVSb3V0ZUNvbmZpZyhjb25maWc6IFJvdXRlRGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RyeTogUm91dGVSZWdpc3RyeSk6IFJvdXRlRGVmaW5pdGlvbiB7XG4gIGlmIChjb25maWcgaW5zdGFuY2VvZiBBc3luY1JvdXRlKSB7XG4gICAgdmFyIHdyYXBwZWRMb2FkZXIgPSB3cmFwTG9hZGVyVG9SZWNvbmZpZ3VyZVJlZ2lzdHJ5KGNvbmZpZy5sb2FkZXIsIHJlZ2lzdHJ5KTtcbiAgICByZXR1cm4gbmV3IEFzeW5jUm91dGUoe1xuICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICBsb2FkZXI6IHdyYXBwZWRMb2FkZXIsXG4gICAgICBuYW1lOiBjb25maWcubmFtZSxcbiAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgdXNlQXNEZWZhdWx0OiBjb25maWcudXNlQXNEZWZhdWx0XG4gICAgfSk7XG4gIH1cbiAgaWYgKGNvbmZpZyBpbnN0YW5jZW9mIFJvdXRlIHx8IGNvbmZpZyBpbnN0YW5jZW9mIFJlZGlyZWN0IHx8IGNvbmZpZyBpbnN0YW5jZW9mIEF1eFJvdXRlKSB7XG4gICAgcmV0dXJuIDxSb3V0ZURlZmluaXRpb24+Y29uZmlnO1xuICB9XG5cbiAgaWYgKCgrISFjb25maWcuY29tcG9uZW50KSArICgrISFjb25maWcucmVkaXJlY3RUbykgKyAoKyEhY29uZmlnLmxvYWRlcikgIT0gMSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBgUm91dGUgY29uZmlnIHNob3VsZCBjb250YWluIGV4YWN0bHkgb25lIFwiY29tcG9uZW50XCIsIFwibG9hZGVyXCIsIG9yIFwicmVkaXJlY3RUb1wiIHByb3BlcnR5LmApO1xuICB9XG4gIGlmIChjb25maWcuYXMgJiYgY29uZmlnLm5hbWUpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgUm91dGUgY29uZmlnIHNob3VsZCBjb250YWluIGV4YWN0bHkgb25lIFwiYXNcIiBvciBcIm5hbWVcIiBwcm9wZXJ0eS5gKTtcbiAgfVxuICBpZiAoY29uZmlnLmFzKSB7XG4gICAgY29uZmlnLm5hbWUgPSBjb25maWcuYXM7XG4gIH1cbiAgaWYgKGNvbmZpZy5sb2FkZXIpIHtcbiAgICB2YXIgd3JhcHBlZExvYWRlciA9IHdyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkoY29uZmlnLmxvYWRlciwgcmVnaXN0cnkpO1xuICAgIHJldHVybiBuZXcgQXN5bmNSb3V0ZSh7XG4gICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgIGxvYWRlcjogd3JhcHBlZExvYWRlcixcbiAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgZGF0YTogY29uZmlnLmRhdGEsXG4gICAgICB1c2VBc0RlZmF1bHQ6IGNvbmZpZy51c2VBc0RlZmF1bHRcbiAgICB9KTtcbiAgfVxuICBpZiAoY29uZmlnLmF1eCkge1xuICAgIHJldHVybiBuZXcgQXV4Um91dGUoe3BhdGg6IGNvbmZpZy5hdXgsIGNvbXBvbmVudDo8VHlwZT5jb25maWcuY29tcG9uZW50LCBuYW1lOiBjb25maWcubmFtZX0pO1xuICB9XG4gIGlmIChjb25maWcuY29tcG9uZW50KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29tcG9uZW50ID09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdCA9IDxDb21wb25lbnREZWZpbml0aW9uPmNvbmZpZy5jb21wb25lbnQ7XG4gICAgICBpZiAoY29tcG9uZW50RGVmaW5pdGlvbk9iamVjdC50eXBlID09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZSh7XG4gICAgICAgICAgcGF0aDogY29uZmlnLnBhdGgsXG4gICAgICAgICAgY29tcG9uZW50OjxUeXBlPmNvbXBvbmVudERlZmluaXRpb25PYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgICAgbmFtZTogY29uZmlnLm5hbWUsXG4gICAgICAgICAgZGF0YTogY29uZmlnLmRhdGEsXG4gICAgICAgICAgdXNlQXNEZWZhdWx0OiBjb25maWcudXNlQXNEZWZhdWx0XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChjb21wb25lbnREZWZpbml0aW9uT2JqZWN0LnR5cGUgPT0gJ2xvYWRlcicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY1JvdXRlKHtcbiAgICAgICAgICBwYXRoOiBjb25maWcucGF0aCxcbiAgICAgICAgICBsb2FkZXI6IGNvbXBvbmVudERlZmluaXRpb25PYmplY3QubG9hZGVyLFxuICAgICAgICAgIG5hbWU6IGNvbmZpZy5uYW1lLFxuICAgICAgICAgIGRhdGE6IGNvbmZpZy5kYXRhLFxuICAgICAgICAgIHVzZUFzRGVmYXVsdDogY29uZmlnLnVzZUFzRGVmYXVsdFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYEludmFsaWQgY29tcG9uZW50IHR5cGUgXCIke2NvbXBvbmVudERlZmluaXRpb25PYmplY3QudHlwZX1cIi4gVmFsaWQgdHlwZXMgYXJlIFwiY29uc3RydWN0b3JcIiBhbmQgXCJsb2FkZXJcIi5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSb3V0ZSg8e1xuICAgICAgcGF0aDogc3RyaW5nO1xuICAgICAgY29tcG9uZW50OiBUeXBlO1xuICAgICAgbmFtZT86IHN0cmluZztcbiAgICAgIGRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICAgIHVzZUFzRGVmYXVsdD86IGJvb2xlYW47XG4gICAgfT5jb25maWcpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5yZWRpcmVjdFRvKSB7XG4gICAgcmV0dXJuIG5ldyBSZWRpcmVjdCh7cGF0aDogY29uZmlnLnBhdGgsIHJlZGlyZWN0VG86IGNvbmZpZy5yZWRpcmVjdFRvfSk7XG4gIH1cblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5cbmZ1bmN0aW9uIHdyYXBMb2FkZXJUb1JlY29uZmlndXJlUmVnaXN0cnkobG9hZGVyOiBGdW5jdGlvbiwgcmVnaXN0cnk6IFJvdXRlUmVnaXN0cnkpOiAoKSA9PlxuICAgIFByb21pc2U8VHlwZT4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJldHVybiBsb2FkZXIoKS50aGVuKChjb21wb25lbnRUeXBlKSA9PiB7XG4gICAgICByZWdpc3RyeS5jb25maWdGcm9tQ29tcG9uZW50KGNvbXBvbmVudFR5cGUpO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudFR5cGU7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRDb21wb25lbnRFeGlzdHMoY29tcG9uZW50OiBUeXBlLCBwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKCFpc1R5cGUoY29tcG9uZW50KSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDb21wb25lbnQgZm9yIHJvdXRlIFwiJHtwYXRofVwiIGlzIG5vdCBkZWZpbmVkLCBvciBpcyBub3QgYSBjbGFzcy5gKTtcbiAgfVxufVxuIl19