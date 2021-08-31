const data = require('../data/sideBarData.json');
const axios = require('axios');
const baseUrl = require('../utils/baseUrl.js')

const sendSidebarData = (req, res) => {
  try {
  
      
      //MONGO DB TAKES IN OBJECTS SO TURN YOUR JSON DATA TO AN OBJECT FIRST

      const objectData = JSON.stringify(data);

      //now insert the object into your local db
    const localSidebar = await db.sidebar.insert(objectData);

    //ignore the naming conventions, i'm trying to make you guys understand what is being typed
    // EVERY AXIOS SECOND ARGUMENT TAKES AN OBJECT AND NOTTTT A JSON DATA

    let resFromZuriCore = await axios.post(
        `${baseUrl}/sidebar`, objectData,
        {
        headers: {
          //so this is if the route is protected...........
          Authorization: `probably an api key or userToken or something`,
          //but since we are not working with auth guys for now, ignore the headers object
        },
      }
    );

    //here if the post request to zuri core is successful, we can send a response back to our server and the data we sent to zuri core
    if (resFromZuriCore.statusText === "OK") {
      // So here, we'd directly send the json data instead of turning the object to json with .json() and .send()

      // so we can use this format throughout the project
      return res.sendStatus(200).send(data).end();

      //or we can use

        return res.status(200).send({ message: "success" }, data).end()

      // //or

      return res.status(200).send(data).end()

      //i always use .end() to end all my responses but idk idk idk idkkkkkkk

      //so the difference between the first sendStatus and status is that sendStatus will
      //send a status message back to you automatically  but res.status will require you to send
      // a status message too....... hence res.status(200).send(message: 'success'). res.sendStatus is just a
      // shortcut.
    }
  } catch (err) {
    //this will return an unauthorized error if the response from zuri core's protected route is bad or something.
    return res.status(400).send({ message: "invalid request" });
  }
};