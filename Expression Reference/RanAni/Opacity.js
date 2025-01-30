/* Opacity Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Opacity");
raRate = raMain(44);
raStay = raMain(45);

if (raSwitch == 1) {
    raValue = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    
    raFade = wiggle(raRate/4*raValue,raRate*raValue) + linear(raValue,0,1,0,-value);
    raBlink = raRate == 0 ? linear(raValue,0,1,value,0) : wiggle(raRate/8,raRate) + linear(raValue,0,1,0,-value);
    raOpacity = raStay == 1 ? raBlink : raFade;
    
   raValue == 1? 0 : raOpacity;
} else {
    value;
}