//Referencias HTML
const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divlAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);


if (!searchParams.has('desk')) {
    window.location = 'index.html';    
    throw new Error('El escritorio es obligatorio');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

divlAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('tickets-pending', (pendings) => {
    if(pendings === 0){
        lblPending.style.display = 'none';
    }else{
        lblPending.style.display = '';
    }

    lblPending.innerText = pendings;
    console.log(pendings);
});


btnAttend.addEventListener('click', () => {
    socket.emit('attend-ticket', {  desk }, ({ ok, ticket,message }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            divlAlert.style.display = '';
            return;
        }
        lblTicket.innerText = 'ticket: ' + ticket.number;

        console.log('Desde el server - js Escritorio ', ticket);
        //     lblNuevoTicket.innerText = ticket;
    });
});