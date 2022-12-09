const inputValues = [
   'select_mode',
   'show_bosses',
   'num_columns',
   'show_titles'
];

function initialize() {
   displaySettings(loadSettings());
}

function displaySettings(settings) {
   inputValues.forEach((i) => {
      var item = document.getElementById(i);
      if (settings[i] !== undefined) {
         item.value = settings[i];
      } else {
         item.value = defaultSettings[i];
      }
   });
}

function restoreDefaults() {
   saveSettings(defaultSettings);
   displaySettings(defaultSettings);
}

function saveChanges() {
   settings = loadSettings();

   inputValues.forEach((i) => {
      var item = document.getElementById(i);
      settings[i] = item.value;
   });

   saveSettings(settings);
}
