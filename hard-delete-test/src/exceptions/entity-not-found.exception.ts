

export class EntityNotFoundException extends Error {
    constructor(entityName: string) {
        super(`${entityName} Not Found!`);
    }
}