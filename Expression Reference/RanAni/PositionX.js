/* Position X Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Position");
raX = raMain("Position X");
raXDir = raMain(19);
raCrazy = raMain(22);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedRandom(raSeed,raCrazySwitch);
    
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raXRandom = raXDir == 1 ? random(raX) : random(-raX,raX);
    
    value + raXRandom * raValue;
} else {
    value;
}