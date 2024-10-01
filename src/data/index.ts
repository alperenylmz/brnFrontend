
type Token = {
    type: string;
    percentage: number;
    color: string;
}
export const token_allocations: Array<Token> = [
    {
        type: 'Burn',
        percentage: 38,
        color: '#EB5757'
    },
    {
        type: 'Game & Project',
        percentage: 20,
        color: '#F2994A'
    },
    {
        type: 'Airdrop',
        percentage: 3,
        color: '#F2C94C'
    },
    {
        type: 'Stake',
        percentage: 5,
        color: '#2F80ED'
    },
    {
        type: 'Team',
        percentage: 5,
        color: '#6FCF97'
    },
    {
        type: 'Liquidity',
        percentage: 27,
        color: '#F2F2F2'
    },
    {
        type: 'Collaborations',
        percentage: 2,
        color: '#9B51E0'
    }
];

type NFTCollection = {
    name?: string;
    showImage: string;
    image: string;
};
export const NFTCollections: Array<NFTCollection> = [
    {
        name: "Axer",
        image: "axer.jpg",
        showImage: "axer-show.jpg"
    },
    {
        name: "Angel",
        image: "angel.jpg",
        showImage: "angel-show.jpg"
    },
    {
        name: "Babarosa",
        image: "babarosa.jpg",
        showImage: "babarosa-show.jpg"
    },
    {
        name: "Barton",
        image: "barton.jpg",
        showImage: "barton-show.jpg"
    },
    {
        name: "Elf",
        image: "elf.jpg",
        showImage: "elf-show.jpg"
    },
    {
        name: "Axer",
        image: "axer.jpg",
        showImage: "axer-show.jpg"
    },
    {
        name: "Axer",
        image: "axer.jpg",
        showImage: "axer-show.jpg"
    },
    {
        name: "Axer",
        image: "axer.jpg",
        showImage: "axer-show.jpg"
    },
];

type Industry = {
    icon: string;
    title: {
        prefix: string;
        suffix: string;
    };
    description: string;
}
export const focused_industries: Array<Industry> = [
    {
        icon: 'game-controller.png',
        title: {
            prefix: 'Game',
            suffix: 'NFT'
        },
        description: 'Our NFTs are designed to be used in the game and provide you with additional utility. By enhancing your characters with extra powers, you\'ll be able to stand out in battles and earn more money, increasing your chances of winning. The NFTs we produce are limited edition and can only be purchased using $BRN. Don\'t forget to check out our unique collection of NFTs.'
    },
    {
        icon: 'metamask.png',
        title: {
            prefix: 'Web',
            suffix: '3'
        },
        description: 'We prioritize security in every aspect of our project, which is why we are committed to serving the WEB3 ecosystem. We contribute to the development of this ecosystem and aim to play a significant role in its growth. We fully embrace the WEB3 ecosystem in our pre-sale, staking, NFT Marketplace, and our game. Users can use their decentralized wallets as both an ID and a card, ensuring a seamless experience. Join us and dive into the WEB3 ecosystem!'
    },
    {
        icon: 'oculus.png',
        title: {
            prefix: 'META',
            suffix: 'VERSE'
        },
        description: 'In our project\'s meta-universe, users from the real world have the opportunity to transition into the virtual universe. We enhance the Metaverse universe with wearable technologies powered by Artificial Intelligence, making it more practical and immersive. Our game, set within the Metaverse universe, is an MMO with high-resolution graphics, ensuring an enjoyable experience. You can earn substantial profits while playing our game, as we prioritize a fair and balanced economy in our project, implementing effective solutions and systems.'
    },
    {
        icon: 'game-controller.png',
        title: {
            prefix: 'Game',
            suffix: 'Fi'
        },
        description: 'In our Metaverse universe, we offer players various income opportunities within a multifunctional structure. Our goal is to provide a winning experience while enjoying the game. Engage in battles with your characters in event arenas to earn points, and based on your earned points, you can rank and receive monthly income in USDT. Our game features BRN Arenas focused on direct revenue, where you can collect the BRNs left by your defeated opponents. Additionally, defeating bosses, a key feature of MMO games, will be even more rewarding in our game. The more bosses you defeat, the higher your income potential. We have created a structure that combines entertainment with income generation, unlike ordinary GameFi ecosystems that have deviated from their original purpose.'
    }
];

