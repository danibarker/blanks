// // firebase function
export const firebaseFunction = functions.https.onCall(
  async (data, context) => {
    const { startTime, endTime } = data;
    const msPerMinute = 60 * 1000;
    const meetingLength = 15;
    const minutesBetween = (endTime - startTime) / msPerMinute;
    const numMeetings = minutesBetween / meetingLength;
    for (let i = 0; i < numMeetings; i++) {
      const start = startTime.valueOf() + i * meetingLength * msPerMinute;
      const end = start + meetingLength * msPerMinute;
      const meeting = {
        start: new Date(start),
        end: new Date(end),
      };
      console.log(meeting);
      // do the firebase create timeslot for each meeting here
    }
  }
);

// front end
const sendData = httpsCallable(cloudFuncs, "firebaseFunction");
sendData({
  startTime: new Date(startTime),
  endTime: new Date(endTime),
});

const testFireFunction = (data) => {
  const { startTime, endTime } = data;
  const msPerMinute = 60 * 1000;
  const meetingLength = 15;
  const minutesBetween = (endTime - startTime) / msPerMinute;
  const numMeetings = minutesBetween / meetingLength;
  for (let i = 0; i < numMeetings; i++) {
    const start = startTime.valueOf() + i * meetingLength * msPerMinute;
    const end = start + meetingLength * msPerMinute;
    const meeting = {
      start: new Date(start),
      end: new Date(end),
    };
    console.log(meeting);
  }
};
testFireFunction({
  startTime: new Date("jul 13 2022 12:00"),
  endTime: new Date("jul 13 2022 18:00"),
});
