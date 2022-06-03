export default function isEmptyValue(val: string) {
  return !val || val.trim() === ''
}
