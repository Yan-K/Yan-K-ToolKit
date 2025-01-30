/*
 Yan-K Typewriter
 Version: 1.1
 Author: Yan-K@Yan-K.tv
 Date: 2025/01/30
*/
  
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

		function applyTypewriter() {
			app.beginUndoGroup("Apply Yan-K Typewriter");
		
			var comp = app.project.activeItem;
			if (!comp || !(comp instanceof CompItem)) {
				app.endUndoGroup();
				return;
			}
		
			var selectedLayers = comp.selectedLayers;
			if (selectedLayers.length === 0) {
				app.endUndoGroup();
				return;
			}

			var presetFile = new Folder($.fileName).path + "/Yan-K_Resource/Yan-KTypewriter.ffx";

			function isTextLayer(layer) {
				return layer.matchName === "ADBE Text Layer";
			}

			function hasEffectByName(layer, effectName) {
				var effectGroup = layer.property("ADBE Effect Parade");
				if (!effectGroup) return false;
		
				for (var i = 1; i <= effectGroup.numProperties; i++) {
					if (effectGroup.property(i).name === effectName) {
						return true;
					}
				}
				return false;
			}

			var originalSelection = [];
			for (var i = 0; i < selectedLayers.length; i++) {
				originalSelection.push(selectedLayers[i]);
			}
		
			for (var j = 1; j <= comp.layers.length; j++) {
				comp.layer(j).selected = false;
			}
		
			var appliedCount = 0;
			var skippedCount = 0;

			for (var i = 0; i < originalSelection.length; i++) {
				var layer = originalSelection[i];

				if (isTextLayer(layer)) {
					if (!hasEffectByName(layer, "Yan-K Typewriter")) {
						layer.selected = true;  // Select only this layer
						layer.applyPreset(new File(presetFile));
						layer.selected = false; // Deselect this layer
		
						appliedCount++;
					} else {
						skippedCount++;
					}
				} else {
					skippedCount++;
				}
			}

			for (var i = 0; i < originalSelection.length; i++) {
				originalSelection[i].selected = true;
			}
		
			app.endUndoGroup();
		};
		
		
		

    }
    //==================================================
     
    // _______ UI SETUP _______
    {
        var mainPalette = thisObj instanceof Panel ? thisObj : new Window('palette','Yan-K Typewriter',undefined, {resizeable:true});
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
		var contentButton = mainPalette.add('group');
        contentButton.alignChildren = ['fill','fill'];
        contentButton.orientation = 'column';
        contentButton.margins = 0;
        contentButton.spacing = 2;
        contentButton.orientation = "row";
		btnApplyImage = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00x\x00\x00\x00#\b\x06\x00\x00\x00_-\u00CE\u00E6\x00\x00\x00\x01sRGB\x00\u00AE\u00CE\x1C\u00E9\x00\x00\x00\x04gAMA\x00\x00\u00B1\u008F\x0B\u00FCa\x05\x00\x00\x04;IDATx^\u00ED\u009B[\u0088UU\x18\u00C7\u00F7\x195k\u00CCKfo\"B\u0085OF\x0F2J\u00A1A\n6\u00A843\"*\u00D9\b\u0093b\u0089Qy\u00C1\u00D1\b\u00822k\u00B0P\u0084\u00A2\u0087\u00A1\b\x06\u00C2'A\f\u00C47\u0089.\x0FA=zy(\u00C4\x17\x0BJ-\u00D4Ag\u00F7\u00FB\u00AF\u00F5\u00ED\u0083\u009E\u00CEes.s\u00D6\u00A1\u00F5\u0083\u00FF\u00AC\u00F5}g\u00EDu\u00F6\u00EC\u00FF>\u00EB\u00AC\u00BD\u00F6>I$\x12\u0089DB\u00A5`eM\u00D24\u009DJ\u00F1\x12Z\u008A\u00AE\u00A3[(2y<\u0088f\u00A1\x1F\u00D1X\u00A1P\u00B8\u00A3dS\u00C0\u00DC\u00F9\u00E8k\u00B4\n\u00E5>)\"\u00CDE\u00C7\u00DE<\u0090\x17\u00F3-\u00DD\x18t4\u00D5:|\u00C4R\u00916#/\u00CC\x13\u008D\u00AA\u008DA'[\u00D1*\x0B#\u0081 O\u00E4\u008D\u0085\u00F5C'\u009F\u00A28,\x07\u0086<\u00917\x16V\u00A4\u00CB\u00CAj\u00DC\u00E0\x0B=\u00B5z$\x10\u00CC\u0093\x1B>\u00AAL\x1E\u0083oZ\x19\t\u008F\u009A\u00DE\u00E418\u00D2\u00C1\x04a0\u00DF%\u00CF\u00A3\u00DF\u0091\u00AE\u00B3\u0083\u0087\u00FD\u009C\u008B\u009EBOX*X\u00DAn0\x07i\n\u00C5I4\x0F}U\u00AF\u00C9l\u00D7\u0085\x0E\u00A3\x11\u00B4\u00C4\u00D2\u00ADb\x13\u00FA\x05}\u00E9\u00A2\u0080i\u00BB\u00C1L\x16\u00EER|\u00E0#\u00B7?\u00F5\u009A\u00BC\x06\r\u00A3}\u00E85%\"\u0081\f\u00D1\u0098\u00FC!\u00C5\x01\x1F\u00D5m\u00F2\u0080\u0095\u00E2E\u00B6\u009Fnu\x07\u00B1\u0086\u00D5\u008Dh\x05z\fmA\u00DBQ\u008F5q\x10\u00AFD\x1B\u00D0L\u00F4\x02z\x15\u00F5\u00A3\u0087\u00ACIYx}1Z\u008E\x16XJ9\u00C5\u00D2lK\u0085\x07;\u00F7\u00AEU[\x0E\u00EF5\u008C2\u00EE\u00A2\\&\u00D3\u00AE\x1B\u00FD\u0081n\u00A3\u009F\u0091\u00D8l/;\u0088u\u00A0\u00C5\x05\u00F4\u009B\u00AF:&\u00D0\x0Ek\u00A6v?\u00B8l\u009A\u009E\u00B32\u00E3{k\u00A26;}*\u00FD\u00D6R\u00CA\u009D\u00F6\u00A94;Q\u0095\u00BB\u00E6S\u00E9rK5\x15\u00FA\u00AD\u00E9M\x10\u009F\u00E0\u008C\x06>\u00C9}\u00E8Q\u00F4\x1D:\u00A1\x04\u00F4[Y\u00CA\u0093\u00E8\x12:\u0082.#-\u00E2l@\u00A5\u00A8\u00DD'\u00E8\u00B4\u008B\u0092d\x19\u00FB\u00F2\u00B4\u00D5;\u0086\u00A0\f\x16f\u00F2\x19\x1F\u00B9\u00FD\x1B\u00E5\u00C0\u00D6Zs\u00CD\u0086\u00E7o\u00D0)_Mz\u00D9n\u008E\u00D5\u00EFEw\u00C1\u00FAy\x1F}W\x7F\u00E62\u00FENM)Gi\u00B3\u0087r\u008B\x0F\x1D\x0F[\u00D91\x04g0\u00A6h\u00A2\u00B4\u00DAG\u00C9\x04z\u0085\x03]\u00F1\u00D6\x18\u00ED\u00E7R\u00F4\u00FA(Y\u008C\u00F4\u0089\u00D7\n\u008F\u00CC\u00D8\u0088J\x19\u00A7?\u00DD\u00EE\x14\u00D7\u00AC,\u0087[%\u00A2\u00ED_.\u00EAP\u00822\u00D8\u00CC=\u00EC#g\u00EE \x07x\u00CC\u0087\x15\u00D1\u00F0\u00DA\u00ED\u00AB\u00C9\u00CBh?\u009A\u00E9\"?t\u0097\u00A2\u00BBc\u00D9\u0088Pm\u00E24M\x7Fh[urU\x06}Uh;\u00DD}\u00BBo\u00A2\u00D7\x0E\u00821\u00B8Ns\u00C5z+\u00BF@\u00EBLo(\x01Z@)\u00BDo\u00AA\u0093\u00E1s\u00F2\u0083\u0094\u00D9\u00F0[n\u0084\u00D8A\u009B!\u00CA\u008F|\u00E8\u00B8me9\u00B2\x07 \u00B6\u00B1\u00DD(\u00E5Y\u00D4v\u0083k\u00C2\u00CE\u00B6|\x16\u00CD{\u00D4;{\u00D6\u0083\b\u00E3\u00DA\b\u009E\u00B5\u00B4\u00838\u009B)\u00EB{Tq6\u008B\u00FE\x13\u00FD\u00ED\u00ABE\u00DEw\x1B\x01\u00F5l\x16}\u00C5\u00CA\u008C_\u00D1\x03\u00D6\u00A6\u00DC,Z\u0097R7]\u00D6s\x1E]\u00F5\u00D5\u00F6\u00CD\u00A2k\u00D2\u0094N\u00AA@\u00FFS\u00D0u$r\u009B+h\u00BB\b\u00BD\u008EvY\u00AA\b\u00B9\u00B5\u00E8M\u0095\x16g\x06\u00EB\u00D2\u00A5\x07\x1DB\u00C7\u00D0\x10*\u008Ed\u00D43\u0083w\u00A3\u00BD\u00E88z\x07=nM\u00D4F\u00D7\u00BC:)\u00EF\u00DBW\u00E2\u0085h\x00\u00E9\u00FAy\x06\u00FA\x07\u0089\u00FF\u00AF\u00C1\u0082\u00F7h\u00F9Z4}\x17\r\u00B6TYx=3x\u00A7\u00A5rA\u00FByh\x17Z\u008F\u00FA\u0090f\u00FF\u00E2\x0E*.~4\x13\u00FA\u00ED\f\u0083'\x03\u00FE\u008FV\x1B\u00FC\u009C\u00DF\u00EC?|lM\u009A\x0E}\u00D7\u00F4&\u00B8\u00CB\u00A4\x16\u00A2E\u008D\u00B7Q6\u0091\u00AB\u0084&k\x07\u00D1O.\u00CA\u00CFE\u00F4\x16z\x0F\u008D ]g?\u00C3D\u00D1\u00CD\x01\u0082\u0085\u00B3D\x0B\x0F\u0091\x00\u00C9\u00E3M\u009EO\u00F0,:\u008A\u00CFd\x05\u0086y\u00A2\u00E7\u00A4\u00AB\u0092\u00C7`=h\u00BD\u00D2W#\x01!O\u00E4Mcp\u00A6\u00C4\u00E7\u00A2\x03C^\u0098'\u008D?\x17-\u00E8(\u00FE\u00B2!\x00t\u00EC\u00CD\x03y\u0091\u00EB\u0097\r\u00B9\u00CD\u00A2\u00C3{\x7F\u009B\u00A4\u0085\u00F8\u00F8\u00B4\u00E5\u00E4\u00D2\u00BA\u00DF&E\"\u0091Hd\u00F2I\u0092\x7F\x01\u00DD\u00A8\u0098\u00C1\u00F0[^\u00B0\x00\x00\x00\x00IEND\u00AEB`\u0082";
		var btnApply = contentButton.add("iconbutton",undefined,ScriptUI.newImage (createResourceFile ("Yan-KApply.png", btnApplyImage, getResourceFolder())),{style: "toolbutton", toggle:0} );
        
		btnApply.onClick = applyTypewriter;
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