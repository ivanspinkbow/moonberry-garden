const config = {
  name: "Ren",
  music: "", // "./assets/garden.ogg"
  intro: [
    "A very important mission awaits...",
    "Your cake is currently suffering from a severe lack of strawberries.",
    "Explore the garden, find some berries, and decorate your cake whenever you like. The birthday fox demands cake!"
  ],
  birthday: [
    "Happy birthday, Ren ♡",
    "I honestly had no idea what to get you, so I decided to make you something instead.",
    "It's probably a bit silly but I definitely had fun making it",
    "Congrats, you've now collected strawberries and answered questions about your own questionable decisions",
    "I hope you have the best birthday ever. Now go eat some actual cake instead of staring at pixels 💜"
  ],
  achievements: {
    grove: "The Great Strawberry Detective",
    hunt: "Professional Strawberry Thief", catcher: "Certified Loot Goblin",
    quiz: "Fortnite Memory Archivist", cake: "Cake Decorating Expert", finale: "Birthday Fox", all: "Secret Strawberry Collector"
  },

  quizClips: [
    {
      video: "assets/videos/clip1.mp4", pauseAt: 7.0,
      question: "What did you say to me when we first met?",
      choices: [
        "You look like someone who'd steal my loot",
        "You know 2 beta fishes aren't allowed together in a fish tank",
        "Come on just slap me...",
        "Hi"
      ],
      answer: 1,
      correctFeedback: "You really had to go and remind me that.",
      incorrectFeedback: "Girl how do you not remember your own opening line </3"
    },
    {
      video: "assets/videos/clip2.mp4", pauseAt: 9.5,
      question: "What was your next very reasonable request?",
      choices: [
        "Make it look like an accident.", 
        "Make it cinematic.", 
        "Make it look painful.", 
        "Make it look like you meant it."
      ],
      answer: 2,
      correctFeedback: "WHY DO YOU REMEMBER SAYING THAT??? 😭",
      incorrectFeedback: "Somehow the real answer is worse."
    },
    {
      video: "assets/videos/clip3.mp4", pauseAt: 4.5,
      question: "Why did you make me get the sprite?",
      choices: [
        "Because i needed it.", 
        "You wanted to help me master it.", 
        "Why not?", 
        "To make them kiss."
      ],
      answer: 3,
      correctFeedback: "All that just for them to kiss.",
      incorrectFeedback: "SIGH"
    }
  ],

  memories: [
    {
      title: "Photo frames", icon: "▣",
      note: "Just some silly clips of you cuz I remember you saying you wanted to see more of yourself.",
      videos: [
        "assets/videos/clip4.mp4",
        "assets/videos/clip5.mp4",
        "assets/videos/clip6.mp4",
        "assets/videos/clip7.mp4",
        "assets/videos/clip8.mp4"
      ]
    },
    { title: "Game controller", icon: "✚", note: "Nothing. I just wanted to say touch grass.", video: "" },
    { title: "Gift box", icon: "▥", note: "Official permission to have an extremely good birthday." },
    { title: "Bookshelf", icon: "▤", note: "Your favorite library has tags and a kudos button. Mostly angst, apparently.." },
    { title: "Computer screen", icon: "▧", decorative: true, note: "A spot for a clip worth watching one more time.", video: "" },
    {
      title: "Fox plushie", icon: "fox",
      heading: "A MESSAGE FROM THE ARCHIVES — SEPT 7, 2026",
      note: [
        '"I really like getting compared with a fox"',
        '"Cuz I would be as loud as they are"',
        "And that's why you're a fox in this game."
      ]
    }
  ]
};
