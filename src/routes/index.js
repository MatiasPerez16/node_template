import Router from 'koa-router'
import getHealth from './health/health'
import getEvento from './Eventos/Eventos'

const router = new Router()

router.get('/health', getHealth)

router.post('/event/threshold/:threshold' , getEvento.getEvento)
//Hola
export default router
