export const isNumber = (value: any) => {
  return typeof value === 'number'
}

export const isString = (value: any) => {
  return typeof value === 'string'
}

export const isBoolean = (value: any) => {
  return typeof value === 'boolean'
}

export const isNull = (value: any) => {
  return value === null
}

export const isUndefined = (value: any) => {
  return value === undefined
}

export const isFile = (value: any) => {
  return (
    typeof value?.name === 'string' && typeof value?.lastModified === 'number'
  )
}
