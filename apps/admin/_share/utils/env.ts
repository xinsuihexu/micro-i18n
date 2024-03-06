import type { RouteLocation } from 'vue-router'
import { MAIN_APP_SLOT_ROUTE_PATH } from '../settings'

export const isMicro = (route: RouteLocation) => route.path.startsWith(MAIN_APP_SLOT_ROUTE_PATH)
