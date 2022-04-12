const path = require('path');
const fs = require('fs');
const Ticket = require('./ticket');


class TicketControl{    
    
    constructor(){
        this.ultimate = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        this.init();        
    }

    get toJson(){
        return {
            ultimate: this.ultimate,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    init(){
        const data = require('../db/data.json');
        if(data.today === this.today){
            this.tickets = data.tickets;
            this.ultimate = data.ultimate;
            this.last4 = data.last4;
        }else{
            this.saveDB();
        }
        console.log(data);
    }

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }


    next(){
        this.ultimate +=1;
        const ticket = new Ticket(this.ultimate, null);
        this.tickets.push(ticket);
        this.saveDB();

        return 'Ticket: ' + ticket.number;
    }

    
    attendTicket(desk){
        if(this.tickets.length === 0){
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.desk = desk;
        this.last4.unshift(ticket);

        if(this.last4.length > 4){
            this.last4.splice(-1,1);
        }
        this.saveDB();
        return ticket;

    }

}
module.exports = TicketControl;
