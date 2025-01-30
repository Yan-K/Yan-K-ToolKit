/*Yan-K FastBlink*/
fbControl = effect("Pseudo/YanKFB2");
fbSwitch = fbControl("Blink Switch");
fbSpeed = fbControl("Blink Speed");
fbAmount = fbControl("Blink Amount");
fbStatic = fbControl("Static Mode");
fbStay = fbControl("Stay Blink");
fbAutoOffset = fbControl("Auto Offset") == 1 ? index*8 : index*0;
offset = fbControl("Blink Offset")/(fbSpeed*Math.PI)+fbAutoOffset;

sinOrig = value + Math.sin((time+offset)*fbSpeed)*fbAmount;
sinStatic = value + Math.sin((time+offset)*fbSpeed)*10000;
sinValue = fbStatic == 1 ? sinStatic : sinOrig;
valueMain = value > 1 && value < 99 ? sinValue : value;
valueStay = fbStay == 1 ? sinValue : valueMain;
fbSwitch == 1 ? valueStay : value;