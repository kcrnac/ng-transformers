export class EnumHelper {

    static enumToStringArray(e: any): string[]{
        return Object.keys(e).map(key => e[key])
            .filter(value => typeof value === 'string') as string[];
    }
}