/**
 * copy from https://github.com/vueComponent/ant-design-vue/blob/main/components/form/utils/messages.ts
 */
const typeTemplate = '\'${name}\' is not a valid ${type}'
export const defaultValidateMessages = {
  default: 'Validation error on field \'${name}\'',
  required: '\'${name}\' is required',
  enum: '\'${name}\' must be one of [${enum}]',
  whitespace: '\'${name}\' cannot be empty',
  date: {
    format: '\'${name}\' is invalid for format date',
    parse: '\'${name}\' could not be parsed as date',
    invalid: '\'${name}\' is invalid date',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '\'${name}\' must be exactly ${len} characters',
    min: '\'${name}\' must be at least ${min} characters',
    max: '\'${name}\' cannot be longer than ${max} characters',
    range: '\'${name}\' must be between ${min} and ${max} characters',
  },
  number: {
    len: '\'${name}\' must equal ${len}',
    min: '\'${name}\' cannot be less than ${min}',
    max: '\'${name}\' cannot be greater than ${max}',
    range: '\'${name}\' must be between ${min} and ${max}',
  },
  array: {
    len: '\'${name}\' must be exactly ${len} in length',
    min: '\'${name}\' cannot be less than ${min} in length',
    max: '\'${name}\' cannot be greater than ${max} in length',
    range: '\'${name}\' must be between ${min} and ${max} in length',
  },
  pattern: {
    mismatch: '\'${name}\' does not match pattern ${pattern}',
  },
}

/**
 * copy from https://github.com/vueComponent/ant-design-vue/blob/main/components/form/interface.ts#L114
 */
type ValidateMessage = string | (() => string)
export interface ValidateMessages {
  default?: ValidateMessage
  required?: ValidateMessage
  enum?: ValidateMessage
  whitespace?: ValidateMessage
  date?: {
    format?: ValidateMessage
    parse?: ValidateMessage
    invalid?: ValidateMessage
  }
  types?: {
    string?: ValidateMessage
    method?: ValidateMessage
    array?: ValidateMessage
    object?: ValidateMessage
    number?: ValidateMessage
    date?: ValidateMessage
    boolean?: ValidateMessage
    integer?: ValidateMessage
    float?: ValidateMessage
    regexp?: ValidateMessage
    email?: ValidateMessage
    url?: ValidateMessage
    hex?: ValidateMessage
  }
  string?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  number?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  array?: {
    len?: ValidateMessage
    min?: ValidateMessage
    max?: ValidateMessage
    range?: ValidateMessage
  }
  pattern?: {
    mismatch?: ValidateMessage
  }
}

/**
 * copy from https://github.com/vueComponent/ant-design-vue/blob/main/components/form/utils/validateUtil.ts#L17
 */
export function replaceMessage(message: string, scope: Record<string, string>): string {
  return message.replace(/\$\{\w+\}/g, (str) => {
    const key = str.slice(2, -1)
    return scope[key]
  })
}
