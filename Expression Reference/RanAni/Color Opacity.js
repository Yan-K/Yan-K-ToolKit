/* Color Opacity Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Color");
raOpacity = raMain("Color Opacity");
raCrazy = raMain(52);

if (raSwitch == 1) {
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raCrazy == 1 ? raOpacity : raOpacity*1.5*raValue;
} else {
    0;
}