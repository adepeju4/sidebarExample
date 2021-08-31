const axios = require('axios');
const { data } = require('../data/sidebarData.js');
const baseUrl = require("../utils/baseUrl.js");


const sendSidebarData = (req, res) => {
    try {

        //Here i'm just saving tehe sidebar data to my local database...but we could remove... 
        //..it when submitting the plugin. A discussion for later sha.
        //the data i'm sending here is the sidebar object from the data folder.
        const localSidebar = await db.sidebar.insert(data);

        //ignore the naming conventions, i'm trying to make you guys understand what is being typed
      
        let resFromZuriCore = await axios.post(`${baseUrl}/sidebar`, parseJsonToObject, { headers: {
            //so this is if the route is protected...........
            'Authorization': `probably an api key or userToken or something`
            //but since we are not working with auth guys for now, ignore the headers object
        }});

        //here if the post request to zuri core is successful, we can send a response back to our server and the data we sent to zuri core
        if (resFromZuriCore.statusText === 'OK') {
            // this is where our json format comes to play. innn, my own opinion.

            // so we can use this format throughout the project
            return res.sendStatus(200).send({ Data: localSidebar }).end()

            //or we can use 

            // return res.status(200).send({ message: "success", data: localSidebar }).end()
            
            // //or 

            // return res.status(200).json(localSidebar).end()

            //i always use .end() to end all my responses but idk idk idk idkkkkkkk


            //so the difference between the first sendStatus and status is that sendStatus will 
            //send a status message back to you automatically  but res.status will require you to send
            // a status message too....... hence res.status(200).send(message: 'success'). res.sendStatus is just a
            // shortcut.
        }
    } catch (err) {
        //this will return an unauthorized error if the response from zuri core's protected route is bad or something.
        return res.status(400).send({ message: 'invalid request' });
    }
}