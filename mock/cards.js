 const list = [
    {
      id:1,
      name: 'What is the object oriented way to get wealthy ?',
      desc: 'Inheritance',
      url:"dsfsdasdf"
    },
    {
      id:2,
      name: 'What is the object oriented way to get wealthy ?',
      desc: 'Inheritance',
      url:"dsfsdasdf"
    },
    {
      id:3,
      name: 'What is the object oriented way to get wealthy ?',
      desc: 'Inheritance',
      url:"dsfsdasdf"
    },
  ];
  
  export default {
    'get /dev/quryList': function (req, res) {
        res.json(list);
    },
  };