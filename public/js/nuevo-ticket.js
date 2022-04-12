const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('ultimate-ticket', (ultimate)=>{
    lblNuevoTicket.innerText = 'Ticket: ' + ultimate;
});


btnCreate.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket );
        lblNuevoTicket.innerText = ticket;
    });

});

console.log('Nuevo Ticket HTML');