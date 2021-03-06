BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("*.gstatic.com");
BrowserPolicy.content.allowOriginForAll("*.bootstrapcdn.com");
BrowserPolicy.content.allowOriginForAll("*.amazonaws.com");
BrowserPolicy.content.allowOriginForAll("*.googleapis.com");
BrowserPolicy.content.allowOriginForAll("*.googleapis.com");

BrowserPolicy.content.allowEval("*.googleapis.com");

if (process.env.NODE_ENV === "development")  {


    console.log("In development mode. Allowing all framing so that mocha-web can run for tests.");
    BrowserPolicy.content.allowOriginForAll("localhost:*");
    BrowserPolicy.content.allowConnectOrigin("ws://localhost:5000");
    BrowserPolicy.content.allowConnectOrigin("ws://localhost:3000");
}