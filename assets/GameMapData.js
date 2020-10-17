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
                    description: (game) => `The ${game.isDay() ? 'sun shines warmly' : 'moon glows cooly'} through a nearby window.`
                },
                {
                    name: 'box',
                    description: 'A large wooden box sits against one wall.'
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
            description: 'This large and comfortable space has capacity for many people. Perhaps that is why seeing its present emptiness feels so lonely.',
            items: [],
            features: [
                {
                    name: 'throne',
                    description: 'An opulent throne towers over the rest of the room.'
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
                    description: 'A pile of old fruit rots in the corner.'
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
