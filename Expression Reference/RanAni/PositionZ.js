/* Position Z Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Position");
raZ = raMain("Position Z");
raZDir = raMain(21);
raCrazy = raMain(22);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedRandom(raSeed,raCrazySwitch);
    
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raZRandom = raZDir == 1 ? random(raZ) : random(-raZ,raZ);
    
    value + raZRandom * raValue;
} else {
    value;
}