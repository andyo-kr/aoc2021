import { readFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

type Counts = { zero: number; one: number }
type Calc = {
  gamma: string
  epsilon: string
}

const defaultCounts: Counts = { zero: 0, one: 0 }

const makeInputs = (arr: string[]): Counts[] =>
  arr.reduce<Counts[]>((accum, curr) => {
    const parts = curr.split('')

    return parts.map<Counts>((curr, index) => {
      const counts = accum[index] || defaultCounts
      return { zero: counts.zero + (curr === '0' ? 1 : 0), one: counts.one + (curr === '1' ? 1 : 0) }
    })
  }, [])

const a = (input: Counts[]) => {
  const final = input.reduce<Calc>(
    (accum, curr) => {
      if (curr.zero > curr.one) {
        return {
          gamma: accum.gamma + '0',
          epsilon: accum.epsilon + '1'
        }
      }

      return {
        gamma: accum.gamma + '1',
        epsilon: accum.epsilon + '0'
      }
    },
    { gamma: '', epsilon: '' }
  )

  const parsedFinal = { gamma: parseInt(final.gamma, 2), epsilon: parseInt(final.epsilon, 2) }

  console.log(parsedFinal.epsilon * parsedFinal.gamma)
}

const filterInputsOxygen = (arr: string[], matcher: string = '', length: number = 1): string | undefined => {
  if (length === arr.length) return undefined

  const newMatch = makeInputs(arr)
    .map(i => (i.zero <= i.one ? '1' : '0'))
    .join('')
  const filteredInputs = arr.filter(v => v.substring(0, length) === `${matcher}${newMatch[length - 1]}`)

  if (filteredInputs.length === 1) return filteredInputs[0]

  return filterInputsOxygen(filteredInputs, `${matcher}${newMatch[length - 1]}`, length + 1)
}

const filterInputsCO2 = (arr: string[], matcher: string = '', length: number = 1): string | undefined => {
  if (length === arr.length) return undefined

  const newMatch = makeInputs(arr)
    .map(i => (i.zero <= i.one ? '0' : '1'))
    .join('')
  const filteredInputs = arr.filter(v => v.substring(0, length) === `${matcher}${newMatch[length - 1]}`)

  if (filteredInputs.length === 1) return filteredInputs[0]

  return filterInputsCO2(filteredInputs, `${matcher}${newMatch[length - 1]}`, length + 1)
}

const b = (initial: string[]) => {
  const oxygen = filterInputsOxygen(initial)
  const co2 = filterInputsCO2(initial)

  if (!oxygen || !co2) throw new Error('ughhh')

  console.log(parseInt(oxygen, 2) * parseInt(co2, 2))
}

const app = async () => {
  const initialArray = (await promisify(readFile)(resolve(__dirname, './input.txt')))
    .toString()
    .split('\n')
    .filter(i => i !== undefined && i.length > 0)
  const input = makeInputs(initialArray)

  console.log('a')
  a(input)
  console.log('b')
  b(initialArray)
}

app()
