import mitt from 'mitt'
import type { Emitter } from 'mitt'

export const bus: Emitter<Record<string, any>> = mitt()
