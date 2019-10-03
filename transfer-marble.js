const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();
let factory;
// Connect
bizNetConnection.connect("admin@marbles").then((bizNetDef) => {
    console.log("Connected to Network");
    bizNetDefinition=bizNetDef;
    factory=bizNetDef.getFactory();

    console.log("Submitting transaction");

    let newTransaction=factory.newTransaction("org.acme.model", "ChangeOwner");
    newTransaction.marble=factory.newRelationship("org.acme.model", "Marble", "MARBLE001");
    newTransaction.newOwner=factory.newRelationship("org.acme.model", "Collector", "mgk@ibm.com");
    return bizNetConnection.submitTransaction(newTransaction);
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
