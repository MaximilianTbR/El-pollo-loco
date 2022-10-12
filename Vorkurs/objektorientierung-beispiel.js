let contacts = [
    new Contact('Jessica', 'Moldovan', '09879087'),
    new Friend('Erika', 'Mustermann', '3458595')
]

function addContact(fN, lN) { // wichtig: fN & lN hängen in keinster Weise mit firstName und LastName von der Variable myContact zusammen!!!
    let myContact = new Contact(firstName, lastName);
    debugger;
    contacts.push({
        myContact
    })
}

addContact('Junus', 'Ergin');
addContact('Manuel', 'Thaler');
addContact('Linus', 'Kauer');