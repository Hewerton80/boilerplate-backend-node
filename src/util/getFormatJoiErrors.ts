import { ValidationError } from 'joi'

export const getFormatJoiErrors = (error: ValidationError) => {
  // return error
  const formatJoiErrors: any = {}

  const details = error?.details
  details?.forEach((detail) => {
    formatJoiErrors[String(detail?.context?.label)] = detail?.message
  })
  return {
    fieldsErros: formatJoiErrors,
  }
}
