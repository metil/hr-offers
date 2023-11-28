const MAX_FAILURES = 5
/** CircuitBreaker class to handle circuit breaker pattern */
export class CircuitBreak {
  circuitBreaker = 0
  circuitOpen = false

  incrementCircuitBreaker = () => {
    this.circuitBreaker++
    if (this.circuitBreaker > MAX_FAILURES) {
      this.circuitOpen = true
      setTimeout(()=> this.resetCircuit(), 5000)
    }
  }
  resetCircuit = () => {
    this.circuitBreaker = 0
    this.circuitOpen = false
    console.log('Circuit closed.')
  }
  isCircuitOpen = () => this.circuitOpen
}
