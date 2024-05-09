## About

#### The Challenge and the Solution

Sharing files within a controlled Wi-Fi network can be surprisingly tricky. While WebRTC offered promise, they proved unreliable in my experience. Additionally, installing separate file transfer apps on each device wasn't ideal. Public services like email
and piping servers presented a functional solution, but security and speed were drawbacks. To address these limitations, I developed this application.

#### A Feature-Rich File Sharing Tool

This application goes beyond simple file sharing. It acts as a shared disk for your devices, enabling easy access to common files. It also bridges the gap between devices, allowing direct connections for file transfer and chat via a built-in piping server.
WebRTC signal functionality is included for compatible devices, and group chat capabilities are available for real-time collaboration. The true power lies in its offline functionality. As long as your devices can create a Wi-Fi hotspot, the application
facilitates a secure, self-contained intranet with all its features accessible.

#### Technical Underpinnings

Technically, this application is self-sufficient. It incorporates a web server, piping server, ws tunnel, ssh forwarding server, tiny proxy, forming the backbone of a robust offline network. With Wi-Fi tethering, it empowers you to create a private file-sharing environment within
your local network.

Please take a look at help page about how to use it.

### Some other interesting Tool
* [PairDrop](https://pairdrop.net/) / [SnapDrop](https://snapdrop.net/) / [PeerJS File share](https://privapps.github.io/p2pf/) / [Selfhost list](https://github.com/awesome-selfhosted/awesome-selfhosted?tab=readme-ov-file#file-transfer---object-storage--file-servers)
* [serveo.net](https://serveo.net) / [localtunnel](https://localtunnel.me/) / [Tunnel List](https://github.com/anderspitman/awesome-tunneling) 