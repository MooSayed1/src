/*eslint-disable*/
let adhanAudio;

let doaaAudio;

const getTranslatedMessage = function (label, language) {
  if (label) {
    if (language === 'ar') {
      return `حان وقت صلاة ${label} 🕌`;
    }

    return `It's ${label} time 🕌`;
  }
  else {
    if (language === 'ar') {
      return `حان وقت الصلاة  🕌`;
    }

    return `It's prayer time 🕌`;
  }
}

const fetchUserData = function () {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return userData || false;
}

const playAdhan = function (label, labelEn) {
  const userData = fetchUserData();
  const adhanAudioLevel = userData.adhanAudioLevel ?? 1;
  const shouldPlayAudio = userData && userData.selectedAdhanVoice !== 'no-audio';
  const playReminderFlag = userData && userData.settings.playReminderFlag !== false;

  if (shouldPlayAudio) {
    console.log('Play Audio');

    if ((!adhanAudio || adhanAudio.paused) && !playReminderFlag) {
      adhanAudio = new Audio(`./data/adhan/${userData.selectedAdhanVoice}.mp3`);

      adhanAudio.volume = adhanAudioLevel;
      adhanAudio.play();
    } 
    // if we used else here: the two sound will be played! 
    if ((!adhanAudio || adhanAudio.paused) && playReminderFlag) {
      adhanAudio = new Audio(`./data/reminder/${labelEn}.mp3`);
      adhanAudio.volume = adhanAudioLevel;
      adhanAudio.play();
    }
  }
}
const stopAdhan = () => {
  console.log("Stop Audio");

  if (adhanAudio) {
    adhanAudio.pause();
  }

  adhanAudio.src = "";
};

const onCloseNotification = () => {
  console.log("Notification has been closed");
};

const shouldPlayAdhan = scheduledTime => {
  const alarmTime = new Date(scheduledTime);
  const currentTime = new Date();
  const MARGIN_TIME_IN_MINUTES = 5 * 60000;

  return currentTime - alarmTime <= MARGIN_TIME_IN_MINUTES;
};

const shouldShowNotification = scheduledTime => {
  const alarmTime = new Date(scheduledTime);
  const currentTime = new Date();
  const MARGIN_TIME_IN_MINUTES = 5 * 60000;

  return currentTime - alarmTime <= MARGIN_TIME_IN_MINUTES;
};

const createNotification = (message, isRequireInteraction) => {
  chrome.notifications.create("setPrayerAlarms", {
    type: "basic",
    title: "Quran Tab",
    message,
    requireInteraction: isRequireInteraction,
    iconUrl: "icon.png",
  });
};

const fireAlarm = function (alarm) {
  const prayerKey = alarm.name;
  const userData = fetchUserData();

  if (userData) {
    const { settings, prayerTimesObject } = userData;
    const selectedLanguageKey = settings.selectedLanguageKey;
    const selectedLabel = selectedLanguageKey === "ar" ? "labelAr" : "labelEn";
    const label = prayerTimesObject[prayerKey][selectedLabel];
    const labelEn = prayerTimesObject[prayerKey]["labelEn"]; //we use it to load the right Adhan sound
    const message = getTranslatedMessage(label, selectedLanguageKey);

    if (shouldShowNotification(alarm.scheduledTime)) {
      createNotification(message, true);
      shouldPlayAdhan(alarm.scheduledTime) && playAdhan(label, labelEn);
    }
  }
};

const clearPrayerAlarms = function () {
  chrome.alarms.clearAll();
};

const setPrayerAlarms = function (userData) {
  const prayerTimesObject = { ...userData.prayerTimesObject };

  if (prayerTimesObject) {
    clearPrayerAlarms();
    delete prayerTimesObject["sunrise"];
    Object.entries(prayerTimesObject).forEach(function (item) {
      chrome.alarms.create(item[0], { when: item[1].timeValue });
    });
  }
};

const onReceiveMessage = function (request) {
  if (request.name === "setPrayerAlarms") {
    const userData = fetchUserData();

    if (userData && userData.settings.prayerTimesFlag !== false) {
      setPrayerAlarms(userData);
    }
  } else if (request.name === "clearPrayerAlarms") {
    clearPrayerAlarms();
  } else if (request.name === "stopAdhan") {
    stopAdhan();
  }
};

chrome.alarms.onAlarm.addListener(fireAlarm);

chrome.runtime.onMessage.addListener(onReceiveMessage);

chrome.notifications.onClicked.addListener(stopAdhan);

chrome.notifications.onClosed.addListener(stopAdhan);
