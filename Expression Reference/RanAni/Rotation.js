/* Rotation Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Rotation");
raX = raMain("Rotation X");
raY = raMain("Rotation Y");
raZ = raMain("Rotation Z");
raXDir = raMain(28);
raYDir = raMain(29);
raZDir = raMain(30);
raCrazy = raMain(31);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedRandom(raSeed,raCrazySwitch);
    
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);
    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);
    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);
    
    raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;
    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;
    
    value + [raXRandom,raYRandom,raZRandom] * raValue;
} else {
    value;
}