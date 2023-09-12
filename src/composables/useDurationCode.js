export function useDurationCode(duration) {
  let code = ''

  switch (duration) {
    case '16n':
      code = '&#119137'
      break
    case '8n':
      code = '&#119136;'
      break
    case '4n':
      code = '&#119135;'
      break
    case '2n':
      code = '&#119134;'
      break 
    case '1m':
      code = '&#119133;'
      break
    default:
      code = '&#119135;'
      break
  }

  return {
    code
  }
}