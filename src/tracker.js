firstOfPair = null;

const createWithClass = (tagName, className) => {
   let element = document.createElement(tagName);
   element.classList.add(className);
   return element;
};

const initialize = (body) => {
   this.oncontextmenu = function (e) {
      return false;
   };

   let settings = loadSettings();
   let showBosses = settings.show_bosses == "yes";
   let selectMode = settings.select_mode;
   let showTitles = settings.show_titles == "yes";
   let showCounts = settings.show_counts;

   const addArea = (
      zoneTitle,
      listName,
      className,
      showBosses,
      portals,
      zoneColor
   ) => {
      let listObj = document.getElementById(listName);

      addDropdowns(
         zoneTitle,
         listObj,
         className,
         showCounts,
         showTitles,
         showBosses
      );
      portals.forEach((p) => {
         addEntry(listObj, zoneColor, p, selectMode);
      });
   };

   updateInstructions(selectMode);

   addArea(
      "Crateria",
      "sub1",
      "crateria",
      false,
      [
         settings.crateria_portal_name_01,
         settings.crateria_portal_name_02,
         settings.crateria_portal_name_03,
         settings.crateria_portal_name_04,
         settings.crateria_portal_name_05
      ],
      settings.crateriaColor
   );

   addArea(
      "Green Brinstar",
      "sub1",
      "greenBrinstar",
      false,
      [
         settings.greenBrin_portal_name_01,
         settings.greenBrin_portal_name_02,
         settings.greenBrin_portal_name_03
      ],
      settings.greenBrinstarColor
   );

   let redBrinSub = settings.num_columns == 3 ? "sub2" : "sub1";
   addArea(
      "Red Brinstar",
      redBrinSub,
      "redBrinstar",
      false,
      [
         settings.redBrin_portal_name_01,
         settings.redBrin_portal_name_02,
         settings.redBrin_portal_name_03,
         settings.redBrin_portal_name_04,
         settings.redBrin_portal_name_05,
         settings.redBrin_portal_name_06
      ],
      settings.redBrinstarColor
   );

   addArea(
      "West Maridia",
      "sub1",
      "westMaridia",
      false,
      [
         settings.westMaridia_portal_name_01,
         settings.westMaridia_portal_name_02,
         settings.westMaridia_portal_name_03,
         settings.westMaridia_portal_name_04
      ],
      settings.westMaridiaColor
   );

   addArea(
      "Upper Norfair",
      "sub2",
      "upperNorfair",
      false,
      [
         settings.upperNorfair_portal_name_01,
         settings.upperNorfair_portal_name_02,
         settings.upperNorfair_portal_name_03,
         settings.upperNorfair_portal_name_04,
         settings.upperNorfair_portal_name_05
      ],
      settings.upperNorfairColor
   );

   addArea(
      "Crocomire",
      "sub2",
      "crocomire",
      false,
      [settings.croc_portal_name],
      settings.crocColor
   );

   const bossSub = settings.num_columns == 3 ? "sub3" : "sub2";

   addArea(
      "Kraid's Lair",
      bossSub,
      "kraidsLair",
      showBosses,
      [settings.kraid_portal_name],
      settings.kraidColor
   );

   addArea(
      "Lower Norfair",
      bossSub,
      "lowerNorfair",
      showBosses,
      [
         settings.lowerNorfair_portal_name_01,
         settings.lowerNorfair_portal_name_02
      ],
      settings.lowerNorfairColor
   );

   addArea(
      "Wrecked Ship",
      bossSub,
      "wreckedShip",
      showBosses,
      [
         settings.wreckedShip_portal_name_01,
         settings.wreckedShip_portal_name_02
      ],
      settings.wreckedShipColor
   );

   addArea(
      "East Maridia",
      bossSub,
      "eastMaridia",
      showBosses,
      [
         settings.eastMaridia_portal_name_01,
         settings.eastMaridia_portal_name_02
      ],
      settings.eastMaridiaColor
   );

   let masterList = document.getElementById(bossSub);
   masterList.appendChild(createWithClass("div", "spacer"));

   addEntry(masterList, "tourian", settings.tourian_portal_name, selectMode);
   addCounter(bossSub);

   body.addEventListener("click", removeSelectionClick);
   body.addEventListener("keydown", removeSelectionKey);

   if (showCounts != "none") {
      updateCounter();
   }
};

function removeSelectionClick(event) {
   const isPortal = event.target.classList.contains("portal");
   if (!isPortal) {
      removeSelection();
   }
}
function removeSelectionKey(event) {
   if (event.key === "Escape") {
      removeSelection();
   }
}

