// Musicas

const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  const musicas = [
    "In the end - Linkin Park",
    "Papercut - Linkin park",
    "Somewhere i belong - Linkin Park",
    "Numb - Linkin park",
    "Bring me to life - Evanescence",
    "Feel Good inc - Golliraz",
    "Come as you are - Nirvana",
    "Song 2 - Blur",
    "Smells like teen spirit-Nirvana",
    "When I come around - Green day",
    "Skrillex - Hero",
    "Give It away - Red Hot chilli pepers",
    "By the way - Red hot chilli pepers",
    "Black Hole Sun - Soundgarden",
    "Glycerine - Bush",
    "Californication - Red hot chilli pepers",
    "Breaking The Habit - Linkin Park",
    "She couldnt - Linkin Park",
    "Boulevard of broken Dreams - Green Day",
    "Wake me up when september ends - Green day",
    "The Kids arent Alright - The offspring",
    "Self Esteem - The offspring",
    "Heart Shaped box - Nirvana",
    "Gorillaz - Dirty Harry",
    "Gorillaz - Kids with guns",
    "Gorillaz - Clint Eastwood",
    "All Star - Smash Mouth",
    "5/4 - Gorillaz",
    "American Idiot - Green day",
    "Should I stay or Should I go - The clash",
    "London Calling - The Clash",
    "Pain - Three Days Grace",
    "I'm A Beliver - Smash Mouth",
    "You broke me first - Tate McRae", 
    "Oh The Larceny - Another level",
    "PUBLIC - Make you mine",
    "Prismo - Solo",
    "The Score - Miracle",
    "Zayde Wolf - Born Ready",
    "The Score - Born for this",
    "Unlike Pluto - Now I dont Care",
    "POUYA x GHOSTEMANE - 1000 Rounds",
    "The Score - Stronger",
    "One Direction - Drag me down",
    "Blackbear - idfc",
    "LSD - Genius ft.Sia, Diplo, Labrinth",
    "Maroon 5 - Girl Like You",
    "The unlikely Candidates - Oh my dear lord",
    "Powfu - Death bed",
    "Gym Class Heroes - Stereo Hearths",
    "Russ - Psycho",
    "The Score - Unstoppable",
    "Magic! - Rude",
    "AJR - Burn the house down",
    "Sickick - Lost My Way",
    "Why Don't you get a job? - The Offspring",
    "Otherside - Red Hot chilli pepers",
    "Such a Whore - JVLA",
    "ALT J - Breezeblocks",
    "Sub urban - freak [slowed down]",
    "Fall Out Boy-Centuries (slowed)",
    "Billie Eilish - bad guy (PatrickReza Remix)",
    "BRENNAN SAVAGE – Nowhere to Run (Slowed)",
    "Options - Hippie Sabotage",
    "lewis blissett - sick thoughts (slowed reverb)",
    "TIAGZ - Muffins In The Freezer (slowed)",
    "Weathers - Happy Pills",
    "Stephen - Crossfire (Slowed Remix)",
    "Aha - take on me",
    "Yes- the roundabout",
    'Back in Black AC/DC'
  ];

  const embed = new Discord.MessageEmbed()
    .setColor("PURPLE")
    .setTitle("lzm - Músicas aleatórias")
    .setDescription(musicas[Math.floor(Math.random() * musicas.length)])
  .setFooter('Só as melhores, toca DJ!')
  message.channel.send(embed);
  message.delete();
};
