const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();

let factory;

// Connect
bizNetConnection.connect("admin@marbles").then((bizNetDef) => {
    console.log("Connected to Network");
    factory=bizNetDef.getFactory();

    return bizNetConnection.getAssetRegistry("org.acme.model.Marble");
}).then((marbleRegistry)=>{
    console.log("Adding new Marble...");

    let newMarble=factory.newResource("org.acme.model", "Marble", "MARBLE001");
    newMarble.owner=factory.newRelationship("org.acme.model", "Collector", "tom@ibm.com");
    newMarble.colour="red";
    newMarble.diameter=14;


    return marbleRegistry.add(newMarble);

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
