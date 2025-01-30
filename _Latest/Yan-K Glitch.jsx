/*
 Yan-K Glitch
 Version: 1.0
 Author: Yan-K@Yan-K.tv
 Date: 2021/03/02
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
		
		/* Glitch System */
		function applyGlitch(){
			
			app.beginUndoGroup("Apply Yan-K Glitch");

			var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/Yan-KGlitch.ffx";
			var selectComp = app.project.activeItem;
			var selectLayer = selectComp.selectedLayers;
			var origLayer = selectComp.selectedLayers[0];

			// 僅能套用一個圖層
			if (selectLayer.length >= 2) {alert("Only apply Yan-K Glitch 1 layer at a time!"); return null} else {};
			
			myLayers = [];
			for (var l = 0; l< selectLayer.length; l++){  
                myLayers.push(selectLayer[l].index);
            } 
			var precompIndices = myLayers; 
			
			// 建立 _Yan-KGlitch
			glitchComp = selectComp.layers.precompose(myLayers , origLayer.name + "_Yan-KGlitch" , true);

			// 建立 Digital Glitch 圖層
			var digitalGlitchComp = app.project.items.addComp("DigitalGlitchComp", selectComp.width, selectComp.height, selectComp.pixelAspect, selectComp.duration, selectComp.frameRate);
			digitalGlitchSolid = digitalGlitchComp.layers.addSolid([0,0,0] , "Digital Glitch" , selectComp.width , selectComp.height , 1);
			digitalGlitch = glitchComp.layers.add(digitalGlitchComp);
			digitalGlitch.enabled = false;
			digitalGlitch.moveToEnd();
			digitalGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).name = "Digital Noise 1";
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0001").setValue(11);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0002").setValue(1);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0004").setValue(250);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0005").setValue(-100);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0009").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0011").setValue(20);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0012").setValue(20);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0023").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fractal Noise-0030").setValue(5);
			digitalGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).name = "Digital Noise 2";
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0001").setValue(11);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0002").setValue(1);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0004").setValue(200);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0005").setValue(-100);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0009").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0011").setValue(60);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0012").setValue(60);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0023").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0030").setValue(4);
			digitalGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).name = "Digital Noise 3";
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0001").setValue(11);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0002").setValue(1);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0004").setValue(200);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0005").setValue(-100);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0009").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0011").setValue(120);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0012").setValue(120);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0023").setValue(0);
			digitalGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0030").setValue(16);
			digitalGlitchSolid.property("ADBE Transform Group").property("ADBE Opacity").setValue(100);
			digitalGlitchSolid.selected = false;

			// 建立 Analog Glitch 圖層
			var analogGlitchComp = app.project.items.addComp("AnalogGlitchComp", selectComp.width, selectComp.height, selectComp.pixelAspect, selectComp.duration, selectComp.frameRate);
			analogGlitchSolid = analogGlitchComp.layers.addSolid([0,0,0] , "Analog Glitch" , selectComp.width , selectComp.height , 1);
			analogGlitch = glitchComp.layers.add(analogGlitchComp);
			analogGlitch.enabled = false;
			analogGlitch.moveToEnd();
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
			analogGlitchSolid.property("ADBE Effect Parade").property(1).name = "Background";
			analogGlitchSolid.property("ADBE Effect Parade").property(1).property("ADBE Fill-0002").setValue([0.5,0.5,0.5,1]);
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			analogGlitchSolid.property("ADBE Effect Parade").property(2).name = "Analog Noise 1";
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0001").setValue(8);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0002").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0005").setValue(-60);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0009").setValue(0);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0011").setValue(800);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0012").setValue(2);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0013").setValue([640,360]);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0031").setValue(1);
			analogGlitchSolid.property("ADBE Effect Parade").property(2).property("ADBE Fractal Noise-0030").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			analogGlitchSolid.property("ADBE Effect Parade").property(3).name = "Analog Noise 2";
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0001").setValue(8);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0002").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0004").setValue(130);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0005").setValue(-60);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0009").setValue(0);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0011").setValue(800);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0012").setValue(10);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0013").setValue([640,360]);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0031").setValue(1);
			analogGlitchSolid.property("ADBE Effect Parade").property(3).property("ADBE Fractal Noise-0030").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Fractal Noise");
			analogGlitchSolid.property("ADBE Effect Parade").property(4).name = "Analog Noise 3";
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0001").setValue(8);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0002").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0004").setValue(130);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0005").setValue(-60);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0009").setValue(0);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0011").setValue(800);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0013").setValue([640,360]);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0031").setValue(1);
			analogGlitchSolid.property("ADBE Effect Parade").property(4).property("ADBE Fractal Noise-0030").setValue(4);
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Venetian Blinds");
			analogGlitchSolid.property("ADBE Effect Parade").property(5).name = "Mask Range";
			analogGlitchSolid.property("ADBE Effect Parade").property(5).property("ADBE Venetian Blinds-0001").setValue(0);
			analogGlitchSolid.property("ADBE Effect Parade").property(5).property("ADBE Venetian Blinds-0002").setValue(90);
			analogGlitchSolid.property("ADBE Effect Parade").property(5).property("ADBE Venetian Blinds-0003").setValue(380);
			analogGlitchSolid.property("ADBE Effect Parade").addProperty("ADBE Offset");
			analogGlitchSolid.property("ADBE Effect Parade").property(6).name = "Mask Roll";
			analogGlitchSolid.property("ADBE Effect Parade").property(6).property("ADBE Offset-0001").setValue([640,360]);
			analogGlitchSolid.property("ADBE Transform Group").property("ADBE Opacity").setValue(100);
			analogGlitchSolid.selected = false;

			// 建立 Displace 圖層
			displace = glitchComp.layers.addSolid([0,0,0] , "Displace" , selectComp.width , selectComp.height , 1);
			displace.adjustmentLayer = true;
			displace.property("ADBE Effect Parade").addProperty("ADBE Displacement Map");
			displace.property("ADBE Effect Parade").property(1).name = "Digital Displace 1";
			displace.property("ADBE Effect Parade").property(1).property("ADBE Displacement Map-0001").setValue(digitalGlitch.index);
			displace.property("ADBE Effect Parade").property(1).property("ADBE Displacement Map-0002").setValue(5);
			displace.property("ADBE Effect Parade").property(1).property("ADBE Displacement Map-0003").setValue(15);
			displace.property("ADBE Effect Parade").property(1).property("ADBE Displacement Map-0004").setValue(5);
			displace.property("ADBE Effect Parade").property(1).property("ADBE Displacement Map-0005").setValue(-2);
			displace.property("ADBE Effect Parade").addProperty("ADBE Displacement Map");
			displace.property("ADBE Effect Parade").property(2).name = "Digital Displace 2";
			displace.property("ADBE Effect Parade").property(2).property("ADBE Displacement Map-0001").setValue(digitalGlitch.index);
			displace.property("ADBE Effect Parade").property(2).property("ADBE Displacement Map-0002").setValue(5);
			displace.property("ADBE Effect Parade").property(2).property("ADBE Displacement Map-0003").setValue(15);
			displace.property("ADBE Effect Parade").property(2).property("ADBE Displacement Map-0004").setValue(5);
			displace.property("ADBE Effect Parade").property(2).property("ADBE Displacement Map-0005").setValue(-2);
			displace.property("ADBE Effect Parade").addProperty("ADBE Displacement Map");
			displace.property("ADBE Effect Parade").property(3).name = "Analog Displace 1";
			displace.property("ADBE Effect Parade").property(3).property("ADBE Displacement Map-0001").setValue(analogGlitch.index);
			displace.property("ADBE Effect Parade").property(3).property("ADBE Displacement Map-0002").setValue(5);
			displace.property("ADBE Effect Parade").property(3).property("ADBE Displacement Map-0003").setValue(15);
			displace.property("ADBE Effect Parade").property(3).property("ADBE Displacement Map-0004").setValue(5);
			displace.property("ADBE Effect Parade").property(3).property("ADBE Displacement Map-0005").setValue(-2);
			displace.property("ADBE Effect Parade").addProperty("ADBE Displacement Map");
			displace.property("ADBE Effect Parade").property(4).name = "Analog Displace 2";
			displace.property("ADBE Effect Parade").property(4).property("ADBE Displacement Map-0001").setValue(analogGlitch.index);
			displace.property("ADBE Effect Parade").property(4).property("ADBE Displacement Map-0002").setValue(5);
			displace.property("ADBE Effect Parade").property(4).property("ADBE Displacement Map-0003").setValue(15);
			displace.property("ADBE Effect Parade").property(4).property("ADBE Displacement Map-0004").setValue(5);
			displace.property("ADBE Effect Parade").property(4).property("ADBE Displacement Map-0005").setValue(-2);
			displace.selected = false;
			
			// 套用 Pseudo Effect
			selectComp.layer(glitchComp.name).applyPreset(new File(presetFile));

			// 套用表達式
			try {
				displace.property('ADBE Effect Parade').property(1).property('ADBE Displacement Map-0003').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 2) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace X\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(1).property('ADBE Displacement Map-0005').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 2) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace Y\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(2).property('ADBE Displacement Map-0003').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 2) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace X\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(2).property('ADBE Displacement Map-0005').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 2) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace Y\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(3).property('ADBE Displacement Map-0003').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 1) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace X\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(3).property('ADBE Displacement Map-0005').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 1) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace Y\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(4).property('ADBE Displacement Map-0003').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 1) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace X\')}';
			} catch (err) {}
			try {
				displace.property('ADBE Effect Parade').property(4).property('ADBE Displacement Map-0005').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 1) {0} else {comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Displace Y\')}';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(1).property('ADBE Fractal Noise-0011').expression = '10*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size X\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(1).property('ADBE Fractal Noise-0012').expression = '10*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size Y\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(1).property('ADBE Fractal Noise-0023').expression = 'wiggle(comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Speed\'), 360)';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(2).property('ADBE Fractal Noise-0011').expression = '30*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size X\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(2).property('ADBE Fractal Noise-0012').expression = '30*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size Y\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(2).property('ADBE Fractal Noise-0023').expression = 'wiggle(comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Speed\'), 360)';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(3).property('ADBE Fractal Noise-0011').expression = '60*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size X\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(3).property('ADBE Fractal Noise-0012').expression = '60*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Size Y\')';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Effect Parade').property(3).property('ADBE Fractal Noise-0023').expression = 'wiggle(comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Speed\'), 360)';
			} catch (err) {}
			try {
				digitalGlitchSolid.property('ADBE Transform Group').property('ADBE Opacity').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 2) {0} else {100};';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Effect Parade').property(2).property('ADBE Fractal Noise-0013').expression = '[value[0],time*100*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Direction\')]';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Effect Parade').property(3).property('ADBE Fractal Noise-0013').expression = '[value[0],time*100*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Direction\')]';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Effect Parade').property(4).property('ADBE Fractal Noise-0013').expression = '[value[0],time*100*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Direction\')]';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Effect Parade').property(5).property('ADBE Venetian Blinds-0001').expression = '100*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Mask Range\')';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Effect Parade').property(6).property('ADBE Offset-0001').expression = '[value[0],time*100*comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Mask Roll\')]';
			} catch (err) {}
			try {
				analogGlitchSolid.property('ADBE Transform Group').property('ADBE Opacity').expression = 'if (comp("' + selectComp.name + '").layer("' + glitchComp.name + '").effect(\'Yan-K Glitch\')(\'Glitch Mode\') == 1) {0} else {100};';
			} catch (err) {}

			app.endUndoGroup();
		}
		
		/* RGB System */
		function applyRGB(){
			
			app.beginUndoGroup("Apply Yan-K RGB Split");

			var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/Yan-KRGB.ffx";
			var selectComp = app.project.activeItem;
			var selectLayer = selectComp.selectedLayers;
			var origLayer = selectComp.selectedLayers[0];
			
			//origLayer.name = origLayer.name + "_Yan-KRGB";

			var origRotationExp = 'effect("Pseudo/Yan-K_RGB")("RGB Angle")+value;';

			var c1RedExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("First Channel");if (masterChannel1 == 1) {2} else {10};';
			var c1GreenExp ='var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("First Channel");if (masterChannel1 == 2) {3} else {10};';
			var c1BlueExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("First Channel");if (masterChannel1 == 3) {4} else {10};';

			var c2RedExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Second Channel");if (masterChannel1 == 1) {2} else {10};';
			var c2GreenExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Second Channel");if (masterChannel1 == 2) {3} else {10};';
			var c2BlueExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Second Channel");if (masterChannel1 == 3) {4} else {10};';

			var c3RedExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Third Channel");if (masterChannel1 == 1) {2} else {10};';
			var c3GreenExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Third Channel");if (masterChannel1 == 2) {3} else {10};';
			var c3BlueExp = 'var masterChannel1 = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Third Channel");if (masterChannel1 == 3) {4} else {10};';

			var valueExp = "value;";

			var masterFOVExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterFOV = value+thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB FOV")*masterAni;if (masterFOV > 0) {masterFOV} else {-masterFOV};';
			var masterBlurAngleExp = 'var masterBlurAngle = value+thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Angle")-90;masterBlurAngle;';
			var masterBlurExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterBlur = value+thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Blur")*masterAni;masterBlur;';
			var masterFOVCenterExp = 'var masterFOVCenter = value+thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB FOV Center");masterFOVCenter;';
			var masterOpacityExp = 'var masterOpacity = thisComp.layer("' + origLayer.name + '").transform.opacity;linear(masterOpacity,100,0,0,value);';

			var c1FOVReverseExp = 'var masterFOV = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB FOV");if (masterFOV > 0) {1} else {0};';
			var c1PosExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterPos = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Sepration")*masterAni;value+masterPos;';
			var c1ScaleExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterScale = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Scale")*masterAni;[value[0]+masterScale,value[1]+masterScale];';
			var c1RotationExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterAngle = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Angle");var masterRotation = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Rotation")*masterAni;value-masterAngle+masterRotation;';
			
			var c2RotationExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterAngle = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Angle");value-masterAngle;';

			var c3FOVReverseExp = 'var masterFOV = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB FOV");if (masterFOV > 0) {0} else {1};';
			var c3PosExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterPos = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Sepration")*masterAni;value-masterPos;';
			var c3ScaleExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterScale = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Scale")*masterAni;[value[0]-masterScale,value[1]-masterScale];';
			var c3RotationExp = 'var masterAni = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("Animation Control");var masterAngle = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Angle");var masterRotation = thisComp.layer("' + origLayer.name + '").effect("Pseudo/Yan-K_RGB")("RGB Rotation")*masterAni;value-masterAngle-masterRotation;';
			
			//僅能套用一個圖層
			if (selectLayer.length >= 2) {alert("Only apply Yan-K RGB 1 layer at a time!"); return null} else {}
			
				origLayer.applyPreset(new File(presetFile));

				newC1 = origLayer.duplicate();
				newC1.name = origLayer.name + "_C1";
				newC1.parent = origLayer;
				newC1.blendingMode = BlendingMode.SCREEN;
				try{
					newC1.transform.position.expression = c1PosExp;
				}catch(err){
					newC1.transform.xPosition.expression = c1PosExp;
				};
				newC1.transform.scale.expression = c1ScaleExp;
				try{
					newC1.transform.rotation.expression = c1RotationExp;
				}catch(err){
					newC1.transform.zRotation.expression = c1RotationExp;
				};
				newC1.transform.opacity.expression = masterOpacityExp;
				c1Channel = newC1.property("Effects").addProperty("Shift Channels");
				c1Channel(2).expression = c1RedExp;
				c1Channel(3).expression = c1GreenExp;
				c1Channel(4).expression = c1BlueExp;
				c1FOV = newC1.property("Effects").addProperty("Optics Compensation");
				c1FOV(1).expression = masterFOVExp;
				c1FOV(2).expression = c1FOVReverseExp;
				c1FOV(4).expression = masterFOVCenterExp;
				c1Blur = newC1.property("Effects").addProperty("Directional Blur");
				c1Blur(1).expression = masterBlurAngleExp;
				c1Blur(2).expression = masterBlurExp;
				newC1.property("Effects").property("Pseudo/Yan-K_RGB").remove();

				newC2 = origLayer.duplicate();
				newC2.name = origLayer.name + "_C2";
				newC2.parent = origLayer;
				newC2.blendingMode = BlendingMode.SCREEN;
				try{
					newC2.transform.rotation.expression = c2RotationExp;
				}catch(err){
					newC2.transform.zRotation.expression = c2RotationExp;
				};
				newC2.transform.opacity.expression = masterOpacityExp;
				c2Channel = newC2.property("Effects").addProperty("Shift Channels");
				c2Channel(2).expression = c2RedExp;
				c2Channel(3).expression = c2GreenExp;
				c2Channel(4).expression = c2BlueExp;
				c2FOV = newC2.property("Effects").addProperty("Optics Compensation");
				c2Blur = newC2.property("Effects").addProperty("Directional Blur");
				newC2.property("Effects").property("Pseudo/Yan-K_RGB").remove();

				newC3 = origLayer.duplicate();
				newC3.name = origLayer.name + "_C3";
				newC3.parent = origLayer;
				newC3.blendingMode = BlendingMode.SCREEN;
				try{
					newC3.transform.position.expression = c3PosExp;
				}catch(err){
					newC3.transform.xPosition.expression = c3PosExp;
				};
				newC3.transform.scale.expression = c3ScaleExp;
				try{
					newC3.transform.rotation.expression = c3RotationExp;
				}catch(err){
					newC3.transform.zRotation.expression = c3RotationExp;
				};
				newC3.transform.opacity.expression = masterOpacityExp;
				c3Channel = newC3.property("Effects").addProperty("Shift Channels");
				c3Channel(2).expression = c3RedExp;
				c3Channel(3).expression = c3GreenExp;
				c3Channel(4).expression = c3BlueExp;
				c3FOV = newC3.property("Effects").addProperty("Optics Compensation");
				c3FOV(1).expression = masterFOVExp;
				c3FOV(2).expression = c3FOVReverseExp;
				c3FOV(4).expression = masterFOVCenterExp;
				c3Blur = newC3.property("Effects").addProperty("Directional Blur");
				c3Blur(1).expression = masterBlurAngleExp;
				c3Blur(2).expression = masterBlurExp;
				newC3.property("Effects").property("Pseudo/Yan-K_RGB").remove();

                  try{
					origLayer.transform.rotation.expression = origRotationExp;
				}catch(err){
					origLayer.transform.zRotation.expression = origRotationExp;
				};
				origLayer.enabled = 0;

				app.endUndoGroup();
		}
    }
    //==================================================
     
    // _______ UI SETUP _______
    {
        // if the script is a Panel, (launched from the 'Window' menu), use it,
        // else (launched via 'File/Scripts/Run script...') create a new window
        // store it in the variable mainPalette
        var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette','Yan-K Glitch',undefined, {resizeable:true});
  
        //stop if there's no window
        if (mainPalette == null) return;
             
        // set margins and alignment
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
		imageLogoImage="\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\u00E1\x00\x00\x00(\b\x06\x00\x00\x00\bT\u009D\x06\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00(\u00A2IDATx^\u00ED]\x07\u0098\x1C\u00C5\u0099\u00AD\u009E\u00B09k\u0093\u00D2*K\b$\x10,\u00C1\u00E4`l\f2A\u00C43\u00D1\u00C8\u00C0\u0091l\u00F0\x1D\u00E6l\u00F0\x19!\x1F6\u00C2\u00C6\x06\f&\u009D\u00C9`cL\u00C6`I\x04\x03\u00C6\"\x19\u0090\u0084\u00B2\u00C4*\u00ADV\u00DA\u00D5\u00E6\u00C9\u009D\u00EE\u00BD\u00EA\u00EA\u00D1\u00CClO\u00D8;sw\u00B6\u00F5\u00BE\u00EFmwU\u00FF]S]U\x7F\u00FD\x7F\u0085\u00EE\x15\u00BB\u00B1\x1B\u00BB\u00F1\x7F\x0B\u00CD\u00B6\u00ED\"u\u00EE\u0085\x120\x0E\u00DA2\u0094\x1F\u00A5`\u00D49\u00CD\x0B\x1F\x18\x04\u0099~!\x18N\u00DA\u00C4p\u00E4\u0099\x0FBW\u00C7|\u00F8<\u00F3\u00C22O\u0080\u0096\f\u00E5G\x19\x18qN\u00F3\u0082e\u00CE\u00FA\u008E\u00C9P~\u00FC\u00A3\u0094y1\u00C8|\x14Z\u00E6\u00C3I[\x03\u0099~\u00D62\u00A7\x12\u008EP\u00E7\u0099\u00E0\u00CDc\u00C1-`!J\u00C8\u00CAm\x04\u00B7\u00CA\u00D0.\u00FC\x02\u00ACpN%\u00DE\x02\x1F\x04\u00ABA6\u00B8>p\x12\u0098\x0Bl<L{\u00BB\fy\u00A3\x13\u00DC\u00E9\u009C\u00CAt\u008F\x04\u00FFI\u0086v\u00E1\u00DF\u00C1\u00CC\u00FC\x11#\u00C1\x010,C\u00B9\u00E1\x07\u00C7\u0080\u009Bd(?\u0098\u0097\x06\u0090\u00E5X\b\u00C6\u0081\u0094-\u00A4A\u00B0!3\u00EF\u009Be(?X\x0F,\u00F7v\x19\u00CA\r\u0096y\x0B\u00B8Q\u0086\u00F2\u0083\u00F5\u00DF\f2/\u00AD \u00EF}\x16\u00CC\x06\u00B6;\x13d\u00FD\u00E7\x03\u00CB|\x14Xh\x19\u00B2\u00CC\u0099~!\u00CFI0\u00AF\u0094e~\u00F2\u0081\u00CF\u00D9\x04\x16\u009A\u0097J\u00B0\x1C\u00CC\u00D5v\u0087\x02\u008A\u00E9\x03k\u00C1:\x15\u0095\x13\u0090+\x05\u00CB\u00BC\u00E4\x11\u00B7\x13L\u00C5\x7F\u00825\u00A0\x1F\u00CC\u009B>d\x02`5eAv\fn\u00FE\u00D8\u0081\u00A4Q]\u00AB\x00K\u00C0s\u00C0L\u00CC\u00A4\u008C\x0B\u0084y\x1F\u00D3\u00AD\x04\u0099\u00AF\u00CB\u00D5\u00A54 \u00FE?\u00C0{\u00C0 X\x0E\u00B2\x12\u00F2B\u00C9\u00F2\u009E\u009C\u00F2\u00B8~\x10\u00F8{p!x\u0094\u008A\u0096@\u00F8d\u00F0%\u00F0\x0B*J\x02\u00E1b\u0090\u00E5^h^&\u0080L\u00E7U\u0090\u008A\u009E\x06\u00C4\x1D\x05\u00BE\f>\x0E\u00B2nX&\u00F9\u00F2\u00CDr\u009E\x07N\x02\u0099\x1F)\u008F\u00E3\x13 ;ZO\u00E0\x1A\u00EB\u0093\u00F7\u00A6v\u00CE\u009E\u0080\u008C[\u00E6\u0085\u00B6E\u00B7\u00CC\x0Bi[n\u00FD\x17\u009A\u00B6\u00CC\u00F30\u00E4\u00F9\u009Cl\u00BF\x05\u00C9'\u0081\x1B\u00A4\x02\u00AA\u00F3B\x1ED*\u00A0:\x1F\"\u008F8*a\x18lU\u009C\t\u00B2g\u00CB\u009A>\u00E2\u0099\u00F1Y\u00E0\x05\u00E0\r\u00E0|\u00F0&\u00F0j\u0090\u008De\x14\u00C8\u0082fGA\u00E5\u00AF\x02\u0099\x0F\u00A9\u0080*\r6:\u00F77\u00FF\x00\x12I%\u00C4\u00B9[\x01<\u00F2>\u00A6\u00BF\t\f(\x11\t\u0084\x7F\x00v\u0082\x07\u0080\u00EC\u00D1\x18\u0097\u00B7\u00E1S\x16\u0094.W>y^\x07\x7F\b\u00C6\u00C0\u00C9*\u009A\u00F1|\u00F6.\u00F0,\x15%\u0081\u00B0T@u^H^\u00A8P\x17\u0081k\u00C1>p\u00AE\u00BA$\u0081p\x03\u00D8\x06~\x04\u00BE\x0B\u00B2\u00F7\u00CE\u009B6\u00AE\x7F\x19\u008C\u0082\u00D2\u009B\u00CA'O@\u0086\r\u0093e^\x04\u00E6TB\\\u0097\n\u00A8\u00CE\x0Bi\u008B\u00A9e\u009ES\x1E\u00D7S\u00EB\u00BF\u0090\u00B4\u0093\u009DF\u0081\u00F2R\x01\u00D5yNyi=\\@\u0098.H\u00B5\u00A6i\u00BD*\\\u0087\u00F3\x1E\u009E{\x01\u00D7\u00D9\x10 \u00A2\u00C91\u0089\u0097<\u00E2\u00E8\"\x16!\u009E\u008AR\u0083\u00F3A\u009CK\u00B3\u009F)\u008F\u00F0\u00E18\\\x04\x1E\f~\n\u00AE\x01\u00D7\u0081t\x13\u00D91T\u0081{\u0082\x07\u0082t\x07\x1F\x06\u009FF\x1A:\u00EEe\x01\x198\u0097\u00BEwj\u00DA8\x7F\x02\u0087\u00AF\u0081{#n9\u00C2|n\u00A6\u00D7\u008B0\u0082\u00F2^\x16\u00D4J\u00F02\u00C4=\u008A#\u00EF\u00FB\x06\x0E?\x05O\x07\u00DF\x05\u00E9\u009E_\x02\u00EE\r\u00D2\u008D\u00FA-\u00B8\x1F\u00F8G\u0090\u00F9\u00BD\x05\u00FC\f\\\x0B\x1E\x07\u00F27\u00E8\u009E=\u00824\u00FF\u008C\u00E3\x10\u00A8\u00BC\u00F0\u00B9\u00FE\r<\x06<\x19\u00E4x\u00E3\x01\u0090\u00CFz6\u00EE\u00FD\x04G\t\u00C8s|\u00C1z\u00A2\u00D5\u00A6ky\x17\u00AE\u00EF\u00C0\u00D1\u00CD/\u00CBp.\u00E2\u00A4;\u008B8*\x14\u00EB\u00E77 ]\u00F1\u00BDx\u00C4\u00F5\u00A4\"B\u00E6i\x1C\fp\x10,\u00C3\u00B5\u00B3U\u00FC4\x1CN\x05\x0F\x00\u00E9\u0086m\x03\x1F\u00C7\u00F57q\u00E4\u00F5\u00F98\\\x05\u00FE\x1E\u00E4s\u00FC\x07\u00C8\u00FA\u00A32.\u0080\u00DCR\u00C80\u00AF\x17\u0080_\x02\u00A9\u00AC\x1C6\u00BC\x06\u00B2N\u0098\u00E6\r \u00DD\u00FB\u00FB\u00C0\u00D3\u00C0\u00F1 \u00EB\u009B\u00F9]\u00844\u00E4\x10\x01\u00E90\rz\t\x1C\u0096p\u00CC\u00FC\x01x7\x18\x02\u00D9\x0E(\u00F7\x12x&\u00C8\u00FA\u00BC\x10\u00F7z\u00B6]\u00A4\u0095Y\u00FF\u00F9\u00DA9;\u00F6\x00d\u00F8[\f\u00E7\u0093g\u00BD\u0084!\u00C32\u00CD)\u008Fk\u00D2 I \u0090\u00B4\u0080.x\u00B3:\x1D\x02\\KZ@\x17^\u00F2\u0088{\x0B\\\x02J\x17TEK\u00B8\u00F28\u00D2Z\u00FD\x11|\x1Ed\u00EF\u00CA^\u0087\x0F\u0092\x04\u00C2ii#\u00BC\x0Fx'\u00F8)H\u008B)-\u00A0\x0B\u0084\u0093\u00F28\u00BF\x19\\\x06N\x01\u0093=\u00A0\u00BA\u00CC\u00EB\u00B4\u0084\u00EC\u0099\u00E9\u0092.Vq\u00B3\u00C1\x1E\u00F0T\u0090=\u00EC\u0097\u00C0n\u0090V\u00F9x\x15~\x0F$h\u009D\u00D9\u00C9<\x02\u00D2\u009A\u00DD\x05\x1E\rR\u0086\r\u00F1\x19\u00F9C\x19@<\u00F3\"\u009F\x13\u00C7\u00D7\u00C1\u00DB\u00C1CAZ\u00A4\x17\u00C1z)\u00A8\u0080p\u00AA\x05<\x1CL\u0080'\u00A8\u00F0\x15 -\u00F6\u00A1\f\x138\u00A7\x05\u00A4k\u00C9\u00FBzA>\x13\u00F3\u00CFNB\x02\u00E7\u00DFd\x18l\x04i\x05\u00AFS\u00F1cT\u00FC3\u00E0\x17A\u00BA\u00CC7\u0082\x11\u0090\u00E5\u00C8\u00FA\u00A7\u00FB\u00FA(\u00C8\u00BC\x1C\x01\u00D2\u00A2_\x0E\x1A\u00E0\b\u0090m\u00EA\x05\u00F0/\u00E0\u00D7\u00C1\u00FD@\u00D6U?x!\u00C8r\u00FFg\u0090x\r\u00A4\u00EB}\b\u00C84\u0093cE\u009Cs(\u00C0r<\x0Bd\u00BD\u00B3\u00BCY\u009F\u00BF\x04i-\x7F\x01\u00F27\u00F9[g\u0080\u0087\u0081\u009Em\x17\u00F1^\u00F5\u00EF)K\u00E0\u00DA\x10\u00B79\u008F|\u00D2\x02\u00BA\u00C8&\u008Fx\u00D6\r\r\u0093\f\fQ@\"\u00C7\u00CDC\x14\u0090\u00C8!?D\x01\t\u00C4\u00D1\rb\u00A3`c\u00A6uc\u009C\x1C\x03J\u0081\x14 .[\u00DAS\u00C1\u00A7\u00C0g\u00C1\u00E43x\u00C9#nH\x05\x10\b\u00BBJ\u00C8\n\u00A6Ue\u0083\u00A1\x1B\u00F8\r\u0090\n\u00C8\u00F2a\u0083\u00FC\u0081\u0092\u0097n\x17\u008E\u00BCN\u00F7\u00CEu;\u00A8H\u00B4\u008EI \u00FC\x10HK\u0093\x06\u00C4\u00A5* \x7F{\x00\u00A4\u00A2\u00B0\u0091/\x06iA\u0092@8\u00A9\u0080.\x10\u00FE5HW;\u00AB\x02\u00AA\u00F39 \u009F\u0087e\u00CBN\u008E\u00A0\"\u00ED\x0Br\u00B8p$Hy>\x0B\u00AD>\u00EFy\x10\u00FC3\u0098\u0099\u008F\u00ED \x15\u0089\u00F9Is\u0095qN%\u00FC\x0E\u00F8\x17\x15\u00BE\x04d\u00BE\u00A6\u0081\u00A9\u008D\u009E\u008A\u00CD\u008E\u008A\u00E5\u00FEmp\x07Ho\u0080\u00D7\u00A8T\u00E7\u0083\u00AE7F\u00C5\u00A4\u00D2\u00CE`\u0098\u00C09\u00EFcY?\x06\u00B2~\x1E\x06\u00D9\u00D1'\u00F3\u008A\u00F3\u00E1\u00D4\x7F\u00B6\u00B6\u00E59n\u00CD!?D\x01\t/y\u00C4\u00E5W@\"\u00CB\u00CD\u009E\nHd\u0091\u00CF\u00A6\u0080L\u00E7\x15\u00F06\u00D0\u00F5\u00E3=\x15\u0090@\u00BCW\u00DA\u00AC\fw\f\u00C8\u008AcoIwf\u0088<\u00C2\u009E\x15@ N*\u00A1:\u00E7\u00E4\x05\u00C1\u00C6\u00E4\u008EG\u008E\x01\u00E3 ]!\u0086]%\u00FC7\u00D0\u00B5\u009C\u00AC\x00*\x11\u00DD\u00B7$\x10\u00FE\x10\u00BCQ\u009D\u00DF\x01\u00AET\\\r\x1E\u00A6\u00E2ii,\u0090\u00D6\u0087\u00BFK\x0Bw\x06\u00AF\x118\x1F\u00A2\u0080\x04\u00E2\u00CE\x05\t\u00DE\u009B\u00AA\fI\x05$p~\x1F\u00F8\u00A4:\u00A7\u00A2l\x05\u00BF\x05\u00B2\u00BC\u00BE\x0FR\u009EcuB\u008E\u009Bq\u00A4\x17p%\u00CF] \u00CC\u00BAd9|\x05<\x184\u00C1\u00E48\u0090\u00E7\u00E0\u00EF\u00C0\u00BBT\u0098e\u00F9+0\u00B3\u00D1\u00D3\u00E2\u00D2\u00AA\u00B2\u00DC\u009F\x04\u00EFW\u00F1r\f\br\"\u00ECu\x15\u00C7\u0089\"*\u00E1'\u00E0*p\x05\u00B8\x0E\u00E4\u00EF\u00B0\x13\u00E1=,\u00CFoQ\u00DE\x05\u00C2\u00C3\u00A9\x7F\u00AF\u00B6\u00E5\u00A9\u0080D\x16yO\x05$2\u00E5\x11\u00DE\u00A5\u0080\x04\x02\u009E\nHx\u00DC\u009CU\x01\t\x0F\u00F9l\n\u00C8\u0082\u00E3l \u0097\f$p\u009EU\x01\t\\\u00CBL;\u00A9\u0080.\x10f\u008F\u00CE1\u00DFh0)\u008F\u00F3\u00AC\x15@ >U\t\u00EF\x079K)\x15\u0090\u00C0\u00F9\u00C5\u00E0z\x15d\u00D8UB\u00F6\u00BEl0l8t?\u00A9<\u00C9%\x1F\u009C\u00F37\x19\u00C7q\u009E\x04\u00CE\u0093\x16\u00D0\x05\u00C2\u00DF\x03W\u00A8s6\u00E4[AZ%\u00BA\u0080\u00D9\x14\u0090n+\u00AD\u00CC\u00F5 -\x16\u0097\u0082\x18\u009F\u00A6\u0080\x04\u00C2\u009BA\u008E\x17\u00DD\u00F4iAC \u00DDIw\x12\u00E6k \u0097ix\u00CE\u00CE\u0080\u00F82\u00C3.\x10\u00A6\u00E2\u00D2\u00FA1OW\u0081\u00CB\u00D5%\t\u0084\u0099\u00F6\x16\u00F0\u00EB*L\u00A5\u00C9T\x0E*;]G\u00BA\u00AF,\u00F76\u0090\x1E\u0085T@%CO\u00E0\u00C7\u00EA\u00FCm\u009E\u0083\u0099\u00F5\u00CF2\u00E7=- ;!.\u008B$\u0081\u00F0p\u00EA?3\u00ED\u00AC\nHx\u00C8gU@\"U\x1E\u00E7\u00E9\n\u0098\x0F\x197\u00E7T@\"C\u00DES\x01\t\u00C4\u00D3\"p6R\u00CA\u00E3\u0098S\x01\tW\u0096\u00C0\u00F9\x10\x05t\u0081x\u00F6\u00D2T\x0E\u00AE\u009F1\u009C\u00B3\x02\b\\KUBZ\u0087\u009B\u00E4\x05\x05\u0084O\x019\x0B\u00B8\u00BF\n\u008F\x079~#N\x03\u00D9\x18\u00AE\x01\u00A5\x1B\u00E6\x02a\u00BA\u0081\u00B4\u008E\\\u00E3bx\u0088\x02\x12\u0088{\x0E\u00E4D\f\u00CF\u00D9\u0090\u00DD\u00B1\u00D4Fp\u00AA\x14J\x01\u00E2\\\x05\u00A4\x1BJy\u00E6\u0081c\u00D1\u00FD\u00C1L\x05\u00E4\u00F8\u0089\x1D\x01\u00D7\u00F0\u00DC\u00F4)\u00C7\u00B1`r}\x16\u00E7\u00B4L\u00AE\x1B\u00C9\u00BAf'\u00C0\u0089\x17\t\u009C\u009F\b\u00D2m\u00FC\x17\x15\u00FE\t\u00F8\x01\u00C8\u00BA\u0093n \u008E\u00EC\x04\u0089\u0089 \x1B\u00E6\"\u0090C\x05\u00D7]\u00E7\u00D0\u0081\u00F7\u00D0\u00FA\u00D1\x05\u00E7\f8\u00B1'\u00E8* \u00D3c\u0099\u009D\u00A2\u00C2\u00BF\x01\u00DF\x019I%\u0081\u00F3\u00C9 \u00D7\u00F6x\u00CE\u00A5\u00A8!kp\u0088s\u00DBV!\u00F5\u009F\u00DA\u00B6r* \u0091!\u009FS\x01\tW\x1E\u00C7\u00E1) \u0091rs^\x05$R\u00E4\u0093\n\u0088c\u00B2\u00F0\b\u0084\u00A9$\\\u00ABbCc\u00E1P\u00F6\u008B\u00EArVPV\x1D\u00BD, \u0097#&\u00AA \u00C3\u009C\u00DA\u00FF9\u0098V\x018\u00CA\u008A\u00CB\x04\u00E2\u00A5\x12*Y6\u00EE\u00B4\u00FC \u00CC\u00BCr\x12\u00A0\x03\u00E4\u00D8\u0090\u008A\u00CA\u00F49\u009E\u0092\u0093'8rR\u00E66y\u0083\x02\u00C2t\x17\u0099\u00DE\u00B5\u00A0\u00A7\x02\x12\u0088\u00A7;u\u00BE:w\u00AD,\u0095\u0085n\u009Btw] \u00CC\u00F1\u00D5\x06\u00F0\u00BB*\u00EC\u00CA\u00B3L\u00EF\u00E1y*\x10G\u00E5Z\u00A4\u0082n\u00BAl\f\u00D2\x02\u00BA@\u0098\u00F9\x7FH\x05\x19\u00E6\x04\x07\u00F3\u00B5\x06\u00E43\u00CB\u00C9\x15u\u0099\u00D79\x19\u00F31\u00C81\"\u00AF\u00B3\u00FC\u00D8Ym\x03\u00DD\u00B2\u00E7\x18\u009B\x13n\u009F\u0081\u00AE\x0B\u00CE\u00CE\u0097\u00B2$\u00C7\u008C\u009CXK\u00F5:\u00B8\u00FCD\u00CB-\u00C7\u00D18\u008E\x05\u00A9\u00C8\u00ED \u00AD\u00E6z\u0090.\u00A9\u00AC#\x1Ci%9\u0093\u009A\x06\u00C4\u00C9zw\u008F*\u00DA\x13\u0094Q\u00C7\u00BC\nH\u00A4\u00C8\u00E7U@\u0082\u00F2`V\x05,$s\u009C.\u00D7\u0080\u00BC[\u00A3\u0094<\u00A7\u00C6S\u0097!f\u00E2\\\u00BA-8\u00E7\u00D8\u008F\u00BD\u00ED)\u0088c\u00C5\u00B0\x01s\u00BB\x10\x15v\n\u00E2\u00DE\u00C3\u00D1\x13*mNM'\u0097!\b\u00C4O\u00C0\u00A1\x18q\u00AB\u009D\u0098\u00B4\u00DF\u00A1\x0B\u00F6!\u00AE\u00C9\x1D?\u0088\x1F\u008F\u00F3!;@\x10\u00CF\u0082\u00972\u00B8\u009Ew\u00D7\f\u00E4\u00D9\u00F09]\u009D\u0080|\u00DEmWJ>\u00A6i\t\u0096\u00E5X!v\u00D4\u00EDw\u00E5[c\u00AA[\u00D6\x17O\u00F5\u00FF\u00A9dzbkh\u00D2\u00B2\u00F8\u00E0\u00A1\x1B|\u00ED\u00FE\u00D3/\x12U\u00DF\u00F9.\u0097e|H;\u00EF\u00D6(\u00956\u00EB&\x02\u00F9\u00BC;> O\u008B\u00C8\u00E9s.G\x00qZ1\u00E4)R\u00BF\u00F7\u00DC7F\u00D7\u00CF\\S:\u00C6~\u00A7l?}Cx\u0096=\u00AEh\u00EF\u0085;\u00D7\u0088\u00E2\u00D2\u009Du\x7Fx\u00BB\u00CD\u0091\u00CF\x0E\u00F79\u00C1\x01\u00A4\u009Fs\u0097\x15d\u00E9y\u00B0c\u00D7![H\u0099\u00B3\u00FE\u00B9\u00C5\u00B1\u00D02\u0097\u008A\x02\u00C8e\bu\u00EE\t%\u00CB2L.C\u00E4\u0082\u0092gY'\u0097!r\x01\u00F2l\u00E7l\u00B7\u009E\u00BB\u0083\u00D8S\u00C8\u009E4\x0B\u00B8~\u00C3u\u00BEd\u00A3\u00CF\x03N\u008Ap\u00FD.\u00F5\u00A1\u00A7\u0083\u00AB\u009CS\u00C1\u00C9\x03\u00CErq,\u00C8\u00F5.Nt\u00B8\u00DB\x7F\u00D8K\u00D0\u009A}$CC\u00C1]\x1E\u00DCZ\u0094\u00FA\u00D0\u00B4l\u00AC\u00CC\u00E4x-\x05\\W\u00E28!uL\u00E2n\u00C3\u00CB\x04\u00C7q\u00EC<\u00E4\u008C\\\x01\u00A0\u00E2\u00F39\u00AD\u00C7\x1E1*_z\u00DE\x1E\u00A7\u008F\u00DBTQ\u00D4\u00FAas\u0095\u00D1Y4\u00B5g}\u00E5\u0098\u008A\u00B6\u00EE\u00DA\u00A8\x19\u009A\u00B1\u00B1a[\u00CD\u00B1g\u00D6\x04\u00A7Ly\u00FF\u00C8\u00D3\u00C7\x1F\u00BFr\u0099\u00B8\x7F\u00FC\u00F9\u009A8\u00EE\u0081\u0080hF\x17\u00F8m\u00DF\x1BH\u00E66\x11]|\u00A1\u0088]s\u00A0XvK\u0095\u00FD\u00F4>\u009A8\u00B1,\u00AC\u00CD\u00F2\u00BD&Jb\u008F\u00D8\u00FA\u00E2~C\u00BB\u00B3\u00BFG\x04\u008A_\u00A9}\u00F3ci\x01S\u00C02\u00A3\u0082\u00E4lh\n\u00EC\u00B5G\u0083\u00C9-wg\u009F\u00A1\u00EF\u00F9\u00F2\u00EF\u00EC\u00D7k\x0E@\u00E5,\t\u00CAM\u0091\u00F3\u00FC]\u00F8\u00FB\u00980\u00BBKE\u00F8W\u00DB\u00C4\u00A0\u00A9\u00C7\x16\u0096W\u00C1\u00DA\u0099q\u00C30u\f\u00E9\u00E0\u009A[q\u00CB0bhaQ\u00CB\u00B6\">aFF\u008E\u0099X\u00DC\u00B9e\u00FD\x16\u00BF\u00CF\f\x05}\u00F6`\u00A9_\x1B\u00AC(\u00B2\x07\u00EA*K\x06\u00EA\u008B\u009BB\r\u0095\x13\u00A2e\x13\u00F6\u0088\x07&N2|\u00E5\u00E5\u009C\re\u00DD\u00F1\u00C7\n\u00C1p\u00B6\u00F3\x11\u00AC\u00A3\u00BC\x1D\u0087\x02\u00CB\u0084u\u009F\u00D7\u00D0(\u00B0\u009Ds\u00FD\u00B7\u0090\u00BC\u00B0\u00CC9\x1C\u00C9\u00BA\u00B50\u00AB%\u0084r\u00B2>\u00B8p_\u00D0\u009E7\u00C8S\u0089\u00D8\u0093\u00B8\u00FB7%\x10\u009Fj\t\u0097\u00E0\u00C0\u0085`\x16&]\x10?\u00AE%\x171q\u009D=\u00CC\x10\u008B\u0088xZ\u00AAr\u00C4\u00CBEi\x02qC, \u0081x>\x13'\u009B\u00D8\u00C3s\x11\u00FD\b\u00F77pm\u0088%D\x1C\u00AD&\u00F3\u00DE\u008Fk\u00B4\u00B49q\u00D5\u0095\u0089\u0091o\u00FD\u00DE\u00FE\u00C6\u00C7m\u0089C\u00F7\u00BFZ?\u00B8\u00E5\u00A8\u008A\u00EA\u0083[\u00FD\u00E2\u00C0\u0091\u009A\u00D8\u00C3\u00A7\u0089\x06\u00FC\u00BAS\u00A8\u00EC+\u00B6\t\u00DB\u00EC\x10\u00E6\u00F6\u00B7E|\u00D3\u00F3v\u00C7\u00A2\u00C3ckn\u00BC\u00B1\u00F4\u00AD\u00AB\u00F0\u00BB\u00B7\x06\u00C4\x04\b^\u00E6\u00FB\x15\u00E4\u009E\x13\u0083\u00BF\u009C'\u00F4;\u00F6\x11\u008B\u009E\u00F4\u008B\u008Ffh\u00E2B\u00A45]\u00BB\x15\u00D7\u00DE\x10\x037o\x15\u00E6\u00B3\u00B2\u0083\u009E_\u00F7\u00FE\x06.nK \u00EFr_\"\u00F2\u009D\u00B7\u008E Ko\u0083\u0096\u0087\u008B\u00F1\u00C9r\u0084q9\t\x7F\u009E\u009F\u00F0%M\u009C\u00FEJ@T!O\u00DF\u00F7Q\u009F\u00FB\u00D1\u00C4\"\u00C2\u00EC\u00EB\x17f($\u00FAB!;\x1C\x0E\u00D9\u00A1P\u00D8\u008AF\u00C2f$\x12\u00D1\u00A3\u00D1\u0088\x1E\u008FFb\u00B1h\x14\u009D4\u00AD\u00B6\x15\u00E9\u00EBl\u00EF2\u00F4H\u009F\u009D\u0088t\u00FA\x12\u0083\u009D%\u00C6`{u$\u00BA\u00AD\u00BE\u00C7\u00DA>f\u00A7o\u00E7\b\u009Fo\u00A0d\u00FE\u009DF\u00E9q_a\u00FB\u00A2u(\u00C4\u00F2\u00B0\u00AD0\u00DFy\x15\x16\u00B2n\u00FD\u00D3\u00AB\u00C9\u00BA\u00A0\u00EE\x02\u00F2\x1C\u00DA\u00D4B\u00B6\u00C3\u0089\u00C9\r\u00C8sH\x11\u0084|Z;\u00F7\u0082*s\u00D6\x11\u00BD\u009A\u00ACyI[\x03r\u0081\u009BY@|\u0098\u00BC\u008D\u0092\u0080<\x1B1\u00DD\u009B\u00AC=\x03d\u00D8{\u00D0\u008D\u0090\n\u0088L\u00A1\u0096\u00D3\u00A12\u00CA\u00E9\u00E7\u0083\u009C\x18y\x1F\x15\u0090-:\u00E9\u0082 .\u009F\x02\u00B2Wc^\u00B8\u0081\u00F8D\u00D0\x13\u0090\u00A7\x02\u00B27\u00CE\u00EB\u00F6\x11\u00F5\"~\u00F9\u00EDw\u00DAK\x03\u00B3\u00B5\x1F^\u00D1Q\u00F6\u0095\u00AF\u00DDZS}\u00FF\u00C9Aq\u00CD\x18\u009F8\u00C2\u00AF\u0089F\u00FC:3\u00E0\u0080\x1D`\u008B\u00D0\u00FC\x07\u0089\u00C0\u00E8)\u00A2\u00FC\u0090jm\u00E4\u00D4\u00E6\u00D2\u0083\u00A7\u00C25hq\u00A4\x1C\x7F\u0089\u009BP\u0090\u00D9v:\x1Dh\u00FAr:\u00C9\u00D9r\u00E2\u00EE5\u00B7\u00DA\u00F0\u00B8\u00B1\u00DF\u008A\x7Fmx\u00E3\u00CA\u00B9\u00CB7\u00C6\u00AFY\u00B32\u00B1j\u00F3\u00ED\u00C6g\u00EB\u008F\u00EEj\u00FF\u00D5A\u00ABz\x0E\u009C\u00B4\x1C\u00FC\u00A1\x14\u00F6\x00\u009ES* \u00CAK\u00B9\u00A0i\u00A0w \u00AA\u00E4\u00C2\u008E\u00B3u\u00C7)\u00EE\u0084\u00B0-0\u0091\x10z<.\x128&\u00E2\t\u00DB\u00D0uK\u00D7u\x13\u00B4pn\x18\u0086n\u00F8\x03A#\x1A\x19\u0088\u0099\u00A6\x11\u00B7L#\x06\u00A1\u00B00c\x11\u00BF\x15\x1F(J$\x06\u008Bbv\u00A82,\u00C2(\u00E8\u00B8\u00EF\u00D8\u00D3DQk+\u00CB\u00BD \u00AB\u0083\u00BCS\x01\u00D9\x0E\x0Bq\u00B5S\u00EB?/ O\x05dE\x15\u00F4&\x0F\u00E4\u00A9\u0080t\u009D\u00F3Z@U\u00E6\u0095(\u00F3\u00BC\x1B\u00D4\u0087(!n\u0096\n\b\x14ZHR\x01!\u009F\u00AF\u0090\u00B8%\u00EBU\u00D0S\x01]\u00E0\u009A\u00AB\u0088\u009C\fb\u0093\u00E4\u00F6\u00AC{A\u00AEgQ\u00F9\b\u00F6\u00A0Y\x15\x10\u00D7\\\u00D7\u008C\x13\x12\u009E\u0093>\u0090\u0097\n\b\u00D9\u00BC\u00E3\x11\u00A2V\u00C4\u00AFA\u00D7w\u00D7\u00BE\u0097j\rG\u00DF\x16\x10{@\u00E3\u00FE\x05\u00D6\u00CA\x1Dx\u00E4\u0086\u00D3&\u00AC\u009D\u00CE\u00BCPH5xG\u00D1h\u00944aoc\u00B1c0U\u00E6(h\u00A9,\u00FE\x0Ea\u00C7,ao\u009A.\"\u00E1\u0099\u00A2}zs\u00DD\u0088\u00E9-E{N\u00DE#\u00B8\u00C7X\u00E1\u009F8\u00B9\u00BC\u00B8*!\u00CB\u009F.>+}\b\u00F0\u009C\u00B9\x14\u0090\u0090\u009B\u00B9\u00ABU\u00C9N\u0091\x7FY\u0095h\u00F7\x06\u00FA=(\u009FAE\u00D4\x13vB\u00D7m\x1E\u00A5\x02\x1A:tN7|\u0081\u00A0\x19\t\x0F\u00C05\u00D5\u00E36\u0095\u00D0J\u00C4\u0084\u00A5\u0087}\u00A6\x1E\nZ\u0089\u00C1R\u00C3\x1C\u00AC\u008A\u00D8\u00A1\u00EA\u00A8/Z5\u00AD\u00D5*\u00BB`\u00AE/\u00D0\u00D0\u0098\u00D7\u00FA\x11\u00C8\u00BBT@\u00E4\u00BD\u00901\u00A0W\u00FDg\x05\u00E4\u00A5\x02B\u00B6\u00D0\u00BCH\x05\u0084|!c\u00C0\u0082\x15\u0090HSB\u00DC\u00FCy) \u00C1\u00F1\u00D9J\u00C8fU@\x17\u0090\u00A1\"R\x01\u00F9\u00DA\u00D3\x02\u00903\u0087\u00DF\x06\u00B9U\u00E9p\\O\x1B\u00D7!.[\x05p|\u00C9}\u009Ei\u0080\u00FC\u00B0\x14\u00F0\u00C8\x03\u00E23\u00A0F\u00F3\u00E4\u00F9\u0082\u0080|\x7F\u00E8\x1BP@\x07\u00FC9z2\u00AB\u0084\u00D1\u00B1\\\u00C4W|*\u00B6\u00ADl\u00B3W\u00AC\u00D8a/_g\u0088U\u00DBm\u00B1\u00D5n\x13\u00DD\u00903Vs\u00E8\x01\u00B5\x1B\u00EB\u00DC\u00DB\u00A4\u00F1\u00C8z\u00B2\u0085\u00BD\u00FD\x00\u00A1UO\x17{\u009F\u00BE\u00E0\u00BC?\u00FF\u00F0F\u00FF<{N\u00CB\u008D\u00F3?\u00F6\u00F7\x1D\u00B9\u00B6\u00A5n\u00E1\u00BC\u00FB\u00C6l\u0080\f\u00FDW\u0080\x0F\u00EA\u00FC&\u00EE\u00ECH\u00B6\u00CF!c\x0E<g>\x05$\x1CK\u00A8\u00F2\x04\x7F\x1D\x7F\u009D\u00EA\u00B4U\u00AD\u00DAY\x1Au\u00B0\u00A8\u00C4\u0097\u0088\u00C7\u0090\u00B1\u00BCm^\u00947\u00D7\x07|{\u00EE]\x14:ovAe\u008E\u00BC\u00FFC( \u00E4\u00CB\u0092J\u0088\u00C0\u00E7\u00A6\u0080\u0090\u00A5\u00C9\u00E7\x04\x0279\u00E7\x05\u00E4\u00E9\u0082r\x0F#\u00DF(\u00E0d\f\u00D7\u00AB8\u00DB\u00C9x.\u00A6;-\x06P\u00E7\u009E\x15\u00800+\u00DC11\n\u0090\x1F\u0096\x02B\u00BE\u00FC\u00CD\x0F\u00E4\u00A6\u00E0\u00F2\u0083\u00AF\u00D3D\x10McO\u00FCb\u00A9\u00F4\u008EoGC=Y\f\u00FE\u00F4\x04\u00D1s\u00D8\u0089\u00C6\u00E0)s~\x14\u00BD\u00ED'{\u008D\u00DEk\u00A2o\u00C6\u008Cf\u00DF\u00DES\u00AD\u00F2=G\u00EA\u00AD\u008F>s\u00D2\u00AC[l\u00A3\u00B5\u00EE\u00EE\u0099=G\u00AE\u00B5E\u009FrGG\u00CA\u00EC*\u00FD\u00E8\u0095\x1E\u008E}\u00D8E\x13\u0097\u00BCs\u00E3\u008D\u00D6-\u00BEE[\u00E6\u00DD\u00B0\u00D6\u00C2\x18\u0090\x1D\u008E\u00B4\u009DuS\u009C\u00FB\x1C\u00E5u\u0086u\u00D6\u00B6d\u00BB\u00C8\x1C\u00EB\x16\u00A2\u0080\u0084L\u00BBf\u0092\u0093\u00B6\u00B3\u0086\u00C2*E\u00DE,\u00E6\u00CF\u0086\u00EF\u00E5\x1C\x1D8\u00C7\u00A2\u00A2b\u00A1'\u00E2\u0096fK!\u00C09 \x15W0\t\u00AD\u00B64h\u008C\x1EWd>\u00FF\u00F0n\x05L\x01\u00E49Fw\x1A3\x02\u009E\n\u0088x\u00CF\u00DD\u00DF\u0088\u00F7T@/y\u00C4\u00CD\u00C2\u0081\u00B3T/\u0080g\u00E1zr\x12!\u008B\u00BC;\x06\u00A4\u00C2r1\u00F9d\u00C8p\u00E1\u009AJ\u00CC\u008D\u00C7|\u00D0\x16\u00C4qgF\u00D6\np\u00D3\u00C6\u0091;Q\u00F6\u00C19wiP\u00A9;p\u009E\u00D6\x18\x10\u00CF\u00DFd\u00A5\u00A7\u008D\u0081\x11\u00AF\x1AC\u00E2y\x1C\u008F?\u00EDE\u009F\u0098x\u00BC_\u009C\x0E+x\u00A0\u00C6\r*\x0B\u00C5\u00E0\u00CF\u00DA\u0085\u00F1\u00A4l\u00E7\x0Bj\u00DF[\u00FFc\u00A41\u00C4\u00D2#\x1D\u00E8M\u0082Z\u00C67\b\u00C4w\u008C\u00A0\x1C;.\u00F0\u00B3(.\u0086\x05-\x12\u0083'\x1E-\u00BAk\u00AAc\u00D7}{J{\u0099\u00D5\x118V[YV\x16\x0EY\u00FE\u00F5U\u00E6\u00B6ms\u00EB\u00B7\u00D5\u008E(\u00AA\u00BC\u00D4/\u00AAGib\x0E\u0094\u00B0Q\u00E3\x16\u00D5>\x11~\u00C6/\u00AC\u008E\u00B0x\u00A3\u00B2\u00ADC\u00D4\u00FEiG\u00D9\u008Ah\u00B7\u00F1\u00C0\x05\u00DA\u009B\u00EBN\x18\u00B1\u00F8\u00CA\u00FA\u00C6\u0096cJF\u00CC\u009A&\u0082_h2\u00B5\u0089\u00C1\u0088\u00A8\u00B7bB\u0084\u00DA\u0084\x11\u00DEjG\u00B7=\u009A\u00E8Y\u00F7hp\u00C3\u00ED\u008D>s\u0091_|\u00D4\u00AC\u0089\u00EBQ\u00BA\x15\u00EA\u00FDS\u00AB\u00AFJ\u00D8\u00C8\u00EB@\x19\"1\u00A0+A;\f\u00B2\u00ED\x1A\u00E8\x17C\u009F\u0089\u00E8\u00D6\x01\x11\u00DE\x146wD\u00C2zG<\x1E\x11>\u00BF\u00DE\u00DF\u00DD\x19\u008E\u00C7ba#\x1E\x1DL\u00C4\"\u00FD\u00C2\u00B2\u00FA\u0085\x1D\u00EC\x1F\u00EC\u00ED\u00DF\u00A1[f\x1F\x1C\u00D9^\u009F\u009D\u00E8\u00AF\u00A9,\n5\u00D4\u0094E\u00AD\u00D5\u00CB:\x1A\u00BB\u00ED\u00D0\u00B8\x01_\u00B8\u00DE\u00E7\u008FW\u00FD~I\u00B1\u00BF\u00BE!\u008ErLS@\u0094\u00A1W[\u00C9[\u00FF*(\u00818O\x05\u00F4\u0092%\x10\u00EF\u00A9\u0080Y\u00D2\u00CE\u00AA\u0080Y\u00E4\x1D\x05\u00D4\u00B4(\u0097(\u00B2Z\u00C0,7g\u00B5\u0080\u0099\u00F2\b\u00D3\x02\x1E\u00808\u00EE`\u00E1^\u00C0sq\u00EE\u00CCD\x00\x1E\u00F2R\x01\x11\u00C7\u00DD\x1F\u009CQ\u00E5X\u00E7r\u0084\u00EFF\u0098\u00AF7\u00BD\x03\x12\\\u00DA\u00E8\x06\u00B3\u00F6\u0080n\u00DA8\u00F2\u00F5$\u00EE\u0087\u00A4\u00D5\u00E7\u00CC+\u00C3iP\u00BF\u009B\u00A6\u0084\u0088K\u00E9\u008D\u00E3\u00ECD\u00C6_\u00B2> \u00AA\u00C7;c\u00C1f\u008D[D\x13\u00A2\u00F7\u00A85BDm\u00A1M\u0098\u00B9\x7F\u00ED\u0093\u00CF\u00A5\u00ED\u0098q\u0081\u00B4\u00A8\u0084\x1Cn\u00BD\u00DD\b\u00E7\u00F8\u0082\u008F\u0082r\u009Ar\u009E\u009F\u00E2\u00F3D\u00FC\u00FDV\x11>\u00EF\u00FB\u00E2\u0093S4\u00B1\u00F0G~1\x11M\u00EB\u009F}Kqm\u0096\u0088\x7Fd\u0089\u00E2\u00FD|b\x15\u009Ep\u00BA\u00EC2\u00B3\u0081\x1Bn^\x11\u00A1\u00FB\u00E6\t\u00FD7S\u00C5\u008B\u00BF\u00F0\u008B\u00D5{h\u00E2\"\u00E4\u0095\u00E9y\u0083\u00AB8\x0F\u0089\u00DE\u0093\fQ\u00FB|P\u00CC\u0083Q\u00BB\u00C1\u00AF\u00A3\u0083@1\u00A0Hl6=\u00F8\r\u00AChVd:\u00D8\\v`\u00CC\x1A\x12fgHD\x06\x07E\u00BFnZ}\u00BD=\u00C9\u00D9\u00D3D<\u00AE\u00C7\u00F1'2\u00D8\x1F\u0089\u00C7\u00A2a=\x1E\x0B\u00E9\u00B1H\u009F\u00A5G{|\u00C2\u00EA)\u00F1\u0099\u00DD\u00F1\u00EE-\u009B\u00CAB\u0091\u008EZ\u00E8r\u00CB\u00E4Y\u0091\u00BA\u00AExw\u00F9\u00BAu\u00DC>g\u00C0\x0BH\u00D6\u00AB[\u009F*\u00C8pV\x05$<\u00E4\u00B3Z\u00C0LY\x02qY-\u00A0G\u00DA9-\u00A0\u0087|R\x01\x19f\u00C3\u00C4\u00F9\u00E7\u00E6\u0082\u00B2!\u00BB\x0F\u00CDL\u00A4\u00BD\u009A\u0093\n\u00C8'\x15\u00D0\u0089\x11\u00BFVGnq\u00E3\u00FBk\u00AF\u0080,xN\u00EE\u00E4T\u00C0\f0\x1F|N\u00CE\u0082\x16\u00FA\u009C\u00A9\n\u00C8\u00FB\u00E4`\u00AEr\u00B4\u00D3\u009A\u00EB5\u00B6\u0091\u0084\u00B0\u00FAQ?P@\u00E1\u00F3\u00F5eS\u00C0\x14\u00C8\u00B1\u00D7\b\u00A5I\u00A5\u00F2\u00E0\f\u00E3\u008CM\u00CE\u0094h\u0087\u0094p\x0B\u00C9\u00F1\u00A25\u00E6\x04\u00E0\u00A2jn\u00B0>o\x15v|\u009A\u00A8x  \u00FC\u00F8\u009D+r* \u00C1\"\u00D7\u0084\u00C6\u00E6\t\u00B9 \u00A8\u00C9\u00A2b<\u00CE\u00E9\u00B8\x03C\x15\u0090`;\u00AA\u00C3\u00BD5\u00C2W]-\u00CA*kDyY\u00A5VQQ\u00E9+-\u00AB\u00F4\u0097WT\x05q,\n\x04\u008A\u008A\u008BK\u00CAK\u008B\u008A\u00CB+\x02E\u00A5\u0095\u00C1\u0092\u00F2\x1A_\u00B0\u00ACN\u00F8K\x1B\r\x7Fi\u0093\x11,\x1F\u0095\u00A8,i\u00F6Oi\x1C\u00DB\u00BBcMEl\u00CD\x1A\u00967\u00995\u00E7\u00A8\x1F^+\u00B4\u00FE)\u00FF\u00FF\u00CF\x05M\u00D9\u0088\u00C1\u00F5\u008B\u00CFM\x01!\u009B\u00EA\u009AqA}\u00C8>H\x02\u00F2\u0099\nH\u00FC\x04\u00E4v$\u00A6u\x04\u00C8\u0082Y\x06r\x17LA\x15\u0080t\u00F9m\x17*\u00FF\u00B0\u00C6\u00808(\x05\u0094\u00E0K\u00B0\u00C1\u00AA1(,4J\u00B6\u00CB\u0080ZV0\u00B6\u00C4\u00D1T\u00D0h-\u00AB\u0090\u00EF\u00CD\u00A4\u00CDB\u00F2\x01\u00DC\u00C9\x15k\u00AB3a\u00D3\u00AD\u00C6\u008A\u00F2U\r\u00F5\x1D$\u00CD\u00EF\u00C4y+B*8\u00B4k\x11\u00FE1\x18\u00B7\u00C2ZS\u00ADU\u009F\u00A1\u00E0\u00D4\u00B9\u00AD\u00AA>&\u00D7\u00C8\u00FD\u00C2\u00DC\u0081\"\u0084\u00F6u\u00B3/\u0091W\u00D4/\u00A9{\u00D3\u0092\x18\x02%\u009B~@\u00AF\u00EE\x03\u0091\u00B6i\u00E4U\x10\u00A2\u00A4jD\u0089\x11\t\u00E9vo4\u00CD\x05\u00F5\x02\u00EA\u0087Y\u00FA\u00BBQ@\u00C2)\u00F7<\u00C0\u00CD\u00FFS\x05$\u00F8&t\u00DAwR\b\u00C8\x0FQ@\u00C4\u00B1\u00A9rA\u0094o\u00C3sV\u0095o\u0081\u00F3\u00ADkn\u00A0\u00A62\u008D\u00C1\u00B5B*\u0098\u00EF\u00D7}\x02\u00D9\u00FF\u00C9\u0084\u0080\\\u00C0\u00AB\u0083kG8\x16\u00CCQBs\x1B\u00C4l9\u00A1R\u0088\x12\u00CA\t\u0090\u00F2\u0091N:\u00CE\u00AB\x16j\u008Dp\u00B3c\x02\x07\u00D4\u00CE\u00D6f9\u00F1\u00C2\u0097\u00C6\u00CF\x13\u00E1\x05\x0BD\u00EF\u0097t1\u00FF&]\u00FC\u00C0\u00B4\u00C5\u00A3r\x1E\u0084/\u0090\u009F+\"/\u009C$\u00FA\u00CE9M\u00BCw\u00E6\u009C\u00A5'\u009F\u00B0_\u00C7a\u00FB%\u00C4\u00B5(9\u00CA\u008D\u0095i\u00D0\u00A3\u009F+\x12\u00CB\u008F\x16}g\u00EE+z\x0E\u009A\u00BC\u00F4\u00FD\u00AF^s\u00C5\f\u00AD\u00E7\u00C4}Nn\u00BF\u00BC\u00F5\u00CAS\u00EF\u00999\u00D7\x10\u00E7\u00D6\u00DB\u00E2^\u00DB\u0096;\x16\x1Cp\u00D9l;\u00DC\u00D1\u00CF\u0084\u00D9\u00B3LD7n\x17;VX\u00A2m\u00BB-\u00D6\u00E3\u00E7\u00A9\u00B0\x0E\u009CgIj*\x14\u0084\n\u00E8\u00F3\u00C1\u00D94\u00F3\u00EA\u0093DiUM\u0091\u00CE!\u00E4`\u00AC\u0090\u00B6\u00C5_\u00FA\u00BBR@\"\u00AF\x12\u00E2\u00E6\u0082\x15\x10`z\u00D9\u00D6\x019&L{5\x06\u00A0\u0097\u00E5\u00A5\u0080\\\u0088\u0097\x16\x1A\u00C7\u008F@~4\u0088\u00BB_\u00B8\u00FB\u0080\u008Bn|\x1F.\u00B9\u00A0\u009F\x05,\u00A4\u00AF\u0082l\u00B1\u0085\u0080\u0085\u0094\u00A9\u0080\u0084\u009A=\u0094\u00E7\u00AA\u00A1r\u00E2B\x13\u00E6F'\u00DB\x0B\u00DB\x7F6\x11\r\u00F7\u0089S~\u00F7\u00C7\u00B5g-~u\u00E3C\u00CF>;\u00F0\u00F4\u00D3O\u0087\u00C8g\u009Eyl\u00F0\u00CFK\u008E\u00FC\u00F0\u0099\u00C7\u00DF>\u00EF>\u00DCs.\u00AC\x14\u00E1X;9O#\u00EC-\u00CEB}B-\x134\u00CB6\u00B0\n\u00DA\u00D9#\u00ECO\x12pW\u0085X\u008Da\x1A\x7F\u00CD\u00A9\x04\x0Ek\u00FB\u0084\u00B1l\u0093\u00B0\u00DBV\u008A1\u009B\u00DB\x17\u00BD\u00F0\u00CA\u0088\u0086w>\u0086U\u0099\u00EE\u0093r\x13\u00E5\u00F0\u00F6\x06(\u00D2\x0E\x11\u00FE\u00E6Vao2\x12H\u00FD\u00AC\u0083^\u00FB\u00E9\x0B\u009F\u00DAu\u008B\u00D7\u00BE\u00B0\u00EF\u00DD\x1F\u00DDu\u0088\u00BE\u00EAe[D\u0091\u00A7>4i\u00E7\x11\u00F9u\u008E\u009B\u00F0\u00DB\u00B7\x0B\u00AB\u00F7A\u00A1\u00F7=\"z\x07n0\u00BBw\u0086D\u00D7\u0087\u0096\u00E8\u00D3m\u00FC\u00BA\u00AD\u00F6\x0E\u00AA5ku\u00B05\x1F\x1B\x19-\u00A0\x13\u0091\x07E\u00A5e\x01#\x163\u00CDD\u00AC\u00B0\x1B\u0086\u00A1\u0080\u0080tZ \u00FBWW@\u0080\u00ED\u00BC`\x05\x04\u00E8^{* \u00C1\u00B7\x03\u00B8\u00AB\u00DE\u0093\u00B8\u00CEz\u00A1u\u00A8\u00F7\u00BA\u009EAz@\u0094\u00E7N\u00F4d<\u00C2\u00FC\u00CC\x01\u008F\u00CC\bw\u00D8\u00F3\x13\x0B\u00BC\u00C6\u00D9N\u00DE\u00C3\u009D\u00E8\u00AE<\u00BFe\u00C2}v|\u0095%\u0099\x06\u00898\u00BA\u00B2,X\u00B6_\x1E\u00F9\u00AA\r?3\u0091&\u00A7\u00C8t\u00F9\u00F6\x06\u00BFI\u00C27\x1Ed<\u00CE=\u009F\x03\u00F1T4\u00A6\u00CB\u00DD\u00EEi\u00D7&\x0B\u00B1\x07k\u00A7aO\u008C\u009DptFo,K\r:\u0082\u00B6\u00E0/\x11\u00CB\u00DB\u00BF<\x1D\u00AD\u00E3k\u0093g\x1F1e\u00FC\u00D1\u00C7\u008C;\u00E7\u0094S*O=\u00F5\u00D4rr\u00CE\u009CY\x15\u0087\x1C<j\u00CC\u00EC\u0099\u00A3\u00CAN\u0087c\u00DB:\u00D9Ig\u00B4\u00B4TT\u00942aG\u00AA\u0085\x06\u00C7\u00D9W\u00A3\u00A1f\u00D9\u00D3p\u00F9\u00C1'\u008C\x0E\u00B6\u0087\u00A9b;\x0E\x1CK\u00CA\u00FB@g\u0098\u00ED\x13\u00F6 \u00DABm\u00B3Xe\u00CF\u00F6!\u008F\u0081\u0089\u0087#;\u00F0C\u00E8Z\u00F8\u00A5\u00F7o\b}\rT2\u0081\u00C8`\u00F1\u009A\u00DA\u00F7\u00D6S?\u00F9\b|s\u00A5\t\u00AA?\u0095\u00CF6b\u009Ac\u00CC&'-\u00F0'\u00C2\u008A\u00C1\u00F3\u00B7W\u008B\u0084\u00F5\u0089%|\u00EBL\u00A1E\u00A4\x1D\u00A2\u00E1\u00A7\u0094\u00A3w\u00D4\x05\u00F4ut~\u00FCA\u00A1\x15\x15\x0B\x1F2\x10,*\x11E\u00C5e\x02cA\u00AD\u00A4\u00ACB+\u00C6\x18\u00B1\u00B4\u00A2\u00CA_^U\x03\u00D6\x06+jF\x14\u00D7\u008F\x1E_^Q\u00D3TZ\u00D10\u00B2\u00B4n\u00FC\x1E\u00D5\u008D{\u00EDS\u00DBp\u00E41#*\u00CF\u00B9\u00B0\u00A1\u00F8\x07\u00B75V\u00BD\u00FCnZ=\u00E0\u0087\u0092\u00F5\u009F\x1A\u009F\u0085,&\u00BA\u00FF|\u00E7\u00D0\u00EBz\x1A!\u00C7\u00B6(\u008B\u00C2\u00EBz\x06\u00B9\x01\u009E\u00ED\u009C\u00EFTz]\u00CF$\u00F3\u00C1\u00FC\u00F0\u00F3'^\u00D7\u009B8&\u00DC\u00E1E\u00DCD\u009F\u00A4\r\u00E7\u00ED\u0099\u00D72\t9N\u0094\u00D0r\u00AD\u00F3\u00BA\u0096r\u00CE\x0F!]\f\u00D2=\u00A4/\u00B61\u00E5\x1A-\x11-\u00EE;n\u009C\u008A\u00A7\u00B9\u00A0uZ\u009B\x1A\x0F\u00F2#P\u00DCc\u00CA\u00FD\u00A0\u00A9\u00F2\x1C\x03r\u00E6\u0084\u00AE\u00E8\x13\u0088\u00DB\u0092rm\u00A7{\u009E\x12\u00C7\x16\u00CD\u00FDa\u00C9\u00BC\u00A4\x12M\u00B9\u0081f\u00BD\x04*\u00CA&\u00E7\u00B8\u0091|\u00C9\u00C1\x12\u00D6:(\u00A3Y\t\u009B\u00E5\u00F3\u009Bh\u00D1\u009C\u00C8\u00A0\u00F9u\u00C7F\x0E\u00E8\u00A9\u0086\u0085\u00B1\u00BEI\u00D8x\u008A\u008EfM\u00A6\u00D3 \rn\u00B7\u00B0\u00CDbao\u0080\u00BA@s\u00A8\u00DA\u00BC_\u00ED\r\x17\u00C6F\x14\u00A9\u00DE(6\u00B7\u00A1p\u009A\u009C\u00FB\u00EA\u00A4\u00A28\u00D7\u00ED\u00CD\u00D0\u00A9\u00DE\u00ED\u00E2\u00F5\u00F7'\u0087\u0099G*1e\u0082\x14\u0091J\u00884\u00D6!\r\u00BA\u0086F\u0082\x114\u00E1\u009B\u00DDg\u00C3C7\u00F2\u00BE\u00D2F\u00E7>g\x0E\u0088\u0096\x10*f\"}c\x00V\u00CD\u00B2-\u00C3\u00B4\u00F5D\u00B9\u00D0\u00D1\"\fd\x10\u00C6P\u00E5\u0093\u009D\u0084\t9\u00D8g\u00CB\u00C4O\u00C4\u0084\x01!\x1D\u00C7D<\"\u00E2\u00B1\u00B0\x1D\u008B\u0084\u00ECxd\u00D0\u008C\u0086\x06\u00CC\u00F0@\x1F\u00D8\u00AB\u00C7cQ\u00B3\u00AFk[\u00A4\u00A7\u00A3m\u00B0\u00B7\u00BD-\u00D4\u00B3qu\x7F\u00E7\u008A\u00A5\u00BD]o\u00BE\u00DE=\u00F8\u00F8\u0083]\u00F1\u00F9Ww\x0E\u009C\u00F0\x05\u0099G\u00FC@\u00B6\u00FA\u00F7$\u00E4\u00F8H\u00E4z\u00AF\u00EB\u0099\u0084\x1C;&\u00D6}\u00B2\\\u00B2\x11r\u00EE\u00CB\fC\u00DA\u00B9\x17!\u00C7\u00B5+\u00E6\u009Fz\u00E4)Cz\u00BA\u00A3\u00D0N\u00E9\u0082\u0082\u00CA\u00D1\u00C8\x0E\u00C8f\x1B\x03\x0E\x01d\u00E8\u0092r{\u00E2\u00A18\u00E7\u00C3H \r\u00D7\x05\u00CD\u00B5\x17t\b O\u0085K\u00EE5\u00C5\u0091=%-.\u00A7\x16\u00F9\u00EE\u00DB\u00CF\u00C1\u00AC\u0080\u00BC\x1C\x03\u0082\u00B9\\\u0090\u00E4\u008E\x12f\u00C6Q\x02g\x1F\u00B1M\x13\x05\x07\u0095*Q\u00A9f6\u00F9\u00E3\u00E9\u00E0\fh\u008907W\t\r\u00CEw\x0FJV\u00FA2\u00EA\u00BB\u00B4\u00C6\x16>\x1E\u00B4\x03%@E\u00A0\u00BF\u00ED\u00EE\x1957#kf\u008B\u00DCl[5Nj\u0096\u00FC\u00BA\u00AE\u00D3\u00C6\u00A08[\u009Cl\u00BF*\x0E\u0092\u00F5\u00E8N\u00FA8.\u00B3\x1A\u00B7nE\x1A2\u00CF\u0082\u009D\x11;\u00D6THW\u009B\u00CB.\u00F2(/\u0093H[\u00CD\u00A9p\u00A1\u009EC=\u00DB*\u00D3\u00D8\u00C9h\x01Mv2~\u0099[PV\x11\u00E4a\"\u009D;r\x03V\u00D2or\u00DB[\"\u0091W<_\u00FDg\x02\u00F2\u00FF\u00AD1 XH;g\u00BF\u00F3W\x19\x03fb\u0088\x12\u00E2\u00E6\u0082\u00C7\u0080\u0090-D\x01\u0093\x05\x02yzJW\u0083?U\u00BF\u00E3\u00C6\u00E5T@\\\u00CBZa\u00B8\u00E6*\"\u00DD\x15\u00EA\x00-2_n\u00FD\x19\u00AEeV^\u00B2@ \u00EF5\t\u00E3\x05gV\x13\r\u0095\u0099p\u00DCQ\u00FE$\u00D0\u00CD\u00BAk\u00C3\x0Fn<\u00D36?=g\u00F1\x15\x1F\u00BF\u00F0\u00E8\u00B1\u00BA\u00B8\u00E0vC\u00DCd\u00D9\u00E2\u00B7r\x12\u0085\u00CA0BX\u00D4E8%t\x19\u00D8R\u0092\u008A\u00B6\x05\u00DE\x10\u009Et\x1B,\x1D\u00E1\u00A8\u00E4.\x05\u00B2\u00F5QPB;\u00B9<\u00D2$7\u00C0\u0098\u00C2\nA\x01i\u0092PW\x1F\u0088\x16\u0096!:\n\u00FE\u00E5\u00C2\x01\u00A1&}\u00E4\u00B66\u00C8\u00D9\u00B4\u00B7\u00A9\u0088S\u009F\u00E5\u00CF\u0095\u00D4:\x1DL\u0089Tw\u009E9\u00C5\u00ED\u00FCE\x1A6\x04\x00\u009F\u00B3\u00BB\u009B\u00DBp\u009C\x13\x17\u00CE\u00E4T^\x04\u008B\u008A}\u00A6\u00A1\u00DB\u0096\u00A9\u00E7\u00BDA\u009B~ \x7F$o\u00FD\u00BB@}\u00FEML\u00C2x!M\tq\u00F3_[\x01\u00A9$\u00F2\u009D.\u00C8\u00B3\u00A1p\x12\u0086\u00CB\f|G\u0087\u00DF\u009D\f\"\x1C\x02\u00FF[\n\u0098\x02\u00B6L\u00BA\u00CD\u00EC\u00D5\u00AEW\u00E1\u00B4\u00AF\u009E\x11\u00B8N\x17\u0081\u00E9\x17\u00A8\u0080q\x1A&i|\u00CA\u0095\u0092\u00D4\u00CB\u00B7iLa\u00EE\u00C4\u00AD2gF\u00E7j1\u00ED\u00A9m\u00EF\u00B7>\u00F1\u00C9\u00BD3Vl\u00F8#|\u009B\u0088-\u00FAq\u00CD1;\u00FC\u00C9zX-[h\u00A34\u00B9S\u00B4B&\u00E5XB\u0093\u008B\u0083\u0090\u00DD.?\u0080\u0091\u00AE@\u00F6\x16\x14\x19\u008C\u00FBVX8.\u008F\u00B0\u0087\t\u00C8e\r[\x18[\u0095Q\u00D3|\u008C\u0090\x1DEU\u00DA\u00A4\u008F\u00B2\u00D6\x1CW:%\u00E8h\u00FD.\u00F0\u009B\u00A2\u00A2\u0099_M\x05\u009C\u008E\u0081y\u00DDU\u00DC\u00C93\u009B\u00EF\u0087\u00E0\u00A7\u009C\u00A9a\u00B5f\u00C9\u00AB\b\u00AB}\u00A3\u00BB\u00EE\u00F2F\u00B0\u00B8X\u00B3,\u00D3\"UTv\u00F8\x03Z\u00C5\u00CD\u00B7\u00FEC( \u00E4k\u0093J\u0088\u00C0_]\x01]@\u00DEU@\u00E9\u0082\u00E2\u00C8\u00CF(p<\u00C7/q9\u00F5\u00AF\u00800kz8\x15 ]P\u00C8\u00F2+\u00DF\u00D7\u00E2\u009Cc\u00C1Ky\u00CD\x0B\u0090)\u00D4\x02\x12\\#\u00D48q\u00C1\u00F6\u00C6\u00C6\u00A7\u00A9\u00F9Ia&\u00B3\u0096Z^\u00D2!t\u00AD\x16\x17)\x1D\u00AB\u0089\u00F1 t\u00CE\x07}\u0083~*kG\u009D@j\x1B\x1C\u00DB\u00BAS\u00B9\u009B\u008D\u00D2\u00CA8\u00B3\u00A6V\u00BB\u00E3|n\u009F\u00E6\\\u00E3\u00A4\u008D\u00B3\u00E1\x1B\u00D7\u00B8Q\u0080p\u00EA\u00C0\u00B1\u00D6\u00AE\u00CB*\u00D3\u0090\u00DFlr\u0094\u00D0A\u00DA\u00A6w@\u00DAMw\u00CF\u00A8c\u00EB\u009C\u00ED\u00A76\u009F-\u00811o\u00C2\u00B6u\x18\u00AEx|$\u00DFh\x12:z\x01\x1D\u00EA\u00E6\u00B8\u00DCL7\x0EY\u00D0}\u00DDI\u00D7=_wBGa&\u00E2\u00D18\x06\u0083\t\u0084c|\u00DD\t\u0089\u0087\u00F9\u00B6E\u00E6\u00EBN\u00C5\x01_\u00A2\u00F4\u00E6{+\"\x0F\u00FCgO\u0081\u00F5\u00FF7\u00AD\u00808\u00F4K%D\u00E0\x7FM\x01] \u00CC\u00CF\x00\u00BE\x0F\u00F2\u00A3\u00AFrl\u0082#\u009B\u00C2\u00B0\x15P\u009D\u00F3\u00EDX\u00AE#\u00CE\u00C1\u00BD\u0099c\x1F\t\u00C8\x14\u00AC\u0080\u00CC\u00CB\u00DE\u00A3\x1D+X\u00AA\u00BE\u009F\u00C6\x07w\f\u00E3x\u00E1o*\x12\u00DA8\x193\u00B2\u00E7\u00C0I\u00FCn\x0EuT\u00AE5T\u00AA\u00A5\u0086\x06Y\u00CFQ\u008C\u00AF\u00A0\u0084\x18\u00D2\u009B\u0088\u00E7\x0F;;b\u00E8)\u00DB\u00C2\u00DA\u00E2\u0098\u00C0\u00D0\x18u\u008F\u00FC\u00AB\u008A\u00B6\u00CB\t\r8+\x18\u00CAZ9w\u00FB\x1B\u00F8\u00E8\u0080m1B\x1A\u00BF2\u00C7`)k\u00EAdZkr\u00A6P\x00\u00A9\u00A8)p\u0096^&\u00B2+@\u009E\x19P\x16\u0098n\u00AE\u008D!\u009Bi\u00D8\u00B6aP\tgiTB\u00BErM\u00FDd+v\u0094\x10*\u00A9\u00E3\x02_w\u0082\u00B6\x1A\x1E\u00AF;\u00A1\u00A2\u00CDD\"\u00A6'b1\x1D\u00CA\x17\u00B7M(!_w\u00B2\u008DH@3\u00C2i\u00AF;%\u00FC\u00B1\u00BA\u00AB\u00E6\u0097\u00C6\x1E\u00B8\u00B7\u00AB\u00FA\u00FA\x1F\x142N\u00FB\u009BW@\u00C8[\\\u00A2\u00F8\u00BC\x15\u0090\u008A\u009E\u00AD@\u00EF\x04\u00F9\u008A\x10?\x7FH+F\u00B30\x1C\x05d\u00C3\u00E7\u00E7\u00E6\u00F9\u0089z\u00AELs\u0083x\u009A\u00B2\x13\u00CC7\u00C8\u0087\u00E6\u00F7L\nR@\x1C\u00AA\u0096\u00B5;.\\Xm9\u00DFu#\u00DF\u00AE:KT?r\u00BC\b^\u00DA*\u008C/\u00EC\u00F3\u00E2\u00E2+.Yr\u00E1\x17\u00FBg\u00CD>Z\x13-\u00B0.l\u00D4c5\u00E5rns\x1C\u00C4N\u00A5L\u008E\u00A5r\u00AE\u00D9\u009B\x1D\u00DD0\u0094+\u00D9,\u0097GuaEP\x1D\u00B1\u00A0\b\u00A3\u00B9\u0098,E\u00C0Q'\u00CE\u00A6\u009F'\u0082\x13\u00A7\u008A\u00A2\u00AB\x0E\x15\u00BE}gO\u00B8\u00FF\u008C\u00C1\u00A63\u00CE\u00D7DS\u00A9\u00B3K\u00A6D&\u00F5=\u00F0`Qq\u00F3\u00A1\u00C2\u00FF\u0095\u00E9bp\u008F\u00D6\x07\u00EF:g\u00DE\u009B\u00D7]\u00FB\u00D2K\x17\u00FD\u00E8\u0096\u0085\u0097\u00DE\u00F3\u00F2\u00DC\u00B9_\u00D7\u00C4?\u00C1\u00CAr\u00FF\u0080\u00A3\u00B2\u00D2[\u0087^;\u00C5\u00EFV\u009AmN\u0091\u009Du\u00A0F\u0093\n\u00EB\u00B8\u00D3\u00EA\u00AA:xUX X$,\x03\u00E3W\u00CE\u009E\u00E6\u0081\x06U*?aNu\u00E2\u008E\u00F9}\u00F6\u00AA\u00F7\x0B\u00A9\u00FF\u00BF\x0B\x05d\u0098\x1B\u00B8\u00F9\u0089\t\u00CFR\u00C2\u00B5\u00E4\u00C6S\u009C\u00E7U\u00C0\fyi\x01A6d\u00BA\u008BjX\u00BF\x0B\u00AE<\u008E\u00BC\u00C6\u00EF\u00CE\u00F0-x~2\u009E\u00E3\u00B9\u00A5\u00B8\u0096\u00AC\u008C\u008C\u00B4\u00D9\x12\u00B9\u0083\u009A\u009F\u00CA\u00E0\u00DB\x167\u00E0\u009A\x1C{\u00BA\u00C8\u0090gz\u00FC\u0098\u00AE\u00FC_\x14\u008CK\x05\u00AE3\u00AF\u00B4\u0090\u00FC4 \u009BX\x15\u00CE\u00F1\u009Cq\u009Es=b\u00D2\u00C5k\x02\u00D2u\u00FB\u00A6O\u0083r!\u00A6 \u00F0u\u00C8[D\u00EC\u009D\u009F\u008B\u00C8\u00DC\u00F1\u00E2\u00D3\u00E7\u00FC\u00E2\u00A5\u00A9\u009A\u00B8\fiL\u00D0\u00E6\u00E0\u009A&z[\u009F\u0094\u00A6\u00E8\u0096\u00F7\x1C;\u00FBc?\u00E7O\u00AE\x16\u0089\u00D5\x11\x11\u00BE\u00A0Z\u00AC\u00DD\u00F4[q\u00D6^\u00B68sQP\u00BA\u00A3\u00FF\u008E{\u00D3\u00C1Y\u00F3\r\u00C2\u00DCq\u00A0\u00D0\u00DBl\x119\u00C8'\u00E7cg\u00E5\u00CC#\u00BF\u00CD\x0B\u00C5\u00BC\u00F3\b\x11@~\u009E9\u00D6\u0087\u00FCh\u00E2\x10\u008D\x1B\u00BA\u00BB\u0085\x15\u0082\u00E2\u00F4\x1A\"\x1C\u00B7\u00AD\u00C1\u0090\u00AEw\u00EF\u00FCuQ(\u00D4\u00A4\x05\u008E\u00F3\u0089\b\u00BA\u00BDC\u0090\u0087b\u00E9\u00EE\u00F6\x0Bk`PX}!1\u00C0\u00CF_$t\u00DB\u00DD\u00C0\x1D\u008F'\f\x1C\x13\u0091\u00F0\u00A0\u00FC\u00FCE<\x16\t\x1B\u0089\u00D8 7p\u00F3\u00F3\x17\x01av\u0097\x04\u00ACns\u00E7\u00A6\u00B6\u009AX\u00ACc\u00E2\u00B8Y\u0091\u00CAW?\u00F9l\u0084-\u00DBW\u00B4\u00EE\u00FD\ri\x1DwF}\u00E6U\u00C0\f\u00F9\u009C\n\u0098!\u009BW\x013\u00E4\u00F3*`\u0086|\u009A\x02\x12\\'\u00FC_sA\u00BD\x00Y6\x17\u00A6OKHw\u0092\u008D\u009E\u00AE*?\u00A3\u00C7O\u009D\u00F3S|\\A\u00E6FnZL\u00AE\x0F\u00F2\x1F\u00B6\u00B0\u00B0N\u00C2o\u009C\x0F\u00A6)`* O\x174\u00ADB\u00B3\x01\u00B2\u00CC\u008BR@\u00A2\u0098\u009D\x00\u00FF\u00E1It\u00D1e\u00860P\u00CC\x0F\u00D9\u00B6\u009Ap)\x04\u00CE0\u00CC\u00DC\u00E2\u008C\u00FB\x06\u0092\u00EF\x11r\u00FE\u0088\u00D6\u00AEJ\u00D8hFa\\f%8[\u00B6\u00DD\u0099Q\u00FC\u008A\u00B6Rt\u00EA[\u00C3\u009B^\u00C7\u00C8r\u00AD-\x06\u0091\u009B\u008DCl\x04\u00E7[\u009F\x14\u00E6N[\u00C4\x1E\u00B2\u00A4J\u00BE\u009A\u00F7%[Z\u00BC\u00B1\u00C2\u00C2\x10\u00D0\u008F\x1E\u0085\u00AD\u00CD\x19}\u00AA\u00C7\u0086\u00CFIk\u0088T\u00F8Y]\u00FC\u00ADA\u0091\u00A0\x10\u009D\u00C1\u00A0\u00DA\u00D5\u00EA4\x1B\u00F7\u00C5\u00DF\u00D4F\u00E4\u00F3\x07\u0085\u0085\x1BM+o\u00D3\u00E2\u00B0D\u00AB\x1B?\u00A9b`\u00E9G\x03\u00F8\u00DD|\x19g\x1D\u00FD\u00DDX@\x179\u00FBK\u00DC\u00C4\u00E1\x05\u00BB\u00BC\u0082\x14P\u00C9c\u0090\u00B0K\x01\x11\u00C7vAE`c&V\u00E3\x1AM\u0084+O\fqAq\u008Dy\u00A3\x03\u00C7\u00DD\x06|X\x16>\u0095\u008D\u00EF\x03\u00E6-$\u00DC\u00CF\u00F7\x18\u00F9\x1F\u008AX\u00F8\\3\u00E4\u00FF\u00BA\u00C8e\t)\u00C7\u00A5\x12\u008F\u00E7\u008C3\u009D\x1B\u009Af\u0089c\u008E\\\u00E0\u00D7f~\u00D1'\u008E\u00835\u00D8\x1F9\u00CC^\u0080|\u00FC\x1Fal\u00B5T\f\u00DE\u00F4\u00B4\b/\u00B2\u00C5\u00B3\u00EF\x04\u00C4\x16<\u00E5\u008F\u00FD|-\u00F2_Eb\u00CDT\x11:i\u0081\u00D8p\u0094\x10O\u00FD2 F!\u00B1\u00AB}\u00FCZ\u00FDc\"\u00F4p\u00A7\u00D0\x7F\u00D9#6\u00C7g>3k\u00E9\u00933\u00EB&\u0089)\u00A7\u00BE\x14\x10MS4q1~[\u00CD\u00C1\x00\x7F\x00\u00EF\x14\u0091\u00E7\u00F6\x12\u00F1\u00EB\u00AF\x12/\x1D\u00D5 \u00DE\u00FB\u00BE_Lk\u00D2\u00C49\u00D0\u009C:\u00CF\f\u00F2\x1FK\u00DD.zg\x07D\u00F5SA1\x1F}\u00CDw\u00FD\x11\x14\u00F0Yr}p\u00F0\u00C6-\x18\u00E3\u00D9\u00E6\u00BB\u00B3*\x16\u00EE\u00EC\fX\x1F\u00FE\u00E5\u00F5\u00AF\u00D2\x02N\u00BB' \u00FD\u00FFo\u00F98\u00F9|\u0087\u00B0\x06\u00E3\"tK\u00BF\u0088`@\u00F8TU\u00E5\u00B2\u00B2\u00B2J+\x1C\nq\x00\x18N$\u00A2QS7\u00A2\u00B6eD,\u00CB\b[\u00A6\x1E\x11\u00BA\x1E\x12\x16\x19\x1F(/-\u008E\u008C\u00A8.\u008F4\u00D6\u0094\u0086\u00FB\u0097\u00FFik\u00F3Vc`\u00FC\u0080?2\u00C2\u00E7c\u00C1\u00A5\u00BD\u00C6D\u00A8\u00B6B_\u00BD \x05T\u00F2\u00EC\x05\u00F2*\u00A0\u0092e\u00BD\x17\u00A4\u0080J\u009E\u00F9,H\x01\u0095<\u009Fg\u0088\x02\x12tG\u00D5\u00B4\u0083'\u00D8A\u00B2\u00DBf\u00A9\x17\x02\u00CE\u00B8\u00B1\u009B\u00A5\"\u00BA`\u008Bc&\\<\x06r\u00AD\u0090\u00BD\x0Eg%2g\u00ED\u00B2\u0081\u00CA\u00C8n?\u00AFuU8\x0F\u00CC\\\u00AC\u00E7\u00DB\x18C\u00DE'\x048.f~\u0098~V\u009C}\u0086>\u00E9\u00E3\x17\u00ECC\u00A7]\u00D6sTdl\u00EF\u00F8\u00FA\u00E6X\u00FD\u009EuvuKY\u00C2\u00DFT>\u00E8+5:\u00ED\u00B2\u00C8fS\u00EBm\u008B\u00F9\u00BA\u0096w\u0089\u00AD\u00D1\u00CDb\u00C9\u00B8\u0095\x1F\u0096]7\u00FAA\u00BD\u00A1\u00AB\u00FE\u00ECu\u0093\u00AB\u00CAzJ\x0F\u00D1\u0097U\u008D-~\u00A3\u00CB\\1\u00CD\x1Fzxvb\u00CDA%\u00C1OO\u00F2Y#Eg\u00D51\u00E5k\u008A\u00AB\u008Cw{j\u00DE\u00ED\u00DF4\u00E5]\u00DFzQ\u00D7\u00F4\u00E1;\x17\u00BE\u00B4\u00FC\u00BAK\u00CC\x13{\u00B7\u00EB\u0087\u008D\u00FB\u00DE\u008EY\u00CD\u00ADz\u00E3\u00DEM;Kf\u0094w\x06\u00C7\u008B\x0F\u008C\u00D2\u00AE\u00B7b\u0081\u0085\x03[*\u0097\u0094~\u00F6\u009B\u00CEk\u00DB\u00EF\u00F0\x1F[6\u00EA\u00D4\u00AE\u00D6\u00C6\x19\u00D1\u00C6\u00BD\u009A\u008C\u00EA\u00A9\u00A5\u00FD\u00FEQ\u00C5}\u00BE\u00B2\u00C8&\u00B3\u00D2\u00EA1\x13m\u00AFu\u00ED\\z\u00A2\u00D8\u00F1\u00D6\u0084\u008E\u0095_7+\u00DAF\x07\u00FA\x0F\u008B\u00AD\x1D\u00D1R\u00FE\u00E2\u008E\u00B2.3\u00D6\u00FA\u00B8\u00F9\u00A1\u00F0\x07\u00BBj_{\u00EFO\u00B7\u00DDj\u0088\u00BB\u00AF\u00B1\u00BE\x1C8z\u00E7\u00A8\u0089\u00E7\x7F\u00BAWUEO\u00C9\u00C1\u00FA\u008A\u00EA\u0096\u0092\u00C5]\u0095[\u00F5\u00D0\u00AC\u00A7\u00ED\u008FE\u00B0xk\u00ED\u00E2%\u00FC\u00A8\x16\x07\u00B8\x1C~\u00E47\u0081N\u00C7\u00CCa\u0088\u00F3*I~\f\u00B7\u00FE\u00B9\x1D\u009E\x03\u00EFB\u00F2\u00C2\u00ADkL7\u00AF\u00A1Q\u00A0q\u00E0\x14vj;\u00CF\x06v\u0083\u00D4\x0B\u00B6sOKO%TN\u0086'h}\u00E8}y\u00DE\u00EC\x01zT\u0099=\x03\u00DF\u0080`\x07\u00EA\u0082\u00DF \u00E5fl\x0E\u00F6\u00E9\u00D90m\u00C7_\u00CB\r\u00E6%W\x05\u00B0\x07K-D~\u00EF4\u00ED\u00BF\u00DE\x02\x1C\x1Bz)\u009A\u009AjL\u0099{\u00C9\r\u00AF\u00E7\u00CC\u0085\u00E1\u00C8\x0F\u00B7\u00CC\u00E9%\u00D0B\x14\x02\u00969\u00EB\u00BB\u00D0\u0086\u00FCy>\u00E7\u00FF\u00A72g\u00FBd>\n\x1A\u00B6\x00\u00C3I\u009BJ\u00C8\u00F4\x0B-\u00F3\u00DD\u00D8\u008D\u00DD\u00D8\u008D\u00DD\u00D8\u008D\x7F(\b\u00F1_\\\u00EA\u009EB5\u00F9\u00A2m\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var imageLogo = contentLogo.add("image",undefined,ScriptUI.newImage (createResourceFile ("Yan-KGlitch2.png", imageLogoImage, getResourceFolder())) );
			
		var contentButton = mainPalette.add('group');
        contentButton.alignChildren = ['fill','fill'];
        contentButton.orientation = 'column';
        contentButton.margins = 0;
        contentButton.spacing = 2;
		contentButton.orientation = "row";
		btnGlitchImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00x\x00\x00\x00#\b\x06\x00\x00\x00_-\u00CE\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x03\u00FAIDATx^\u00ED\u009BM\u0088Ma\x18\u00C7\u00CF0\b\t\u00F9\u0088\u00D2XP\u0088\u00C4\x14J\u00A1Pf6,\u00CC\u00CA\u00C7H\u00A3\u00C4\u0086\u008D\x1Ae!%\u00B2b\u0081\u00D8(\f6\x16D\u00D9\u00B0\u0090\u0092\u00A5X(E\u00D9\u0088\u00F15H\u00E3c\\\u00BF\u00FF{\u009Es\u00A7\x19w\u00E6\u009E\u00B9\u00E7\u00DC\u00F1^\u00BD\u00BF\u00FA\u00CF\u00FB>\u00CFy\u00EFs\u00CE\u00DC\u00FF}\u00CF9\u00EF\u00FD\u0088\x02\u0081@ \u00E0+u\u00D6\u0096\u00A5P(\u00D4\u00D3lE+\u00D0O\u00A5P`\u00F8\u0090W\u00A3\u00D0#\u00D4QWW\u00F7K\u00C9\\\u00C0\u00DCY\u00E8\x1AZ\u008FR\u00BF(\x02\u00F9\u00A2\u00E7\u00DE<\u0090\x17\u00B3,\u009D\r\n\u00D5[\u00C1\u00C9\u0096\n\u00FCc\u00E4\u0085y\u00A2\u00B3j6(\u00B2\x03\u00AD\u00B70\u00E0\t\u00F2D\u00DEXX9\x149\u0083\u00C2i\u00D93\u00E4\u0089\u00BC\u00B1p@FX;\x18?\u00B9\u00A0\u0087\x1B*\u00CF0O\u00CA\u00DEh\u00A518\u0098\u00EB/\u00BF\u00AD\x1D\u00904\x06\x07j\x18/\f\u00E6Z\u00B2\x16u\"\u00AD\u00B3\u00AB\x0E\u00FBY\u0084\u0096\u00A21\u0096Rn*\x1Aoa&\u00A83\x07-FS,\u00E5/\x1C\u00E4I\u00EBV\x05\u00EA\u008FD\u009F\u0091\u00E8A\u0099L\u00E6\u00F1\u00F3\u00D0\x11t\x11\u00DDF\u00D7\u0091n\x14\x1Bm\u0088\u00C6t!\u00B1\u00CAb\u00AD\x14\x1Cn\u0080A\u00D8\u0080\u00E6\u00A2q\u0096J\x05\u00E3\x1F \u00B1\u00D7RU\u0081\u00FA\u00D9\u00BD\u00C9\u00A5H\x19\u00D8G\u00BB\u009E\r\u00A3b\u0093y\\#\u00FA\u00A4\"%(\u00D6\u00A4\u00DF\u00DF\u00E0UH\u00A6<t\x03\f\u00E2'H\f\u00E9x\x18\u00EF\u008D\u00C1^\u009C\u00A2\u00B9#<Ns0\u008E\u00DC1i\u00F6Ub\u00F2\x164\x11u\"\u00AD\x11W\u00A2\u00D5h#\u00D2[|\x03\u00F1\x18\x1DF\x07\\\x04\u00EC\x7F>\u00CD\u00E88\u008A4\u008B\u00F5\"\u0098n\u00B1\u00B6OA\u009B\u00D1n\u00B4\x0B5\u00DB\u00A6>\u0090\u00D7zu\x0FjA\x13,\u00ED\x0F\x1CT\u00D5gp\x02\u00FB\u00CA4\u0093\x19\x7F\u00D6=\u00B2P\u00B8j\u00A9\u0092\u00B0\u00BD\u00D4\f\x16]n\x00\u00D0\x7F\x17\u00A7\u00FA\u00D0f\u00DB\u0096\u00A1\u00B7.\u00D3Kq\u00C9B?\u0099\u00C1O\u00ADMP\u009C\u00BCh2C\u00AD\u00DA\u0098\u00C1\t9\u00CE\u00E4<\u0096vW\u00D0\u00FB\u00B8\x1B\u00DDE\x17\u00D03\x17E\u00D1N4\ri\u00FB\t\u00A4\u00D9\x7F\x0E\u00F5g\x06\u0092\t7\\\x14E\x0B\u00D1\u00F2\u00B8\u00EB\ti^%y\u00C3>\u00EF\u00A0\u0084n\u0094\u00EA=W\u00C6%3X\u00E6(~\x13\u0087\u008E\u00F3n\x10\u00D0/;\u0083\x05q\u00C9k0\u00F1\u00958]8m\u00A9>\u0090Of\u00F0!\u008B\u00F5~\u00FEw\u0097\u00B1}\u00E6\x01\u00B5jk\x06\x0B\x0E\u00BA\u009DfC\x1C\u00B9\u0085|[\u0086\u008F\u00C64\u00E3\u0092Y\u00D8cm\u009E|\u00B1v >\u00E8\u008F\x1D\x7F\u00B7\u00FA\u00C3\u008DW\x06\u009B\u00B9\u00C7\u00E2\u00C8\u0099\u00DB\u00CA\u0093\u00D3\x11\u0087C\u00C2]\u00E7x\u00EC\x1A\u009A\u009B\u00EAgd\u00AC\u00B5\u00FD)\u00AE\u00A3}\u00C5\x1B\u0083s2\u00F7\u0093\u00B5\u00CD\u00D4;\u008Atjm\u0088S\x15\u0091\u00CC\u00BAm\u00D4jE\x0B,\u00FEf\u00ED&r\u00BA\u0083\u00DE\u0082\u008Aw\u00E05\x05\x07^\u00F5k0\u00FB\u00C8k\x1D\u00AC\u00E5\u00CC+\x15)\u00C1Y\x1B\u00A6qi\u00AF\u00C1\u00C7\u00E3t\u0091\u00E4.\u00BA\t\u00FDp\u0099^\u008A\u00EF\x0B\u00D3\u00FFk\x1DL\u00BF\u00CF>\u00F3\u0080Ze\u00BD)\u00FB1\u00A0\u008A0\u0093\u00F6[\u0098;\u00D4\x1FI\u00F3\x11i\u008D\u0098\u00E5\u00B4\u00EC\u00A0\u00DE$\u009A\x16\u00A4\u0099\u00AB/)\u00C8\u00B4\u0097\u00E8>u\u009F\u00D3j\u008C\u00FE\x1F\u009D\u00C6/\u0091{M<\u0093~+\u00EA&>E\u00EB \u00AF3\u00DCv\u00B4\x04}G\u0097\u00D9\u00FE\u0094V\u00DBt7\u00DC\u0084\u00B46\u00FE\u008A^\u00B0\u00CD\u00DD\u00C8\u00B1M\u00EB\u00F1\u00D9\u00E8\x16\u00B9'\u0096\u00DBG\u00A3S\u00BA\u00DB\u00A7rY\u00A1fvoT\u00C4\u00BAU\u0083}\f\u00EB{\u00D1\u00FF\x0Bi\u00BC\u00F1\u00E2\x1A\u00CC\u00AB\u00F0\x1E\u009A\u0086*\u009E\u00B9\u0081\u00D2x\u00B7L\n\u00E4K\x1A\u0083\u00C3\u00D7u\u00FC\u00A5\u00AC7i\f\x1E\u00C5\u00B9>\u0098\u00EC\x19\u00E6\u0089\u00BE'=(i\f\u00D6\u00A70\u00EB\u00E2n\u00C0#\u00E4\u00C9`\u009F\u0090\u00A5\u0083WJ\u00F8^\u00B4g\u00C8\x0B\u00F3$\u00FB\u00F7\u00A2\x05\u0085\u00C2/\x1B<@\u00CF\u00BDy /R\u00FD\u00B2!\u00B5Y\x14\f\u00BFM\u00FA\u00B7$\u00D7\u00DC\u00FC\x7F\u009B\x14\b\x04\x02\u0081\u00E1'\u008A\u00FE\x00S\u00D9\u00C5\u00EFpm\u0099\u00AE\x00\x00\x00\x00IEND\u00AEB`\u0082";
		btnRGBmage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00x\x00\x00\x00#\b\x06\x00\x00\x00_-\u00CE\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x03\u00ABIDATx^\u00ED\u009BMH\x15Q\x18\u0086\u00EF--\u008A\u0082~!J\u00A8e\u00BB\u0088\u00FE\x16!DZR\u00B4\b\u00826\u0081-\"\u0082\\$\u00E1\u00C26\u00AD\u0082\\\u00B6\b#\x12\u00C9@\b7\x11\u00FD\x13\u00B4\u0088 \u00DBD?\u00AB\"\u0089Zde\x11\x16\u009A\u00A46=\u00EF\u00CC7du\u00F5\x0E\u00DD\u0099\u00EB\u00B9x\x1Ex\u00F9\u00E6\u009C\u00FB\u00F9\u009D\u00E9\u00BE3\u00E7\u00CCLss\x1E\u008F\u00C7\u00E3q\u0095\u00BC\u00C5\u00A2\x04APE8\u0080\u00B6\u00A0Qu!O\u00F9\u0090W\u00D5\u00E8\x11\u00EA\u00CE\u00E7\u00F3c\u00EAL\x05\u00CC\u00ADA\u0097Q=J|Px\u00D2E\u00DF\u00BDy /j\u00AC\u00BB4(Te\x05\x17[\u0097g\u009A\u0091\x17\u00E6\u0089f\u00D5\u00D2\u00A0\u00C8AToM\u008F#\u00C8\x13yc\u00CD\u00FF\u0087\"\u00ED\u00C8O\u00CB\u008E!O\u00E4\u008D5'e\u0096\u00C5\u00A9\x18eA\u00F7\x17T\u008Ea\u009E\x14\u00BD\u00D0Jb\u00B07\u00D7]~Z\u009C\u0094$\x06{*\x18'\ff-\u00D9\u008E\x06\u0090\u00EE\u00B3=)R\u00F4\u00E2\u0089/\u00FD\f\u00F3}\u00B35S\u0087\u00FA\u00B3\t_\u00D0B\u00A4)\u00A7\u0091\u00F1\u00BA\u0089\u00A9\u00C28\u00AB\b\u00EB\u00A3V\u00C8\b\u00FA\u00C8X\u00CF\u00A2\u00E6o\u00C8\u00D5\u0081\u00BF\x03\u00ADAK\u00D1w4\u0080\u00EE\u0092\u00FF\u0081\u00A8\u009C\u00DD\u0084\u00F8\x04\u00D12\u00F6\x19=\u00E1s\u00D5-\x0B\u00A9x\u00A3\"\u00B6\u0099\x19\u008C\u00D1\u008Ab\u00C6Q\u00EAg\u00B2j\u0086\u00D5\u00FF\u00E5\r\u00DAgi\u00CA[\u0089\u009E\u00EA\u0083\x024Z\u009A\u00F2\x06\u00A3\u00AE?\u00F8\u0084J\u00BFuI\bc\u0095\u00EEM*E\x12\u00C08\u0099\u009A\u00ACza\u00E5 \u00F8\u0086:Q\x0F\u00EAW\x07\u0084g\u00A5`\u00FBT\u00D4\x15\u00FC@\u00E7Q\x0B\u00D2\u00BE\u00B5\u00A1\u00AD\u0096\u00A6\u00BC\u00D8\u00E0[\u00E8\x02z\x11\u00B6\u0082\u00E0\u009D\u00A5d\x0EcU\u008E\u00C1\u0082\u00B123Y\u00B5\u00C2\u00AAA\u00F0\u00D6\u00BA\u00D4\u00B73\u00EA\n\t\x1F\u00FD\x11;\u00A2f\u00D0\x13&M\x02\u009F\u00C7\x06\u00EF\u00B1vC\u00D4\f\u00C6\u00C3\u00842\u00C0XE\u00BDq\u00EA*\u009A\u00F5\u00A4\u008Dp\"j\u0085\u00FBv\u0089\x7FD\u0096\x17^Z\u00F7c\u00E2{\u00CA\u00F8;\u00D1\u009A\u009A\u0084\u00B5\u00EC\u00A3\u009E\u00F4\u00ED\u008F\u009A\u00B9\u00E7\x16+\u0083$GI\u00DA0\u00E6m\x143\u0082J~\u00E6J\u008D\u00F8\f\x1EF7\u00D0}\u00A4\u00E9Z\u00F4Y\u009A\u00F24}\u008Bs\u00D6\u00BE\u0089\x1E\u0098N\u0086I\u00C0v\u00A15x\b\u00ED\u00B5\u0094\u00CCa\u00AC\u00CA:\u0083\x05;\u00DDJh\u0088Z\u00E1U\u00F5!\u00CE\u00EC\u00F4\u00FEk,\u0097\u009B\u0087t\x05\\\u008B\x16\u00A0\u0087h\u00AAYb3\u00D2\u00DA+\u00E9\u00AA\u00FAo\u00CE\u00A2&\u00D4\u0081\u00E6#\u00AD\u00C7+\u0088N\u00E0\u0094\u00C1f\u00EE\u00E9\u00A8\u0095\u00D9-S?\u00DA\u0080^\u0086\u00AD\\\u00AE\u00971zm{\"s-\u00AEC]\u00D1fA\u00EE\u00F0\u00F7\u00ED\u00E80\u00DB\u009A\u00D6\u0097!\u00D5w\x02g\f.\u0093\u00B9b\u008C\u00BA\u008F\u0089\u00C7\u0091\u00EE_\u009B\x18{\u0093>0\u0086-\u00D6\u00D1\u00BF\u008BXly\u00D0\x1A\\\u008B\u008E\u00B1\u00BD$\u00EA\u00AA \u00D8\u00F1\u00CC\u00D7`\u00C6(\u00E7}\u00F0\u00C4\u00AB\u00E8\u00ABQWp\u00DD\u00BA\u00D4\u00A7+k\u00DD\"\x15\u00A2\u00D3\u00D2\u0094Wh\r\x16}h\u0091\u00A5e\n\u00E3\x14\u00F5f&=\u00C9\u00D2\u009A{\x14}\u00A5\u00FE\x11\u00EB\u00DBHhA\u009A\u00C9\u009A\u00E9\x0F\u00EFa\u00E9\u00DFF\u00D0\x03\u008B\u00D5Hf\r\u00A2\u00D7\u00E8\n9\u00D7\u0088\u00CA\u00B9H\u0098\u00A3mc\b\u00BDB]\u00E4\u00BC\x0F{2\u0086}\u00A8\u0098'Y\u00FEY\u00F4\x7F\u0090\u00C4\x1B'\u00D6`\u008E\u00C2{h9\u00CAb\u00CD\u009D\u00D18w\u009B\u00E4I\u0097$\x06\u00FB\u00D7u\u00DC\u00A5\u00A87I\f\u00AEf\u00AE\u00F7&;\u0086y\u00A2\u00F7\u00A4\u00A7$\u0089\u00C1z\u00D1\u00BA.\u00DA\u00F48\u0084<\u00917\u00A5\u00C1\u0091\u00E2\u00DF\u008Bv\fya\u009E\u0094\u00FE^\u00B4\u00A0\u0090\u00FFe\u0083\x03\u00E8\u00BB7\x0F\u00E4E\u00A2_6$6\u008B\u0082\u00FE\u00B7I\u00D3K\u00BC\u00E6\u00A6\u00FF\u00DB$\u008F\u00C7\u00E3\u00F1\u0094\u009F\\\u00EE\x17\u00D2\u0083I\u00A8H\u0088\u00B4\u00EC\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnGlitch = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KGlitch.png", btnGlitchImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
		var btnRGB = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KRGB.png", btnRGBmage, getResourceFolder())),{style: "toolbutton", toggle:0} );
        
		btnGlitch.onClick = applyGlitch;
		btnRGB.onClick = applyRGB;
    }
    // ==================================================
     
    //__________ SHOW UI ___________
    {
        // Set layout, and resize it on resize of the Panel/Window
        mainPalette.layout.layout(true);
        mainPalette.layout.resize();
        mainPalette.onResizing = mainPalette.onResize = function () {mainPalette.layout.resize();}
        //if the script is not a Panel (launched from File/Scripts/Run script...) we need to show it
        if (!(mainPalette instanceof Panel)) mainPalette.show();
    }
    //==================================================
     
})(this);