import { readFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

type Instruction = {
  forward: number
  up: number
  down: number
}

type AStats = {
  horizontal: number
  depth: number
}

type BStats = AStats & { aim: number }

const a = (input: Instruction[]) => {
  const stats: AStats = input.reduce<AStats>(
    (accum, curr) => ({
      horizontal: accum.horizontal + curr.forward,
      depth: accum.depth + curr.down - curr.up
    }),
    { horizontal: 0, depth: 0 }
  )

  console.log(stats.horizontal * stats.depth)
}

const b = (input: Instruction[]) => {
  const stats: BStats = input.reduce<BStats>(
    (accum, curr) => ({
      aim: accum.aim + curr.down - curr.up,
      horizontal: accum.horizontal + curr.forward,
      depth: accum.depth + curr.forward * accum.aim
    }),
    { horizontal: 0, depth: 0, aim: 0 }
  )

  console.log(stats.horizontal * stats.depth)
}

const app = async () => {
  const initialArray = (await promisify(readFile)(resolve(__dirname, './input.txt'))).toString().split('\n')
  const input = initialArray
    .filter(i => i !== undefined && i.length > 0)
    .map<Instruction>(s => {
      const parts = s.split(' ')

      return {
        ...{
          forward: 0,
          up: 0,
          down: 0
        },
        [`${parts[0]}`]: parseInt(parts[1])
      }
    })

  console.log('a')
  a(input)

  console.log('b')
  b(input)
}

app()
