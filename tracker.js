firstOfPair = null;
itemCounter = 16;

function initialize(body) {
   this.oncontextmenu = function(e) {
      return false;
   }

   let settings = loadSettings();
   let showBosses = settings.show_bosses == "yes";
   let selectMode = settings.select_mode;

   if (settings.show_header == "yes") {
      updateInstructions(selectMode);
   }

   addDropdowns('sub1','blue_brinstar',false);
   addEntry('sub1','blue_brinstar', 'Retro PBs', selectMode);
   addEntry('sub1', 'blue_brinstar', 'G4', selectMode);
   addEntry('sub1', 'blue_brinstar', 'Kago', selectMode);
   addEntry('sub1', 'blue_brinstar', 'Crab', selectMode);
   addEntry('sub1', 'blue_brinstar', 'Moat', selectMode);
   addSpacer('sub1');

   addDropdowns('sub1','green_hills',false);
   addEntry('sub1', 'green_hills', 'Green Elevator', selectMode);
   addEntry('sub1', 'green_hills', 'Green Hills', selectMode);
   addEntry('sub1', 'green_hills', 'Noob Bridge', selectMode);
   addSpacer('sub1');

   addDropdowns('sub1','red_brinstar',false);
   addEntry('sub1', 'red_brinstar', 'Red Elevator', selectMode);
   addEntry('sub1', 'red_brinstar', 'Maridia Escape', selectMode);
   addEntry('sub1', 'red_brinstar', 'Red Tower', selectMode);
   addEntry('sub1', 'red_brinstar', 'Tube', selectMode);
   addEntry('sub1', 'red_brinstar', 'Above Kraid', selectMode);
   addEntry('sub1', 'red_brinstar', 'Kraid Entry', selectMode);
   addSpacer('sub1');

   addDropdowns('sub1','west_maridia',false);
   addEntry('sub1','west_maridia', 'Red Fish', selectMode);
   addEntry('sub1','west_maridia', 'PreAqueduct', selectMode);
   addEntry('sub1','west_maridia', 'Main Street', selectMode);
   addEntry('sub1','west_maridia', 'Map Station', selectMode);

   addDropdowns('sub2','upper_norfair',false);
   addEntry('sub2','upper_norfair', 'Elevator Entry', selectMode);
   addEntry('sub2','upper_norfair', 'Kraid Mouth', selectMode);
   addEntry('sub2','upper_norfair', 'Croc Entry', selectMode);
   addEntry('sub2','upper_norfair', 'Single Chamber', selectMode);
   addEntry('sub2','upper_norfair', 'Lava Dive', selectMode);
   addSpacer('sub2');

   addDropdowns('sub2','crocomire',false);
   addEntry('sub2','crocomire', 'Croc Exit', selectMode);
   addSpacer('sub2');
   addSpacer('sub2');
   addSpacer('sub2');

   addDropdowns('sub2','kraids_lair',showBosses);
   addEntry('sub2','kraids_lair', "Kraid's Lair", selectMode);
   addSpacer('sub2');

   addDropdowns('sub2','lower_norfair',showBosses);
   addEntry('sub2','lower_norfair', 'Ridley Mouth', selectMode);
   addEntry('sub2','lower_norfair', '3 Musketeers', selectMode);
   addSpacer('sub2');

   addDropdowns('sub2','wrecked_ship',showBosses);
   addEntry('sub2','wrecked_ship', 'Ocean', selectMode);
   addEntry('sub2','wrecked_ship', 'WS Exit', selectMode);
   addSpacer('sub2');

   addDropdowns('sub2','east_maridia',showBosses);
   addEntry('sub2','east_maridia', 'Aqueduct', selectMode);
   addEntry('sub2','east_maridia', 'Highway', selectMode);
   addSpacer('sub2');

   addEntry('sub2','tourian', 'Tourian', selectMode);
   addCounter('sub2');
}

let getNumItems = (zone) => {
   var zoneTotal = document.getElementById(zone+'_total');
   let zoneValue = parseInt(zoneTotal.value);
   if (isNaN(zoneValue)) {
      return 0;
   } else {
      return zoneValue;
   }
}

let hasNumItems = (zone) => {
   var zoneTotal = document.getElementById(zone+'_total');
   let zoneValue = parseInt(zoneTotal.value);
   return !isNaN(zoneValue);
}

function addCounter(listName) {
   var masterList = document.getElementById(listName);
   var newCounter = document.createElement("li");

   newCounter.id = 'master_item_counter';
   newCounter.style = 'display: none';
   masterList.appendChild(newCounter);
}

function updateCounter() {
   const zones = ['blue_brinstar','green_hills','red_brinstar','west_maridia','upper_norfair',
                  'crocomire','kraids_lair','lower_norfair','wrecked_ship','east_maridia'];

   knownItems = 0;
   hasItems = false;
   zones.forEach((i) => {
      knownItems += getNumItems(i);
      hasItems |= hasNumItems(i);
   });

   var theCounter = document.getElementById('master_item_counter');

   if (hasItems) {
      theCounter.style = '';
      theCounter.innerHTML = "Unknown:&nbsp;&nbsp;" + (itemCounter - knownItems);
   } else {
      theCounter.style = 'display: none';
   }
}

