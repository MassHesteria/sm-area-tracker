firstOfPair = null;
itemCounter = 16;

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
   let showCounts = settings.show_counts == "yes";
   let crateriaPortal_01 = settings.crateria_portal_name_01;
   let crateriaPortal_02 = settings.crateria_portal_name_02;
   let crateriaPortal_03 = settings.crateria_portal_name_03;
   let crateriaPortal_04 = settings.crateria_portal_name_04;
   let crateriaPortal_05 = settings.crateria_portal_name_05;
   let greenBrinPortal_01 = settings.greenBrin_portal_name_01;
   let greenBrinPortal_02 = settings.greenBrin_portal_name_02;
   let greenBrinPortal_03 = settings.greenBrin_portal_name_03;
   let redBrinPortal_01 = settings.redBrin_portal_name_01;
   let redBrinPortal_02 = settings.redBrin_portal_name_02;
   let redBrinPortal_03 = settings.redBrin_portal_name_03;
   let redBrinPortal_04 = settings.redBrin_portal_name_04;
   let redBrinPortal_05 = settings.redBrin_portal_name_05;
   let redBrinPortal_06 = settings.redBrin_portal_name_06;
   let westMaridiaPortal_01 = settings.westMaridia_portal_name_01;
   let westMaridiaPortal_02 = settings.westMaridia_portal_name_02;
   let westMaridiaPortal_03 = settings.westMaridia_portal_name_03;
   let westMaridiaPortal_04 = settings.westMaridia_portal_name_04;
   let upperNorfairPortal_01 = settings.upperNorfair_portal_name_01;
   let upperNorfairPortal_02 = settings.upperNorfair_portal_name_02;
   let upperNorfairPortal_03 = settings.upperNorfair_portal_name_03;
   let upperNorfairPortal_04 = settings.upperNorfair_portal_name_04;
   let upperNorfairPortal_05 = settings.upperNorfair_portal_name_05;
   let crocPortal = settings.croc_portal_name;
   let kraidPortal = settings.kraid_portal_name;
   let lowerNorfairPortal_01 = settings.lowerNorfair_portal_name_01;
   let lowerNorfairPortal_02 = settings.lowerNorfair_portal_name_02;
   let wreckedShipPortal_01 = settings.wreckedShip_portal_name_01;
   let wreckedShipPortal_02 = settings.wreckedShip_portal_name_02;
   let eastMaridiaPortal_01 = settings.eastMaridia_portal_name_01;
   let eastMaridiaPortal_02 = settings.eastMaridia_portal_name_02;
   let tourianPortal = settings.tourian_portal_name;

   const addArea = (
      zoneTitle,
      listName,
      className,
      showBosses,
      portals,
      zoneColor
   ) => {
      var listObj = document.getElementById(listName);

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
         crateriaPortal_01,
         crateriaPortal_02,
         crateriaPortal_03,
         crateriaPortal_04,
         crateriaPortal_05,
      ],
      settings.crateriaColor
   );

   addArea(
      "Green Brinstar",
      "sub1",
      "greenBrinstar",
      false,
      [greenBrinPortal_01, greenBrinPortal_02, greenBrinPortal_03],
      settings.greenBrinstarColor
   );

   let redBrinSub = settings.num_columns == 3 ? "sub2" : "sub1";
   addArea(
      "Red Brinstar",
      redBrinSub,
      "redBrinstar",
      false,
      [
         redBrinPortal_01,
         redBrinPortal_02,
         redBrinPortal_03,
         redBrinPortal_04,
         redBrinPortal_05,
         redBrinPortal_06,
      ],
      settings.redBrinstarColor
   );

   addArea(
      "West Maridia",
      "sub1",
      "westMaridia",
      false,
      [
         westMaridiaPortal_01,
         westMaridiaPortal_02,
         westMaridiaPortal_03,
         westMaridiaPortal_04,
      ],
      settings.westMaridiaColor
   );

   addArea(
      "Upper Norfair",
      "sub2",
      "upperNorfair",
      false,
      [
         upperNorfairPortal_01,
         upperNorfairPortal_02,
         upperNorfairPortal_03,
         upperNorfairPortal_04,
         upperNorfairPortal_05,
      ],
      settings.upperNorfairColor
   );

   addArea(
      "Crocomire",
      "sub2",
      "crocomire",
      false,
      [crocPortal],
      settings.crocColor
   );

   const bossSub = settings.num_columns == 3 ? "sub3" : "sub2";

   addArea(
      "Kraid's Lair",
      bossSub,
      "kraidsLair",
      showBosses,
      [kraidPortal],
      settings.kraidColor
   );

   addArea(
      "Lower Norfair",
      bossSub,
      "lowerNorfair",
      showBosses,
      [lowerNorfairPortal_01, lowerNorfairPortal_02],
      settings.lowerNorfairColor
   );

   addArea(
      "Wrecked Ship",
      bossSub,
      "wreckedShip",
      showBosses,
      [wreckedShipPortal_01, wreckedShipPortal_02],
      settings.wreckedShipColor
   );

   addArea(
      "East Maridia",
      bossSub,
      "eastMaridia",
      showBosses,
      [eastMaridiaPortal_01, eastMaridiaPortal_02],
      settings.eastMaridiaColor
   );

   var masterList = document.getElementById(bossSub);
   masterList.appendChild(createWithClass("div", "spacer"));

   addEntry(masterList, "tourian", tourianPortal, selectMode);
   addCounter(bossSub);

   body.addEventListener("click", removeSelectionClick);
   body.addEventListener("keydown", removeSelectionKey);
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

