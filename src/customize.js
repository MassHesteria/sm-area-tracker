const inputValues = [
   "select_mode",
   "show_bosses",
   "show_counts",
   "num_columns",
   "num_majors",
   "show_titles",
   "font_size",
   "crateria_portal_name_01",
   "crateria_portal_name_02",
   "crateria_portal_name_03",
   "crateria_portal_name_04",
   "crateria_portal_name_05",
   "greenBrin_portal_name_01",
   "greenBrin_portal_name_02",
   "greenBrin_portal_name_03",
   "redBrin_portal_name_01",
   "redBrin_portal_name_02",
   "redBrin_portal_name_03",
   "redBrin_portal_name_04",
   "redBrin_portal_name_05",
   "redBrin_portal_name_06",
   "westMaridia_portal_name_01",
   "westMaridia_portal_name_02",
   "westMaridia_portal_name_03",
   "westMaridia_portal_name_04",
   "upperNorfair_portal_name_01",
   "upperNorfair_portal_name_02",
   "upperNorfair_portal_name_03",
   "upperNorfair_portal_name_04",
   "upperNorfair_portal_name_05",
   "croc_portal_name",
   "kraid_portal_name",
   "lowerNorfair_portal_name_01",
   "lowerNorfair_portal_name_02",
   "wreckedShip_portal_name_01",
   "wreckedShip_portal_name_02",
   "eastMaridia_portal_name_01",
   "eastMaridia_portal_name_02",
   "tourian_portal_name",
   "crateriaColor",
   "greenBrinstarColor",
   "redBrinstarColor",
   "westMaridiaColor",
   "upperNorfairColor",
   "crocColor",
   "kraidColor",
   "lowerNorfairColor",
   "wreckedShipColor",
   "eastMaridiaColor",
];

const colorPickerElements = [
   "crateriaColor",
   "greenBrinstarColor",
   "redBrinstarColor",
   "westMaridiaColor",
   "upperNorfairColor",
   "crocColor",
   "kraidColor",
   "lowerNorfairColor",
   "wreckedShipColor",
   "eastMaridiaColor",
];

function initialize() {
   displaySettings(loadSettings());
   colorPickerElements.forEach((i) => {
      updateColorPicker(i);
   });
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
   colorPickerElements.forEach((i) => {
      updateColorPicker(i);
   });
}

function saveChanges() {
   settings = loadSettings();

   inputValues.forEach((i) => {
      var item = document.getElementById(i);
      settings[i] = item.value;
   });

   saveSettings(settings);
}

function updateColorPicker(elementID) {
   //Change the color of the picker to reflect the user's selection
   element = document.getElementById(elementID);
   element.className = "select_color_picker " + element.value;
}
