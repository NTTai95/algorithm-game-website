import { describe, expect, it } from 'vitest'
import { executeDryRun } from './dryRun'

describe('Protocol Dry Run (TEST-001)', () => {
  it('executes dry run with default parameters', () => {
    const result = executeDryRun()

    expect(result.status).toBe('SUCCESS')
    expect(result.verified).toBe(true)
    expect(result.protocolVersion).toBe('1.0.0')
    expect(typeof result.timestamp).toBe('string')
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false)
  })

  it('executes dry run with custom protocol version', () => {
    const customVersion = '2.0.0-beta'
    const result = executeDryRun(customVersion)

    expect(result.status).toBe('SUCCESS')
    expect(result.verified).toBe(true)
    expect(result.protocolVersion).toBe(customVersion)
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false)
  })

  it('validates returned schema structure', () => {
    const result = executeDryRun()
    const keys = Object.keys(result).sort()

    expect(keys).toEqual(['protocolVersion', 'status', 'timestamp', 'verified'])
  })
})
