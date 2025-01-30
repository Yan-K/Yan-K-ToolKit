/*Yan-K 1D Time*/
var mainController = effect("Yan-K Time_' + name + '");
var pTimeSwitch = mainController(25);
var pTimeFrame = mainController(26);
var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;

var masterSwitch = mainController(3);
var mainSpeed = mainController(4);
var mainAcc = mainController(5);
var mainTime = masterSwitch == 1 ? value+(time*mainSpeed+(time*time*mainAcc)) : value;

mainTime;