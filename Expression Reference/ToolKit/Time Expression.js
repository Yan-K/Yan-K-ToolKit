/*Yan-K Time*/
var mainController = effect("Yan-K Time_' + name + '");
var pTimeSwitch = mainController(25);
var pTimeFrame = mainController(26);
var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;

var masterSwitch = mainController(3);
var mainSpeed = mainController(4);
var mainAcc = mainController(5);
var mainTime = masterSwitch == 1 ? (time*mainSpeed+(time*time*mainAcc)) : 0;

var sepDSwitch = mainController(7);

var xSwitch =  mainController(10);
var xSpeed =  mainController(11);
var xAcc =  mainController(12);

var ySwitch =  mainController(15);
var ySpeed =  mainController(16);
var yAcc =  mainController(17);

var zSwitch =  mainController(20);
var zSpeed =  mainController(21);
var zAcc =  mainController(22);

var xTime = xSwitch == 1 ? (time*xSpeed+(time*time*xAcc)) : 0;
var yTime = ySwitch == 1 ? (time*ySpeed+(time*time*yAcc)) : 0;
var zTime = zSwitch == 1 ? (time*zSpeed+(time*time*zAcc)) : 0;

var newX = sepDSwitch == 1 ? xTime : mainTime;
var newY = sepDSwitch == 1 ? yTime : mainTime;
var newZ = sepDSwitch == 1 ? zTime : mainTime;

switch (value.length) {
    case 1:
    newX;
    break;
    case 2:
    [value[0]+newX,value[1]+newY];
    break;
    case 3:
    [value[0]+newX,value[1]+newY,value[2]+newZ];
    break;
    default:
    newX;
    break;
}