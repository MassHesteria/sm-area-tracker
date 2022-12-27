const appName = "sm-area-tracker";
const defaultSettings = {
   select_mode: "left",
   show_bosses: "yes",
   show_counts: "yes",
   num_columns: "2",
   show_titles: "yes",
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
