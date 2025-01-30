/*
 Yan-K ToolKit
 Version: 1.2
 Author: Yan-K @ Yan-K.tv
 Date: 2021/03/15
*/
  
(function (thisObj) {
       
    //================
    var version = '1.2';
    //================
     
    //__________ MAIN ___________
    {
		/* Helper Functions */
		
		function getResourceFolder () {
			var userFolder = Folder.userData;
			var resourceFolderPath = userFolder.toString() + "/Yan-K_Resource/ToolKit";
			var resourceFolder = new Folder(resourceFolderPath);
			if (!resourceFolder.exists) {
				var createFolder = resourceFolder.create();
				if (!createFolder) {
					alert ("Create Resource Folder Error!");
					return null;
				}
			}
			return resourceFolder.toString();
		}

		function createResourceFile (file, binary, folder) {
			var resourceFile = new File(folder+"/"+file);
			if (!(checkWriteAccess())) 
			{
				alert ("Script require write access, go to preferences and make sure Allow Scripts to Write Files and Access Network is checked.");
				app.executeCommand(2359);
				return null;
			}
			resourceFile.encoding = "BINARY";
			resourceFile.open("w");
			resourceFile.write(binary);
			resourceFile.close();
			return resourceFile;
		}
		
		function checkWriteAccess(){
			var accessSetting;
			try{
				accessSetting = app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY");
			}catch(err){
				return (accessSetting == 1);
			}
			return (accessSetting == 1);
		}
         
        /* Create Layers Function */

        function createAdj () {
            app.beginUndoGroup("Create Adjustment Layer");
            var selComp = app.project.activeItem;
            var selLayer = selComp.selectedLayers;
            var solidColor = [0,0,0];
            var solidName = "Adjustment Layer";
            var solidW = selComp.width;
            var solidH = selComp.height;
            var solidL = selComp.duration;
            var fullSolid=selComp.layers.addSolid(solidColor,solidName,solidW,solidH,1.0,solidL);
            try{
                fullSolid.inPoint = selLayer[0].inPoint;
                fullSolid.moveBefore(selLayer[0]);
                fullSolid.adjustmentLayer = true;
            }catch(err){
            };
            app.endUndoGroup();
        };

        function createCam () {
            app.beginUndoGroup("Create Camera");
            app.executeCommand(2564);
            app.endUndoGroup();
        };

        function createLight () {
            app.beginUndoGroup("Create Light");
            app.executeCommand(2563);
            app.endUndoGroup();
        };
        
        function createShape () {
            app.beginUndoGroup("Create Shape");
            app.executeCommand(3736);
            app.endUndoGroup();
        };

        function createNull () {
            app.beginUndoGroup("Create Null");
            var selComp = app.project.activeItem;
            var selLayer = selComp.selectedLayers;
            var myNull=selComp.layers.addNull();
            try{
                myNull.anchorPoint.setValue([50,50]);
            }catch(err){
                myNull.anchorPoint.setValue([50,50,50]);
            };
            try{
                myNull.inPoint = selLayer[0].inPoint;
                myNull.moveBefore(selLayer[0]);
            }catch(err){
            };
            app.endUndoGroup();
        };

        function createSolid () {
            app.beginUndoGroup("Create Solid");
            var selComp = app.project.activeItem;
            var selLayer = selComp.selectedLayers;
            var solidColor = [0,0,0];
            var solidName = "Black Solid";
            var solidW = selComp.width;
            var solidH = selComp.height;
            var solidL = selComp.duration;
            var getKey = ScriptUI.environment.keyboardState;
            if (getKey.shiftKey) { //如果按著 Shift 鍵生成小尺寸的 Solid
                var smallSolid = selComp.layers.addSolid(solidColor,solidName,100,100,1.0,solidL);
                try{
                    smallSolid.inPoint = selLayer[0].inPoint;
                    smallSolid.moveBefore(selLayer[0]);
                }catch(err){
                };
            } else { //如果沒按著 Shift 鍵生成符合 Comp 尺寸的 Solid
                var fullSolid=selComp.layers.addSolid(solidColor,solidName,solidW,solidH,1.0,solidL);
                try{
                    fullSolid.inPoint = selLayer[0].inPoint;
                    fullSolid.moveBefore(selLayer[0]);
                }catch(err){
                };
            };
            app.endUndoGroup();
        };

        function createText () {
            app.beginUndoGroup("Create Text");
            var selComp = app.project.activeItem;
            var selLayer = selComp.selectedLayers;
            var myText=selComp.layers.addText("Yan-K Text");
            try{
                myText.inPoint = selLayer[0].inPoint;
                myText.moveBefore(selLayer[0]);
            }catch(err){
            };
            app.endUndoGroup();
        };

        /* ToolKit Function */

        function yankPurge () {
            app.purge(PurgeTarget.ALL_CACHES) 
        };

        function yankPurgeDisk () {
            app.executeCommand(10200)
        };

        function yankAutoFade () {
            app.beginUndoGroup("Yan-K AutoFade");
            var selComp = app.project.activeItem;
            var selLayer = selComp.selectedLayers;
            var selProperties = selComp.selectedProperties;
            var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/Yan-KAutoFade.ffx";
            var expFade = '/*Yan-K AutoFade*/var mainController = effect("Yan-K AutoFade");var pTimeSwitch = mainController(10);var pTimeFrame = mainController(11);var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value;var layerDuration = outPoint-inPoint;var fadeIn = mainController(3);var fadeOut = mainController(4);var fTimeIn = fadeIn + fadeOut > layerDuration ? layerDuration/2 : fadeIn;var fTimeOut = fadeOut + fadeIn > layerDuration ? layerDuration/2 : fadeOut;var fOpaMin = mainController(6);var fOpaMax = mainController(7);var fGraph = mainController(14);var fIn = fGraph == 1 ? linear(time,thisLayer.inPoint,thisLayer.inPoint+fTimeIn,fOpaMin,fOpaMax) : easeIn(time,thisLayer.inPoint,thisLayer.inPoint+fTimeIn,fOpaMin,fOpaMax);var fOut = fGraph == 1 ? linear(time,thisLayer.outPoint-fTimeOut,thisLayer.outPoint,fOpaMax,fOpaMin) : easeOut(time,thisLayer.outPoint-fTimeOut,thisLayer.outPoint,fOpaMax,fOpaMin);if (time < inPoint) {  fOpaMin;} else if (time <= inPoint+fTimeIn) {  fIn;} else if (time >= outPoint-fTimeOut) {  fOut;} else {  fOpaMax;}'
            for (i=0 ; i<selLayer.length ; i++) {
                selLayer[i].applyPreset(new File(presetFile));
                selLayer[i].opacity.expression = expFade;
            }
            app.endUndoGroup();
        };

        function applyPresetProcess (presetType) {
            app.beginUndoGroup("Yan-K Apply Preset");

            var presetFilename;
            var presetName;
            var expMultiD;
            var expOneD;

            switch (presetType) {
                case "loop":
                    presetFilename = "Yan-KLoop.ffx";
                    presetName     = "Yan-K Loop_";
                    expMultiD = '/*Yan-K Loop*/	var mainController = effect("Yan-K Loop_%name%")(3);if (mainController == 1) {    loopOut("cycle");} else if (mainController == 2) {    loopOut("offset")} else if (mainController == 3) {    loopOut("continue")} else if (mainController == 4) {    loopOut("pingpong")} else { value; }';
                    expOneD = expMultiD;
                    break;
        
                case "time":
                    presetFilename = "Yan-KTime.ffx";
                    presetName     = "Yan-K Time_";
                    expMultiD = '/*Yan-K Time*/	var mainController = effect("Yan-K Time_%name%");var pTimeSwitch = mainController(25);var pTimeFrame = mainController(26);var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;var masterSwitch = mainController(3);var mainSpeed = mainController(4);var mainAcc = mainController(5);var mainTime = masterSwitch == 1 ? (time*mainSpeed+(time*time*mainAcc)) : 0;var sepDSwitch = mainController(7);var xSwitch =  mainController(10);var xSpeed =  mainController(11);var xAcc =  mainController(12);var ySwitch =  mainController(15);var ySpeed =  mainController(16);var yAcc =  mainController(17);var zSwitch =  mainController(20);var zSpeed =  mainController(21);var zAcc =  mainController(22);var xTime = xSwitch == 1 ? (time*xSpeed+(time*time*xAcc)) : 0;var yTime = ySwitch == 1 ? (time*ySpeed+(time*time*yAcc)) : 0;var zTime = zSwitch == 1 ? (time*zSpeed+(time*time*zAcc)) : 0;var newX = sepDSwitch == 1 ? xTime : mainTime;var newY = sepDSwitch == 1 ? yTime : mainTime;var newZ = sepDSwitch == 1 ? zTime : mainTime;switch (value.length) {    case 1:    newX;    break;    case 2:    [value[0]+newX,value[1]+newY];    break;    case 3:    [value[0]+newX,value[1]+newY,value[2]+newZ];    break;    default:    newX;    break;}';
                    expOneD = '/*Yan-K 1D Time*/	var mainController = effect("Yan-K Time_%name%");var pTimeSwitch = mainController(25);var pTimeFrame = mainController(26);var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;var masterSwitch = mainController(3);var mainSpeed = mainController(4);var mainAcc = mainController(5);var mainTime = masterSwitch == 1 ? value+(time*mainSpeed+(time*time*mainAcc)) : value;mainTime;';
                    break;
        
                case "wiggle":
                    presetFilename = "Yan-KWiggle.ffx";
                    presetName     = "Yan-K Wiggle_";
                    expMultiD = '/*Yan-K Wiggle*/var mainController = effect("Yan-K Wiggle_%name%");var pTimeSwitch = mainController(26);var pTimeFrame = mainController(27);var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;var masterSwitch = mainController(3);if (masterSwitch == 1) {    var mainSpeed = mainController(4);    var mainRange = mainController(5);    var mainWiggle = wiggle(mainSpeed,mainRange);    var uniformSwitch = mainController(7);    var sepDSwitch = mainController(8);    var xSwitch =  mainController(11);    var xSpeed =  mainController(12);    var xRange =  mainController(13);    var ySwitch =  mainController(16);    var ySpeed =  mainController(17);    var yRange =  mainController(18);    var zSwitch =  mainController(21);    var zSpeed =  mainController(22);    var zRange =  mainController(23);    var xWiggle = xSwitch == 1 ? wiggle(xSpeed,xRange) : value;    var yWiggle = ySwitch == 1 ? wiggle(ySpeed,yRange) : value;    var zWiggle = zSwitch == 1 ? wiggle(zSpeed,zRange) : value;    var newX = sepDSwitch == 1 ? xWiggle : mainWiggle;    var newY = sepDSwitch == 1 ? yWiggle : mainWiggle;    var newZ = sepDSwitch == 1 ? zWiggle : mainWiggle;    var yUni = uniformSwitch == 1 ? 0 : 1;    var zUni = uniformSwitch == 1 ? 0 : 2;    switch (value.length) {        case 1:        newX;        break;        case 2:        [newX[0],newY[yUni]];        break;        case 3:        [newX[0],newY[yUni],newZ[zUni]];        break;        default:        newX;        break;    }} else {value};';
                    expOneD = '/*Yan-K 1D Wiggle*/var mainController = effect("Yan-K Wiggle_%name%");var pTimeSwitch = mainController(26);var pTimeFrame = mainController(27);var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;var masterSwitch = mainController(3);if (masterSwitch == 1) {    var mainSpeed = mainController(4);    var mainRange = mainController(5);    var mainWiggle = wiggle(mainSpeed,mainRange);    mainWiggle;} else {value};';
                    break;
        
                default:
                    alert("Unknown preset type: " + presetType);
                    app.endUndoGroup();
                    return;
            }

            var selComp       = app.project.activeItem;
            var selLayers     = [];
            var selProperties = [];
            var presetFile    = new Folder($.fileName).path + "/Yan-K_Resource/" + presetFilename;

            // countInArray 會計算出陣列中相同的內容重複出現了幾次。
            function countInArray(array, value) {
                var count = 0;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === value) {
                        count++;
                    }
                }
                return count;
            }

            // unselectAll 會取消選取所有已選取的圖層。
            function unselectAll() {
                for (var i = 0; i < selComp.selectedProperties.length; i++) {
                    selComp.selectedProperties[i].selected = false
                }
            }

            /**
             * 腳本本體
             */

            //
            for (var i = 0; i < selComp.selectedLayers.length; i++) {
                // layer 是目前正在選取的圖層物件的縮寫。
                var layer = selComp.selectedLayers[i];
                // index 是這個圖層在工作區域裡的索引編號。
                var index = layer.index
                // expectedControllerAmount 是該替此圖層所追加的控制器數量。
                var expectedControllerAmount = 0
                // controllersReadable 是目前選取圖層中，所有會用到的控制器名稱（易於人類閱讀的）。
                var controllersReadable = []

                // 如果這個圖層的特效屬性並不存在，就表示使用者可能誤套用了不該套用的物件，
                // 真是如此的話則略過此圖層。
                if (layer.property("Effects") == null) {
                    continue
                }

                // propertyOrder 是該屬性的順序號碼，由於下列迴圈有時候會跳過一些屬性，
                // 因此需要額外建立這個順序編號來作為依據，不能直接依靠迴圈的索引。
                var propertyOrder = -1
                // 遍歷此選取圖層中所選取的所有屬性。
                for (var j = 0; j < layer.selectedProperties.length; j++) {
                    // property 是這個屬性的縮寫。
                    var property = layer.selectedProperties[j]
                    // 如果這個屬性沒有辦法設置表達式，這就可能是個群組資料夾，
                    // 所以就略過這一個屬性。
                    if (!property.canSetExpression) {
                        continue
                    }
                    // 有幾個能套用表達式的屬性，就遞增幾個我們該增加的控制器數量。
                    expectedControllerAmount += 1
                    // 遞增屬性順序供之後的程式判斷此屬性的順序為何。
                    propertyOrder++

                    // parent 是這個屬性的父屬性。
                    var parent      = property.parentProperty
                    // pathNames 保存著此屬性的路徑屬性名稱，這包含所有父屬性的名稱。
                    var pathNames   = []
                    // pathIndexes 保存著此屬性的路徑索引，這包含所有父屬性的索引。
                    var pathIndexes = []
                    // current 表示目前的屬性，這會不斷變動用來一直往上爬父屬性。
                    var current     = property;
                    // 不斷地取得這個屬性的父屬性直到頂為止。
                    while (current != null) {
                        // 將父屬性的名稱推入陣列裡，用來追蹤屬性的樹狀結構路徑供之後使用。
                        pathNames.push(current.name)
                        // 如果這個父屬性沒有「屬性索引」那麼他可能就是圖層元素，
                        // 所以需要透過另一種手段來取得該圖層在工作區域的索引。
                        pathIndexes.push(current.propertyIndex != null ? current.propertyIndex : current.index)
                        // 將目前屬性改成父屬性，這樣才能遞迴執行不斷地往上找到父屬性。
                        current = current.parentProperty
                    }

                    // pathName 會將路徑名稱陣列轉換成黏在一起的單一路徑字串，用以作為控制器名稱。
                    var pathName = pathNames.reverse().slice(1).join("_")
                    // pathNameReadable 是方便人類閱讀的路徑名稱，例如「A > B > C」。
                    var pathNameReadable = pathNames.join(" > ")
                    // 將 pathIndexes 的索引翻轉過來，這樣才能從父屬性慢慢往下找到子屬性。
                    pathIndexes = pathIndexes.reverse().slice(1)

                    // 將此屬性的控制器路徑名稱推入到該選取的圖層中，供之後檢查圖層中是否有相同且重複的控制器。
                    controllersReadable.push(pathNameReadable)

                    // 將這個分析過後的屬性保存起來。
                    selProperties.push({
                        // layer 是個動態函式，會在呼叫的時候透過圖層索引取得這個屬性所屬的圖層物件。
                        // 不直接保存圖層物件是因為 After Effects 隨時清除圖層物件，變得不可靠。
                        layer       : (function (index) {
                            return function() {
                                return selComp.layer(index)
                            }
                        })(index),
                        // property 是動態函式，道理跟 `layer` 是相同的。
                        // 這會依照保存的路徑索引，找出並回傳該屬性真正的屬性物件。
                        property    : (function (index, pathIndexes) {
                            return function() {
                                var property = selComp.layer(index);
                                for (var i = 0; i < pathIndexes.length; i++) {
                                    property = property.property(pathIndexes[i])
                                }
                                return property
                            }
                        })(index, pathIndexes),
                        // order 是該屬性的順序（供程式計算用，這不是圖層屬性索引）。
                        order       : propertyOrder,
                        // name 是這個屬性的路徑名稱。
                        name        : pathName,
                        // nameReadable 是方便人類閱讀的屬性路徑名稱。
                        nameReadable: pathNameReadable,
                    })
                }
                // 保存這個圖層的分析資料。
                selLayers.push({
                    index                   : index,
                    expectedControllerAmount: expectedControllerAmount,
                    expectedEffectAmount    : layer.property("Effects").numProperties + expectedControllerAmount,
                    controllersReadable     : controllersReadable
                })
            }

            // 替每個屬性套用、建立控制器。
            for (var i = 0; i < selLayers.length; i++) {
                // layer 是這個圖層。
                var layer = selComp.layer(selLayers[i].index)
                // 取得該圖層需要建立的控制器數量，並且依照該數量不斷建立控制器。
                for (var k = 0; k < selLayers[i].expectedControllerAmount; k++) {
                    // 取消選取所有 After Effects 自動選取的屬性，如果不這麼做會發生非預期的 `applyPreset` 問題。
                    unselectAll()
                    // 選取圖層中的 `Position` 屬性作為建立控制器的 Workaround，
                    // 因為 `applyPreset` 只有在選取 `Transform` 屬性的時候才會單獨建立控制器，
                    // 也只有這樣才能夠妥當地控制「控制器」建立的數量。
                    layer.property("Position").selected = true
                    layer.applyPreset(new File(presetFile))
                }
            }

            // 替每個圖層清除多餘的控制器。
            for (var i = 0; i < selLayers.length; i++) {
                // layer 是這個圖層。
                var layer = selComp.layer(selLayers[i].index)

                // 在替該圖層建立完控制器之後，會有非預期的多餘控制器。
                // 這個時候會將多餘的控制器不斷地刪減，直到我們原本預期的控制器數量為止。
                while (layer.property("Effects").numProperties > selLayers[i].expectedEffectAmount) {
                    layer.property("Effects").property(layer.property("Effects").numProperties).remove();
                }
            }

            // 重新命名與套用表達式。
            for (var i = 0; i < selProperties.length; i++) {
                // that 是這個屬性的縮寫。
                var that = selProperties[i]
                // effect 是這個屬性所屬圖層的特效屬性縮寫。
                var effect = that.layer().property("Effects")
                // property 是這個屬性真正的屬性物件縮寫。
                var property = that.property()

                var finalExpMultiD = expMultiD.replace(/%name%/g, that.name);
                var finalExpOneD   = expOneD.replace(/%name%/g, that.name);

                // 重新命名特效屬性中的最後一個屬性，即是目前正在存取的屬性。
                // 讓其屬性名稱能夠易於人類閱讀，而不是只有隨機的數字編號。
                effect.property(effect.numProperties - that.order).name = presetName + that.name;


                // 將表達式套用到該屬性中。
                if (property.propertyValueType == PropertyValueType.OneD) {
                    property.expression = finalExpOneD;
                } else {
                    property.expression = finalExpMultiD;
                }
            }

            // 清除重複出現的控制器。
            for (var i = 0; i < selProperties.length; i++) {
                // that 是這個屬性的縮寫。
                var that = selProperties[i]
                // effect 是這個屬性所屬圖層的特效屬性縮寫。
                var effect = that.layer().property("Effects")
                // found 會表示該控制器是否已經出現在上一次的搜尋中，
                // 如果上一次的搜尋中控制器已經出現，而這次的搜尋又有相符名稱的控制器，
                // 就表示這次找到的控制器是重複且多餘的。
                var found = false;

                // 遍歷圖層特效中的所有屬性。
                for (var k = 0; k < effect.numProperties; k++) {
                    // order 會將目前正在遍歷的屬性索引轉換為 After Effects 的屬性編號。
                    var order = k + 1
                    // 如果目前正遍歷的屬性名稱不相符，就直接找下一個屬性。
                    if (effect.property(order).name != presetName + that.name) {
                        continue
                    }
                    // 如果找到了相符的屬性，但這是第一次的話就先跳過，
                    // 找找看是否後面還有重複的屬性。
                    if (!found) {
                        found = true
                        continue
                    }
                    // 當這已經不是第一次找到相同名稱控制器的時候，就將這次找到的控制器給移除。
                    // 因為這個控制器是多餘的。
                    effect.property(order).remove();
                }
            }

            // 檢查重複套用路徑。
            for (var i = 0; i < selLayers.length; i++) {
                // warned 會存放此圖層已經警告過的路徑，用以避免同個路徑因為重複套用而出現了重複的警告。
                var warned = [];
                // 遍歷此圖層中所有套用過的屬性來看看有沒有重複套用過。
                for (var j = 0; j < selLayers[i].controllersReadable.length; j++) {
                    // 如果這個套用的屬性路徑指出現過一次，就直接檢查下一個路徑。
                    if (countInArray(selLayers[i].controllersReadable, selLayers[i].controllersReadable[j]) == 1) {
                        continue
                    }
                    // 如果這個路徑出現過數次，但先前已經被警告過了的話就忽略本次重複，檢查下個路徑。
                    var exists = false
                    for (var k = 0; k < warned.length; k++) {
                        if (warned[k] == selLayers[i].controllersReadable[j]) {
                            exists = true
                        }
                    }
                    if (exists) {
                        continue
                    }
                    // 如果這個路徑是重複套用的，然而先前也還沒有警告過，那麼這次就跳出警告。
                    // 並且將此路徑保存至「已警告」中，避免等一下又重複警告一次。
                    warned.push(selLayers[i].controllersReadable[j])
                    alert('You are trying to apply preset to (' + selLayers[i].controllersReadable[j] + '), but controller with same name already exists.\n\nThese presets will share the same controller.')
                }
            }

            // 替每個圖層清除多餘的控制器。
            for (var i = 0; i < selLayers.length; i++) {
                // layer 是這個圖層。
                var layer = selComp.layer(selLayers[i].index)

                // 在替該圖層建立完控制器之後，會有非預期的多餘控制器。
                // 這個時候會將多餘的控制器不斷地刪減，直到我們原本預期的控制器數量為止。

                while (layer.property("Effects").numProperties > selLayers[i].expectedEffectAmount) {
                    layer.property("Effects").property(layer.property("Effects").numProperties).remove();
                }
            }

            app.endUndoGroup();
        };

    }
    //==================================================
     
    // _______ UI SETUP _______
    {
        var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette','Yan-K ToolKit',undefined, {resizeable:true});
        if (mainPalette == null) return;

        mainPalette.alignChildren = ['fill','fill'];
        mainPalette.margins = 5;
        mainPalette.spacing = 2;
    }
    //==================================================
  
  
    //__________ UI CONTENT ___________
    {
        bannerImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u00E1\x00\x00\x00(\b\x06\x00\x00\x00\bT\u009D\x06\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00(\x1AIDATx^\u00ED\u009Dy\u00A0\x1CU\u009D\u00EF;\x01$\x06\b\u008B\x0E*\x02\u00A2@\u00EE\u0096A\x1Dy\u00F8\u00F4\u00A98:3\u008E\x0EK\b\x10 \x10\x02\u00845\u00CB]\u00B3Bn\u00B6\x1B\u0092\u00DC\u00E4\u00E6\u00DE$$D\bK\x02\x01\u00D9w|\u0083:>G\x1E\u008E\x0E\u0083\u00CE\u00D3\u00DB\u00B7\u00BB\x03O\u0086U\x04\u0084$b\fAR\u00EF\u00FB\u00F9\u009DS\u00D5\u00D5\u00DDU\u00DDW$\u00EF\u00AF|s\x7F]g\u00F9\u00D5\u00A9S\u00A7\u00CE\u00F7\u00FC\u00CEV\u0095!\u009Bg\\\u00F3\u00B1L:\x0E\u0093\u00BC\"\u00D9e\u00BE\u00DA\u00F8\u00B8\u00E4%\u00E7\u008Cp\u00ACdo\u00E74\u00BC)!\u00CDa\u0092\x03$\u00DB$GJj\u00E1#\u0092\u00DF:g\"~'y\u00C393C$\u00C7H\u00E2\u00D7\x05\u00BF\u0096\u00BC\u00ED\u009C%8DB\u00F8\x1F\u00CCW\x1BGH^p\u00CE\u009A\x18*\u00A1\u008C\u00CB\u00CB%\r\u00949\u00F7\u00F9.\u009E \b8T\u00C3\u00E1\u0092\x17\u009D\u00B3&\u00F6\u0095\x1C\u0094\tH\u00BFF\u00BA\x16\x1D$\u00A7\u00ED\u00E2\u00CCY\u0082 \u00CCK,.rV\u0084\x1D(\x07.\u009E\u00BF\u0085\u00B9`\u00AF\u00E7\x0F1\x7F,/\u0091\u00B2G\u0099?\b(\u00F3\u008FJ^\u00F6~;8\x14u\u00ED\u00E0\u00E2\u00D0}]\x01\x7F\u008A\"A\u00FC<\u00A7lN\x1D\u0094\u0097\u00C0\u00E5%R\u0089\u00E2\u00C2\u009F\u00F0\u00F4\x0F\u00C8u\u00B0\u0082|\u00DDU\u00A0Wu\b\u00AC\u00B2&B\u00E4\u00DC_\u0087\u00FDF.\u009BZ\u00AD\u00E2\x1B\u00A4K:\x07\u00E3\u0096~H\x04\u0083\u00E2^\u00D7\u00E1C\u00CEg\u00B8Q2Y\u00A2\u00CCe\u00F69\u00B6{\u00CA\x1BO\u00CF\\\u00B3\x17\x11U0BB\x05z\u00CD|\u00C9\u00D8\u00A5\u00B4\x02\u00A5\u00C5\x03\u00D0\x03\u00CE|K\u00B2\u0089\u0088\x18\u008ES\u00FE~\u00E5\u00DD\x06\u00E5\u00EF\u0083:\x1C'yG\u00E7\u00FF\u009C\u00B0!C\u008A\u00C5\u00A2\u00F8\u00E1:\x1C/\u00E9\u00F7y\u00A5\u00E1\u00A0\\hH\u00AAB\u00E7r_\u009C?\u00BCZ9J\u00EF\x04\x1D\u00B8?\u00CAj\u00ABt]\u00E5\x11\n\u00D3W\x7FF\u0087w\u00EA\u00967g]H\x11\u008A\u00E3>\u0087)\u00AE\u00E63*L[\u00BD\u008F\x1E8e\u00BE\x7F]OKm\u00FD\u008E\u0095\u00FB\u00E90\u00A2nE\u00EBo\\H:\nm}*\u00B0\u0080g4\u00AC\u00AE\u00AF\u00BDv\u00DA-=\u00DC\u00EB\u00BE\u00AA\x7F\u00BB\u00EAVO{\u00CB\u0085\u00A6#?e\u0099\u00CA<\u00D8\u00B7~\u00CDL\u00CA\u00A7*\u00F2W,qe\x1E\x04\u00FB\u00D4\x7F\u00FB\u00CA\u0092\u00BA\u0098\u0084\u00DC\u00A5\u008B\u00D0\x1D\u00D1\u00B0\u00BE\u00B3\u00E6\u00F3\x04\u00B9\u008B\u00E6S\u00CF\u00876\u00DC4\u009FF\u00BF*\x06\u00CE\u00EF\u00A4\u00BCel\u0082\u00BD\x1BoY\u0094\u009A\x17*l\x05T) \u00A0Z\u0085\u00CC;\x16P\x05\u00D2\r\t\u0088\u0085K\x03i=\u00E2\u0085\u00CA\u00F4\x01U\u00B4\u00DF\u00EBh\x15^\u00EEw\u00CBE\x15\u00DED*\u00E4\x05+E\x1A\x10\u0086\u00EBQ\u00F9(\u00EC\u0083$XTt>\x18\x12P\u00E7\u0091\x17\b\x1B^3\u00D1\n)\u00EFaz\x7F+\u00F9\x17\u009D\u008FE\u008C\u00A0x\n\u00F1\x1E\u00C9r\u00C9.O\u00C0\u00ED\u0092\u0092\u00B6,\t:\u00D7*\u0083\u00EE\u00C5\u00EE\u00B3\x06\u00E6\u00C9\u00E2\u00FD@2Zb\x16P\x04\x1B*Y!\u00E7?K*z\n\u009E\u0080\u00CE\u008A\u00D4@a\u00DA*#\u00A0\u00C87(K\u00EF\t\u00B8\x13\u0092\u00B8\u0090t\x14\u00DAz\u008D\u0080\"\u00DF\u00D6\u00DA\u00A5\"\u00FDf\x110\u00C8\f\u00D5}\u00EE\b\x06qB~r\u00F7\x01\"\u00C9\u00F6\u00C1\u00E4%\x7F\u00F9\u00E2\u00BD\u00A4;\u00BC~\u00DD\u00EC\u00C1\u0094y&wI\x17\x04$\x1B;}PU\u00E4.\x14\x01\u0083@\u00F7YbZ\x131p\u00FE\x1C,\u00E0\u00B0\u00C6[\u00BA\u00B6\u00D5\u00BA\u00CD\n\x12\u0086\x04T\u00E5\u00D9\u00E1B\u00D2\x11'\u00A0\u00F4\u00AB]\u00EA\u008F\u008A?Y\u00C73$7T\u00AB\u0098J\u00F3S\u0092vU\u00F8\x07$y\x05\u00FD\u00BB\u0097\u009FH\u009E\u0092P)\u00DB$\u009F\u0095\u00BC\u00A1\u00B4\u00FE \u00D9*7\u00F9=P\u00EE7\u00BD%\u00FB\x0F\u0091\u00F1dD\u00EE\x1F\x13\x10\u0087\u00AEa\x04\u0094>\u00A4\u00BAYB\u0083s\u00BE$\u008E\u00EB$GIN\u0091@\x0E\u00E4\u00F3\u0088\u00CE\x1F!9DB<\u00E9\x1D-\u00F9\u008Cdo\t\u00DD\u00CF\u00BF\u0097\x1C;\u0088\u00E7\u00C53m\u00D7\x01\u00C2\u00FFo\u00FC\"\u00D8\u00A1:\u00FCO\u00C9W%_\u0096\u00A5\u00C3\x1D!$\u00A0\u00C2k&\u00EE\b\u0098\x19<\x01\u00DBE@UJY@\u0095G\u00F5\u00E4\u008D\u0080\u0081\u00AC%\x044T\u00D7\u00CF7/\u00DFW5~\u00A8\u00AC\u00DF\x1FM\u00B5F\u00EE\u008D\u0080\u0099`{\u00FD\u00DA\u0099\u00EF\u00AA\u0090|h2\u008C\u0080j\u00F4d\u00FD\u00ACn\u00A5\u0095\u00BBqN\u0092\u00BB\u00B8\u00EB(\x1C\u00B2\u0080\u00CAK\u008D\u008C\b\u00B9\x0B\u00E7\x19\x01\x1Bn^\u00B0\u00AB\u0096\u00FE\u00C0x\x110\u00C8\u0088\u0080\u008B|W\u00BB\u00BA~\t\tUyv\x07\x01\r\u00D2\u00A7\x0B\x12Y\u00C0r(\u00FEk\u0092\u00EF\u00CBy\u008B\u0084V\u00AF[\u00F29\u0091\u00A8N2J\u00EE\u00FF.\u00A9\u0097\\\"\u00D9,\u0099)\u00F9\u0085\u00CE\u0099(\u00A1\x02\x1B\x01u\u00AC\n\x1E\u0080\u00F4\u00E3\x04\x04TP\u00AE{\u00A1\u00F9\x04\u00E9,\u00D2\x01\x0B9Z\u0082\x1E\x04}Z2Wr\u0099\u00E4I\t\u00E4X\u00E0\x1F8\u00F9\u00FD\u0085\u00E4^\t\u00D6\x13\u009D\u00C7\u00D4\u0090\u0094\x10\u00A8\x1C\"\x14y\u00F9\u00A2d\u008B\u00E4\u00DF$t\u008D\x1F\u0097\u00D0}9QD\u00E3\u009A\x11\u00FEb\x02V\u00A9\x10\u0085\u00F6>Y\u00C0`g]/\x04\u00AC\u008EB+\x04\u0094\x05\\\x19\x12P\u00A8\u0092#\b\u00A8\u00F8\u00A1\u00F5\u00AB\u00A7\u00FF\u00D1\u0085H\u00B9J^\u00F2\u0093\u0096\u009A\x05\u00AC_;\u00CBz\x06Uu/\u00BB\u00DAY@O@C5\u00FDK\u00BA\u00BE)\u0085\x01\u00E9\u00B4\u00B8\u0090*\x19\x17r\x17x\x02nX\u00B0k`\u00C2\u00DC}\u00F5\u00BC\u00EB\x07&t\u00EE\u00EF\u009F{\t\x06\u00C6_%\x02\u00CA\x02\u00DE\u00EA\t\b\u00AA\u00E4e\u00E0\u009CY\x07D$T\u00A5{_\tH\x06}&/\u0090P\u00B9K\b\x18\u00DE\u0080\u00D2\u00FA\u0098\u00E4~9\u00B1\x063E\u00B8/\u00E9x\u0093\u00E4)\u00E9\u00FF\x01\u00AB\x16\u008E\u00D1\u00B8\u0096\u00E4Y\u00C9\u00AD\u00D2\x1B\u00A3 \u00C6}\u009F\u0096`)\u0099\x00JC\u009F\u00E4t\u00C9s\"E9\x01C`\u00F5F*\u00FE\x1B\u00CA\u00CF\u00E5r_*9M\u00C2\u0098\b\u00AB\u00D6%9[\u00D7\u00FDG\x1D/\u00F2\u00C2X\u00EE\u00A7\x12\x00\u00F9h<nW\u00DA\u00FFC\u00C2\u00B9\u00D3%'&=,\u00E0\t\u00C89\x7F#a\u00BCC\u00C3r\u0087\u00E4f\u0091\u00EC\x1CI\u00C9x)\u0091\u0080ii\u00FF\u00D9\x16\x10\x02\u00CA\x02\u00F6\u00B6\x15\t\u0098\u0096v\u00EB\n=\x10\b\u00D8Q$\u00A0!Y??\x15\x02\x06C\u00EB\u00AF\t\t(X\u00DA)\u00FA\x10P\r_\u00FD\u00B5\u009E\u0080\u0086\x14]\x11P1\u00C3\u00EB\u00AF\u00BB\u00AA\u00B4qO\u00C9{\u00FE\u00E2\u00AE/(\u00EE^\u00C9\x07\u0095\u00E4\x12\u008D\u00F1f\u00A1\x1B\u00AB\u00AF%\u00C8]0\u00F7`\u0085o\u0095\x04\"^\u00A7\u0094^\u00D3yO\u00E8\u00F8b\u00EE\u00FC\u00CE:\u00AFf\x188\x0F\x02\u00CA\x02n\u00BA\u00BAt\u0098\u0090\u0092\x17\b\u00A8\u00B8\u009DF\u00C2\u00F7\u009B\u0080 F\x1E\u00AC\u00DB\u00F7\u00A4\u009Bd\x01\u00BF \u00F9\x17\u00C9&\u00C5\u009F$\u00F9\u00B9H\u00C0\x00\x7F\u0087\u00DC\u0083\u00E9\u00A73\u0098\u009E'\u00C1J\u00ADS\u00DE&\u00C7\x0B2\u00CC\u0083\u00D2zRr\u009F\u0082\u00A8`I\x04\x04\u00CFI \u00D2b\tVp\u00AC\u00E4\x19\t\u00BAt\x7F\u00AF\u00D7y\u008F\u0087\r\u00820\u00E0\u008F!\t\u00B9\u0097\u00C7E\u00D2;\u009D\u0097\u00B2\x0Fh-\u009F\u00C5-\x02\x1D#\u0099\x14\x13\u00B5\u00C6\u0099]J\u0093\u00F1.V\u00FEy\t\u00930\u008Cq\u00AD[\x1A\u0087\u00F4\x07o\x01;D\u00C0 e\f\u0098p\u00B6\x11\u0090.h\u009C\u0080 I\u00B7E\x04\u00A4\x0BZA@\u00BB_\u00EF*\"?u\u0099'\u00E0\u008C\"\x01\x01\u00AA\t\u00E9\u00E7\u00AFX\u00E2,`\t\x01\u0085\x04\u00DD\u00DC\u00A5\u008B\u00F6\u00D25\u00877\u0094\x13\x10$\x11j\u00E2\x02?\x06\u0084\u0080\u008A7\u00C9,\u00D1\u0091F\u00B7\x02\u00B2zF@,\u00A0\u00F4\u00D6Io\u00A1\u0084\u00FCq\u00DE\u009A\u0086[\u00BA\n^U\x04\u00BC\u00D2Y\u00C0r\x02\u0082\u0084\u00BCd\u00CF\u009Ey\u0080\u00D2\u00DE\u00D9xG\u00F7\u00DBCw\x07\x01CH?\u00B5\x0B*\u00B2Q\t\u00E9\u00C21n\u00A3\u00F2\u00A3?h\x02\u00EA|\u009B\u0084\u0091.y\u00F9\u00A5\u00DC_\u0091\u00FC\u0083\u00C2\u00E7'U\x06\u00A5\u009Df\x01\u00E3 \x1FX%\x1E\n\u00E3Ot\x19k0\x0E\u00A41\u0089\x03\u00EB\u00F8\u00B2\u00F2\u00FE\x0B]\x13\x1D\u0088T\u00AE\u00F3\u00DF$t[\x01$\n\u00E5\u00C3\x12&\u00A0\u00DEV\u00BE(O\u00ACy\u009F\u00FCg\u00EA\u00F8=\u00C9\u00ED\"\x1DK,\u0086\u00C24\x110\b\x06I\u00C0\u0095n\x12fEk\u008A\x05,M\u00A2\u00D0\x06\x01\u00D5\x05\u00ED+#\u00A0\u00A1L\u00B7\u00A5\u00C7Y\u00C0U\u0095\x044\u0094\u00E5.?\x05\x02\u00AA\x0B\u00BA\u00A6\u008C\u0080 $A\fF@,\u00E0\u00BA\u00D9\u00A5\x04\x04e\u00BA\x10Pi\x0Fo\u00B8~NR\u00E3\x1E\u00E5\u00C5qNc\u00C0\u008B\u00E6\x7F^\u008E\x07\x15r\u009F\u00C5Yz\u0092 `LX1\u00F3<p~\u00A7uA\x1B7v\u00ED\u0092\u00C5\u00FB\x07\u00B9/si\u00DA9]\"\u00E0\x1CS\x14\x06\u00CE\u0085\u0080\u00B2\u0080\u00B7-\x1E\u00D4DY\u00F6\u00AC\u0099f\x01\u009BD@\u00FCT\u00E4\u00FF\u00EF\x04T\x1C\u0095\x13\x02\u009E\u00A9J\u00FC\x7F}\u00D8\u00A0\t(\u00DD\u0088\u0080.\u00C4\u00BA\u00AAT:&~>+R\u00B0\x04\x12A\u00FA\u0083! `\x16\u00F2\u00BF$\u008FI\u00B6+oT\x06fL\u00E9\u00DA\u00C5g\u00E7\u00F0O\u0095\u00FC\f\x02\u00EA!\x7FDr\u009C\u00E4g\x16[\x04\u00D6\u0091q^F\x04zJ\u00B2D\u00CE\u0095\u0092n\u00E5\x05\u00B2\x01\x1A\x0F\u00D2f\x1C\b\u00E8\u0096\u00BF\u00A4\u0087z\u00A7\u00BA\u0094\x07\"z\u00EA\u00DBd\u00D5\u0092\u00CB<V9\x1D\x01\u00D5\x05M%\u00A0\x10K\u00A5\u00D0\u00D6\u00EB\u00C6\u0080}\u00ED\u00C9c\u00C0\u00B8.\x04\u00C4\x02\u00AE\u009A\u0096L@\x10\u00CBK~J\u00B7\u00B3\u0080I\x044H7\u00AE\x7F\u00F9bg\x01\u0093\b(@\u00A4\x10\u00B9K\u00BAl\f\u00D8\u00B0>\u0085\u0080 \u009E\u00F6\u00C4\x05_\u00D3\u00E5\u00BE\u00A7\u00B0\u00BF\u0093|\u00CC\u00E2\u0082`\u008D\u0084\x19\u00E9\u0093\u00E4\r\u00CB\u00DE0p\u00FE\x1C\u00D5s\x11\u00F0\u0096.\u00FF\u00CC\u0083q\u00FE\u009CP\u00D6\u00BBp\u00E9\u008E\u009B\u008D\x05\u00FC\u009C\u00E4\u00F8x\x1E\u00E3\u0088\u0087g\u00CF\u009A\u00C1d\u00D3\u00CE\u00A6;\u0097E\u00EB\u00D5CU\x19v\x1B\x01U\u0089\x7F/\u00F7\u0087\u00E2\u0099\u0090\u009Fe\x05f#\u00CF\u0096\u00FCV\u0095x\x7F\u00C9'\u00E4~\u00CF\x04$\x7F\u0092#\x14Fe\x1A'a\u00BC\u00F67\\W\u00E1\x11\x01\u00E5\u0086\u00E8\u00D5\u00805c\u00ADp\u00BB\u00F4\u00DF\u00F5]Y\u00BA\u00BC<\u00A4\x1E\u009D?E\u00D2*\u00F7\x1DJ\u00FBs\u0092\u009FIX\x07d\u00A6\u0096%\u0094\x1F\u0087\u00DDUY2\b\u00CD8\u0095\u0099N\u0083\u00C2l\f(2\u00BE\x1Dv\u0095\x05\u00C6\u0095\u00FF\u00A9\u00EB\u00B8\u00CAm\u00D3\u00F1\u00C1Yr\u00B0\u00B6\u00CA\u00F8\u00F0\u00ADT\x02\u00C6`\x04\fj\x10\u00D0\u00E0\u00922\x02\u00D2\x05M#\u00A0\u00C1\u00EB6\u00F7\f\u00D1}\u008E\u00A8[]\u0085\u0080\x06\u00A7\u009F\u009F\f\x01e\x01\u00D7\u00CEL!\u00A0\u0080\u00AA\u00AF\x17F@,\u00E0\u00B7\u00AFL$\u00A0\u00C1\u00EB:\x02\u00CA\x02\u00AE\u00EFL'\u00A0\u00C1\u00A7}\u00D1\u00FC\x06\u009D\u00CB\x18pDxM\u00DD\u00CBk:47lX\u00F8\u00F7\u008D\x1B\x17\u00FE\u0090\u00B0\u00F0y\f\u008C\x17\x01\u0083\u008C\b\u00B8\u00A8\u00D8\u00E8\x06lp\u00D0\u00C9&\x16\u00D0\u00C8o\x0E\x0B\u0098\u00C9@\u00C0\u0087$,c%\u0083\u00F3\u0084\u00ECX\x11\x10\x0B\x18# \u00B01a5\u00A8\u00D2\u00BDg\x0B\u00E8+\u00D9a\u00FE\x18\u00821\u00D7Z\x114\x1CS\u0091\x07v\u00A0\u00D0-\u00AE\n\u00A5\u009DH@\x1D\u00BE&\u00B1\u00C5V\u00C5Q\t\u0099\bZ!r\u00F3p\u0087\u00E8Z\u00A1\x05,Y\x07L\u00C0\u00BFJV)\u008D\u00F2\u00CA\u00C02\u00C7\u008Dzx\u0087I\u00B0|\u00CD\u00F2\u00D3\x1Dy\u008C\u00FB\u00D4\u00F1UI\u008B\u00C8\x15oDX\u00B4\u0086\u00B06\u00BB\x19' \u00FE\x18\u009E\u00D4\u0083a\u00D2'\u00C2\u00C8\u00E5\u00CD\u008C\x0F\u00C7K\x18\x1B\x1EMX5\x14\u00DA!\u00A0\u00BA\u00A0\u00BD\u00B5\b(\u00E8\t\x16Z!\u00A0,\u00E0\u00CAj\x04tu'\u00DF\u00BC|\u0088\u00AA\u00ED\u0088\u00FA\u00D5\u00D3k\x10P@\x7F\u00F2Rg\x01\u00AB\x11\x10\u00F8\u008A\u0099\u00BF\u00ECjg\x01\u00AB\x11\x10H=w\u00F1Bg\x01oH'\u00A0\u009E\u008D\t\u00E9\u00E7.\u0098GCs\u00BD\u00DCj\u00F8]\u00B8\u00C5e\x02\u00EE\u009F^\u0083\u0083\u0085\u00C9\u00AA\u008D\u00BF\u00CAuAo\u008D\x11\x10\x04\u00C1\u00AF8\u00DF\u00F4L2W\u00E6\u00C6\u00CD\u009E!7\x16\x12\x02~X\u00B2_Y=/B\u00E7d\u00C7Nw\x16\u00F0\u00AE\u00E5\u00E5\u00CF?}\u00C7\fP\x05g\u00ECB\u0086\x06K@\u00B6\u0096aE\u00A2BR\u00D8_\u00CBo\u00BBT\u00E4f6\u0089],\u009FW\u00D8.\u00F9\u00D9\u008A\u00F4\u00AA\u00DC;\u00E5f\u00DC\u00F5\u00B4\u00DC\u0089;\x0B\x14\x1F\u008E\u00A3\u0092\b\u00F8c\u0085\u0097T(\u00C5\u00DD\u00A0\u00C3S\"\u00E0:\u00FC\x14\u0090\u00C2\u008E\u0092\x1E\u00DD\u00CD\x12(\x1C\u00B2\u00F2P\u00D8\u00ADR\u00BD2\b\"\x14\u00EB\u0080o\u0089P5Zc\x07\u00E9\u00D3\u00C8\u00BC\u009A@\u00C0\n\u00A8\u00FB\u00C9\x16**pz\x174\u0086B{\x1F[\x05\u00B7\u00D4\u00F5\u00B6\u00D5&\u00A0Ph]\u0081\u0085\u00FEM\u00DD\u00CA\x0E+/u3Y\x03=E\x15\u008B\u00D9Qf\x1A\u00DFReyT\u00A4\u00BB7?u9\u00F7\u00B9\u00BD\u00FE\u009AA\x10P\u00C8OZJ^\u00DE\u00A8\u00BFvVD@\u008D\u00F3\u00FEI\u00E9\u008DT\u00FA4B\u00DC\x0Fc0\u00B6\x0F\u00D2\u00E5?H\x01\u00AF7\\wU\u00CD2\x17\x01\u00FFJ\u00E7\u00EDh\u00B8q^\u00D52w$\u00D3u/\u009CG\u00DE\u00BF\"\u00AFz\x13\u00BE\x18\u00FD\u00C1\x1CAf\u008D\u00C8\u00C6\u0090\u0082YMz\x1D\u00D4\u00F3\u00AD\u008D\u009B\u00AE.%\u00A0\u00A0.\u00E7y:\u00DC\n\u0099J \x7F1\u00C9`\u008D,\u009C\u00A5W\u008E\u00EC\u0099\u00D3U.\u00C1\u00EBMw\u00F7$>\x7F\u00BAq\x10'\r<0v\u009B\u00D4,$\u0081\u00C9\t\x1E\x02\u00ADx\x1C\r\u0092\u009Cs\u00DA8\u0090\u00AE\x1D\u00BBX\u00B0|T\u00FE\u00F8\u00B6(&Ex@\u00AC\u0099\u00C5\x01\u00D9\u00C8\x0B3\u0098!\bc9\u0083\u00D9\u00C9\u00F2\x16\x1DB\u00FD\u00B5\u0084.\u00C2\u00DFI\u00C2\u00B2J\u00DB\u00F3\u00F9W\x12\u00BA\u00E5\u00F6\u0080\u00C3\x07\u0099\x02\u00AEK\u00F79$3\u00EBzT\u00B04\u00B0\x7F\u0095\x06\u00E4\x15\u0097\u008B\u00C4\u00B4\u00B9\u00F6\u00FF1W\u00C0}\x06l[\u00A3{[\u008A\u00CA\u00F3\u00E9\x19\x1C\u00A9 \u00E5\u00A5,\u00DD\u00C8\x1B\x0BwDP\u0085\u00F3\u00FB\x1EA\u0090Y*\u008D\x0B\"=w\u00E8\u0094\u0083q\u00CF\u00B7\u00E4\u00A7l\u00E9\u00C6\u00AB\x02\x05\u00EF\u00C8\u00CFr\u0090o\b\u00A5\\L\x1E+\u00C5\u009A*\u0093\x13\u00B4\u00FA\u00EF*\u008E\x1E\u00C84\u00C9\u00A7\u00E3\x15X\u00AE\u008D\u00F2S\x17\u00C0\x1B.\u008Db|\\\u00D7\u00C7Q\u00E6G\u00C8\u00AD\u00BA\u00E5\u00E3\"\u0095\u00B8\u00DF\u00B9u:\u00CF_\u008DY\u00F0m\x05}\u00CE\x023\u00C1\u00EF\u00E5\u00E6\u00BE\u008F\u0091\u00DBY\u00C1 \u00C3\u008E\u00A4\u00EF\u00CB\u00C1\u00BEQz.\u00AE\x1E\u0095\\?\u00A0N\u00DE&\u00A17hq\u00C5KG.\u00CEe\u00BCY\u00DCVY\u00CC\x0Fe~\u0088\u009C\u00E2Q<\u00DD\u00E8'\u00D9\x12z\x0Bc\x17M\u00B3LqH\u00DF\u00BA\u00A0\u0092}\u00CA\u00F5\x15g\u0096\u00D0\u00EB0\u008B\u00C9\u00C2;\x19\u00A3\u00E2\u00ED\u009F\u00A0_b\x11\u00E5\u00B7.\u00A8\u0084n\u00A5\u0085\u00A9\u009BI\u00FE\u00D2, i\x13\u00CFT?\u00D6\u00B0[\u00E7\u00FD,\u00CD\x12*\u00CC\u00BA\u00AC\u0092\u009AcRY4\u00DB\u0095\u0081\u00C8\u00AA\u00D9\x1EI\u0085\u00D1\u0088`\u00BD\u0092\x11+\u00ECT\x04\u0099\u009F\u00D6\u00ADh\u00F9\u0082\u00C6u\u00DC\u00E70\u008D\u00EBj\u00EF\u00BFl\u00EB\u00A3\"\u00B15j\u00FFA\u00EE\u00D7t[\u00D1T!\u00EAVM\u008B\u00F4\u00D5\u00DD|X\u00D7?\u00C9\u00F9|>\x03[Se\u00E9\u00E8G\u00F2|\u00A64\u00FB\u00C1\u0097\u00EA\u00D7\u00CEz\u00C2\\\u00BE\x12\x16&\u00A9\x0B\u009A\u00C9L\u0094\u00AC\u008DUL!x[\u00E7R1\x0F\u00B7\u00D0b\u00DCl\u0085\u00AFR\x00\u00D6\u008Aq8]X\u00EA\x0F\u00D6\u00FC\u0099\u0086\x1B\u00E6\u0086\u00CB>\u0099\u00DCE\x0BT\u00E66\u00EE\u00DE\u00A7\u00E1\u00A6\u00F95\u00EB\u00E2\u00C0\u0084\u00CE\u00E1J\u009B\x0B}R\u00E7e}\u00DE\u00AF\u0096,\u0092\u00E5\u00DB!\u00ABG\u0083x\u00A3\u00E2\u00B0\u00FE!\u00BA\x1A6]\u00CD&\f\u00EB1\u0085\x188g\x16u\u00EC~\u00E5mD\u00A4j\u008E\u00E2\u0089\u008Ac\u00E2\u00EDBu3\u00A3\u00E5\u008A\x10\u00D93\u00A6Y\x17T\u00CE\u00FD\u009A\u00EEY\u0091\u009A\u00F7\u008A1\u00A1*eH\u00C0\u00A8\u00DBW\r\u00D2\u008F\u00C6\u0080.$\x15X-\u00C68F\u00C0\u00B4\n\u00AFpf\x18\u008F\u0085L\x12\u00F2G\u00A11\u0099C%\nAZ\u00A9\x04Tx8\x06d\x13\u0080\u00AF`\u0095\u0090>k5\u00DB%\u00BBjX\u00BF\u0088\u0080\u00F1.\u00A8\u00C2\u0098x\u00A9$ I\u0091\u009E\u00A5\u0099\u0092n\u00A9\u00CEk\u009E\u0080\u0083\u009A\u00E2.\u00B4\u00F5\u008A\u0080\x1A\x03\u00F6\u00A9\x0B\u009A\u0092|\x1CF@&aVM{\u00A7\u00E2>\x03\u00AC\u00BA\u00CF\u0087e\u00C5\x02_\u00AF\u00A3\x0B\x1A\x04X\x1F\x17\x18\u00E65\u00C8\u00F4\x13\x12\u00C2\b\x18\x04\u00C7I\x16[<\u00F0\u00BA\u00FA[\u00A8\u00EB\x1Dh\u00D7,\u008DS\u00CF\bK\x19\u009C,\u00B9Mr\u0093\u00D2\u0095\u00D5\n\u00E8\u00F2Mp\u008A\x10p\u00BE\x11P\u00E4\u0093\x15\u00F3\u00E7W\u00C1\u00C0\u00F9\x100\b\x1A6.\u00A4\u00CB{\u00AC\u00CF\u00FB:\u0091o\x0E\x04\u00C4\u00D7p\u00EB\"Y\u00BD`\u008C\u00E2~ei:\u00E9\u00CC\u009D;{\x16\u00F1!\x06\u00CE\u009Ey\u008A\u0092zD\u00E2\b\u00E8\u00F44\u00B4\tX.b,8^2J\u00E4\u00FBb2\x01;\u008C\u0080\"\u009F\x1A\"K!\x15%$T\u00A5\u008C\b\u00A8\u008A\\\u00FDLA\u00FA\u0083% `k\u00D6\x7FHv\u00C82U\u00B58\u009E\u0088\u00F4\u009F\u0099\u00D8`\x02\u0087.\u00EA3\u00B2\u0080k%\u00FB\u00EA\u00FC\u00C7\x07A@\x00\u00E9Y&\u00A8\u0080\bd\x04\x14\u00A9\x063\x06\u00AC \u00A0\u0087\u00ED\x1B5PZ\u00E1CuO\u00BF\x12\u00E9:,Il\u0093\x05\u00B4\u009A[\r\u008E\u0080\x19\x11\u00B0\u00DD\u008F\x01k\u00E87\u00F7\u00EC\u00A7\u00FB\u00DCY\u00B7z\u009A\u00EFj\u00D9o\x11\u0095D\u00A3\x1B\u00F9\u00EF\u0085)\u00DD\u008C\u00C1>\u00E4\u00C2\u00A2\u00F8\u00DFh\u00BC\x17\u008D\x0F\x0BW,\u0081\u0080\f+\u0098\u00FC\u00A0r\u00EA/\u0092\x07\u00F4\u00C3p\u00A0O\u00C7n\u00C9u\x12\u00B93,x\u00FF\u009B\u0084$?\u00E1\u008E\\\u00C0\u00FC\u00B8\u009F\u00E3\u00FC\u00DC\u0085\" \u00930\x10\x10\x10W\x05\x03\u00E7\u00CF\u00F1\x04\u00ECr\u00E3\u00D1\x00+liG\u009B'B\u00C8\u00EA\u00D1\x00\u00B0\x07\u0099x/\u0099%\u00B9sf\x19\x11\u00B3g\u00CF\x1C\u00A7\u0090{\x14\x1E_\u00D4\u00BFE\u00C7\u00C9\x1A\u00F7\u00D1P>&\u00E2m\u0092T\u00AC/\u0082\u00EC\u00E9\"\u00A0\x1A=# \u00D0\u00E9i\u00E8?\u00ADuHD\u00C2\u00DDL@@7\u00F4\u0097\u00B5\b\b\u00946\u00F9b\x17\f}v\x06\u00CD\u008C\u008F\u00E8\u00AEL\u0092\u00F4JJ\u0090B@@\u00D7\u0093q\u00A0\u00CA\u00AFXA \u00A0\u0082\u00FER\x02\x02\u008Dg\u0082\u00EF\u0098d\u0090\fr\u0097\u0084\x07\x1F\u009F\u00E2&\x03\u00BAV\u00A4S\u0094\u00C0\x1E\u00F6##W\fb\x12\u00A6U\x04d\x19\"\"\u00A0P\u00E5,u5\u00F7\u00D3\x1D\u00EF\u00AC_==\u00D6`\x15O\u00C8O\u00E9f\u00C2\u00C0O\u00BF\x13\u00C21x\u00A9n\u00CD\u008C\x1Dr\u00D6y\u00BF\x17\u008B\x7F>,\u00C3\u00FC\u00E5\u008Bm\x16T\u00B2D\u00FE\u00CF85\u00AF\u00CBN\u00A3 \u00B8\u00B4\u00E1\u00FA9\u00EFH\u00E65\u00AC\u00EFdk\u00D8t\u00A4\u00E1\u0086\u00CEy\u00EAn\u00BE\u00EA\u00F4|\x03\x10\u009E\u00E7\u00E4\u0085<\x16\x10\x02\u00DE\u00BC *sK;\x05\x03\u00E3\x1D\x01e\u00ED\u008A3\u00B2,\u00C0\x07\u00C1\u009F\u0094~\u00C5\u00A4Rn\u00DClfA\u00C9\x13\u008D\u0083]\u0097\u00F4\u00E5Z\u0092=k\u00C6c\u00F2`\u0091)\u00EB0O\x0F\u00E8\u00E7\u00A2\u00C6;\u0097\u00B9LT\u00C9K\u00F6\u00F4vg\x01\u00EF\u00F5\x044$\u00EB\u00F7\u008Fne\u00ED\u00F5`#\u00E1\u00EE \u00A0\u00DD\u0094\u00CF\u00AC\u00F4\x19\u00D8\u00D3\u00AD\u00AC\u00F9\"\u00AC' ]36j\u0083k%\u008C\t\u00D8\u00CB\t.\u00965\u008C\u00963\u00AA\x100#\u00C2+\x0B\x01\u00B3\u00B0\u00F1\u00C6\u00E6/'\u00A0\u00BF/\u0085?U\u00D7\u00D32.\x14\x051.\u00A2\u00F1P\u0085S/\u00C3=@yM\u00FFeY\u00BAqqQ\u00DC\x15\u008A\x1B;rE\u00EB\u00A3\u009B;V~V\u00E3\u00BCs\x156I\u00D6n\u00B6\u0097f\x11o\u008C\u00E4\u00D8B\u00EB\n\u00D7\x05]Y$\u00A0+_W\u00CE\u00B2x\x07\u00E7\u009B{N\x11\u00F1\u00AE\u0090\\\u0095\u009F\u00BA|\u009E\u00A2\u00A6*\u00F2\u00BC\u00FC\u00D4e_\u00CDOYF#\u00C6Iv0\x04\x19u\u00D9|\x1EM,\u00F0y\x1B\x17\x05\u0081\u00AC\u0094S\u008A\u00C5\u00DBx\u00BA \x02\u00EA\u009AC\x15r\u00BA\u008E\u0097X\\QO\x04\x0E.\u00A8\u00BF~\u00CEk\u00E4+w\u00F1\u00C2C%\u00C7+\u00ECh\u00C9\u00E1\u00B9\u0089\x0Bx\u008D)\u00D4=\u00D2\x1Fc\u00A2a\x10\x0B\u00EA\u0099`\u00AF\u0081\ts\x0F\u00B21\x1E .\x01\x1A\u00E3y\x02^]\u00B6$\x12\u00A8\u00AB\x1E\u00AC\u0096\u00B8I\x18\x0F# \x0B\u00F1\u00DFY\u00BAK2K\u00A9v\u00C7\u00F2#\u00C9\u00B0;\u00C6=;\u00BB\u00A7\u00CC\u00F7\u00E5>K\x04,\u00D6\u0097\u0094\u00BCd\u00C7\u0088\u0080X\u00C0{{KgA\x13\u00D4\u00FBG\u00B7P\u00C84\x06o\u00B2mmw[@\bC\x7F\u009C\u00C2\u0088/RW\u00C0\u0093%\\\x07d\u00F9\x02\u00DC#?-\u00F9C\u0092\u00D0\"2\u009BY\u0095\u0080V\u00B0\x0E\x14^HB\u00C6\u0095\u00B6\x10\u00EF\u00BC\u00E9\u00A8a\x01+P\u0098\u00B6\u008A\r\u00C1\u00BBF\u00B2\f\u00C1x\u00A4\u00BC\u00E4mf\u00AF\u0088B{\u009F\x1B\x03\u008A(\u009B\u00DB\u00FB\n:\u00E7\u00E7Rb\u00F9f\u00AE\u00C24\u00BEB\x02&/\u00EE\u0095l\u0096\u00FF\x17\u0092s\u00ED\u00E4\x18t\u009BM\x1A\u00F3=(*\u00BE,\u00CF\u0083\u00D2\u00B9V\u00C7E\u008A\u0099\u00AF\u00E3\x12\u00F9\x19o\u00FD/\u00F9_\u00CDO\u00EE\u00BEA\u00EE#(\x1B_\u00F1<\u00D1\\BN\u00FC\f\u00B4\u00C5\u0099?\x16\x17<\u008F\x05\u00D4\u00B9TR^\x05Z\x15\u008B\u0093\u0098\u00EE<\x11\u00D0&n\u00F2\x17w].\u00FFo%O*N\u00F9\x0F\u00FEK\u00F2D\u00FE\u00A2\x05\u00BF\u0096\u00FF7r\x1Fo'\u00B9\u00F3\u00F8\u00D1!xT\u00F2\u0082\x042J4V\x04\x16_\n#\u00A0\"\x1A7\x15\t\x18\u00D5/\u00A97\u00DE\u00BE\u00A4C\x12n\x1Bd\u009Cg{A\x1B\u00BF\u00D3\x1D\u00F5R \u00A2\x0E7[\u00FA>\x0F>?[$\u00B7\u00CBqJ\u00D3\u00DD=;K\u00EA-\u00F1e\u00C8\u008Eis\x16\u00F0\u00BE2\x02\n\u00BA\u00A6w9\u00F4\u009F*\x02\u00CA\x02J\u00DE\x1C\u00F5\u00E0*\u00FB\f\u00C0n#\u00A0,\u0096Mm\u00FB.(-x|r\u00A5\x04e\x04\x04n\u00CA>\u0093\u0099\u00A78^)b\u0086\u008B\u00E9~\u00DEh~\u00B1\x1A\x01\u00CB\u00C09\u00EFJ\x1F\x0B\u00C8\u0084\u00D0\u00FBO\u00C0\u008E\u0095\u008C\x1Dv\u00D5\u00ADh\u00B1FFp\r\u0088{\u0098Nb]9Y<\u008D\u009FT\x1E\u00EC\u00E4\u00C8@\u00B4\f\u00EBhE\u00FD\u00D0S\x1A\u00D6$\u00B9N\x16\u00CFUJA\u00E4cb\u00E3~\u00E9\u009C\u00A2#op;\u00DD\u00F0\u00BC\u00C8oa\"}0Q\u00EEG\n\u0093\u00BB\u00DD\u00EE\x7F\x1B\x0F\u00FAx\u00E7G\u00FC2P\u00D1J\x11\u00EB\u00F3\u00AE\u00B1+\x04TW;\b6H\u00DC\u00E6\x07\u00AF\u00A7\u009FG\u00EB\u00D7w.\u00B30\x10\x04\u009F\u008A\u00E2L,\f\u00E2|R\u00C7C$fq\\\u00DAD\u0095\u00E8\u0085R\\\x0E\u0089a\u00E0\u00DC+\u009D\x05\u00DC\u00B4\u00B8\u00CC\x02zp\u00AE\x1D\\\u00FA\x1A\u00E7A\u00C0\u0099\u00F2\u00BC\u00A1.\u00E7\x16\u0093\u00B1\u00D3\u00B7\f\u00E8\u00A8\u00B0\u00D3\u0095\u00FC[:\u00B2[I\u00F5\t+\u00AA\u00C6>`\x065x%{F\u00C7\x16\u008D\u00F3$\u00ED&\u008A\u00EF\f\u00D3\x05F@,\u00E0}}\x15\x04t(\u00E6\u00DD\bh\u009C\x0B\u008C\u0080\u0084Q\u00F1w'\x01\u00B1\u0080\u00E1x\u0084\u00F5F\x1B\u009F\u0095#\u0081\u0080`\u00BE\x04\u0082\u009D(\u00F9\u00A1\u0084\u00AE\x1E`\u00A7\n\u00C4\u00AAI@\u00A5\u008B\u00F5\u00A5\u00D5\u00C3\x1A\u00A3[\u009B\u0080\u00D3D@U\u0094\u00AA\x04\u008C\u0095\u0096\x11\u0090\u009D0+Z\u008B\x0F \u009Cp\u0088+zK(\u00AB\x07\x194\u00B8\x0F\u00DA\x14v\u009A\u00A9D\u00BA\u0092\u00C8Y\x1A\u0086\u00D7\x1E|&\u00B8T]\u00CD\u00E3%|+\u00E6z\u0085\u008Ep\u0091^\u00BD\u00A8\u009C\u00E6\u00FF\u0088\u00DCs\n\u0093\u0096R\x19J\u00BB\u00A3N\u00D7\u0086\f\u00F2\x1E\x19U4\x13\x0B|\u00BE\u00FE\u00BA\u00ABT\u00E9\u0083\u00E5r\u009F\u00E0\u00C2\u00A38Yk\u008D\u00FB<\u00F2\x13\x17`\x19\x0E\u00F3q\u00FC\u00B8c\x100\u0096\u00D4\x1F\u00827\nw\x12\u00E9\u0091\u008A\u00B9y\u0093\u00C5\u0085yD\x04\u00BC-\u0085\u0080\u0082\u00A5\u00EB\u0081\x05T\x00c\u00C3a:\u00B66\u00DD\u00B9\u00EC \u0093\u00BB\u0096\u009B(\u00EC\u0093Mw/?@\x16\u008F\u009D4\u00E8\x1E\u00D6tO\x0F\u00CB\n\x07H\x0E2\u00B9\x17\u00E9\u00A5\u00CC[\x15\u00CF37dO\u0083\u0080\u00B2\u0080\u00F7\u00A7\x11P\u00F0Y\u00E9?\u00B5\x19\x13m]\u00D0Q\x0F\u00AE\u008E2\u00C8\u00DE\u00D1bnS\u00F0\u00E7\x12P\u00FAF\u00C0\u00B2I\x18\u00A6\u00B6y[\u00A0\x04I\x04T\x18\x15\u0084]6_\u0096<,\u00A1\x02\u00B3H<V\u0085\u00BBQ\u00C2g#jY@\u00C0F\x01fV\u00A31`I\u00B7\"\x04%\u00A0\u0087\u00A6.\u00A5,\u00A0\b\u00D8\u00D3R\u00E3>]\u0091%\x12\u00D0 +b\u0087P\u00EC\u00E7yG\u00C0\u00CC\u00B6\u0091\u00BDm\u00D4\u00C0\u00CB\"\u0085\u00A2\u009E\u00CA \u00B8[\u00D2-\u00FF:\u009D\u00D6Oe\u00E2\u009F\u00A5\u00E1\u00F4x\u0090_\u0091\u00FF\x02\u00C9G-,\u008A7\u009D\u009F\u00E8g\u00A5\u00DC\x10\u00E5\x1E\u00F9\u0095\u00B7\u0092x\u008E\u00BCS\x07y\u00DD\u00F2\u008A\u008Fs\x07o\t\u00E9n\u00BA\u00A3\x13K#\u00F3\u00A1\u00FC%]\u00D3\u00E4\u009F\u00E2\u00D3\t\u00E3\u00F8\u00FC\x04\u00F9y\u0083\u00B2Uw\u00D3\u00B6\u00A2I\u008A\u0096Vb\u00F7\x12d6\u00EB\u00F8]9\u00E8\u009E\u0086\u00E7{\u009D\u00CC\x0B:\x12\x17\x17\u00F7Z\x17j\u00C2\u00C0\u00B8\u00D9\u008E\u0080\u00B7/I%\u00A0\u00C1\u00D2\r\t\u0098\u00D9\u00DAx\u0087\u00BA\u00A0>\u00AC\x02>\\\x16\u00CF\u00DE\u0086\x10\u00E9\u00D2\u0097\u008A\\>\rX@eE\x04\\\u0099N@\u0083\x1E\u00E4)\"`\u00D8\x05}\u00A8H@PV\x1BK!2\u00D0\u00DD\u00A0\x1B9(\x02z}\u00C6m\u00D1:\u00A0\u00C2\u00C2\u00C5zv\x1Et\u00CA\u00CD\u00CB\u00AE\x06\u0085\u00D9v!\u0085\u0095\x13\u00B0b!^]D\u00D2\u00A6\u00E0\u0089g7\u00CC\u00D3\"V\u00EA\x02\u00A8\u00D7gr\u0087\u00ADn=T\x0E\u0085\x1D\u00A5sJ\x16\u00EB\u0081\u00C8\u0087\u00A5\u0084\u00A4{\u00D7&\u00A0\u0091O\u00D6\u00C4\u00D6\u00F4v\u00D5\u00F5\u0096\x13P\u00F1m}\u00FF\u00AC\u0082\u00FF\u0086\u00F7:\x04\u00B6a\u00FD\u00AE\u0091}m\u00C1\u00E6\u00B6^6\x00\u0087\x0B\u00C9\u00829\u00F8\u00E4\x03\u008D\u00CE\u008B\u00AA\u00AA\u00DC\x17\x15\u0082\u00FB\u00E7\u0095\u00AAQ\u00D1\u0093w\u0087V9N\u0094;*K\u008B\b27\u00D6_;\u00EBb\x1F`\u00C8_\u00B1\u00847Jxc\u00C0\x058\u00BCT\u00B7n\u00F6\u00E1\u0085\u00CB\x17\x0F(\u0094\r\u00CE>\u00D8\u00D0\u00D4p\u00FD\u009C\u0081\u00DC%]<wUx\u0082||\u00DC\r\u008A\u00FE\u008E\u0086\u009B\u00E6\u00F7\u00E6.\u009Cg\u00DB\x16\x15\u00B4\u00BDa\u00C3\u0082ws\x17\u00CC}VI\u00FBe\u009C(\u008D\u00A3\x1A6.|.7\u00A1Sd\u00B6\x1DM\x16\u00E8\u00A3\u00FB4\u00BE\u00E3-\u0092\n\u0088|<O&}\x02\u008D\u00E3\u00AA\x13P\u00C8\u008E\u009D!}\u00BB\u00B1\u00AD\u008Dw.\u00B31\u00E0\u00C0\u00D8\u00E9\u00BC\u00C1Bw\u009A\u009E\u0095\x10\u00E5\u00C9\u00CF[\u00D8\u0086\x01\u00F2\u00EF\x11\u00C5{XsH\u00DD\u00E4\u00D9`\u00F5w\u008Ez\u00A0\x16\x01e}Ni&\u00EF\u0082,\u00E0C\u00D7D\u00A9\u0085\x18\u00A2J_m\u00DB\u009A\u00ED\x05\u0094\u00D4\u00BCi\x0F\u00B6s\u00B15(\u00DE\u00ED\x0B\u00B7\u00ADA\u009E\x1FKX<\u00A7k\u00C0\r\u00F3\u0086Aq\x0B\u0095\u00D3\u00B1\u00ADh*\u00EB\u00D8\u00B4\u00BA\u0081\u00AE,\u009B\u00B4\u00C3\u00F0\u00B4-n!\u00B0Fk%S$\u00E1v7Z\u00E6\u00A4\x19Z\u00C6\u00C5\\\u00DB\u0091\u00DA\u008A\u00A9\u00A2\u00AC\x1C\\\\\u00E5}\u0096\u009EC\u00EB}L\u00D1k\u008E\u00AFKB\u00E2\u008DV\u0098\u009Fp\u00B0_\x0El\u009Fb\u00D3\u00F6\u00E1\u00F20\u00EEU\u0099[\u00E4:\x1D<\u00D9\"e^2\u009E$\u0087_\u0090\x0E\x11|S~>\u00B1\u00E1\u00A1\u00C8\u00C0v\u00A4<\u00E0\u00BCNY\u00BF\u00F4J\u00D8f\u00C5\x0B\u00C7\u00AEk\u00E5\u00E2\u00A8PL\u00D6|J\x01|\u00D3\u00C7!NRsz\u00BFs\u00B3\u00A6{\u00AA\x0F\x12\u00E1\u00CC\u0092\u00EA\u00F11\x11g{D\u00DDT\u00BF\u00C1\u00B6\u008E\u00F9/ \x04K\u00E5\u00E6\u00AB\x0B\x0E\u00EE\x1A\u00ECZ\u00A1\u008Bm\x7F\x11\\\u009C{\u00FE\u00BE^\x14\u0093\u008C)\u009A3\u00F2s\x1Fls+*\x04\u00991\u00FAa8\u00F3\u00AC\u00DC\u00FE\u00E3_\x16\u00CD\u00A4\x1A\u00E9\u00CA\u0080x\u00F5\u00E2YrFa\u00F0\u0081\u009D8\u00ECGf\u00C2+V\u00CF+\u00CFs\b4\u00BCI\u00DA\u00CE)E\u00AFK\u00C5K\u0084\u00C8I\x17\u00F4\u00C3\u00B2\"\u0089_*+\u0087\u00F4\u00E9\u0082~P\u00FA%[\u00A8\x14n\u0096\u0090\u00A7\u00A2q\"\x05@\x0B\u00CBd\x04]3\u00BA\u00C3\u00F6\u00E98,\u00A0t\u00CC\x02\u00CAZ\u0095\x10P\x16\u008C\u008Ar\u0090\u00C2K>\u00BF\u00A7p\u00DB\u00E2Vn\x11\x15\u00CE$\f\u00AF\b\u00CDR\u00FA\u00BC|k]PY\u00BC\u00A3d\u00E9J,\u00A1\u00EB\u0082f>\u00AC\x02\u00D9\u00C2\u00C4\u008A\x0BMG\u00A1\u00BD\u008F\u00BC\x1CR\u00D7\u00DB\u0096Z.\u0085\u00D6^\u00DD\u00A3m\u00B5rp\x0Fxx\u00DD\u00AA\x0E\u00DB\x0FZh\u00EE\u00A1\x15\r\x17\u009D\u00ECW\x07\u00AC\u00C2Ur|\u00AC\u00FE\u009A\x19\u00D1\x03\u00CBO\u00E9\u00FE\u0081\x0E_\x0F\u00D5\x1Cx/.\u00F3\u00A0\x1Cn\u00A2\u00CB\u00D5\u00B3\x1D\u00F5\u00EBfGc\x15@\u0099\u00CB\u00DA\u009D*\u00A7\u0091\u00D0\u00B4\u009C.\u00E7\u00D2\u00AD,~\u00BF\u00C6En\u00AE_\u00DFY\u00A7.\u00E77\u00E4\u00C7\u009A[\u0094\u008F3g\u00A5\u009B\x1EA@C\u00FB{%\u00BD\u00BF,\u00A0=\u00A3\u00DC\u0084\u00B9|%@\r\u0082\u0094\u00BC\u00BA\x1C\u00BFj\u00B8e\u00D1q\u00B9\u00F1s(s\u00D6\u00DEN\u008A\u00C5\u00F1w\u0086\u00BA\u0099\u00F6\u0082w\x1C\x03\u00E7\u00CC\u00A2\x0Bz\u00A0\u00BA\u0094%\u00CF?\r\u00D93\u00A7\u00D1\u00A8\u00EE\u00A51^\u00C5'\x12\u00B3\u00A7wp\u00DD\r\x1A\u00DFY\u0099d\u00C7\u00B4\u00CB\x18\x04\u00876\u00DD\u00D7\x177\x06\u0089\u00E8\x1F\u00DD2Zy\u00A4\u00A71\u00B1\u00E9\u0081\u0095V\u00CF+\u008661\u00F4\u009F<\u0095H\u00F22t\u00D4\u00C3\u00F6\u00E9\u00CFD0\x1E\u00AB\u0080' \u0096jP\x16\u00D0\x130>\t\u0093\x06\u00D6\u00FCX\u00EF\u00FB\u00B8\u00C6\u008BtAUOl\u00F1\u00BC\x16\x01\u00B9\u0099\n\u0082H\u00D7\u00B6\u00B8I\u00C7\u009B{\u00D3\u00B7u@\x15\x16\u00AF\u009A\u00F0\x12m*\n\x1D\" \u00B3uA\x00i\u00A2\u00EA\u0090\x06#\u00A0\u009B\x1942%\u00A1\u00D0\u00BA\u0082\r\u00C2\u00AE\x1Bgb?/\u008F\\\u00D9\x1E\u009D\u00A3\u0096\u00F5Hk]\u0089\u008B\u00E9\u00E8H7\u00A7\u00F4>\x03\u00AC\u00B7s8}D\u00E5\x1C\u00D8\u00EB8\u00CEo\u00D1AYK\u00EB\u00A0\u00D8OP\u00C6\u0088\u00D3'\u00D0\u0096\n\u0092\u00C6|\u00E1x\u00905\u00BDb\u009C\u0089\u0085\u00AB\u00E5\u0097\u00C7\u00B9\u00F9\u00D1!\x18!'\u009Fld\f\x18\u00DB\u00A0\x10\u00CE\u00AE\u009A\u00C7\u00E9+\u00FD\u00DC\u00F8\u00AB\u00C22\u00FFx\u0094N\u00A8\u0097p\x0F\u00D9\u00B3g\x0EW\u00DA\u00A0f\x03\t\u008C\u0080,\u00D0\u00C7\u00F3R\x02w-\u00A5\u00C7\u0098\x0E\x02\x0E\u0093\u00BF>{Z\u00DB\u00DA\u00ECi\u00AD\x1B\u00FA\u0091\u00D1&k%'\u00A0\x17\u008A\u00F4\u00A8\u008BJ\u00B7\u00A2\u0097V\u0081\"\x01m\u009C\u009F\u0092\x17\u0087\n\x12\u0086\x04\u0094\x05\u00F9\u00B3&a\u00A4_s'\u008C@\u00D7\u00F1V\u00C9\f<\u00DC\x18\x16P\u00CE\u00AA\x04Tx\u00EA$L\u009C\u0088\u0085i\"\u00A0\u00AB\ft\u00F7\u00FE4ry\u00B3\u00EF\u00FBWB\u00E3:7\t\u00B3\u00A2uP\u00F7\u00A9q\u009E[\u0086\u00E8kK\u00AD\f\u00FEA1\u00FD\u008E\u00CF\t\x7F\u0081\u00FF\x12t\b\u00DE\u0094\bu\u00DC9\u00C8+\u00F5kf\u00B0la*\x11\u00DCz\u009C\u00D3q\u00FAT0\u00CA\x1CwQ2\u0089\u00DDl\u00E2x\u00CB\"\u00AE\u00C7\u00F19I\u00F2:\u00E0\u00C4\x05\u00CC^\u00FA\u00FD\u00A4>\u00CE\u009D\u00B3\u00A4\u00E1\u00E6\x05{\u00EBx\u009B\u00AB\u0094\x04\u00D9\x0Fr\u009E\u00C4M\u00C2DHZ\u0088\x17\u00C9x!w\u00D3\u00D5\u00EC\x05-+\x03\u00F3\u0084o\u00DB\x18\u00B2g\u00CD\u0084\u00ACA\u00D3\x1D\u00DD\u00832\x06\u00D93:\u0098y\u00DC\u00DAtO\x0F\u00DF\u0084I\u0086\u00BF\u00E6\x00\x160\u00B0\u00D9\u00D2wt7\u00B7\u00EB29E\u00FDHalZGr\u008A{(;\u00BA\u00D5z\x17\u00D9\u00D1-\u00CC\u00F6\u00FEIa\u00E9i{8\x02\u00FAY\u00D0\u0087\u00D7(y\x1F\u0091\u0082\x12\x12\u00EE&\x022.\u00B0o\u00C2\u00E8F\u00D9\u00CC\u00CB\x0E\u0085&\u009D\x1BN*p\u0093\u00EF\u0089\u0080!\u008C\u00886m\u00CC\x1A\u008FM\x04\u00F0\u0092,\u00AF\u00D0D\u00D05\u00F9y\u0085\u00A3#\u00A0\u00BA\u0087!\x01\u00ED\u00B9\u00A4\u0097T\u00A1\u00AD\u0097\u00B4E\u00C0vG\u00C0*\u00BA\u008Ad,b*\\\u00CB\u009E@\u00F984\"\u0086y\u00F0#~\x13\u00B0\x05\x1A\u00F2\u0093\u00966\u00CA\u00AF\u00CA\x12\u00EA(\u0090\u00B4\u00C2O4\x00\x1F\u00A7\u00BF\u008A\t\u00A7\u00FC\u00A5\u008B\u0086(\u00E2h;\u00D1\u00EB9\u0091\u00C5K\u00DA\u00ADb\u00D6\u0098\u0089\x0B\u0096\x16J\u00E3t/|\x03\u0096\u00E3\"\u00FD0A\u00E2\u00E2\\\u00DAX~\r5\u00F0{\u0094\u00A4o~\u00E4\x15\b\u0098;w\u00F6G\u00E5.\u00EEK\u00D5Q\u00E9\u00BE\u00D2\u00F8\u009D\u00A5\u00D1\u00D7\u00E5\u00B2g\u00CD\u00B0\u0085\u00F8\u00A6;\u00979\x02\u00A2[\x05\u008E\u0080\x19\x11p\u0085\u00B7:)\u00FA\u00EEz{\u00EB\u008A\u00C3\x1A\u00EF\u00EB\u00DD\u00A6dY\u00B3\u00C5\u00C2_\u00DFt\x7F\u00DF\u0086Q\x0F\u00AC\u0094\u00AC\u00DA\u00A00\u00C6\u00A6\u0084\x1F\u0098=U\x04\f\u00ECc\u00C8\u00AA\u00A3\u0096\u0080%\u0095\u0084\u00FE\u0093\u00A6P\u00E6n\x16\u00F4\x11\x11\u00B0\x06\u00FA\u00FFi\u00F2\u00B0\u0088\u0084\u00BB\u0089\u0080\u00F6\u00A6\u00BB\be\x04\u0094\u009B5I\x06\u00B3\u00E7H\x16J\u00BE(?;X\u00DE3\x01\u0081\u00C6utA\u0099\u00B4a\u00A2\u0087\u00AF\u00AA\u00F1Q\u009E\u00DF\u00D2_\u008F\u008BH\u00B7c3c@\u00B5\u00C6\u00A5\x160\u00BD\u00AC\u008C\u0080\u00EA\u0082F\x04\u00AC\x01\u00DD\u00E71\u009Ex\u00B1\u00E7e\u00EF\x07\u00C6\x10Z!\u00AF\u00E3ZX\u00F7\u00A5\x01\u00F3{\u0098\x15\u00B4cQ\u0098d\n\u0082\u00C3q\u00EBZ\u0091\u00E8\u00A7dL\u0093\u00BB\u00A4\u008B)q\u0096!\u00FC7U\x14\u00E8\u00F4p(\u008D\u00B85\u008E\u00E2^\u00AC\u00BFi\x1E\u00B3\u00B4\u0096?\u00976\u00C1\u00A6`\x1B\u00AB\x1B6,Tca\x0B\u00F5:\u00C4\u00D2\f\x02\u00B6\u00DC\x15\u00BF\x02\u00E0\u00DE\u008B,\u00C6[X\u00C0\u00F7b\t\u00B6\u00F5\u00C90\u00EF\x16\u00CBF\x00\u008F\u00ECX\x11P\x11\x11\x01A\u0098F\x024\u00CEs\x16\u00F0\u00DE\u0090\u0080B\u008A\u00BE\u00AE\u00A6\u00BA\u0098\u00F9\u0080\u00C6\u0080\u00B6\f!\u00E21\u00D9\u00F3]E\u00FCNVoK\u00FF\u00A9\u00CD&\n\u00FB\u009D\u00C2\u00D8\u0081\u00C4\x1C\u00C6\u00CE\u00A6\x07W\u00F9\r\u00E1\u0096H\"\u008C\u0080~\u00F3K\t\x01S\u00F2\x02\x01\x15\u00B9\u00B7\u0091pw\x11\x10@@\x1D\x0E\x14\u00A1\u00EC\u00CB\u00D8F\x06\u00F7.\x1Eot/\u008BYD\u00C3{$ \u00BA\u00EC\x02yL\x054\u00AB\u00AE\u00A7\u00E5\u00F1\u00A4\u0092*\u00B4\u00CB\x02\u00B2\x10\u00DF[\u00D6\x05\u00B5\u0082M\u00D0o\u0085\u0080\u00B2\u0080+\u00CB\b\u0098R\u00A8\u0085\u0096\x1EZU\u0096/\x04K\u00D4\u00E9\u00FA\u00998*\\~r\u00F7\u00A1\u00F23V\u00F0q\x16\u00BF\u00A3n\u00ED\u00CCJ+\x1B\x04\u00A3\"\u00BF\u00D7U\x1A\u00CF\u00EA`[\u00CF\u00CA\u00E2\u00A2e\u009E\u00DC\u00C5\x0Bi\u008D!\u00A0Z\u00EF\u00A0\u00DE\u00E2\u00EDz\x1C\u008C\u00F0ln\u008E5\x04Q\u00DC\u00D3<\x1F\u00A5m\u00E3H\x0B,\u00C6\u00B9Es\x10\x04\u00D7H\u00B6\u00C5\u00E2\x10\u00C6V\u00BC\u00F5\u00E2`\u00E9\u00DB1.6\u00E6T\u00DA\x1A\x13\u0097\u00C7\u00B9\r\u00EF\u00D9\u00B1\u00D3\u009D\x05\u00BCkyi\x17\u00D4N\u00A8D\u00F6\u00F4vO\u00C0\u00DE\u00D2qW\u0082\u00BE\u00C6x\u00F4*T\x1F\u00AD\u00C7\x14\x03\u009B\f\x02\u00DE\x1A\u00A1\u00D1sb[#m\u0087\u008D#`\t*\x13/\x12P]\u00D0\u00C1X\u00C0oM\u00A2+\u00BC\u00F7\u00A8G\u00AF}\u008B\u00BD\u00A3\u00EF\x1B\x01\u00DD\u0083+\"N@\x17R\u0084\u00CEgz\x1C\x02NU\u009A\u00D7H\u00F7\u0080\u0090\u0080\u008A\u00AB$`Y\u00DA\\\u00CB\x13\u0090\x1D\u00FF\u0097*\u00E0.\u00C9\u00C4\u00BA\x15-\u0089_\u00BC.\u00B4\u00F7\u00B91`o[\u00C2}V\u0096Y\u00A1u\u0085\u00EB\u0082\u00AE\u00EC\u00A8\u00B4\u0080\tE\u009C\u009F\u00BA\u009CWy\u0098)\u00F4\u0095[\u0081\u0096g\u00DC\u00B1\u00EE\u00A8\u00DB\u00AE\u00E5\u00E2]\x1C\u00B2\x7Fa\u00D2\u00D2\u00F1V~\x12\u008E\u00F9\u00CB\x17\x1F#\x07\u00F7\u00E5\u00C2\u00ECTs\u00F3\u00BD\x13,\u0085\u0085;\u00B1\u00C8\u00D1\"\u00DF\u00F0\x18\x01\u00C9K\u0097\u00E2\u00EC\x15\u00A3\u0098l\u00AE\u00BFq\x1E\u00DDI7\u00E1C\u0098\x1C\u00A4-yf`B'\rO\u00D9\u00A4I\u00F0f\u00C3\u00C6.kHr\u00E3\u00E7\u00D05\u00C3\x1A\u00AE\u008F\u00E2Qv\u00EE\u00D1\u00B9s\u00AF\u00E4m\x19\u00DC~\u008C\u00E8\u00E2\u00946>o\u00EDcon\u00B8\u00F3p\x1C\u0097=s:\u009F%\f\x1Ae\x01M\u00BB\x04\u00E5~\x11p\u008C'\u00E0}e\x04\x14\\\u0089\x15\u00D1?\u00BA\x05\x02\u00D2P\u00F0fEI\x0F\t\u00FF\u00A8\x07W\u00EF\x18\u00F5\u00D0\u00EA-\u00A1H\u0097\u00A5\u0095\u009D\u00A3\x1E\u00BE&\u00B6\u00DFY\u008Aa\u00BEc\u00E8?i2\u0089\u0090\x17\x11pmYl%\u008C\u0080\u0099\u00CC\u00DE\u00A3\u00BE{\u00ADu\u00BF!\u00C9n\u00B5\u0080\x12>t\u00CB\x07z\u0093\u00C0[\u00D7,!\u00F0\u00D9C6\u00DA\u00F2\x01%fekb\u00F3\u00B4\u00D5T\u00E6oJ\u00D8!\u00C2'&\u00BE\u00A4.f\u00B4Y\u0097\u00C2\u00E2A\"\" \u00DD_\u00D6\u00A5\u0098i\u00B3\u00B0\x12\u00E0\u008D\u0085\x15ZD@\u00BA\u00A0I\x04\x14\u00CA\x1Fp~\u00EA2#`\u00FD53\u0088:\u00C2\x12$=K\x17\u008D\u00921!\x13+X\u00A30N\x7F&\x1B\x0BW,\u00F9O\x1D\u00EF.\\\u00BE\u00F8\u00A7:\u00FER\u00A1GG\u00F9u\u00FA\u0090\u00E7\x07\x12\u00B76\x1A\u0086[\x1A\u0099\u00AF\u00CA\u00FD\u00BC\u00E4\t\u00B9y\x1B\u00FC\u00D7\u0092\x0E\u008B7\u0095H\u00EF\u0089\u00FC\u0085\u00F3\u00B0\x06\u00D1\u00B64\u009F\u00FE\u0096\u00C6\u008D]\u008C7Y\u00BC\u00A7\u00C7\u00E0\u00CEqb\u00B3\u0096\u00B9\u00F1W\u00D9\u00C4W\u00C3\u00AD\u008Bx\x1FO\u00E5I\u0097\u00CD\u00D2\f\u00F5\u00F8\u00E0\u00D4\u00DC\u00DC\u00B8\u00D9\u00E8\u00F1Q,\x1Fl?\u008C\u00F9\u00AC\x0B(7\u0093g8\u00EC\u00CF+\u00D15\u00FB\u00A1\u00FC?\x1A8s\u00DA\u0093\u0092\u0092\u0097\u0087\u009D~\x11\u00D91mX\x1D\x11\u00B0\u00AF\u0082\u0080\u0086\u0098~\u00FF\u00A9\x1003l\u00D4\u0083\u00ABh\u0098*\u00D2\u00B2\u00B0\x18\u00FAO\u009EJ\u00E3n\x04t!\x1E\u00E5\u00A7\t\u00EAR\u00D2\u00EDwc\u00C0GS\b\x18\u00CFK\x19\x01\x01\u00EBt\u00BB\u008D\u0080\u00D2\u00C5\x02\u00B2\u00B0\u00DCAx\x1C\u00AEe\u00B1I\x15\u00C6\u0088\u00D7\u00E9&\u00BE\u00AE\u00CC\u00F2\x10\x7F\u00B2y\u00FA\u00EA\u00FBe\u00E5\u009A%'J>%aC\u00C1\u00E1\u0085\u008EU'\x14:V^ \u00B9Ew\u00C6g\x05\u00D8\u00D8}\u00DE\u00C8\u009E\u0096+D\u00C0\u00C4E\u00FB\u00CD\u00D6\x05\u00CD\u008CQ\u00BA\u00D3t\u00CE\u00A1\u00C5V-\x0E\x15\u0092/'u)\u009D\x05\\\u0095L@C\u00ACP\u00F3S `f[\u00FD\u009A\x19\u0081\u00BA\u009ALj\u00B8I\x17K\u00D3\x04Km\u00DFV\u0095\u00B5\u00E3\u00FE\u00A8\u0088\u00FF\u00EA\u00E3L\u00CD\u00EBb\u00C1>-\u00D7\u0097Ui?/\u00C1\"\u00B9\u00F8PWc\u00B1\u0086\u00F5\u009D\u0090\u008B\u00D7kJ\u00E3\u009C0\u00D9\u00C1\u0096\u00B4\u00BFU\u009C\u009BUui\u0087\u00C2\u00EBE\u00EB\u00E5l\u00D2\u00D1O\u00F8Di\u00B8\u00E5\x01\u00EB\u008A\u0085\u00FA.\u0080\u00B8\u00DCy\x100\u00B3\u00BD\u00F1\u00B6\u00C5\u00F6)\u00C8\u00C6\u00DB\u0096\u00BC\u00AE\b\u00BA\u00A5N\u00D7T\u008D\u00D0c$\u00BC\u00E2\u00C4\u00FD\u00C4\u00E3\u00C2\r\x13rg~\"?\u00CB,\u00E6\u00B1\u00EB8]\u00BA\u00A2'\u00C8\u00CF\u00ABO\u00A5\u009B\u00FD\u00C3t\u0084\u00ECi\" \u00930i\x04\x04^\u00DD\b\u0098\t<\x01\u0085b2E\u00C4\u00C2\u00FAO\u009E\u00C2,h%\x01#X>\u00CD\u0095\u008D\u008F\x01\u00D3\b\x18C\x12\x01\x01d\u00A9\t\b\u00A8B}Oc\u00C0\u00AAP\u00B6E0*\u00DB\u0090\u00BA\u009E\u00E6\u00974\u0096\u00E3\u00F3\u00F3M\x12f7Ig\u00BCt\u00F8n\u00C9\u00DD\u0092\u00D5:\x01K\u00C9\u0097\u00A9Y\u00E68N\u00C4\u0083|\u0085\u00C4\u00EB(\u00ED\u00CD\u00BE\x0B*\u00E1\x03E\x16\u0096\b_\x19\u008C\u0080X\u00C0U\u00D3\u00D2\t\b|:\u00F9)\u00DD\u00CE\x02\u008A\u0080.$h\u0092\u00BFX\u00B9\u00F9qkr!\x01?Pw\u00ED,\u0096!\u00D8\u009A\x05\u0099\u0088\u00F7\u0087\u00C8\"\u00D9i>0L\x03\u00E1\u00D3z\u00D6\u00985\u00DC0\u0097\u00EFh\u00F2\u00AE\\\u0099\u009E?\u00AFx\u008E\u0089K;\x03\x01'\u00C8\u0081\u00B5to7DzrfB\x12&\u008E\x15y\u00ED\u00C8\bh:!\u0082L\u00AF\u00C2_\n\u00F3\u008E\u00BA~\u00B0\u00A2\u00EE\u00ABcQ\x1ADD\u00BB\u00962\u008Dw-+\u00E8\\\u00DE\u00B4\u00F7q\x1C9\u0094\u00F8\u00CBf\u0094\u00DD!{Z\u00EB\u00C1\u00BA\u00D2\u00D6\u00A6\u00FB\u00AB\x10\u00D0\x10\u00B0a\u00DA\u00BA\u00A0\u00EAj:\x02\x1A\u00C2kTB\u00E3:\u009B\x05\x1D\u00F5\u00F0\u009A\u00E4\u00E7o\u00F9s\u00CE\u00F7\u008B\u0080\u00A0*KD(\x16\u00C1m/\u00A8H5\x18\x02\u00DA^\u00D0\u00F8\x18Pa\u00EC\x14 \x1D\u00FB.\u00A8n\u00E2v\x11\u00CE\u0096\x0FD@6\x10\u00F3i\u00BF\u009A\u00930\u00B2~\u00A4\x01\u0099\u00B6\u00D7\u00F5\u00B6\u0096V\u0086\x04\x14\u00DAz\u00F9\u00A4\u00BC**\u00C5\u00C6w'm)\u00E48u1K\u00FE\u0093PPh\u00EE\u00D9_Jt\u00D1\u00DE\u00AE_=\u00BD:\x01\x05Y<,3\u009B\x13\u00B6\u00D5\u00AF\u009D\x19=\u0080\u00FC\u00A4\u00A5\u00B2\u00CC\u00C1F]\u0091\u00BD\u0088,\u0083@8\u00B6\u00B0\u00F1\u00BF\u00FFl\u00AB\u00FF\u00F6\u0095\u00CC\u00B4\x19r\u0097]\u00CD\u00B8\u0088-uLP\u00B1\x05\u00CFu\x01C\u0098SV\u0094-p\x01\u008DNpk\u00C3\u008D\u00F3b\nJ\u00E3\u00A2\u00F9\u00FF\u00A8\u00B8\u00C9\u008A\u00E3\x13\x1E\u00B2\u0082\u0084:\u0095bR\u00C1\u00D3\nzT\u008E\u00BE\u0086\u008D\x0B\u009F\u00CFM\u00E8\u00E4\u00CD\x06\u00FE\x0B\x025t,\u00F8[c\u00C7f\u0085\r\u008D\u009B\x16\u00CF\x1A8\u00F7\u00CA\x05\u00F2\u00F3\u00CA\x13]2@\x17ny\u00C3mKV'5v\u00D9\u00B3g\u00F2\u00E20;\u0080(\u00DF}\u0095\x1E[\u00BF\u00B8:$\u00B17&\x04\u00EE\u00FB\u00BA\u00A6\u00BB{x3\u00C6\u00E07K\u00AB\\\x02^\u0082\u00F6\u00E3H\u00FB\x15\u00CC\u00B1N\u0096\u008E/)\x18\u00FAOk\u00E5\u008BeDl\x1D\u00F5\u00C0\u00CA\x1A\x04\u0094\u00FE)\u00CD\u00BCs\u00FA\u00B6\u00C6w1\x02*\u00FC\u00E4\u00A9\u00EC\u0094\u00E1\u00D9\u00A8w\u00A2\u00E4\u00DC5!\biR\u00AF|\u00DD\u008A\u00E2\u00E2`\u00F6\u0097x>.-h\f\u00F8\u00E8\u00B5\u0095Ze\x10\x01\u00A9/\x7FH\" \x18\"+\u00C7\x17\u00AF\"Xk\\\x04'C\u00A8\u009A\x04\u00F4\u0088\u00FD\u0097\u00C6\x11\x18\u00A3\u00D8\u00C7W=\u00D8\u0096\u00C4\x1E\u00C1\u00F0S\u0080l[\u00F3o\x03\u0080\u0084{rA\u00CA\u008B}R\u00AE\u00F8\x00J\u00CFa?j\u00BC\u00CB!\x12\x06\u00D1C\u00F7a,\u00E2\u00BB\u00ADZ\u00FE\\\u00F7\\\u0099\u00CA\u00B7\x06\u00C9\x7F\n!\u008A\u00F4\u0090#r\x03\u0096\b\u00E2\u00F7Y\x16_Z\u0086\u00F8\u00D9\u00F7\u00F8\u0082\u0085\x16\x7F\x1C\u009C.\x15\u0098}\u00A0\u00EA\u0082\u00A9;\u00CBg y\u00C3<cksn\u00F9&~^\u00A9\u00DB\u00979c<\u00FBo\u00B9\u00B1\u00FC\u00DC\x0B\u00FB4\u00B1>\u00AF\u009A\u00AES\u00A7g\u00C0\u00ECmq\u00C9\u00A4$\u00AF\u0091\u009E\x03\x134\u00EE\u0093\u0094\u00F6\x06B<\u00AA\u00E4<s\u00DA\u008F\u00DDg\u00CC\u00EF\x10\u00F7G\u00C1\u00D6\u00DD\u0084\u00B4l9<L~\u00F6\u00E3\u00F2\x1C\x18V\u00A8N\x04\u00CF\x14U\u00ED\u0097Oq\u0090\u00EF\u00F2\u008C\u0094\x1C\u008A(\x7FF!\u0082/)\u009C\u00FB\u008A\u00C3M\u00F0\u0085=\u00A6\u00EA\u00E0\u009DJ&\x15\x07\u00B5\u009DS\u00A0\u0091\u00C3\u00D8\u0094-S\u00ED\u00C1\x1E\u00EC\u00C1\x1E\u00EC\u00C1\x1E\u00EC\u00C1\x1E\u00EC\u00C1\x1E\u00EC\u00C1\x1E\u00EC\u00C1\x1Ed2\u00FF\x0F\u00C5\u00B6C\u0089M\u00D2\x1B\u00A1\x00\x00\x00\x00IEND\u00AEB`\u0082";
        fadeImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00-\x00\x00\x00-\b\x06\x00\x00\x00:\x1A\u00E2\u009A\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x03\u00ECIDAThC\u00D5\u0099YHTQ\x18\u00C7g\u00CC\x16\bm\u00B3\x10*\u00B4\u008D\u00A2\u0085\u008A\u0082(zi\u0081\u00C0\b\u00A9^\u008A,\u0085\u0094\u00B2\"\f\u00C4\u00A8^\u00AC^\u00A5\u008C\u00B0\x05\u008C\u00A2\u00B4\u00A0\u0087H\u00A8\u009E\u00F21\u00DA^\u00A2\u00A2^Z\u00A9,\u0092V[$k\u00A6\u00DF\x7F\u00EE\u00BD2\u008C3\u00A3\u00E7\u00CCU\u00C7?\u00FC<\u00DF=s\u00EF\u00F8?\u00DF9s/\u00F7;\u00C1\u0080\u00AB\u00DA3%\u00994\u009B`\x11|\u0087v\u00E8O\r\u0083l\u00B8\x0B\u008D\x15[\u00CF\u00FDU\u00A7\x141\u008D\u00E1\t45P\x0F\u00CD\u009C\x10V\x7F\x7F\x0B_\u00F2\u00B7\x02J\u00A1\x12_o\u00D5\x1Ft3\u00DC\x00\u00E5t~Qg\u00BA\t\u008F\u00A3hNB\u00912\u009EA\u00A0%Q\u009F\u00AE\u0086%\u00D7\u009BV\u0081\u00BC\x06dZk\u00B8Y\x07i.y\u0094\u00D7\u0088\u00E96F\u0092\x16k8\u0099\\\u008Fm\u008A\u00B5\u00A6\u00AB\u00E9\u00A8\u00D6\u0081\u0089233\x035\u00A7\u008BF\x12N\x03\u00AD\u00B9\x0E\u0097?\t\u00D0g\u00BF\u00A1\u00BD\u00A8\u00B0&\u0094\u0093\u0093Ch&\u00CF\u00AB2m,.\x1E\u0083\u00E1\x1B\u0084\u00F7\u00A1\t\u00F4#9\x02\u0087a/\u00EC\u0080\"(\u0084e\u00B0\x10f@>\u00E464Uf\u00F1\x1D\u00C1\u008E\u008E\u008E@(\x14\n\u0084\u00C3f\x13mlZ\u0086i\u00EE\u00C0J\u00C8\u0085A\u0090H\u00B1nt\x0B\u00D3\u00F9\u0083a\u00A8:ld\u0093\u00E9K0\u00C5\t\u00BBH&=\u00BAS\u00B0\u00EE|\u0099\u00D5L\x1B]D\u0096\u00B5vg;G]\u0094\u00C8\u00A8\u00D7\x1F\u00FD\u00B9\x17w>\u0091Md:\u00D2\u00990\u00CE\t\u00BBU\u00BCA$\x1A\u0098\u0091LM\u008F\x05\u00ADI\u00FD\u00F3\u009E\x18\u00F0\u00CE\u00F1\u00C5\u00AC'\u00AB5\x15\u00A5XS}2\u0090TM\u00C7\u0093\u00CCX\x1B\u00EA\u0089\u00FC0\u009D(s\u00B1\u00FD\u00F1\x06\x12\u00AF\u00AF[\u00F5F\u00A6\u00A3\u0095\u00CC\u00B0\u00B5z\u00DBt\u00AC|1\u00EF\u00B7i\u0099\u00F2H\u00A6\u0094\u00CC\u00FBe:\u009E\t\u00AF/\u00F6\u00B3\u0094\fK}\u00B5\u00A6\u00A5\u0094\u00CDz\u00F2\u00D3t2S\u00BE\x19\u0096LM\u00B7\u00C2?'\u008CHfb\r\u00C5\u00EB\u00F3\u00E4\u008ByS\u00D3O\u00E0\u00A3\x13\u00C6U\u00B4)/\u00F6\u00C5h\u00B4\u008CL\u00BB/\u0098\u008F\u009D\u00A3\u0094\u00A5\u00C1X\r\u00C8fMo\u0084\u00E7N\u00D8\u00A9D\u00FF<:\u00DB\u00B1\u00E7\u0084w\x15\u00D7\u00F7\u008Di\u00B2\u00FD\u0089f1\u00DC\u0084\x0F\u00E0\u00AD\u00F1h\x03\u00C9\u00CC\u00A8R$\u00F4\u00CEh%\u009BLG\u008CW\u0095_\\M\u00A8W\u00FA\u00B5\u00B0\x19\u00B6C%\x1C\u0084Z8\x0BW@\u0083\u00BB\x07O\u00E15\u00B4\x16\u00AF;\u00FA\u0083\u00EF\b\u00EB\u00E58###\x10\f\x1A\u00BE\x0B\u00E8\r\u00D7\r\u00D3^\u009EW\u00ABL\u00F7\u00B7\x06\u00A4i\x15\x1F\u008D\u00C4\x14e\u00D1\u00ACw\u008E:u\u00995\u00FA\u00CB\u008D\u00BB\u0088k\u00E6\u00D0\\\u0080-\u009C\u00F70\u00D2\u0099\u0082l2=\x17\u00F4#\u00DB\x0F\x15.\u009D\u00B5\u00E3\x04\u009A\x0E\u00BA\u00EEs\u00E4(E\x19g\x1A\u00A9J$\x15\u0090\u00B5g\n\u00C8\u00E4<(&l\u0081w\x10\u0082k\u00A0J\u00D3x\x18\x0E*\u008D\u00B5p\u009E\u008A<k\u00E0=\x1C\u00E7;~\u00D2\x1A\u00C9&\u00D3\u0093\u00DD\u00F6\x18\x06\u00AE\u00C2\x06\u00E2[\u00B0\x04\n@\u00B30\x0BT.\u00AB\x02\u00D5\u00FBJ@\u00B7;\u0095\u00CATN\u00D3=Z\x03:\x04\u00C6\u00B21\u00ADLk\u009AU\u00C7{\x00*\u00DEh\u00ABa\x15\u00A8~<\x04\u00BE\u00C1r\u00D8G&5\x03\u00B7\u00E1\x15\u00EC\u0084\u00AF0\x154\x1Bj\u008De\u009B\u00E9G\u0098\u00F1\u00AA\u00AD\u00DA\u009F\u00D1\u00F7\u00A8\u00C0X\x06\u0092\u009E\u009AR\x1E3\u00B1\u0094v>h\u00D9\u00E8I\u00F9\x12\u00F4 \u00DA\r\u00DB\u00C0X\u00B6\u0099V\u00D6<\u00A9\u00B6\u00A7ceSOH=\u00D6\x17\u0080\u009E\u0086\x07\u00E0\x14\u00BC\x00=AUUUiX\u00EB\u00B9\x0E\u00F2\u00C0X2\u00AD\u00A9\u00ED\u00B1\u00C8n>h\u008DFD\u00FC\u0086F\u00D9\u00CF&\u00D6\u009A\x1E\x01{\u0088u[\u00D4\u00EDQ\u00B7;\rb\x12}\u00D7a4\u00F1(\u00DA\u0089\u00A0\u009D+\x139^\u0099\u00BE\x13`U\b\u00ECK\u00C9\u00A3\u00BC*V\u00A65Zm{\u00A5\u00BB\u00E41232\u00DD\b\u00A5\u008CBe\u00DC\u00B4\u0094\u00EBM{\u0089\u00F2:@7?\u00F5G\u00E2\u0084\u00E8mf\u00ED\"iS\u00A7?\u0095p\u009By\x00*\x10\u00F8\x0F\u00FF&G\b\x10\u00E7\u00B9(\x00\x00\x00\x00IEND\u00AEB`\u0082";
        loopImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00-\x00\x00\x00-\b\x06\x00\x00\x00:\x1A\u00E2\u009A\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04*IDAThC\u00ED\u0099{\u0088M[\x1C\u00C7\u008FK\u00EE\u0090\u00BC\u00C2\u00F5,\x14y\u00A4\u0094&\u00F9G\u00AEGQ\u00FE\u00B8I\\\x11\u0093\u0090\u00F1\x0F\t\u0099?ps\u00F3\b\x7F o\u00BAw\u00BA^\u00D15\u00FC\u00A1P^\u00F9\u00C7+\u00A5\u00F8C\u00A3\f\u00A5+\x12\u00AE\u00D1E]\u00F1\u00F9\u00EC\u00B3\u00CE4r\u0098\u00BDO\u00CE\u00CC95\u00DF\u00FA\u00CCo\u00ED\u00DF\u00DE{\u00AD\u00EFYg\u009D\u00BD\u00D6\u009A\u00DD\"\x15t{\u00CA\u0094V\u0084\u00990\x12^\u00C3;hJ\u0095@{\u00B8\x0E\u0087\u0087WU\u00FDoRE\u00A61\u00DC\u009B\u00B0\x05\x0E\u00C0\x05.\u00F8h\u00BE\u00A9\u0085/\u00FD\u008D\u0083y\u00B0\f_\u008F\u00CD\u00B7\b=|\b\u00CAI\u00BE4Yh\u00C2c'\u00C2n\u0098e\u008F\u00FF@\u00C1!q\u00A0P\r\u00AB\u00E0\u00CDQ\u00A0\u00D7\u0094\u00A6\x1D\u00C3\x17<(p\u00E9Q\u00AF\u0091\u00E9Z>IA\u008C\u00E1o)x\u00AC\u00B5\u00AC\u00E9\u00B7\x16\u008AD\u0091WM\x17\u009D\u009AM7\u0096\u009AM7\u0096\u008A\u00D2\u00B4Sx\"1\u00A5\u00B6!83\u008D\u0085\u009F\u00E0\x05\u00B8\u00A8\u00A9\u00E4Y\u00FA\u009C\u0098U\u00DC\u00D7\u0085P\x06N\x10\u009D\u00E1)\\\x04\x17C\u0089\x1E\u00BB\u0089z\u009A\u0086G\x10\u00AAa?\u00CC\x00\u008DO\u0085\u00CDP\u00C3\u00F9i\u00C4/\x14\u00F25\u00E0u^\u00EF}\u00DEo=\u00D5\u00A1\u00DE\u00D8\u008Am\u009A\u008A\x07\x10\u00CE\u0083+\u00C2;\u00B0\x10l|6\u0098o\x07\u00C7\u00B8\u00AE\u009CX\u00A7p|\f<\u00EFu\u00B3\u00C0\u0095\u009By\u00EB\u00B1\u00BE\u00F3\u00A1\u00FEXJ\u00D2\u00D3\u00DB\u00A0#\u009C\u0081R\u00BE\u00D2\u00BDp\t\x0E\u00C2\x04r\u00ABA\u00ED\u00CA\x18\x0Fq\u0097e\u00B4\u00DA\u00EB\u00C0\u00E1p\x11\u00F6\u0090+\u0085\u00B3`\u00BD[!\u0096b\u0099\u00A6q\u00C7\u00EEDpcPF\u0083\u00EF\u00CD\u00D7\x17\u00B9\u00DF\t\x15\u00E9\u00A3:\u00E3\x1D\u00D2\u0087\u00A9\u008Ap\u00FE3\u0085z\u00E6\u0082\x0B\u00FCI\u00A1\u009D\x06\x15\u00B7\u00A7\x07\u0081\x0B\u00F2\u009B4\u00F4,\u00CAd\x11\u00E76\x12\u00EA\u008C\u00C3\x07\x18\x15\u00F2Y\u00C5\u00B9'\x04\u0087\u0089\u00F5\u00DBN\u0083J\u00F4C\u008C\u00A9\u00CB\u00B0\"]Lm\u00821\u00E9\u00E2\u00F7S\\\u00D3\u00F7\u00C0\u00A5a)_a\u00B7(\u0093E\u009C[I\u00B8\n-a\u00919\u00B4!\u00E4\u00B3\u008As=\b\u00C3\u00C0\u00FAm\u00A7A\u00C52\u00CDW\u00E83\u00F5\x1C\u00B8\u00D9\u00AC\u00A4\u00A1\x1F\u00CD\u00D7\x17\u00B9U\u0084\r\u00E9\u00A3\u00D4\u00BF\u00DC\u00E3\u00F6\u00A8\u00BEq\u00CF\x7F\u00A6P\u00CF\x1F\u00E0|q6\u00B4\u00D3\u00A0\u0092L.\u008B\u00C1Id\x12\u00DC\u00A4\u00C1\u009DD\u009F\u00D9>\u00B2|\u00EC\u008D\x07\u00B5(\x18\u00F6\u00C3\u00EE\u00E6:\u008B\u008E\u00EF\u00B5\u0094G\x13+\u00C1q<\x10\u00FCP\u00F6\u00F2+X\x02\u00B1\x14{Lc@\u0083\x1AsGlC>\u00B2\u009C\u00D1\u00FE\x02\u00F3o`z\u00C6pF\u00E1\u00F8W\u00F0\u00BC\u00D7\u00B9\u0089v\u00EBd\u00DEz\u00ACo|\u00A8?\u0096\x12\u00FD\x10\u00A9\u00F8\x16\u00C1\x1E\u009A\x0FGA\u00D3\x7F\u00C3r\u00E8\u00C7\u00F9\u00E3\u00C4/D\u00DE\u00C9\u00A5?8\u00B6O\u0080\u00F7\x1D\x01\u00EB\x19\x18\u00EA\u008D/\u00BE\u00B2\u00DFB\u00B1\u00E0\u0095\u00F1\u009A\u008FG^\u00DE\u00D5l\u00BA\u00B1\u00D4l\u00BA\u00B1\u0094\u00D84\u00BF\u00E0\x12(\u0083X\u008B\u009B|(\u0097\u009E\u00F69\u00FD'\f\u008D\u008E\u009A@\u0089\u00F7\u0088\u00A8o\u0088n\u009F\"\u00D1\u00EB\u00EE\u00F9\x16@w\u00B8\u00C2dQE\u00AE+e'\x0F\u00D7\u00C8n\x16N\u0091s\u00D5\u00E7\u00A2\u00DF\u00A5\u0080{\u00CBm\u00E4\u00FF#&R.=\u00ED\u00CC\u00A6\x1E\u00F8\x07#m\t\u00D7`\x0E\u00F4\u0082\x13\u00E4\u00DC\x13\u00DE\x00\u00F7\u0081}\u00E0$\u00B9_\u0088\u00CE\u009C~K=a=\u00B8\u009EI\u00AC\\L\u00DB\u00D3\u00AE\u00E2\\\u00E4({\u00CD\u00FD\u00DDt\u00D0\u00AC\u00BB\x1B\u00A3\u00D7\u00B9\u0089\x15\u00E5\u00BEP-\u00E6^w\u00F3\u00F7aH\u0094I\u00A8\\{\u00FA\x1Fz\u00AE\u00AFP\u00B6\u00A7U?\u00D0\u00A0\u00CB\u00D7G&\u0090\u00E7\u00A3\x7F\u0084\u00A3\u00CC?\u00ED\u00FBs\u009F\x1Bb\u00CF\u00DD\u008D2\t\u0095kO\x0F\x06\u00C7\u00B4\u00B8Rs\u0097}\n\x0E\u0082[\u00AB5p\t\x1C\u00BF\u00FB`\x1D\u00F8\u00CD\u00B8\u00FDZ\n\u00AE\u00F2\u00BCg\x07$\x17\u009F\u00FA\u00AB\u00FB\u00B7$\u00A2\u009E\u00B6\u00D0:\x1CF\u00AA\u009F#n\u0087\u0087\u00D0\n\u00FCwBbq_\u00DA+\x05w\u00CEu\u00AF\u00E6\u00F2%\u00DA8\r\u00F6~N\u00D2\u00A3^-;<\u00DC\u008Dd~$y\x13?\u00BE\u00C9\u00F0s8\u00CCEz\u00D4kd\u00FA0\u00CC\u00E3S\u00F8\u00DA\u00AB \x15\u00BC\u00F9.Q\u00AFE\u00FA\u00F2\u00D3?\u008A\x0B\u009C\x1D}<\u00F9_M\u00DF\"5\u00F5\x0B\u00A4\u00AF\u00BEf.B\u00A5R\u009F\x00 sn*\u00D5\u00C6D#\x00\x00\x00\x00IEND\u00AEB`\u0082";
        timeImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00-\x00\x00\x00-\b\x06\x00\x00\x00:\x1A\u00E2\u009A\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04)IDAThC\u00ED\u0099[\u00A8UE\x1C\u0087\u00B7\u009D.b\u0098\x16EF\u0092\u00B7J\x11\u0082\x1E\u00B2\u008C\x13i(\x05\u0085\u00A4b\"j\u0082\u0097.^\x025\x03)\t\u00A1\x14\u00B2\u00E8A$_\x14\x1F\u00D2\u0087\u0094D\u00DFT\u0090H8BoJ\u0084=H\x17Q\"\f;&\u00A4Fi\u00DF\u00B7\u00F6\x7F\x1DRv\u00BB3\u00B3\u00B6\u009E-\u00F4\u0083\u00EF\u00FCgf\u00CDZ\u00E7\u00B7g\u00CDZ\u00B3f\u00A6_-t|S\u00E7\u00CD\u00849\u00F0\x04\u00FC\x06\x17\u00A0/\u00D5\x1F\u00EE\u0080\u00AF`\u00C7\u0083\u00CB\u00BA\u00FE\u00B4P\x15\u00A61<\u0094\u00F0\x11l\u0081\u0083T\u00B8ly_\x0B_\u00FA\u009B\x04\u008B`\x15\u00BENZ\u00DE/Zx;,\u00A6\u00F0W\x0B\u00DBMx\u00BC\u0093\u00B0\x19\u00E6\u00DA\u00E27\u0091\u00B0KliW\u00C3*\u00BC\u00D9\x0B\u00F4Z\u00D3\u00B4}\u00F8\u00A0\u00996\u0097\x1E\u00F5Z\u0098>\u00C7/i\u008B>\u00DCL\u00E1\u00F1\u009CiM\u009F7\u00D1\n\u00D1\u00F7VCw\x03VG\u0095\u00AA*\u00BCj\u00BA\u0095\u00F255\u00A8\x01\u0096\u00B7L\u00AD6\u00BD\x07\u00E67\u00C0\u00F2\u0096\u00A9e\u00A6\u00E9\x02\u00F7\x11\u009E\u0085y\u00F0\x1El\u0084\u00F50\x17&s\u00FC.b\u00F1\u00EE\u0085\u00E7L\u00E7\u00AA\u00B2i\ft\u00C0\u00DB$\u00BF\u0083\x0F\u00E0\x19p\u00B0\x1A\b\u00FE\x10\x07\u0087\x0F\u00E1\x04\u00F5V\x10\x1D\x13\u00F6\u0091\u00CE\u00EE\u00E7\u0095L\u00F3\u008Fo%\u00EC\u0082u`\u00BF=\x04\u00B6\u00F4\u00C3\u00E0\u0080`4o\u00F9\u00ED\u00F01\u00CC\x065,b\u00B2\u00AA\u00B6\u00F4&\u0098\x06~\u00A7\u00BC\u00CCki\x02|J\u00BA\x03\x1E5\u009A\u00B7\u00DC\u00E3P~\u00CF|\rK\u00EA\u00C9te\u009B\u00A6\u0095\u009F'\u00BC\x02\u0097`*\u00C6\u00BC\u00ED\u00A5\u00BC\u00F5_D,\x14\u00C7\u00A7\u0082\u00F5\x1F\u0081\u0089\u0090\u00A5*-\u00FDn\u00C4\r\x18\u00DA\x1F\u00E9\u00A6\u008Az\x1B\u00EA\u00B9\u009E\u00F3\u0093\u0095e\u009AV\u00BE\u009F\u00E0\u0090\u00FA\x07\u00F8\u00F0\u00A5\u00C8\u00FA\u009E7\u0091\u00EB\f)J\x12\u0095\u00DB\u00D2\u00E3#v\u00D1z\u00DD\u0091\u00EE\u0095\u00A2~W=W{*b\u0092rM\u00DF\x1B\u00F1x\u00C4T\u0095\u00E7\u0095\u00D7IR\u0095>\u00DDL\u00BF\u00C0\u008F\x11\u009B)\u00EBC-\u00D7\u00F4\u00CF\x11\x1F\u008Ax\u0085\u00E8\x02\u00CE2\u0086\x1B\u00A3\u00E8j\u0095\u00E7\u0095\u00D7IR\u00AE\u00E9\u00C3\x11;y\u0098\x1CDz\u00AD\u00A8\u00DFY\u00CF\u00F5\\'IY\u00A6i\u00C1\u009F\b>L\u00B7\u00C0;\u0096%\u00C8\u00FA\u009E\u00E7C\u00ECu\u0092U\u00A5O\u00BF\x1Fq\x05\u00AD\u00F7B\u00A4\u009B*\u00EA\u00F9\u00FD\u00A1\u00CA\u00F3\u0093\u0095m\u009AV\u00DAGp\u00B2\u00E95vch\u0081\u00E5\u00FF\u00A68\u00BE\x1B\u00AC\u00BF9\u00CE\u00CFR\u0095\u0096Vo\u00C0N\u00F0\u00C3i+\u00C6\x0E\u00C3B\x18\x0BC\"\u009A\u00B7\u00EFn\u008Dz\u00D6\u00F7\u00BClU2Mk\u00FDE\u0098\x05o\u0081S\u00A1'\u00C1Y\u00F37`\x7F5\u009A\u00B7\u00DC\u00E3\u00D6\u009B\x15\u00E7e\u00ABjKk\u00FC2\u00B8\u00D0\u00E3\u00A7\u00A6\u00FD\u00F5\x008x\u009C\u008Dh\u00DE\u00F2a\u00D6\u00B3>\u00E9j\u00E2\u00D6\u00AD\u008Dd\u00DB\u00AB\u00F4Z\u00B9\u00A5\u00FBB\u00FF\u009B\u00BE^rf\u00BC\u0096\u0087\u00A3\u00D7\u00FD\u009A\u00FA\u00CE>\x06\u00D7s=r6\u00F2*,\u00E5ZG\u008B\u0092k\u00A0\u00D2kNK\u00FB\u008E}\x13\u00B6\u0081\x13\u00DA\u00E5\u00F0\x18\u00B8(s\x11\u00AE\u00B9\\\u00E6M\x12\u00BFt\x12\u00BF\u00D8\u00D7\u00DB\x0F\u00B0\u0086\u00FC6\u00F2\u00CE\x17}\x0F\u00F7'\u00ED4\u00EA\b\u00B8t\u00F0\x19\u00DC\r\u00CE\x07\u00F7R\u00F7K\u008E\u008F#\u00ED\u00BB\u00FDw\u00D8H\u00D9ib\u0092r\u00FB\u00F4\u0088\u0088\u00DFG\u009C\x0E/\u0082\u00E6\\\x03\u00B1\u00F5g\u0080C\u00F5Jx\t\u00B6c\u00F8i\u00A2\u00A3\u00E3\x00\u0098\x02\x0E<\u00C9j\u0095i\u00F3\u00A6\u0087\u0083\u0083\u008A+M~g\u00B8\u00E50\x19l\u00F1\u00DB\u00E05p~\u00E8\"\u008Ew\u00B9\u00E1\u00F7\u00F8\x7F\u00A9\u008Ai\r\x15\u00DB\t\u00C8\u00FC)\x18\t\u00C7\u00B8\u00E5\x1Es\u00F2\u00FBm\u00A4\x1F\x00\u008F;|\u009F\x01\u00EF\u00C4\u00EB0\x13\u0092U\u00C5\u00F4\t\f\u0095\u00DF\x10\u00EE\u008D8\u00D9\u00B5\u00DC\u00BE\u00AE\u00FC\x01.\u0095)\u00EB\u00B9x\u00E3\u00DA\u0087u\u00BD+{a4$K\u00D3\u00C9\u00CB\u00B0\u0098u5iTd\u00D5\x18x\x1C\u009C\u0091,\u00B6\x00\u00D9\x7F]\u00CCQ.B\x0E\u00E6\u009C\x03\u00E0:\u009Fo\u009A{H\x7F\u00EE\u00C1\x04\u00D5\u00BD\u00F2p|\x02=[s\u00ED*=\u00EA\u00D5\u00B4-\u00ED>\u009D\u00AF\u00A7v\u0097\x1E\u00F5Z\u0098\u00DE\x01\u008B\u00F8\x15I\x13\u00D4\u00EB\u00A9\u00F0\u00E6^\u00A2^o\u00D0\u00CDO\u00FF(*\u00FCs\u009B\u00D9]\u00A4\u0096m e\u00CA\u0087\u00AE\u00E16\u00F3\r\u00A8Z\u00EDo\u0090wb\u00BD\u00D0.9I\x00\x00\x00\x00IEND\u00AEB`\u0082";
        wiggleImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00-\x00\x00\x00-\b\x06\x00\x00\x00:\x1A\u00E2\u009A\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04\bIDAThC\u00ED\u0099]hVe\x00\u00C7_\u00D3\u00E8C\u00D3\u00E9MA\u009BYS2(\x14\x14\u00EC\u00A2\x0B\u0087\u00A2\x11X]\x18)kl\u00C5\u00C0T\n\u008B\u00A1(bS\x18Z\u0088\u00DEl\u00DA\u00C5PPW\x0E\u00C4\u00A6\x17\u00A2\u00E0XC\u008C\u00BA\x18\x04u\u0091\u0085b\u0099x\x11hi\u0091a~\u00FC~\u00E7=G^\u00DA\u00DB\u00DEsv\u008E\u00EF6\u00D9\x1F~\u00EF\u00F3\u00F1\u009E\u008F\u00FFy\u009E\u00E7\u009C\u00E7kL.\u00D4\u0091\x1D}\u00E3\bja\x1E\\\u0085\u00EB0\u0094z\x18&\u00C27\u00D0\u00F1\u00DA\u0087s\u00FE5S\x05\u00A61\\I\u00B0\x1D\u00DA\u00A1\u009B\x03n\u009B?\u00D4\u00C2\u0097\u00FE\x16@#4\u00E1\u00EBW\u00F3\u00C7\u0084%|\x00V\u0092y\u00C5\u00CC\u00E1&<N&\u00D8\roY\u00E2\x0F\x10\u00B1I\u00B4\x0FW\u00C3*\u00F4f+\u00D0kN\u00D3\u00B6\u00E1n\x13\u00C3\\z\u00D4k`\u00FA\x1AO2,\u00DA\u00F0@\n=^3\u00AE\u00E9\u00BF\u008D\u008C\x10\x05^}\x11\u009By\u008A\u00E6 +\u00A5\u00B8\u00D6N\u0082\u009A|*\u00B6\u00DE\u00E4\u00FEg\u00C2\u00F8\u0080\u008A\u00BCZ\u00D2Y\u00EAix\x0F\u00E6\u00C7\u00E4\"<\x02\u00C9\u00A4\u00FB0\u009AZ\\\u00AB\x0Bf\u0087\u00C9\u0092\x1A\u00C4\u00F1\u0081W\u00BF\u00D1\u00B1\u00C5I\u00CF\x12t\u00E6SE5\r:9\u00AE\u00F0=\u00E9\u00A1J?\b\u00E3\u0099(i\u00F3\u00B0*\u00AD\u00D2bU-\u00A7\u00C1\u00DE+J\u00DBTl2\u0099j0m\u00FA\x06%\u00F7{1\u00FC\x0F\u00FC\u0084F\u00E9\u00E0\x13\u0095\u00B5\u00B2~\x11\u00CB\u00A2\x11i:\u00D1\u008B\u00F8_\u00F1\u00C2-!\u00A8\u00CE\u00A7\x02\x19\u00AF%\u00DF\u00F6\u00AC\u009E\u0084j\u00D2k\u00F2\u00C9@\x0E3\x7F\x0B\u00E3\u0083R\u00DA\u0092^\x07v(\x11\u00CFCSA\u00DA\u00B8yQz+\u00F8 \u00A9T\u00EE\u00E6\u00F1O\x18\u00A6\u00D2\u00E8\u008B\x18C\x13\u00C0\u00CE\u00E7[!\u009Et\u009C\x12\u00A8\u00DC\u00A6\u00FF\u0082\u00C2\u00CE\u00E7)\u00F8\x0E\x12\u00A9\u00DC\u00A6\u00831q\u00D4\u00F9\u0084\u00DC\u00CC\u00FF\x15_\u00831]SP\u00BD\u00B1\x07;Y*\u00A9i\u00AB\u00D2*\u008D\u00AA\u00F7{(\u00BB\x12\u0099\u00B6*\x0B\u00AB\u0096\u00AC\u00BBk\x11\u00E5T\u00B9\u00DBt&\x1A5\x1DC\x0F\u0085a*\u00A55\u00FD18+\u0089\u00CBzp\x12\u0091N|\u00BA2\u009B#\u00DEkE^\u00EF\u00CF6\u00CD\u00D3-\u0084W\u00C3\u00A4\u00E9:\u0098\x19\u00C6\x1D+7\u00C0'\u00F0Yp@\fql\x05\u00D8A9\x1EO\u00AC8%\u00BD\x1CZ\u008Dp\u0093\x17\t\u00F6\u00C1\x1B\u00A6\u0091mt\x13\u00D8\u00E1\u00DC2#\u00A6\u009E\u0081Y\u00E0X$\u00B1\u00E2\u00CC\\\\\u00FD\u00A9\u00CBGs\r\u00A0\u00B9J\x1E\u00C0/\u0081\u00E6\x1D\u00D8?\n}\u00E4=A\u00B8\n\\\x10w\u00C1p.8\u00F87o*\x1C\u0086\u00D7\u00E1+P\u00E78g!\u00A1%~\tZ\u00E9\u00B4\u00FE\u00F4\u008F\u0081\x14\u00A7\u00A4\x7F\u0082\x07\u00B9\u00B83\u008Ee\u00D0\x0B\x1A\u00F0F\u009A\u00DB\x0F\x1B\u00C05\u0091/\u00A1\x1E\u00AA\u00E0(,\x06k\u00E6#x\f\u00BA\u00E0\x1D\u00F0|{S\u0087\u00A6\u00C7\u00C0Y\u00BC\x0F\u00B6\x19J*\u00AEi\u00B5\x02\u00FE\u0080\u0083\u00E0\u00CE\u0081k\u00C5\u0087\u00C0\x12\x1F\x0B\u00D6\u0080\u00C6WPZ6)W\u00ED\u00CF\u0083%\u00DBB\u00DE\u00DB\u0084'\u00E1\x1C\u00B8\x16r\x01\u00DE\x05\u00AF9\x1D<\u00DF\u00B0\u00A4\u00E2\u009AvH\u00B9\x1A\u00F6@t\u00D3W\u00E0\u00D30\u00AE\u00A2\u00C9\u00EAK\u00D4\u008A\x06\u00CD\u00FF\x19\u00DC\u0082\u0098C\u00DE\u00CB\u0084nE\u00F8 \u00FE\u00E7u\u00BC\u00AE\u00A1\u00E6\u00DF\x07\x0B\u00A6\u00A4J\u009A\u00A6\u0084\u009C\u00D7\u00FD\x02n!\u00EC\x05o:\x1E~\u00E4\u00BFS\u0084\u00D1\x0B\u00E8\u00A6\u008EM\u00C5\u0099\u00B7U\u00ADY\x1Fx#,\x02;\"kE\u0093\u00BE\u0088^g\x0B\u00CC\x00\u00DBs\x1B\u00B8\u00ACVR\u009A\u00B6]\u0096\u00D2\x0BP\u0081I\u00CD\u009F\x05\x1F X\u0095'\u00AF\u0087`\x12|\x0E_\u0080&\u008E\u0083\u0083{_8M>\x07\u00DB\u00C0e\u00B5^\u00CE\u0099\t\u008Dp\f\u00A6\u00907\u0099\u00B0\n\u00BE&>\u0090\x02\u00AF\u00AEO\u00EF\"\\\u00CD\t\u00A9v\x03\u00B8\u00CER\x02k\u00C2y\u00A0\x0F\u00B7\x16~\u0080\x13\u00F08\\\u0086\x1D\u00DC\u00A7\u00850\u00B1\u00B8\u00BE5\u00D7\u00C6\u00F9\u00ABL\u00D4\u0083\u009F\u009DL\u00C4\u00B5\u00FA\u00AD7\x17\u00CBK*=\u00EA\u00D5\u00B8\u00CD\u00A3\x03\x1A\u00C9\u00B0\u00CAS\u008B\u0092\u00E8\u00B7\x1DR,/\u0089BoN\u0088\u00F5:B7?\u00FDQ\x1CP\u00B8\u00CD\u00EC\x12\u00EDPo \u00FD\u00EF6\u00F3\bT.w\x07D\u0093t\x0Bj\u00ED\u00AA\u00F6\x00\x00\x00\x00IEND\u00AEB`\u0082";
        purgeImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00-\x00\x00\x00-\b\x06\x00\x00\x00:\x1A\u00E2\u009A\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04qIDAThC\u00ED\u0099{\u0088\x15U\x1C\u00C7\u00EF\u00F6\u00D0\u00B425\u00A5|\x14Vl\"*\u0085\u0092\u00E6#\u00D4\u00D5Pz\u00FE#\u00CA\u0092\u00C5\x1A\u008AX\u00A9T\u00A6\u0098\u00A2Bb\u0088\u008A\"\u00BA\u0082\bAh\u0089\u00F4\u00D0\u00AC?\x12E\u0089\u00CAG\u00FD\u00A1\u00B8\x19m\u00B4\x06\u00D6\x1F\x15\u00E5c\x13CD\u00FB|\u00E6\u009E{\u00B9\u00D8\u00AAw\u00E6\u00CE>.\u00F4\u0085\u00CF\u00FE\u00CE\u009C\u0099\u009D\u00F9\u00CE\u0099s\u00CF\u00FC\u00CE\u009C\u008AL\u00D0\u008A\x03u7\x11\u009E\u0083\u00A1p\x16\u00FE\u0081\u00D6\u00D4-\u00D0\t\x0E\u00C1\u00D6\u00F9\u00C3\x06\\\u00B4RE\u00A61\u00DC\u009B\u00B0\n6\u00C3^\x0E\u00B8l}k\x0B_\u00FA\x1B\x0B\u00D3`.\u00BE~\u00B1\u00BE\"\u00B4\u00F0\x16\u0098I\u00E5)+\u00DB\u009A\u00F0\u00D8\u0085\u00B0\x11\u00A6\u00D8\u00E27P\u00B0Kln\u00AB\u0086U\u00F0f/\u00D0kF\u00D3\u00F6\u00E1\u00BDn\u00B4q\u00E9Q\u00AF\u0091\u00E9F\u00EE\u00A4M\u00F4\u00E1k)xl\u00B4\u00AC\u00E9\u00F3\x16\u00CAD\u0091WM\u0097\u009D\u009A\u00CD4\u00BF\u00F8g\u00A0g\u00D8LU\u00CDbZ\u00C3\u0084\x0F\u00A0]T\u0091\u00B2R7]`\u00F8f\u00E8`]\u00DAJ\u00D54\u0086G\x12\u00B6\u0083\u0086\u00D5q\u00EA\x1Aa'<\x19\u00EAJV\u00DA-\u00FD\x03\u00FC\u0098-F:\b\u00E61\u00B6\u00FE\u00A7\x18\u00DF\x05w\u00B8\u00A3\x14\u00A5j\u009A\u00B1\u00F4\x0FB\x15\u00D4E\x15\u0099L5u\u00BD\u0088\u008F\u00C17\u00F0\x14\u00EC\u00C6\u00F8\u00AD\u00C4\u00C4*\u00D94\x06F\u00C3\x018\x01\u009B\u00A82;,4\u00EE\u00CD|I\u00B0\u00EB|\fC\u00C0\u00E4,\u00B1J2\u008DI\x1F\u00FBnx\x14\u00FA\u00C0t\u00D8\x03\x17@\u00E3\x7FA$\u008C[\u00F7<4\u00C0t\u00FE\u00F7A\u00EB\u0093(\u00B1i.\u00FA\x04\u00C1Q\u00C2\u00F4q=\u00BC\n\u00F6a[\u00D2\x1B9\u0087Q\u00FBs^l\u009F#\u00AC\u0084\x1Ba\u00B2uI\u0094\u00C84\u0086\x1D\u00CA\u00B6\u0082\u00A3\u00C4\x1B\u0098\u0099\x05k)\u008F\u0082\u00EFA\u00E3\x0B\u00A0)}\x16\u00A2\u00C7$R\u00D2\u0096\u00F6\u00D1v\u00CE\x16\u00A3\u00EE\x10)t\u0081/\u00B2[\u00D9\u008C\u00AC\t\u00FD\x1Ab\u00F7\x10c+\u00A9i\u00FB\u00A5\u008FZ\u00E5\u00CD\u00F1\x04<\u00DF#\u00D9\u00AD\u00CCw!^\u00A9\u00DBC<\x13bl%2M\u008B\u009A\"\u00FA\u00A3\u00BB\x04\u00EB0\u00BB\x10\u00EC\u00A3;`\x108r\u00BC\x05Mix\u0088\u00F5!\u00C6V\u00D2\u0096\u00D6\u00F8\u00FB\u0084\x17\u00C0\t\u00E82\u00D8\x06O\u0083\u0086\u00AB\u00D8\u009F\x1F9\u00AE\u00D0\u009C\x10\u00BD\u00C1DJlZa\u00CC\x1F\u00E3$\u00F8\x19\u009C-\u00EF\x02\r\u00FB\u0092\u00F9\u008Fx\x1A\u00B3\b\u00E3\u00E1+\u008EI>[\u00E2DKC\u00B1\u00D9\u00C45:\u00C02\u00B8\f\u00A7\u00A1o\u00D8\x15K\u00FC_\u00E4\u00D5\u00D9\u00F8R\u00EE:\x15\u00E3\u009C\u00AB#\u00C1\u0084\u00E9o8\x02\u008E&\u008E4\u00BE\u0084z\u00C0o\u0096\u00B9\u00DEabl\u00E5\u00BC\u0096\u00D4=\u009A\u0090\u00AF\u00EA\u0081\u00E0\u008F\u00F2mX\r3\u00C0\u009BY\x07\u00FD\u0093\x1A.T\u00AA\u00A61\u00E4\u009B\u00D0\u00D7\u00F9\x00x\x16la_\"\u00DD\u00D97\x07\u00FE\u00A4\\\u00BAr\u00FD\u00A4\x1C\u0094\u00F3\u009Av\u00F7h\x11\u00FDo\u00BA\u00A5T\u00B4i\u00FAS;\u00A8\tL\u0084\u00CA\u00B0\u00AB\u00C5\x15\u00A7\u00A5\u00EF\u0083w`\t\u00AC\u0081z\u008C\u00CF&\u00B6\u00B8\u00FC\u00CC[\u00AC4\u00AD\u00AA\u00C1\u00B1\u00F6\x18L\u00C2\u00F8\u00FDD_(\u00CE\x01M\u00F0\u009D\x18\u008C\x00s\x10\u00F3\u00EBO\u00C0\u0099\u00CD\u00BD\u00E0t\u00CB\u00A1p\x1EL\u0080\u00C7\u00E1'\u00A8e8\u00F4ET\u0094\u00E2\u00B4\u00B4\u00E6\u0094i\u00A9\x06\u00EE\x06\u00C7]\x13\u00A0npOAYS\u00EF\u0082f\u00DF\u0084\u00C5`J\u00AA\u00E9\x1Ax\x05\u00DE\x03\u00DF\u009C\x0B\u00E1u(Zq\u00BB\u0087\u00F2\x13\u00C1\t\u00F0\u00AB\u00FCGV o$wS\u00BFCW\u00B0\u00D5\u00C7\u0081\t\u00D2rZr*q\x1F\u0098\\i\u00FA4\u00F4\x03\x13\u00AD\x07\u00A0h\u00C55\u00ADa\x1F\u00B9-\u00FD0\u00E4\u00D6l\u00BC\u00E8\u008B\u00D9b\u00FE\u00AB\u00D2\u00B7\u00E0\u00F9=f\x10\u00DD\u00C89\u00E5\x18\u00F0\x06\u00CD\u00C3\u008F\u00839\u00B9\u0099\u00DF\\(ZqM\u00D7\u00D3bG\u00E0$\u00F8\u00BD\u00F8kp\x06\u00F2!\u00DC\x06\u00CA\u009CZ5p\u008C\u009F\x13\x16\u0081\u00ADm.\u00D2\x1E|J\u00D6\u00D9u|*\u00D6\u009BL\x15-M\u009B\u00C4_W\x18\x18\f~l\u00C9\u008Bmg\x1FwB'\u00CA\u00E6\x19~=z\u008Dr\x054\u00D0\u00BA\u009E\u00DF\u0096\u00B5\x1B\u00AC\x00\u00AF\u00B5\u009F}N\x18\u009Ccv\u00A6\\\tN\u0086\u008BQ\u00E4\u00D5\u00D4\u00B4\u0096\u00F82\u00FF\u0098\u00FAj\x00\u00E7~\u0088\u00F09\u00DC\x05\u00FEhWs\x1D[6\u00B68\u0097\u00DDl\x03\u00FF\u00FF\u0092-\u00E1:\u009D\u00CB^\u00A9\u008B\x0B\x1C\x05G\u0099\u008E\u00C4nI\r\x07\u00E9Q\u00AFQ\u00F7p\u00CA4\u008D;q\u00D9\u00ABY\u0084\u00D9\u0092\u0096H\u00827\u00D7\x12\u00F5Z\u00A6\u008B\u009F\u00FEQ\x1CP\u00B8\u00CC\u00EC'\u0082\u00D6^@\u00BA\u00EA2s\x19*\u0093\u00F9\x17!\u0080v\u00CE\u00AC\u0086X\u00EA\x00\x00\x00\x00IEND\u00AEB`\u0082";
        calculateImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00x\x00\x00\x00#\b\x06\x00\x00\x00_-\u00CE\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x05(IDATx^\u00ED\u009B[\u00A8\x15U\x1C\u0087\u00CF\u00C9[j\x19\x15\u00A6\u00A9$T !Y\x10Q\"a\x17+\u00C4\u00F2A\u008B\u00CA\u00D2\f3Q{H\x05/\x15(\x18f\x0F\u0091/&DP\x04'\"\u00E9\u00A1HK\u00A8\x1E\u0082\u00C0z),\u00E4\u0080)eD\x17\x0Bod&\u00EA\u00F6\u00FB\u00AD\u00F9\u00CF>\u00FB\u009C3\u00B3g\u00CD\u00D9\u00B3\u00F7\u009EC\u00EB\u0083\u008F5\u00EB2k\u00CF\u00DE\u00FFYkf\u00CD\u0099\u00D3\x11\b\x04\x02\u0081\u00B2\u00D2ii&\u0095Je(\u00C9\u00E3x\x1B\u009E\u00C0\u00D3\x18h\x1D\x17\u00E3\x18\u00FC\x1A\u00BB:;;\u00CF\u00AA\u00B0\x10\b\u00EE$|\x0Fg\u00A1\u00F7I\x11(\x16\u00FD\u00F6\x16\x03\u00C5b\u0092\x157\x06\x1D\r\u00B5\x0E/\u00B7\u00A2@\u009BQ,,&\u009AU\x1B\u0083N\u009E\u00C4Y\u0096\r\u0094\x04\u00C5D\u00B1\u00B1\u00EC\u00C0\u00A1\u0093\u00D71L\u00CB%C1Ql,\u009B\u00CAE\u0096\u00D6\u00E3$\x17\u00F4\u008Am\x07J\u0082\u00C5\u00E4d\u0094K\u00C7'\u00C0\u00FFZ\x1A(\x1F\u0099\u00B1\u00F1\tp`\x10Sx\u0080\u00B9.\u00DC\u008DGPk\u00E6\u00B6\u00C0g\u008F\u00C7ix\u008D\x15\x15\x02\u00FDM\u00B4~'Z\u00D1\u00E0\u0087/\u00B3\u00C963\u00A1\u00ED\x10<\u0081\u00E2\x1C\u00E6\x0E2\u00FB\u00DC\u0089\u00AF\u00E1N\u00DC\u008D]\u00F8\u0092U{A\u00FB\u00AD(\u00DE\u00B5\u00A2B\u00A0\u00BF\x1DQ\u00B7\u0095\x1DV\u00E4\x05\u00ED\u0087\u00E3\u00F5x\u00AD\x15\x15\x02\u00FDe\u00C6\u00A6\u00D0\x11\u00CC\u0085\u00FF\x1C\u00C9\u0096(\u00E7\u00FA~\u0087\u0083\u00F0\x0E2m\u0097\u0090|\u008E\u00CF\u00E1C8\x1B\x17\u00E0*\x1C\u00CC\u00E8\u00E9\u00DF\x01\u00FC\u00D6\u00E5ZH\u00E1S4A\u00DEJ\u00B2!\u00CA\u00E5\x0E\u00F2\"\u00D4>\u00FA!\u00E6\u00E2\f\u00BC\x0B\u00AB\u00EB=\u00FA\x1A\u0085\u00B3q1>\u008B\u008F\u00E2\u00CDV]\x17\u00DA\u00DD\u0080\u008F\u00D9~Z\u00DF\u00DFb\u00E5\u00C3p\u00A69\u00CC\u00CA4\u00CD\u00DF\u0081\u00D3\u0095O\u0083\u00FA\u00C98\x0F\u0097\u00E238\x1F\u00C7Y\u00B5\u00EAG\u0093\u00C4#W3\u009C\u00FA\u00D4\u00F7\u00AAB>>\u00AEe\u00F8\x00\x0E\u00B7\u00AA\u00E6\u00C3\u0087yO\u00D1\u00B5\u00B0\u00DFz\u008C\u00F1\u009A\u00AEi\u00F3\u00BDk]\u00A9h\x04'B\u00DD\u009C\u00A8I/\u00CE\u00E3+\u00D6Dm\u00FAM\u00D1l\u00AF\u00C03\u00AE\u00B4\x07\u00CD\x16\u00AAS\u0090b&[\u0099\u0082%\x0E+/\u00D8\u00EE7Ek;*\u00EA\u00C51\u00BC\u00D7\u00EAu\x02\u00F6\u00A5\u00BA\u00BCa\u00FBy<\u00EBJ{\u00D8\u0087\u00E3\u00ADI*\u00B4i\u00ED\x14]K\u0083#\u00F9\u008C\u00A5I\u00FC\u008C\u00AF\u00E2:|\x01\u00BFA=\u0088Y\u0089\u00F5X\u008E\x1A\u009D?\u00E0F\u00DC\u008C\u00BB\u00B1Q\u00F6\u00A2\u00FAZ\u008B\u00FA\u00CE\u00BF\u00E3e\u00F84\u008A\u0083\u00F8Q\u00B4\u00E9\u00BE\u00D7[\u00D8\u00E5r\x11kp\b\u00EAX\u00F4{\u00FD\u00827b\u00BC\x7Fs\u00F19K\u00EA\u00C1\u00FE\u009Fb\u00CCiL}~J]<\u0082WXQ\"\u00D4\u00EB\u00F9\u00F8\x14SS\u009E\u00C3\u00AAU\u009F4\u0082\x0FGE\u0095G\u00AC\u00A8\ne\x03\x1E\u00C1\u0082\u00FC\x18\u00BC\t\u00D5\u00CFf\x14\u00BB\u00ACZ\u00F5\u00F11\x1E\u00B7\u00A2*V.\u00EEC\u00ED\u00FF\u0086\u00CB\u00F5\u00F9\u008C$h\u00D3\u00BE\x11,8\u0080\u00F5$\u00F7G\u00B9\u008E\u00F3\u00B8\u0084\u0091\u00DD\u00D0\u009F\u00B9\u00E8s\x0E\u00C9\u00AF\u00D8m~\u0089y\u00F8\u00C7\u00D2B\u00E0xti8\u0082\u00DF\u00E1O\u00F8\"\x0E\u0084=\u00A8\u00FD\u0097\u00BA\\A4-\u00C0\x16\u00DC\u0097\u00A3\u009C\x0B\u00EE\"\u0082[;5\u00D5\u00E3\x12K\u0093\u00D0\u0094v\x15~\u0088\u00BA\x11\u00CB\u00FB\u0083\u00BA\u009B\u00A8:\u00E8\u00EF\u00AE\"\u00F3\u00F9;\u00DF\u00F1j\x12\x1D\u008Fn\u008At\u00B9\u0098\u008F;1\u008D\x11\u0096&\u00B1\x1Au\u0093\u00B9\x105\u00CB\u00E4Z\u008A\u00A5\u00D1\u0094\x007\x10\u00DC\u00DF,]I\x1Fkq!\u00AEBM[\u00F1\u009D\u00E5\u0095\u0096\u00FE\u0081\x1A\u00C9c].\u009B\u00F8\x05\u0085\u00E5\u00F4\u00B5\x00\u009F\u00C2\u00F8\u009E\u00A0vVYG\u00F9bR-\u00D9\u00B2\u00D0\u0089\u00A6\u00EB\u00A7\u00D0\u00B5\u00F6O\u009C\u00E0r\u00BD\u0089\u00FB\x1FA\u00DF[\u00F4\u00D9\u0096\x17\u00A7,\u00BD\x15u\u00F3u\f\u00AF\u00C0\u00D6<\"\u00E6`r]\u0083i\u009F\u00FB\u00EE9\u0086\u00B6s\u00F1\u0094vL`\u009A\u00B5\u00D9\x1Ee\u00AB\x1CDw\x17\u00EA:\x016\u0093\u00AE\u00C1\u00FAa\u00FB\u00E2\u00EE\u00A2\x05\u00DB\u00BAs\u00AD\u00E5GKS\u00AF\u00C1\u00A4Z^\x1Dr%=\x1C\u00B0\u00B4\u00F6\x1A\u00AC{\u0086nW\x1A\u00A17b\x1Cl\u00BF\x19\x15\u00F5c\u009E5I\u00856\u0099\u00B1\u00F1\u0099\u008661\u00FA\u00BC\u0082L[\u009D\u00CDG\u00F1R\u00CC;-;\u00E8\u00E3:\u0092\x07Q\u00D3\u009F\u00A6K]\u00DF\u00F6\u00E3.\u00FA\u00FA\u008Fz\u008Dd]\u00A7\u00A6\u00E0\u00DF\u00A8 \u00EAa\u00C8H\u00EA5s\u00A8\x0F\u00AD3g\u00E2>\u00CA>V\u0099\u00A0\\S\u00A8\u00D6\u00CC\x1A!:\u00CE\u00AF\u00A8\u00FF\u0084Tuz\u00AC\u00A9\u00E9Q\u00CB\x13\u00CD\f\x1F\u00A0\u00FA=N\u009Bm\u00A4js\x0F\u00C9\u00ED\u00B8\u0097\u00B2x\u0089\u00A5\u00E3U;\u00CD$\u0087\u00F03|\x02\u00BBi\u00F36\u00A9\u0083vz\u00BC\u00A9\u00F5\u00BC\u00D6\u00C8\x7FQ\u00A7;o\u0095k\x16}\x18\u00A7\u00A2f'\u008Db\u00CDN\u00EF\u00D3F\u00C7\u0091\n\u00FBz\u00C7&\x15ub\u009B^\u00D0\u00BE\u00ED\u00CF\u00A2\u00FF/\u00F8\u00C4\u00A6\u00F0k0g\u00D4\x178\x16s\u008D\u00DC@sh\u00EA2)\u00D0~|\x02\x1C/\x1B\x02\u00E5#36>\x01\u00D6S\u009A\u00F0NV\u00C9\u00B0\u0098\u00E8=\u00E9\u00BA\u00F8\x04X/Z\u00EB\u00EE1P.\x14\x13\u00C5\u00A618S\u00C2{\u00D1%C\u00B1\u00B0\u00984\u00FE^\u00B4\u00A0\u00A3\u00F0\u009F\r%@\u00BF\u00BD\u00C5@\u00B1\u00F0\u00FA\u00CF\x06\u00EF`\u00D1a\u00ED\u00FF&i1\x1E\u00DE\u00B6l-\u00CD\u00FB\u00DF\u00A4@ \x10\b\u00B4\u009E\u008E\u008E\x0BS\u00D0\u00B0e\u00A7E\u0090\u00A8\x00\x00\x00\x00IEND\u00AEB`\u0082";
        toolKitIcon="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0F\x00\x00\x00\x0F\b\x06\x00\x00\x00;\u00D6\u0095J\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00!IDAT8Oc\u00BC\x10\x14\u00F4\u009F\u0081L\u00C0\x04\u00A5\u00C9\x02\u00A3\u009AI\x04\u00A3\u009AI\x04CR3\x03\x03\x00\u00F4K\x02\u0091l0\u00EA_\x00\x00\x00\x00IEND\u00AEB`\u0082";
        keyTimeIcon="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0F\x00\x00\x00\x0F\b\x06\x00\x00\x00;\u00D6\u0095J\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00!IDAT8Oc\u009C07\u00E1?\x03\u0099\u0080\tJ\u0093\x05F5\u0093\bF5\u0093\b\u0086\u00A4f\x06\x06\x00M5\x02\u00AA2\u0081_\u00A9\x00\x00\x00\x00IEND\u00AEB`\u0082";
        createLayersIcon="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0F\x00\x00\x00\x0F\b\x06\x00\x00\x00;\u00D6\u0095J\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x00!IDAT8Oc\u00EC<~\u00E5?\x03\u0099\u0080\tJ\u0093\x05F5\u0093\bF5\u0093\b\u0086\u00A4f\x06\x06\x00g_\x03A\u00E6\u00EExx\x00\x00\x00\x00IEND\u00AEB`\u0082";

        var logoContent = mainPalette.add('group');
            logoContent.alignChildren = ['fill','fill'];
            logoContent.alignment = ['fill','fill'];
            logoContent.orientation = 'column';
            logoContent.margins = 0;
            logoContent.spacing = 2;
            logoContent.orientation = "row";
            var Banner = logoContent.add('image',undefined,ScriptUI.newImage (createResourceFile ("ToolKitBanner.png", bannerImage, getResourceFolder())));
        
        var tabSelect = mainPalette.add('tabbedpanel');
        var toolKit = tabSelect.add("tab",undefined,"ToolKit");
            toolKit.alignChildren = ['fill','fill'];
            toolKit.orientation = 'row';
            toolKit.margins = 0;
            toolKit.spacing = 2;
            var Wiggle = toolKit.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitWiggle2.png", wiggleImage, getResourceFolder())),{style: "toolbutton", toggle:0});
            var Time = toolKit.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitTime.png", timeImage, getResourceFolder())),{style: "toolbutton", toggle:0});
            var Loop = toolKit.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitLoop.png", loopImage, getResourceFolder())),{style: "toolbutton", toggle:0});
            var Fade = toolKit.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitFade.png", fadeImage, getResourceFolder())),{style: "toolbutton", toggle:0});
            var Purge = toolKit.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitPurge.png", purgeImage, getResourceFolder())),{style: "toolbutton", toggle:0});
            Wiggle.onClick = function() {applyPresetProcess("wiggle");};
            Time.onClick = function() {applyPresetProcess("time");};
            Loop.onClick = function() {applyPresetProcess("loop");};
            Fade.onClick = yankAutoFade;
            Purge.onClick = function (key) {
                var keyState = ScriptUI.environment.keyboardState;
                if (keyState.shiftKey) {
                    app.executeCommand(10200);
                } else {
                    app.purge(PurgeTarget.ALL_CACHES);
                }
            };
        var createLayers = tabSelect.add("tab",undefined,"Create");
            createLayers.alignChildren = ['fill','fill'];
            createLayers.orientation = 'column';
            createLayers.margins = 0;
            createLayers.spacing = 2;
            var layersRow1 = createLayers.add('panel',undefined);
                layersRow1.alignChildren = ['fill','fill'];
                layersRow1.orientation = 'row';
                layersRow1.margins = 0;
                layersRow1.spacing = 2;
                var Adjustment = layersRow1.add('button',undefined,'Adjust');
                var Solid = layersRow1.add('button',undefined,'Solid');
                var Null = layersRow1.add('button',undefined,'Null');
                var Shape = layersRow1.add('button',undefined,'Shape');
                Adjustment.onClick = createAdj;
                Solid.onClick = createSolid;
                Null.onClick = createNull;
                Shape.onClick = createShape;
            var layersRow2 = createLayers.add('panel',undefined);
                layersRow2.alignChildren = ['fill','fill'];
                layersRow2.orientation = 'row';
                layersRow2.margins = 0;
                layersRow2.spacing = 2;
                var Text = layersRow2.add('button',undefined,'Text');
                var Camera = layersRow2.add('button',undefined,'Camera');
                var Light = layersRow2.add('button',undefined,'Light');
                Text.onClick = createText;
                Camera.onClick = createCam;
                Light.onClick = createLight;
        var keyTime = tabSelect.add("tab",undefined,"KeyTime");
            keyTime.alignChildren = ['fill','fill'];
            keyTime.orientation = 'column';
            keyTime.margins = 0;
            keyTime.spacing = 2;
            var keyTimeRow1 = keyTime.add('panel',undefined);
                keyTimeRow1.alignChildren = ['fill','fill'];
                keyTimeRow1.orientation = 'column';
                keyTimeRow1.margins = 0;
                keyTimeRow1.spacing = 0;
                keyTimeResult=keyTimeRow1.add("StaticText",undefined ," Result: ");
            var keyTimeRow2 = keyTime.add('panel',undefined);
                keyTimeRow2.alignChildren = ['fill','fill'];
                keyTimeRow2.orientation = 'row';
                keyTimeRow2.margins = 0;
                keyTimeRow2.spacing = 0;
                timeSelection=keyTimeRow2.add("dropdownlist",undefined ,["Frame","Time"]);
                timeSelection.onChange = function(){selFrame = timeSelection.selection};
                timeSelection.selection = 0
                keyTimeButton=keyTimeRow2.add('iconbutton',undefined,ScriptUI.newImage (createResourceFile ("ToolKitCalculate.png", calculateImage, getResourceFolder())),{style: "toolbutton", toggle:0});
                keyTimeButton.onClick = function keyTime () {
                    var selComp    = app.project.activeItem;
                    var selLayer   = selComp.selectedLayers;
                    var selProperties = selComp.selectedProperties;
                    var newFrame = selFrame == 0 ? selComp.frameRate : 1;
                    try {
                        switch (selProperties[0].selectedKeys.length) {
                            case 1:
                            keyTimeResult.text = " KeyTime: " + selProperties[0].keyTime(selProperties[0].selectedKeys[0])*newFrame;
                            break;
                            case 2:
                            var KeyFrame1 = selProperties[0].keyTime(selProperties[0].selectedKeys[0]);
                            var KeyFrame2 = selProperties[0].keyTime(selProperties[0].selectedKeys[1]);
                            keyTimeResult.text = " KeyDifference: " + (KeyFrame2 - KeyFrame1)*newFrame;
                            break;
                            default:
                            keyTimeResult.text = " Select 1 or 2 Keyframe. ";
                            break;
                        }
                    } catch (err) {
                        keyTimeResult.text = " Select 1 or 2 Keyframe. ";
                    };
                };
        var settings = tabSelect.add("tab",undefined,"Settings");
            settings.alignChildren = ['fill','fill'];
            settings.orientation = 'row';
            settings.margins = 0;
            settings.spacing = 2;
            var logoSettings = settings.add('panel',undefined);
                logoSettings.alignChildren = ['fill','fill'];
                logoSettings.orientation = 'column';
                logoSettings.margins = 0;
                logoSettings.spacing = 2;
                var hideLogo = logoSettings.add('checkbox',undefined,'Hide Logo');
            var credits = settings.add('panel',undefined);
                credits.alignChildren = ['fill','fill'];
                credits.orientation = 'column';
                credits.margins = 0;
                credits.spacing = 2;
                var title = credits.add('StaticText',undefined,'Yan-K ToolKit')
                var version = credits.add('StaticText',undefined,'Version: ' + version)
                var author = credits.add('StaticText',undefined,'By: Yan-K @ Yan-K.tv')
                var special = credits.add('StaticText',undefined,'SpecialThanks: Yami Odymel')
            hideLogo.onClick = function(){
                switch (hideLogo.value) {
                    case false:
                    showUIBanner();
                    break;
                    
                    case true:
                    hideUIBanner();
                    break;

                    default:
                    break;
                }
            };
            function hideUIBanner() {
                logoContent.visible = false
                logoContent.maximumSize = [0,0];
                updateUILayout(mainPalette);
            };
            function showUIBanner () {
                logoContent.visible = true
                logoContent.maximumSize = [1000,1000];
                updateUILayout(mainPalette);
            };
            function updateUILayout(container){  
                container.layout.layout(true);    //Update the container  
            };
    }
    // ==================================================
     
    //__________ SHOW UI ___________
    {
        mainPalette.layout.layout(true);
        mainPalette.layout.resize();
        mainPalette.onResizing = mainPalette.onResize = function () {mainPalette.layout.resize();}
        if (!(mainPalette instanceof Panel)) mainPalette.show();
    }
    //==================================================
     
})(this);