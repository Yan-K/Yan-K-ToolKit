/*Yan-K AutoFade*/
var mainController = effect("Yan-K AutoFade");
var pTimeSwitch = mainController(10);
var pTimeFrame = mainController(11);
var pTime = pTimeSwitch == 1 ? posterizeTime(pTimeFrame) : value;

var layerDuration = outPoint-inPoint;
var fadeIn = mainController(3);
var fadeOut = mainController(4);
var fTimeIn = fadeIn + fadeOut > layerDuration ? layerDuration/2 : fadeIn;
var fTimeOut = fadeOut + fadeIn > layerDuration ? layerDuration/2 : fadeOut;

var fOpaMin = mainController(6);
var fOpaMax = mainController(7);

var fGraph = mainController(14);

var fIn = fGraph == 1 ? linear(time,thisLayer.inPoint,thisLayer.inPoint+fTimeIn,fOpaMin,fOpaMax) : easeIn(time,thisLayer.inPoint,thisLayer.inPoint+fTimeIn,fOpaMin,fOpaMax);
var fOut = fGraph == 1 ? linear(time,thisLayer.outPoint-fTimeOut,thisLayer.outPoint,fOpaMax,fOpaMin) : easeOut(time,thisLayer.outPoint-fTimeOut,thisLayer.outPoint,fOpaMax,fOpaMin);

if (time < inPoint) {
  fOpaMin;
} else if (time <= inPoint+fTimeIn) {
  fIn;
} else if (time >= outPoint-fTimeOut) {
  fOut;
} else {
  fOpaMax;
}
