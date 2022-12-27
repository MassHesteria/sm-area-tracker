firstOfPair = null;
itemCounter = 16;

function initialize(body) {
   this.oncontextmenu = function (e) {
      return false;
   };

   let settings = loadSettings();
   let showBosses = settings.show_bosses == "yes";
   let selectMode = settings.select_mode;
   let showTitles = settings.show_titles == "yes";
   let showCounts = settings.show_counts == "yes";

   updateInstructions(selectMode);

   addArea(
      "Crateria",
      "sub1",
      "blue_brinstar",
      selectMode,
      showCounts,
      showTitles,
      false,
      ["Retro PBs", "G4", "Kago", "Crab", "Moat"]
   );

   addArea(
      "Green Brinstar",
      "sub1",
      "green_hills",
      selectMode,
      showCounts,
      showTitles,
      false,
      ["Green Elevator", "Green Hills", "Noob Bridge"]
   );

   let redBrinSub = settings.num_columns == 3 ? "sub2" : "sub1";
   addArea(
      "Red Brinstar",
      redBrinSub,
      "red_brinstar",
      selectMode,
      showCounts,
      showTitles,
      false,
      [
         "Red Elevator",
         "Maridia Escape",
         "Red Tower",
         "Tube",
         "Above Kraid",
         "Kraid Entry",
      ]
   );

   addArea(
      "West Maridia",
      "sub1",
      "west_maridia",
      selectMode,
      showCounts,
      showTitles,
      false,
      ["Red Fish", "PreAqueduct", "Main Street", "Map Station"]
   );

   addArea(
      "Upper Norfair",
      "sub2",
      "upper_norfair",
      selectMode,
      showCounts,
      showTitles,
      false,
      [
         "Elevator Entry",
         "Kraid Mouth",
         "Croc Entry",
         "Single Chamber",
         "Lava Dive",
      ]
   );

   addArea(
      "Crocomire",
      "sub2",
      "crocomire",
      selectMode,
      showCounts,
      showTitles,
      false,
      ["Croc Exit"]
   );

   let bossSub = settings.num_columns == 3 ? "sub3" : "sub2";

   addArea(
      "Kraid's Lair",
      bossSub,
      "kraids_lair",
      selectMode,
      showCounts,
      showTitles,
      showBosses,
      ["Kraid's Lair"]
   );

   addArea(
      "Lower Norfair",
      bossSub,
      "lower_norfair",
      selectMode,
      showCounts,
      showTitles,
      showBosses,
      ["Ridley Mouth", "3 Musketeers"]
   );

   addArea(
      "Wrecked Ship",
      bossSub,
      "wrecked_ship",
      selectMode,
      showCounts,
      showTitles,
      showBosses,
      ["Ocean", "WS Exit"]
   );

   addArea(
      "East Maridia",
      bossSub,
      "east_maridia",
      selectMode,
      showCounts,
      showTitles,
      showBosses,
      ["Aqueduct", "Highway"]
   );

   var masterList = document.getElementById(bossSub);
   addEntry(masterList, "tourian", "Tourian", selectMode);
   addCounter(bossSub);

   body.addEventListener("click", removeSelectionClick);
   body.addEventListener("keydown", removeSelectionKey);
}

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
      "blue_brinstar",
      "green_hills",
      "red_brinstar",
      "west_maridia",
      "upper_norfair",
      "crocomire",
      "kraids_lair",
      "lower_norfair",
      "wrecked_ship",
      "east_maridia",
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
   var newItem = document.createElement("li");
   newItem.classList.add("dropdowns");

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
   var newSelect = document.createElement("select");
   newSelect.name = zoneName + "_total";
   newSelect.id = zoneName + "_total";
   newSelect.classList.add("total");
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

   var counterButtons = document.createElement("div");
   counterButtons.classList.add("cb");

   if (showCounts) {
      counterButtons.appendChild(newSelect);
   }

   // Add the button to decrement the zone items left
   var newButton = document.createElement("input");
   newButton.type = "button";
   newButton.name = zoneName + "_left";
   newButton.id = zoneName + "_left";
   newButton.classList.add("counter");
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

   var zt = document.createElement("div");
   zt.classList.add("zt");
   if (showTitles) {
      zt.innerText = zoneTitle;
   }
   newItem.appendChild(zt);

   if (showBoss) {
      var bossSelect = document.createElement("select");
      bossSelect.name = zoneName + "_boss";
      bossSelect.id = zoneName + "_boss";
      bossSelect.classList.add("boss");
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
      var borderItem = document.createElement("li");
      borderItem.classList.add("area_border");
      masterList.appendChild(borderItem);
   }
}

function addEntry(masterList, className, name, mode) {
   var newPair = document.createElement("li");

   var newEntry = document.createElement("div");

   newEntry.innerText = name;
   newEntry.classList.add("portal", className);

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

function addArea(
   zoneTitle,
   listName,
   className,
   mode,
   showCounts,
   showTitles,
   showBosses,
   portals
) {
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
      addEntry(listObj, className, p, mode);
   });
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
   let first = mode == "left" ? "Left" : "Right";
   let second = mode == "left" ? "right" : "left";

   var instDiv = document.getElementById("instructions");
   instDiv.innerHTML =
      "<u>" +
      first +
      " click</u> to select first portal " +
      "<u>then left click</u> another portal to link them " +
      '<a href="customize.htm">CUSTOMIZE</a>';
}
