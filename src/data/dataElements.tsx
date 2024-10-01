import {TbBrandDiscord, TbBrandTelegram} from "react-icons/tb";
import {AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube} from "react-icons/ai";
import {ReactNode} from "react";
import {BOSS, BRN, EVENT} from "@/helpers/strings";

export const socialMap: any = {
    'telegram':  <TbBrandTelegram size={36} />,
    'youtube':  <AiOutlineYoutube size={36} />,
    'instagram':  <AiOutlineInstagram size={36} />,
    'discord':  <TbBrandDiscord size={36} />,
    'twitter':  <AiOutlineTwitter size={36} />,
}



type Arena = {
    name: string;
    description: string|ReactNode;
    images: string[];
}

export const bossArenas: Arena[] = [
    {
        name: "Split",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to Split Arena! This arena is located in the cellar of Split, one of our game&apos;s unique monsters.
                    Your mission is to locate Split and engage in a thrilling battle within the remarkable Split Arena.
                    This arena stands out with its exquisite golden details and unique structure. However,
                    it won&apos;t be as easy as you might expect.
                </p>
                <p>
                    Split Arena presents its participants with extraordinary opportunities. It features a spacious square
                    at its center, from which four roads branch out, leading to doors. Additionally, there is a spacecraft
                    available to transport you between the doors and the square. The first person to locate and defeat
                    Split, utilizing all available means, will emerge as the victorious champion of the arena.
                </p>
                <p>
                    Split spawns every 30 minutes, so keep a close eye out for its appearance. The player who successfully
                    vanquishes Split will have a 25% chance of earning +10 points for the Activity Token Box and achieving
                    a Unique Rank. Join now and claim your spot in this exciting and competitive event. The battle is about to commence!
                </p>
            </div>
        ),
        images: ['/Boss/Split/1.png','/Boss/Split/2.png']
    },
    {
        name: "Flytrap",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to the Flytrap Arena! This arena is the habitat of a terrifying and unique monster called
                    the Flytrap. Prepare yourself for challenging moments as you endeavor to catch and defeat this
                    formidable creature. The objective of this arena, which resembles a wild forest, is to vanquish the
                    Flytrap—a plant-like being that excels in camouflage—in its own territory. Slaying the Flytrap
                    won&apos;t be an easy feat!
                </p>
                <p>
                    To emerge victorious in this arena and claim valuable prizes, it is crucial to strategize your
                    battles beforehand. The player who successfully kills the Flytrap, which spawns every 30 minutes,
                    will earn +10 points in the Activity Token Box and have a 25% chance to attain the esteemed Unique
                    Rank as a reward.
                </p>
                <p>
                    Join us now at the Flytrap Arena and immerse yourself in this competitive experience. The battle is about to commence!
                </p>
            </div>
        ),
        images: ['/Boss/Flytrap/1.png','/Boss/Flytrap/2.png','/Boss/Flytrap/3.png']
    },
    {
        name: "Rockfire",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to Rockfire Arena! Here, you will encounter a one-of-a-kind monster with rocket arms and the
                    ability to breathe fire from both its arms and torso. Your mission in Rocfire Arena, an extraordinary
                    activity zone filled with intricate structures and maze-like barriers, is to locate and defeat the
                    formidable creature known as Rockfire.
                </p>
                <p>
                    Rockfire, reborn every 30 minutes, can appear anywhere within this labyrinthine arena. Capturing and
                    vanquishing this elusive adversary will prove to be a challenge of epic proportions.
                </p>
                <p>
                    Every player who successfully completes this daring quest and emerges victorious over Rockfire will
                    earn +10 points in their Activity Token Box and have a 25% chance to receive a Unique Rank as a reward.
                </p>
                <p>
                    To conquer this distinctive arena, where strategy and luck play equally important roles, it is time
                    to sharpen your swords. The battle commences!
                </p>
            </div>
        ),
        images: ['/Boss/Rockfire/1.png','/Boss/Rockfire/2.png']
    },
    {
        name: "Robocrap",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to Robocrab Arena! This arena serves as the habitat for Robocrab, a formidable monster known
                    for its lethal robotic claws and cunning surprise attacks. With its expertise in delivering unexpected
                    blows to its foes, Robocrab has chosen a relatively dimly lit environment as its dwelling. While this
                    grants Robocrab an advantage, it poses a challenge for the players. Capturing this elusive creature
                    won&apos;t be as simple as it may seem.
                </p>
                <p>
                    Every player who successfully catches and defeats Robocrab, who respawns every 30 minutes, will be
                    rewarded with +10 points in the Activity Token Box and have a 25% chance of receiving a Unique Rank
                    as an additional prize. If you desire to claim these valuable rewards and face the thrilling trials
                    of this event space, prepare your inventory and brace yourself for battle. The war is about to commence!
                </p>
            </div>
        ),
        images: ['/Boss/Robocrap/1.png','/Boss/Robocrap/2.png']
    },
    {
        name: "Wild",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to the Wild Arena! Formerly a shrine where Metaverse guardians fought for rewards, it
                    was later discovered that Wild&apos;s true goal was to control the meta universes by killing the guards
                    and taking over their minds. Despite being aware of these dangers, the Guardians could not stop
                    fighting in the arena due to the precious rewards that were at stake. The arena was filled with
                    hidden traps and obstacles, and required both technical and tactical skills from the guards. The
                    Wild was a cunning creature that waited for its victims and attacked. The battles in the arena were
                    intense and brutal.
                </p>
                <p>
                    The player who caused the most damage and killed the Wild would receive the
                    most valuable treasures. The Guardians knew that the fate of their universe was at stake, and that
                    they had to engage in a fierce battle in the Wild Arena. They had to give their best and protect
                    their universe from the malicious plans of artificial intelligence.
                    Protect your universe from the malevolent plans of the artificial intelligence and bring your courage
                    to defeat Wild!
                </p>
            </div>
        ),
        images: ['/Boss/Wild/1.png','/Boss/Wild/2.png']
    },
    {
        name: "Reefest",
        description: (
                <div className={'flex flex-col gap-5'}>
                    <p>
                        Welcome to Reefest Arena! This arena is the habitat and birthplace of Reefest, a four-headed sea creature.
                        The goal in this arena, where small Reefests and one giant Reefest are kept in glass jars, is to defeat
                        the boss and earn unique rewards. With its dark and technological structure, this arena has a more distinctive
                        look than other arenas. Capturing and killing Reefest in this unique arena will be more challenging than you think.
                    </p>
                    <p>
                        The giant boss will be reborn in a different area every 30 minutes. If you manage to defeat Reefest and win
                        this challenging event, you will receive a 25% chance of an Activity Token Box and +10 points to your Unique
                        Rank as a reward. Join us in this fun and challenging event, and take your place now. The battle begins!
                    </p>

                </div>
        ),
        images: ['/Boss/Reefest/1.png','/Boss/Reefest/2.png','/Boss/Reefest/3.png']
    }
]

