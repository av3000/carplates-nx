/*
 * For additiona configuration visit
 * https://commitlint.js.org/reference/configuration.html
 * or https://commitlint.js.org/reference/rules-configuration.html
 * Current default rules https://commitlint.js.org/reference/rules.html
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  /*
   * Rules are made up by a name and a configuration array. The configuration array contains:
   *    Level [0..2]: 0 disables the rule. For 1 it will be considered a warning for 2 an error.
   *    Applicable always|never: never inverts the rule.
   *    Value: value to use for this rule.
   *
   * Rule configurations are either of type array residing on a key with the rule's name as key
   * on the rules object or of type function returning type array or Promise<array>.
   * This means all of the following notations are supported.
   */
  rules: {
    'header-max-length': [1, 'always', 72],
  },
};
