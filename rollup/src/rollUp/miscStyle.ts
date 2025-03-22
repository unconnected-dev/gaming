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
    cornerRadius:           0,
    lineWidth:              0,
    borderColor:            gameColors.black,
    backgroundColor:        gameColors.honeyDew,
    fontFamily:             `Open Sans`,
    fontSize:               70,
    fontColor:              gameColors.black,
}