export const eventArenas: Arena[] = [
    {
        name: "Space station",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to Space Station, where you and your team must work together to strategically place a
                    satellite within your region before time runs out. Challenges and obstacles will test your
                    determination, coordination, and strategic skills. Earn activity tokens for every kill in the arena, The
                    only thing you need to pay attention to when earning activity tokens is that you can earn activity
                    token rewards from the same character no more than twice. The team occupying the satellite
                    region at the end of the game wins, and the winning team earns activity tokens and points for the
                    monthly activity rank. Join the arena and fight to bring the satellite to your territory, and you could
                    emerge as the winner and earn rewards to help you survive in this new world.
                </p>
            </div>
        ),
        images: Array(10).fill(0).map((_, index)=> (`/Event/Spacestation/${index+1}.png`))
    },
    {
        name: "War in hell",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to the War In Hell world. It was a place of chaos and destruction, where the strong
                    preyed on the weak. Demon, once feared by all, had been imprisoned by the guardians of the
                    Metaverse for centuries but was now free and seeking revenge. His goal was to turn the
                    guardians into demons and blur the line between protectors and demons.
                </p>
                <p>
                    The protectors knew they had to work together to defeat Demon, but it was difficult to distinguish friend from foe. After
                    weakening and subduing Demon, they discovered that hundreds of demonic protectors had come
                    to avenge their master&apos;s death, and a new chapter began in the war. Join the fight and choose
                    your side in this mysterious world
                </p>
            </div>
        ),
        images:  Array(3).fill(0).map((_, index)=> (`/Event/Warinhell/${index+1}.png`))
    },
    {
        name: "Clan Battle",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to The Clan Battle! This event is a crucial part of the game that players should not miss.
                    Before the event begins, register with a clan and ensure your clan leader has registered for the
                    event. When the event starts, you will be matched with a random clan and transported to the
                    arena for an organized pvp battle. The objective is to defeat as many opponents as possible, with
                    each kill earning the player&amp;s Clan +1 points.
                </p>
                <p>
                    The event lasts 20 minutes, giving players ample
                    time to rack up points. The Clan with the most points at the end of the event wins. Don&amp;t miss the
                    unique format and generous rewards of the Clan Battle event. Sharpen your swords and prepare
                    for battle, because it&amp;s coming soon!
                </p>
            </div>
        ),
        images:  Array(3).fill(0).map((_, index)=> (`/Event/Clanbattle/${index+1}.png`))
    },
    {
        name: "Eternal Warrior",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to the world of the Eternal Warrior, where survival is the ultimate goal in a dystopian
                    metaverse society. The arena is the only place where you can prove yourself as the strongest and
                    most cunning warrior. But beware, the game is deadly and the only way to win is to be the last one
                    standing. The rules of the game are simple, but the risks are high. Every move they make is a
                    gamble, and they must be strategic in every decision they make. A wrong move could mean your
                    death, and in this world, death is not just a possibility, it&amp;s a certainty. Are you ready to join the
                    fight? Join us as we witness the battle nature!
                </p>
            </div>
        ),
        images:  Array(3).fill(0).map((_, index)=> (`/Event/EternalWarrior/${index+1}.png`))
    },
    {
        name: "Rise And Slay",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to Rise and Slay Arena! The sun was beginning to set over the bloody sands,
                    casting a warm glow upon the arena. In this arena, every warrior is born, fights to the
                    death, dies, and is reborn from their ashes. This microcosm of life teaches valuable
                    lessons to warriors through intense battles and challenges, not just rewards. Warriors must
                    eliminate as many opponents as possible to earn their rewards. When you eliminate a
                    character, you receive an activity token, and you can earn a maximum of two activity
                    tokens from each character. The top three players who eliminate the most characters
                    within the specified time limit are rewarded according to their kill count ranking. Whether
                    you&amp;re an experienced master or a novice, Rise and Slay will push your limits! Join the
                    arena and show off your skills as a real warrior!
                </p>
            </div>
        ),
        images:  Array(4).fill(0).map((_, index)=> (`/Event/RiseAndSlay/${index+1}.png`))
    },
    {
        name: "Polygon",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    Welcome to the Polygon Arena, developed with artificial intelligence, where you can test your
                    characters in easy, medium, and hard modes! In this arena, you can put yourself to the test and enhance
                    your combat skills by selecting the characters you desire. Remember, the characters in the BRNVerse
                    are designed for battle, so you must devise a strategy to emerge victorious against them! This arena
                    has been created to hone your strategic prowess.
                </p>
            </div>
        ),
        images:  Array(3).fill(0).map((_, index)=> (`/Event/Polygon/${index+1}.png`))
    },
]

export const BRNArenas: Arena[] = [
    {
        name: "",
        description: (
            <div className={'flex flex-col gap-5'}>
                <p>
                    The world had turned into a utopian society in which people had access to advanced technology
                    and unlimited opportunities. The most valuable resource is the BRN Token, which players can earn
                    by battling other players in arenas. These tokens serve as currency and can be used to improve
                    skills, purchase equipment, and even buy territories. The battle for BRN Tokens is intense and only
                    the strongest players can survive. The game has its own economy and has become a way of life
                    for many people. Join the struggle and become a part of this exciting story. The world is waiting for
                    you, but be careful; the cost of success is higher than you think!
                </p>
            </div>
        ),
        images: ['/BRN/1.png','/BRN/2.png','/BRN/3.png','/BRN/4.png','/BRN/5.png']
    },
]

export type ArenaType = typeof BRN|typeof EVENT|typeof BOSS;

type Arenas = {
    [key in ArenaType]: Arena[]
}
export const arenas: Arenas = {
    boss: bossArenas,
    brn: BRNArenas,
    event: eventArenas
}
