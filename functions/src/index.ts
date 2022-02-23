/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
import functions = require('firebase-functions');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const StreamChat = require('stream-chat').StreamChat;

const STREAM_API_KEY = 'nrufz8xdz2u6';
const STREAM_SECRET = 'uvm734uge2y6xav4wubpsb9gcueqg78m64krn24w5dufr6xymga8yv5kvcnr2aex';
const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET);

exports.onCreateUser = functions.firestore
  .document('Users/{userId}')
  .onCreate((snapshot, context) => {
    const userId = snapshot.data().userId;
    const token = serverClient.createToken(userId);
    return snapshot.ref.set({token}, {merge: true});
  });

