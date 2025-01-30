/*Yan-K 1D Wiggle*/
var mainController = effect("Yan-K Wiggle_' + name + '");
var pTimeSwitch = mainController(26);
var pTimeFrame = mainController(27);
var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;

var masterSwitch = mainController(3);
if (masterSwitch == 1) {
    var mainSpeed = mainController(4);
    var mainRange = mainController(5);
    var mainWiggle = wiggle(mainSpeed,mainRange);

    mainWiggle;
} else {value};