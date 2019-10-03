const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let bizNetConnection = new BusinessNetworkConnection();

// Connect
bizNetConnection.connect("admin@marbles").then((bizNetDef) => {
    console.log("Connected to Network");

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
