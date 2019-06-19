import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsKebabCase(validationOptions?: ValidationOptions) {
    // tslint:disable-next-line:ban-types
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'IsKebabCase',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const regex = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/;
                    return regex.test(value);
                },
            },
        });
    };
}
