export function App(appType:any): ClassDecorator {
    return (target: Function) => {
        (target.prototype as any).ApplicationName = appType;
       /*  if (objectName == null) {
            exportToGlobal(moduleName, target.prototype.constructor.name, target);
        } else {
            exportToGlobal(moduleName, objectName, target);
        } */
    };
}