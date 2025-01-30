/* Scale Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Scale");
raUniform = raMain("Uniform Scale");
raX = raMain("Scale X");
raY = raMain("Scale Y");
raZ = raMain("Scale Z");
raXDir = raMain(38);
raYDir = raMain(39);
raZDir = raMain(40);
raCrazy = raMain(41);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedRandom(raSeed,raCrazySwitch);
    
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);
    raYRandom = raYDir == 1 ? random(raY) : random(-raY,raY);
    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);
    
    raXXX = value + [raXRandom,raXRandom,raXRandom] * raValue;
    raXYZ = value + [raXRandom,raYRandom,raZRandom] * raValue;
    
    raOut = raUniform == 1 ? raXXX : raXYZ;
    raOut;
} else {
    value;
}