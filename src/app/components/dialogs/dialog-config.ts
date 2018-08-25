import {CONSTANTS} from '../../commons/constants';

export class DialogConfig {
  static readonly profile = (dataOption?: Object) => {
    const obj = {
      width: '575px',
      height: '405px',
      data: {
        title: CONSTANTS.DIALOGS.PROFILE.TITLE,
        buttons: {
          positive: CONSTANTS.DIALOGS.BTN.POSITIVE.SAVE,
          negative: CONSTANTS.DIALOGS.BTN.NEGATIVE.DEFAULT
        }
      }
    };

    DialogConfig.overrideOption(dataOption, obj);
    return obj;
  }

  static readonly deleteDialog = (id: number, dataOption?: Object) => {
    const obj = {
      width: '560px',
      height: '215px',
      data: {
        id,
        title: CONSTANTS.DIALOGS.DELETE.TITLE,
        msg: CONSTANTS.DIALOGS.DELETE.MSG,
        buttons: {
          positive: CONSTANTS.DIALOGS.BTN.POSITIVE.DELETE,
          negative: CONSTANTS.DIALOGS.BTN.NEGATIVE.DEFAULT
        }
      }
    };

    DialogConfig.overrideOption(dataOption, obj);
    return obj;
  }

  static readonly task = (dataOption?: Object) => {
    const obj = {
      width: '560px',
      height: '470px',
      data: {
        title: CONSTANTS.DIALOGS.TASK.TITLE,
        buttons: {
          positive: CONSTANTS.DIALOGS.BTN.POSITIVE.SAVE,
          negative: CONSTANTS.DIALOGS.BTN.NEGATIVE.DEFAULT
        }
      }
    };

    DialogConfig.overrideOption(dataOption, obj);
    return obj;
  }

  static readonly overrideOption = (newObj, originObj): void => {
    if (newObj) {
      for (const key in newObj) {
        if (newObj.hasOwnProperty(key)) {
          originObj.data[key] = newObj[key];
        }
      }
    }
  }
}
