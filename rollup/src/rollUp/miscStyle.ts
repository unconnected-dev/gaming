import { TextStyle } from 'pixi.js';

export enum gameColors {
	black           = 0x0A0A0A,//#0A0A0A
    darkGray        = 0x1f1f1f,//#1f1f1f
    lightGray       = 0x899499,//#899499

    richBlack       = 0x141d26,//#141d26
    honeyDew        = 0xF3FCF0,//#F3FCF0
    celticBlue      = 0x266DD3,//#266DD3
    redPantone      = 0xEF233C,//#EF233C
    yellow          = 0xF6F740,//#F3A712
};

export const BasicButtonStyling = {
    width: 132,
    height: 66,
    cornerRadius: 5,
    lineWidth: 5,
    borderColor: gameColors.black,
    backgroundColor: gameColors.darkGray,
    seletedBackgroundColor: gameColors.lightGray,
    basicTextStyle: new TextStyle({
        fontFamily: `Arial`,
        fontSize: 20,
        fill: gameColors.honeyDew,
        align: `center`
    }),
    selectTextStyle: new TextStyle({
        fontFamily: `Arial`,
        fontSize: 20,
        fill: gameColors.black,
        align: `center`
    })
};

export const AnnouncementStyling = {
    width:                  800,
    height:                 600,
    cornerRadius:           0,
    lineWidth:              0,
    borderColor:            gameColors.black,
    backgroundColor:        gameColors.honeyDew,
    basicTextStyle: new TextStyle({
        fontFamily:         `Open Sans`,
        fontSize:           60,
        fill:               gameColors.black,
        align:              `center`,
        fontVariant: `small-caps`
    })
};

export const ObjectPositions = {
    announcementGraphic: {
        x: 0,
        y: 400
    },
    announcementText: {
        x: 0,
        y: 0
    },
    numberTextDefault: {
        x: 0,
        y: 0
    },
    numberTextExample: {
        x: 0,
        y: 0
    },
    startButton: {
        x: -148,
        y: 750
    },
    resetButton: {
        x: 148,
        y: 750
    }
};