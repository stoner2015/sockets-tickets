const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {


    socket.emit('ultimate-ticket', ticketControl.ultimate);
    socket.emit('state-actual', ticketControl.last4);
    socket.emit('tickets-pending', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);
        // TODO: notificar que hay un nuevo tocket pendiente de asignar
    });

    socket.on('attend-ticket', ({desk}, callback) => {

        if(!desk){
            return callback({
                ok: false,
                message: 'El escritorio es obligatorio'
            });
        }
        
        const ticket = ticketControl.attendTicket(desk);
        
        socket.broadcast.emit('state-actual', ticketControl.last4);
        socket.emit('tickets-pending', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

        if(!ticket){
            callback({
                ok: false,
                message: 'No hay tickets pendientes'
            });
        }else {
            callback({
                ok: true,
                ticket
            });
        }
        // callback(next);

        


    });

}



module.exports = {
    socketController
}

