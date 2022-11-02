currentColumn = "";
columnCount = 0;
firstOfPair = null;
itemCounter = 16;

function initialize(body) {
   this.oncontextmenu = function(e) {
      return false;
   }

   addDropdowns('sub1','blue_brinstar',false);
   addEntry('sub1','blue_brinstar', 'Retro PBs');
   addEntry('sub1', 'blue_brinstar', 'G4');
   addEntry('sub1', 'blue_brinstar', 'Kago');
   addEntry('sub1', 'blue_brinstar', 'Crab');
   addEntry('sub1', 'blue_brinstar', 'Moat');
   addSpacer('sub1');

   addDropdowns('sub1','green_hills',false);
   addEntry('sub1', 'green_hills', 'Green Elevator');
   addEntry('sub1', 'green_hills', 'Green Hills');
   addEntry('sub1', 'green_hills', 'Noob Bridge');
   addSpacer('sub1');

   addDropdowns('sub1','red_brinstar',false);
   addEntry('sub1', 'red_brinstar', 'Red Elevator');
   addEntry('sub1', 'red_brinstar', 'Maridia Escape');
   addEntry('sub1', 'red_brinstar', 'Red Tower');
   addEntry('sub1', 'red_brinstar', 'Tube');
   addEntry('sub1', 'red_brinstar', 'Above Kraid');
   addEntry('sub1', 'red_brinstar', 'Kraid Entry');
   addSpacer('sub1');

   addDropdowns('sub1','west_maridia',false);
   addEntry('sub1','west_maridia', 'Red Fish');
   addEntry('sub1','west_maridia', 'PreAqueduct');
   addEntry('sub1','west_maridia', 'Main Street');
   addEntry('sub1','west_maridia', 'Map Station');

   addDropdowns('sub2','upper_norfair',false);
   addEntry('sub2','upper_norfair', 'Elevator Entry');
   addEntry('sub2','upper_norfair', 'Kraid Mouth');
   addEntry('sub2','upper_norfair', 'Croc Entry');
   addEntry('sub2','upper_norfair', 'Single Chamber');
   addEntry('sub2','upper_norfair', 'Lava Dive');
   addSpacer('sub2');

   addDropdowns('sub2','crocomire',false);
   addEntry('sub2','crocomire', 'Croc Exit');
   addSpacer('sub2');
   addSpacer('sub2');
   addSpacer('sub2');
   addDropdowns('sub2','kraids_lair',true);
   addEntry('sub2','kraids_lair', "Kraid's Lair");
   addSpacer('sub2');

   addDropdowns('sub2','lower_norfair',true);
   addEntry('sub2','lower_norfair', 'Ridley Mouth');
   addEntry('sub2','lower_norfair', '3 Musketeers');
   addSpacer('sub2');

   addDropdowns('sub2','wrecked_ship',true);
   addEntry('sub2','wrecked_ship', 'Ocean');
   addEntry('sub2','wrecked_ship', 'WS Exit');
   addSpacer('sub2');

   addDropdowns('sub2','east_maridia',true);
   addEntry('sub2','east_maridia', 'Aqueduct');
   addEntry('sub2','east_maridia', 'Highway');
   addSpacer('sub2');

   addEntry('sub2','tourian', 'Tourian');
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
   zones.forEach((i) => { knownItems += getNumItems(i)});

   if (knownItems > 0) {
      var theCounter = document.getElementById('master_item_counter');
      theCounter.style = '';
      theCounter.innerHTML = "Unknown:&nbsp;&nbsp;" + (itemCounter - knownItems);
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

function addEntry(listName,className,name) {
   var masterList = document.getElementById(listName);
   var newPair = document.createElement("li");

   var newEntry = document.createElement("div");

   newEntry.innerText = name;
   newEntry.classList.add("portal", className);
   newEntry.onclick = function(e) {
      selectItem(newEntry);
   }
   newEntry.onauxclick = function(e) {
      if (e.button == 1) {
         addColumn();
         selectItem(newEntry);
      } else if (e.button == 2) {

         if (firstOfPair !== null) {
            firstOfPair.style = null;
         }

         firstOfPair = newEntry;
         firstOfPair.style = "border-width: 4px; border-style: solid; border-color: blue";
      }
   }

   newPair.appendChild(newEntry);
   masterList.appendChild(newPair);
}

function addColumn() {
   columnCount += 1;
   var columnId = "col" + columnCount;

   var columns = document.getElementById("columns");

   var newColumn = document.createElement("li");
   newColumn.classList.add("top");

   var newList = document.createElement("ul");
   newList.id = columnId;

   var newButton = document.createElement("li");
   newButton.id = columnId + "_btn";
   newButton.classList.add("set_column");
   newButton.onclick = function() {
      setCurrentColumn(columnId);
   }
   newButton.onauxclick = function(e) {
      if (e.button == 2) {
         removeItem(columnId);
      }
   }

   newList.appendChild(newButton);
   newColumn.appendChild(newList);
   columns.appendChild(newColumn);

   setCurrentColumn(columnId);
}

function copyColumn() {
   columnCount += 1;
   var columnId = "col" + columnCount;
   
   var columns = document.getElementById("columns");
   var columnToCopy = document.getElementById(currentColumn);

   var newColumn = document.createElement("li");
   newColumn.classList.add("top");

   var newList = columnToCopy.cloneNode(true);
   newList.id = columnId;
   newList.lastChild.id = columnId + "_btn";
   newList.lastChild.style = null;
   newList.lastChild.onclick = function() {
      setCurrentColumn(columnId);
   }
   newList.lastChild.onauxclick = function(e) {
      if (e.button == 2) {
         removeItem(columnId);
      }
   }

   newColumn.appendChild(newList);
   columns.insertBefore(newColumn,columnToCopy.parentNode);

   //columns.appendChild(newColumn);
   //setCurrentColumn(columnId);
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

   /*var column = document.getElementById(currentColumn);

   if (column.children.length >= 2) {
   var newArrow = document.createElement("li");
   newArrow.innerHTML += "&#8595;";
   newArrow.classList.add("arrow");
   column.insertBefore(newArrow,column.lastChild);
   }

   var newItem = document.createElement("li");
   newItem.innerText = src.innerText;

   for (var i = 0; i < src.classList.length; i++) {
      newItem.classList.add(src.classList[i]);
   }
   newItem.style = "cursor: default;";
   column.insertBefore(newItem,column.lastChild);*/
}

function removeItem(columnId) {

   columnId = columnId || currentColumn;
   var column = document.getElementById(columnId);
   var children = column.children;

   if (children.length <= 1) {
      return;
   }

   column.removeChild(children.item(children.length - 2))

   if (children.length <= 1) {
      return;
   }

   column.removeChild(children.item(children.length - 2))
}

function setCurrentColumn(columnId) {

   if (columnCount > 1) {
      var old_btn = document.getElementById(currentColumn + "_btn");
      old_btn.style = null;
   }

   currentColumn = columnId;

   var new_btn = document.getElementById(currentColumn + "_btn");
   new_btn.style = "background-color: white; border-style: solid;";
}
