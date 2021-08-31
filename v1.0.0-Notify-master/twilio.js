const accountSid = 'AC324de59f286f66e929b39536beeea942';
const authToken = '89a71abf3ae1ff1963d5bc48b6c69a1e';
const client = require('twilio')(accountSid, authToken);

function sendSMS(msg){
    client.messages
      .create({body: msg, from: '+12056288645', to: '+201009039122'})
      .then(message => console.log(message.sid)).catch(()=>{console.log('failed to send sms')})
}



module.exports=sendSMS;