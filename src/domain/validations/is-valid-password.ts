import isEmptyValue from './is-empty-value'

export default function isValidPassword(password: string) {
  if (isEmptyValue(password)) return false
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return re.test(password)
}