function addDropdowns(listName,zoneName,showBoss) {
   var masterList = document.getElementById(listName);
   var newItem = document.createElement("li");
   newItem.classList.add('dropdowns');

   let addOption = (item,option,selected) => {
      var newOption = document.createElement("option");
      newOption.value = option;
      newOption.innerText = option;

      if (selected) {
         newOption.selected = true;
      }
      item.appendChild(newOption);
   }

   // Add the item counter for the zone
   var newSelect = document.createElement("select");
   newSelect.name = zoneName+'_total';
   newSelect.id = zoneName+'_total';
   newSelect.classList.add('total');
   newSelect.title = 'Select the number of majors in this area ' +
      '[useful for Full Countdown]';

   // Respond to changing the selected value
   newSelect.onchange = () => {
      updateCounter();

      var zoneItems = getNumItems(zoneName);
      var zoneButton = document.getElementById(zoneName+'_left');
      var zoneTotal = document.getElementById(zoneName+'_total');
      if (zoneItems > 0) {
         zoneButton.style = '';
         zoneButton.value = zoneItems;
         zoneButton.innerHtml = zoneItems;
         zoneTotal.style = 'opacity: 60%';
      } else {
         zoneButton.style = 'display: none';
         zoneTotal.style = 'opacity: 100%';
      }
   };

   // Add options to the dropdown
   addOption(newSelect,'',true);
   for (var i = 0; i < 10; i++) {
      addOption(newSelect,i,false);
   }
   newItem.appendChild(newSelect);

   // Add the button to decrement the zone items left
   var newButton = document.createElement("input");
   newButton.type = 'button';
   newButton.name = zoneName+'_left';
   newButton.id = zoneName+'_left';
   newButton.classList.add('counter');
   newButton.style = 'display: none';
   newButton.title = 'Number of majors remaining in area\n\n' +
      'Left click to decrease, right click to increase';

   // Decrement the number on the button when left clicked
   newButton.onclick = () => {
      var zoneButton = document.getElementById(zoneName+'_left');
      var btnValue = parseInt(zoneButton.value);

      if (btnValue > 0) {
         zoneButton.value = btnValue - 1;
         zoneButton.innerHtml = (btnValue - 1);
      }
   };

   // Increment the number on the button when right clicked
   newButton.onauxclick = (e) => {
      if (e.button == 2) {
         var zoneButton = document.getElementById(zoneName+'_left');
         var btnValue = parseInt(zoneButton.value);
         var zoneItems = getNumItems(zoneName);
         if (btnValue < zoneItems) {
            zoneButton.value = btnValue + 1;
            zoneButton.innerHtml = (btnValue + 1);
         }
      }
   };
   newItem.appendChild(newButton);

   if (showBoss) {
      var bossSelect = document.createElement("select");
      bossSelect.name = zoneName + '_boss';
      bossSelect.id = zoneName + '_boss';
      bossSelect.classList.add('boss');
      bossSelect.title = 'Select the boss found in this area ' +
         '[useful for randomized bosses]';
      addOption(bossSelect,'',true);
      addOption(bossSelect,'K',false);
      addOption(bossSelect,'P',false);
      addOption(bossSelect,'D',false);
      addOption(bossSelect,'R',false);

      bossSelect.onchange = (e) => {
         e.target.classList.remove('wrecked_ship','east_maridia',
                                   'kraids_lair','lower_norfair');
         if (e.target.value == 'K') {
            e.target.classList.add('kraids_lair');
         } else if (e.target.value == 'P') {
            e.target.classList.add('wrecked_ship');
         } else if (e.target.value == 'D') {
            e.target.classList.add('east_maridia');
         } else if (e.target.value == 'R') {
            e.target.classList.add('lower_norfair');
         }
      }
      newItem.appendChild(bossSelect);
   }

   masterList.appendChild(newItem);
}

function addSpacer(listName) {
   var masterList = document.getElementById(listName);
   var newSpacer = document.createElement("li");
   newSpacer.style = "height: 10px";
   masterList.appendChild(newSpacer);
}

function addEntry(listName,className,name,mode) {
   var masterList = document.getElementById(listName);
   var newPair = document.createElement("li");

   var newEntry = document.createElement("div");

   newEntry.innerText = name;
   newEntry.classList.add("portal", className);

   if (mode == "left") {
      newEntry.onclick = function(e) {
         if (firstOfPair !== null) {
            selectItem(newEntry);
         } else {
            firstOfPair = newEntry;
            firstOfPair.style = "border-width: 4px; border-style: solid; border-color: blue";
         }
      }
   } else {
      newEntry.onclick = function(e) {
         selectItem(newEntry);
      }
      newEntry.onauxclick = function(e) {
         if (e.button == 2) {

            if (firstOfPair !== null) {
               firstOfPair.style = null;
            }

            firstOfPair = newEntry;
            firstOfPair.style = "border-width: 4px; border-style: solid; border-color: blue";
         }
      }
   }

   newPair.appendChild(newEntry);
   masterList.appendChild(newPair);
}

function setPair(src,dst) {

      // Grab the parent list item of the src portal
      var theParent = src.parentNode;

      // Stop drawing the selection border around the src portal
      src.style = null;

      // Remove all portals other than the src from the parent
      while (theParent.children.length > 1) {
         theParent.removeChild(theParent.lastChild);
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
      setPair(firstOfPair,src);

      if (firstOfPair !== src) {
         setPair(src,firstOfPair);
      }

      firstOfPair = null;
      return;
   }
}

function updateInstructions(mode) {
   let first = mode == "left" ? "Left" : "Right";
   let second = mode == "left" ? "right" : "left";

   var instDiv = document.getElementById('instructions');
   instDiv.innerHTML = '<u>' + first + ' click</u> to select first portal ' +
      '<u>then left click</u> another portal to link them ' +
      '<a href="customize.htm">CUSTOMIZE</a>';
}
