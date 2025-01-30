/* Position Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Position");
raX = raMain("Position X");
raY = raMain("Position Y");
raZ = raMain("Position Z");
raXDir = raMain(19);
raYDir = raMain(20);
raZDir = raMain(21);
raCrazy = raMain(22);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedRandom(raSeed,raCrazySwitch);
    
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);
    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);
    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);
    
    value + [raXRandom,raYRandom,raZRandom] * raValue;
} else {
    value;
}