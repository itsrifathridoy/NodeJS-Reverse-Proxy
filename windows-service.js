const Service = require('node-windows').Service;
const svc = new Service({
    name: 'My Node.js App',
    description: 'My Node.js app as a Windows service.',
    script: 'D:\\DBMS Project\\Proxy_Server\\index.js'
  });
  svc.on('install', () => {
    svc.start();
  });
  svc.install();

  // Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });
  
  // Uninstall the service.
  svc.uninstall();