type WarriorType = {
    name: string;
    image: string;
}
type Hero = {
    name: string;
    skills?: number;
    description?: string;
    warriorType?: WarriorType;
}
export const heroes: Hero[] = [
    {
        name: 'Angel',
        warriorType: {
            name: 'Support',
            image: 'Support.png'
        },
        description: 'Angel, one of the support characters of the BRNVERSE game, is the representative of goodness, purity, ' +
            'and beauty. The Angel character, who has the ability to heal himself and his teammates, is a friend that ' +
            'everyone wants to be around sometimes. Sometimes he is an angel of death who spreads fear with his magical wand.'
    },
    {
        name: 'Axer',
        warriorType: {
            name: 'Tank',
            image: 'Tank.png'
        },
        description: 'Axer, one of the tank characters in the BRNVERSE game, is a fighter who lost an arm in the past and turned this weakness into an advantage. He has become stronger than before by using a state-of-the-art robotic arm instead of the one he lost. The Axer character is also an expert with an axe, and is always a significant threat to his opponents.'
    },
    {
        name: 'Barbarossa',
        warriorType: {
            name: 'Tank',
            image: 'Tank.png'
        },
        description: 'Barbarossa, one of the tank characters in the BRNVERSE game, is an experienced pirate who has participated in numerous wars in the past. Barbarossa, the ruler of the seas, throws his magical anchor not only into the sea but also at his enemies. Barbarossa lost an arm and a leg in the past but has renewed his lost limbs with mechanical inventories.'
    },
    {
        name: 'Barton',
        warriorType: {
            name: 'Warrior',
            image: 'Warrior.png'
        },
        description: 'Barton is one of the warrior characters in the BRNVERSE game. He is a noble and honorable warrior from a royal family, born to fight. Despite being blind, he is a perfect fighter who fights with his feelings.'
    },
    {
        name: 'Elf',
        warriorType: {
            name: 'Marksman',
            image: 'Marksman.png'
        },
        description: 'Elf, one of the marksman characters in the game BRNVERSE, is a warrior who comes from a noble race and has unique bow and arrow skills. The Elf character, the only warrior left of their race, represents their race with their superior fighting ability. With their magical arrows, unique aiming ability, and powerful field damage, they provide their opponents with a versa'
    },
    {
        name: 'Harley',
        warriorType: {
            name: 'Warrior',
            image: 'Warrior.png'
        },
        description: 'Harley is one of the warrior characters in the BRNVERSE game. As a knight, he is an expert in both perfect attack and perfect defense. Raised as a warrior since childhood, Harley is a balanced royal warrior who specializes in using spears and shields.'
    },
    {
        name: 'Metabot',
        warriorType: {
            name: 'Marksman',
            image: 'Marksman.png'
        },
        description: 'Metabot, one of the wizard characters of the BRNVERSE game, is a warrior who is completely mechanical and has technologies beyond his era. In addition to his warrior identity, he has the ability of mechanical magic. He has become a unique synthesis of magic with nanotechnology. One of the sources of this magical ability is the unique mechanical weapon he uses.'
    },
    {
        name: 'Metawatt',
        warriorType: {
            name: 'Wizard',
            image: 'Wizard.png'
        },
        description: 'Metawatt, one of the marksman characters in the BRNVERSE game, is a fighter with state-of-the-art mechanical arms and a semi-robotic body. Thanks to the cores in its body, it converts into an unlimited energy source. The Metawatt character has become a unique warrior by sending electric waves to its opponents with its robotic arms.'
    },
    {
        name: 'Ninja',
        warriorType: {
            name: 'Assassin',
            image: 'Assassin.png'
        },
        description: 'Ninja, one of the assassin characters in the BRNVERSE game, is a mysterious assassin. What makes him better than other ninjas is that he has four arms and four daggers. Although he has been an agent for many sects in the past, he has put aside his past and started to fight for himself. The ninja character is now more dangerous than he was in the past.'
    },
    {
        name: 'Reef',
        warriorType: {
            name: 'Support',
            image: 'Support.png'
        },
        description: 'Reef, one of the support characters in the BRNVERSE game, is the most dangerous warrior of an ancient royal family deep in the sea. After his royalty was destroyed, Reef came to the surface and now uses his warrior identity on land. Thanks to the magical sword he wields, he is an expert in water control and healing.'
    },
    {
        name: 'Router',
        warriorType: {
            name: 'Assassin',
            image: 'Assassin.png'
        },
        description: 'Router is one of the assassin characters in the BRNVERSE game. He is a unique-looking assassin who has mechanically improved himself. He is a mysterious agent who can slyly and quickly defeat his opponents with mechanical chains on his wrist. He is a much more agile, agile, and dangerous killing machine compared to his competitors.'
    },
    {
        name: 'Witch',
        warriorType: {
            name: 'Wizard',
            image: 'Wizard.png'
        },
        description: 'Witch is one of the wizard characters in the BRNVERSE game, and she is known for her cunning and deceitful nature. Raised by her mother as a wizard, Witch is an expert in mystical spells and mass control. Her specially produced wand is a major source of her mystical magic power.'
    },
]

