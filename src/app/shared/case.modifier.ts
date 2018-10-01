export class CaseModifier {

  private static toString = Object.prototype.toString;
  public static camelize(string) {
    if (CaseModifier.isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  };
  public static pascalize(string) {
    const camelized = CaseModifier.camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
  };
  public static decamelize(string, options) {
    return CaseModifier.separateWords(string, options).toLowerCase();
  };
  public static camelizeKeys(object, options = {}) {
    return CaseModifier.processKeys(CaseModifier.processor(CaseModifier.camelize, options), object, options);
  };
  public static decamelizeKeys(object, options) {
    return CaseModifier.processKeys(CaseModifier.processor(CaseModifier.decamelize, options), object, options);
  };
  public static pascalizeKeys(object, options) {
    return CaseModifier.processKeys(CaseModifier.processor(CaseModifier.pascalize, options), object, options);
  };
  public static depascalizeKeys() {
    return this.decamelizeKeys.apply(this, arguments);
  };

  private static processKeys (convert, obj, options) {
    if (!CaseModifier.isObject(obj)
      || CaseModifier.isDate(obj)
      || CaseModifier.isRegExp(obj)
      || CaseModifier.isBoolean(obj)
      || CaseModifier.isFunction(obj)) {
      return obj;
    }

    let output,
      i = 0,
      l = 0;

    if (CaseModifier.isArray(obj)) {
      output = [];
      for (l = obj.length; i < l; i++) {
        output.push(CaseModifier.processKeys(convert, obj[i], options));
      }
    } else {
      output = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          output[convert(key, options)] = CaseModifier.processKeys(convert, obj[key], options);
        }
      }
    }
    return output;
  };
  private static processor(convert, options) {
    const callback = options && 'process' in options ? options.process : options;

    if (typeof(callback) !== 'function') {
      return convert;
    }

    return function(string, opt) {
      return callback(string, convert, opt);
    }
  };
  // Utilities
  // Taken from Underscore.js
  private static isFunction(obj) {
    return typeof(obj) === 'function';
  };
  private static isObject(obj) {
    return obj === Object(obj);
  };
  private static isArray(obj) {
    return CaseModifier.toString.call(obj) === '[object Array]';
  };
  private static isDate(obj) {
    return CaseModifier.toString.call(obj) === '[object Date]';
  };
  private static isRegExp(obj) {
    return CaseModifier.toString.call(obj) === '[object RegExp]';
  };
  private static isBoolean(obj) {
    return CaseModifier.toString.call(obj) === '[object Boolean]';
  };
  private static isNumerical(obj) {
    obj = obj - 0;
    return obj === obj;
  };
  private static separateWords (string, options) {
    options = options || {};
    const separator = options.separator || '_';
    const split = options.split || /(?=[A-Z])/;

    return string.split(split).join(separator);
  }
}
