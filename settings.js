const appName = 'sm-area-tracker';
const defaultSettings = {
   "select_mode" : "right",
   "show_bosses" : "yes",
   "show_header" : "yes",
   "num_columns" : "2",
   "show_titles" : "no"
};

function loadSettings() {
   try {
      let str = window.localStorage.getItem(appName);
      if (str !== null && str != "") {
         return JSON.parse(str);
      }
   } catch (e) {
    // do nothing
   }
   return defaultSettings;
}

function saveSettings(settings) {
   try {
      window.localStorage.setItem(appName, JSON.stringify(settings));
   } catch (e) {
      // do nothing
   }
}
