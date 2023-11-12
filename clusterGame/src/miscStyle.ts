
export enum gameColors {
	black           = 0x0A0A0A,//#0A0A0A
    darkGray        = 0x1f1f1f,//#1f1f1f
    lightGray       = 0x899499,//#899499

    richBlack       = 0x141d26,//#141d26
    honeyDew        = 0xF3FCF0,//#F3FCF0
    celticBlue      = 0x266DD3,//#266DD3
    redPantone      = 0xEF233C,//#EF233C
    yellow          = 0xF6F740,//#F3A712
}

export enum symbolValues {
    value0 = `0`,
    value1 = `1`,
    value2 = `2`,
    value3 = `3`,
    value4 = `4`,
    value5 = `5`,
}

export const symbolStyle = {
    width:          32,
    height:         32,
    lineWidth:      4,
    cornerRadius:   6,
    margin:         6,
    borderColor: gameColors.richBlack
}

export function getGameColor(index: number): gameColors{
    switch(index){
        case 0:  return gameColors.black;
        case 1:  return gameColors.richBlack;
        case 2:  return gameColors.honeyDew;
        case 3:  return gameColors.celticBlue;
        case 4:  return gameColors.redPantone;
        case 5:  return gameColors.yellow;
        default: return gameColors.black;
    }
}

export function getSymbolValue(index: number): symbolValues{
    switch(index){
        case 0:  return symbolValues.value0;
        case 1:  return symbolValues.value1;
        case 2:  return symbolValues.value2;
        case 3:  return symbolValues.value3;
        case 4:  return symbolValues.value4;
        case 5:  return symbolValues.value5;
        default: return symbolValues.value0;
    }
}

export const BasicButtonStyle = {
    width:                  132,
    height:                 66,
    cornerRadius:           5,
    lineWidth:              5,
    borderColor:            gameColors.black,
    backgroundColor:        gameColors.darkGray,
    seletedBackgroundColor: gameColors.lightGray,
    fontFamily:             `Arial`,
    fontSize:               20,
    fontColor:              gameColors.honeyDew,
    selectedFontColor:      gameColors.black
}

export const AnnouncementStyle = {
    cornerRadius:           5,
    lineWidth:              5,
    borderColor:            gameColors.black,
    backgroundColor:        gameColors.honeyDew,
    fontFamily:             `Impact`,
    fontSize:               50,
    fontColor:              gameColors.black,
}