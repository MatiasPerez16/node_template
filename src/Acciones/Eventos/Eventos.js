let incidents = [];

exports.handleEvent = (event_id, context, metadata, timestamp, threshold) => {
    const newEvent = { event_id, context, metadata, timestamp };
  
    const incident = incidents.find((inc) => {
      const lastEvent = inc.incidents[inc.incidents.length - 1];
      const timeDifference = Math.abs((timestamp - lastEvent.timestamp) / 1000); // Diferencia de tiempo en segundos
      return timeDifference <= threshold && context === lastEvent.context && metadata === lastEvent.metadata;
    });
  
    if (incident) {
      incident.incidents.push(newEvent); // Agregar al evento al incidente existente
    } else {
      incidents.push({ incident_id: `prot-${Date.now()}`, incidents: [newEvent] }); // Crear un nuevo incidente
    }
  }

// Función para obtener todos los incidentes
exports.getAllIncidents = () => {
  return incidents;
}
