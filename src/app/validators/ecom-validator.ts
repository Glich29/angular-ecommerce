import {FormControl, MinValidator, ValidationErrors} from "@angular/forms";

export class EComValidator {
  //whitespace validation
  static notOnlyWhitespace(control: FormControl) : ValidationErrors | null {
    //only whitespace
    if ((control.value != null) && (control.value?.trim()?.length === 0)) {
      //invalid, return error object
      return {'notOnlyWhitespace': true};
    } else {
      return null;
    }
  }
}