let getNumItems = (zone) => {
   var zoneTotal = document.getElementById(zone + "_total");
   let zoneValue = parseInt(zoneTotal.value);
   if (isNaN(zoneValue)) {
      return 0;
   } else {
      return zoneValue;
   }
};

let hasNumItems = (zone) => {
   var zoneTotal = document.getElementById(zone + "_total");
   let zoneValue = parseInt(zoneTotal.value);
   return !isNaN(zoneValue);
};

function addCounter(listName) {
   var masterList = document.getElementById(listName);
   var newCounter = document.createElement("li");

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
   hasItems = false;
   zones.forEach((i) => {
      knownItems += getNumItems(i);
      hasItems |= hasNumItems(i);
   });

   var theCounter = document.getElementById("master_item_counter");

   if (hasItems) {
      theCounter.style = "";
      theCounter.innerHTML =
         "Unknown:&nbsp;&nbsp;" + (itemCounter - knownItems);
   } else {
      theCounter.style = "display: none";
   }
}

function addDropdowns(
   zoneTitle,
   masterList,
   zoneName,
   showCounts,
   showTitles,
   showBoss
) {
   var newItem = createWithClass("li", "dropdowns");

   let addOption = (item, option, selected) => {
      var newOption = document.createElement("option");
      newOption.value = option;
      newOption.innerText = option;

      if (selected) {
         newOption.selected = true;
      }
      item.appendChild(newOption);
   };

   // Add the item counter for the zone
   var newSelect = createWithClass("select", "total");
   newSelect.name = zoneName + "_total";
   newSelect.id = zoneName + "_total";
   newSelect.title =
      "Select the number of majors in this area " +
      "[useful for Full Countdown]";

   // Respond to changing the selected value
   newSelect.onchange = () => {
      updateCounter();

      var zoneItems = getNumItems(zoneName);
      var zoneButton = document.getElementById(zoneName + "_left");
      var zoneTotal = document.getElementById(zoneName + "_total");
      if (zoneItems > 0) {
         zoneButton.style = "";
         zoneButton.value = zoneItems;
         zoneButton.innerHtml = zoneItems;
         zoneTotal.style = "opacity: 60%";
      } else {
         zoneButton.style = "display: none";
         zoneTotal.style = "opacity: 100%";
      }
   };

   // Add options to the dropdown
   addOption(newSelect, "", true);
   for (var i = 0; i < 10; i++) {
      addOption(newSelect, i, false);
   }

   var counterButtons = createWithClass("div", "cb");

   if (showCounts) {
      counterButtons.appendChild(newSelect);
   }

   // Add the button to decrement the zone items left
   var newButton = createWithClass("input", "counter");
   newButton.type = "button";
   newButton.name = zoneName + "_left";
   newButton.id = zoneName + "_left";
   newButton.style = "display: none";
   newButton.title =
      "Number of majors remaining in area\n\n" +
      "Left click to decrease, right click to increase";

   // Decrement the number on the button when left clicked
   newButton.onclick = () => {
      var zoneButton = document.getElementById(zoneName + "_left");
      var btnValue = parseInt(zoneButton.value);

      if (btnValue > 0) {
         zoneButton.value = btnValue - 1;
         zoneButton.innerHtml = btnValue - 1;
      }
   };

   // Increment the number on the button when right clicked
   newButton.onauxclick = (e) => {
      if (e.button == 2) {
         var zoneButton = document.getElementById(zoneName + "_left");
         var btnValue = parseInt(zoneButton.value);
         var zoneItems = getNumItems(zoneName);
         if (btnValue < zoneItems) {
            zoneButton.value = btnValue + 1;
            zoneButton.innerHtml = btnValue + 1;
         }
      }
   };

   if (showCounts) {
      counterButtons.appendChild(newButton);
   }
   newItem.appendChild(counterButtons);

   var zt = createWithClass("div", "zt");
   if (showTitles) {
      zt.innerText = zoneTitle;
   }
   newItem.appendChild(zt);

   if (showBoss) {
      var bossSelect = createWithClass("select", "boss");
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
            "wrecked_ship",
            "east_maridia",
            "kraids_lair",
            "lower_norfair"
         );
         if (e.target.value == "K") {
            e.target.classList.add("kraids_lair");
         } else if (e.target.value == "P") {
            e.target.classList.add("wrecked_ship");
         } else if (e.target.value == "D") {
            e.target.classList.add("east_maridia");
         } else if (e.target.value == "R") {
            e.target.classList.add("lower_norfair");
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
   var newPair = document.createElement("li");

   var newEntry = createWithClass("div", "portal");
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
   var theParent = src.parentNode;

   // Stop drawing the selection border around the src portal
   src.style = null;

   // Remove all portals other than the src from the parent
   while (theParent.children.length > 1) {
      var pairedPortalName = theParent.lastChild.innerText;
      theParent.removeChild(theParent.lastChild);
      //Remove the pairing from the other side of the portal so the data stays in sync
      var portals = document.getElementsByClassName("portal");
      for (let i = 0; i < portals.length; i++) {
         var portal = portals[i];
         if (portal.innerText === pairedPortalName) {
            var otherParent = portal.parentNode;
            otherParent.removeChild(otherParent.lastChild);
         }
      }
   }

   // Are the src and dst the same? All done
   if (src == dst) {
      return;
   }

   // Put a copy of the dst next to the src
   var clonedNode = dst.cloneNode(true);
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
