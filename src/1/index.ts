import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'

const a = async (input: number[]) => {
  const increase = input.reduce((accum, curr, index) => (curr < input[index + 1] ? accum + 1 : accum), 0)

  console.log(increase)
}

const b = async (input: number[]) => {
  const increase = input.reduce((accum, curr, index) => {
    if (index > input.length - 4) return accum

    const a = curr + input[index + 1] + input[index + 2]
    const b = input[index + 1] + input[index + 2] + input[index + 3]

    if (a < b) return accum + 1

    return accum
  }, 0)

  console.log(increase)
}

const app = async () => {
  const initialArray = (await promisify(readFile)(resolve(__dirname, './input.txt'))).toString().split('\n')
  const input = initialArray.map(s => parseInt(s, 10)).filter(n => !Number.isNaN(n))

  console.log('a')
  await a(input)
  console.log('b')
  await b(input)
}

app()
