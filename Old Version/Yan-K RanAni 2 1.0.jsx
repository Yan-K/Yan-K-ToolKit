/*
 Yan-K RanAni 2 (Random Animation for After Effects)
 Version: 1.0
 Author: Yan-K @ Yan-K.tv
 Date: 2018/02/02
*/
  
//encapsulate the script in a function to avoid global variables
(function (thisObj) {
       
    //================
    var version = '1.0';
    //================
     
    // _______ MAIN _______
    {
		
		/* Helper Functions */
		
		function getResourceFolder () {
			var userFolder = Folder.userData;
			var resourceFolderPath = userFolder.toString() + "/Yan-K_Resource/RA2";
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
				
				
		
		
		/* RanAni System */
		
		function applyRA () {
		
		app.beginUndoGroup("Added RanAni");
		
		/* RanAni Expression */
		
		var expSepXPos = '/* Expression By Yan-K RanAni v2.0 */rA = effect("Pseudo/YanKRA2");mainControl = rA("Animation Control");randomSeed = rA("Random Seed");pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position");pX = rA("Position X");pXDir = rA("Position X Direction");pXRandom = pXDir == 1 ? random(pX) : random(-pX,pX);pXValue = transform.xPosition;if (pOn == 1){pXValue + [pXRandom] * mainControl}else{pXValue};'
		var expSepYPos = '/* Expression By Yan-K RanAni v2.0 */rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control");randomSeed = rA("Random Seed");pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position");pY = rA("Position Y");pYDir = rA("Position Y Direction");pYRandom = pYDir == 1 ? random(pY) : random(-pY,pY);pYValue = transform.yPosition;if (pOn == 1){pYValue + [pYRandom] * mainControl}else{pYValue};'
		var expSepZPos = '/* Expression By Yan-K RanAni v2.0 */rA = effect("Pseudo/YanKRA2");mainControl = rA("Animation Control");randomSeed = rA("Random Seed");pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position");pZ = rA("Position Z");pZDir = rA("Position Z Direction");pZRandom = pZDir == 1 ? random(pZ) : random(-pZ,pZ);pZValue = transform.zPosition;if (pOn == 1){pZValue + [pZRandom] * mainControl}else{pZValue};'
		var expPos = '/* Expression By Yan-K RanAni v2.0 */rA = effect("Pseudo/YanKRA2");mainControl = rA("Animation Control");randomSeed = rA("Random Seed");pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position"); pX = rA("Position X"); pY = rA("Position Y"); pZ = rA("Position Z"); pXDir = rA("Position X Direction"); pYDir = rA("Position Y Direction"); pZDir = rA("Position Z Direction"); pXRandom = pXDir == 1 ? random(pX) : random(-pX,pX); pYRandom = pYDir == 1 ? random(pY) : random(-pY,pY); pZRandom = pZDir == 1 ? random(pZ) : random(-pZ,pZ); pValue = transform.position; if (pOn == 1)  {pValue + [pXRandom,pYRandom,pZRandom] * mainControl} else {pValue};'
		var expRot = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control"); randomSeed = rA("Random Seed"); rRandom = rA("Rotation Crazy Mode");rRandomOn = rRandom == 1 ? false : true;seedRandom(randomSeed,rRandomOn); rOn = rA("Rotation"); rX = rA("Rotation X"); rY = rA("Rotation Y"); rZ = rA("Rotation Z"); rXDir = rA("Rotation X Direction"); rYDir = rA("Rotation Y Direction"); rZDir = rA("Rotation Z Direction"); rXRandom = rXDir == 1 ? random(rX) : random(-rX,rX); rYRandom = rYDir == 1 ? random(rY) : random(-rY,rY); rZRandom = rZDir == 1 ? random(rZ) : random(-rZ,rZ); rValue = transform.orientation; if (rOn == 1) {rValue + [rXRandom,rYRandom,rZRandom]/2 * mainControl} else {rValue};'
		var expScl = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control"); randomSeed = rA("Random Seed"); sRandom = rA("Scale Crazy Mode");sRandomOn = sRandom == 1 ? false : true;seedRandom(randomSeed,sRandomOn); sOn = rA("Scale"); uOn = rA("Uniform Scale"); sX = rA("Scale X"); sY = rA("Scale Y"); sZ = rA("Scale Z"); sXDir = rA("Scale X Direction"); sYDir = rA("Scale Y Direction"); sZDir = rA("Scale Z Direction"); sXRandom = sXDir == 1 ? random(sX) : random(-sX,sX); sYRandom = sYDir == 1 ? random(sY) : random(-sY,sY); sZRandom = sZDir == 1 ? random(sZ) : random(-sZ,sZ); sValue = transform.scale; if (sOn == 1)  {if (uOn == 1) {sValue + [sXRandom,sXRandom,sXRandom] * mainControl} else {sValue + [sXRandom,sYRandom,sZRandom] * mainControl}} else {sValue};'
		var expOpa = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control"); randomSeed = rA("Random Seed"); oRandom = rA("Opacity Crazy Mode");seedRandom(randomSeed+index,true); oOn = rA("Opacity"); oR = rA("Opacity Random Rate"); oStay = rA("Opacity Stay Blink");oValue = transform.opacity; if (oOn == 1) {if (oRandom == 1) {wiggle(oR,oR)} else {if (oStay == 1) {wiggle(oR/2,oR/2) + linear(mainControl, 0, 1 ,0, -oValue)} else {if (mainControl == 0) {oValue} else {if (mainControl == 1) {0} else {wiggle(oR/2*mainControl,oR/2) + linear(mainControl, 0, 1 ,0, -oValue)}}}}} else {oValue};'

		var expSepXPosM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position"); pX = rA("Position X"); pXDir = rA("Position X Direction"); pXRandom = pXDir == 1 ? random(pX) : random(-pX,pX); pXValue = transform.xPosition; if (pOn == 1) {pXValue + [pXRandom] * mainControl} else {pXValue};'
		var expSepYPosM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position"); pY = rA("Position Y"); pYDir = rA("Position Y Direction"); pYRandom = pYDir == 1 ? random(pY) : random(-pY,pY); pYValue = transform.yPosition; if (pOn == 1) {pYValue + [pYRandom] * mainControl} else {pYValue};'
		var expSepZPosM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position"); pZ = rA("Position Z"); pZDir = rA("Position Z Direction"); pZRandom = pZDir == 1 ? random(pZ) : random(-pZ,pZ); pZValue = transform.zPosition; if (pOn == 1) {pZValue + [pZRandom] * mainControl} else {pZValue};'
		var expPosM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); pCrazy = rA("Position Crazy Mode");pCrazyOn = pCrazy == 1 ? false : true;seedRandom(randomSeed,pCrazyOn);pOn = rA("Position"); pX = rA("Position X"); pY = rA("Position Y"); pZ = rA("Position Z"); pXDir = rA("Position X Direction"); pYDir = rA("Position Y Direction"); pZDir = rA("Position Z Direction"); pXRandom = pXDir == 1 ? random(pX) : random(-pX,pX); pYRandom = pYDir == 1 ? random(pY) : random(-pY,pY); pZRandom = pZDir == 1 ? random(pZ) : random(-pZ,pZ); pValue = transform.position; if (pOn == 1) {pValue + [pXRandom,pYRandom,pZRandom] * mainControl} else {pValue};'
		var expRotM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); rRandom = rA("Rotation Crazy Mode");rRandomOn = rRandom == 1 ? false : true;seedRandom(randomSeed,rRandomOn); rOn = rA("Rotation"); rX = rA("Rotation X"); rY = rA("Rotation Y"); rZ = rA("Rotation Z"); rXDir = rA("Rotation X Direction"); rYDir = rA("Rotation Y Direction"); rZDir = rA("Rotation Z Direction"); rXRandom = rXDir == 1 ? random(rX) : random(-rX,rX); rYRandom = rYDir == 1 ? random(rY) : random(-rY,rY); rZRandom = rZDir == 1 ? random(rZ) : random(-rZ,rZ); rValue = transform.orientation; if (rOn == 1) {rValue + [rXRandom,rYRandom,rZRandom]/2 * mainControl} else {rValue};'
		var expSclM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); sRandom = rA("Scale Crazy Mode");sRandomOn = sRandom == 1 ? false : true;seedRandom(randomSeed,sRandomOn); sOn = rA("Scale"); uOn = rA("Uniform Scale"); sX = rA("Scale X"); sY = rA("Scale Y"); sZ = rA("Scale Z"); sXDir = rA("Scale X Direction"); sYDir = rA("Scale Y Direction"); sZDir = rA("Scale Z Direction"); sXRandom = sXDir == 1 ? random(sX) : random(-sX,sX); sYRandom = sYDir == 1 ? random(sY) : random(-sY,sY); sZRandom = sZDir == 1 ? random(sZ) : random(-sZ,sZ); sValue = transform.scale; if (sOn == 1) {if (uOn == 1) {sValue + [sXRandom,sXRandom,sXRandom] * mainControl} else {sValue + [sXRandom,sYRandom,sZRandom] * mainControl}} else {sValue};'
		var expOpaM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); oRandom = rA("Opacity Crazy Mode");seedRandom(randomSeed+index,true); oOn = rA("Opacity"); oR = rA("Opacity Random Rate"); oStay = rA("Opacity Stay Blink");oValue = transform.opacity; if (oOn == 1) {if (oRandom == 1) {wiggle(oR,oR)} else {if (oStay == 1) {wiggle(oR/2,oR/2) + linear(mainControl, 0, 1 ,0, -oValue)} else {if (mainControl == 0) {oValue} else {if (mainControl == 1) {0} else {wiggle(oR/2*mainControl,oR/2) + linear(mainControl, 0, 1 ,0, -oValue)}}}}} else {oValue};'

		var expCorBlend = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); rA("Blend Mode");'
		var expCor = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control"); randomSeed = rA("Random Seed"); seedRandom(randomSeed+index,true); cOn = rA("Color"); cBase = rA("Base Color"); cR = rA("Color Random Rate"); cRandom = rA("Color Crazy Mode");if (cOn == 1) {if (cRandom == 1) {random(wiggle(cR/8,cR/8))} else {linear(mainControl, 0, 1 ,cBase, random(wiggle(cR/8,cR/8)))}} else {cBase};'
		var expCorOpa = '/* Expression By Yan-K RanAni v2.0 */ rA = effect("Pseudo/YanKRA2"); mainControl = rA("Animation Control"); cOn = rA("Color"); cO = rA("Color Opacity"); cRandom = rA("Color Crazy Mode");if (cOn == 1) {if (cRandom == 1){cO} else{cO*mainControl}} else{0};'

		var expCorBlendM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); rA("Blend Mode");'
		var expCorM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2");toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); randomSeed = rA("Random Seed"); seedRandom(randomSeed+index,true); cOn = rA("Color"); cBase = rA("Base Color"); cR = rA("Color Random Rate"); cRandom = rA("Color Crazy Mode");if (cOn == 1) {if (cRandom == 1) {random(wiggle(cR/8,cR/8))} else {linear(mainControl, 0, 1 ,cBase, random(wiggle(cR/8,cR/8)))}} else {cBase};'
		var expCorOpaM = '/* Expression By Yan-K RanAni v2.0 */ rA = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA2"); toDelay = rA("Time Offset (Second)"); toIndex = rA("Fix Index"); mainControl = toDelay == 0 ? rA("Animation Control") : rA("Animation Control").valueAtTime(time-toDelay*(index-toIndex)); cOn = rA("Color"); cO = rA("Color Opacity"); cRandom = rA("Color Crazy Mode");if (cOn == 1) {if (cRandom == 1){cO} else{cO*mainControl}} else{0};'
		
		//RanAni變數
		
		var selectComp = app.project.activeItem;
		var selectLayer = selectComp.selectedLayers;
		var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/RA2.ffx";
		
		//如果選擇單獨Layer套用模式
		
		if (dropDownMenu.selection.index == 0) {
			
			app.executeCommand(9006);
			
			for(i=0 ; i<selectLayer.length ; i++){
				if (selectLayer[i].threeDLayer == 1) {
				} else {
					selectLayer[i].threeDLayer = true;
				}
				selectLayer[i].applyPreset(new File(presetFile));
				try{
					selectLayer[i].position.expression = expPos;;
				}
				catch(err){
					selectLayer[i].transform.xPosition.expression = expSepXPos;
					selectLayer[i].transform.yPosition.expression = expSepYPos;
					selectLayer[i].transform.zPosition.expression = expSepZPos;
				}
				selectLayer[i].orientation.expression = expRot;
				selectLayer[i].scale.expression = expScl;
				selectLayer[i].opacity.expression = expOpa;
				selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode").expression = expCorBlend;
				selectLayer[i].property("Layer Styles").property("Color Overlay")("Color").expression = expCor;
				selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity").expression = expCorOpa;
			}
		} else {
			//如果選擇控制器套用模式
			//如果該控制器已存在
			if (selectComp.layer("_RanAni_Control_" + dropDownMenu.selection.text) != null) {
				
				app.executeCommand(9006);
				
				for(i=0 ; i<selectLayer.length ; i++){
					if (selectLayer[i].threeDLayer == 1) {
					} else {
						selectLayer[i].threeDLayer = true;
					}
				try{
					selectLayer[i].position.expression = expPosM;
				}
				catch(err){
					selectLayer[i].transform.xPosition.expression = expSepXPosM;
					selectLayer[i].transform.yPosition.expression = expSepYPosM;
					selectLayer[i].transform.zPosition.expression = expSepZPosM;
				}
					selectLayer[i].orientation.expression = expRotM;
					selectLayer[i].scale.expression = expSclM;
					selectLayer[i].opacity.expression = expOpaM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode").expression = expCorBlendM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Color").expression = expCorM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity").expression = expCorOpaM;
				}
			} else {
				//如果該控制器不存在
				app.executeCommand(9006);
				
				var controlLayer = selectComp.layers.addNull();
				controlLayer.source.name = "_RanAni_Control_" + dropDownMenu.selection.text;
				controlLayer.applyPreset(new File(presetFile));
				
				for(i=0 ; i<selectLayer.length ; i++){
					selectLayer[i].threeDLayer = true;
				try{
					selectLayer[i].position.expression = expPosM;
				}
				catch(err){
					selectLayer[i].transform.xPosition.expression = expSepXPosM;
					selectLayer[i].transform.yPosition.expression = expSepYPosM;
					selectLayer[i].transform.zPosition.expression = expSepZPosM;
				}
					selectLayer[i].orientation.expression = expRotM;
					selectLayer[i].scale.expression = expSclM;
					selectLayer[i].opacity.expression = expOpaM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode").expression = expCorBlendM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Color").expression = expCorM;
					selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity").expression = expCorOpaM;
				}
			}
		}
		app.endUndoGroup();
	};

	//刪除RanAni語法，備用
	/*function delRA() {
		
		app.beginUndoGroup("Remove RanAni");
		
		var expClean = '';
		
		var selectComp = app.project.activeItem;
		var selectLayer = selectComp.selectedLayers;
			
			app.executeCommand(3744);
			
			for(i=0 ; i<selectLayer.length ; i++){
				if (selectLayer[i].threeDLayer) {
					try{
						selectLayer[i].position.expression = expClean;
					}
					catch(err){
						selectLayer[i].transform.xPosition.expression = expClean;
						selectLayer[i].transform.yPosition.expression = expClean;
						selectLayer[i].transform.zPosition.expression = expClean;
					}
						selectLayer[i].orientation.expression = expClean;
						selectLayer[i].scale.expression = expClean;
						selectLayer[i].opacity.expression = expClean;
						selectLayer[i].property("Layer Styles").property("Color Overlay")("Color").expression = expClean;
						selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode").expression = expClean;
						selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity").expression = expClean;
					try{
						selectLayer[i].effect("Pseudo/YanKRA2").remove();
					} catch(err) {
					}
				} else {
				};		
				
			};
		
		app.endUndoGroup();
		
	}*/
	
	//表達式Bake
	function convertToKeyframes(theProperty)
	{
		if ( (theProperty.canSetExpression) && (theProperty.expressionEnabled) && (theProperty.numKeys < 1) )
		{
			theProperty.selected = true;
			//關閉表達式以讀取圖層原數值
			theProperty.expressionEnabled = false;
			//將原數值存成變數
			var theValue = theProperty.value.toString();
			var theExpression = theProperty.expression;
			//將表達式加入原數值標為註解
			theProperty.expression = "//"+theValue+"\r"+theExpression;
			//開啟表達式
			theProperty.expressionEnabled = true;
			//執行Bake
			app.executeCommand(2639);
			//將原數值的註解刪除以方便轉陣列，將原表達式轉換為註解
			theProperty.expression = theValue+"\r"+"//RanAniBakeData"+theExpression;
			//關閉表達式
			theProperty.expressionEnabled = false;
			theProperty.selected = false;
		}
	}
	
	//Bake優化功能
	function optimizeKeyframes(theProperty)
	{
		theProperty.selected = true;
		var activeItem = app.project.activeItem;
		var selectedProps = activeItem.selectedProperties;
		var y;
		for (var x = 0; x < selectedProps.length; x++) {
			if (selectedProps[x].numKeys > 1) {      
				y = 1;
					while (y < selectedProps[x].numKeys) {
						if (selectedProps[x].keyValue(y).toString() == selectedProps[x].keyValue(y+1).toString()) {
						selectedProps[x].removeKey(y+1);
						} else {      
							y ++;
						}
					}
			}
		}
		theProperty.selected = false;
	}
	
	//UnBake功能
	function convertToExpressions(theProperty)
	{
		if ( (theProperty.canSetExpression) && (theProperty.expressionEnabled == false) )
		{
			theProperty.selected = true;
			theProperty.expressionEnabled = true;
			//刪除指令，刪除關鍵影格
			app.executeCommand(21);
			//將表達式存為變數
			var theExpression = theProperty.expression;
			//用換行分割陣列
			var lines = theExpression.split('\r');
			//取得表達式第一行
			var origValue = lines.slice(0,1);
			//將取得的陣列轉換回字串
			var newValue = origValue.join();
			//將字串用逗號重新分割為陣列
			var newValueArray = newValue.split(',');
			//取得陣列前三個數值
			var finalValue = newValueArray.slice(0,3);
			
			//將數值設為取得的陣列
			theProperty.setValue(finalValue);
			
			//將表達式用換行分割成陣列
			var oldExpression = theExpression.split('\r');
			//刪除陣列第一行
			oldExpression.splice(0,1);
			//表達式轉換成字串
			var newExpression = oldExpression.join('\n');
			//刪除RanAni表達式註解
			var finalExpression = oldExpression.toString().replace("//RanAniBakeData", "");
			
			//套用新的表達式
			theProperty.expression = finalExpression;
			
			theProperty.selected = false;
		}
	}

	//Bake功能，備用
	/*function bakeRA()
	{
		var selectComp = app.project.activeItem;
		var selectLayer = selectComp.selectedLayers;
		
		app.beginUndoGroup("Bake RanAni");
		
		for (i=0 ; i<selectLayer.length ; i++){
			try{
			myProperty = selectLayer[i].position;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.xPosition;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.yPosition;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.zPosition;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].scale;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].orientation;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].opacity;
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Color");
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode");
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity");
			convertToKeyframes(myProperty);
			optimizeKeyframes(myProperty);
			}catch(err){
			}
		}
		app.endUndoGroup();
	}*/
	
	//UnBake功能
	function unBakeRA()
	{
		var selectComp = app.project.activeItem;
		var selectLayer = selectComp.selectedLayers;
		
		app.beginUndoGroup("UnBake RanAni");
		
		for (i=0 ; i<selectLayer.length ; i++){
			try{
			myProperty = selectLayer[i].position;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.xPosition;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.yPosition;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].transform.zPosition;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].scale;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].orientation;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].opacity;
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Color");
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode");
			convertToExpressions(myProperty);
			}catch(err){
			}
			try{
			myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity");
			convertToExpressions(myProperty);
			}catch(err){
			}
		}
		app.endUndoGroup();
	}
         
    }
    //==================================================
     
    // _______ UI SETUP _______
    {
        var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette','Yan-K RanAni 2',undefined, {resizeable:true});
        if (mainPalette == null) return;
        
        mainPalette.alignChildren = ['fill','fill'];
        mainPalette.margins = 5;
        mainPalette.spacing = 2;
    }
    // ==================================================
  
  
    // _______ UI CONTENT _______
    {
        var contentLogo = mainPalette.add('group');
        contentLogo.alignChildren = ['fill','fill'];
        contentLogo.orientation = 'column';
        contentLogo.margins = 0;
        contentLogo.spacing = 2;
        contentLogo.orientation = "row";
		imageLogoImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x01,\x00\x00\x00(\b\x06\x00\x00\x00D\u009B\u00C7\u00D7\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x003eIDATx^\u00ED}\x07\u0080\x1CG\u0099nu\u009A\u009C\u00E3\u00CE\u00ECl\u00CE\u00AB\u00D5\u00EE*gK\u0096\x13\u00CE\x19\u009B\u00C3'\u0084\x0F\u00EC\u00E3\b\x07\u009C\u008F{\u0084\u00E3\x0E\x03\x06s\x06\u00BF{\u00E0\x03\x0E\x0ELt\u00C2\x01[r6\u00B2\u0095\u00AD\u00B4\u00D2jw\u00A5\u00DD\u00D5\u00E6\u00DD\u00C99\u00F6t|\x7F\u00F5\u00CC\u00C8k!\x03g8\u008C\u00DF\u009B\u00CF\u00AA\u00ED\u00EA\n\x7FUw\u00D7\u00FF\u00D5\u00FFW\u00D7\u00B4Q\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15UTQE\x15\u00FF\x7F\u0080*\x1F\u00ABx\x17\u0080 \b%\u009C\x03\x06\u0082\n\u0082\u00BA\x1Cp\x1C\u00A7\u00E1@B\u00C0\u0090\u00CBGDR\x14\"H\x12\u00C9\u00F2\u00D9\u00A4?+(h\x7FQ\u00DB\u00B8\u008F\u009A\u00F2\x11_\u0098\x04\x019<\u00F5(\u009FM\u00E1\u00E8\u009F\x02x\u008C/\u00BE\x1FJ\x1BU\u00BC;\u00F1[\u00A3\u00BF\u008Aw\x076\\w\x13\x1A\u00DE\u00BF\u0087q\u00D4\u00FA\u00DA\u00BD\u00AD\u00ED\u00F5VW\u008D\u0085V\u00A9\x18Y\x02\u00F0\u00BC\u00C8\u00E6rl,\x1C\u0088\u009E>tp>\x13\u008BF\u00A1J\x16\u0091\u0084\u00BC\u00FE\u00CAk\u0094\u00FA\u00FB\u009F\u00F9\u00B5r\u00FCs\x02\u0093\u0095(\u008Ah\u00ED%W!\u0083\u00C5\u0086R\u00D1p\u009F\u00D3[\u00DB\u00C9\u00D0\u008C<;:2\u0099\u008CEG\u009A\u00DA\u00BA\u00F2\u00BFy\u00F6\u00F1r\u008D\u00B7\u008F\u00C6\u00A6\x0E$\u00F0\x1C\t\u00ED\u00D5@\u00BCA\u00AB\u00D5Y8\u00AE\u0098H\u00A7\x13\u00C7}\u00BEf\u00F6\u00B9\u00E7\x1E\x01\x1A/\x11\u00E7;E\u00DEU\u00FC\u00F7Q\u00B5\u00B0\u00DEE\u00A8XX\u00DE\u0096V\u00F4\u00FD\u00FD{\u00D0\u00EE\u00A7\u009E\u00B15\u00F7\u00F6_\u00DD\u00B6l\u00D5\u00B5\u008D=K/\u00AEij^\u00EB\u00AC\u00AD[\u00E1\u00F0\u00D6.\u00B3\u00B8\u00DC=\x06\u00AB\u00ADV\u00A5\u00D1\u00D1$Iq\u00C9H(\u00F7\u0081\x7F\u00BE\u0097{\u00FE'\u00FF\u0089\x16&\u00CE \t\u0088\u00E3\u00CF\r\x12,;\u009Aa\u00D0\u00ED\u009F\u00B9\x1B\u00FD\u00E8\u00EB_\u00A0.\u00BC\u00E6\u00BD\u00B7v\u00AFX{g}K\u00FB:>\u009B\u0097$A\x18\u00BDq\u00DBG\u00D2\u00BB\u009E{\x12\u0089\u0082P\u00AE\u00F5\u00F6\u00D0\u00DE\u00D1\u008BTj\r\x05\u00A1\u00B7\u00AFw\u00F5\u0095u\u00BE\u00E6K\u00CC&\u00AB\u0095 \u00C8\u00A3\u00EB\u00D6l-\u00BC\u00B6\u00E7\u00D9*Q\u00BD\x0BQq\x19\u00AAx\x17\u0080\u00A2i%\\\u00B2\u00FDN\u00B4\u0089 \ff\u0087s\u00E9\u00D2\r\u009B/\u00B4{<M\u00D9d\"2yb\u00E0\u00D0\u00C4\u0089c\u0087fF\u0086F@\x19Um\u00CBW]v\u00DD\u00DF\u00FD\u00FD\u00A7/\u00B9u\u00DB\x07\u00BA\u0096\u00AD\u00E9\u00FB\u00C9\u00DD\u00FF\u00A4e4j\u0084\u00C3;\x01\u00B0\u00FD\u0090\u00A5\u00A9\x05\u00FD\u00EB\u0087o\u00A6)\u00BD\u00CE\u00E3u\u00D5\u00B6\u00D7\u00B4\u00B4t\u00DA\u00DA[Z\u009D\u00F5\r\u00CD\x12A4~r\u00DB\u0095*\u00B3\u00D5^\u00AE\u00F1\u00F6\u00A1\u00B7\u00D9\u0090\u00D6f!\u00D5v\u008B\u00DDmqwz\u00AD\u009E~\u00A7\u00D5\u00D5\u00A2\u00A2\x18\u00CD\x15\x17\u00DD\u0088\f\x06K\u00B9d\x15\u00EF&T-\u00ACw\b\u0095\u00B5\u00A4\u00EDw\u00DF\u008B&\x07\x07\u0090\u00D6hDj\u00AD\x1Eit\u00A5P\u00CC\u00E7\u00CA%\u00DF\x00\u00AE\u0083\u00B1\u00E1\u00CA\u00EB\u00D0\u00A1\x17vX\u00DB\u0096\u00AF\\\u00D1\u00B5n\u00C3\u00A5\u00A2 \u0092\u00FE\u0089\u00F1C\x03\u00BFy\u00F1\u00D5\u00E0\u00D4\u00E4\u00F1D\u00D0?FP\u00E4\u009C\u00C1d\x11u\x1A}\x07\u0090\u0097\u0095\u00A4)62;\x1Dh\u00EE\u00EE\u008D:\u00DC^\u00B0\u00B0$\u00C4\x0B<r\u00D7\u00D6\u00A3\u0096\u00EE^\u00D4\u00D5\u00BB\x12\u00B5-\u00E9G5\u008D-H\u00A77\x02\u00B9\b\u00C8\u00ED\u00AB\u0087\u00FC\x06\u00B0\u00EAH\u00F0&It\u00EF\u00CFw\u00A0\x03/?\u008B\x1C5^\x04V\x11\u00B2\u00D8\u009D\u0088gYT\u00D7\u00D8\nu\u00FBPkg/\u00F2\u00D57!\u008B\u00C9\u00A6,\u009A\u00E5s\x19\u00A5\u00BF\u00F8:\u00B1eH\u00D3\f\u00FA\u00F0m\u009FD\u0083\u0087\u00F6ZzzV\u00AEjY\u00B9j\u0083\u00D1f\u00F3\u00C8\x05\u00B8\u00DA`$\u009A\n\u00852\u00A9`h\u00BE\u00A1\u00A9=\x13\u008A\u00F8\x15\u008B\u00CC\u00E5\u00F2B\u00DB\x04r\u00D5\u00D4\u00A2\u0086\u00E6\x0E \x1A\x13\u00CAg3\u00A8\u00DE\u00D7\u008C\u00DA[\u00BAQ\x1BXRu\u00F5-\u00C8j\u00B4!B\u0092\x11)\x13\u00C8fu \u00BD\u00D5\u008AX\u008EE<_T\u00B9\u008C\x0E\x16\u00AC\u00B7\u00E9d6ql\u00C1?3\u00B4\u00F5\u0082+\u00D9\x07\x7F\u00FE\u00EF\u0090\u00C7)\u00FD;\x17\x0E\u00AB\x0B\u00E9u\x06\u00A4U\u00EB\x10M\u00D1J\u00DF;\x1A;P4\x19\u0083\u00DC\u00AAU\u00F6N\u00A2\u00BA\u0086\u00F5\x0E\x00+\u00F0?\u00FE\u00E8!t\u00D7\x07\u00DE\u008B6\u00AE\\\u0083\u00C6\u008E\x1E\u00C2\u00C9\fE\u00AB\x10\u00A3\u00D6\b\x02\u00CF\u00C9\x02(\u00DB\u00B9\u00A0Ux=\x1D\u00A1\u00BB\u00BE\u00F7\x13\u00F4\u00CD;\u00B6\u00D5n\u00BDm\u00FB\u00D5[n\u00BD\u00ED\u00CEd8\u0094\x1B\u00D9\u00BB\u00FBW\u00CF\u00FC\u00E7wvB\u00B6\x1F\x02\u00F6\u00F7\u00E4\u00BEu\u009B\u00FB6\u00DFp\u00CB\u00A7\u00AD\x1EO{x~f\u00E4\u00F5g\u009F\u00F9\u0099\u00B5\u00C6\u00F3\x02^\u00BB\u00D9\u00F5\u00C4#\u00E0v\u00F1X\x19Uv\u00AFOW\u00DF\u00D0\u00A2\u00D1\u00EA\u00F4T&\u009B\u00E6\u00C7N\x1C\u00CD\x17\u00D9\x02\u00EE\x00Ik5*B\u0094y\u008A 9_S\u00B3<3>F\x03\u00F91\u008C^\u00CBd\u00E3\t\u00AC\u00F1<(\u00B5\u00BA\u00A9\u00B5K\u00AB3\x18\u00E9\\.#M\u008E\x0E\x15$Y\u00CE\u00BD\u00F7\u00FD\x1F\u0091\x1F\u00FD\u00C5wQks7\u009A[\u0098B\u0092,\u00A2'\x7F3\u0086\u00BE\u00F1\u00C5\u008F\u00B5\u00D65\u00B5}\u00B0\u00A6\u00AB\u00B3G\u00A7\u00D2\x1A\u00E5t\u00BEX\u00CC\u00E73\u0081\u0085\u0099@2\x11}P\u00AF7\r<\u00F2\u00D0wA4BZ\u0083\x01L3\u0099D\x14\u00A9\u0086\u00C0\x14\u0092)\u00A5M\btSs\u0087\u00DEd\u00B13l>'-\u00CCL\x14\u00B3\u0085l\u00E1\u00C5\x13q\u00FE\u00D2>\u009BR\x17\u0080\u00C7\u00B7\x0E\x026\u00A7\u00F0\x11_S\x00\u0082\u00E2ob\"\u00C28\u00D75\u00C4V,C\u00A9(\u00B6\u0098\u00C73\u0084p\u00D3\u0085\u00B7H\u00FB\u0087\u00F7\u00A1u=\u00EB\u00D1\x13\u00BB~\u00A5\u0094\u0091\u00E5\u00EA\u00DA\u00FD;\u0081?\ta\u00D5\u00B5v\u0094c\x00\u00FC\u00F0\u00F1\u00F3\x07\u00C92\x05\x1E'>WZ!\u0094\x19\x10\u009F\u00C3$\b\u00AA\u0080\u00FF\u00E0Bp(\x0F\x18\u009C\"\u00E3\u00F4\u00B3\x03\b\u00EA\u009C\u008DC2.P*\u0085#\x10U\x12\u00DE\f\u009C\u00B58\u00F9\rQ\x7FR`\u00F7\u0086\u0085\u0099>\x1E\u00C4\u00E3\x1F\u00C4\u0097\u00AD\u0088\u00DF\u00B76D\u0081\u0095\u0081\u0089\u00C2\u00E6\u00F1brB\u00A1\u00E9I\u00C2\u00E1\u00AB3C]\u008B\u00C0\u00F1\x02(O\x04\u00E2\u00C5T$\\\u00AE\u0081\u00DB*\u00C9d\u00D4%W\u00EE_\x1F\u00DD\u0081\u00BE\u00FC\u00BEk}[n\u00B9\u00ED\u00EA\u00CD7\u00FF\u00D5\x1D\u00C9@ =\u00BC\u00F7\u00B5Gw\u00FC\u00F8{O\x03y\u00CC\u00DBk}\u00F2Uw|\x14\u00C5\u0082\u0081:\u00A3\u00D5vWS[\u00F7\u00BAd8\u00BCp|\u00CFo~b\u00B2\u00D9\u009F\u00C220IF\u0082\x0Bz\u00AB\u00DD\u00D9\u00ECpy\u009A\u00CC\x16\u009B\u008Fd\x18U\u00A1XH$\u00C2\u00C1\u00B9X$8c4\u009A\u00F5\f\u00A3\u00B6E\x02\x0B\u00B3\u00F9Lz\u00FE;\u00BF\u00DE\u00CD\u00FD\u00FD\u00CD[\u00EDf\u00AB\u00A3\u00D6\u00E6p\u00D5\u00F2\x1C\x17\u008A\u00FA\u00E7cV\u00A7\u00DB\x0B\u00A1N\u00AB\u00D5Y%\u008E\u00E72\u00C9\u00C4|8\u00EC\x1F\u009C\u009D\x1E\u00C7&\u0089\u0080-+L\n\x06\u0093\t%\u00E31\u00F4W\x1F\u00F9\u00C7\u00D5M\u00ED\u00DD\u00FF\u00CA\u00A5\u00B2\x1CXU\u00B3`\u00CD\u0089\x16\u009B\u00A3F\u0092%\x03[(|w\u00C5\u00EA\x0B\u009E\u00FD\u00C4\u00DF^\u008Bd\u00B8\u00C7V\u008B\x03e3)\u00BD\u00CD\u00E1\u00C6\u00FD\u00F4\u00E5\u00B2\u00E9@80\x1Fs;<6\u00AB\u00C5\u00DE\u00A23\u0099\u00EDPO\u00CC\u00A4\x12\u00FEp\u00C8?\u0095\u00CBgg\u00C0\u00C2bc\u00B1\x10\x12\x04\u0081\x10E\u00C1ZSS\u00E7S\u00AB46 \u0099\fX\u008B\u0083 \u0097?ufPy\u0086\x18\u00F8\u00B9\u00E1\u00FE\u00E1#\x0EN\u00AB\x1B'Z!\u00D1\x02\u00CF3+\u0088B:\u0091\u0089\x17mf\x07\u008A\u00A7\u00F0\u00FB\u008B7\u00EA\u00BC\x154\u008C\x06\u00B1<\u008B\f\x1A\x03\x02RFz\u008D\x0E\u00EAP0\u0086\u00A1\x0E\u008CE\u0098\x04\u00DE\x18\u009B\x00<\u00CEKc\u00BF\x14\u0087\u00C2\u00A5\u00F1\u008E\u00FB\u0085\u008B\u00C2\u00F8\u00C2\u0099g\u00EBQ\u0095\x01]>/\u0087\u008A\x1C\x1CHA\x02\x19\u00B81\u00F8\x07\u00BA\u0087C\u00E5\\\u0091_\u00D15\u009C\u0086\u0081\u00DB\u00C2\u00F2\u00958N\u0096\u0091D\u00C3\u00B8\u00C6z\u008B\u0093*\u00FD\u00C3\u00E78Z>\u00C7'\u00B2\u00D2\x1F\u00B0pq\u009B\u00D0\u00D7\u0092\u00AE\x02*G\u00C0dx\u00BA\x1C{\u00FB\u00A8\u00AEa\u00BDC\u00C0\u00EE\u009D\x0E\u00DC@F\u00A7\u00F3\x18\u00AC\u00F6>Osk\u00B7\u00C5\u00E9\u00AC1Z-\u008C\u00D1f-\u0097:?\b\u00ACg\u0098 \u00E1Hr@f\u00BC\u0088d\x11|<\u00B0\u00AC\u00FA\u00B7\\,3\x1A\r\u00BA\u00F4\u00E6m(\u00E9\x0F\u00E8\u00D4\u00B4J\x0B\n\r\u00CA\u00CB\u00B1\u00C5l\u0086\x13\u00C0\u0085\u008B\x07\x17\u00D0\u00D8\u00E0Q\u0095\u00D5\u00EDik\u00EF]\u00B1\u00B5w\u00D9\u00BA\u008B:\u0096,[\u00D3\u00DC\u00D5\u00D3\u00D7\u00DC\u00D3\u00B7r\u00C9\u00BAM[;V\u00AE\u00BD\u00A8\u00AD\u00BB\u00FF\u00E2\u009E\u00DE\u00D5\u009B\u009C\u009E\u00DA\x06\u0095AGo\u00DB\u00D2\u0083Lv\u0087\u00B5\u00B6\u00B9\u00AD\u00BB\u00A7g\u00F5\u00E6\u00AE\u00B6\u00DEK\u00BA\u00BA\u0097m\u00EE\u00EA_\u00B5\u00A9}\u00C5\u00AA\u00F5\u009D\u00CBV\u00AF\u00EB]\u00B9\u00F1\u00A2\x15\u00AB7_\x01\u00AE\u00DC\x1A\u009A\u00A6=\u00D0'\n\u00BB\u0093\u0098|0Y\u0081\u00A2\u00D3j\u00B5\u00C6\u00E3\u00F6\u00D67\u00CB\u0082\u0090\u009F\x1C=9\x14\u0098\u0099:\u00C5\u00C7\u00D3Y\u00BB\u00C9\u00E1\u00D2jtu\x1F\u00BAm+\u0089\u00DD\u00BE\u0096%\u00BD\u00C8as#5\\\u0090\u00CF\u00D3\u00D0\u00D6\u00B7d\u00F5Em\u00CD\u00DD\u009Bz\u00BAWl\u00EE\u00EB\\y\u00E9\u00D2\u00A6\u00DE\u00F5=\u00ED\u00FD\u00EB\u00FA{\u00D7\\\u00D8\u00BF|\u00FD\u00A5-K\u00FB7\u00EAlV\u00EF\u00E8\u0099!R\r\x04\x01\u00AE)i2X\x1C\r\u008DmK\u00A1\u00DE\u00FA\u00B6\u00DA\u00F6\u009E6o+\u00D3\u00E6k\u00C7\u00B7\u00F1-\u00E1\u00B08\u0091\u00CB\u00EA6\u00D5Xk\u00DA\u00BDVO/L\x02\u00AD\u0090\u00ACS1%\u00E2\u00FD\u00C1\u00E7\u00FE\u00ABT\u00B0\u008A?;\u0088\u009A\u00CE\u00FEF%\u00F6\u00DB\x1EHi\u0087\u00CC\x7F\x03|!\u00A7\u0083\u0081\u0089M\u008D\x12%\u00FF\u00BF\x06\u008E\u0083\x19$/\u0092$\u00C9\u0087\u00C3a|\u00C7\u00F0B\x13>\u00F20\u0090\x153\b\u00CF\u00BC\u00E7C%}\u00D1\u00AC\u008C'\x0B\u00D5\u00A5\x7F\u00B5\u00FDZ\u00AB\u00B7v\u00AD \t\u00A9\u0089\u00C3\u0087\u008FD\u00E7f\u00F7\u00D8}\u00BE\u00D4\u00F2\u00AD\u009B\u00D0\u0083_\u00F9\u00AA\u00A2\u00E8\u00CA\u00BE)8V,\u00AC\u00BB\x1Fz\x06}i\u00DB\r\u00BE\x0Bo|\u00DF\u00D5[\u00AE\u00BB\u00E5\u008EL0\u0094;\u00B9\u00FF\u00B5'\x7F\u00FD\u00B3\u00FF|\x1E\u00B2\u00B1\u00C9W\u0084`\u00DC\u00F0\u009E\u00EB6\\p\u00E95\x1F\u00E4i\u00A4\u009F\u009B\x1A;pp\u00C7S\u008F\u00BB\u00EB\x1B\u008F\u00BE\u00E7C\x7F\u008B\u00BE\u00F6w\u00DB\u00DA\u00AF\u00BD\u00E5C7t/]q\u0099\u00C8qD\"\x11\u00F5Gb!?ER\u008C\u00C3hk0\u00BA\u00DD:\u0083\u00CDn\u00E3\n\u00F9\u00F8\u00AE\u00A7\x1E\u00FE\u00E9\u00F0\u00C1\u00BDOGc\u00E1\u00F4\u0092u\x1BWt\u00F6\u00AF\u00BAjY\u00EF\u00BA\u008B)\u0086f\u00E2A\u00FFB6\x1C\u00C9\u00E7I\u0091\u00A7d\u0082\u00F49}u\x16\u00BB\u00D35\u0097\u00F0\x0F\u008F\u009C<\u00F2\u00CB\x17\x1F\u00FE\u00C9+\r-\x1D\u00B9X$\u0084\u00B2\u00E9$\r\u00FD\u00F2\u00DCq\u00E7\u00E7n\u00D9\u00B8\u00F9\u00F2\u00CF\x1C?\u00BC\u00E7\u00B1\u009F\u00FD\u00F8\u00FE_\u0080\x05\u0084\u0096\u00F5\u00AE\u00BD\u00A2\x7F\u00CD\x05W\u00FB\x03\u00B3\u00AF\u00DCw\u00DFg\u00FE\x03\u00CAM\u00C2\u00BD\u0092.\u00D8r%\x1A95\u00E0\u00DDr\u00C1\x15\u00EF\u00DB\u00B4\u00E1\u00B2\u00F7e\u0084|\"\x1B\u008Fg\u0089\f\u00ABJ\u0082P\u0091&H\u0087\u00DB\u00E36k-V1\u0097\u008F\x1C<\u00B6\u00E7g\u00CF\u00BC\u00FA\u00AB\u0097/^uY\x1C,3\x1A\\\u00DC\u00D5k\u00B7\u00BE\u00E7j\u00B3\u00D5\u00BE\u0084g\u00D9\u00D3 \u00F7+\u00F04\u00D2\u00DF\u00FE\u00FE\u00DD\x10-\u00E1\u00CAu\u00DBP\u0091\u009DE\fcE\u00A2X\u0084\u0087YD\u00E9B\u00BA\u00AB\u00DE\u00D5p\u00B9\u00D7^\u00EB\rD\u00FD\u00FE\u00933C\u00AF\u008CM\u008F\u009Cx\u00AB\u00E7{>\u0098uf\"\u0095O\u00E1\u0087f\u00F0 \u008F^p\nj\u00B8&\x12,\u00BB\u00B7\u00B5v\\Z\x10\u0080aX>bT\u00D2\x16\u00A3\u0092\u00BF8\u00EF|\u00ABu\u00E7\u00AB\u00FBv\u0080e\u00BF\u0085,\u00B8]\u0084\u00A4f\u0098<>\u00A9\u00D0\u00C9\u00F9\u00A8\u00E6\x0F\x05\u00DD\u00B9\u00A4\u00E3\u00AE7m\u00A5\u00FB}T\u0083\u009FW\u00C5.[d\u009F\u00C1s\u0080\t\u0095n$%B\r\u0096\u00AF(B9\u00FCT\u00DEp\u0090dD\u00C1\u0089\u00B8\u00E8Q\u0095\u00CEK\x03\u0080*\u009B\u00A2J\u00F9\u00C5\u00E6\u00EEb\u009B\x12\u009F\u00E3\x02\u008A\u008CE\u00E9\u00E7\x149\x0B\u009C~\u00EE9\u00C6\u00F9\u00D2\u00CE\u00C59edl\u00CB\u0083o&\u008A\u00A0E\u0092\x10m-\u00B2\x01\u00FF\u00C2\u00FC@fv\u00EAx,\x16\u00F3\u00C3\u0083\u00C1\u00CF\r\u00877.\u00F9<0\u0098\u00AD(\u0093\u008C\u00A3\u00F6\x15\u00ABm\u00CD\u00BD}\u009B\u0096m\u00BA\u00E8V\u0095Z\u00DD\x1A\u009A\u009D\x19\u0098 \u00D0\u00E9\u00F9\u00E93\u00D4\u00DC\u00D48~\u00D2d[O\u009F4>t\u00A2DZ\u008B\x14E\u00E1<\u00C5\u00BD\u0086\x03\u0081D\u009D\u00C5bj\u00E9\u00E9\u00EF\u00DB\u00FE\u00D9\u00BB\u00B5\x1A\u00AB\u0099\u00CF\x17\ny\u0083Z\u00EF\u00B6h\u008D\x1D\u0088\x13\u00C8\u00E8\u00FC\u00CC\u00A1\u0099SC\u00BBf\u00C6OO\u00BAj\u00EB\u00D0\u0097n\u00BD\x16M\u00ED\u00F9\u00BB5\u00BE\u00E6\u00B6+\r&\u008B5\u00BC0;\x12\u00F0\u00CF\x1E\x18\x1D;9\u00ECqxT&/\u00D3co_r\u0093\u00B1\u00C6\u00D3\u009F\u00E3\u00F2\u00A75j\u009D^\u00CEsJ\x07\x18\u0082R\u00E9\u00B5`\u00B6476KE\u009E\u00CE\u0080\u00EF\u00C7\u00E7\n\u00C3y!7\u0091\u0089\u00C6\x04\x13\u00A5]\t\u00EE\u00DDe\u00ED\u00BE\u008E\u00ADR*;\u00F2\"B\x07\u00D7\u00AC\u00DD\u009A{m\u00D7\x0ELX\u00AA\u009E\u00D5\x1B\u00DAuZ}\x0F0\x02/\u00A4s\u0099H2\x12I\x17\u00B3\u00C5\u00BA\u00C6\u00D6y\u00B8\u00B9\x19\u00B0f\u00DA/\u00BA\u00F0\u009A\u00DEWv==\u0085\u00DBSQ\f\x18\u0090<e\u00D0\u00E8M5&g\u00BD\u0085\x10;\"2}$\u0094\u009C\u00D8\u009De\u00B3\u00A3\u0099B&\x05nv\u0097\u00D9e\u00B8\u00A4\u00C6\u00E2\u00EEl\u00F04nji\u00E8\x18\u00FD\u00C4\r\u009F\u008C?\u00F0\u00D8\u00FDr\u0091c5f\x1A\u00EC.\u0095\u00D1\u00CD\"&\b\"\u00F1\u0084\u008AE+\u008B\u00F9\x18;\x0F\u00FC\x14\u00C9\u00BB\u00C1\x1D\u00BA@I \u00E5YY\u00B4-s1}\u00CD\u00FD\u009E\x16O\u00CBZ\u0090)\u00FA\x1C\u00B5\u00C6U\u00B5K\u0085\x1F~\u00F8\u0081\u00E1\u00B1\u00C08\u00FA\u00E6\u00B3\u00DFFb\u00D9U?\x1F\u009Cf'\u008A\u00A4\"\u00AA\u0096\u00FA\u0096\x1E\u00A7\u00CE\u00B6\u00C1\u00804K\u00D5\u00B4\u00C6\x06:\u00A2\u00A1\bR\x05\u00AD\u00C1DTr\u00D1$\u00FCR\x03\u00E6;\x02\u008B+\u008F;\u00DC\u0091\u0092\u00B7\x06e@\x1F\u00B0\u00FBE\u00F0\u008B\\\u00B6\u00C5\u00C0\u00AE\u0099\u00E27\u0096\u00CFA\x0E\u0088V\u0084\x10 W$\u00C1\x15\x05\u009D\x01\t%\u00A1X\u00DF\u00E1\u0080\u00F5\x0F\u00EBp\u00B9\u00A8\x02E\x04\u00E4C\u0097\u00A0^)\x01\u008B\u00C7G,\u00EB,W\u00E0<\u0088+\u00FD\u0082(8\u0083Jr\u00F9\u00A4t$ASe\u00B9(p\u00C2\u00B4,\u00F1\x02Q\u00DE\u00A9\"\u00E3\u00A2Jq\u00F8S)_\u0081R\u00AF,\x0B\x03\u00BB\u00ED\u0095N\x01\u00E8\u00A5\x1B/\u00FC \u00DC\x0E\u00E5D\x01\u008EBX\u00BCvT\x01\u00BE\u00C9\u00B8\r\u00C5w\u00AD\u00E0l\x14\"\x04\u00A1\x02Y%\u00F3\n?\u00FB\u00D2\x1D/\u00CB,_)\u008E\u00E34\\O\u00C9/w\x0E\u00F2\t\x01Z\x00\u00E7\x17\u00DF\\\u00A5\u008DJ9%\u00BF\u00FCG9\x02\u0094\u00F4E\u00F9\u008B\u00A1\u00B4Q\u008A\u00FEQX$\x07\u00AFM\u00C1\u00CC(\u00F3</\x17\u00D2)6\x15\x0E\u00C72\u0089\u00B8\u00BB\u00A03\x12(\x16\u00C3\u008B\u00C0q\bx\b\u00E0\u00F0\u0096P\u00EB\u00F1\u00DA/B@\x1C\u008E\u00D6\u009Ee7z[\u00DA6\u0083R\x12R\u008E]\u00E8\u00E8_\u00D9\u00E4\u00A8k\u00E8[}\u00C55\u0081\u009Eu\u009Br\u00A3G\x0F\x05`F\x16\u00F0[C\u008E-\u009C\u00BDvB\u0080\u00C1\u008D\u00D7\n\u00E0\u00FEI\u0084,i,&\u0093\x135\u00F4Z\u00DC5\u00DD\x1A\u0097\u00CDN\u0088`u\u0098\u00EC\x1E\x1A\u00EE\u00E6\u00E0\u00C1=;'\u0086N\x1C9\u00F8\u00E2\u008EC\u00DD\u00FD\u00ABR\u0087_{\t\u00F4\u0094 \u00EF\u00FB\u00FE\u0093+i\u008D\u00A6sf~\u00F2\u0095\u00A1\x03{v\x1D}\u00F5\u00C5\u00DD\u00F1t|\u00F4?\x02\u0092\u00B4\u00C5C\u00BE\u00FA\u00F9o\u00FC\u00D0C\u00E9\u00D4m\x12I\x14eA\u0084y\u00A5<\u00D3\u00E49\u0089\u00CAq\"\u00ADV\u00A9S\u00E1\u00E8\u00C2\u0089\u00E7\u009E\x7F\u00E9\u00D9\u00BD\u00BF~\u00EE\u00EB?xb\u00FA\u009F>t=\u00F266\u00CF]u\u00C9{\u00F5\u0097m\u00BC\u00FA\u008E8c\u00C1.\u00A1\u00FE\u0091\u009F\u00FF\x07\u00EA^\u00FA:\n\u00F9\u00E7\u00D4}\u00FD\u00EB:\u00AC\u00AE\u009A\u008E4\u0098G\u00F9l:\u00A7\u00A3\u00D44&\u00D8\\&\u0095\u00C8dR!\u00BDF\u00DF\u00BC\u00BCwm\x0F\x10\u00D6N\u00E8\u00A7x\u00D1\u0086+\u00F0\u00CD\u0097\u00C9\u0082 \u0092\u00A9\"Xq\u00BC6\x17\f\u00EF\u00BF\u00EF\u00BB\u00FFr/\\\x7F\u00FE\u00A6+nC\u00DF\u00FB\u00F1\u00BD\x03\u00DB\u00AF\u00BFSk\u00EA\u00DB\u00E8rX\x1C\x1D\u009B\u00BA7\u00F6_\u00F3\u00D9\u00CB'\r:#\u00DF\u00E0i\u0092\u0088|\u0091#\u00E9<G\u00F2E\u00AC2\u0095\x11t\x16\u00E0\u008Ab\u00B2\u00A2\u00C0e\u00B4\u00D4\u00DA\u00BD5\u0097_\u00F7\x1Ety\u00D7\u00D6\u00EE\x06\u00A3\u00C7\u00E3\u00D1\u00D9=j\u00BB\u00D9\x01\u00CA\u00ADI\u00D4vN\x7F`\u00C3\u00AD\u00C3\u00CF\u009Ex\x11}\u008B\u00F8N\u00B9\u00F6\u00F9\u00A1f\x14k\u0098\u00A9\u00B7\u00D5/\u00B7\u00E9,7\u00AAIz\u0089Kc\u00D3Z\x18\x03\u00AD\"U\u00A0\u00CA@Tx\u008D\x17\u00C6\x17^\u00EF\u00C1\u00C3\f\u00BB\u00F8\u00CAZ\x13&%<!\u0081\x0EHPTb\u00A0\x1C<o\u008A\u0093\x10\u0089=\x7F|\x05\u008A\u00EE\u00E0J%2S\u00F4\x05\x02\u00C1\u0083\x1E\u00F1\u00A2\u00B2\u0096\u0084\u00CBay\u00A2\u0086F\u00A2\u009E\u0086\u00F6\b\u0090\x01\u00D4\u0082\u0097\x11@\x0E\t\u00FA\u0086\x0B\u009D\u00D55\u00DC6\u0096\u008B\u00FFA\u009B2\u008D\u0095\u00BD\u00D4\x1F\x02\x13\x07TS\u00D6\u00AF\x16s@\u00B9\u00CFJ\x1Fh\u00AC\u00FD\u0090\u008E\u00DB\u0085?\u00E5\x12\u0098\x108\u00DC&\t\u00FD\u00C7\u00D7Z\"`\x10\u0082\u00EB\u00E0B\u00B8<\u009E\u0094\u00B1\x1Ch\u00B3\u00B4\x1E\u0086\u00D3p^\u00B9O\u00B8]\u0090M\u00CF\u009C\x1E\u0099/\u00E5*\x7FK\u0080<\f\u00AC\x18\u00CA\u008D\u00C1\u00CD3\u00A5\x01K\u00E0Ee\\Y9\u00C1\r\u0096\u00D3I\u00E82\u0081\u00CC\x10\u00A5%\u0092\u00C4MA]\u00DC;(\u008B\x1B-%@X\u00DC\x10\u00C4\u00CF9]\f\u00A5\x15%\r\u00FE(\u00FD(\u00A3\u0092v\x16\u00A5<%\u00A5\\L\u00B9\x11\n\x16\u0097\u00FBC\x01B*\u00CD\u0095\u00ABc+\x07n\u00A7$\n\u00A2\u00C4\x15\u00F3\u0089\\<\x15\u00C8e\u00D2\u00D39\u00AE\u0080W\u00C7\u00B3\x10~\u00AFu\u00B5\x18$\f*\u00AA\u00C0#\u0089\u00E3x\u00AD\u00CBno\u00EEY\u00B6\u00AE\u00B6\u00A9\u00AD3+\u00B37\u00FB\u00E7\u00A6\u00E7\u00E6\u0086\u0086^\u00998y\u00FC\u00A7\u00A0\u00B4I\u00AB\u00CB]\"\u00AC2H\x0E\u00F4\x0E\u00DFS<\u00E8\u00E0\x1F_(\x14\u00E2\u00E1\u00E0l\"\x1A\u0089\x18Rv\u00E7R_\u00D7J\u0093\u00C40\x05J\u00E4\x1B\u00BA\u0096,\u009F\u009F\u009B8\u008A^D\u00BB\u00ED\u00AE\u009A\u0094F\u00ABW\u00B3\u00F9\u009C\u0095\u00D2k\u00DD\x14\u00A3\x12\x16\u00A6'F\u00C3\u00A1\u0085S@V\u00FE\u00AB\u00B7\u00DD)m\u00AEQ.X\u009C\u0098:5F\u00CB\u00C4\u0098Q\u00A5\u0097\u00F08P\u00BB\u00ACJ\x06(.A\x16\u00E1O\u00B2 q\u00B9\\t6\u00B1\u00E0\x07\u00AF\u00AC\u0080\u00C9\n\u00FAJ\u00E8\u00DC\u00CE|\u0081\u0085{R\x140\u00D1\u00E1\u00C1\u00A1\u00C2\x04\u00F9\u009EK\u00AE\u0097N\r\x1DS5\u00D7\u00B64\u00BB\u00EC5\r\u0081\u00C9\u00F1\u00A3\u00FEX\u00C0\u009F\x17\u008Bx\u00AC\u00E89\u0096E\u00A9t<\u00D9\u00EEiu\u00B8\u00D4\x16\u00BC\u00C8\u00845\u009E\u0087\u00D9V\u00D2\u0099\u00C0\u00AE\x12\x05\u0089\u00CD\u00A43\u00F3\u00D1\u00F9\u00B1\u00E1\u00F1\u0081\u00E3\u0090\u00C7\u00E2\u00F66\u00AD\u00DC\nzB\x12,W\u00CCd\u00F3\u0099\u0084\u0081\u00D0\u00D0\r\u00C6\u009A\u00AB\u00EF\u00B8p\u00BB\u00FA?w=\u00F8\u00EBl:%\u008A\x1AF\u0094\u00D4\u00E0\u008D\u00F2\u00D8S\x06`\u00A5Z\u0084:w\x03\u008A\u00A5\u00A3\u00EAVo\u00CB\u00F2\u00D5m\u00ABnkp\u00D4\u00B7\u00D8\u0091\u00CE\u00A9'\x19\x1B\u00AD\u00D6\x1B\u00B3\u00BC,\u00C0d%\u0080\x0EH\u00A4\x0E\x1C\x1B\x15\u00FE\u0095\u00CF\u00EFF\u0091S\u00DA\x12S\u00A9X\x10&\u00A3\t\u0086bL\x05}\u00D1\x12\u00D5h4\x14~\r\u0089\u0081\u00BB\x01\u00E3\u00AC4\u00C3C\x14\u00CE\x15k\x0B\u00C6\x1A\u0089G\u00D2\u00E27\u0091\u00E5\u00B2g\x01\u00FA^!\x0BL\x0E\u0098(p\u00C0\u00CA\u00AD(8\u00B6\u00C6\u00B0\u009E\u00E2\x7F\u00B8,\u0090c\u0085\bJ\u00F5\u00E0\x0F\u00AE\x0B\u00F9\u00F8v\x00]@F\u00E9\x1CC!\u0095\u00CA\u0082;&I\\\x07\u00A7\u00C3)\x16W\u00E9\x0F\u00B4\u008C\u00CFJ\u00E4\u0082\u00E5\u00E1~@]\t\u00C8\x0B\n\u0093@\u008A\x02\u00CC\u00F4)\u00DC\u009BJ\x1D\n\u00B7\u008D\u00C9\x12\u009FCY\u0098_\u00CF\x12\u009E\u0092\u00B6\u00F8\u00F9T\u00AE\x07\x1B3P\u008F\u009E<1\u00F0\u00EF\u00E5\u00AC\u00DF\u00C6b\u00F5+O\u00B0\n\u00CE\u0093\x0E\u00DD\u0081\t]\u00F2\"\u008AR\x01\u00A5J\u00F8\x02K\u00B4\x05Q\u0085M\u0095h\u00F9j\x01J\u00DE\"T\u00D2\x7F\x17*\u00F5+u\u00FF\u0090:\x18\u008B\u00EBTp\u00BE~,N;G6\\\x1F\u00B0\x15<>Y\u00C4K\u00D8Q>[\u0088$\u00B3\u00A93\u00D9Ph\x16\u00B2\u00F1\u0086#le\u00FD^\x14s\u00A5\u00FDU\u00E1\u0085\u00B9(\x10\u00D2\u00E3\u00B4VG\u00CA\u00BD\u00C4Ev\u00B7\u00C7\u00A5\u0095I\x13\x1BJ\u00EB\u008A\u00D1\u00F8\u00DE\u0093\u0087\u00F7\u00ED\x01\u00ABN\x19\u00F5X\u0099\x15T\u009E#\x1E|*J9\u00A5Y\u0081,\u00E4\u00B2\u00D9\u00F0\u00DC\u00EC\u00F0\u00D8\u00C9c'\u008DF\u008B\u00A3\u00FF\u00BA\u00B6\x1E\x15I#\u009E\"\x19\u0099\"\u00C9\u00DA\u00DA\u00A6eW^\u00F5\u00BE\u00CB_\u00D8\u00F1\u00D0K@ux\u008DK\x03\u00F5tj\x18Ur:'\u00A4\u00C3a\u00DC\u00FF\u00F4\u00E1\u0097\u009EU\x06\x1C@\u009A\x1B=\x15\u00F0\u00E9\u00DDA\u009D\u009D\u00B6\u0082\u00DB)Se\u00CB\u00B04\u008B\u00C2\bJ\x17$\u0094e\u00C3C\u00C3G\u00F0\u00AB\u009F\u00D4\x15\u00D7\u00BC\x1Fg\u0093@\u0086\u0082\u00C8\u0083\u00B6\u00E2W\u009B$a\u00B675\u00D8cS3\u00FE\u00E7_z\x12\u00DFU\u00AFER\u00D7{T\x16\x0FU\u00D3\u00D0n\\o\u00B8~\u00CD\u00F2Mk\t`%5\u00A9r\u0099\u00DC\u00CEF\u009B\u00C1\u00EA\u00CD\u00A6\u0092^\u0095\u00D9\u00D0\u00C6\u00A5\u00B3\u00930\u00A8\x12\u00C1\u0099\u00A9\x1C\u00DB\u009Aa\u00A5l\u0081\u00CB'\x12\x11\u00BF\x7F:\x06\u00D6\u0095\u0084\u00FB\u009A/\u00E4\x10\u0090\u0091\fm\u00F2b\u00B6P\u00A49\u00A4\x07\u00C2\x1C\r\x16\x13\u00B9\u00BF\u00B9\u00F1\u00A3\u00DB(Q\u00D6\u00EA\x04\u00D2,g\u00D9\x02&x\u00C0\"m(!\u0091V\u00DE\u00FC\u00F1\x0Bq\u00BF\x7F*<s\u00CC\u00AE1\u00B7;<\u00B6\x16Fg\u00A2\u00D8l6\u00BF\x10\nN\u00CC\x04\u00A7^\u009F\bM\u009E\u00BA\u00F5\u009B\u00B7\u00A1`*\u00A4\u00ECa\u00C3V\x14'\u009Cou\b\u00D8\u0094S&\x18>\x17H\u009D\u00CC\x18\u00922\u00AD\u00D2\u009EP\x15\x13&\x15A\u00EB\u00A0\u00E3@X\u00D0\rP\u00F0\u00F3\x0Ea\u00E8\u00E6\u00E2t\u00FC\u00D2D\u00F1Dp\"\u00BE\u0084\u00F2\u00B9R\x06t\u00B9\u0094\u008C3J\u00B50\u00E1)\u00A7\x10\u00B0\u00EA\x01\u00FD)'R)\u00FB,\u00B0\x04\u00B0\u00DF\u0094\u00A2J]\u00A5\x1E>\u00838>-\x1Dp\u00D5R\u00C0\u00C0T[\u0089+\u0099e@\u00BD\u00B2\u0099\x02\u00E9 \x15\x02!\u0089$\u008C\x14\x0E\x1E\u0095\x1FX\u00A7\u00EC\x10\x02\u00CE\u00D5\u0094s\u00F9\x7F\u00B1\\\u008C\u008A\\\x00=\x13\x0B>V\u008E\u00FF\x16J\u00DB\u00FE\u00DE\fc\u00F9\u0088\u00F1\u00A6|\t\u00865\u00C7\u00E1\u00D7(@\u00F3\u0084\\\x1A\u00DE%(+n\u00FF/an\x0E\u00DF\u00F2\u00CA\u009A\x15\x0E\u00A0?\u00BF{\u00D1\u00BD\x02P\u00C6J\u0099\u00F8\u00E8\u00C9c\u00CF%\u0083!\u0089\x15X\u0089\u00EFZ\u00B2\u00C2\u00C2\u00AB,\u00C5H<\u009A\u009B\u00F1GG\u00F7\u00EDM\u0082\u00CC\u00C2\u00E6\u00ADW\u00A1\u00DD\u00BBv\"\u008B\u00CD\u0081r\u00E5\u008D\u0098$\u0098\u00FD\u00F8!\u00E2\x01B\u00C2\u00C4\u00C3\u00E5\u00F2l2\x10X8\u00F0\u00C23\x03:Z\u00A3\u00DA\u00B8lsWN`7\u00CB:\u00B5\\\u0094yT\u00E3\u00A9[B\u00AC^\u00AF\u00A2\f:\u00ED\u00EC\u00C4\u00D8\u00AB\u00C7\x0F\u00EF)2\x12Q\u00A0\x04\u00996h\u008Dfo]S}\x16\u00A8 \x14\x0F-\u00DC\u00FE\u0091\u00CF\u00F1?\u00FA\u00EE=\u00B2\u00D7\u00DBh\u00D5\u00E9\u008DV\u008A\u00A4)\x12\x14K\u00ACXx\u00A5\u00BE\u00CB2/`\u00F7\x03w(\u00FA\u00D9\u008F\u00DF\u00C3\u00FE\u00E2\u0089\x1F(\u00B9R./IE\x1ELGI\x02\u00B2\u00D0\u00D7h\u00ED\u00A6\x18\u009A\u00D1\x19\u00F5&\u00ED\u0092\u00BEU]jDy\u00A9\u0082 \u00F0\u00E9\\Fd\u008B\u00B4\u00C0\u00F3N\u00B8\f\u00B0\u0091d\u00AA\u0090L%\bY\u0093 sE\u00E7\u00A5\u00CB/[wl\u00F8\u00F5\u00C4\x0B{\u009E)^\u00BF\u00E9\u0086\u00A5\u00CD\u00B6\u00BA\x16\u00A2(\u0092\x12/\u0082_\u00B7x\u00F1\b\u00E6x\u0098\u00A5\u00C1E\x06\u00B7\u0091\u0097x\u00B0\u00E6\n\u0088\x1Fx\u00E1\u00D4\u00AB'\u00FF\u00CA~\u00CB\u00DF\u00D8\u00F56\u00AF\u00934\u00BA\t^\u00D6\u00C4\u00E0>\u00E3\n\u0095\u00B5\u00AB\nfB3\u00F8\u00C0\x0FN\u009C8\x03!\u00AD\u00DF\u00BC\u009D\"\u00F5\x1A\u00D1\u0084\u00D8\u009Ad(09\x1A\x18?x`\u00EC\u00F5\u00BDS\x0B\x13)\u009DJW\u00B7\u00E7\u00F4\u00FE\u00B9k\u00FB\u00DE\u00A3\u0090\u0095CWz\u00A3\x1B\u00CD'\u0094c\x05\x196\u008B,\u0088\x16F\u00D9\u0099y\u00C4\"\u00BC\u00BD\u00E3u\bt\x1D\u00B2C\u00E3X;\u00CE\u00A7\x15oX\u00D1o@[>.\u00C6\u00F9\u00CA-FE\u00F6b-\u00AC`\u00B1\u00BC\u00DF'\u00E7w\u00A1\"g\u00B1\u008C7_\x13\u00B6\u00A1\u00E0be\x15\u00DC[\u00E0 8\u00FD\u00E3Ag\u00C6\u00C7#\u00E5\u00F8\x1F\u0084\u00F3\u0091\u0098\u00DD\u00E1.\u00C7\x00\u00B8\u008B\u00B8\u00978\u008A\u0087\x07\u00C4\u00B4x|\u009C3H0\x14\x7F\u00F7\x1C(~l9]1\x05\x17\x15yS:`q\u00FD7\u00A5\u00E1\u00E4\u00CA\u00EDYT\u00FF,\u0094\u00CE\u0095\u00A2o\u008AWPI{+\x195\x1E\u00C5E\u00E4\u008BE\u0085\u00800*\u00FB\u00B0\u00DE\n@>\u00CA\x11{\x03\u00F8wr.\u008FO2Z\u00AC\u00EC\u00BE\u00DD\u00CF\u00ED/\u0088\u00AC\u0094\u009C\u009A\u0099\u00F7:}\r$\u00C3\u00A8\u00CD6G\u00EF\u00ED\u009F\u00F8\u00C2\u00FB\x1A\u00DA:\x7F<{f4|\u00EB\u0087?%>\u00FC\u0083\u00FB\u0095\u00FA\u008C\nT\u00BE\u0080\u00D7\x03@g\u00F1\u00BD\u00C2\u00B3\x19\u00F4\u00A6L\u0098\u00B9\u00BC\u00C0.<\u00F0\u00A3\u00AF\u00FD\u00B0\u00C9\u00DDx\u00ACw\u00F9\u00FA\u0095m+W\u00AF\u00B1\u009Al^\u00A6\u0081\u00A2Y\x0E\u009C\u00AAX\x14\u0097{\x1D\u00FA\u00CF\u00E2N\u0099\u00C0\"\u00AB\u00AFkY\t\u00E7:\x06Q\x07MZ\u00E3\x14\u00E4\u00AB:\u009B{\u0096\u00B8\u00ED\u009E%\u00F0<fiA&\u00B9XR\u00B9\x00\u00C5\u0085\x10d\x02\u00DA'Hll\u0082\u00B1\u00FE\u00C8\u00CE\u009F*\x16\x07\u00CEv\u0098\\j\x1D\u00A35\u00C0,KR\u00E0\x04\u00A8Y\u00C59g\x1CV\u0097\u00AB\u00B7\u00B1\u00B7\x1Bn\u0092%\u0092\b\u008F\u00BC\u00BE\u00FB\u0085\u00C7\u00E7#s\u0081\x1C!da\x1Ef\x19\u00E8\u0095\u009AE\u00F6\x1B/\u00B8\u00F1F\u0093\u00D9\u00B6teC\u00DFz6\u0093\x19\u00CCp\u00B9\x1A\u00A8{\x11\u00DC\u009Be0\u00E8i0\u00DC\x04\u00B1r3\x01\u00CA\u00BA'\u00DC\x0B|\u00C4\x0F\f\u00BF\u00C41\u00DA\u00ECb1\u0091\x1A?5xd\u00A7\u00BEk\u00CD\u00E5&\u008F\u00B7\u008B\u00A2)c\u00A2\u0090V\x1E)M\u0096\u00DC\x02\u00B8i\u00CAqE\u00D3Rtt\u00EA$\u00DA\u00BE\u00FA\u0096\u00E2\u0083\u0087\x1E\u00F1\x7F\u00EF\u00B5\x07\u009F\u00BAE,\x14\u00CDfk\u00CB|hf\u00E4\u00F4\u00CC\u00A9\u00C1\u00D9\u00C8ltYS\x7F\x1D<c\u00DF\u00AA\u00C6e{\u009F\x1E|\u00C1?\u00F8\u00D9]\u00FC\u009A\u00FB\u00AE\x00C\u0092@\x0E\u00BD\rEsx\x19\u00B3\x04\u0086\u00A2QR\x14\u0090\u0086Q\u00F3*Z\u00C5\u00ABiu\x1A\u008F\u008F\u00A2\u00D2f\u00A1\u00AC\x1B%T\u00C6,!/\"\u0093\u00B2\u00EE(7\x1Cg\u00C2Aq\u00E9\u0094$(\u0087\u0093\u00CF\u0085\u00C2\n\u00F8v\u00EB\u00E0/\u00C4\u00F0ZX\u00A5\\\u00A9\u00AA\u00A2'J\x12n\x0F\u00BF\u00B7[\u0094\x7F\x16\u00E54\u00FC\u00E4*.\u00A2R\u00BF\u00BC\u00D6\u00A5$\u00C1\x1FE\u00E7\u00C8r_`,\"\x02\u00E4\u00C1xT\u00F21\u00CAe*6h(\u008Fy\u00FB\u008F\u00C3\u00B9\u00C6W\x15\x7F&\u00E0\u00AF\x16\u00E0\u00BDF\u009F\u00F9\u00F2\u00FF\u0089D\u00E6f\x0E\x0F\x1E\u00DE\u00F7\u00C2\u00A1\u00A3\u00BBw\x0E\x1D\u00DEw\u00C0\u00E9\u00F5\u00D9{\u00D6]pSKG\u00CF\x156\u00A7\u00BB\t\u00C8\u008A\u00D4\u00EA\u00F4\u00A8\u00D6\u00D7P\u00AA\x0B\u00EE\u00A0\x04\x01\u0083\x02{\x03,-\x02\u00DCDe\x19Tg0e\u008F\x1C;sT\u00A5\u00D6\u009C\u0082\x01N\"Q\u0092\x19N\"5\x1C\u00A2\u00B4\"E\x1At\x06\u00ED\u00925\x1B:3\u00C1\u0090FN\u00E7\u00F3\u00E0\u0082\u00B9\x1B\u009C\r\u009Du\u00AE\u00FAV\u00AB\u00D9n\u00BE\u00FF\u009B\u00FF\x0B\u008B\u00B5\u00D4\u00D1\u0096F\u00B7\u00D6\u00EA\u00D0i\u00F5\x06\u00F0,i\u009E\x17\u0094!]\x1A\u00C42\u00D2\u00C4\nH\u009DT\\UB\u00AD\u00D6\"\u0086V^l\u00D3K[\u0096\u00D6\u00D78<}\u0084Q\u00AB\u0093\u00B5*\u0089\x178\u00E8.C[\u00CD6g\u00A3\u00B6\u00A6E*\x14\u00A9\u0099\u00E4\u00C2\u00C0\u0089\u00E9\u00C1\u0097\u00A6#\u00B3\u00A7\u00A2\u0089\u00F0\u00D8\u00D8\u00D4\u00E9}\x16\u0083\u00F5\u00F9W\u00C7\u00F6\u00BD2\u0099\x0B\x1D\u00CD\u008B\\\u00B1\u00C5V\u00BF\u00C4\u00E7\u00AC[\u00D5\u00DE\u00D8\u00D9H\u00EB\u00B4\u008C\u00C4\u0090\x02\\\x0EE\u0081\x1E\u00CA@Y\u00B81\flm\u00D2\u00D8\u00DA\u00C3\u008A\u0088\x17\u00B1\x010\u0091h\u00E4Wd\u00A9\u00C6\u00EC>\u00E4\x0F\u00CE\u008E\n\u00C5bN%\u0093j\u00AD@\u00AAu\x02Ah\u00847\x0F{LV\x18g\u00C2\u0093\u00F8 \u00EE\u00BA\u00F7\u00D5\u00C9)\u00FF\u00C4\u00AEc#\u0087\u009E=={zO\"\u009F\u00F4w\u00B8Z-ZZmgT\f\r\u00E4\u00B4eE]\u00EF\u0092\u00DE\u00AF]\u00C80@~\x15\x02\u00AC\u00E2\x7F\x1E\x7F\x12\u00C2\u008AECo\u0084H\x10\u00C5\u00C2A\x14\u0087\x10\u008B\u00E2\u0080\u00D3 \u00E0\u00F3sB<\x14\u00F8\u00AD\u0080\u00EB\u00C7\u00C3\x10\u0087P\u0091un\u00F9\u00F3\u00D5\x7FSZ\u00F0\u008Dt%~nX\u009C~\u00BE2\x7F\u0080\u008CD8t\u00D6\u00BAR\u0080\x15F\u00F1\u00FF\x7F7\u00B0u\u0085\u00AD\u00B1\u008F\u00FF\u00AF\u00AF\u00A1\u00F9\u00D9)\u00F4\u00E8\x7F}\x07\u00CD\u00CDN\u0086\u0087\u008E\x1D<4|\u00EA\u00D8\u00CE\u0097\u009E\u00FB\u00D5\u008E\u00E8\u00DC\u00EC\u00A0\u009C\u00CE\u00D5\u00DEp\u00FD\u00ED\x7F\u00B7\u00E5\u00C2\u00AB\u00B7B5W>\u0097E\x0B\u00F33\b/\x0F\u00A9\x19\x06\u0089\f\x01D%\x13\u00AA\u00BC@\u00D2\u009C\x04\u00F3\u009E2\u00F3\u00C9\u00F9l\u009A\u00AC3\x13j\u00AD\u00DD\u00D6\f\x04\u00D4B\u00A4\u00F2\x02\x13g%!\u0095+\u00C42\u00F1\u0085p80\u00DB\u00E9\u00ED\u00E8Lr9}F%%\u00CDu\u00BEZ\u00BB\u00BB\u00A6\u00CEb\u00B5{\u00D2\u00C5\u00B4\x07\u00AC\u0080f\u00A7\u00C3\u00DDW(\x16L\u00B4L\"\x15p\x1D8\u0085\u008CJ\u00ABV\b\u00AB\u00E2\u0086\n\x065!\u00EAT8\r\u00BF\u009D?\u00FBV\u00AC\u00BD\u00B6\u00A3\u00B9\u00D9V\u00BFF\u00CB\x13Z(+\x17iD\u0098\r\x16\u00AD\u00CD\u00E2p;t\u0096:\u00EC+\u009D\x1E\x198tb\u00E2\u00C4\u0084\u00C3\u00E62\u00BB\u00AD\u00EE\x0E\u00A7\u00C9\u00EE}n\u00FF\x0E\u00BC:\u0092\x1A<s|8_\u00CC\u00F9mvWS\u00B7\u00B7\u00FD\u00C2z\u00A3\u00D7>294\x1E\f\u00CE\u008F2\x04E\u00A9\x19\u008DY\u00AF\u00D3\u00BFa\u008A@\x0F$\u0092F`\u00ED!\u009A\x15\t\n[~\u00BCH$\x03a\u00D4\u00DF\u00D1\u00CF\u00CE\u00A6\u00FD\u00F3\u0089Lb6\u00CF\u00E6\n\x1A\u0095Z\u00ABQi\bp\u00C1\u0091\u009E)\u0089\u00C0V\x0F\x05\u0084\u00E3\u00B4:\u00D1\u00DE\u00E9\u00C3@\u00BC\f\u00BA\u00EB\u00FE\u008F\u00A1\u00D7'\u008F\u009C9<ul\u00FFDxj\x1A\u00C8NSo\u00F1\u00B6\u0093\"RO\u00C7\u00E6\x16z\x1B\u0097n\u00ED\u00F1um\u0081\u00EA\u00B5\u00E9b\u0096^\u00EF\u00E9U\u00AC+ 4E&\x06\x0F\u00D6\x15\x06\u00CB\u00E3=]\x19\x14\u00C9DQ8\x1DAa|\u0084\x10\u00CA\u00C5\u00CE\u0086p\u00B6\u009C\u0096\u0085\u00F3J\x00k$\u0094\u008FC>\x0E\u00A5s\u00A5.\u0094\u00AD\u009C\u00FFV\u0080z\u008A,\\\x06\u00E2\u00C1B\x1C\x05\u00D9r\u0080x\u00A8|\x1E\u00C2\x01\u00C7\u00CF\u00C9?\x1B\u00CAi\u0095\u00F2\u0095|\u00A5\u00DD\u00B2\u00FCp\x0E\u00DA(\u00B7\u00A9\u00A4\u00E3|\u00DC\u00DFJ\u00FE\u00E22\u00E5\u00F0\u00A7@\u00D5\u00C2z\x07\u0080\u0089\u00ED\u00EE\u00BB\u00FEFq\x1B\u00BCu\u008D\u00C8\u00E9\u00A8\u0091Z\u00BBzsM\u00F5\u00ED\tN\u00E0N\r\u00EC~\u00E5G\u0099H\u00F4a\u0095F\u00D3\u00BE\u00EA\u0082Kn\u00BF\u00F5\u00F6O\u00DE\x00\u008A\u00E5\u00F9\u00F2'\u00EFG\x17o\u00BC\x12A\x1E\x129^\u0096\u008A<\u0092\u00F2EJf9\u008A\x10\x15\u00B6\u00C4\x04R\u00F3\x0Fw~\u00E9\u00A3\u009D5m\u00F5\u0091h\u00F0\u0089l,\u009E\u0094(\u00822X\u00ACN\u009F\u00AB\u00AE\u00C9g\u00AD\u00AD)f\u00B2G\u00E3\u00E9\u00D8\u00F1L.\u00CDk5:\u00AB\u00D5\u00EE\u00F2\u00F5\u00F6\u00ACZ\u00F7\u00E9\u00ED_\u00B8\u00F3\u00DF\u00BF\u00F8\u00E3/}\u00E1\u00CE{\u00FE\x1E+Z(\u00E2\x1F+$\u0093Y\u00B1\u00C8IeBB2XZ@\u00BA$G\u008A\x14G\u0096\u0096qe a\u00B1\u00A4\u00A0B\"\x15\u009BK\u00A7\x12'\u00F9\\^B,G\u00D22\u00A1\u00F18j\x1D.\u00A3\u00CB\x0B\x17l\x04\u008Bk\u00FA\u00B5\u00DD\u00CF\x1D\u0081\u00B2Y\u00B8\u00BEQ\u00A7\u00C1\u00AE]\u00D6\u00DCw\u00CD\u00F5\x17\u00DFr%\u00A4\u00D1\u00AF\x1C~a\u00A0P\u00CC\u008F\x03\u00D7\u00E9D^\u0090\u00EC*\u0093w\u00BD\u00A3gY\u0087\u00B6\u00B6U\u00AD\u00D5\u00E9\u009C6\u00F7\u00D2UM\u00CB\u00CFnU\u00C7?\u00AF\x01\u00B7\u0085\u0080#)\b\x02%\u00F0<)\u00F2<a18\u00D0\u00B3\x03/Q\u0099b\u008E\u008D\x15R\u00A9$\u00F8\u0097\x05\u009E\u00C5\u009D\u0094W\u00D6\u00F4\u00A0\u00EC\u0097\u00C7\u0094\u00FA\u00F5\u00CEzty\u00F7V\x14ID\u00C0\u00B5\x03\u0083\x14,\u00DF:w=\u00EA\u00F7\u00F5p=\u009E\u00CE\u00BC\u00CB\u00E4,\u0082\u0085\x18\x0F\u00A5#\x0B\u00CD\u00EEF\u00CFm+o\u00BA\u008CC\u00E2>\u009B\u00CAd\u00BFc\u00C5\u00AD\u00EF]\u00EA\u00EA\u00E8zvr/\u00FA\u00D4\u009A\u00ED\u00E8\u00E4\x1DO+2\u00AB\u00F8\u009FC\u0095\u00B0\u00DE!\u00E0\u0097h8\u00EC\u00DF\u00F3\"\x02bQ\u00B6-\u0084\u00E7\u00A6\u0095\x19\u00FF\u00E3\u00FF\u00F2\u00AD\x13\u00BB\x0F\u00BC\u00F8-\x7Fp\u00EEW&\u0087\u00B3\u00BE\u00BBw\u00E5\u00FB\u00AF\u00BF\u00FE\u0083W<\u00FD\u00FCC\u00DE\u00D3{_#G\u00F6\u00EFE\x12[d\u008B\u00B9\u00DC|2\x11=\u0091N\u00C4N\x17\u00D2\u00E9lKs\u0097g\u00F3\u00A6\u00CB\u00D7\u00B7\u00B7,\u00F9H\x7FS_oxt\u00FC\u0084?\u00B20\u0098\x10\u00B2\u00932M\u008Af\u008D\u00A1\u00D6h0\u00FB2\u0089\u00D8Bhj\u00EA@\u00C6\x1F<\u009E\x0FG\u00E79\u0096\u008D\u00E8U:s\u0093\u00BB\u00E9\u00AA\u00EE\u00C6\u009E\u00DB\u00BA\u00EB\u00BA/7S:\u00DB\u00FC\u00CC\u0099\u00A1\u00E9\u00B93\x073\u0099\u00D4\u009C\u00C0\u00F1\u00CA\"\x15Xx\u00E9l>3\u0099\u0088\u0086\x0F\u00A5\u00E3Q\u00ECCq\u00E0r\u00A1TJY\u00BFa\x1F}\u00ED\u0091\x03\u00BF\u00DE\u00FB\u00C4\u00F7\u00FD\u00D1\u0085\u00DF$!_#S4\u00B8\u009BM\u00B5fwC\u0091\x10\u00A9<!\u00CC\x053a\u00BC\u0095Ftjm3N\u00AD\u00E5\u0084Am\u00D0[t\u00E65\u00DB\u00AE\u00B8}\r\u00A4g\u00D2\u00F9\u00F4\u00AE`\u00D4\u00BFol\u00F6\u00D4>h/\u00E95\u00BB\u00BDf\u00AD\u00D1\u00C7K\u0082\b\u00C4\u0099\u00B0j\u00CD\u00CA\u00AB\u00D6\x0Flz?\u0082$\u00B0\u00F8\u0084b\u009E+\x04\x13\\f$Y\u00C8\f\u00A6\u00D8l$\x10\u00F3cwQ\u00A6\x049\u0093\u00E6s\x13\u0091|\u00E2p \x11<\tn\u00A7\u00F8\u00C4\u00D1g\x1A\u00B7=\u00FC\u0089n\x10\u00A1\u0089\u00A6c\u00C4\u00F1\u00F9a,Ny\x1B\u0087\u00C3\u0093'\u009EE\u00C7\u00E7\u0087\u0090\u00C8s\u00C8\u00AA\u00D2#\u00B5J\x13?\x1A\x1C~\u00DDj\u00B4\u00C5]z[\x07\x15\u00CFM\x1AeU\u00CA\u00AA5\u00B5vX\u00EA\u00D7]\u00DDva\u00F7\u00FD\u0087\x1E\u00A4\u00EE\u00DB\u00F3\x03\u00F4\u0089\u009E\u00F7\u00A2zC\r\u0092\u00FFMFzz\u00D1\u009AT\x15\x7F\x12T\u009D\u00EF\u00BF\x10T\u00BE\x01\u0095\x0673\t\u00B3\u00FD\u00CB;\x1FK\u008F\r\x0F\u00EC\u00F5\u00B5w8-&\u00DB\u008AZw]S\u00D2\u00EF\u00E7MV\u00C788\u009F\u00EC\u00E8\u00D4\b\u0097\u00CD\u00A4\u00A2\u00B33\x13\u0093g\u00A6N\x0Fg\u00B2\u00C9BkSW\u00D7\u00D2\u00F6e\x17\u00BA\u00BDu\rZ\u00BDaEmM]\u00D3\x0B\u00BB\u009E\u00FCy6\x18\u008A\u00E6S\u00A9B,\x16\u009E\u0098\u00F2O\u008C,i\u00E9\u00BD\u0081\"\u00C8\u00F1\x03\x07_~^\u00CE\u00B1\u00FA\u00D9\u00C9\u00B1\x11\u00FF\u00CC\u00E4\u0094\u009E\u00D4 \u0093\u00DA\u00E8\x11R\u0099\u00AC\u0096`\u00EC\u00F9Bn\u00EE\u00C9\u0083O\u00FDjf\u00F6\u00CC1\x7F\u00CC\x1F\x7F\u00FD\u00C5c\u00F2\u00E0\u00F816\x1C\t,LL\u008F\x0E\r\u008F\x1E?\x1E\x05\u00DF\u009F\x17x0\u00C2\u008AH\x10\u0095\u0095o\u00CC+\u00C9\u00E9\u00A9\u00B1\u00C9\u00E1\u00D1\u0081a\u0095V\u0087\u009A\u00BC\u00CDK\u009A\\\u008DK\x18\u0095\u00CA\u009C\u00CA\u00A5\u0086v\x1F\u00DFu\x18\u00CA\x15\u00C0\u0085\u0092\u00FE\u00F7\u00ED\u00F7\u0085\x1Ex\u00E6\u0081i5A;\u00EBk\x1A\u00AF\u00DB\u00B2\u00E2\u00A2\u00F0\u00D7\x7F\u00F1\u00D5\u0097\u00A3\u00B1\u00D0|\x18\u00FC\u00F1\u0093\u00D3\u0083\u0087\u00C72s\x03`\u00E6\x15t\x12m\x1E\u009F=\u00FD\u00C0W\u009F\u00B8\u00F7a\u00F2$'\x06\u0092!4\u00EC?\u0085\u0092lN\u00CC\u00E4\u00D3\u0089\u00E9\u00E0\u00D4\u0099\u00D1\u00F9\u00D3\x03\u00E3\u00FE3c\x07F\u00F6\u00E5\u008E\u00CD\f\u00A2x!\u0095\x0F$\x03s\u00E3\u00A1\u0089\u00E1S\u0081\u00F1S\x07\u00A7\u008F\u00C5n\u00EA\u00B9\u00FCcjZ\u00B5r\u00EF\u00CC\u0091!\u00ADJ\u009B5k\u008Cr<\u00BF\u00C8\u00BD/\u00C3\u00A9\u00B3\u00A2\u00E9\u00E4\x02\x02\u00B7\x0F\u00F1EA\u00BCl\u00FB\u0095\u00A7\u0088\x027\u00B6\u00B5a\u00CD\u0097A\u00EE\u00E4\u00EE\u00F1\u00FD\u00FBZ\u00CD\u00BE\x1E\u00B5Z\u00D3\u00DE\u00EB\u00EE\u009C\x05\x0B-\u00C1\u00C8\x04:\u009D\u009CA\u009F\u00DAr\x17\u00BA\u00E7\u0095\u00AF\u00E2\u009BQ\u0096V\u00C5\u009F\x02U\u00C2\u00FA\x0BA*\x19W\u00C2{\u00B6^\u0083\u009E\x7F\u00FEqD\u0098\u009A\u00D03\u008F=\u0098\u00FF\u00C2\x17>\x1F\u00B2\u00A8\u008CZ.\u0097\u00B3\x16\u008Bl\u0084\u00B6\u0099\u00F7P2!xk\u00EA\u00E4\u00A1\u00D3\u00C7\u00F0\u00E7\x122\u0091\u0088?\u00A8\u00D5\x19\u0090\u00D9`\u00A95\u00AA\r\u00F6P,\u00F8\u00EC\u00EC\u00C2\u00E4\u00A3ss\x13\u00BBv\u00BE\u00F8\u00E8\u009EZ_\u00B3\u00B7\u00B6\u00B6a\u00B9\u00CB\u00EAn0RZ\u00ADD!SA,\u00EE;\u00F0\u00EAs\u00F3^oC\x07\x03L\u0092+dS\u00C1\u0088\u00FFX(\u00BC\u00F0\u00DC\u00A9\u0089\u0093\u00AF\x1Ak\u00BD^\u0095\u00D9\u00D4a\u00D3Y\x04\u00B0\x00\u00E7\u00C0b\u009A3ht\u00F2Bd^\x02\u00D2\u00C9C\u00BB\x01 \u00AB\u00C8\u00B2\u00BE\u008D\u00FC\u00CC\u00FC8&\u00AB\u00F2\u0095 \t,$n.:\u0097\n\u00A5\u00C2s^G\u00AD\u00A1\u00D1V\u00B7\u00B6\u00CD\u00DA\u00B0\u009C\u00C8\u00B1Z6\u0099\u00DA\u00B1\u00EB\u00F4\u009E\u00E3\u00EF]w\u00C3u\u0091t\u00A4\u00D0W\u00BB$\u00FE\u00AD\u009D\u00DFN\x00yq\u00A2 r&\u0081Z\u00B9\u00A9q\u00A5\u00F3\u0091#\u00BF~)\u0091MF\u00A3\u0085$XK\u0081\x18\u00F8k\t\u00B0\x04\u00D3&F\u00D7\u00B7\u00A5u\x1D\u00FF\u00E5\x1D\u00DF\u009Cn\u00F7\u00B4^\u00AB\u00A6\u00D55\u00D0fv>\x11\u0088D\u00B3\u00F1l,\x1B\u008F'\u00F3\u00C9,\x10\u0094X\x14\u008A\u00F8g=B\u00AA\u0090.\u00C4\u00F2\tp\x0B\u00D3\u00F8C\u00F1E\u0087\u00D1\u008E\x02\u00D9\u00C8\u00D4hdr\x02\x7F6\x07[\u00B5\u00D9\u00E2o\x7F\x7F\foU\u00F8\u0097\u00CB>\u008D.hY\u008B6o\u00BB\x14\u00C9\u00DFN\u0089\x1F\u00FC\u00F9\u009DY\u0087\u00D6\u0096\x10d\u00D1m\u00D7Z\u00DC\u0089\\2\u0094\u0093\u00B8\\\u008B\u00B6f\u00B5\u0099\u00D2n\u0089ri\u00EB\u00AB\x0BG\u00C7s\u00A1q\u00F9\u00B5\u00C0\x00rk\u00AC('\u00FC1\u00BF\u009E\u00ABb1\u00AA\u0084\u00F5\x17\u0086\u0089\u00E9q\u00F4\u00CBG\u009E@\u008F\u00FF\u00E2\u00FB\u00E8\u00FE\x7F\u00FF6\u009A<=\x14\u00F8\u00CAg\u00FF9\u008D?6\x07\u008A%\u00D3EA\r\u00C4b\u009A\fM\x11\x7F}\u00FD\u0087S\u00F7~\u00E1\x07\x05\u009D\u00D5\u00C6\x1E<\u00F0\u00B2\u00A0S\u00EB\x19D 24;\u0095\x06w._\u00C8\u00E7\u00E9\r\u00DD\u00EB=2IzH\n\x7F\u00DE\\\u0088\u00E7\x0B\u00D9<\u00C3\u00CBz\u0092\x13\x0E\u0092\u00A2\u009Cn\u00F44]\f\u00D6\u009D+[\u00CCGv\u00EC}\u00EA\u00B5\u00D7\u008E\u00BE\u00F2\u00E2\u00E1\u00B1##\u00F5\u00AD\u009Dj \b1\u009FNE\u00F2\u00C5\u009Ch\u00D4\x19\u00D1Tp2\u00BE\u00B4\u00A9\u008F_\u0088.\x10\x1B\u00FB\u00B7\u00B4\u00D8,\x0E\u00F5\u00F1\u00E1\u0083)\u008B\u00DE\u008C(\u008A\u00AElm\u00C0\u00C0['\n\u00F7\u00FC\u00F5\u0097\u00D9#S\x03$\u00B8F\x165\u00C9\u00F0\u00E0\u00BE\x06\u0092\u00C9X\u00CC\u00EB\u00F4\u00E9r\\\u00C1\u00AC\"h\u00DB\u00D3\u00AF?C\u0085s\u00B1t0\x19\u00F2\u008F\u00CD\u009F\u008E6\u00DB\x1B\x1Ad\u008Ah\u00F4Y\u00BD\u00D9\u00C9\u00F4|\u0090\u00BB\u00C7\u009F:\u0091:]\u00DCu\u00F2\u00D5\u00F8h`<\u00DA\u00EEnm\u00E6d\u00D1a1\u00DBTHF\u00F5\u00A9|*\x13MF\u00FDKk;\u00B3\x0B\u00C9 ~\u0083\u008E7\u00DB\n\u00FFx\u00C9\u00C7\u00D1\u00EA\u00FA\u00E5\u00E8\u00E0\u00F4\x11l\u00F5a6\u00C5y|\u00FC}\u00CFK\u00DB^\u00FEb\b\u00C8j\u00CE\u0084\u00E8BV\u00E4\u00E4\u00F3\u0091U\x05{&_G\u00AFM\x1CP\u00B6@|\u00E9\u00B9\u00AF#A\u0096\u008BW}\u00E4\u00BD\u00A7\u00EBL56Z\"\u00DD`Z\x16\x04R\u00E6\b5\u00E3v\u0092\u0086U\u00B5\u0084\u00B9\u0095bT\u00B1\u00A7\u00E7\u00F6fY\u00A1\u00C8\u0082\u00E5(\x17\u00A4\u00CA\u008B\u00FD*\u00FEXT\t\u00EB/\x0E\u00B2\u00F2f\u00B5\u00D1\u00D7\u00A2|S\u00E9+\u00FF\u00FAe4:s*\u009CM&\u0092z\u009DQoP\u00EBW9\u00AD\u00CE\u00F556\u008F\u00E6\u00C7\u008F>0\u00F5\u0093G\x1F\x10\u00C7O\u009D\u0090\u00C0%*f\u00B2\u00A9</\u008BBW]\u00D7\u00CAzo\u00D3j\u00B3\u00C9\u00DAD\"\u00A2\u0093-\u00E4\u00E2\x03\u0083\x07\x0E\x1C\x1D<p\x12,\x15\u00B1\u00CE\u00E2m\u0096Dq6\x1E\r\u00F3^\u009Bg\u009DJ\u00AB\u00D5\u0083\u00D5\x14\u008C\u00A6\"\u0083-\u00DE\u0096\u00F0e\u00AB.g\x1F\u00DE\u00F1\u00A3\u00C0\u00A9\u00A1\u00A3c\u00A9d,j\u00B5:\x1C\x14\"\x1D\x1AR]<2v$\u00F4\u00CDo|S\r.\u00DE\x16B\u0094\u00EC\u00B9T2\u0091\x15\u00D9\"\u00CB\u00B1\u0092YgBE\u00BE\u00A8\u00BCi\u00D31Zy\u00CF\u00E8~\x14\u00CD\u00C4\u008A\u00B3\u00B1\u00D9\u00F0\t\u00FF\u00F0\u00F0\\|a\u00D4\u00AC57\u0099T\u00FA\u00CEq\u00FF\u00F8\u0089\u00FE\u00B6\u00E5\u00EB\\\u008E\u009A\x0ER\u00A5\u00CA\x06b\u00FE\x100K2#\u00B3a\u009DJg\u00B4j\u00CD\u00CB\u00B5H\u0095\u00FE\u00E8cw\u00A5[L^V\u00A3\u00D6\t\x0B\u00A9`&\u0096O\u0086j\u00F5\u00CE\u00A6:\u00BD{=\u00B8q\u00B3\x0Bq\u00E0\u00B9T \u0090\u00CBgE\u00BC\u009F\t\u00BF\u00F1\u00C3\u008B\u00E7c\u00F1I\u00F4\u009B\u00D3\u00BB\u0081\u00BF\t\u00C4P\u00CC\u00D9/\u0087~m\u00F0\u00A7\u00A8\u00D5\u00DD,\u0098\u00B4&!\u0094O\u00C84A!p\x0F\u0091 \u0089\u00C8\u00AA2\"\u00BB\u00CA\u00844\u0094\n\u00AD\u00B5w\u00A2\u0099|\x18\u00E1\u00ADf\u0098\u00AC\u00F0\u00D6\u0085\u008F-\u00B9\x19\u00DD\u00F1\u0099\u008F\"\u009F\u00DE%\x1F\b\x0E\u0086M\u0092\u008A\x00\u008B\u00CF\u00C5\u00D0*\u00D5\x02\u009F\bxI3\u00B2\u0093\u00FA&\u0086\u00A0\\`\u00B9E'\u00B2~\u00BF]c\x16i\x12\x7F\x10\u0090F\x06Z\u008B\u00C0\u00B2-?\u00E7*\u00DE\x0E\u00AA\u0084\u00F5\x17\u008Ad:\u0081<\x0E\u00AF\u00F2\u00A9^\u00B3\u00C5.N/L$5\x1A-\u00E5s\u00F9<\u008D\u009E\u00E6\u00A5f\u0083\u00D9\u0091\u00E5r\x19$\u00CB\u00B9X*\u009A\u00B7[\x1CR*\u0093,$\u0092Q\u00AE\u00AF\u00A9\u00D7G#\u00CA \x0BRZ\u0092\u00A5\u008C?\u00EA\x1F8|\u00EA\u00F5\u00D3\u00CD\u00EEf\u00A6\u00DE^\u00D7\u00E9jhl\u00CD\u00F2\x05i~\u00FA\f\u00AF\u00A2T2\u00B87\u00C5\x140\"\u00CB\u00B2\x0Bv\u008B3<:3\u0082j]\u00BE$\u00C9\u00D0E\u009D\u00CEP\u00A7Uit\x1AR\u00A5\x06\u00F2\u00D3\u00DD\u00F3\u0095{P2\u009F\u008A7\u009A\u00BC. ,\x0B\x10\t\u009D\u00E3\u00F2,\u00A8uA\u00AF\u00D6\u00C9\x15+\x0B\x7F\u00C9\u00C0\u00E7\u00F4\u00E1\u00FD\u00A3\u0082]oK8u\u00D6\u00C0\u00C0\u00F4`\u00B0\u00CB\u00D9b\u00D1\x10\u00B4KE\u00D2\u00F2\u00F2%\u00AB7\u00D9,\u00F6VPn)\u0093M\u00A6r\u00B9t\u00EC\u0083\x1B\u00DE\x1F\t\u00A7\u00A3\x05 \u009E:Z&\u00CC:\u0095\u0096\u00DC3}$\u00A3\u00A1\u00D5\x05N\u00E4\u00C5\u00F0\u00BD\u00D1\u00C8\u00C9\u00D1=\rfZ\u00B7\x11,\u00A30\x0E\u00FEL8Zg\u00AC\u00E12\\^\u00D9\u00C4\u0089\x7Fp\u0092\u00CC\u00BD\u00F1\u00BF\t\u00C3\x0B\u00E9\u00B8?\u00F8\u0088\x11\u00CF%\u00F05(q\u00FC\x0BQ<I`R\u0082\u00EB\u00C3o\x1D\tN\u00C2\x1B\u00F5E\x14\u00E33\u008A<Lt\u0098\u00B8^\x0F\x0F\u00A3\x1E{+\u0082\u00BE \x1Fc/d\u00F8|\u009A\u0097\x05\u0083\u008EPk\u00C9l\u0091\u00F3\x17\u00E3\x11\u0089!\u00B96\u0095\u00BB\x03\u0088i\u00E2hr|\u00B2\u00D1\\\u00CB\x05\n1\u0082\u0093\x05\u00B0\u00CEDDC+\u00A5\u00FD\u00B6U\u00BC\x1DT\t\u00EB/\x18\u00F8\u00DB\u00E2\x18\x02\u0090\u00C0\u00B6K\u00FEZ89u2\x11\b\u00CF\x07\u00DD\x16\u00B7C\u00A5\u00D6t\u00D5\u00D5\u00B7\u00983\u0099\u00D4\u00F4Bp6d\u00D2\u009B\u00A5e\u00ED+\u00E4\u0099\u00C0T\u00A1\u00BF\u00A5\u00FF\f\u00CC\u00FA\x07A\x07\x0F\x02\u0091\x1C\n'B#\u00E1H\u00C0\u00B8u\u00EDe\x17/\u00EBY}9\u0090\u0085\u0096\u00CF\u00E6\x18\u009E/\u00A6\u00CE\x04&\x06\nB1\u00C5qE\u00BE\u00C0\u00E6\u00D9\u0083C\u00FBR\u00D1d\u0084[\u00D1\u00DC\u008F\x1Am\u00B5\u009D`\u00D1mfE.\u009Ec\u00F3\x05\u00B7\u00C9\u00D9\u00DC\u00E5\u00EB\u00B4]\u00D1w\u00D9\u00A1\x1F\u00BF\u00FA\u0093\u00C9\u00E6\u009Af\x0BA\u0092\u00F5@RY \u00968\u0090\u009F\u0088\x7F\u0092R\u0081\u00C5hQ~\u00BE\x02D\u0086\u00CCZ\x13\u009A\u00B9g\u0084\u00BF\u00F9\x07\u00DB\u00A7\u00D67\u00AC\u0090V\u00D4\u00F7m\u00B3\u00EA,M@<\x16\x03(|Q\x16\u00B3u\u00EE\u00FA1 \u00A0\"\u008A$\u00A2\x1A\u00B3e\x16H\u00ABOM\u00A9\\zR\u0095\x1B\u008E\u008C\u00C7{<\x1DB\u00ADL\u00A1\x17\u00A7\u00F7\u009B\u008B\x02\u00E71S:\x17MQD^\u00E6\u0092\x13\u0089\u00B9\x04P\u008F\u00C4\u0089\x1Cb\u00C0\u00A2\x11\u00FE\x1B\u008B\u00DD\u0098\u00AC4&=Q`\x0B\x1AV\u00E2M@.B\u009C\u00CF*\u00AC\u0082\u00C9\n\x03\u00D3\x1AF\u009D\u00A1\u00F4\u00AB\x0EL:-\u00B5-\u00B9P:\x12\u00CB\u0088\x05u\u0083\u00DA\u00D1)\nBbL\b\r\x1A\u00D5z\u00EF|>27\u0092\u009EI\u0084\u00F2q\u00E0u\x11\x7F\x03K\u00C0\u00A4\u0089-\u00BA*a\u00BD}T\t\u00EB/\x18@\x1CJp:j\u00D0\u009E\u00C1\u00DD\u00A8\u00CE\u00DB\u00C4\x0F\u008D\rD\u00EF\u00BB\u00F7\u00BEY\u009B\u00D1\u00A6\u00A1D\u00D4:\u00EB\u009F:\u00BA\x10\u0099\u009F\u00FD\u00D4\u00CD\u009F\u0096\u00F5\u008C\x0E\u008D\x07\u00CF\u00C8\u009Du\u009D\x05\x15\u00AD\u00CE\u00CAH\u00CE\u0082U\u0091Kd\x12R$\x1B\u00B3u\u00FB:7\u00F9\u008C5k\n\u00D9\u008C\\(\u00E4^\u00F6G\x16\u0086\u00D4\x04]\x0B\x16Z\x14\b\u0080m\u00B0\u00F9\u00DA\u00D6\u00B5\u00AEZ\u00D2\u00DF\u00D0{J\u00CBh\x04\u00BDV_\x04\u00C2\u0081\x7F\u00BC\u00A7\u00DF\u00DC\u00B2\u00DA\u00AA3\u00B7\u00E5\b\u00CE\u00FF\u00A1U\u00B7\x1EL\x143H@r\x06\b\"\u0095cs\u00E1\u00E9\u00E8l\u00F6\u00C6\u00DE\u00CB\u00D1\u00B6\u00957\u00A0\x0B\u00DB\u00D6\u00A3\u008B\u00DB7\u00A2\u0087\x0F?\u0085\u00C0UCj\u00B0+\u00A0\x0F\u00E8\x1F\x1E\u00FB<z\u00E1\u00A3\x0F\t\u00AF\u00CE\x1CbLz\u00D3f=\u00A16\u00EB9\u00D2(\u0082\u0081\u00E6O\u0085\u00A6\u009E\x1C\u00D8y\u00E4\x1BW}\u008E[\u00D5\u00B8\fuY\u009A2\u00A7RS\x11Q\x14\u009D@\u0086\u00AD\u00AD\u00B6\x06\u00D5\u009E\u00A9C3]\u00F6f\u00B4\u00C7?\u0090eHj\u00A2Fc\x1B\x07w\u00D4je\f\u008D\r\x1A'z\u00EC\u00DA\u00FB\u00FC\x1E\u00AD\r\u00FD\u00F2\u00EA\u00AF\u00A3\x7F;\u00FC\u0093\u00F2]\u00FC\u00FD\x009`\u0091\u00A5Uk\\K\u00DA\u00D6\u00D7\u00F4m\u00D4ju\u00E1o.\u00BD3\u00F3\u00F8\u00DCn\u00D4mnDN\u00B5\x05E\u008A\u00A5\u00B7\u0088s\u00D9\u0090\x12\u009A\u00B55\x04X\u0082\u00A8[S\u009B\x1F\u00C8M%\u00B5\u0088a}j{s3\u00E3t\x1D\u00E2fvj\x10m\u00BF\u00CC\u00DA\u00BFa\u00BD\u00B9\u00B3\r\x7F\u00AA\x05\b,\u00B4\u00DDw\u00B1\u00F8/\u00F57\u00A3\u0087\u00C2{\x15YU\u00FC\u00F7Q%\u00ACw\x01\u00E2\u0089\br\u0099\u009Dhf~\x02\u00FD\u00F3\x17\u00FF\x19}\u00EC\u00BA\u008F'\u008E\x1D\u00D9;G\x13$\u0093\u0095\u008BBgc\u00B73\x10Y\u00D0\u00BFr\u00ECe\u00B9\u00B7\u00A9\u00AF0>7\u0086\u0082\u00F1\x00\u00DAq\u00E0i40v\x14\u00B9\u00ADn\u00B4\u0090\rS\u00ED\u0096\x06\u00D9F\u00EA\"\u00E0n\u009E\t'\u0082O<\u00F1\u00FA\u00D3\u00A7\u00FA\u00EBz\u00EA\u008B\"\x07\u0093\u00BE\u00C8\u00D8\u00F5V\u00A3\u00C3`\u00E3\u0081\u00AC\u0086R\u0099\u0084\u0090\u00C8\u00A5\n\u008F\u00FD\u00E2\u00C9\u00C9\u0087\x1E\u00FE\u0099\u00AD\u00DDTo\u00E4%!2\u0093\r\u00FA\u008F\u008C\x1F1\x04\x13\u00C1\u00AC\u00C7\u00E4J\x04\u0093\u00A1\x18XEy-\u00AD6e\u00B8\\\u00EDhdR=\x1C\x1C\u00CB\u008E\u0084\u00C6\u00D1|\u00B2\u00F4\u00BD\u00FBL1\u00AB\x04-\u00ADA\u00B7]s;\u00FA\u00E5\u00C1\u00C7)\x0E\u0089Y\u009D@i\u00F8\x1C\u00F8\u0097\u00A9\u00D80\u00F4onm\u00E7Z\u00E3db\u00B6\u00E6\u00E4\u00DCp\u00FD\u00A0\x7F\u00C4\u00F1\u008BcO\u009DvY\\\x05\u00A8\u00E7f\x10\u00E9Zbib\u00D2\u0089xT\u00A3Rg\u00B5\u008C6\u00AC\u00A6\u0098\u00D9\u00F9\\\u00D8j\u00A3\u008D\u00CB\u009DZ\u00AB\u00F7\u00F9\u00D9\x03\u0099\x1D\u0091\u00A3\u0091\u0081\u00F9\u0093\u00F2\u00A9\u00F8\x14\u00EA\u00B7\u00B5!\r\u00A5F\u00F8[^6\u00B5\t\u0081\x0B\u00A7\u00F4\u00E7\\\u0098\x19=\u00CA\by\u00AA\u00D1\u00E8\u00B59t\u0096Z5O\u00A8w\u00CE\u00ECeC|2\x07\u00EE*J\x0BydS\x19q\u0099r\r\u0084f\naT\u00ABw\u00A2\u00F1B\x00\x19hMa\x7F|dv\u0095\u00B9\u00DDi\u00A3\r\rb6?-\u00D1\u0084\u00C6J\x1B\u00EA\u0081\u00C8\x1A\u00F52c\u00ACU\u00DB\u00D8GC{#\u00E1bR\u009A*\u0086\u0091|\u00B5\u0084\u00BE6\u00FEU\x04\u008EjYb\x15\x7F\bJ\u00F6n\x15\u00EF:<\u00FB\u009D\u00DD\u00E8\u008A\x7F\u00D8j\u00BAr\u00C3\u00B5\u00D7\u00DA4\u00A6\x1E\u00AEPHM,L\x1C\x00\u00AB\u00EA\u00A0\u00D5`-D\u00D2\x11t\u00E2\f\u00FEl\x14\u00CCJ\u00A0t\u00E0\u0092Q\u00F1|\x12oW\u00C7?\u0081)\u00CA\u00B2\\\u00FC\u00C4%w\u00A2G\u008F=mnv5\u00AEf$\u00C2\u00C1\u00B2\u00F93\u0087fO\x1C\u0085|is\u00DB:\u008A\x13yt`\u00F2\b\u00D6\u00A8\u00CAGE\f\u0097v_\u00B8\u00AE\u00A3\u00A6\u00F5\u0092`:\u00FC\u00A3G\x0F?5|G\u00DF\r\u00E4\u00CE\u00D9\x03\x14\u008D\u00C8z\u00AF\u00B9f\u0089N\u00A5\u0089\x02\u00FB\u00ED\u0087\u00B2\u00E8\u00B53\x07\u00F1\u00E1\u00B7\u00E0\u00BF{\x00y\u00BF\u00B8\u008C\u00BA\u00AE\u00E3\u00A2k\x12\\\u0086\x1A\u008DO\u00CF.q\u00B5\u00F96\u00B4\u00AF\u00BD\u0086\u0091I+X\u0080i\u00B6\u00C8\u0086^_8\u00F1\u00C8\u00BE\u00F9\u0081#\x1E\u00B3\u00DB\u00D6ai\u00D8T\u00A7qv\x01I\u00EF\u00D4\u0092\u00EA\u00C1\x18\u009FF\u00D3)?J\x16\u00D3KV\u00D7,\u00BD\u00C0\u00A657\u00C5\u00B9LX\u0094\u00C5G\u008D\u008Cn\u00F6\u00FB\u0083\u00BF\"\u0080\u00B0\u00E8$\u0097\u0095\u00B2|^\x02\u00D7R^\u00C8\u00FF\u00DE\u00DF\u00F9c}\u00D0\u00DF\\\u00B3\u00F1*\u00B0\u00DC\u00D2\u00CFE\u008E\x1CpklI\rA\u00CB\u009C\u00F2\u00DBr\x19\x05\u00D87~\u00E0|.\u00F0o\u00B2/\u00B5\u00F7\u00F7\u00AC6\u00B7o?\u009D\u009D{y\u0080\u009DKn4\u00B4/o@\u0096\u00C6Y)\x11\u008DH\u0099\u00E7<Z\u00C7\u00C9\x1F\u00AE\u00FA\x1E\u00BA\u00F4\u0095k\u00D1K\u00C9Ad\u00A4\u00B4\b\\\u00CA\u00B2\u0084*~\x1F\u00AA;\u00DD\u00DFE\u00E8\u00A9\u00EFQ\x02\u00C6\u00B7~z\x0F\u00D0\u008E\u0090;9:\u00B0;\x1A\r\x1D'\x10\u00A1j\u00F5\u00B5\u00F5#\u0082X=2w\u00CAXYs\u00C1\u00E8iZ\u008AL&\u00ABsS\u00CF\u00A6\u008Bo\u00DAx\u00D3-\u00D7\u00AE\u00BD\u00C6p\u00CD\u009A\u00AB\u00D1\u00E9\u00C0\u0098\u00AD\u00DB\u00D3~\u00A1(\u00CB\fX\x1F\u00C1<!h:[z\u0096B\x152\u0099O\u00B5\u00A4\x0B\x19\u00FC\x13\x18\u00ADIm0kh\u00B5\x03\u00CB\u009A\u0089\u00CE\u009E82=\u00F0\u00D8\u00D1\u00F9\u0093\u00D3\x1B\u00EB\u0096\u00B5\r\u00C6&6\x15E\u00DE\x13c\u00D3Q\x7F*xt&6?1\x17[@8\u009C\u008B--\u00EB\u0094\u00E3\u00F6_|\x12+\u00B7x:2yd(rf\x1F[\u00C8\x05\u0098\u00A2HZ\n\u0094\u00D6,0\x06\x03R\u00EB\u00B4\x12M\u00E3\u00FF\u00B1\x06\u0094\u0093\x03\u00A9Pl>\x15<>\u0091\u0098=\u0094\x12\u00F2k\"Bz\u00C3\u0095-\x17`\u00AB\x11E\u00D9\u00D4\u00FC\u00F1\u00E8\u00E8+\u0087C\u00C3ON'\u00E7O\u00B2\x02wQ\u00B4\u0098\u00EE\u0084f09\u00F7Ah\x02\x1ER>\x18\u00F2V\u00C0D\u0083\u00F1\u00AB\u008Dw\u00E3H\u00E1dvf_\u0094K%W\u009AZA\u008E\\3\u00C3\u00C7\u00DEROp\u00DDJ\u00FD\u009D}_D\u00A7s\x0B3\u00FB\x12\u00A7\x1EA\u00BCd\u00E9\u00A2\u00DC\r\u00B3ldv\u0098\u00F3\u009F\u00D0\u00A9u*\x1BeX?\x14\x1A[\u0082\u0080\u00A8\u0084\u00EA:\u00D6\u00DBB\u00D5\u00C2z\x17\u00A1\u00B2\x00l3\u00D8P,\x13CW]p=\u00DA\u00B1\u00FBI\u00D4V\u00DB\u00D1\u00DEh\u00F7\u00AD0\u00A8t\u00EEt6\x15G\u0092\u00FCl\u009A\u00CFE\u00E7\x13\x0B(\u0091K\"\u009F\u00C3\u0087\u00F2\u00C5\u00BC\u00DBmq/\u00B3\x1Bm\u008EL>\u00B3Ck5k(V\\\u00C6e\u00F3\u00EAh15\x16\u00CAE\u008B\u00ED\u00E6\u00FA&\u008B\u00DA\u00E8\u0098I\u00FB\u008F\u00B1|\u0091&\b\u0092\x00\u00EB$-\u00F1\u0082\u00C4\u008B|\u0091\u0093x\u00FC{<\u00BC\u00A9H\u00F5\u00A9\u008B\u00FF\u00B68\x16:\u00B3Z\x14\u00C4\x15|\u0091\u009D[H\x04N\u009FNL\u00CF\u00DDu\u00C1\u0087\u008A\u00F7\u00ED\u00FE\u00A1\u00D2\u00CFs\u0081\u00B7\x18\u00D8\u00F5f\x14\u0085>\u00E1\u0085qp1\u00A9#\u00EF\u00FF\u00A5\u00B8\u00F5\u00A1\u00BF1\u00F5:\u00DA\u00D6m\u00AC\u00E9\u00BF\x04\x7FjF\u0094\u00C4\u00A2\u008EP9G\x133\x07F\x12\u0093G\u008733SP]0P\x1A\u00C7\u00EA\u009A\u009Eu\x14Ii\u0081\u00B8N\x1E\x0B\u009D\u009A\u0086~)~\x1A\u00DC\x1B}\u0083\u00DE\u00ED\u00DB\u00E0\u00EA\u00BDB\x14\u0085\u00F0hbz\u0084'e\x06,\u00ACp\u0082\u00CF\x04\u00B4\u0094\u00FAM\u00FB\tb\u00C5t9V\u00B2@+\x0B\u00E1]\u00A6F4\u00F2\u008D)\u00D4\u00FAIO\u009D\u0096Ry\u008AH\u00CC\u00E7\u00A5b4!d\":R\x03\fZ*\x07\u00D6\u009Cr\u00C4u1*\u00F5\u00E5\u009Bg\x10\u00F1X\x03\u00B3E\u00DF\u00B5V $zV\u008C\u00CF\u0083EH-U\u00FB\u00BA\r\u00A4\u00BA\u0099\u0095\u00F9\u00F0!~f/\x10m8\u00CDe\u00F1'\u00A2\u00E5|u\u00AB\u00C3\x1F\u008C\u00EA\x1A\u00D6\u00BB\x10\x05\u00AE\u0080\u009C\x16\x17\u009A\u0098\x1D\u00C3\u00BFsC\u0081\u00B8?%\u00E6\u00D9\x1C\u00FE\x014M3LN`\u0093\u0087\u00A6\u008Ef\u00B3l\u008E\x11$Q\u00A2\tJ.\u00B0y\u0091\u00E3\u008B\u00E9L!\u00EB\x1F\u009A\x1B\u0089\u00B58\x1BW\u0082\u0096u\u00E4\u00D2\u00E9\u00B9\u00B9\u0084?\"\u00D3$\u00D3d\u00F3\u00D5Y\u00B5\u00A6Z\u00D0~M\u008E\u00CB'\u0092\u0085TN\u00AF\u00D2\u00EAT\u0088\u00A2\u0080\\\u0084\f\u0097+X\u00B4&\u00D1mt\u0088$A!-\u00A3\u00A9\x07\u00E2i\u0087\u00C0\u00B0<[\u00E4\u00B9b\u00E6\u00A5\u00CF\u00EE\u00CF\u00FF\u00EF\u0097\u00EF\u00C7_\u00BBA\x06\u008DQy\x03\u0087\u00F7F\u0081+\u00A7\u00A4q\x02\u008Fl\x1A\u00B3\u00B25\u00C0\u00C0\u00E8\u00E4\u00C7G_\u0082QH\x12\u00B2,i\x04\u008E\u00E3\x0E\u00CF\x0F\x0E2\u0088L\u00DB5\u0096\u0096\u0082\u00C0\u00A2\u00ACPH\u00CF\x17\"\u00F8\u00EBx,\u00DE\x1A\u00C0\x16\x0Bq\u00BDZ\u00A7cH\u00A6\u009E\x11Q\u00E1\u00F3\u009F\u00FF\x1C\u00FB\u00E0\u00FD?\u00E0\u00B7\u00B7\u00BC\u0087?\x10\x1E\"\u00BDj\u009B\x01x\u00B6F\u00CDh\f\u00A9\"\u0090\x15\u0097\u0089\u00A6\u0085B\u00A1 s\x04\u0090\x0B\u0093\u00E2Y\u00FC\u00FFGA@\u00CC\u00A8 \x14\x15\x12\u00C5[\x1B\u00F0\u0096\u0086\u00E5\u0096vt25\u0081\x1Ex\u00E1~4\u00CF\u00C5\u00F2\fA\u0089\fEk\u00C1\u0084\u00D2P\u0088\u0092\u00C2\u00C5d\x01o\u009A\u00E0$A\u00D9\u00B3\u0085\u00F7T\u00E1\u00BA\u00F8?\n\u00D2\u00B7\u0098\u0096\u00A0\u00CF\x0E\u00FD\x1Br2&)($s\x01>\x11\x0Eq\u00A9\x18\u00B8\u00AF,_(\u0088\x16J\u00AFQ\u00D1\u008CYM2:^\u00E4\u0092q!\u009B\u00D1\u0093j\u00E5\x13V\u00F8\u00ED!C\u00D0\u00CA\u00D6\u0087*\u00DE\n\b\u00FD_\u00FB\u00B1\u00B0!\u00EB\u00F6\u00EA>\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var imageLogo = contentLogo.add("image",undefined,ScriptUI.newImage (createResourceFile ("RanAni2Banner.png", imageLogoImage, getResourceFolder())) );
			
		var contentDropdown = mainPalette.add('group');
        contentDropdown.alignChildren = ['fill','50'];
        contentDropdown.margins = 0;
        contentDropdown.spacing = 2;
        contentDropdown.orientation = "row";
		var dropDownText = contentDropdown.add("statictext",undefined,"Controller Link: ");
		var dropDownMenu = contentDropdown.add("dropdownlist",undefined,["Layer","-","1","2","3","4","5"]);
			
		var contentButton = mainPalette.add('group');
        contentButton.alignChildren = ['fill','fill'];
        contentButton.orientation = 'column';
        contentButton.margins = 0;
        contentButton.spacing = 2;
        contentButton.orientation = "row";
		var btnApply = contentButton.add('button',undefined,'Apply');
		var btnBake = contentButton.add('button',undefined,'Bake');
		var btnUnBake = contentButton.add('button',undefined,'UnBake');
		btnDelImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x15\x00\x00\x00\x1B\b\x06\x00\x00\x00\u0093\x1D\u00C4\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x02\nIDATHKcd\u00C0\x01\u00C4\u00C5\u00C5eTUUu\x19\x19\x19\u0099\u00A0Bp\u00F0\x1F\b\u00EE\u00DD\u00BBw\u00ED\u00D9\u00B3g\x0F\u00A0B(\x00\u00AB\u00A1\u00B6\u00B6\u00B6\u00DE}}}\u00EBXYY\u00D9\u00A0B\x18\u00E0\u00EF\u00DF\u00BF\x7F\u00AA\u00AA\u00AAbv\u00EE\u00DC\u00B9\x12*\x04\x07X\r\u009D;w\u00EEAyyy\u00B5\u00F6\u00F6\u00F6l\u0090f\u00A80\x1C\u0080\\_ZZ\u00DA\u00FF\u00E5\u00CB\u0097\u008Faaa\x06Pa8`\x01\x11\x06\x06\x06\u00D6\u0096\u0096\u0096n,,,\u00AC \u00BE\u00A2\u00A2\u00A2\u00C6\u009F?\x7F~kii\u0099\u0080\u00F8\u00D8\u00C0? \u0090\u0092\u0092R\u00C8\u00CD\u00CDm\u0083\u00F2\u00FF\u009E:uj\u00DF\u00E9\u00D3\u00A7\u00F73*((\u00A8\u00AF]\u00BB\u00F6\n333\u00D8\x02J\x00\u00C8\u00A2\u0098\u0098\x18s&mmmSj\x18\b\x02L@\u00A0\u00AC\u00AC\u00AC\u00C5(!!!\x17\x1C\x1C\u009C\n\x045\u0097.]:\u00B1p\u00E1\u00C2n\u00A8\x1A\u00A2Addd\u00AE\u0089\u0089\u0089\u00C3\u00E2\u00C5\u008B\u00FB\u0096.]:\x11,hmm\u00EDq\u00E1\u00C2\u0085\u00FF\u00BD\u00BD\u00BDkA\u00FC\u00993g\u00EE\x01\u0082g\u00B2\u00B2\u00B2\u00CA >022A\u00FC\u00C4\u00C4\u00C4r\x10_HHH\f\u00C4_\u00B2d\u00C9I\x10\u00BF\u00B9\u00B9y!H\u00BF\u00BB\u00BB{8\u0088\u008F\u0091\x06A@PPPTDDD\x12\x16,\u009C\u009C\u009C< >777/\u0088\x0F\u00F4%3\u0088/,,,\x0E\u00E2\u00A3\x03\u00AC\u0086R\nF\r\u00A5>\x185\u0094\u00FA`\u00D4P\u00EA\x03\u009A\x18\n.\u00DA@U.\u0098\x03\u00AD\u00A3\x0E\x1D:\u00B4\u00E5\u00D6\u00AD[\x17\u0081\x15\u00DB'\x10\u00FF\u00EE\u00DD\u00BBW\u00B7l\u00D9\u00B2\u00F8\u00E6\u00CD\u009B\x17@\u00FC\u009F?\x7F~\x07\u00F1?|\u00F8\u00F0\x06\u00C4\x07\x16\u0091\u00CC \x1Af\x0E\u00B86\x05U`@EwA\u0095\u00DD\u0081\x03\x076\u0082h\u009081\x00T\u00B6:88\u00F8qppp\u0085\u0086\u0086\u00EA\u00DD\u00BE}\u00FB2\u00BC\u008ANKK\u00AB\u00CD\u00CC\u00CCl\x04V\u00BF8\x1B\x18\u00F8\x00\u00B0\x1A\u00EA\u00E9\u00EF\u00EF/\x05\u00B1Q\f\x00\u00D5\u00AC\u00C0*D\x05\u00CA%\x1A<\x7F\u00FE\u00FC\u00E1\u009D;w\u00AE@x\f\f\x00\u00CEs\u00C5\u00FDs\tc\x1F\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnDel = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("RanAni2DeleteButton.png", btnDelImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
        
		//刪除按鈕，按著Shift會有Credit
		btnDel.onClick = function (key){  
			var keyState = ScriptUI.environment.keyboardState;  
			if (keyState.shiftKey){  
				alert("Yan-K RanAni 2 \rVersion: 1.0 \r\rSpecial Thanks: \r- OlaOla Yuan \r- Xquid \r for Scripting Help.");  
			}else{  
				app.beginUndoGroup("Remove RanAni");
				
				var expClean = '';
				
				var selectComp = app.project.activeItem;
				var selectLayer = selectComp.selectedLayers;
				
					for(i=0 ; i<selectLayer.length ; i++){
						if (selectLayer[i].threeDLayer) {
							try{
								selectLayer[i].position.expression = expClean;
							}
							catch(err){
								selectLayer[i].transform.xPosition.expression = expClean;
								selectLayer[i].transform.yPosition.expression = expClean;
								selectLayer[i].transform.zPosition.expression = expClean;
							}
								selectLayer[i].orientation.expression = expClean;
								selectLayer[i].scale.expression = expClean;
								selectLayer[i].opacity.expression = expClean;
								selectLayer[i].property("Layer Styles").property("Color Overlay")("Color").expression = expClean;
								selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode").expression = expClean;
								selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity").expression = expClean;
							try{
								selectLayer[i].effect("Pseudo/YanKRA2").remove();
							} catch(err) {
							}
						} else {
					};		
				};
			app.executeCommand(3744);
			app.endUndoGroup();
			}  
		};
		
		//Bake按鈕，按著Shift會做關鍵影格優化
		//btnBake.onClick = bakeRA;
		btnBake.onClick = function (key){  
			var keyState = ScriptUI.environment.keyboardState;  
			if (keyState.shiftKey){
			var selectComp = app.project.activeItem;
			var selectLayer = selectComp.selectedLayers;
		
			app.beginUndoGroup("Bake RanAni");
			
			for (i=0 ; i<selectLayer.length ; i++){
				try{
				myProperty = selectLayer[i].position;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].transform.xPosition;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].transform.yPosition;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].transform.zPosition;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].scale;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].orientation;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].opacity;
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Color");
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode");
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
				try{
				myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity");
				convertToKeyframes(myProperty);
				optimizeKeyframes(myProperty);
				}catch(err){
				}
			}
			app.endUndoGroup();
				}else{
					var selectComp = app.project.activeItem;
					var selectLayer = selectComp.selectedLayers;
					
					app.beginUndoGroup("Bake RanAni");
					
					for (i=0 ; i<selectLayer.length ; i++){
						try{
						myProperty = selectLayer[i].position;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].transform.xPosition;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].transform.yPosition;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].transform.zPosition;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].scale;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].orientation;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].opacity;
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Color");
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Blend Mode");
						convertToKeyframes(myProperty);
						}catch(err){
						}
						try{
						myProperty = selectLayer[i].property("Layer Styles").property("Color Overlay")("Opacity");
						convertToKeyframes(myProperty);
						}catch(err){
						}
					}
					app.endUndoGroup();
				}
		}
		
		
		btnApply.onClick = applyRA;
		btnUnBake.onClick = unBakeRA;
		
		
    }
    // ==================================================
     
    //__________ SHOW UI ___________
    {
        mainPalette.layout.layout(true);
        mainPalette.layout.resize();
        mainPalette.onResizing = mainPalette.onResize = function () {mainPalette.layout.resize();}
        if (!(mainPalette instanceof Panel)) mainPalette.show();
    }
    // ==================================================
     
})(this);