export type HeroName = 'angel'|'axer'|'barbarossa'|'barton'|'elf'|'harley'|'metabot'|'metawatt'|'ninja'|'reef'|'router'|'witch';

type Skill = {
    video: string;
    icon: string;
    name: string;
    description: string;
}

type Skills = {
    [key in HeroName]: Skill[];
};

export const skills: Skills  = {
    angel: [
        {
            icon: '1.jpeg',
            name: 'White Light',
            description: 'Angel sends a glowing ball of magic to his enemies with his magic wand. Enemies hit by this magic ball take some damage and this damage continues for a while.',
            video: 'https://drive.google.com/uc?id=1vTMDDi_YvrK9MJFOMY4dWyBqPvY3ZdOl'
        },
        {
            icon: '2.jpeg',
            name: 'Life Giver',
            description: 'Angel, the representation of pure goodness, has the ability to increase life. You can use this feature for yourself or a friend.\n',
            video: 'https://drive.google.com/uc?id=1M3I3YhlBElaTUOW75kQne2YWGM9fnARH'
        },
        {
            icon: '3.jpeg',
            name: 'Enchanted Shield',
            description:' Angel, a full support character, has the ability to create a magical protective shield. Angel can apply this temporary shield to himself or his teammate.\n',
            video: 'https://drive.google.com/uc?id=1Kircy0npjiXInNbHszsyL0Hv10alhckY'
        },
        {
            icon: '4.jpeg',
            name: 'Shinning Sparkle',
            description: 'Angel casts a white spell on the sky with his magic wand. Then, a beam of light falls on the targeted area, and enemies caught in this magic shower take high magic damage.\n',
            video: 'https://drive.google.com/uc?id=1zH0F_zpbZEPTxwa-WLQGG_oUdZcSeiOt'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Blessing',
        //     description: 'Angel passively becomes faster than enemies. in this way, he can deftly evade the attacks and crowd controls that come to him.\n,',
        //     video: ''
        // }
    ],
    axer: [
        {
            icon: '1.jpeg',
            name: 'Guillotine',
            description: 'Axer, who terrorizes his enemies with his strong physique and huge ax, leaps into the air and hits the ground with his ax hard. Deals physical damage to surrounding enemies with this ax blow.\n',
            video: 'https://drive.google.com/uc?id=1NZjPtmwCUE0KOT1NYM1I7Ke4XAuxBaxE'
        },
        {
            icon: '2.jpeg',
            name: 'Mechanical Shock',
            description: 'Axer, who lost one arm in a war in the past, has a mechanical arm instead of the one he lost. With this mechanical arm, he sends electric shocks to his enemies, dealing physical damage and stunning them.\n',
            video: 'https://drive.google.com/uc?id=13Tb0l2MqtrFOV91UWtNmsamo-ilg6_FJ'
        },
        {
            icon: '3.jpeg',
            name: 'Thief Ax',
            description: 'Axer throws his ax hard at the enemy with his strong arms. This ax deals high physical damage to the enemy it hits. It also allows him to steal from his opponent\'s armor and add it to himself.',
            video: 'https://drive.google.com/uc?id=1oh_gBDRwaGYuiiR1obApjh6X3W2IwdJ5'
        },
        {
            icon: '4.jpeg',
            name: 'Barrier',
            description: 'After focusing for a while, Axer creates a shield for himself thanks to his mechanical arm. This shield protects Axer from his enemies, while also providing himself with armor and magic resistance.',
            video: 'https://drive.google.com/uc?id=1w9gkN2b1rOM_ahYiG6yMtQpiggm8SJ3Y'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Empowered Attack',
        //     description: ' An expert at wielding axes, Axer gains special power that amplifies his attacks for certain durations. With this special power, he can undermine his opponents more fiercely.,',
        //     video: ''
        // }
    ],
    barbarossa: [
        {
            icon: '1.jpeg',
            name: 'Capsized',
            description: ' Experienced pirate Barbarossa does not let his enemy escape by throwing his anchor at his target enemy. Enemy with his hook takes physical damage during this time',
            video: 'https://drive.google.com/uc?id=1Hp9ZYmBmo_cD9JPkRbucJOu9YgOudv9S'
        },
        {
            icon: '2.jpeg',
            name: 'Breakwater',
            description: 'Barbarossa creates an enchanted shield for himself. This shield adds health to her and deals damage to nearby enemies.\n',
            video: 'https://drive.google.com/uc?id=1hzE_EgsYfTvgb08QDxhEbOg8NlHoGLzw'
        },
        {
            icon: '3.jpeg',
            name: 'Earthquake',
            description: 'Barbarossa hits the ground hard with his mechanical leg, which he used to replace the leg he lost in a past war, damaging the enemies around him.',
            video: 'https://drive.google.com/uc?id=10JgMQ9ahJsZut3xG7ITTUpesqJ5F9M7a'
        },
        {
            icon: '4.jpeg',
            name: 'Tides',
            description: 'Barbarossa swings his anchor and sends a shockwave that shatters the earth\'s crust to his focused opponent. The moment this shockwave hits the targeted enemy, it deals high damage and stuns.',
            video: 'https://drive.google.com/uc?id=1F372wjobV_1tToF-jJk1QzYPCoxaY4h9'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Anchoring',
        //     description: 'Barbarossa can anchor his enemies in the same way as he anchors his ship. If his enemy is exposed to this feature when he hits his enemies at regular intervals, he will stand still for a while.\n',
        //     video: ''
        // }
    ],
    barton: [
        {
            icon: '1.jpeg',
            name: 'Sword Wave',
            description: 'A noble warrior, Barton swings his sword towards the enemy and creates a beam of rays. Enemies hit by this wave are first dealt physical damage and then slowed a bit.\n',
            video: 'https://drive.google.com/uc?id=1VWM0XEeag97ViMiyhqT4DjJDZWEV_bSy'
        },
        {
            icon: '2.jpeg',
            name: 'Sacred Sword',
            description: 'Barton, who is a true swordsman, uses his special power to enchant his sword and become more terrifying for his enemies.\n',
            video: 'https://drive.google.com/uc?id=13pPNCo0Thg3qbOFOe8Wytt3Of1o4mezp'
        },
        {
            icon: '3.jpeg',
            name: 'Concussive Blow',
            description: 'Barton jumps in place and accelerates towards the ground, hitting the ground hard with his sword. Shattering the dust with this sword strike, Barton deals physical damage to enemies around him.\n',
            video: 'https://drive.google.com/uc?id=1Vj_3cm-1EkjVr4NMgjTEoFaaiAhfcn6m'
        },
        {
            icon: '4.jpeg',
            name: 'Deadly Enchantment',
            description: 'Barton raises his enchanted sword to the sky and unleashes a rain of enchanted swords from the sky over a huge area. Enemies that come in contact with swords raining from the sky take high damage.',
            video: 'https://drive.google.com/uc?id=1Ww5uk9vEHkK5vRbBS_O3V0K26zBZbr-l'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Resistance',
        //     description: 'A crowd controler as well as adept melee skills, Barton also reduces his enemy\'s resistance with each sword strike that hits an enemy.\n',
        //
        //         video: ''
        // }
    ],
    elf: [
        {
            icon: '1.jpeg',
            name: 'Piercing Arrow',
            description: 'For the elf who has superior archery skills, it is enough to catch his enemy in sight. Focuses for a while and fires a high-damage arrow at the enemy. This arrow is inevitable for his enemy.\n',
            video: 'https://drive.google.com/uc?id=16wVl0iBK6DysYlXgK8ZeLhX7mim1XyyJ'
        },
        {
            icon: '2.jpeg',
            name: 'Freezing',
            description: 'Elf gives his enemies a hard time with an icy arrow, one of his ancient abilities. While this arrow does not deal high physical damage when it touches an enemy, it slows it down.\n',
            video: 'https://drive.google.com/uc?id=1HFYl6dqJ0TD6-4wgrbTCoYtDclXnSlXK'
        },
        {
            icon: '3.jpeg',
            name: 'Skyscraper',
            description: 'The elf points his bow to the sky and starts a rain of arrows that almost pierces the sky with the arrows he shoots one after the other. Enemies caught in a barrage of arrows get their share of every arrow that descends from the sky.',
            video: 'https://drive.google.com/uc?id=13PSCGhj8YWF3b7tBZhM84V3jSjXh__ai'
        },
        {
            icon: '4.jpeg',
            name: 'Burst Shooting',
            description: 'The elf magically clones 8 more of himself and fires a burst of flaming arrows at his enemies. His enemies take heavy damage from arrows he can\'t tell where they came from.',
            video: 'https://drive.google.com/uc?id=1Yix9XfmRIwkFUcPUud8XXO5rszpWkCpD'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Penetrates',
        //     description: 'Penetrates: Strongly stretching her bow, an Elf\'s arrow can strike three enemies. Penetrating through its targeted enemy, the arrow is aimed at another enemy, so it can deal multiple damage with an arrow.\n',
        //     video: ''
        // }
    ],
    harley: [
        {
            icon: '1.jpeg',
            name: 'Dragon Fire',
            description: 'A warrior who is an expert in using the spear, Harley throws her spear at the enemy with all her might and inflicts physical damage to her opponent with a mystical spell.\n',
            video: 'https://drive.google.com/uc?id=1zudNBFhh1uhtS37N6bSM3F9IUUoNPl2i'
        },
        {
            icon: '2.jpeg',
            name: 'Protective Power',
            description: 'Harley, who is a fighter who is proficient in using shields as well as his spear skill, focuses for a while and smashes his shield on the ground. He then defends himself from his enemies with a magical shield.\n',
            video: 'https://drive.google.com/uc?id=1Z93JnFWtFulqcVb5e8wQixgt1Y2bpjJV'
        },
        {
            icon: '3.jpeg',
            name: 'Headhunter',
            description: 'Possessing a magic spear, Harley brings out a fiery dragon from the earth\'s crust. This dragon chases the enemy and falls right on his hea d, dealing high damage.',
            video: 'https://drive.google.com/uc?id=16EljNtClck2hhBsBIZnyWGKtIKmRSEzI'
        },
        {
            icon: '4.jpeg',
            name: 'Hurricane',
            description: 'Harley creates a flaming hurricane from her magical and fiery spear and hurls it at her foe. His enemy is exposed to this hurricane for a period of time and cannot escape.',
            video: 'https://drive.google.com/uc?id=1XwfRD3Y5O0gFHQeVBrvoLobAwlaAfaJ3'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Stealth Shield',
        //     description: 'A great combination of defense and attack, Harley creates a short-term enchantment shield after inflicting a certain amount of damage on her enemies. This shield helps Harley stay safe from crowd control.\n',
        //
        //         video: ''
        // }
    ],
    metabot: [
        {
            icon: '1.jpeg',
            name: 'Beam Wave',
            description: 'Metabot points his state-of-the-art beam weapon at his opponent. After the weapon accumulates energy for a while, it fires a ball of rays that deals high damage to its target.\n',
            video: 'https://drive.google.com/uc?id=1vpAPikjLVBssS8vHreY7J4nnXcDzS__w'
        },
        {
            icon: '2.jpeg',
            name: 'Booby Burst',
            description: 'Metabot creates a circular beam on the ground it has determined. Detonates a circular beam at will, dealing physical damage to enemies entering the area. If Metabot doesn\'t detonate the beam, it will grow on its own and eventually explode.\n',
            video: 'https://drive.google.com/uc?id=1PbvaTLtFnkJSRDY-kHVYfjm7vDdadCCm'
        },
        {
            icon: '4.jpeg',
            name: 'Nano Shield',
            description: 'Metabot, which has extremely advanced features, creates a shield for itself using nano technology. The nano-shield it creates protects Metabot from enemy attacks.\n',
            video: 'https://drive.google.com/uc?id=10clt-gGrQTqVoYYZDbS34TX698sgkyfH'
        },
        {
            icon: '3.jpeg',
            name: 'Mechanical Rain',
            description: 'Metabot throws a ray bomb from his weapon at the targeted enemy. As soon as the grenade detonates, it deals some physical damage and inflicts a stun on enemies.\n',
            video: 'https://drive.google.com/uc?id=1qfjAgJ0UtPvQOWb_TTasAJVoMsZiRYc_'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Static Energy',
        //     description: 'As the Metabot deals damage to his enemies, he charges them some static energy. Metabot can detonate his energy charge on his enemies, dealing extra damage to them.\n',
        //
        //         video: ''
        // }
    ],
    metawatt: [
        {
            icon: '1.jpeg',
            name: 'Linear Current',
            description: 'Metawatt, who has electrically charged state-of-the-art arms, places his arms on the ground and sends an electric current bouncing off the ground to his opponent. Enemies who are electrocuted take physical damage and are slowed.',
            video: ''
        },
        {
            icon: '2.jpeg',
            name: 'Jetpack shock',
            description: 'Metawatt goes to his opponent with electric speed and inflicts a shock blow. While Metawatt returns at the same speed, his opponent has already taken physical damage and stunned.\n',
            video: ''
        },
        {
            icon: '3.jpeg',
            name: 'Marathon',
            description: 'Metawatt uses his electric charge to concentrate for a while and increase his own movement speed for a while. With this feature, it turns the heads of its competitors.\n',
            video: ''
        },
        {
            icon: '4.jpeg',
            name: 'Short Circuit',
            description: 'Metawatt points his electrically charged arms to the enemy and connects him with an electric current. Metawatt, who almost creates an alternating current, revives himself until the bond between him and his enemy is broken.',
            video: ''
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Lightning Rod',
        //     description: 'Metawatt creates an electrified shield for himself for a short time. This Electric shield helps Metawatt collect electricity. Gathering electricity, Metawatt is also slightly healed.\n',
        //     video: ''
        // }
    ],
    ninja: [
        {
            icon: '1.jpeg',
            name: 'Rain of Shuriken',
            description: 'Ninja, an extremely agile assassin, stuns his enemies with shurikens he throws one after the other. Enemies touched by shurikens take high physical damage.',
            video: 'https://drive.google.com/uc?id=1XDpg64_xqSbJTk4vEMd2e1-WoSaV2oAZ'
        },
        {
            icon: '2.jpeg',
            name: 'Dagger Strike',
            description: 'Ninja strikes a dagger blow by getting behind his opponent in an extremely fast and cold-blooded manner. Ninja masterfully fulfills his mission before his enemies realize what\'s going on.\n',
            video: 'https://drive.google.com/uc?id=1kmraLHS5V1xjK1QV1ghgDYH8ENXw3-SS'
        },
        {
            icon: '3.jpeg',
            name: 'Dagger Spin',
            description: 'With four arms and extraordinary agility, Ninja turns to enemies, dealing damage with a dagger strike. This unexpected attack inflicts a hurricane on opponents for a short time.\n',
            video: 'https://drive.google.com/uc?id=1X7EKmBkRDXSiuFWkxZUkgmKE6LGNNM7p'
        },
        {
            icon: '4.jpeg',
            name: 'Shadow Clone',
            description: 'Ninja magically creates a true clone of himself. This clone mimics whatever Ninja does. Additionally, the clone Ninja is immune to enemy attacks.',
            video: 'https://drive.google.com/uc?id=1fvuIwG-dw9I-V55quSbf6xv8t7vtEo94'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Serial Killer',
        //     description: 'Ninja, who is very quick and agile despite his four arms and strong physique, gets faster as he attacks his enemies.\n',
        //
        //         video: ''
        // }
    ],
    reef: [
        {
            icon: '1.jpeg',
            name: 'Water Ball',
            description: 'Reef, a sea creature with superior combat abilities, creates a magical water cannon and throws it at his enemies. This water cannon can hit multiple enemies. Deals physical damage to enemies hit.\n',
            video: 'https://drive.google.com/uc?id=1iK4Zjekbm2CZ1BQJ6iz5gqTILPelBbqG'
        },
        {
            icon: '2.jpeg',
            name: 'Waterline',
            description: ': Reef is a strong supporter as well as superior combat abilities. He can create a water bubble for himself or his teammate. This Bubble shields himself or his teammate and protects him from enemies',
            video: 'https://drive.google.com/uc?id=1mJBKW5dbKmKUs3skI3NbCmmjtJstALk5'
        },
        {
            icon: '3.jpeg',
            name: 'Healthy Water',
            description: 'A magical supporter, Reef sends healthy water from his sword to himself or his teammate. In this way, he can heal himself when his own health is low, and he can heal his ally when his ally\'s health is low.\n',
            video: 'https://drive.google.com/uc?id=1o6v_NwdWuNkDZnb5nWwWsxioeac5gqvR'
        },
        {
            icon: '4.jpeg',
            name: 'Tsunami',
            description: 'Reef sends a huge water balloon from his magic sword that traps his enemy. Enemies are trapped inside this water balloon and cannot move for a while. The water balloon then bursts, dealing damage to the enemy',
            video: 'https://drive.google.com/uc?id=19aSxlcmnkUyyJLshFHOusED96sxFK_vn'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Bubble',
        //     description: 'Reef drops a bubble of water over their heads as they fire water-charged hits at their enemies. He can pop this bubble at any time using one of his abilities. When the bubble bursts, it deals extra damage to the opponent.\n',
        //
        //         video: ''
        // }
    ],
    router: [
        {
            icon: '1.jpeg',
            name: 'Core Burst',
            description: 'Router, fires successive beams at enemies using cores in its unique mechanical chains. Enemies that come into contact with these rays take some physical damage.\n',
            video: 'https://drive.google.com/uc?id=1Ch4oR04lf5ZpKVsJ32WkCmNGumWd2yTf'
        },
        {
            icon: '2.jpeg',
            name: 'Electro Shock',
            description: 'The router throws its mechanical chains at the enemy, and the chains that lock on the enemy give an electro shock for a while. Enemies hit by this stun are stunned for a while.',
            video: 'https://drive.google.com/uc?id=1Gl2mg4Gkx0TPXs0numqND_EYdQQvdWkZ'
        },
        {
            icon: '3.jpeg',
            name: 'Chain of Assassination',
            description: 'Router, which has unique abilities, puts its mechanical chains underground and performs a sudden attack on its targeted opponent from an unexpected place. Deals physical damage to his opponent with this long-range attack.',
            video: 'https://drive.google.com/uc?id=1SP8VzPVPv_mDFAk35GothyS26WiA2Kgf'
        },
        {
            icon: '4.jpeg',
            name: 'Ivy',
            description: 'The router wraps its mechanical chains on its opponent and wraps it like a ivy. Meanwhile, the Router, whose movement speed has increased, ruthlessly attacks his opponent who can not move by removing new chains to himself.',
            video: 'https://drive.google.com/uc?id=1wl3Qw42NDH_9h6RSoAAVve_DKsVee1Aw'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Electric Leakage',
        //     description: 'The Router leaves a passive electric charge to its enemies when it hits with its chains. Each time this electrical charge explodes, it adds speed to the speed of the Router, a serial assassin.\n',
        //
        //         video: ''
        // }
    ],
    witch: [
        {
            icon: '1.jpeg',
            name: 'Black Magic',
            description: 'Witch, who has superior crowd control ability, throws a purple magic ball at her enemies with her black magic ability. Stuns enemies and takes magic damage.\n',
            video: 'https://drive.google.com/uc?id=1fHxmRmgCaTE1vuXZ6XlDtkRYT_Oj1DAN'
        },
        {
            icon: '2.jpeg',
            name: 'Concussion',
            description: 'Witch, with her magic wand and superior magic ability, strikes her enemies with an earthquake effect. This hit becomes a nightmare for the Witch\'s surrounding enemies.\n',
            video: 'https://drive.google.com/uc?id=1g0dYVgryFPcRhvib2OA9TP5St4kaB1l4'
        },
        {
            icon: '3.jpeg',
            name: 'Untouchable',
            description: 'Witch creates a magical shield for herself from her magic wand. Thanks to this shield, it both strengthens its own defense and inflicts damage to enemies that approach it.\n',
            video: 'https://drive.google.com/uc?id=19kj9_84oaNZMVjmBwMbD61n_j1gjZWjk'
        },
        {
            icon: '4.jpeg',
            name: 'Downpour',
            description: 'The Witch points her wand at the sky and starts a heavy rain of magic. Enemies showered with magic take high damage and become unable to attack for a while.\n',
            video: 'https://drive.google.com/uc?id=1S-geE1UTIZy-GQlQqL1Ai4ywqDxMAbll'
        },
        // {
        //     icon: '5.jpeg',
        //     name: 'Exploiter',
        //     description: 'Deceitful and ruthless by nature, Witch takes great pleasure in slaughtering her enemies. Each time he defeats an enemy, he adds strength to his own strength.\n',
        //     video: ''
        // }
    ],
}

