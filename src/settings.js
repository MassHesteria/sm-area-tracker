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

      // Found existing settings?
      if (str !== null && str != "") {
         let existing = JSON.parse(str);

         // Add entries to existing settings using the defaults
         // if new options were added.
         for (const key in defaultSettings) {
            if (!existing.hasOwnProperty(key)) {
               existing[key] = defaultSettings[key];
            }
         }

         return existing;
      }
   } catch (e) {
      // Do nothing.
   }
   return defaultSettings;
}

function saveSettings(settings) {
   try {
      // Make a copy of the keys on the current settings.
      const keys = [...Object.keys(settings)];

      // Remove any settings that are no longer supported.
      keys.forEach((p) => {
         if (!defaultSettings.hasOwnProperty(p)) {
            delete settings[p];
         }
      });

      // Save the settings to local storage.
      window.localStorage.setItem(appName, JSON.stringify(settings));
   } catch (e) {
      // Do nothing.
   }
}
