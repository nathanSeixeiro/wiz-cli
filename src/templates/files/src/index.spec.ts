import { log } from 'console'
import { testJest } from '.'

describe('test jest', () => {
  test('test jest', () => {
    expect(testJest()).toEqual(log('teste jest'))
  })
})
