import EventosActions from '../../Acciones/Eventos/Eventos'

exports.getEvento = (ctx) => {
    try {
        const { event_id, context, metadata, timestamp } = ctx.request.body;
        const threshold = parseInt(ctx.params.threshold); // Obtener el valor de threshold de la URL
        if (!event_id || !context || !metadata || !timestamp || isNaN(threshold)) {
            ctx.status = 400;
            ctx.body = { status: 'NOK', error_message: 'One or more attributes did not come on the request or threshold is invalid' };
            return;
        }

        EventosActions.handleEvent(event_id, context, metadata, timestamp, threshold);
        ctx.status = 200;
        ctx.body = { data: EventosActions.getAllIncidents() };

    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { status: 'NOK', error_message: 'INTERNAL SERVER ERROR' };
    }
    return ctx;
};