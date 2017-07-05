export class MergeWith {

  constructor(private _base: any) {
  }

  public with(obj: object, keys?: any): any {
    obj = keys ? ObjectUtils.pick(obj, keys) : obj;
    return ObjectUtils.extend(this._base, obj);
  }
}

export class ObjectUtils {

  public static pick(object: object, keys: string[]) {
    return keys.reduce((prev, key) => {
      if (object[key]) {
        prev[key] = object[key];
      }
      return prev;
    }, {});
  }

  public static objectValues(obj: object): any[] {
    let values: any[] = [];
    for (let key in obj) {
      values.push(obj[key]);
    }
    return values;
  }

  public static extend(...args: any[]): object {
    let params = ObjectUtils.objectValues(args);
    params.unshift({});
    return Object.assign.apply(undefined, params);
  }

  public static merge(obj: object, keys?: string[]): MergeWith {
    return new MergeWith(keys ? ObjectUtils.pick(obj, keys) : obj);
  }
}

