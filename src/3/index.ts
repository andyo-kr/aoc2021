import { readFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

type Counts = { 0: number; 1: number }
type Calc = {
  gamma: string
  epsilon: string
}

const a = (input: string[]) => {
  const defaultCounts: Counts = { 0: 0, 1: 0 }
  const result = input.reduce<Counts[]>((accum, curr) => {
    const parts = curr.split('')

    return parts.map<Counts>((curr, index) => {
      const counts = accum[index] || defaultCounts
      return { 0: counts['0'] + (curr === '0' ? 1 : 0), 1: counts['1'] + (curr === '1' ? 1 : 0) }
    })
  }, [])
  const final = result.reduce<Calc>(
    (accum, curr) => {
      if (curr['0'] > curr['1']) {
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

const app = async () => {
  const initialArray = (await promisify(readFile)(resolve(__dirname, './input.txt'))).toString().split('\n')
  const input = initialArray.filter(i => i !== undefined && i.length > 0)

  console.log('a')
  a(input)
}

app()
