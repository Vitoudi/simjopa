export class GenericEntity {
    protected constructor() {}

    public toObjectWithoutUndefinedValues() {
        const newObj: {[key: string]: string} = {};

        Object.entries(this).forEach(([key, value]) => {
            if (value === undefined) return;
            newObj[key] = value;
        })

        return newObj;
    }
}
