

export class EntityExistsException extends Error {
    constructor(entityName: string, fieldName: string, fieldValue: string) {
        super(`${entityName} with ${fieldName}:${fieldValue} already exists!`);
    }
}