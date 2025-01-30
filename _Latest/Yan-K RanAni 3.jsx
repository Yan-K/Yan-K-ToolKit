/*
 Yan-K RanAni 3 (Random Animation for After Effects)
 Version: 1.3
 Author: Yan-K @ Yan-K.tv
 Date: 2021/03/12
*/
  
(function (thisObj) {
       
    //================
    var version = '1.3';
    //================
     
    // _______ MAIN _______
    {
		/* Helper Functions */
		
		function getResourceFolder () {
			var userFolder = Folder.userData;
			var resourceFolderPath = userFolder.toString() + "/Yan-K_Resource/RA3";
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
			
			/* RanAni Expressions */
			
			var expSepXPos = '/* Position X Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Position");raX = raMain("Position X");raXDir = raMain(19);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);        value + raXRandom * raValue;} else {    value;}';
			var expSepYPos = '/* Position Y Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Position");raY = raMain("Position Y");raYDir = raMain(20);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);        value + raYRandom * raValue;} else {    value;}';
			var expSepZPos = '/* Position Z Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Position");raZ = raMain("Position Z");raZDir = raMain(21);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        value + raZRandom * raValue;} else {  value;}';
			var expPosition = '/* Position Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Position");raX = raMain("Position X");raY = raMain("Position Y");raZ = raMain("Position Z");raXDir = raMain(19);raYDir = raMain(20);raZDir = raMain(21);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        value + [raXRandom,raYRandom,raZRandom] * raValue;} else {    value;}';
			var expRotation = '/* Rotation Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Rotation");raX = raMain("Rotation X");raY = raMain("Rotation Y");raZ = raMain("Rotation Z");raXDir = raMain(28);raYDir = raMain(29);raZDir = raMain(30);raCrazy = raMain(31);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;        value + [raXRandom,raYRandom,raZRandom] * raValue;} else {    value;}';
			var expScale = '/* Scale Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Scale");raUniform = raMain("Uniform Scale");raX = raMain("Scale X");raY = raMain("Scale Y");raZ = raMain("Scale Z");raXDir = raMain(38);raYDir = raMain(39);raZDir = raMain(40);raCrazy = raMain(41);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raControl;        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;        raOut = raUniform == 1 ? raXXX : raXYZ;    raOut;} else {    value;}';
			var expOpacity = '/* Opacity Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control"); raSwitch = raMain("Opacity");raRate = raMain(44);raStay = raMain(45);if (raSwitch == 1) {    raValue = raControl;        raFade = wiggle(raRate/4*raValue,raRate*raValue) + linear(raValue,0,1,0,-value);    raBlink = raRate == 0 ? linear(raValue,0,1,value,0) : wiggle(raRate/8,raRate) + linear(raValue,0,1,0,-value);   raOpacity = raStay == 1 ? raBlink : raFade;      raValue == 1? 0 : raOpacity;} else {   value;}';
			var expColor = '/* Color Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed"); raSwitch = raMain("Color");raRate = raMain(48);raColor = raMain("Base Color");raSeedFix = raMain("Same Color");raCrazy = raMain(52);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedFix = raSeedFix == 0 ? seedRandom(raSeed+index,raCrazySwitch) : seedRandom(raSeed,raCrazySwitch);    seedFix;        Control = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));    Wiggle = wiggle(raRate/10,raRate/30);    Color = raSeedFix == 1 ? (raColor + Wiggle)*Control : (hslToRgb([random(0,1),0.7,0.7,1]) + Wiggle)*Control;        raCrazy == 1 ? wiggle(raRate/10,raRate) : Color;} else {    [0,0,0,0];}';
			var expColorOpacity = '/* Color Opacity Expression By Yan-K RanAni 3*/raMain = effect("Pseudo/YanKRA3");raControl = raMain("Animation Control"); raSwitch = raMain("Color");raOpacity = raMain("Color Opacity");raCrazy = raMain(52);if (raSwitch == 1) {    raValue = raControl;        raCrazy == 1 ? raOpacity : raOpacity*1.5*raValue;} else {    0;}';
			
			var expSepXPosM = '/* Position X Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Position");raX = raMain("Position X");raXDir = raMain(19);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);        value + raXRandom * raValue;} else {    value;}';
			var expSepYPosM = '/* Position Y Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Position");raY = raMain("Position Y");raYDir = raMain(20);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);        value + raYRandom * raValue;} else {    value;}';
			var expSepZPosM = '/* Position Z Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Position");raZ = raMain("Position Z");raZDir = raMain(21);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        value + raZRandom * raValue;} else {    value;}';
			var expPositionM = '/* Position Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Position");raX = raMain("Position X");raY = raMain("Position Y");raZ = raMain("Position Z");raXDir = raMain(19);raYDir = raMain(20);raZDir = raMain(21);raCrazy = raMain(22);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        value + [raXRandom,raYRandom,raZRandom] * raValue;} else {    value;}';
			var expRotationM = '/* Rotation Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Rotation");raX = raMain("Rotation X");raY = raMain("Rotation Y");raZ = raMain("Rotation Z");raXDir = raMain(28);raYDir = raMain(29);raZDir = raMain(30);raCrazy = raMain(31);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;        value + [raXRandom,raYRandom,raZRandom] * raValue;} else {    value;}';
			var expScaleM = '/* Scale Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Scale");raUniform = raMain("Uniform Scale");raX = raMain("Scale X");raY = raMain("Scale Y");raZ = raMain("Scale Z");raXDir = raMain(38);raYDir = raMain(39);raZDir = raMain(40);raCrazy = raMain(41);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedRandom(raSeed,raCrazySwitch);        raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);        raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;        raOut = raUniform == 1 ? raXXX : raXYZ;    raOut;} else {    value;}';
			var expOpacityM = '/* Opacity Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Opacity");raRate = raMain(44);raStay = raMain(45);if (raSwitch == 1) {    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raFade = wiggle(raRate/4*raValue,raRate*raValue) + linear(raValue,0,1,0,-value);    raBlink = raRate == 0 ? linear(raValue,0,1,value,0) : wiggle(raRate/8,raRate) + linear(raValue,0,1,0,-value);    raOpacity = raStay == 1 ? raBlink : raFade;       raValue == 1? 0 : raOpacity;} else {    value;}';
			var expColorM = '/* Color Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raSeed = raMain("Random Seed");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Color");raRate = raMain(48);raColor = raMain("Base Color");raSeedFix = raMain("Same Color");raCrazy = raMain(52);if (raSwitch == 1) {    raCrazySwitch = raCrazy == 1 ? false : true;    seedFix = raSeedFix == 0 ? seedRandom(raSeed+index,raCrazySwitch) : seedRandom(raSeed,raCrazySwitch);    seedFix;        Control = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));    Wiggle = wiggle(raRate/10,raRate/30);    Color = raSeedFix == 1 ? (raColor + Wiggle)*Control : (hslToRgb([random(0,1),0.7,0.7,1]) + Wiggle)*Control;        raCrazy == 1 ? wiggle(raRate/10,raRate) : Color;} else {    [0,0,0,0];}';
			var expColorOpacityM = '/* Color Opacity Expression By Yan-K RanAni 3*/raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");raControl = raMain("Animation Control");raDelay = raMain("Offset (Second)");raIndex = raMain("Fix Index").index;raSwitch = raMain("Color");raOpacity = raMain("Color Opacity");raCrazy = raMain(52);if (raSwitch == 1) {    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));        raCrazy == 1 ? raOpacity : raOpacity*1.5*raValue;} else {    0;}';
			
			var expTint = '/* Tint Map White To Expression By Yan-K RanAni 3 */effect("Color")(1)';
			var expComp = '/* CC Composite Opacity Expression By Yan-K RanAni 3 */effect("Color")(3)';
			
			var selectComp = app.project.activeItem;
			var selectLayer = selectComp.selectedLayers;
			var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/Yan-KRA3.ffx";
			
			if (dropDownMenu.selection.index == 0) {
				
				for (i=0 ; i<selectLayer.length ; i++) {
					if (selectLayer[i].threeDLayer == 1) {
					} else {
						selectLayer[i].threeDLayer = true;
					};
					selectLayer[i].applyPreset(new File(presetFile));
					if (selectLayer[i].property("Effects").property("Color") != null) {
					} else {
						raTint = selectLayer[i].property("Effects").addProperty("ADBE Tint");
						raTint.name = "Color";
						raTint(1).expression = expColor;
						raTint(2).expression = expTint;
						raTint(3).expression = expColorOpacity;
						raCompose = selectLayer[i].property("Effects").addProperty("CC Composite");
						raCompose.name = "Compose";
						raCompose(2).setValue(18);
						raCompose(1).expression = expComp;
					}
					selectLayer[i].orientation.expression = expRotation;
					selectLayer[i].scale.expression = expScale;
					selectLayer[i].opacity.expression = expOpacity;
					try{
						selectLayer[i].position.expression = expPosition;
					}
					catch(err){
						selectLayer[i].transform.xPosition.expression = expSepXPos;
						selectLayer[i].transform.yPosition.expression = expSepYPos;
						selectLayer[i].transform.zPosition.expression = expSepZPos;
					}
				}
				
			} else {
				
				if (selectComp.layer("_RanAni_Control_" + dropDownMenu.selection.text) != null) {
					
					for (i=0 ; i<selectLayer.length ; i++) {
						if (selectLayer[i].threeDLayer == 1) {
						} else {
							selectLayer[i].threeDLayer = true;
						};
						try{
							if (selectLayer[i].property("Effects").property("Color") != null) {
							} else {
								raTint = selectLayer[i].property("Effects").addProperty("ADBE Tint");
								raTint.name = "Color";
								raTint(1).expression = expColorM;
								raTint(2).expression = expTint;
								raTint(3).expression = expColorOpacityM;
								raCompose = selectLayer[i].property("Effects").addProperty("CC Composite");
								raCompose.name = "Compose";
								raCompose(2).setValue(18);
								raCompose(1).expression = expComp;
							}
						}catch(err){
						}
						
						try{
							selectLayer[i].orientation.expression = expRotationM;
							selectLayer[i].scale.expression = expScaleM;
							selectLayer[i].opacity.expression = expOpacityM;
							}catch(err){
						}
						
						try{
							selectLayer[i].position.expression = expPositionM;
						}
						catch(err){
							selectLayer[i].transform.xPosition.expression = expSepXPosM;
							selectLayer[i].transform.yPosition.expression = expSepYPosM;
							selectLayer[i].transform.zPosition.expression = expSepZPosM;
						}
					}
					
				} else {
					
					var controlLayer = selectComp.layers.addNull();
					controlLayer.source.name = "_RanAni_Control_" + dropDownMenu.selection.text;
					controlLayer.applyPreset(new File(presetFile));
					controlLayer.inPoint = selectLayer[0].inPoint;
					controlLayer.moveBefore(selectLayer[0]);
					
					for (i=0 ; i<selectLayer.length ; i++) {
						if (selectLayer[i].threeDLayer == 1) {
						} else {
							selectLayer[i].threeDLayer = true;
						};
						selectLayer[i].applyPreset(new File(presetFile));
						
						try{
							if (selectLayer[i].property("Effects").property("Color") != null) {
							} else {
								raTint = selectLayer[i].property("Effects").addProperty("ADBE Tint");
								raTint.name = "Color";
								raTint(1).expression = expColorM;
								raTint(2).expression = expTint;
								raTint(3).expression = expColorOpacityM;
								raCompose = selectLayer[i].property("Effects").addProperty("CC Composite");
								raCompose.name = "Compose";
								raCompose(2).setValue(18);
								raCompose(1).expression = expComp;
							}
						}catch(err){
						}
						
						try{
							selectLayer[i].orientation.expression = expRotationM;
							selectLayer[i].scale.expression = expScaleM;
							selectLayer[i].opacity.expression = expOpacityM;
							}catch(err){
						}
						
						try{
							selectLayer[i].position.expression = expPositionM;
						}
						catch(err){
							selectLayer[i].transform.xPosition.expression = expSepXPosM;
							selectLayer[i].transform.yPosition.expression = expSepYPosM;
							selectLayer[i].transform.zPosition.expression = expSepZPosM;
						}
						
					}
				}
			}
	
			app.endUndoGroup();
			
		}
		
	function convertToKeyframes(theProperty) {
		if ( (theProperty.canSetExpression) && (theProperty.expressionEnabled) && (theProperty.numKeys < 1) ) {
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
		
	function optimizeKeyframes(theProperty) {
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
	
		
	function convertToExpressions(theProperty) {
		if ( (theProperty.canSetExpression) && (theProperty.expressionEnabled == false) ) {
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

	function bakeRA(mode) {
		app.beginUndoGroup("Bake RanAni");
		var comp = app.project.activeItem;
		var layers = comp.selectedLayers;

		function handleProperty(property) {
			if (!property) return;
			try {
				if (mode === 2) {
					convertToExpressions(property);
				} else {
					convertToKeyframes(property);
					if (mode === 1) {
						optimizeKeyframes(property);
					}
				}
			} catch(e) {
				// Optional: alert(e);
			}
		}
	
		var propsToProcess = [
			function (layer) { return layer.position; },
			function (layer) { return layer.transform.xPosition; },
			function (layer) { return layer.transform.yPosition; },
			function (layer) { return layer.transform.zPosition; },
			function (layer) { return layer.scale; },
			function (layer) { return layer.orientation; },
			function (layer) { return layer.opacity; },
			function (layer) { return layer.property("Effects").property("Color")(1); },
			function (layer) { return layer.property("Effects").property("Color")(2); },
			function (layer) { return layer.property("Effects").property("Color")(3); },
			function (layer) { return layer.property("Effects").property("Compose")(1); }
		];
	
		for (var i = 0; i < layers.length; i++) {
			for (var j = 0; j < propsToProcess.length; j++) {
				try {
					var prop = propsToProcess[j](layers[i]);
					handleProperty(prop);
				} catch(err) {
					// If a property/effect doesn’t exist, just continue
				}
			}
		}
	
		app.endUndoGroup();
	}
	
	

	function deleteRA() {
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
				
				try{
					selectLayer[i].orientation.expression = expClean;
					selectLayer[i].scale.expression = expClean;
					selectLayer[i].opacity.expression = expClean;
					selectLayer[i].property("Effects").property("Color").remove();
					selectLayer[i].property("Effects").property("Compose").remove();
					}catch(err){
				}
				
				try{
					selectLayer[i].effect("Pseudo/YanKRA3").remove();
				} catch(err) {
				}
			} else {
			};		
		};
		app.executeCommand(3744);
		app.endUndoGroup();
	}
		
    }
    //==================================================
     
    // _______ UI SETUP _______
    {
        var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette','Yan-K RanAni 3',undefined, {resizeable:true});
        if (mainPalette == null) return;

        mainPalette.alignChildren = ['fill','fill'];
        mainPalette.margins = 5;
        mainPalette.spacing = 2;
    }
    //==================================================
  
  
    // _______ UI CONTENT _______
    {
        var contentLogo = mainPalette.add('group');
        contentLogo.alignChildren = ['fill','fill'];
        contentLogo.orientation = 'column';
        contentLogo.margins = 0;
        contentLogo.spacing = 2;
        contentLogo.orientation = "row";
		imageLogoImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u00E1\x00\x00\x00(\b\x06\x00\x00\x00\bT\u009D\x06\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00+\u00B7IDATx^\u00ED]w|\x15\u00C5\u00F7}D\bI\u0080$\x14\u00A5\x17i\x01)\x02\"(E\x10\x11\x1B \u00A8@@E:\u00D2{Q\u00AA\u00F4\u00DEAz\u0087\u0084\u008E\u00A8\x14)R\u00D4\u00AF\u008A\u0080\nJ/)\u0094P\x12BI\x03\u00B2\u00BFsff\u00F7\u00ED\u00EE\u00AB\u00FE\u00FD\u00E3|\u0098\u00CC\u00BC\u00BBwggg\u00E7\u00CC\u009Drw\u00C9R\u00F7\u00A6V\u00D0\u00E1\x0E\u009A\u00E6\u00C8\u00A29\neq8n \u00CEth\x0E\x07\u00D2\u0090\t\u00B9JS\u008Fi%\u00D3\x1C\u0085!\u00BFj\u0093\u0097A\u00C8\u00EA\u00D4\u00D7\u0092T\u009EA\b\u00B9\u0090\u00BE\u0087\u00B8\x18\u00F3%\u00A8#\u0082\u00916\u00E4\u00F9\x11\x12\u00A4\\^O\u00C9ep8\u00EE@\u009E\u00A8\u00E4Y\x10\u0097FP\u00D75\u00CA|\tEJ\u0097i\u00A3\u00CC\u0094\u00E7Q\u00F2\u0087\x169\u0082\u00C8L\u00A4!7\u00D2\u008E\u00A2H\u00C6\u0099\u00F2\u00D5\u00E5\x026y\x00BA\u00E4{\x15Y\u009B\u00E5*\u008D?Vy!\x04\u00DC\u00A7\u00F6\u00C4U_\u0096\u00C1&/\x02y\u00BC\u00AE#\u008E\u00A9\u00B4\u00B9\u00CCJ\u009E\x1D\u00B2p\u00FCV\u00F5h\u00D6\u00B7\u00DE\u008B\u0092\u00CB\u00BCMrq\f\x07\u00F5\u00B4M\x0E}\u0087M\x1F\x7F,\u00BF\u00F5\u00B4\x16\x06\u00B9\u00864\u009F\u00BFY\u00EEF_\\O\u00E4\r\u00B1].\u0082M\u00CE:/\u0080p\u00CD)w\u00D6\x05\u0083MN\u00DD\u00DB\b\u008F\u00A9#\u00AEo\u00D3\u0097ru=Q/\u00CE\u00FB4\u00C9M\u00FA\u00F8#\u00D3\u0081\u0090\u00E7F\u009C`\u0093;\u00F5\u0099\u0087;\u00D4M\u00C8\u00CC\t\u0085\x1C\u0087\x0B\x04$(\u0091G4\u008A}\u00CCF\u00CF\x0B9v\u0097\u00C8\u009A\u00A8\u00C4\x02\u008D/>\u00E2\u00CD\u00E5u\x16P[\u0086t\x0F\x14$\x10\u00BF\u00B3m\u0089\u00C8\u0096\u00D8\u00E2\u00CC\u00A3g\u00C4M\u00E38!\u00F5X8us\u009A#\x14b4 \u00C7-\u009B\u00DC\u00AC\u009F\u00B9\u00ACz\u0090\u00D6\u00F9h*\x1F@\x18\u00AE\u00F1.\u00D4\u00D6\u00DA*\u00B3\u00F2\u0082\u00DA9N\u00CA\u00B3$z\x1F~\x10L9t\x1E\u00CD|-\u00C7q\u00CA\u00B2d\u00E1\x19\x12\u0083\u00F6\u00DF\x0FA%W\u0087\u00CE\u00A9\u00C9\rs%~\u00B1\u00F7~.\u00A4sL|+\u00F4\u0086R\u00F1\u0088\u00AF\u00BE\u00BD\u008B\u00FBr\u00840\u008Cx?\u00DCc=N\u00D9\u009CX\x03e\u00CD\u008E\u00AB\u00B2\u00AE\u0092\x07\u00B6\u00CC#\x1A\x0F13\u00EAN\x15\u0096\u00ADo\u00EB\u00BC\u00FF(\u0091\u0081\u00F9kn\u0087A?\u00A8{\u00DB|>\u009F\u00D1\u008A%7\u00B3\u0089:wh9\u00DBu\u00C9\u00EFS\x7F\u00C3\u00DC\x1B9Pw\u00A1-{\x17\u00BC\u00AED\x1E\u00B1c\u00DA5>\u00FFP\u00E8\x075\x1E\\\u00D8g\u00DE\u00FB\u00C6\u00C5\u00B33\u00E0\u00F3\u00CCl0\u00B2\u00E8\x03%\u00F6\u0088_\u0086\u00C7\u00B0\u00CE\u00B3\u00BF:\u00BE\u00F8m%\u00F2\u0088\x13\x03/?\u0083\u00FAb\u009Dg{q\u00FA\u00F3\u0096\u00B6\u00E8\x0Eg{^\f\u0081~h\u00D9y\u00A5|>O\"\u00AE\u00D3y\u00B6\u00F3\u0080\"\u00CB\u00CA\u00DCQ\"\u008F\u00B8\u00F3\u00E9\u00D9@\u00D49\u008DM\u00D6<\u00EB\"<\u0096%@\u00C5\x16\u0090\u0080\u0088\x1E#<\x12\x02/h\x14\u00FBD\x10\x10\u00C9$)\u00B1B5\u00E7\u00C7(\u00CCw\u0088\x19\u00FEac\u00D8\x16\x11x\u009F\x07\u00D8\u00E07\u0097\x0F|\u00B2\u00E9\u0085\u00ECO6V\u0090aC\u00C5\u00ECO\u00A2*\x06>Y\u008F\x18*,K:\u00F2ay\u0082y\nB\x18\u00C23\b\u00E1\u00F8\x11\u0084@\u009D\u00E0N\x7F\u00A4\u00F2~\u00C2\x16\u00D7\bfYnA\u00AE_\u00F3*\u0082\x0Bz\x1Dy\u00A0\u00E7\u00F7:\u00C2\u00FE\u00FE\u0087\x1E\u00E4\u00A1\\\u00C7\u00C0\u00FD\u00F7\x03\x11m\u0086\u00C2T\u00C4\u0099CA@\u00C4)\b\u008A\u00FE\u009EA\x02B+dd\u00D3pq\u009F>0\n\u00D7\u00D8\x07\u00FDfH\u00F3\u009E\x1D3\u00A2\u00EF\x04\u00CC\u008C\u00BE3\x1D\u00F2\u00DD\u00A8\u00DFb\u0094\u0099\u00A1\bxO\u00FD\u00F4\u008A\u00E5KA@\u0087#\u00B0}\u0097\u00E7\x1EJ\u0089wD\u00CF\u00BB\u0091\x03Q\x06B\u00A6\x10x\u00C17  \u00A2\u00D0&\u0083\n%K\u0089w\u00EC\x05\x01q\u009F|NiR\u00E2\x1D?\x0F\u008F\u00CD\x05}\u00D6\u00B9\u00CF\u00B2\u009C\x18t\u0085m\"\u00A4\u00CA\u00B4\u00E7\u00FD\u00A9s\u00C7\u00D9^\u0082\u0080\u00B0\u00C7\u00E2^}\"\u00AE3\b\u00E8p\u00F0>}>\u00FF\u00DB$ \u00DAf\u00DE\u00B5\x11\u00F7XA\u00DE\u00E0BB\fO\x05\x01\u008F\u00E4\x0F\u00F0YIo\u00C6=\u00E1=\b\x02\u00EE)\u009E\u0095C\x0B\u00B7\u0080<uG\u0099lM\u0090\u00FC\ba\u00A9A@\u00FE\u00B1\u00A1\u00D5\u00A9\u00F4\u0092\u0091\u00A7\u00D2\u00FB\u00B7>\u0095\u00B1\u00BD\u00CD\u00C9\u00F43\x10\u00FD.\u0082\u00E6\u00F8\x05\u00FA\u00C7\x10v#\u00DD\x0F\u00B2\u00AA\b\u0089+^\n~\u00B8\u00BCzp2z\u00F84\u00C8\u00C3\u0096\u00D6\bI\x12\u0096Ls\u00FC\u00B1\u00B0fp\u0093\u0085\u00AF\u00844A\u00FA0t-\x10\x04\u0084\u0091\u009C\u00F3ZN>\u00E0\x15H\u00B3\u00C3i+\x0E:\u00B1\b\u00F2\x12\u0088\u009B\"G\u00DE,\tR\u0093\u00E1\u00CB\u00DD\u00C9\u00A1\u00C3v'\u00E7\x19\u00BE+\u0099\u00C7\x1D#v&\u0097\x1A\u00F9}r\u0095Q\u00DF\u00DD\u00CD:\u00FA\u00BB\u00BB\x1C\u00E2\u00BF\t\u00FD2\x1A,\u00B1\x1F\u00E8\u008F\u00C0a\u00CBO\b\u008E\u00E9\x1B\u00EE<\u0087h\x17B}\u0084\u00BA}\u00DA\u00E4e\u00DA\u00C0\u00BC\u00B5\u00B7\u00D9\t\u00DD\u0083\x05D\u009D{\u00CF\x7F\x19\t\u0088N\u00AF}gI@\x10\u00D7+\u00A2H@4\u00CAV\u00BD\n\u00F8\u00EC\u0080\u00BF\u0099.\t\u00D8t\u00A0\u009F\x04\x1C\x0F\x0B\u00886\u00D7pD\u0091T%\u00F2\u008A\u009FG\u00C4r\u00BA\u0092Rk|q\u00D11y\u00C3qE\u00C0\u00AA~\x12\u00F0L\u00AFK!\u00884X\u00C0T\u00DE\u0084/\u00C4\u0082\u0080\u00A8\u0097\u00E4\"K\u00CBd\u00FA\u00D2\u00BF\u00D5\u00F6\u009C$\u00E0\u009A\b\u00BF:I\x0B\t\u00ED\x04\u00F4v1A@e\x01I@)u\x03u\u00E4\u00FD\u00F3\u008F\u00D0\x03j\u0081\u00DB\u00CBJ\x02\u00DA\u00D1\u00E2\u00DF\u00F4\x06-\u00FFI\u00DF\u008B\u00E4j\x04\u00DE\u00E8d\u0084\u0097\u00D6U\u00CA\x1E\u00B1\u00B6r\u00F6\u008A\u0090\u00BD\u0082P\x0E\x19v\u0086\u00FC\x1C\u00D2C\x10N\u00B4\u00FF#\u00B5c\u0087?Ry\u00D3a\u00CB@@\u00C4.0\u00DF\x07I\u00D1\u00F3'i\x01\u00E7J\x02\x12l\u00A0\u00BCn{\u00F1\x0B\x18x\u00E0\u00FE8D\u00B4\u0090\u00B4N\u00D4#A\u00CF#\u00AF\u0091\u0088\u00BB\"\x1C\u00C5\u00BD\u0091\x1C_1O4\u00EE\u00C9H\u009F@\u00D8\x02\u00F9f\u00A5\u00B3g\u00DC\u008Ed\u00E8x\u00AE\u009E\u00C9\u009B\x13\u00D9\x19\u00D4B\u00F2.\u00C2\u00FF\u0090\u00E6\u00D0\u00F8\b\u00D2\u0089H\u00D7\u00C30\u00F4<\u00F5t\u00CC%\x01a\x01{|\u009AOf\u00EA\u0085T\u00CB\u0096\u00DD\u00CC\u0086\u00BC\x02;(\x02\u00FAB\u00D4|\fAa\x01#\u00FD \u00E0vE\u00C0\u00F7\u00FD$\u00E0\x0F  \u00A2\u0080\u0086\u00C3\u00FD#\u00E0O  \u00EE-\u00A5\u00D6\u00B8b\u0092\u0080^\u00EE\u00F3\u00D8`E\u00C0\u00A9%\u008C\u00B6\u00E5\u00AD\u00B39\u00DD[\x120bn)\u00BF\u00CA\x12\u00D3\u00E5\x02\u00DByrQ\x10PJ<\u0083\x04D\u00C5\x04\u00E5\u00F3\u0093\u0080\x0F[\u009E\u00C9e\u0090\u00D0 \u00E0sY|Z\u00C0\u0086\u00F14\n\u0098\x03\u0082\u0080?\x14sO@6Le\x05\u00DA!\u00B0q\x07~c\"\u00A0n!>:\u009DQ\x10\x04\u00DC\u0086\u00BCh\r\u0086DW\b\u00AC\u0083x9\u00C2\u00B1\u00F5\u0095\u0083\x1E\u00D2\u00AA\u00E9s\u00B45U\u0082\u00B4\u00D5U\u0083/\u00AF\u00AA\x16\u00BCfe\u00D5\u00A0\x0F z\x17\u00E1E< Z\u00CB2\u00D4\u00F1\u0080\u0099x(\x1F\"\u008E\u00E9\u00F9s\u008A\u00B0\u0080s\u00EB\x1A\x04\u00D4IJ\u00ABWv\u00C0\u00C1\x07o\r8p\u00FFs\u00A4\u00BB@\u00DE\x1C%\u00BD\u008E\u00F4\u009B8>\x16!r\u00C2\u009B\u00B9\u00DE\u0086\u00BC\x03\u00D2\f5\x10~E \u00B6@\u00CE\u0087\u00B4~t\u0093\u00F0\u00DA\u00A3\u009A\u0084\u00E3\\\u00C7 \u0084z*\x7F\x17L\u00DE\u0092\x18\u00AC\u00CE\u00A9\u0086\u00C0\u00F9\x0E;\u0096h\u0084\x15\u00FD#\u00F3\u00B6\u00EE\u00D7:\u00AFe\u00BE4w\x1D\u0086\u00A0\u00B0\u0080=u\x02z\u00C1R\x10\x10Q`\u0087N\u00FE\x11p=\b\u0088\u00FB\u00CC\u0088\u00EC\u00E9\u009B\u0080\u00DBf(\x02\x0E\u00F0\u008F\u0080{&H\x02\u00BE9\u00CCI@o$92\x12\x04D\u00C7W[' \u00E0\u00A9\x0EI@\x1C\x0B\u00A9f\"\u00A07\u0090\u0080\u00D0\u00D7\u00CA\u00CD-\u00E97\x01\u00A1\u009F\\l\u0089o\x02\u00DE\u00FCLZ\u00C0|\u00AB\u00CB\u00FAE\u00C0\x07\u00AD\u00CE\u00F0>3\x04\t=\x12\u00D0ME\u00BDA\x02*\x0B\u00F8C\u00B1g\u00AC\x1A\u00A6_&\u00F2\u00EC\u0085\u00FC\u0087o\u00CAds\u00AD$\u00CD\u00F1*\u00FE\u00EEGX\u00BB\u00F1\u0085\u00EC\u008D1\x1F<\x1E\u00F9OF(\u00E4iQ\u0095\u00B2\u00FB\x1C\u00A7#wN\u00A6G!\u00D0J}\u00DD\u00E9\u00F7\u0094\x1E:\u00B9\t\u00BD\f_\u00D7\u00CAqtA\u00ED\x1C[\u00A1\u00FF\b!\u00CB<\x13\x01u\u00E0\u00A6b\x10mA\u0098\u0080@+\u00D8\x12\u00E1\x02\u00F4\u00A9\u00CB\u00E1\u00EF\u00E2I\u008DB\u008F\u00E8\x1D\x02\u00FE\u00FE+\x12N\x12\u00BE\u008A\u009E\u00E5\u00C8\u00E8\u00F7\u00C26\u00A8\u00DF\x04\u00EB\u00F52\u00EBe\u00FC\u00F6\u00A4\u00D2\x13\u00B6%u\u009F\u00B05\u00A9\u00FBD\u0084I[\u0092\u00DE\u0081<s\u00D0\u0087\u00B99\u00DF}\x05\u00E9X\u00E8VA\u00A5\x04!\u00FD\u00938\u00DB\u00849  \u00E4\u00F7z~\u00E2\u009B\u0080K\u0096K\x02v\u00EC\u00E8\x1F\x01\u00D7-\u0090s\u00C0\u00D6~\x12\x10\u00E5\rm\u00E6\u0086\u0080\u00B2f\u00AC \x01!\x0Fhd\"\u00A0\x0Ew\u00FA$ \u00E4)u\u00C6:\t\u00E8\t\x7F\f\u0091\x16\u00B0\u00DA\x14\u00FF\b\u00F8o\x1Fi\x01\u00CB\u00CD\u00F1\u008F\u0080W\u00BAJ\x0BXlqi\u009F\x04LP\x04|\u00F6?\x120\u00C7\u00C6r\u00E9\x01\u00FF\u00C5\x02\u00BEqUZ@\u0084\u00A4\u00BDEm\x04t\u0083&\x17\x1F\u00F1\x01\x04b>\u00E8RI\x1F\u009D}\u00F4\x0E\"\f\u00E1\u00B4&\x1B\u00CB\x07\u00B2\u00F1;Z\u00FD\u0093\x1E\n\u00FD\u00B4h7\x04\u00B4?\u00B0\u00F6\u00C7\u00D3\x02\u00D0(\u00C3VT\x0FNZ\u00FEr\u00F0\u00DFH\u00BF\x06q\u00A3.\u00BF\u00A7\u008E\x16\u00C3C\u00A9f\u00A0\u00FB\u00CF\x0F\u0085\x05\u009CW'\u0087\x0B\x01!\x17\u00C09\x1CJ\u00D2*}\u008Ep\fi\u00EA\u00B2\u00A7\u00AD\u00894\u0087\u00CA\x12R\u009Fs\u00BEkc\u00DF\x0E=1r\u00D7=6\x06\x0E\u0097\u009D:\x12/#\x1C\u0095I\u00B1\u0098DK\u00C68\x1F2y2\x18\x04\u009C\u00BA%\u0089\u00F5\u00F9\"\u00E43\x07\u00B4\u00C8\u00DD\x02\u00E9\x1F\x10\u00D6\u00CF\u008C\u00BES\x1A\u00B1\u00C0\u009C\u00F5w\u00C4\x1C\u00B0\u0097_\x04\u00BC%\u0086\u00A0\u009D\u00FE\x03\x01a\u00952\u00DA\u00F4p%\u00A0\u00DDZm\u009Dy\x1DY\u0083\u0080\u00FD=X@\u009B\u00FE\u00EE\u0089\u00D2\x026\u00FA\u00D2\u00C3\x10\u00D4\u00A6\x7Fx\u0094\u00B4\u0080u\u00C6\u00F8&\u00E0QE\u00C0\u0097\u00FC$\u00E0?\u008A\u0080\u00E5\u00FF#\x01\u008B\u00FBC\u00C0vr\b\u00FA\u00DC*\u00F7\x04\u00B4\u00D7\u00E3\u00FDHI\u00C0\u009C\x1B\u00CA\u00A5\u00F37-\u00A1_\x04l@\x02r\x1B\x02\x04\u00DC\u00E7\u0081\u0080|B:\x1A\u0083\u0080\u00D0\x0F\u00DCQ\u00DA\u0095\u0080\x1F\u009C\u00C9`\u00E3\u00E4\u009C\u00AF\u00C5\u00A6r\u0081\x17)\u00C3|PX\u00C0\u00E8\u008A\u00BE-\u00E0g\u00C7\u00E5*(\t(%\u0098\u00FF\u00D4\ba\u00A3\u00E3\u00C2O\u00D5\u00AE\u00BF\u00A5\u00F6\x10B\u0085n\u00BF\u0080\u0080(\u00DE|w\x04\u00B4\u00A2\x18\u00CAt\x05\u00F1\x1E\u0084\u0094)o\u00E4dc\u00E0\u008A)\x1B\u00B6\u00E9ah\u00B44\u00BD\x10~#\x01q,?\u00D2\u0095\u00F9\x1B\u00C1\x00\u00E4\u00B4\u00F4\u00FFczX\u00B3\u00DC\u00C7\u00BEl\u009E{\"\u0092\u00B3\u00F0P&\x0F\u00F9 7\u00C9\u00C6\u0086\u00C8\u00CE\u0083ys\x1E\u00C8s8,\u00E7\u009E\u00E2\u0086YQw\u00C2f\u0093\u0080\u009Av\u00AF\u00F7\u00C7\u00EE\t\b}\x03\u008BW\u00DC\x12\x16\u00B0S\x07\u00CF\x044\u00EB\u00AF\u00FD:AX@w\x04\u00B4c\u008B \u00A0\x16\u00DA\u00DC\x13\x01m\u00D85\u00F1\u00AA \u00E0[\u009E\bh\u0083N\u00C0\u00BA\u00FE\x10p\u00A8\x1C\u0082V\u009F\u00EC'\x01\u00FB\u00CA!\u00E8\x0B\u00B3\u00DD\x13\u00D0N\u0092\u00CB\u009FK\x02\u0096X\u00E4\u009E\u0080f\u00FD\x1B  \"\u008F\x04\u00B4\u00E3\u009E\u008D\u0080D\u00807\x02\u00EA\x0F\u00EC\u00F5kN\x0B\u00B8\u00AF\u0088o\x0B\u00F8\u00DE%\x10\u0090\x16\u00B0T\u00D6\u00FBM/<\u00CAk\x1E\"6?\u009B\x11\u008Eh\x05B$BB\u00CB\u00D3\x199\x11\u008A#\u009D\u00B6\u00C1O\x02\u00A20a+_r\x12\u00B0\u00E3\u00D1\u0094,\x18\u008A\x16]Z#\u0084\u008D\u00A9\rB\x074\u00DCj\u00BC.\t\u0088J\u00CB\u0082\u00E1hJ\u008F\u009F\x1Er\u00BF\u00D1=d\x11i\u00CD\u008EC?e\u00DA\x1B\u00B9\u009Ep\u00E89\u00A5\u00A1\u00D8\x0F$A\u00A6}\u00B1\u00E7^\u00CF/\u00F7\u00DC\u00EB\u008Bt4\u00F4_BL\u00D2\u0085 ]\x15e\u00E2\x16\u00CAa}\u00B8:f\u00C7\u00DDb\u0090\u0097A\u00CF\u00C5\u0095N\x01\fG\u00D9\x19d\x0E\u00E5\x10\x14zJ\u0097\u00F3\u00CA?a\x05\u00F5\u00C6\u009D\x02i+\u00C4y\x118?|\u00E0\u0089\u0080f,R\x04\u00EC\u00DC\u00E1Y\u00BF,\u00A0N\u00C0\u008F\u00BB\u00FBA\u00C0Y\u00D7\u00C5\x10\u00F4\u0083~~\x12p\u00D2U\u008C\u0080\u00B4\u0080\u00B7\u00BF\u00F0\u008F\u0080\u0087F\u00C7\t\x02\u00BE\u00F6\u0095o\x02\u00FE>4FX@_\x04\u0094O\u00C1\u00E18\x05\x02\"\u00F2H@;.\u00F9 \u00A0\x197\u00DAK\x02\u00E6_\u00E9'\x01[K\x02\u00E6\u008Av\x12\u0090\u00B0\u00AC\u008E\u00BA\u00C3\u00EB\u00D72\u008D}\u00C0\u00FD~\x12\x10\u00FA\u0081\u00DF\u0095\u00CAv_42z\u0080\u00A8\u0086\u00A9\u00C09\u00D7\u00FC\u00CD\x11\u00D9\u00F49U\x00\u00F4\u00E9\u0081\u00C2a\u00B1g\u00E0\u00CAmOH\x0B\u00B8\u00B2\u009A\u0093\u0080\x1D\u008E\u008A\x15\u00E6\x06\bb\u00B3uIMa\x11\u00B9\x104\u00BD\u00DB\u00AF)\u00BC\u00E9,\u00F3k\u0085\u00E8\x16\u00D0\u00B2\x0F\u00A8\u00C3T\u00BAC\b\u00B3I@\u00F9\u00D3\x00\u00B7W\u0096!\x14B`/\u00DC\x1B\u00F1p\u0084=c\u00DE\tec\u00B8\u0089\x02\u00F6\u00F9\u00AAq\u00B8\u00B9\x13\u00E1\u00A65\t\u00CB\x15U\u0083\u0080_|\u0090\u00DB\u00F2\x00p\u008C\u00AB\u00AC\\\u00F4\u0091\u00C0}\u00F6m\u0095'\x16\u00F2O\u0091\u00E6\u00DC\u00B0\u0094<\u00E0\x01\u00D0_\u00B4R\x0EA\u00BB\u00B4\u00F7\u0083\u0080\u00D0_\u00B3P\x12\u00F0\u0093n\u00F9}\x12p3\b\u0088\b\x04,\u00E8\x17\x01w\u0082\u0080\u0088|\x12\u0090\u0099\x12\x07\x05\x015\u009F\x04\u00A4\u00FEo_H\x02\u00BE<\u00C9\x0F\x0B\u0088\u00FB<\u00D5\u00EF\u00B2 `\u0085Y~\x12\u00B0\u009B$\u00E0\u00F3\x0B}\x13\u00F0\u00BA\"`\x01?\t\u0098\u00AC\b\x18j# \u00A1\u00D7\u0085[\u00D4\u00BF\u009E\u0099\x0F\x04\u00C9\u00CC\u00A2iI\x07\n\u00FB&\u00E0\u00BB\u0097\x1F\u00E7\u0087n\u00CA\u00F7%\u009DC\u00D0\u00A6\u00E7\x1FU\u00C2\u009CPx\u00A9\u00C0\nF\u00E0\u0082kQA5\u00B7\u0096\x0B\u00CC\u00FC\u00E8t:\u00DD\x7Fnnz!{\x06\u00E6\u00835\u0091>\u008F\u00E1\u00A8[\u00CF\u0082OO\u00A4\u00E5C\u00EF\u00FAduU\x13\x01\u00FF\x00\x015\u00AD\x01\u00F2<\u00BC\u00ECea\x05\rt\u00FD\u00DF\u00C3\u00A5\u00C8\u00EF\u00D8\u00D7\u00AF\u0086|\u00CD\u00DF\u00EC\bz\u00FE\u00F4\u00B0\x04\u00E6\u0084\x1CnZ\u00D0\u00EF\u00A0\u00F0\u0082\u00E1~Z\u00F2\u008C\x06.\x04t\u00C1\u00B0\u00DD\u00C9\x05\u00A1\u00FF`\u00DC;a~\r\u0087\u00C6oO*\u00CA\u00FB\u00C4p\u00D4\u00E5\x01\u00D81#\u00FAN\x01\u00DCO*\u00F4\u00EF\u00F5m\u009D\u00D7g\u009D/\\y\u008B\u00AE\u0082w\u00BB\u00B6\u00F3\u00CF\x02\u00AE^\u0098\u00C0!\u00F7\u00F5O?\u00F7M\u00C0M\u00B3\u00AF\u00F3>S>\u00EA\u00EB'\x01'_-\u008C:L|wha\u009F\u008D\u00FE\u00C7\u00AF\u00E2\u00B8^\x10\x0E\u00FD\u00DB\u00F5G\x175\u00EA\u00FC\u00A7\x11\u00B1\u009F@^\x00\u00F2@\u00B4%6\u00D0\x07(\u00C31\u0084sH\u00A7\u00D5\u0098X\u00DC\u00AF:?\u00D9\u00EFrA\u00E8\u00DF\u00AD8\u00F3y\u009Fe\u00B9\u00D0\u00FDb^\u00E4\u009F\u0089\u00C6\u0094\\\u00F2k\u00DF\x04\u00BC\u00D6\u00E1<\u00DByj\u00C1\x15\u00FE\x11\u00F0n\u009B3\u0085\u0091\u00FF\u00ED\u00B0(W\x02\x12\u00F4\x1D\u00E5|FB-h\u00E0\x04\u00D1\u0093 ]\f\u00E9\u00AB\u00B8\u00A0\x18\u008F\x1Arq\f\u00BAFZ\u00C8\u00E9\u00A2\u0085\x06\u00A1\u00C5\u00DA\u00E4\u00E5\u0091>\u00AD\u00F4'#\x1C\u0081\u00FC;\u00C49q=\u00AE\u0084]\x17\u00BAR\u00BF\x1A\u00E2K\u0090\u00DF\u00E5\u00B9&9\u00AD1\u0086wZ\u008CIN\u00FBZ\x07e\u00FB\x15Ys\u00D5\u00D3\u00AC\u009F\r\u00F2JH\u00D3\u00D3\u00A5!bM\u00CA5\u0092!\u008EiB\u00C8\u00A4\u00FCY\u00C4i\b\u00E2\x01\u009B\u00E4F\u00DA)\u00D7J!\x7F\u00E6-\u00CB\u00CD\x03R.\u00D2\u0090\u00F1Z,\u00FFeQ.M\u00A3\u0095\u00A2?h\u008CS_\u00E5+\u00F5\u008D\u00C0\u008C\x10\u00B3\u00CE\u00B9\x07\u00F0\u00D8&\u0097\u00C18G\\\u008F\u008BS\u00D4\u00BFb\u0093\u00AB2!\b\u00B9q=.N\u00B1\u00C1)_SC\u00EEN\u009F\u00F7Y\x0B\u00F1}\x1Cc\x03\u00A5o\u00ED\u009F\b6\u00BFS\u0095\x07\u009F\u00BF\u00F4\u00A9\u008C\u00B1\u00C9U\u009E\u00D4\u0087L\u00A5\x11\u00F2\u00A8t\u00A2M~\niv\u00FEH\u00F3$!\x1B\u0086\u00B0\x17r\u00B4-\u0099\u00AF\u0092\u00CB \u00D2J.\x7F\u00E3\u00F9\u00D3\x1FT\u008B\u00D3\u00F3Uru\u008E\u00E5z\x04\u00CB\u009D\x00\u00B9\u00A5\x1D\x11z\u00BE&9\u00AD1\u00F4\u00D1\x16\u00ADr\x017\u00FA\u00C1\u00A8\x0B\u00FA&\x0B\u009Fj\u00B3>\u00EBH/\u0097\x0B\u00EA\u00DDPCP(\x1C,\x14\u00E0\u00D3\u00FF\u00EE\u009D+\u008F\u00C5\x10\x14\u00FA\u00D9v\u0096\u00B4\u00FA\u008E\u00BE\x0FK\u00F8\r,a\u00B3s\x19\u00D4\u00F9\x1B\u00A1\".\u00CAy\x1A\x1A\u00BD\u0096\x13V\u00D0\u00A2\u00DF\u00FA$-\u00A2v~}\u00E5 !\u00FF\u00E4\u00CF41\x07\u0084,\u00CB\u00AA*R\u00D6\u00FEx\x1A\u00CB',\u00E0\u00F2\u00EA\u00C1\u0096\x1E\u00BD\u00CB\u00AF)\u00DC{\u00C3q\u008D>{K\u0091\u009E<\u00FF\u00D5\u0090\u00DF\u0084%<\u00F2\u00A0\u00C4\u00BC\u00BA9-\u0096\u00B0\u00EF\u00C1\x07\u00B0\u0082\x1A\t\u009D6\u00E3\u00F5\\n\u00E7\u00A4\u00FA\u009Cv\u00D8\x0F\u00F7\u009F\u00C1\u008F\u00AD\u00C8\u0097\x1E4\u00A6\u00CA\x04\\+\u00FF1*\u00F9\n\u00EA\u00E4(\u00D2\x07 _\u00FEE\u00B3p\u00D1\u00CB\u00DA\u0086\u00E7\x06fl\u00E0\"\u008C#\u00A8\x7Fd^\u009F\u00FE\u0097_\u00AF\u0092CP\u00E4\u009D\x13V\u00D0\u00A7\u00FE\u00AAE\tb#\x1E\u00FAy`\x05\u00BD\u00EAo\u009Cs\u009D\x1D\u00EAI\u00E8\u00B3\x03\x15\u00F7\u00C3\u00D6\u0082xr\u00F3\u00FE\u0085\u0086\n%\x13\u00BE\u009B\u00829\u00A0tT\x0F\u0085\x15\u00F4Y\u0096\x03c\u00E28\u00F2`'\u00F3\f\u00AC\u00A0\u00B1\x17zdd,}>i\u00F9PC\u00AA>\u00C5\u00B5\x1D\x1F\">Xsbq\u009Fm\u00F1\u00EF\u00FEr\b\n\u00FD\u00E0J3}\u00FB\u008E\u00C2\nr\u00B11\u00A0\u00D4\u0082R>}A\u00AFv<\u00CF\u00FA\u00A6\u009Bd\u00D6\u0082\u00CB\u00CB\u00F8\u00CC;\u00E9\u00E3\u00B3\u00BC\u00CF\f\u00DCK\u008E\u00B0\u00F5\u00E5<\u00EA\u00BB\u00CC\t_\x03\x01\x11\u00899 \x13\u00BE\u00F06\b\u0088(p\u00E7\u00F3Y\u00EF{\u00D3Ga\u00B8\t\u00CF9\x0E{\u00E3\u00B4\u00CD\u00E5\x03\u00DD6\u00F8\u00A8J\u00D9\u00B9\u00D8Q\u00E6\u00E3\u00BF\u00D2\u0082\x11X\u00BE|\u00D0\u00E7b\x0E\u00E71\x02\u00B8\x0E\u00F3r%\u00E0o)b\x15t\u00D1+\u00C6\x1Cp\x1B\u00CEm\u00AC\u00D2.\u00E8{\u00E8\u0081X\x10@\u00F09\x04\u00F9\u0092\x04\u00C4|\x04\u00D7.,%V\u00B8\u00B9\u00F7\u00AC\b\u00A5!o\u008Dx\t\u00C2\u00B1I\u00DB\u00EE\u00D2\u00F3\u00C7-\u00A6\u0093\u0080\u0098\u00BB{\u00ABC\x1D\x0BV\u00DF\x16\u008B0\u009F\x7F\u00E6\u00DF\x10t\u00E5b9\x07l\u00DB\u00D5\u00F7\x10\x14\x04d\x11\u00BA!\u0094G\u00DD\x19\u00C0\u00F3#\u00B8\u0088d\x01\t\u0088(\u00E0\u00BD!\u00BE\u0087\u00A0\u0084 \u00A0\u00ACs\u0097a?\u00E4\x112\u00B2\x02\x02}\u009B\u00C7+\u00FE\x1A \tXy\u00C6\u00F3~\u00B9\u00A2\u009D\u00EFqQ\u00CC\x01q\u009F\u00A6;u\u008Fx\x10\x10QP\u00A1\u00E5e\u00EE\u00F9\u00D6v8\x12A@D\x19\u00E1\u00EB#\u00D2}\u00E9[HX7A\x11Ps$\x1D,\x18\u00E0\u00F3Ro\u00C7H\x02\u00EE*\u0091U\u008D\u00D3\u00BD\u009ER\x0B\u0099\u00FF\u00818ms\u00B9l^WAa\x05IDnb\u00F7E\u00E0\x02\u00CE%\u0084\x0B\u00EDN\u00A4\u00CD\u0087\x15\u00CC\u00BE\u00BCZ\u00D0\u0091\x156\x02vV\x04\\\u00EC$ A\u00D2s\u009B\u00C0\x05}H@\u00CCwf\u00D5\u00CF)\u0086\u00DA\u00DE\u008A\u00FE\u00C5^I\u00C0\u00F1\u008Dr\u00F1>\u008B\u00BB\u00E8+K\u00E9*\u0097\u0091\u0092W\u00C1\u00DF\u00AD\u0093\u00B7\u00DE5:\x13\x1D\u00D36&\n\x02\u00F6o\u00E5{\x0E(\t\u00A8\x05v\u00F3\u009B\u00807\u0085\x05\u00FC\u00CC\x0F\x02n\u0098{\u0083E\u00E5^-\u00BD\u0081\\\x00y\u00F5\u00ED\u00D3\u00AF\u00B1\x03\x10\u00F8v\u00AA$`\u00E3\u00C1\u00FE\x11p\u00FFX\u00B9\n\u00FA\u00FA\u00C8\u00A2\u00B2\u00CE\u00ED\u00D0\x1Cw \x1F\u0083\u00D44\u00A49\u0097\u009F\u00890\u00AC\u00E6\u0084\u00E2bX\u00E9\r\x7F\u009A\b(%\u00DEqN\x11\u00B0\u00F4\u0082R>;\u00E0\u00F8N\u00B0\u0080 `\u00E1e \u00A0\u0080\u00F7\u00C7\u0094\u00F8\t, \u00EA<\u00F7:\x10\u00D0\x07R[\u009C\u00CEb\u0090\u0090\x04\u00C4\u0089\u00C2\x02\x1E\u00F2\u0083\u0080o)\x02\u00EE6\b\u00E8\x01\u00CE\u009C*\"\u00FD\u00F7\u0096\b\u00EF\x04$\u00DA\u00FC-,`[\u00E8OG\u00CC\u00D7\u00A0\u00F8\x16\x06{\u00A2\u00EE\b3\x10,\u00E8\u00F4\u00BB\"`M\x13\x01\u00E5u9\u00F4\u00E4\u00CA\u00AB\x18R\u00F2A2\u00EE}XZ@\x12\u0090\u00C7\b\x1Es\u0087\u00A1?\u0088\u008D\u00F8\u0090\t \u00E0\u00B0=\u00F7\u00B8\u00DD\u0090\u008Fr\u0093>\u00AF\u00F9\u00B3\x1E g\u00A7\u00E1R'\u00D4G(\u0083\x12\u00D0\u00DD\u00CE\x00\t\b\u00F9\u00BD\x01~\x10p\u00FE\x1Ai\x01\u00BB\u00B75\x11\u00D0\u00CBY+\u0096\u00DC\x04\u00E1\u00B5\u008C\u00CF\u00BA\u0098\b\u00E8F\u009Fu\x12\u00AD\b\u0088\u00C0W\u00C0\u00B8\u00E5\"!\u00F4\u00D5I\u00F2\u00FD\u00CF\u00DAL\u00EE\u0098z\u00CD\u0085\u0080\u00C69n\u00B0O\x11\u00B0\x01\b(%\u00AE\u00FAu\u00C6\x16\u008B\u00AD=\u00B6\x18\u00DF(\u00E1\u0090w\u00C8\u00AB\u00E3\u008B\u00F7\x7FeBq\u00AE\u00A6{\u00C5\u009F\x03/\u008B}\u00C0\x17\u00A7\u00FBI\u00C0\u009Eb\b\u009A\\f\u00BEo\x02\u00C6\u0081\u0080\u0088L\x04\u00F4\u008E;  \"\u00BF\b\u0098\x02\x02\u00A2Ns\x0B\x12\u00D6\u00BD)^\u0080\x10\x16\u00F0p\x01\u00DF\x04l\x14\u00AB\bX\u00DC3\x01\u00F9`\u00E5\\Js`>\u00C8\u0087\u00CB\u00C6\x1B\u00C7c\u00DE\u00A0\bH\u00CB\u00D0Y\b\u00D0\u00F9#\x0FVr\x17\u00F5\u00BBS\u0087ci\u00C6v\u0086N\u00C0%f\x02\x02\u00BC\u00A1\x05\u00AF\u0086\u00B0\x00\u0099=\x7FN1:\u009B>G\x1E\u008A\u00E1\u00D0\u00ECzN\x02z\u00C2\u0090\u00BD\u0092\u0080\u0093\x1A\u0085\u00CA\u00ED\x16\x0E\u0097L\u00B5\u00A3\u0086h\x7F\x7F\u00D58\u00BC\u00CEh\x04\u00A4\u00E9c\u00CA\u00C5\u00A5\u00FC\u00A8]6$\u00EB@\x07i\u00E4RN\u00AF\u009B\u00A9\u009B\x12\u00B9eR\x0B\u00F2\u00BE\u0098\x0F~1#\u00FAN\x1F\u00A4?\u009C\x15\u00E5\u00F4\u0096\u0099\u00BB\u00EEv\u00E5\u00B9ko\u00B7\u009C\u00B7\u00E66\u00EF\u009F\u00EEyo`>\x18\u00B4p\u00D5\u00AD\u0090E+o\u0091\x10\u00AF-^q\u00AB\u00E1\u0092\u00E5\u00B7j/]v\u0093\u00D6\u0080\u00AF.\x05/_r\u0093d\u00E7V\u00CD \u00CC\x07\x07\u00AF^\u0094\u00F0\u00F1\u009A\u0085\t\u00DCbq\u00C1\u0086\u00F9b\u00AD%\u00B4e\u00CF\u00FC\\\x05\u00A5\u00BF\u00AB\u0080\u00B8cW\u00D4\u00DC1\u00ED\u009ApEk2H\x12\u0090\u00F7\u00B2s\u00F2U:+\u00D4\u00DC=1\u00FE\u00DD\u00DD\x13\u00E2_\u00DB3!\u00BE\b\u008F\x11\u00FB\u00C6\u00C5\u00D7\u0081~$\u00EE\u00AD?\u0086\u00A3_\u00FE\u00F8U\\W\u00A4\u00B9'k\u00B4\x13=\u00FC<<\x16\u009D\u00A6\u00F6\x12\u00F4\u008B\u00FD\u00FAeLa\u00CA\x04\u00CC\u00F5h\u00C2\u0089\u0081W\u0084\x05t!\u00A0~\u009E\rgA@D~\x110\u00B6\u00B3$`\u0091\u00A5\u00FE\x11\u00F0\u00F6\u00A7\u0092\u0080y\u00D6\u00FAA\u00C0\u0096\u00A7\r\u00A3G\u00B75\u00D6\u00B5\u00F8\u00E1J@\u00D7\x1Bi\x14\u00FBD\x10p\u008F\x17\x02\u009A\u0081\u00CCs\"\u00D0!\u0080\u00BD\u00B8y\u0093Zo\u00C4\x06Z\u009F\u0094\x04\u00C4p\u0094\u00DB\x10\u00F2!j\u008E\u00CD\u00AB\u00AB\u008A\u00A1\u00E7\x0E\u00E8sC\u009C\x15\u00F3,\x0Fu<*\t\u00B8\u00B4\u0086\u0095\u0080f\u00E0J$\u009BNB\x0E\x05Sf\u00D5\u00CD\u00E1\u0093\u0080\u0083M\x04\u0094\x12\x01\u00F1\u00DA\u0092\x19\u00C8_,\u00F4\u008C\u00FE\u00F6.\u00CB\u00929\u00B2ix\u00FA\u0088\u00F7\u00C3S\u0087\u00BF\u009F\u009B\x1EA?\u00F2\u0098\r|[\u00C21us\x127\u00E49\u00D7\u00D9\u0089\u009B\u00A4u\u009F\x00\u00FDY\u0088\u00E7#\u009C\u009D\u00BD\u00FE\u00CE\u00E69\u00EBn\u00F3\u00B9\u008C\u0086|\x03\u00C2\"\u00A4\u0097\"\u00F0\r\r~\u00E9\u00A0!b\u00BE\u00FA\u00B4\x11\u00E9\u00BD\u00C8\u0083C\u00EF\u0097\u0096-\u00BD\u00C9\u00A1$WK\u00E9\u00827\x17\u00E9\u00F1\b\u0093\u0091^\u008B\u00F82\u00E4\u00D3\u00D6.H\b\u00D2\x1B}\u00D4<i\x01[\u0081\u0080\x1B\u00E7\u00DE\x10\x1EG\b\u00FA\u00A3\u00E7\u009B\u00E6\u00F2K\t:4\u00F1*\x17\bX\u00C8\u00D6\u00E8\x1D\u00DB\u00F1\u00F7\x1B\u0084\u00EFq\x0E\u00F7[\u0087\u00FD0>>b\u00EF\u00B8x\u0096\u008B\u00CE\x0E\u008B!\u009F\u0082\u0098\u00E5Y\u0088\x00\x1D\u00ED\u00D0\u0091\u00D1q\u00C6t\u00E1\u00E7\u0091qs\x10\u00D1\u0087\u0096\u00D3\u0091S\b\u00F1\u00BF\x0F\u008B\u00FD\x12\u00B1[\x1C\x1FD\x02jZ\u0095i\u00FEY\u00C0\u00B3\u00BD.\t\x02\u0096\u009Dg% \u00CD\u0091\x1D\u00B1\u009D/\u0088!hQ7\x04d\u0085\u00D9A\x02B\u009E\u0091\u00D7\r\x01\u00ED\u00FA\x0FA@\\Rp.xsy\u008D\u008D\x13\x16PK:\u0092\u00DF\u00D5\x02\u00DAI\u00F2f\u009C$\u00E0\x0F\u00C5\u00DC\x13\u00D0\u00AE\u00DF\u00EC\u00C2cZ\u00C0\u00F4\u00ADe\u00B2e\u00A0 \x1CB\u00B9\u00CC\u0087tD\u009EL7\x13\u0090\x05\u00FF\u008B10\u00AA\u00ED\u0089T\u00BER\u00C4\u0087\u00C7\u00CFUp\u00DE\x10\u00DF\u00E1h\u00AAO\x02*\u00F0\u009C'\u00BD~z\u00C8^*m\u00B6?\x04\u00DC'\t8\u00F9M\x0B\x01Y\u00A6\u00A2\bz\x03\u0095\u00D0\u00B4\u00F8\u00D1\u00DF\u00DD\x15oC\u008Cj\x12n\x7F\x00\u0089\u00AE\u00FA\u008EkS\u00B7$5\u0087|\x15\u00D2%\u0095\u00D4\u00D0\u00A1>\u00EA\u0091u\u00C1\u00B7>\u00E6@nXEU\u00BFW?o\u009B\u008FCz\u00E3E_q\r\t\u00BEU\u00C2E \u00E1\u00A5c\u0092\u00EB`\x07\u00F6\tZ\x00\u00E7Z\u008E\u00A8\x05\u00D2\x02F\u00F6,\u0090,:G\u0087\u00A3\u00BF\u00ED\x1C\u00BA\u00D6\u0091@\u00E6\u00BC\u00AA7\x1Dh%\u00E0\u00CE)b\u009EhX>\x02\u00FAA\u0088\u00F8B\u00B5\x18\u00BE\u00EA\u00E0=\x18yI?\u00DDM?\u008D\u008A\u00CB\r\x02r\u008B\u0083\u009ES\u00F6\u00FA\x12n\u008Dv\u0090\u0080\u00D0\u00D7\u00AAz \u00A0\u00A9\u00BC\x02g\x04\x01\u00B5\u00E4\b\x1B\x01\u00DD!\u00A6\u00CB\x05a\x01\u008B.\u00F1\u00CF\x02\u00DEj{NX\u00C0\u00BCk|[\u00C0\x07\u00AD\u00CE\u00B0h\u0092\u0080\u009B\u00CA\u008B;\u00E5\u00C3vK@;\x1A\x1A\x04|\u00C6/\x0B\u00F8\u00BE$ -\u00A0>\x1F\u00B9\u008A\u00AB\u008B\u00F9\u0099\x1D\u0091\u00A7$\x01\u00A3*I\x02\nh\u00C2\x02\u00D0\u0085\u00AB\x1E\u00D2\x07 \u00E9\u00A8\u00E4\u00F4T\x01\u00B1\u00B4,\u00CB^\u00F6N\u00C0\x1E\u00BF\u00A4p\x03\u009E\u0095Nk\u009C\u0082\u00B4{\x02\u009A\u00EE~\u00D0>\u00B9\b3\u00C5F@\x05\u00D1HX\u008B&\u00F0S\x14\u00EE\bH<\u00CF?N}q!\u00BE\u00B2\u00C4\u00DE\u009DC:\u0097\u00C6\u00A2C\u00C9\u00F9:\u0094\u00E5\x15-\u00DC7\u00DF\u00F6 ,o\u00DB+\u0082\u00F2\x1DF\u00EE\x1D\x1A\u00B0t\u008C\u00CEt\x1B\x10\u0090\u008D>4\u00B2\u0087\x18\u0082rQ\u0086\u00C3\u00D7W\u00A9c\u0094ICG\u00E1\u00D0h\u0091\u00C4\u00B9J^\x14\u00F3A\u00AEb\x1A\u0080\u00BC\x02\"\u00D6\u00B5\x13\u009A\u0083\x1D\rW\u0087\u00916\x1F\u00900\u00AE!W\u009B\u00E9\u00B8\u00CEa%\u00BFid\u0087\u00B8_\u00B3\u00B5:6X\x0EA\u00ABN-\u00E1\u0097\x05<\u00DD[Z\u00C0\u0088\u00B9\u00BE\tx\u00A5\u00AB$`\u00B1%\u00A5=\x13\u00D0t;:\x01\u00F3y#\u00A0\u00D2'\x01\u00F1<\x04\x01C\x14\x01\t\u00FA\u008E\u00BA\u00D6\u0090\r\r\u00E3\u009F\u0088\u00B7!\u00F6\x16\u00F5\u008F\u0080M/<\x12oCl/\u009D\u00D5\u00B9\b\u00A3\u0089\u00E1\u00C5\u008B\u00F2\u0087\x13\u00AD\x14\x01\u00A3+e7\b\u00F8\u00F1_i|\x16\u00F4\u00B2\u00A9\u008B\x13\u00BF\u00C5\x0F\x0EQ\u00F8\u00CE _/B\u00C3p\u0084\u00F8\"\u00A0By\u0084K\u00C8#en]\u00B9\nj\x1E\x0E\u00EB\x10r\u0084\u0081\u00FB\x15\x01\x1B\u00BA% \u00EFA\u00F6\u00D4\u0080\u00A9\u00D6b1\x1Fty\x00\u00E3\u00B6'U\u0081>\u00E7I\x02\u00D4\u00C75\u00D8\t\u00B03\u00A8.\u00A5\u0080\u0094\x13\u00B7\u0091\u00E6\u0090\u0091~\u00B5\u00EB\u00D1pi\u00F19r\u00E0\u00ABMNp3\\\u00A2\u00B8E\x0E@\u009F\x0F\u0098\u00C7\u0099\u00CF<(\u00D3\u00F7\u0094\x1D\u0099~\r\x1D\u00EC _\u0088\u00EC.\t\u00A8@\x17;\x03\u00D0\u00E7\u0090\u0090\u00C3J\u00CB\u00B7mT>x.\x16\u0088\x11\u0082\u00ED\x1A\u009C\u00D7\u00B3^vB\u00CE!6-\u00F4Y\x04\x03B_\u00DEC\u00D1\u00DAc\u008A\u00D2)\x00\u00F5+\x17\u00D0\u0094\u009C\x7Fu\u00F7F\x01\u009D\u0080\u00D5\u00FE#\x01\u00CB\u00CD-\u00E9\u0099\u0080\u00AA\x1EI@<\u00A7\u00A0\u00E2\u008B\u00BD\x10\u00D0\u0084\u009B\u009FI\x02>\u00BB\u00BA\u00ACO\x0Bx?\u00D2i\x01slt\x12\u0090\u00B0\u00D5\u009B\x15\r\u00AE>\u00C9\u0083B=\u0084R\u00E0\u00BE\"\u00BE\t\u00D8\u00F8\u00E2#\u00EAs\x1E\u0091\u00B6\u00A3\u00B4\\\x05mv.\u00A3\u00D2\u00F6\u00B2\u0081'?8\u0093Q\r\u00F2\x11[\u00CA\x05\u00B2w\x17h\u00F9O\u00BAp\x17\u00DAP\u00D1\u0085\u0080\r ?\u00BC\u00B6J\u0090\u00B1\u00AA\u00D7\u00EEX*\x171\u00E8\u00CE\u00C5\u00DE\u00A4\x12z\u00C6\u00F3 \u00A2\u00C7\r\u00D0\u00EE??\u00A4~g\u00E8>\u0099W;d\x1A\u0089\u00D7\u00FB\u00F0\u0083\x12s^\u00B3n\u00D6\x13\x03\x0E\u00DC\u00E7G\u00ADH\u00D2\u00ACS\u00DF\x10\u00DB\x10n1lW\u00F2\u00BF\u00D016\u00B0YP\u0090\u00A5\u00EAW\u008D\u00C3\u00FF\x14\n\u00C0\u00D8o\u00EE>\u008B\u00B2\u00BD\u008D\u00E3#\u00F1p\u0085%p\u00EAk\u00F48\u0099\r\u00F9\n\u009B\u009C_\u009F{\u00A5o\u00AB<1\u00B3\u00A3\x13\u00F9U\u00B9\u00C4,\u0098\u00EA@\u00E70\u00D2\u0082\u0084N}m\f\u0086\u00A3\u00A3\x16\u00AF\u00BA\u00CD\u00B7\u00F0_\u0091r\u00B5\u00B1\u00CD\u00D5Y\u00CD\u00F1^\u0087N\u00CF\x19\u00E4Z\u00B5(\u00A1\x03d\u00FC\u00B8\u0096\u00D0\u0091y\t\u00FD\u00F0\u00D6\u008A\u0084\x1B\u00E7%\u00BC\u008D\u00FB\u00D8\u00E5\u00BC\u0086\u00C8\u00AB=\u00E2]\u0090s\u00AEs\u00DE$g\u00BC\x18sBZ]\u0081\u009D\u0093\u00AE\u00F6\u0082|\u008E^\x0E\x021=\u0090\x1A7\x1CVx\u00BF\u00DE\u00E9\x1D\x18\x13\u00C7/\u00BD\u00FD\u008B@\u00972\u00E8\x18\u00FA\u0083\x11/C@\u00C7\u00A3\u00EEE^\u00EBz\u00CD\t\u00C5\u00C5b\u00D2\u00D1\u00A1W\u00D8\u00B6\u0098\u00A7\u00F6\u00D2\x14I\u00C0\x13\x03/\u00D3\u00F1c\u0090I_\u00DE\x1F\u00F3\u0095\x1F\x06\u00E3\u00A6=\u00BD`\u00902\u00E4\u00E6\u00FC\u00F9\u00FC\u0098\u00A6\u0091y\u0084\u0098N\n\u00CAk\x06\nJ\u00C7\u00D0\x17\u00BF\u0085\u009Cys?/\x13\u00F1\x13=_y\r\u00EA8\x1E\u00E7^\x17!Gn\u00C0\u00BD\u00C83,;\u00E5I97\u0094C\u00CA\u008A,u\x132\u0085\u00DB\u009AP\u0092\u008A*-t\u00E9\u00F3\u00C6\u00CF\b\u008A\u00CDO\u0093\\\u00A5\x11DZV\x1CP\x1C1?\x05\u00A7\u00DC\u00DC\u0084\u00BC<\u00D2\u00A7Q@\u0092\u00E70\u00D2\u008D!OF\u009A\x13\u00DF\u00E7 W\u009F\u008E\x13\u00BA\u00D4\u00E1J\u009AtEs\u00CA\x19\u00D8\u00DB\u00DE0\u00C9\u0085\u008B\x1B\u0082pq\u0083\\^O\\W\x04\u00FAH\u00CEG\u00DC\x13\x15\u00AD\u00BB\u00BBI\u00B75U6q\u008E\u0094\u00F3\x0BZl*l\u00FC\u00AE\u0095\u00EF\u00D4\u00E7\u00C2\x06\u00BD}\u00D41q=zx\u00C8\u0087,\x1F\u00BC\u00EE\u00F3(t\u00ACyi\x1Cb\u0093\u00F0\x03\u009Drq\x7F\x0B\u0090\x1E\u00A3\u00F4\u008B \u00CD\u00CF7\u00B2\u00C3\u00E1G\u00A6\u00EA\u00C8sqL\u00EA\u00F7C:\n\u00F2\u00BF\x10\u0093\u00B0\u0080\u00C8\u0083\r\u00E2=\u00C8OPf\u0092\u00F3\u00D3\u008F\u00E2\u00DB5R.\x0E\u00F0\u00ABut\u00BD\u00D3\u00CB\u00B6\x15r~bC\u00E98X_\u00B5\x11\u00E3\u00F9kt\u00A1\u00E37~\u00E8G\u00AA\u0097\u00F9$\u00D2|\u009FR\u00DE\x1F:\x1C\u00A4\u00BB3o]\x07r\u0092j\u0098\u00D27\u00CB7 ]\u00CFF\u00B6\u00CF\x11\u00F3\x0B\x06\u00DF\b]q\u008E\b\u00FC\u00A6\u00D0{\u00F2\x1A\u009Ax\u00FE\u0090\u00A9\u00E7\u00CF\u00BC\u00B4\u00FAHG\u009B\u00F4u\u00B9\u0091v\u00CA\u00F1\u00C7H[\u00E5\u008C\u00C51\u009Frg\u00D9|\u00C8YF\u00B45!\u0097\u00EE\u009C\u00F2\u00A5m\u00A9k9W\u00A6\u00DD\x02V\u0090\u00BDC\u00BE\u00FD\u0085\u009Fq\u00FB\u00A52;`\x059\x04\r\u00FE\u00B6T6\u008B\u00DBR\u00F3\u00B3\x19\u0095\u00B6E\x04\u009E\u00E4J\u00DCGg\x1E\r\u00C7\u00CD=\u00C4\u0085g#p\x7F,`C\u0085\u00EC\u00C2]\u00A8\u00F5I\u00E5\u008A\x06\u00A2\u00AE{\u00D1i\x01\u0089\u00CF\u008E\u00A7\u00B2\u00E1\u0087\u00AF|)\u00D8\u00F2\u00F9\u00BDN\u00BF\u00A7\b\u00A7\u00EF%5\u00AD\x16\u00B1\u00DB/\x0F\u00E9.T\x03a(\u00AC \u00B7\r\u00C00\u00F7\u0096\u00B0\u00FF\u0081\u00FB\u009C\x1B\u00D1W\u00F1\u00EE\u00B47r\u00B9\x1DV\u00B0\u00EC\u00C3\u00F7\u00DC+\x0B\u009D\u00B3\b\x02\u008C\u00CD\u0095\u00EF[\u00AE\u00EDA\u00BA1\u00E4K\x10\u00B73\u00C9\u00A9\u00D3\u00A6_\u00AB<Q\u00B0\u0082\u00F4y,\u00D8\u00A7M^\u00F1\u00C0\u00E6\u00AE\u00BD\u00BD\x1B\u00FAoQW\x04>a6~\u00CD\u00F1;\u00E4w\x11\u00B3\u00CEt\u00F9\u0095N\x1D\u009F\x13sP3`\tYG\u00BF:\u00CB#\u00AE\u00F7G\u009B\x1E\x05\u00F8N'\u00F7\x07\u00DF\u00C5\u00B1\u00EF\u0095\\6\b\u00CD\u00F1%\u00D23\u0090~\u00AEy\u00DF\x02q\u00DF\u00CC\u00B8.\u00CA\u00C1\u00CBH\x1D\r\u00BD\u00BF#\x7F\u00E3\u00C1\u0085\u00C5\u00B3\u0083%\u00DC\u0088\u00DF-\u00F4\u0086+u\x1C\u00EF\u00BF9\u00AC\u00C8\x0E\x1E7\u00E3\u00E0Wq\u00BF\u00E08\u00BFB \u00AE\u00A5\u00F4k#]\x02\u00F1:\u009B|C\u00CD\u0089\u00C5#a\x05\u00F9\u00BAX\u00D8\u00CB\u0093KX\u009E\u00FF\u009F\x03/\x17\u0082\u00BC\u00A1I_\u009D\u00AB\u00F1S\x1Dtw\u00BC\u00EF\u0094;\u00CBF\u0098\u00E4Y\x11\u0087\"\u00886d\u0092\x1Bi\u00A7\\\u0094\u008D\u00EE\u0090\u00ECl\u00E9i\u00A3_O\x1E7\u00F4\x1CO\u00C2\u00D7G\u00ACKn-\u00E7\u0080\u0090\x07\u00E4\u008A.\u00E7\u00F1s\u008D<\u00CF\x05\u00AF_\u00CB\u00C4E4\u008E\u008F\u00B3\u00ED/\u00F2\u008CO\x1F\u00B9\u00F7.\u0081\u0080r\u00A8\u0090\u00F3\u00DB\u00D2\u00D9,\u00FAf\x12\u00B68\u00F3(\x0F*\u0099\x1B\u00DA\u008D6\u0096\x0F\u008C\u008B\u00FC'#Ot\u0085\u00C0\u00C46\u00A7\u00E8^'\u00DF\u0086X_\u00D9J\u00C0\u00B6$ \u00CA\u0089\u00BC\u0083@B\u0097\u00B2t\u00FEM\x12q\u00F1+\u0092\u0088$ \u00A2\x14\u00C8v\"L\x06\t\u00B9\u00A8\u00E3\u0096\u0084\u00FD\x7F\x04\x015\u00B1 \u00C0aK\x06H\u00E8\u00D6\u0091@\u0091\u0090C\u00CC]\b\u00B2\u00D2\u009C\x0FE\u00AFx\u00AB\\\u00FDFL\u008B\u00B6\x1A\x07z\x0F\u00F9 w\u00C6\u00D4\u00CDI?B\u00CE\x1E\\\u00E9\u00E0\x0F\x1A%\u00D2\u00EC\u00F5Y\u00E79AB\u00D1\u0091\u0081\u0084g\u00F0\u009Bo\u009EH]y\u00BD\x12\u00D0\u00E7\u00C7j\u00AD\u00C4B\u00DDu\u00EC\u00F8\\=\u009Eg\u00C6\u00EAE\t\x1F@\x7F\u008B\u00D0\u00C3oU\u00B6\u00AD !W_IBEt\u00A3\u00CC$w\x05\u009C\u0093\u0084\u00B2\u00856\u00EF[0\x01$\u00E4\u00A7\x17\u00FB\u00F38\u008B\u00AB\x1A\u00E8\u0087 \u00E1V\u00E6\u00B1k\u00D2U\u00BE\u008EU\u00DD\u00DCp\u00A1_\x15$\x14\u00C3t\u00D6\u009F\u008ECc\u00E2\u00E9@O\x07h\u00F1[\u00E9\u00D3!\u00A3\x0Bd\x13\u00F9\u00DB$\u009F\u008A\u0080\u00D1\u0083&|A\u00ABO.\u00E1\u00B3-\u009E\u00EA{Il\u00C4C?\u00FC\u0085\u00D9%\u00BD\u00EA_\u00ECv\u0091\u00A3\x16\u00E1\x0B\u00FA\u00FC\u00C2\u00D2>\u00F3\u00BE\u00DE\u00FE\u009C\u00F2\x05u\u00E4\u00C8\u00BF\u00B2\u00ACW\u00FD\u00E46\u0098\x03\u00CA\x11\x16\u00DD?s\u0083\u0084\x1E\u00F5\u00B9(bA}\x10\x10\u00D5\x16x\u00A0\u00B0\x7F\u008B0\u00EF]\u0092\u00AB\u00A0\u00DF\u0095\u00F2\u00ED\t\x03p\u00E8\u00B8\x06\u00F1`\u00F9\x13\x16\u00F0\x1F\u00DE\u0093t\u00C6v!\u00E0\tI\u00C0U\u00D5\u0082=.\u00C2\u00C0\n\n_\u00D3\u00AE\u00FFK\u00C9\u00F3\u00F9\u00FF\f\x02\u00F2\x0Bi\u008Fu\x02\u00EA\u0080\u00DC@?\x10\x10Q\u00C8\u00F4\x06\u00B9do)\u00C5\u009E\u00A1\u0099V)\u009D\u00FA\u00F4\x0B\u00E4$^N\u00E4\u0085\u00DCt\x11\u00F9\u00EE$\u00B7\x18F\u0091\u0080Bb[\u00D5$\u0090\x17\u00DD\u00F2\x02\u00FBD\u00E61<a\u00E6\u00AE\u00BB\u00CD\u00E1\u00B1\u00B1\x10\u00A4p\u00EF\u00F3\u00CF\u009E\u00E5P\u00B1\u00AC\u00FAm\u0086\u00BE`#\x1A\u00BD\x1E\u0080\x12,\u00AB*\u00AF\x0E\u00A1\x1B=\u00EFF}\u00C8a\u00E1LeF#\u00C3\u00DF\u00E5\u0090oFz\u00DD\u00F6\u0099\u00D7\u00BF\u00C7\u00EFF\u00FAm\u0089|d\u00BA:\u00F3\u0087\x15d\u009D\u00F3\u00ED\x19s\u00FD\u00D2\u00C3\u00E9\u00B4J\x1B88&\u009E\u00AE\u0082\u00C6\x17\u00DF\u0095\u00FE\u00AD:c\u008B\u00F1\u00CBr\u00C6\u00CA\u00B9)\x1FZ>\u00ED\u00E5I\u00FE-\u00C2\u009C\u00ECwY,\u00C2T\u0098\u00E5e\x11F\u00E1b\u00F7\u008B\u0081\u00C8:\u00A8\u00E4B\u00FF\x16a\u00AEw8/\u00F6\x01\x0B\u00AC\u00F4\u00BD\bs\u00B7\u00CDYI@\u00CC\x01C\u00A31\x07t\u00DE\u008F[XHX\u00FF:, \x1A\u00C3\u008F\u0085\u00FC#\u00E0\u00BB\u0097I@-\u00ED\u00FB\u0092^\t\u00C8\x06\u00C6\u00A1\u00A8X\x05E\u00E0\u00EBL\x15Z\u00FD\u009B!\x17h\u00D0\u00C3\u00E1\u008F\x0B\x01?=\u0091&\u00F6\x01u\x02\u008A\u0087\u00EF\x01\u00B0\u0082 \u00A2F}\u00EArC},\u00F4\x07\u00F2\u0098\x0E\u00D5 o0\u00EEw\u00F0\u0081 \u00E0\u008C\u00D7=/\u00C2\u0098\x01+\u00C8\u00BC-\u00FB`,8\u00AE1aT\u00E3\u00B0\u00B0QM\u00C2y_\u00FB\u00A4\\\u0096U\u00957\u00DF\u00D0\u00E6\u00E1\u00C6\u00D7\u00B4\u00A7nI\u00E2\u009B\x0FE\u009D\x0F\x05\t\u00CD\u00C1!\u00DD\u00C3~\u00AD\u00F3\u008A/\u00CB\x19\u00C0\\\x1A\x7F\u00D9K\x0B5\u0085\u0098\u0085+oq\u00C5\u0094\u00EF\x10*\u00B9:\u0088\u00B9\u00AEL8\u00B1z\u00F1M6\x06\u00FB>#!\u0086\u00BB\x00\u00BF\u00EEf\u00AF[\u00EE1\u00BE\u0085\u00C0a\u00EA\x1B\u008C\x11L\u008E\u00E7\u00E2\u00BE\x19j\u00EE\u009Cr\u008D\x04\u00A4\u00A3\u00BA\u0093X2\u00BA\u00FA\u00E6\u00F0\"\u0096\u00C6zpl<\u00EB\u009C\u008E\x00\u0088\u009D\x05\u0081\u00BE^n\u00EB\u0096\u008B\u008Cb^\u009EX\u00CCo\x02\u00E2\u009C\u00E4\u008A~\x10\u00F0\x02\t\u0088\u0091U\u00A9\u00AF\x15\x01\u009D\u00C5q\u008Bk  \x1APF\u0081\x15\u008A\u0080^\u00F4\u0093>\x06\x01\u00D5*hh\u0094\u00EB\"\u008C\x1D\u00E9\x1F\u009E\x0E2HX\x0F\x04D\x04\x02\x06\u00F8\u00D50\u00DF\x11\x04t\u00F8\"\u00A0\x03C\u00D1\u0087\x1F\u009C\x11_u\x0B\u00DBT.[\x12\u0086\u00A1\\\u00A6o\u008D\u0092\u008EA\u00A8\x15U10e}\u00C5\u00ECV\x02\u00FE)\t\u00B8\u00BA\u00AAg\x0BhFW\u00F9\x06=\x17m\u00D8\u00808D\u00A2[T\x02\x1B\u00B59\u00CC\u00AE\u00973\u00AD\u00DF\u00A1\u0087l\x04!3\u00ED\x04\u00F4P]_\u00EE\x16\x04\u00E4J\x18_XuB\u00A6\u0085EQ\x04\u00E7\u00FE\u00A5\u00F8\u00FF#t\u00A0\u00D1\u00B7\u009B\u00B4\u00EDn\x05S\u00E6l\u00CC$\u00A2\x197\u00FBE\u00E6u\u00E7\u008Cm\u00CC\u00EF\u00A4\u00BE\u00C8\u0083\u00FF\x17\x03\u00EB[t\b\u0094\u009B\u00F2\u00D2\u0089%\u00B0z\t\b(\u00B7\"\u009C\u00EF\u008B\"\x0F\u00A5\x1F\x1F5\u00EF\x06\x17bH6\x01S>\u00A6\u00E2\u008A{p\x1E3\u00C9\u0091~\x19r\u0096\u00C5\u00E2\u00CA\u00C74\u00E4\u0096\u00B2\u00FCH\x02\u00F2\u00BF\x03P~\u00B76}\u00F7[.2\x1F\u00B7\x1B\u00F5v\u00FC\u00DD_Z\u00C0\u008A3\u009F\u00F7I\u00C0\u00F3=h\x01I\u00C0R\u0086\x054\u00EE\u00CF\r\u00AEv\x04\x01q\u009F\x05u\x02\x02\u009E\u00F4\u009D\x04\u00D4\u0092\u00C2L\x04\u00F4\u00A4O\x02\u00A2~\u00B3\n\x12\u00D6\u00BB!\tx\u00B0\u00A0\u0095\u0080\u009EN~\u00E7\u008A$\u00E0\u00CE\u00E7M\u00FB\u0080\u0080;}\x12\x10\u00F2\u00B0-\u00E5\x03\u00C5\u0097\u00B1\x196V\u00C8\u009E\u0080Jn\u008A\u00C3S0\x1F4\u00B6,\u0088O\x14\x01\u00D7T\r\u00B2\x12\u00D0\u00FC\u0080L\u00E8\"\t\u00C8\u00BD0\u00CE\u009D\u00F8\u0081\u00A6\u00A1\x0Bj\u00E7\x10^\x1Ev\u00F49$-\u00E0\u00CC\u00FA\u00FEY\u00C0/\u0084\x05\u00D42\u00C7\u00BF\x1D\u00C6\x07 \u00DE\u009E\u00B0\u00DD\u00A31\x04\x1C\u00D1$\u008C\u00C3b\u00CB\u0097\u00B2\x01\u00AE\x00\u00F3\u0083P:\u00DC\r\u00B9,\x1D\u0090I\u00DE\u00C6|\u00CF\u008A\f1]?\u00CB\u00F7\br\u00A7\u00D5\u0090r\u00C2(\u00CB*\x12Ps\u0084\u00B6\u00ED\"\u00B6*\u00DC5n\u00EA\x0EF\u00DAy;*\x1F\u008B\u00C0\x04\u00A7\u00DC\x00\u00EB\u009D[$.\u00AE|@,;&\u0086\u00FDc\u00E3D\u009D\u00D7\x1FY\u0084u.\u00DF@\u00B1\"\u0086z\u0090s5\u00DB\f\u00B6-\u00E9(\u00E0\x05\x7F)\x02V\u00B2\x13\u00D0Z|\x01\x12\x10\u00F5\x18Tz\u0081\u0093\u0080\u00DE@\x02B?\u00A3\u00D0\u00F22>\u0087\u00A0\u0089\u009FH\x02B?)|\u00BDo\x0B\u0098\u00F6\u00D1iz\x14e\r\u00DCZ\u00FEA\u00C0k\u008A\u0080\u0087l\x04\u00F4\u0084\u00B7\x15\x01w\u00D9\b\u00E8\x0E\u00CD\u00CFJ\x0B\u00B8\u00A5\\\u00A0\u00D3\x13F!\u00BAB\u00E0eD$`\u00AF\u008FO\u00A6\u00CFm\u00F3wZ.\u00BEC\u0088\u00DFYV\u00BF\u0098\u00DD\u00A7\x05\u00E4\u0083\u00EB\u00FC\u009B  \u00BDr\u00E8\u00DC\u00BC\x11\u00A1\u00E3\u00D7\u00B5r\u00D8\u0089 \u00A0\x13pV\u00FD\u009C\x1E\u00EE\u00D3Zo$ j5s\u0082$ a\u00B8T\x19\u008DEs\\P)\u00C7\u00B8\x1D\u00C9ah\u00F9|\u0093\u00DF\u009A\u0095\u00E6\u00F8\x14\u00FA\u00F2cO\u009A\u00F8F\u008D\x01\u0095\u00CF\x0B3\u00A3\u00EE\u00BC\u00A67Z*a>\u00C8}7~\b\u00CB\x0E1\u00B4\x07\u00DC\u00CD+E\u00C3_\u00A1,\u00A0\" \u00E5\u00F6y%\x1B+W\u00A6\u00C5\u008B\u00C9\u00A6\u00C2\u00D2\u00C7\u0093\u0084\u00E2\x1CR\u00C4\bt*\u00E0B\x10\u00D3k\u0084\u00BE\u00F5\u00DE\u00F8~aQ2\u00DE&\x17\x1D\u00C2\u0081q\u00D2\x026\x18YT\u00FF\u00DE\u0090(7\u00F31u6\u00F1\u00BF\u008C\u0088\u0083\\\u00E3\u0090\u00DE,\u008F\u00AB1\u00B1\u00B8\u00F8\u00D8\x16a\u0092\x1B\u00F8k\u0080\x1C\u0082V\u009E\u00E1j\x01\u00E5YN\u009C\u00EB)-\u00A0\u00BF\x04\u008C\u00EF$-\u00A0?\x04\u00BC\u00A3\b\u0088\x00\x02F\u00B8)\u00A9\x15\u00A9$ ,`\u00F6-\u00E5\u00C5\x0B\u00CD$I\u00E0\u00A1\x02\u00FE\x11\u00F0\u00AD\x18E\u00C0\x12\x1E\bh\u00BA\u00BCN@\u0084\u00EE\x1F\u009E\u00CE\u00E0\x07z]\u00A19n\u00E1\x0F\u00B7\x10.\u00A2\u0092\u00E9\u00CC\u00CC\x0F(\u00B1\u00B2|\u00A2\u00CB\u00EF\u00A9\u00FC<\x02\u00BF]\u00FA\x0BZ/=S\u00EA\u00F0#\u00BF\u00E2\u00A0\u0082\u00DE\u00B0{\x1F~\u00C0\x17k'A?\u00C4\u00D9\u00D8\u009D`\r\u009A\x1F\u00DA\u00D0\x1F\u00E4\x10t\u00C2[\u00A1\u00E2\x01\f\u00DB\u0095\u00CC\u00DFv\x02\u00DD\u00C5|P\u00FCW]c\u00BFM\u00E6}\u00DE\x1B\u00D64\u009C\u00FB\u00A0|\u00A5\u00C9\f\u00AE\u00BE\u00D2Y\u009B`G\u00A0 \u00CB\x00}\u00FA\u00B6\u00EE\u009B\x1D\u0095xbNT\"?\u008Fx\x1C\u0087\u00E8\u00C8\u00CC\x11\u0084\u00A5N\u0091\u0096{M\u0086uS\x075Gz\u00FB\u008E\u00CF\u00FE\u00BBr\u00E9-a\x01\u00DBu\u00C9/|A\u00D7,\u00BAIG\u00F7|\u00CC\u00C7\u00D4\u00889\n\u00E1wUE\u00F6&\u00F9\u00A2\u008F\u00FA\x14\u008C\u00F9\u00B0o\u00C1\u0098\x0F\u00FA1\x14\"\u0091\u00E2\u009B\r(\x14\u00D3t@A\u00A6\u00E5\u00FFX\u00C5?N\u0090\u0084\u0082\u00E46y\u00DC\u00FE\u00F1WE\u00A7\u00D7`\u0084\u00B0\u0080:H6\u00954\u00CE\u00E1=9}h\x01%7,\u00BB;\u00FC9PZ@w\x04\u00B4\u00E3,\t\b\x0BXf\u00BE\x7F\x04\u008C#\x01a\x01\x0B/\u00F3\u0083\u0080\u009F\u009Ee7!\u00DE@\u00CA\u00BD\u00CE\x0F\x02\u00B6\u00C0\x10\x14\u00CF<H\x11\u0090\b8\u00EC\u008D\u0080\u00A6,I@\u009C\u009C\u00B6\u00DB\x13\x01MhvN\x12pk\u00D9l\u00B4\u0080\u00FCz\u00F5\x00\u00CA\u00CD\u00D0{\u00B8\u00A8JA\u009C#\u00F2\r\u00817 \u00E1|\u00E9\u0097\u00B6\x7F\u00A6ok{\"\u00B5\u00F7g\u00C7S\u00EB\u00B5;\u0096Z\u00B2\u00FD\u00B1\u00D4\u00FC\u0090\x17\u00E9p4\u00A5F\u00C7\u00A3)\u00ED:\u00FD\u009E\u00C2\u00FF7\u0082\r\u00F6u\u00C8?Y\u00F8JH\u00B7\u0085\u00AF\u00E6\x10o'\u00E8\u0090\u00B9\u0083\u00D5?q\x0E\u00E8\u00A0_$7\u00C8\u009F\u00E3u\u00F5k\x1B0\u00DD\u00E7\x10E\u00C0\u0089\u008A\u0080\x04\u00B4_\u0080\u008E\u0093@\u0092\u00C4\u00A2\u0091\u008CQ\x04\x1C\u00DE4L\u00CFe\u00BD\u00C8\u00DD\u00FC84a\u00F1\u0099\u008F\u00F0<1\u00E0L\u00F3\u00BE\u00F9\u00D2/_\u00EF\u00D1\u00C9.\u00FF/>\u00914\x14//^u\u009B\u00BE\u0096\u00FC\u00DF\u00A8\u00CC\u0088Y\u00B1\u008C\u00FF\t\x15\b\u00D8\u00F9Y\u00B3+\u009A\u00C9\u00C7\u00D3\x18{\u00B2\u009E\u00B8zl\x00r\u00CE\u00BD\u00A2\u00E4/'l\u00D7\u00A0\u00FB\u009FH\u0098\u00EE\u0081\u00FF\u00A5\u009Bai)W\u00E7\u00C4C\x1E\u00D2`\u00B8\u0085\u0080\x04\u00AD\u00AA\x13R\u009F$,\u00EBA\u00EE\x16\u0082\u0080\u009A#\u00F9\u00C5\u00E9~\x10\u00B0\x17\u0086\u00A0\u00B0\u0080e\u00FD%`g\u00B9\nZ\u00C4\x0F\x02\u00DE\x06\x01\x11\t\x0B\u0098\u00C7\x0F\x02\u00A6\u0080\u0080\u0088\u00B2\x06mv\x12\u0090\x10sB_h\x14+-\u00E0\u00EE\u00E2\u00BE\t\u00F8\u00FE9\u00B9\n\u00BA-B\u00CD\x01\u00A5\u00D8-x\u00AC\u00F5\u00DFr\b\u00BA\u00EE\u00C5\u00A0\u00ABk_\f\u00E2\u00E7\u00E7+@>\x16\u0095\u00CC|>E\u0098\u008F\u00F4&\u00C4s \u00EF\u008D4W\u00FB\u00B8\u00CDQyq\u00CD\u0090n\u008B^\tAW\u00E4\u00EE*\u00B0\u0080  \x1A\x06-\u0091e\u00DE\u00E5\tC\u00F6\u00CA!\u00E8\u00A4FN\x02*\u0088e~\x1Bb\u00C7|\u00C7!\u00A8\u00E3\u00DE\u00C8\u00A6\u00E1\u009A\u0089\u00DC,\u009Bx{B\u009E#\u009E\u00CD\x0BS\u00B7$5BL+\u00C9}9\u00B70\u00C9\u00B9\u00EF\u00C6W\u0083\x04T\u00A3\u00E7_z\x1E\x19\u00DB\x13\u00A6F\x1F\x07yh\u00BBN\x16\x02\x12\u00EE\u00E6\u0083\u00EC48LtBs,m\u00D1\u00A7\u00A0\u00ABs\u00BB\u00D2\u00D91\u00FD:-\u00C3A$\u008Dz\u00E4u\x118\u00BC4V_u@\u009E\u00F0\u00C6\u00F0\u00C2.\u009D\u00BB\u00D27\u0083W\u00A0\x17\u0092;\u00C7~\x17\u00F7B\u00E2\u00C4\u00A0+\u00C2\x02V\u00F1\u0083\u0080gz]\x12C\u00D0\u00B2\u00F3\u00BC\x13P\u00EFTbA@\u0094(\u00A3\u00C8R\u00EF\x04\u00A4\u00FE\u00AD\u00B6\u00FC\u00F8\u009B\u00B4\u0080y\u00D6z' \u00F5\x1F\u00B6\u0094\x04\f\u00DEd% \u00E1\u0095\u0084\u00BC\u00CA\u009B\u00B1O\x04\x01\u00F7\u00F8A@\u00E8\u00E3\u009F\x16\u00B6\u00BD\u00ACu\x0E\ba\u00CE\x16\u00FF\u00A6_ch\u00F9O\u00FA4%&\u00D8KeY_\u00D9\u00B9\b#\u00FF\u00D3\u0097\u00A0\u00E3\u00AB\u00AB\x05\u00CFZU-\u00B8\u00D3\u00CA\u0097\u0082\u00DFYQ=\u0098_\u00A9\u00A65\u00EB\x06\u00FDQKk\u0084\u00EC]R3\u00C4WO\u00C5\u00E5uZ\x13vW\u0096\u009E\u00DF-\u00E8\u00A3\u00E9\u009E\u0080\u0084x!\x19\u0095\u00C9\u0087\u00C9@\x17+\u00CE\x07\u00EF\u008DhbX@\u0081a\u00CDr\u00B3\u00F1\u00D1\u00C9\u009C\u00C4H\u00C6\u00B5\u00A9\u00CF!\u00E0;\x03?\u00CA\u00CDU\u00D0\u0096H\u00CF\u0086\x1CCq\u00C0|6\u00DD\u00F9$\u0089\u00F9^\u009Fu\u00C1\x06\u00D7\u00FC\u00BC\u00DD\u00B3\u00CC\u009Be\u00E1\u00B6\x07\u00F3\u00E5\x03\u00A5\t<\u00DF\u00DE\u0095\u0080<\u0087\r\u0096\u00DFc\u00E5y\f\u00F4\u00DA`OOk(\u00CB%\u009D\u00AA\u00E9\\\u00ED\x16\u00DFL\u00BFF\u00FD\u0094&\x03\x0BR\u009F\u009D\b\u00F7\u00EE\u0098f\x1Eq\x18\u00FFr\u00CB\u0084\u00CF\u009B\u00F7v\x17\u00F7\u00C3\x11\u00C2\x1Fz\u00A7\u00A4w\u0090\x07G\u00C7\u0091\u00FCt\f\u00A6\u00A7\t\u00CB\u00CD\u00CD\u00EB\x7F\u0091F\u00B9\u00C4K\u00DBt\u00A5\u00A3\u009Cy\u00F3\x0B\u00E4\u0096\u00FF\u008D\u008A8N\x02\u00A2N\u00ABL\u00F3M@\u0080#\u0097\u00A0\u0088\u00B9\u00FEY\u00C0\u00D8.\x17\u00C4\x1C\u00B0\u00A8\x0F\x02\u00EA\u00C0}\x0B\x0B\u0098\u00D7\x07\x01\x158\u00D2\u00C9\x1A\u00E2\u0086\u0080D\u0096z72\u00A5O\u00A0\u00C8\nC\x16\u0095f\u00D5!\u00A6o\"*X\u00E3W\u00BA\u00CCr\x11\u00DC\u00E8\u00D3\x13B|N\x0F\u0087\u00F4c\u00F4\u0090\t\u00A7\u0087\x04\x7F\x03\u00F4\u00DE\x18\u0089\u00C0\u00D7\u0091\u00E8.v\x07\u00A1\x00\x0F\u00F0\u00B8\b\u00A6|Mr\u00BE\u00AD\u00CE\x07E\x1FIq=y\r9\u00CC\u0082\u008C^\x12\u00F2CIR\u00DE\x02\u00E9\u00D1B\u00D7\u00A9\u00DF\fr\u00F11^\u00AB\\\u00A3\u00C7\x0F\u009B\x0B\u00F30\u00CB\u008D\u00B4Y\u008E<\u008A /\u00E3\u00BF\u00A8\u0096ru\x7F\u0086\u008EE\u00CE\u00BDA\u00E3\u00F3{\u00AA\u00CC\u00FC:\x19\u0087\u00B9\u00F4\x16\u00A1GH\x12\u00E4t\u00B5\u00A7\u00B3/\u00D2b\x01\u0085\u009E1\u00FC\u00D2\x1C\x1D\n\u00E8y!\x1C\x0B\u00E45T\u00D9\u00A4\u00AF\u00A9\u00F0\u00BF\u00B5\u00C9\u008Dr\u0098\u00E4\x1C\x19ph\x7FM\u00CAE9\\\u00F4Y>\x02i\u00FA<\u00F2\u00CBO\u00B2\u00CE\u009Dr\x19DZ^O\u00C9-\u00BE\u00B9&\u00B9\f\u00D6\u00B2\u00D1\u00B5\u008C\u00EE_\x185X\u00E4\u00B2\u00BC\"m\u0091s\u008B\b\u00E5\u00D6\u00C4[\u00E8\u00AE\u00FA\u00D0\u00B5\u00CA\u00F9\x19C\f\u008B]\u00E4B\u00D7y\r\x11\u00F3\u0093\u0097\u00F7q=\u00FE\x1F\u0097f\u00B9J\u00E3\u008FUN\u009FZ\u00BE\u009Ag\u0097#8\u00AF'\u008E\u0089\u00E7\u00AC\u0089\u00FF\u00BA\u00DB&\u0097\u00BA\u00FC\u00FD\x14O\u00F1\x14O\u00F1\x14O\u00F1\x14O\u00F1\x14O\u00F1\x14O\u00F1\x14\u00FFO\u00E1p\u00FC\x1FM\u009Cje'\u00F9\x1B\u0090\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var imageLogo = contentLogo.add("image",undefined,ScriptUI.newImage (createResourceFile ("Yan-KRanAni3.png", imageLogoImage, getResourceFolder())) );
			
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
		btnApplyImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00P\x00\x00\x00#\b\x06\x00\x00\x00\x03\u00A7\u008D\u00C2\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x03\u00DDIDAThC\u00ED\u009AY\u00A8MQ\x1C\u0087\u00EF\u0095\u00B9L\u00B9)Q\u00A6\u008C\u00E1\u0081d\u0096B\u00C8<$\"\"R<)\u00F1\u00A0\f\x0F\u00847\u00CA\\\n\u0091\u0090\u00A2\x10%2&\u008F\u00CA\x10\u00DD$2\u0084\x07\u00F3\u00BC}\u00BF\u00BD\u00FE\u00E7\u00D8\u00E7\u009Ey\u009FsEw}\u00F5\u00B5\u0086\u00BD\u00CEp\x7Fg\u00EF\u00B5\u00D7\u00DE\u00FBVx<\u009E\u00FF\u0099J+\u0093\x04AP\u009Fb.\x0E\u00C4w\u00F8\x05\u00EB2\u008D\u00B19\u00DE\u00C2\u00C3\u0095\u0095\u0095?\u00D4\u0099\x11\u00C2k\u008FGq4\u00A6\u0085[WQ\x16\u0096\u0089\u00B2io\u00DD\u00A9\u00B0\u00A1\u00BE\rhe]\u009E\x1A(\x1B\u00CBHGi*t.\u00C0\u00D1\u00D6\u00F4dA\x19)+k\u00FE\u0081\u00CE\u009D\u00E8\x0F\u00DB<(#ee\u00CD\u008AzV\u008A\u00F7L\u0090\u0081\u00D5=Y\u00B0\u008C\u00DE\u00BBVj\u0080\u009F\u00AD\u00F4\u00E4'\u0099U4@O\fJ\n\u0090\u00B9` \u00B6\u00B5\u00E6?\t\u00DFOg\u00CE\x0E\u00D8\u00D4\u00BA\u00CAJ\u00EC\x00\u00F9B\u00E3)\u00AEJ\u00EA\u0099\u00D7Fy\u00E0uCp3\u00AE\u00B0\u00AE\u00DA@\x13\u00FEc\\\x14\u00B6\u00CAL){`?l\u0080]\u00F0r\u00CC\x10\u0097\u00E1j\u00DC\x12\u00F7G(\u0080\u00C4\u0089\u00F1\u0097\u0095e\u00A5\u0094\x007\u00E1nW->D\u00C66\u00A3\u0098\u00E0Z\u00E1\x0F1\u00C7U\x1Dlo\u008D\u00ABp&\x0E\u00C5\r\u00B8\x16\u00FB\u00DB\x10\u008D\u00E9\u0083kp\x00\u00CE\u00C6\u008D\u00B8\x12\u00B3N+lk\u0087Kp\u009Cu\u00A9o2.\u00C66\u00D6U<\u00BCx\u00BDU\x0B\u0086\u00D7hM\u00B4\x0B\x13<\u00C2\u0082Bd\u009C\x16\u00EE\u00E2\u00BC\u00957lS\b\u00ED\u00BE\u00AE;x\u008A_]5\u00E4\x13\u00F6\u00B51\u00CB\u00C2\u009E \u00A8\u00B62\u00C1}\fw\x0E\u00CA#a\x0Fc\u00AD=\u00D15\u0083kj\x0B\u00EAw\\W0\u00DC\u00BAr\u00C2\u00B8dV%\u009DDlM\u00A4/\x16gO\u009Cf\u00E56\u00BC\u008F\u0083x]\u00AF\u00B0'\u0095v\u00B8\x0Eg\u00E03l\u0082\u00BA\u00D1\x11E{\u00B3n\u0080,G}\u00A7\u00EEf\u00ADSR\u0080\"\x12\u00E2\u00D9\u00B0\u00C3\u0085x\u00C2U3CP:T\u00C6\u00E2K\u00BC\u0080\u00E7QWA)\u0087\u00B1\u00F1\u008C\u00CF\u00D8\u008C'\u00A9\u00DFt]\u00E1!\x1F\u00E5\"\u00DB\u008F\u00A0N\x18\u00AF\\W\u00DA\u0098Z\u00A1\u00E4\x00\u008DI8\u00C6U\u00C3\u00C9z\u00BB\u00ABfe\x16\u00EA6QK\u00AC\u00C6y(\u00A6Z\x19%:\u00F9\x7F\u00B7\u00B2&\u00D11\u00DF\u00AC\u00FC+\u0094\x1C {\u00D3d\n\u00EDq\u00FA\u00C5\u00F5\u0087\u00CC\u00D7\u00DE@\u0099\u008B\u00E9V\u00DE\u00C3'\u00A8C\u00F8\x03\u00F6\u00E6\u00FD\x06SF\u00A9\u00A2\u00AF3\u00EA\u00BBvs]i\u00F4`{C\u00D4\u00C9#\u00DF\u0089 q\u00BD\u00DF\u009D\u00F1#QSCW\u00D7U<%\x05\u00C8\u0087g\n\u00EF0eVxMg\nM\u00D6\x1Fq\x04\u00E3\u0087I\u00EA\u00C7Qh\u00EF\u008C\u00D2\x10\u00EF\u00E0\x0BL\u009C\u0081\x15z\x14\u009DT\u009E\u00A3~\u0088F\u00A8K-\u00AD\u00FD2\u00A1\x1F\u00ED+V\u00E1%\u00D4\u00F7\u008F}\x19\x1B;@\u0082\u00D0B\u00BA\u00A8\u00F0\f\u0085\u00A0yo\x0F\u00E3\u0093\x17\u00E5p\x14\u00CFa\u008B\u00B0\u00F5\x07\u0085\u00B5\x1F\u00DF\u00E2]\u00DC\u0082g0\u008A\u00E6\u00D0+\u00F8\x1Ao\u00E3R\u00DE[w\u00D3\u00C5C\u00BC\u008E\u009Ao5g?\u00A2\u0098\u0082\u00FB\u00F0\x00.D\u009D\u009CD\u00FC\u00BBQ\x04R\u00D42\u0086\u00F1Z\x7F\u0089\u009F\u00A83`Y\u00E1=\x13\u00CB\u0098\u009A{[\x12\u00B6%\u00961\u00F9\u00A6\u008C\x14\x18\u00DF\x13;a\x13\u00D4\x1APK#\u00D1\u00D1\u0086\u00E4\u0084qeY\u00C6h!\u00BD\x15\u00E7\x14\u00B8\u00E7\u00FDK\x1CD\u009D\u00BC>\u00E1)\u00D4\u00D2\u00E84\x7FG\u00B6\u00C3>+\u00B1\x03\u00E4\u00C3\x02\\\u008D\u00C7\u00AC\u00AB\u00DC\u00BC\u00C1\u00BD\u0098\u00EB\u00FD\x1F\u00E0\x1E\u00BC\x1A\u00B6\n\u00E7\x10j\u00A5\u00A0r\x07.\u00C5\u0099\x18\u009F\u00E8n\u00E9\u00C9M\u00B6CX\u00EB2Oa$\u00B3\u008A\x06\u00D8\u009Cd\u00FD3\u0091<XFzN\x1C\x12\rP\x0F\u008EG\u00B9\u00AA'\x07\u00CAHY\u00A5B\u00B2\u00FE\u00B9p\x1E\u0094\u008De\u0094\u00FE\\X\u00B0\u00C1\u00FFgB\x06\u0094\u0085e\u00A2lR\u00EE4\u00A5\u0085\u00C4\u0080\u00E8\u00FF\u00C6\u00E8J\u00A1\u00AE?\u00AD+\u00FC\x7Fc<\x1E\u00CF\u00FFEE\u00C5oYIj\u00C0\n@u\x7F\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnApply = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KApplySmall.png", btnApplyImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
		btnBakeImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00P\x00\x00\x00#\b\x06\x00\x00\x00\x03\u00A7\u008D\u00C2\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x03\u00BDIDAThC\u00ED\u009AIh\x13Q\x1C\u0087\u00D3\u00BA+\u00B6.\u00A8\bB\x0F\u00EAAmQ,RD\u0085BQ\u00F0\u00A0\u00C7\x1ETz*u\u00AD\nj\u00C1]q\u0081\u00D6\u00AD\bnX\u00F0bEE\u00AF\u008Ah\u00B1\u00B8\u00EBAlUD\u0084\"\u00C5\u00E5\u00A0(ZPq\u00AB\u00DFo\u00E6M\u0098\u00B4i\u0092f\u0086@\u00CD\u00FB\u00E0\u00F3?\u00F32N\u0092_\u00DF\u009B7K\"\x16\u008B\u00A5/\u0093cj\u0094\u00CE\u009Am\u00FD)K\u00B1\x04\u00BF\u00E2\x0F\u00CCf\x06c\x1E>\u00C4\u00C6\u009C\u00BA\u00BD\u00BF\u00D5\u00E8\x11\x13 \u00E1M\u00A0\x1C\u00C4\x06lb\u00E3N\u00B5g;\u00E4\u00A2\u009C\u00CA\u00B0\x127\u0092\u00CB\x1B\u00B5\u008Bh\u0080\u00A6\u00E7\u009D\u00C5\u0095l\u00F0\u00D9i\u00B4\u00C4@F#)'p\u0099\u00D7\x13s\u00F5\u008FA\u00C3\u00B6\u00C1\u0086\u00D73&\x1B\u008DNe\u00E5\u00E0\x0FP\u00C7\u00BC&w\u00D1\u0092\x00e\u00A4\u00AC\x1C\u00FC\x01v\u0090\u00B0=\u00E6%\u00C1d\u00D4\u00E1\u00AE\u00C5\x06\u00F8\u00DDTKr\u00A2Y\u00F9\x03\u00B4\u00A4A(\x012;\u0095\u00E0x\u00B3\u009AU\x04\x0E\u0090\u00E0\x16RnK\u0096u\x1E\u0099qx\u00DF|,\u00C0a\u00A6)c\u0084\u00D1\x03g\u00E2\x00\u009C\u0088\u00CD\u00BD\r\u0091\u00ED\x0F`\u00BDq7Va\u0081y9Uj\u00F15\u00AEw\u00D62H\x18\x01\u00EE\u00C7\u0093\u00EEbZ!V\u00E1:\u00E3\x0E<\u0085\u00AD\u00ECc65U\u00BC\u00B3\u0087\u00BF\u00A6f\f]}\x04B\u00D3:_v\u0095Y]\u0081^\u0088\u00A5\u00BC\x16\u00BD\u00E4I\u0081\n\u00FC\u0088{\u00B0\x18\x17\u00E1}T/]@\u0099\u0081\u00A3Q3\u00A0\u00F6{\u00D9\u009C\u00D8v\u0083\u00ED\x0B)\u008B\u00F1\x1B\u00DB\u00D4\u009B6}.\u00B5\u008DA\u00BD\u00CF5^{N\rD(\u0093\u0088B\u00A4(\u00C4 =\u00B1\u0085\u00FD\\\u00A5\u00EA\u00A2]\u00FC1U\u00A8wj\u0098\u00D6\u00E0N<\u008D\u00D7\u00B1\x1B\u00BCg>\u00E5<\u00EE\u00C3_\u00A6\u00AD\u0088\u00F2\x18\x0F\u00E3f<\u0084\u008Fh/\u00A5\x06\"\u0094\x00\u0085/\u00C4+N\u0083\x1B\u00E2%w1%\u008E\u00F0\u0085\u00EEQ5\u00A4\u00DB\u00F0\u009C\x1A\r\u00FA\u00E2\u009A\u00AC\u00E6\u00E1\x1AT\u00B8\u00C5l?\u0095\u00EAg\b\x1E\u00C7ix\u0091\u00CFtL\u008D\u00A0\u00DE\u00AC;*\x0FP\u00A1\u009D\u00C1\u00A1\u00A8^\x1F\u0088\u00D0\x024\u00E8\u0083\u00CEw\x17\u009D\u00E3\u00D1Qw1%\u0086\u00A3nn\u00FC\u00C4Q8\x05=4d\x15\u0096\u0086\u00F2@\u00FC\u0082\u00A2\u00EB!h;.\u00C1\u00F7\u00B8Z\r\x06\u00DD\u0092\x12\u00BA\u0082\u0098\u0083\u0083\u009C\u00B5Hd\u00AC\u00A9i\x13Z\u0080\u00F4\x06\x1D_\u00D4\u00E34#+\u00BC\nz\u0080\u00BF\x17%\u00A3\u0092\u00ED5q\u00A8\u0087\u008D\u00C0j5\u00B2_-\u00DFB\r;\u0085\u00A3^\u00AE\u00B6x<C\u00854\x0E5l\u00BB2\x1D\u00B5\u008F\u00B9\u00A8m\u00DFb B\t\u00B0\u0087\u00F0\x1A\u00A9\u00BD\u0082\u00FD\u00F4\u00A3Lr\u00D7\":\u0096\t]\u00B8\u00AB\u00A7\u00BCb\u009FzM\u00C1|\u00C2x\u00E8\x0F\u00A6\u00FB\u0099\u00FA^\u00B5\u00EC\u00CF\u00FB~\u00DE\u00F1\u00B4\u0099}\x14b\x01\x16\u00E1r\u00D3\u009E6\u0081\x03\u00E4C\u00EA\u00D8\x148<hA\u00DDc\u00DB\u00E2\u00AC\u00B9'\u00E7\u00E2\u0083\u00A9\u0093y\u00AF\x1B\u00D4'\u00A8\u00E1\u00DE\x13u\u00F8\x02g\u00E1Z5\u00C0KS\u00CB\u00D9G\x1B>\u00C5vtzy\x10\u00C2\u00E8\u0081\u00DE\u0089t\u00BA\u00E1\u00E9\u00F6\u0090&\x1E\u00CF\x0B\u00B8\x017\u00A1&'\u00CD\u009E[\u00B1\x155\u00AB\u00DFD\u00F54\rA\u00EFq\u0083N\u00A2\u00EF\u00E2;\u00B6W\u009B\u00FE\u00FF\x1D,#\u00A4\\\u00DA4+\u00EB\x0F\u00A3IJ\u009FS\u009F\u00B7\x1D5Y\u0085\x03o\u00B4\u00CB,\u00F6\n\u00FE_\x0Ej\u00B8\u0094\u009B\u00A6\u00FF\u009E\u00B8Y\u00A5\x1B`6\u00E2\u00CF*\u0094I$\u009B\u00F1\x07\u00E8\u009D+Y\u0092\x13\u00CD\u00CA\x1F`\x1E]\u00B3\u00DBsbK,&#]\u00D58\u00F8\x03\u00D45\u00A8\u009E}Z\x12\u00A3\u008C\u00BC\u00EB\u00F5\u0098\x00u\u00FAQI\u00C2z\u00F6i\u0089\u0083\u00C9F\x0F\u00D7\u00A3\u00A7j1C\u0096\rt\u009Ee\x7F\u0099\u00D0\x053l\x13\u00FF2\u00C1\u0083\u008D\u00FD\u00BF\u008D\u00D1ue\u00B6?\u00ADK\u00F8\u00DB\x18\u008B\u00C5\u00D2\u0087\u0089D\u00FE\x01\u0098\b?<\u00F6\u00EF\x07G\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnBake = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KBakeSmall.png", btnBakeImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
		btnUnBakeImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00P\x00\x00\x00#\b\x06\x00\x00\x00\x03\u00A7\u008D\u00C2\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04QIDAThC\u00ED\u009AohUe\x1C\u00C7\u00EF\u00CC,P$\u00F1\u0085J\u0081\u00BA0b\u00BA\u00B2IM!t\u0096I\u00BEh\u00A0\u00E9\u00D4l\u00BE\u0088\u00E1\u00B4\")s\u00BDP4\x07\u00D3\t\u00BEXA5e\x14\u0089\u00F3E+\x14E\u00F1\x7F\u0092:\u00FAC\"\u00CCiThD\bZ\u00A99\u00FC\x07\u00E6\u00FC|\u00CFy\u009E\u00CBs\u00BD\u00FF\u00CEq{3\u00EF\u00F3\u0085\u00CF~\u00E7\u00FC\u00F6\u00DC\u00E7\u009C\u00FB=\u00CF\u00DF{o\u00C2\u00CB\u00CB\u00AB/\u00AB\u00C8\u00C4\u00A4\u00BE\u00EA>\u00DE\u009F\u00B0\x00\u00CA\u00E1\n\u00DC\u0080B\u00D6\u00C30\x18~\u0080\u00D6\u00AA\u00A2\u00B2[JZ\u00A5\x18\u0088y\u008F\x116@\x0B\x1C\u00A4p\u00B7\u00F2\u0085.|\u0091O/B\r\u00BC\u008F/\x7F)/%\r4-o\x0B,\u00A1\u00C0\u00A5 \u00E9\u0095\"<\x1AB\u00F8\f^\u00B7-\u00B1\u009F\u00FE\x18\u00A9\u00DB\u00B6x\u00F3\u00B2\u00CBx\u00A3\u00DE)\u00AF\x02\u00B9\x06j\u00CC;\x18\x1Ez\u00E5\u0090<\u0092W\u0081\\\x03\u00BBp\u00D8\u008Fyyd<\u00EA\n\u00CFR\r\u00BCn\u00A2W~%\u00BDr\r\u00F4\u00BA\x07E2\u0090\u00D9\u00A7\x1CF\u0098S/Gy\r\u00C4\u00B8\x19\u0084#\u0082c\u00AD\x13\u00FB\u009C\u00B8\u00EF\u00E10\x12\u00D26\x0E=U\u0094\x16X\x06\x0F\u00C2\u00E3p8\u008A\u0089\u0094y\x1B\x1Aa\u0082I)7\u00CD\u00E4f\u009BT^Qv\x1C49\u00D4\u00C1\x02\u00D0\u00EE \u008E~\u0084?\u00E0\u00A9\u00E0\u00AC\x17\x15\u00C5\u00C0\u00B5\u00D0\x1C\x1EF6q\x1E|\x00O\x06g\u00A1\u009E\x05\u00E5\u00B4\u00A2\u008F\u00AAQ\u00B0\u00D4a=h\u00B1\u00DF\u00CE=\f \u00C6U\u00AF\u00AF2\u00B4\u00FB\u00C8)M\u00DB\u00DC\u00EC\u009B\u00E6t1X\x13+\u00F8_rK\x13W\u00BC~\x10\u00E1\r8\x07\u00AAg:\u00E8\u0081\u00EE\u00A7\u00DEcDW\x1D\u00F0\x16\x14\u00C3\u00A7\u00F0\f<\x07GAu-\"<\n\x0F\u00C1\x7Fp\u009A:\u00B6\x133\u008A\u00F2\u00AF\x12\u009E\u0080N\u00CA\u00ED09=X=d\u00DD\u00D7\u009F\u00D0\u00C6\u00FF\u00F2n*\"M\"T\u00A4''\x13\u00E3\u00B6\u00C4\\\x1A\n\x1FA\x13\x1C\u00825\u00B0\x1A\u00BE\u00A5\u00DEIDW\u00D7\u00B8\x07\u008D\u00C3\u009B\u00E1|\u0090I$\u00FE7Q\u00DA\b\u00AB@-\\=f\x1Bu4\x10\u00D3D\u00BE\u0082\u00D0\nu\u00F0\u00AB\u00C9\u00BDK8\x00\u00EB`\x05\u00A8\u00BE\u00A3\u00E4\x07\x12s*\u0092\u0081\u0092c\u00E2\u00EE \x11\u009A\u00F8ux\u00D8#\u00A9\u00E54\u00C2\x1C8\x0B\x1Ao5\u00EE\u00BA\x1A\u00C3\u009B\u00D9C<\x05\u00A3a'\u00E8\u00D3\x11+m\u00AD\u00A6\u00C1\x14\u00F8R\t\u00A4\u00C9\u00EFn\u008D\x04m\u00C5\u00D4R\u00DF\u00E3=\u00FD\u00A2$\u009Ae\u00E2\u00C7\u00F0\x02tB\td\u00AA#E\u0091\r4z\x05^\n\x0F\x13\u00B7A\x17\u00EC\u00A9\u00B4\x03\u00AA\x07=\u008C\u00EF\u00C3T\u00DAX\u00A5\u00A1F]\u00EBfp\x16\u008E\u008D2\u00DE\u00EAo\u00D0\u00F6j*\u00FC\u00AB\x04\u00D2\u0083\u00B8[\u00EA\u00AEz\u00F0\u00DFp\u00BD/\u0082L([\u00F6\x01\u0098\b\u00F6:\u00C3L\u00CC\u00AA\u00C8\x06\u00D2\x02*\tz\u0093\u00BA\u0098\u00CC[\u00C8Ml%\u00F6TQ\x06v\u008Di\u00CF\u00C3x\u008E\u00DB\u00A0\x14^\u00D3?\u00B8\u00AF\u0099\u0084}\u00A0\u00EE_\x05\u00F3!\u009Bl\u00AB\x1D\u009F\u00A5{\u00BE\f\u00D5\u00A0O]NB\u00EF\u008C\u0081Y\u00CC\u00D38\u0092M\u00F6\tj\u00B0\u00D7\u00EBu\u009D\u00A7u\u008C\u00DC\u00B1+\u0096\u00A8Go\u00CC\u00B6\u008AGLT\u00B7\u0095\u009A\u00B9\u00A7\u00B1\u00C4\u00DA\u00F04\u00A34\u00D9\u00B4\u0083Z\u00A1\u00C6:+\u00BD'\u00A9\u0081:J\u00A0\x18J!o\x03\u00C9k 7\u00ADq \u008Ey\u0092\u009DE\u0097\u00F1z\r\u00FA\x17`n\u0090\t\u00D7dq\u00A5\u009D\u0090Z\u00EAE\u0098\f\u00BA\u008F\u00C3 \u00D9.[M\x19\u008D\u00CF\u009B\u00C2\u00D3\u00ACZ\x0E\u00FA,\u00EF\x1D\u00CA\u00DBe\u00D6\u00EF&n$\u00D7\t\x1Dp\x114f\u00E6T\u0094\x16h\x17\u00D2Q\u00CD\u0093\u00EAa%|\x07\u0097\u00E1\x1F\u00D8\x0F\u00B5\u00BC^3\u00A9\u00A4\r\u00B9\u0096!\u00EEd\u00F0\x1B\u00C8|;\u00D3\u00EAu2\u00C5\u00B2\x0B>\u0087J\u00EA\u00D9K\u0094>\x01\u00D5)#\u00D5:?\x04M\x02g\u00C0\u00EAgP\u00BD\x1Ao\u00D5\x025i\u009D\x00uyI\u00A6jrQ\u00B7\u00D5X+\u00FD\x04W\u00C3\u00C3\b\u00C2m]8M\u00E4\u008B`=\u00D8\u008B\x15\u00BC2z\u0095\u00CD@\u00AFt\u00B9^E\u009E\u0085\u00BD2\u00CB50\u00EE\x06\u00BD\u0090\u0095\u00F4\u00CA5p0M\u00B3\u00D7?\u00EE\u00B9\u00DFd<\u00D2\u00F7\u00C4\u0081\\\x035\x1B\u00C6\u00F9\u00A4\u00A4P%\u008F\u0092+\x07\u00D7@-OjpX\u008BU\u00AF\f2\u00DE\u00E8\u00CB\u00F5\u00E4R.\u00A5\u00CBR\u00C0\u00FF2!\u0083L\u00B7\u00CD\u00FD\u00CB\x04+\n\u00BB\u00BF\u008D\u00D1\u00D7w\u0085\u00FEm]\u00CE\u00DF\u00C6xyy\u00F5a%\x12w\x00\u00EE\u0092\u008D\x12\u00A8\u00D3=\u00B1\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnUnBake = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KUnBakeSmall.png", btnUnBakeImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
		btnDelImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x15\x00\x00\x00\x1B\b\x06\x00\x00\x00\u0093\x1D\u00C4\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x02\nIDATHKcd\u00C0\x01\u00C4\u00C5\u00C5eTUUu\x19\x19\x19\u0099\u00A0Bp\u00F0\x1F\b\u00EE\u00DD\u00BBw\u00ED\u00D9\u00B3g\x0F\u00A0B(\x00\u00AB\u00A1\u00B6\u00B6\u00B6\u00DE}}}\u00EBXYY\u00D9\u00A0B\x18\u00E0\u00EF\u00DF\u00BF\x7F\u00AA\u00AA\u00AAbv\u00EE\u00DC\u00B9\x12*\x04\x07X\r\u009D;w\u00EEAyyy\u00B5\u00F6\u00F6\u00F6l\u0090f\u00A80\x1C\u0080\\_ZZ\u00DA\u00FF\u00E5\u00CB\u0097\u008Faaa\x06Pa8`\x01\x11\x06\x06\x06\u00D6\u0096\u0096\u0096n,,,\u00AC \u00BE\u00A2\u00A2\u00A2\u00C6\u009F?\x7F~kii\u0099\u0080\u00F8\u00D8\u00C0? \u0090\u0092\u0092R\u00C8\u00CD\u00CDm\u0083\u00F2\u00FF\u009E:uj\u00DF\u00E9\u00D3\u00A7\u00F73*((\u00A8\u00AF]\u00BB\u00F6\n333\u00D8\x02J\x00\u00C8\u00A2\u0098\u0098\x18s&mmmSj\x18\b\x02L@\u00A0\u00AC\u00AC\u00AC\u00C5(!!!\x17\x1C\x1C\u009C\n\x045\u0097.]:\u00B1p\u00E1\u00C2n\u00A8\x1A\u00A2Addd\u00AE\u0089\u0089\u0089\u00C3\u00E2\u00C5\u008B\u00FB\u0096.]:\x11,hmm\u00EDq\u00E1\u00C2\u0085\u00FF\u00BD\u00BD\u00BDkA\u00FC\u00993g\u00EE\x01\u0082g\u00B2\u00B2\u00B2\u00CA >022A\u00FC\u00C4\u00C4\u00C4r\x10_HHH\f\u00C4_\u00B2d\u00C9I\x10\u00BF\u00B9\u00B9y!H\u00BF\u00BB\u00BB{8\u0088\u008F\u0091\x06A@PPPTDDD\x12\x16,\u009C\u009C\u009C< >777/\u0088\x0F\u00F4%3\u0088/,,,\x0E\u00E2\u00A3\x03\u00AC\u0086R\nF\r\u00A5>\x185\u0094\u00FA`\u00D4P\u00EA\x03\u009A\x18\n.\u00DA@U.\u0098\x03\u00AD\u00A3\x0E\x1D:\u00B4\u00E5\u00D6\u00AD[\x17\u0081\x15\u00DB'\x10\u00FF\u00EE\u00DD\u00BBW\u00B7l\u00D9\u00B2\u00F8\u00E6\u00CD\u009B\x17@\u00FC\u009F?\x7F~\x07\u00F1?|\u00F8\u00F0\x06\u00C4\x07\x16\u0091\u00CC \x1Af\x0E\u00B86\x05U`@EwA\u0095\u00DD\u0081\x03\x076\u0082h\u009081\x00T\u00B6:88\u00F8qppp\u0085\u0086\u0086\u00EA\u00DD\u00BE}\u00FB2\u00BC\u008ANKK\u00AB\u00CD\u00CC\u00CCl\x04V\u00BF8\x1B\x18\u00F8\x00\u00B0\x1A\u00EA\u00E9\u00EF\u00EF/\x05\u00B1Q\f\x00\u00D5\u00AC\u00C0*D\x05\u00CA%\x1A<\x7F\u00FE\u00FC\u00E1\u009D;w\u00AE@x\f\f\x00\u00CEs\u00C5\u00FDs\tc\x1F\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnDel = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("RanAni2DeleteButton.png", btnDelImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
        
		btnApply.onClick = applyRA;
		btnUnBake.onClick = function() {bakeRA(2);}

		btnBake.onClick = function (key) {
			var keyState = ScriptUI.environment.keyboardState;
			if (keyState.shiftKey) {
				bakeRA(1);
			} else {
				bakeRA(0);
			}
		}

		btnDel.onClick = function (key) {
			var keyState = ScriptUI.environment.keyboardState;
			if (keyState.shiftKey) {
				alert("Yan-K RanAni 3 \rVersion: " + version + "\r\rSpecial Thanks: \r- OlaOla Yuan \r- Xquid \r for Scripting Help.\r \rAnd AE/MG Discord Member \rfor Beta Testing.")
			} else {
				deleteRA();
			}
		}
		
		
		
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