function removeSelection() {
   if (firstOfPair !== null) {
      firstOfPair.style = "";
      firstOfPair = null;
   }
}

let getNumItems = (zone, type) => {
   const zoneTotal = document.getElementById(`${zone}_${type}_total`);
   const zoneValue = parseInt(zoneTotal.value);
   if (isNaN(zoneValue)) {
      return 0;
   } else {
      return zoneValue;
   }
};

function addCounter(listName) {
   let masterList = document.getElementById(listName);
   let newCounter = document.createElement("li");

   newCounter.id = "master_item_counter";
   newCounter.style = "display: none";
   masterList.appendChild(newCounter);
}

function updateCounter() {
   const zones = [
      "crateria",
      "greenBrinstar",
      "redBrinstar",
      "westMaridia",
      "upperNorfair",
      "crocomire",
      "kraidsLair",
      "lowerNorfair",
      "wreckedShip",
      "eastMaridia",
   ];

   knownItems = 0;
   zones.forEach((i) => {
      knownItems += getNumItems(i, "major");
   });

   const settings = loadSettings();
   const theCounter = document.getElementById("master_item_counter");
   theCounter.style = "";
   theCounter.innerHTML = `Majors: ${settings.num_majors - knownItems}`;
}

function addDropdowns(
   zoneTitle,
   masterList,
   zoneName,
   showCounts,
   showTitles,
   showBoss
) {
   let newItem = createWithClass("li", "dropdowns");

   let addOption = (item, option, selected) => {
      let newOption = document.createElement("option");
      newOption.value = option;
      newOption.innerText = option;

      if (selected) {
         newOption.selected = true;
      }
      item.appendChild(newOption);
   };

   let createSelect = (type) => {
      // Generate the names for the new elements
      const zone_left = `${zoneName}_${type}_left`;
      const zone_total = `${zoneName}_${type}_total`;

      // Add the item counter for the zone
      let newSelect = createWithClass("select", "total");
      newSelect.name = zone_total;
      newSelect.id = zone_total;
      newSelect.title =
         "Select the number of majors in this area " +
         "[useful for Full Countdown]";

      // Respond to changing the selected value
      newSelect.onchange = () => {
         updateCounter();

         let zoneItems = getNumItems(zoneName, type);
         let zoneButton = document.getElementById(zone_left);
         let zoneTotal = document.getElementById(zone_total);
         if (zoneItems > 0) {
            zoneButton.style = "";
            zoneButton.value = zoneItems;
            zoneButton.innerHtml = zoneItems;
            zoneTotal.style = "opacity: 0.5";
         } else {
            zoneButton.style = "display: none";
            zoneTotal.style = "opacity: 1.0";
         }
      };

      addOption(newSelect, "", true);
      for (let i = 0; i < 10; i++) {
         addOption(newSelect, i, false);
      }

      return newSelect;
   }

   let counterButtons = createWithClass("div", "cb");
   if (showCounts != "none") {
      let newLabel = createWithClass("label", "counter");
      newLabel.htmlFor = `${zoneName}_major_total`;
      newLabel.innerHTML = "M";
      counterButtons.appendChild(newLabel);
      counterButtons.appendChild(createSelect("major"));
   }

   let tankButtons = createWithClass("div", "cb");
   if (showCounts == "both") {
      let newLabel = createWithClass("label", "counter");
      newLabel.htmlFor = `${zoneName}_tank_total`;
      newLabel.innerHTML = "E";
      tankButtons.appendChild(newLabel);
      tankButtons.appendChild(createSelect("tank"));
   }

   const createButton = (type) => {
      const zone_left = `${zoneName}_${type}_left`;
      // Add the button to decrement the zone items left
      let newButton = createWithClass("input", "counter");
      newButton.type = "button";
      newButton.name = zone_left;
      newButton.id = zone_left;
      newButton.style = "display: none";
      newButton.title =
         "Number of majors remaining in area\n\n" +
         "Left click to decrease, right click to increase";

      // Decrement the number on the button when left clicked
      newButton.onclick = () => {
         let zoneButton = document.getElementById(zone_left);
         let btnValue = parseInt(zoneButton.value);

         if (btnValue > 0) {
            zoneButton.value = btnValue - 1;
            zoneButton.innerHtml = btnValue - 1;
         }
      };

      // Increment the number on the button when right clicked
      newButton.onauxclick = (e) => {
         if (e.button == 2) {
            let zoneButton = document.getElementById(zone_left);
            let btnValue = parseInt(zoneButton.value);
            let zoneItems = getNumItems(zoneName, type);
            if (btnValue < zoneItems) {
               zoneButton.value = btnValue + 1;
               zoneButton.innerHtml = btnValue + 1;
            }
         }
      };
      return newButton;
   }

   if (showCounts != "none") {
      counterButtons.appendChild(createButton("major"));
   }
   newItem.appendChild(counterButtons);
   if (showCounts == "both") {
      tankButtons.appendChild(createButton("tank"));
      newItem.appendChild(tankButtons);
   }

   let zt = createWithClass("div", "zt");
   if (showTitles && showCounts != "both") {
      zt.innerText = zoneTitle;
   }
   newItem.appendChild(zt);

   if (showBoss) {
      const settings = loadSettings();
      let bossSelect = createWithClass("select", "boss");
      bossSelect.name = zoneName + "_boss";
      bossSelect.id = zoneName + "_boss";
      bossSelect.title =
         "Select the boss found in this area " +
         "[useful for randomized bosses]";
      addOption(bossSelect, "", true);
      addOption(bossSelect, "K", false);
      addOption(bossSelect, "P", false);
      addOption(bossSelect, "D", false);
      addOption(bossSelect, "R", false);

      bossSelect.onchange = (e) => {
         e.target.classList.remove(
            settings.wreckedShipColor,
            settings.eastMaridiaColor,
            settings.kraidColor,
            settings.lowerNorfairColor
         );
         if (e.target.value == "K") {
            e.target.classList.add(settings.kraidColor);
         } else if (e.target.value == "P") {
            e.target.classList.add(settings.wreckedShipColor);
         } else if (e.target.value == "D") {
            e.target.classList.add(settings.eastMaridiaColor);
         } else if (e.target.value == "R") {
            e.target.classList.add(settings.lowerNorfairColor);
         }
      };
      newItem.appendChild(bossSelect);
   }

   masterList.appendChild(newItem);

   if (showTitles) {
      masterList.appendChild(createWithClass("li", "area_border"));
   }
}

