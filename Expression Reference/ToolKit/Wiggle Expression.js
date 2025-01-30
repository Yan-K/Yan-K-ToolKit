/*Yan-K Wiggle*/
var mainController = effect("Yan-K Wiggle_' + name + '");
var pTimeSwitch = mainController(26);
var pTimeFrame = mainController(27);
var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value ;

var masterSwitch = mainController(3);
if (masterSwitch == 1) {
    var mainSpeed = mainController(4);
    var mainRange = mainController(5);
    var mainWiggle = wiggle(mainSpeed,mainRange);

    var uniformSwitch = mainController(7);
    var sepDSwitch = mainController(8);

    var xSwitch =  mainController(11);
    var xSpeed =  mainController(12);
    var xRange =  mainController(13);

    var ySwitch =  mainController(16);
    var ySpeed =  mainController(17);
    var yRange =  mainController(18);

    var zSwitch =  mainController(21);
    var zSpeed =  mainController(22);
    var zRange =  mainController(23);

    var xWiggle = xSwitch == 1 ? wiggle(xSpeed,xRange) : value;
    var yWiggle = ySwitch == 1 ? wiggle(ySpeed,yRange) : value;
    var zWiggle = zSwitch == 1 ? wiggle(zSpeed,zRange) : value;

    var newX = sepDSwitch == 1 ? xWiggle : mainWiggle;
    var newY = sepDSwitch == 1 ? yWiggle : mainWiggle;
    var newZ = sepDSwitch == 1 ? zWiggle : mainWiggle;

    var yUni = uniformSwitch == 1 ? 0 : 1;
    var zUni = uniformSwitch == 1 ? 0 : 2;

    switch (value.length) {
        case 1:
        newX;
        break;
        case 2:
        [newX[0],newY[yUni]];
        break;
        case 3:
        [newX[0],newY[yUni],newZ[zUni]];
        break;
        default:
        newX;
        break;
    }
} else {value};