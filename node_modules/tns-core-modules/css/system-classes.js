Object.defineProperty(exports, "__esModule", { value: true });
var MODAL = "modal";
var ROOT = "root";
exports.CLASS_PREFIX = "ns-";
var modalRootViewCssClass = "" + exports.CLASS_PREFIX + MODAL;
var rootViewCssClasses = ["" + exports.CLASS_PREFIX + ROOT];
function getModalRootViewCssClass() {
    return modalRootViewCssClass;
}
exports.getModalRootViewCssClass = getModalRootViewCssClass;
function getRootViewCssClasses() {
    return rootViewCssClasses;
}
exports.getRootViewCssClasses = getRootViewCssClasses;
function pushToRootViewCssClasses(value) {
    rootViewCssClasses.push(value);
    return rootViewCssClasses.length;
}
exports.pushToRootViewCssClasses = pushToRootViewCssClasses;
function removeFromRootViewCssClasses(value) {
    var index = rootViewCssClasses.indexOf(value);
    var removedElement;
    if (index > -1) {
        removedElement = rootViewCssClasses.splice(index, 1);
    }
    return removedElement;
}
exports.removeFromRootViewCssClasses = removeFromRootViewCssClasses;
//# sourceMappingURL=system-classes.js.map