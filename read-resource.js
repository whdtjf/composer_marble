const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const Table=require('cli-table');
let bizNetConnection = new BusinessNetworkConnection();

// Connect
bizNetConnection.connect("admin@marbles").then((bizNetDef) => {
    console.log("Connected to Network");
    return bizNetConnection.getParticipantRegistry("org.acme.model.Collector");
}).then((collectorRegistry)=>{
    return collectorRegistry.getAll();
}).then((collectors)=>{
    let table=new Table({
        head: ['email', 'First Name', 'Last Name', 'Sex', 'Postcode']
    });

    collectors.forEach((collector)=>{
        let row=[];
        row.push(collector.email);
        row.push(collector.firstname);
        row.push(collector.surname);
        row.push(collector.sex);
        row.push(collector.address.postcode);
        table.push(row);
    });
    console.log("Collectors:");
    console.log(table.toString());
    console.log("");

    return bizNetConnection.getAssetRegistry("org.acme.model.Marble");
}).then((marbleRegistry)=>{
    return marbleRegistry.getAll();
}).then((marbles)=>{
    let table=new Table({
        head: ['ID', 'Owner', 'Colour', 'Diameter']
    });

    marbles.forEach((marble)=>{
        let row=[];
        row.push(marble.Id);
        row.push(marble.owner.getIdentifier());
        row.push(marble.colour);
        row.push(marble.diameter);
        table.push(row);
    });
    console.log("Marbles:");
    console.log(table.toString());
    console.log("");
    
    // Disconnect
}).then(() => {
    console.log("Done!");
    return bizNetConnection.disconnect();

    // Exit with Success
}).then(() => {
    console.log("Disconnected from Network");
    process.exit(0);

    // Catch any errors
}).catch((error) => {
    console.log(error);
    throw error;
});
