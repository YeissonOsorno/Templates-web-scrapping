/* Limpiar */
job.location = job.location.replace(/\s+/gi, ' ');

/* Remplazar parentesis y su contenido */
job.location = job.location.replace(/\(([^)]*)\)/g, '');