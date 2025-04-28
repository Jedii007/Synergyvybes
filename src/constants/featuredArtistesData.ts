export const featuredArtists = [
  {
    id: 1,
    name: "Jedii007",
    medium: "Music Producer & Artist",
    image: "/IMG_8643.jpeg",
    spotlightImage: "/jediikhodah.jpeg", // Different image for the spotlight card
    featured: true,
    slug: "jedii007", // URL slug for routing
    bio: "Jedii007 is a multi-talented artist and producer from Gambia and Sierra Leone. With a unique blend of Afrobeats, R&B, and electronic music, Jedii007 creates immersive sonic experiences that transcend cultural boundaries. His work is characterized by innovative production techniques and authentic storytelling.",
    showcase: [
      {
        image: "/IMG_8643.jpeg",
        title: "Elevation",
        description: "A visual representation of rising above challenges through music. This piece captures the essence of transcendence and spiritual growth through artistic expression.",
        type: "image"
      },
      {
        image: "/jedii.jpg",
        title: "Sonic Waves",
        description: "Exploring the intersection of sound and visual art, this piece visualizes how music waves can transform emotions and create immersive experiences.",
        type: "image"
      },
      {
        image: "/jediikhodah.jpeg",
        title: "Rhythm & Soul",
        description: "A celebration of the deep connection between rhythm and human emotion. This work examines how musical patterns can resonate with our innermost feelings.",
        type: "image"
      },
      {
        image: "/Synergyvibes.png",
        title: "Urban Beats",
        description: "Inspired by city life and urban culture, this piece blends traditional African rhythms with contemporary sounds to create a unique auditory landscape.",
        type: "image"
      }
    ],
    portfolioLink: "/jedii007",
    socialLinks: {
      instagram: "@jedii.heic",
      twitter: "@jedii_txt",
      youtube: "@jedii.mp4"
    },
    interview: {
      quote: "Music is my way of connecting cultures and sharing stories that might otherwise go untold.",
      questions: [
        {
          q: "What inspired you to start producing music?",
          a: "I grew up surrounded by diverse musical influences from both Gambia and Sierra Leone. The rich tapestry of sounds and rhythms from these cultures naturally drew me to music production as a way to blend traditional elements with contemporary styles."
        },
        {
          q: "How would you describe your creative process?",
          a: "My process is very intuitive. I often start with a melody or a rhythm that captures a specific emotion, then build layers around it. I'm constantly experimenting with sounds from different cultural contexts and pushing the boundaries of what's expected in the genres I work with."
        },
        {
          q: "What message do you hope listeners take from your music?",
          a: "I want my music to serve as a bridge between cultures and experiences. There's a universal language in rhythm and melody that can connect people regardless of background. If my music can help someone feel understood or introduce them to a perspective they hadn't considered, I've accomplished what I set out to do."
        }
      ]
    }
  },
  {
    id: 2,
    name: "Rossi Sbw",
    medium: "Musician & Poet",
    image: "/Instagram Downloader Image.jpg",
    spotlightImage: "/rosii.jpg", // Different image for the spotlight card
    featured: false,
    slug: "rossi-sbw", // URL slug for routing
    bio: "Victor Chima Okoroafor, known professionally as Rossi Sbw, is a Nigerian artist who seamlessly blends his background in biomedicine with his passion for poetry, spoken word, and music production. Born and raised in Lagos, Nigeria, and hailing from Abia State, Rossi creates art that explores the duality of human experience, finding beauty in life's struggles.",
    showcase: [
      {
        image: "/rosii.jpg",
        title: "Sweet Bitter",
        description: "A poetic exploration of life's contradictions, where joy and pain coexist. This track blends spoken word with melodic undertones to create an emotional journey.",
        type: "audio",
        audioUrl: "/audio/sweet-bitter-preview.mp3"
      },
      {
        image: "/Instagram Downloader Image.jpg",
        title: "Human Experience",
        description: "An introspective piece examining what it means to be human in today's world. The track weaves scientific concepts with emotional narratives.",
        type: "audio",
        audioUrl: "/audio/human-experience-preview.mp3"
      },
      {
        image: "/rosii.jpg",
        title: "Sonic Pleasure",
        description: "A celebration of sound and rhythm that invites listeners to experience music on a deeper level. Features innovative production techniques and layered vocals.",
        type: "audio",
        audioUrl: "/audio/sonic-pleasure-preview.mp3"
      },
      {
        image: "/Instagram Downloader Image.jpg",
        title: "Poetic Rhythms",
        description: "Where poetry meets music in perfect harmony. This piece showcases Rossi's unique ability to blend literary artistry with contemporary sound design.",
        type: "audio",
        audioUrl: "/audio/poetic-rhythms-preview.mp3"
      }
    ],
    portfolioLink: "/rossi",
    socialLinks: {
      instagram: "@r0ssi.sbw",
      tiktok: "@sabboyrossi",
      youtube: "@rossi_sbw"
    },
    interview: {
      quote: "I see every day as an opportunity to fail and try again, searching not for favor but for the wisdom that comes from personal growth.",
      questions: [
        {
          q: "How does your background in biomedicine influence your artistic work?",
          a: "My scientific studies have given me a unique perspective on the human condition. There's a precision and methodology to science that I bring to my creative process, while my art allows me to explore the emotional and philosophical aspects of existence that science alone cannot capture."
        },
        {
          q: "What themes do you find yourself returning to in your work?",
          a: "I'm constantly exploring the duality of human experience—the sweet and bitter aspects of life. My work often examines personal growth through trials, the awareness of self and vanity, and finding meaning in everyday struggles. These themes reflect my journey of balancing scientific pursuits with artistic expression."
        },
        {
          q: "How has your Nigerian heritage shaped your artistic voice?",
          a: "Growing up in Lagos and being from Abia State has deeply influenced my storytelling and sonic palette. Nigerian culture is rich with oral traditions, diverse musical expressions, and profound philosophical perspectives. I draw from these cultural roots while adding my own contemporary interpretations, creating a bridge between traditional wisdom and modern experiences."
        }
      ]
    }
  },
  {
    id: 3,
    name: "Maya Johnson",
    medium: "Visual Artist",
    image: "/jedii.jpg",
    spotlightImage: "/Synergyvibes.png", // Different image for the spotlight card
    featured: false,
    slug: "maya-johnson", // URL slug for routing
    bio: "Maya Johnson is a contemporary visual artist whose work explores themes of identity, memory, and urban landscapes. Through mixed media and digital techniques, she creates immersive visual narratives that challenge conventional perspectives.",
    showcase: [
      { image: "/jedii.jpg", title: "Urban Fragments" },
      { image: "/jediikhodah.jpeg", title: "Digital Dreams" },
      { image: "/IMG_8643.jpeg", title: "Memory Lanes" },
      { image: "/Synergyvibes.png", title: "Identity Pixels" }
    ],
    portfolioLink: "https://example.com/maya",
    socialLinks: {
      instagram: "@maya.creates",
      twitter: "@maya_johnson_art"
    }
  },
  {
    id: 4,
    name: "Jamal Wright",
    medium: "Sculptor & Installation Artist",
    image: "/rosii.jpg",
    spotlightImage: "/Instagram Downloader Image.jpg", // Different image for the spotlight card
    featured: false,
    slug: "jamal-wright", // URL slug for routing
    bio: "Jamal Wright transforms everyday materials into thought-provoking sculptures and installations that examine social structures and environmental concerns. His work has been featured in galleries across the country.",
    showcase: [
      { image: "/rosii.jpg", title: "Material Memory" },
      { image: "/Instagram Downloader Image.jpg", title: "Urban Artifacts" },
      { image: "/rosii.jpg", title: "Structural Dialogues" },
      { image: "/Instagram Downloader Image.jpg", title: "Reclaimed Spaces" }
    ],
    portfolioLink: "https://example.com/jamal",
    socialLinks: {
      instagram: "@jamal.wright.art",
      twitter: "@jamalwrightart"
    }
  }
];
