let grpc = require("grpc")
let protoLoader = require("@grpc/proto-loader")

const server = new grpc.Server();

const URL = "0.0.0.0:2019"


let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("../proto/welcome-world.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);


function greetUser(call, callback) {
    callback(null, {
        message: `Hello ${call.request.name}, welcome to the UdeA`
    })
}

server.addService(proto.welcome.WelcomeService.service, { greetUser: greetUser });

server.bind(URL, grpc.ServerCredentials.createInsecure());

server.start();