function addEntry(masterList, className, name, mode) {
   let newPair = document.createElement("li");

   let newEntry = createWithClass("div", "portal");
   newEntry.innerText = name;
   newEntry.classList.add(className);

   if (mode == "left") {
      newEntry.onclick = function (e) {
         if (firstOfPair !== null) {
            selectItem(newEntry);
         } else {
            firstOfPair = newEntry;
            firstOfPair.style = "outline: 4px solid blue; outline-offset: -4px";
         }
      };
   } else {
      newEntry.onclick = function (e) {
         selectItem(newEntry);
      };
      newEntry.onauxclick = function (e) {
         if (e.button == 2) {
            if (firstOfPair !== null) {
               firstOfPair.style = null;
            }

            firstOfPair = newEntry;
            firstOfPair.style = "outline: 4px solid blue; outline-offset: -4px";
         }
      };
   }

   newPair.appendChild(newEntry);
   masterList.appendChild(newPair);
}

function setPair(src, dst) {
   // Grab the parent list item of the src portal
   let theParent = src.parentNode;

   // Stop drawing the selection border around the src portal
   src.style = null;

   // Remove all portals other than the src from the parent
   while (theParent.children.length > 1) {
      let pairedPortalName = theParent.lastChild.innerText;
      theParent.removeChild(theParent.lastChild);
      //Remove the pairing from the other side of the portal so the data stays in sync
      let portals = document.getElementsByClassName("portal");
      for (let i = 0; i < portals.length; i++) {
         let portal = portals[i];
         if (portal.innerText === pairedPortalName) {
            let otherParent = portal.parentNode;
            otherParent.removeChild(otherParent.lastChild);
         }
      }
   }

   // Are the src and dst the same? All done
   if (src == dst) {
      return;
   }

   // Put a copy of the dst next to the src
   let clonedNode = dst.cloneNode(true);
   theParent.appendChild(clonedNode);
}

function selectItem(src) {
   if (firstOfPair !== null) {
      setPair(firstOfPair, src);

      if (firstOfPair !== src) {
         setPair(src, firstOfPair);
      }

      firstOfPair = null;
      return;
   }
}

function updateInstructions(mode) {
   let instDiv = document.getElementById("instructions");
   instDiv.innerHTML =
      "<u>" +
      (mode == "left" ? "Left" : "Right") +
      " click</u> to select first portal " +
      "<u>then left click</u> another portal to link them " +
      '<a href="customize.htm">CUSTOMIZE</a>';
}
