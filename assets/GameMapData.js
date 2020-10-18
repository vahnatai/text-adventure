export default {
    startRoomName: 'FOYER',
    rooms: [
        {
            name: 'FOYER',
            description: 'The decor of this room is bright and welcoming.',
            items: [
                {
                    name: 'knife',
                    quickDesc: 'A curved KNIFE lies on the floor.',
                    floorDesc: 'The knife appears to be of considerable craftsmanship.',
                    moreDesc: 'Its blade is a tongue that curves back and forth, protruding from the mouth of a snake at the crossguard.'
                }
            ],
            features: [
                {
                    name: 'window',
                    description: (game) => `The ${game.isDay() ? 'sun shines warmly' : 'moon glows cooly'} through a nearby window.`,
                    moreDescription: 'A great rolling field of grass sprawls out beyond it.'
                },
                {
                    name: 'box',
                    description: 'A large wooden box sits against one wall.',
                    hiddenItems: [
                        {
                            name: 'cube',
                            quickDesc: 'In the darkness at the bottom of the box you see a strange metal CUBE.',
                            floorDesc: 'A metal cube.',
                            moreDesc: 'It has odd shaped engravings along its surface. A flat and deep slot in the center of one face looks like it could fit a key.'
                        }
                    ]
                }
            ],
            exits: [
                {
                    direction: 'SOUTH',
                    destinationName: 'HALL'
                }
            ]
        },
        {
            name: 'HALL',
            description: 'This large and comfortable hall has room for many people. Perhaps that is why seeing its present emptiness feels so lonely.',
            items: [],
            features: [
                {
                    name: 'portraits',
                    description: 'A series of portraits cover one wall.'
                },
                {
                    name: 'tables',
                    description: 'Tables are arrayed throughout the room with plentiful seating.',
                    hiddenItems: [
                        {
                            name: 'candlestick',
                            quickDesc: 'On one table lies a red CANDLESTICK.',
                            floorDesc: 'A red wax candle.',
                            moreDesc: 'It looks unused.'
                        }
                    ]
                }
            ],
            exits: [
                {
                    direction: 'NORTH',
                    destinationName: 'FOYER'
                },
                {
                    direction: 'SOUTH',
                    destinationName: 'BASEMENT'
                }
            ]
        },
        {
            name: 'BASEMENT',
            description: 'The air down here is musty and stale.',
            items: [
                {
                    name: 'baby',
                    quickDesc: 'A small BABY lies cooing on its back on the floor.',
                    floorDesc: 'Yup, that\'s a live baby.',
                    moreDesc: 'It looks healthy and content enough. Slightly oblivious to the world around it. Maybe a little chubby.'
                }
            ],
            features: [
                {
                    name: 'fruit',
                    description: 'A pile of old fruit rots in the corner.',
                    moreDescription: 'Fucking gross.'
                }
            ],
            exits: [
                {
                    direction: 'NORTH',
                    destinationName: 'HALL'
                }
            ]
        }
    ]
};
