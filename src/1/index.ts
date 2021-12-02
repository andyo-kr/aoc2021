import { readFile } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'

const app = async () => {
  const result = (await promisify(readFile)(resolve(__dirname, './input/input.txt'))).toString().split('\n')

  const increase = result.reduce((accum, curr, index) => {
    if (index > result.length - 2) return accum
    if (parseInt(curr) < parseInt(result[index + 1])) return accum + 1

    return accum
  }, 0)

  console.log(increase)
}

app()
