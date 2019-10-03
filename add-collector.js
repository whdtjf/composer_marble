const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();

let factory;

// Connect
bizNetConnection.connect("admin@marbles").then((bizNetDef) => {
    console.log("Connected to Network");
    bizNetDefinition=bizNetDef;
    factory=bizNetDef.getFactory();

    return bizNetConnection.getParticipantRegistry("org.acme.model.Collector");
}).then((collectorRegistry)=>{
    console.log("Adding new Collector...");

    let newCollector=factory.newResource("org.acme.model", "Collector", "tom@ibm.com");
    newCollector.firstname="Tom";
    newCollector.surname="Appleyard";

    newCollector.address=factory.newConcept("org.acme.model", "Address");
    newCollector.address.house="IBM Bluemix Garage";
    newCollector.address.street="JongRo";
    newCollector.address.county="Seoul";
    newCollector.address.postcode="Ec2Y";
    newCollector.address.country="South Korea";

    newCollector.sex="MALE";

    return collectorRegistry.add(newCollector);

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
