export class Storage {

  static getItemByKey(key: string) {
    const item = localStorage.getItem(key);

    return item && JSON.parse(item);
  }

  static deleteItem(key: string, id?: number) {
    if (id) {
      const item = Storage.getItemByKey(key);

      if (item.constructor === Array) {
        const idx = item.findIndex(ele => ele.id === id);

        item.splice(idx, 1);
        Storage.setItem(key, item);
      }
    } else {
      localStorage.removeItem(key);
    }
  }

  static insertItemToArray(key: string, value: any) {
    const oldArr = localStorage.getItem(key);
    let newArr: Array<any>;

    if (oldArr) {
      newArr = JSON.parse(oldArr);

      if (typeof(newArr) === 'string') {
        newArr = JSON.parse(newArr);
      }
      newArr.push(value);

    } else {
      newArr = [value];
    }

    Storage.setItem(key, newArr);
  }

  static editItemOnArray(key: string, value: any) {
    const arr = Storage.getItemByKey(key);
    const idx = arr.findIndex(ele => ele.id === value.id);

    arr[idx] = value;
    Storage.setItem(key, arr);
  }

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
