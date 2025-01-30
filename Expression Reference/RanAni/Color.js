/* Color Expression By Yan-K RanAni 3*/
raMain = thisComp.layer("_RanAni_Control_' + dropDownMenu.selection.text + '").effect("Pseudo/YanKRA3");
raControl = raMain("Animation Control");
raSeed = raMain("Random Seed");
raDelay = raMain("Offset (Second)");
raIndex = raMain("Fix Index").index;

raSwitch = raMain("Color");
raRate = raMain(48);
raColor = raMain("Base Color");
raSeedFix = raMain("Same Color");
raCrazy = raMain(52);

if (raSwitch == 1) {
    raCrazySwitch = raCrazy == 1 ? false : true;
    seedFix = raSeedFix == 0 ? seedRandom(raSeed+index,raCrazySwitch) : seedRandom(raSeed,raCrazySwitch);
    seedFix;
    
    Control = raDelay == 0 ? raControl : raControl.valueAtTime(time-raDelay*(index-raIndex));
    Wiggle = wiggle(raRate/10,raRate/30);
    Color = raSeedFix == 1 ? (raColor + Wiggle)*Control : (hslToRgb([random(0,1),0.7,0.7,1]) + Wiggle)*Control;
    
    raCrazy == 1 ? wiggle(raRate/10,raRate) : Color;
} else {
    [0,0,0,0];
}