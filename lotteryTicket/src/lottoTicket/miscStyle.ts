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

export const WinningNumberStyle = {
    width:                      64,
    height:                     64,
    cornerRadius:               5,
    lineWidth:                  5,
    margin:                     8,
    borderColor:                gameColors.black,
    backgroundColor:            gameColors.yellow,
    fontFamily:                 `Arial`,
    fontSize:                   24,
    fontColor:                  gameColors.black,
}

export const PlayerNumberStyle = {
    width:                      64,
    height:                     64,
    cornerRadius:               5,
    lineWidth:                  5,
    margin:                     8,
    borderColor:                gameColors.black,
    backgroundColor:            gameColors.darkGray,
    backgroundSelectedColor:    gameColors.celticBlue,
    backgroundMatchColor:       gameColors.yellow,
    backgroundNoMatchColor:     gameColors.darkGray,
    fontFamily:                 `Arial`,
    fontSize:                   24,
    fontColor:                  gameColors.honeyDew,
    fontSelectedColor:          gameColors.black,
    fontMatchColor:             gameColors.black,
    fontNoMatchColor:           gameColors.lightGray
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