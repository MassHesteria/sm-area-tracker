const appName = "sm-area-tracker";
const defaultSettings = {
   select_mode: "left",
   show_bosses: "yes",
   show_counts: "yes",
   num_columns: "2",
   show_titles: "yes",
   crateria_portal_name_01: "Retro PBs",
   crateria_portal_name_02: "G4",
   crateria_portal_name_03: "Kago",
   crateria_portal_name_04: "Crab",
   crateria_portal_name_05: "Moat",
   greenBrin_portal_name_01: "Green Elevator",
   greenBrin_portal_name_02: "Green Hills",
   greenBrin_portal_name_03: "Noob Bridge",
   redBrin_portal_name_01: "Red Elevator",
   redBrin_portal_name_02: "Maridia Escape",
   redBrin_portal_name_03: "Red Tower",
   redBrin_portal_name_04: "Tube",
   redBrin_portal_name_05: "Above Kraid",
   redBrin_portal_name_06: "Kraid Entry",
   westMaridia_portal_name_01: "Red Fish",
   westMaridia_portal_name_02: "PreAqueduct",
   westMaridia_portal_name_03: "Main Street",
   westMaridia_portal_name_04: "Map Station",
   upperNorfair_portal_name_01: "Elevator Entry",
   upperNorfair_portal_name_02: "Kraid Mouth",
   upperNorfair_portal_name_03: "Croc Entry",
   upperNorfair_portal_name_04: "Single Chamber",
   upperNorfair_portal_name_05: "Lava Dive",
   croc_portal_name: "Croc Exit",
   kraid_portal_name: "Kraid's Lair",
   lowerNorfair_portal_name_01: "Ridley Mouth",
   lowerNorfair_portal_name_02: "3 Musketeers",
   wreckedShip_portal_name_01: "Ocean",
   wreckedShip_portal_name_02: "WS Exit",
   eastMaridia_portal_name_01: "Aqueduct",
   eastMaridia_portal_name_02: "Highway",
   tourian_portal_name: "Tourian",
   crateriaColor: "cyan",
   greenBrinstarColor: "limegreen",
   redBrinstarColor: "salmon",
   westMaridiaColor: "orange",
   upperNorfairColor: "grey",
   crocColor: "crimson",
   kraidColor: "pink",
   lowerNorfairColor: "white",
   wreckedShipColor: "yellow",
   eastMaridiaColor: "indigo",

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
