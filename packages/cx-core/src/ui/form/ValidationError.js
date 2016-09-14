import {Widget, VDOM} from '../Widget';
import {Field} from './Field';

export class ValidationError extends Widget {

   checkVisible(context, instance, data) {
      if (context.lastFieldId && context.validation.errors && context.validation.errors.length > 0) {
         var lastError = instance.lastError = context.validation.errors[context.validation.errors.length - 1];
         return lastError.fieldId == context.lastFieldId;
      }
      return false;
   }

   prepare(context, instance) {
      var {data, lastError} = instance;
      data.errorMessage = lastError.message;
      data.fieldId = lastError.fieldId;
      super.prepare(context, instance);
   }

   render(context, instance, key) {
      var {data} = instance;
      return <label key={key} className={data.classNames} htmlFor={data.fieldId}>
         {' '}
         {data.errorMessage}
      </label>
   }
}

ValidationError.prototype.baseClass = 'validation-error';
ValidationError.prototype.pure = false;

Widget.alias('validation-error', ValidationError);
