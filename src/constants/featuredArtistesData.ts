// Define types for showcase items
type ShowcaseItem = {
  image: string;
  title: string;
  description: string;
  type: "image" | "audio";
  audioUrl?: string;
};

type ExhibitionEvent = {
  title: string;
  location: string;
  description?: string;
};

type ExhibitionYear = {
  year: string;
  events: ExhibitionEvent[];
};

type Artist = {
  id: number;
  name: string;
  medium: string;
  image: string;
  wideImage: string;
  spotlightImage: string;
  featured: boolean;
  slug: string;
  bio: string;
  showcase: ShowcaseItem[];
  portfolioLink: string;
  socialLinks: {
    instagram: string;
    twitter?: string;
    facebook?: string;
  };
  interview?: {
    quote: string;
    questions: {
      q: string;
      a: string;
    }[];
  };
  exhibitions: ExhibitionYear[];
};

export const featuredArtists: Artist[] = [
  {
    id: 1,
    name: "Cissh",
    medium: "Visual Artist",
    image: "/spotlight/Main.jpeg",
    wideImage: "/spotlight/Exhibitions and Art Fairs.jpg",
    spotlightImage: "/spotlight/Synergy Group 258.jpg",
    featured: true,
    slug: "cissh",
    bio: "My artistic practice is a reflection of my experiences, a visual diary of my interactions with the world. Through animation, sculpture, and painting, I capture and preserve fleeting moments, transforming them into a narrative that is both personal and evocative. Each piece serves as a fragment of my memory, a thought frozen in time. My journey as an artist began under the influence of my brother, who was establishing his own niche in the Zimbabwean art scene. Inspired by his artistic endeavors, I started exploring painting and found solace in the realistic depiction of subjects. Over time, I gravitated towards abstract line art, where I could create my own unique world. Drawing inspiration from the renowned Zimbabwean stone carvings of faces, I incorporated these elements into my work, telling stories that intertwined my artistic heritage with contemporary themes. As a multimedia artist, I embrace a variety of mediums, including painting, sculpting, animation, and social advocacy. My work is driven by a desire to engage with the world on a deeper level, to spark conversations, and to inspire change. Through my art, I strive to create meaningful experiences that resonate with audiences and leave a lasting impact.",
    showcase: [
      {
        image: "/spotlight/Family of Three.jpg",
        title: "Family Series",
        description: "An intimate exploration of family dynamics through visual art.",
        type: "image"
      },
      {
        image: "/spotlight/Cowboy Blues.jpg",
        title: "Cowboy Blues",
        description: "A unique blend of traditional and contemporary themes in this striking piece.",
        type: "image"
      },
      // {
      //   image: "/spotlight/Fashion Sculptures.jpg",
      //   title: "Fashion Sculptures",
      //   description: "Innovative sculptures that bridge the gap between fashion and art.",
      //   type: "image"
      // },
      {
        image: "/spotlight/Growing Blocks.jpg",
        title: "Growing Blocks",
        description: "An exploration of growth and transformation through geometric forms.",
        type: "image"
      },
      {
        image: "/spotlight/Kaapstaap Portrait.jpg",
        title: "Kaapstaap Portrait",
        description: "A striking portrait capturing the essence of character and identity.",
        type: "image"
      },
      {
        image: "/spotlight/Reinventing Myself.jpg",
        title: "Re-inventing Myself",
        description: "A personal journey of transformation and self-discovery through art.",
        type: "image"
      },
      {
        image: "/spotlight/Self Centered.jpg",
        title: "Self Centered",
        description: "An introspective piece exploring themes of self-identity and perception.",
        type: "image"
      }
    ],
    portfolioLink: "https://www.instagram.com/reel/DG75paSIeMH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    socialLinks: {
      instagram: "iamcissh"
    },
    interview: {
      quote: "‘I damn near need this more than I need to breathe’",
      questions: [
        {
          q: "What inspires your creative process?",
          a: "I draw inspiration from my Zimbabwean heritage, particularly the stone carvings, and blend it with contemporary themes. My brother's influence in the art scene also played a significant role in shaping my artistic journey."
        },
        {
          q: "How do you approach your creative process?",
          a: "I start with a concept or emotion I want to explore, then experiment with different mediums - from painting to sculpture. Each piece evolves organically as I work, allowing the materials and my intuition to guide the final outcome."
        },
        {
          q: "What do you hope viewers take away from your work?",
          a: "I hope my art sparks conversations about identity, heritage, and personal growth. I want viewers to see themselves reflected in my work while also gaining new perspectives on cultural narratives and human experiences."
        }
      ]
    },
    exhibitions: [
      {
        year: "2024",
        events: [
          {
            title: "Diverse-It Festival (Installation)",
            location: "",
            description: ""
          },
          {
            title: "Building Bridges with Eisa Baddour Tour Exhibition EU",
            location: "",
            description: ""
          },
          {
            title: "Diaspora Vote EU Belgium Exhibition",
            location: "",
            description: ""
          },
          {
            title: "Refugee Rights Pride Week Exhibition EU",
            location: "",
            description: ""
          },
          {
            title: "Inevitability Of Collaboration with Raime",
            location: "",
            description: ""
          },
          {
            title: "Art Therapy Fair",
            location: "",
            description: ""
          }
        ]
      },
      {
        year: "2023",
        events: [
          {
            title: "Open Art Cy Live Painting and Exhibition",
            location: "",
            description: ""
          },
          {
            title: "Poets On Island Event and Exhibition",
            location: "",
            description: ""
          },
          {
            title: "Seeing Faces Solo Exhibition",
            location: "",
            description: ""
          }
        ]
      },
      {
        year: "2022",
        events: [
          {
            title: "BRANDON BRANDON BRANDON 3D Solo Exhibition 3",
            location: "",
            description: ""
          }
        ]
      },
      {
        year: "2021",
        events: [
          {
            title: "BRANDON BRANDON BRANDON 3D Solo Exhibition 2",
            location: "",
            description: ""
          }
        ]
      },
      {
        year: "2020",
        events: [
          {
            title: "BRANDON BRANDON BRANDON 3D Solo Exhibition 1",
            location: "",
            description: ""
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Rossi Sbw",
    medium: "Musician & Poet",
    image: "/Instagram Downloader Image.jpg",
    wideImage: "/rosii.jpg",
    spotlightImage: "/rosii.jpg",
    featured: false,
    slug: "rossi-sbw",
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
      twitter: "@rossi_sbw",
      facebook: "Rossi Sbw"
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
    },
    exhibitions: [
      {
        year: "2023",
        events: [
          {
            title: "Digital Art Showcase",
            location: "Online Gallery",
            description: "Featured in the annual digital art exhibition."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Maya Johnson",
    medium: "Visual Artist",
    image: "/jedii.jpg",
    wideImage: "/jedii.jpg",
    spotlightImage: "/Synergyvibes.png",
    featured: false,
    slug: "maya-johnson",
    bio: "Maya Johnson is a contemporary visual artist whose work explores themes of identity, memory, and urban landscapes. Through mixed media and digital techniques, she creates immersive visual narratives that challenge conventional perspectives.",
    showcase: [
      {
        image: "/jedii.jpg",
        title: "Urban Fragments",
        description: "A visual exploration of urban landscapes and their impact on human perception.",
        type: "image"
      },
      {
        image: "/jediikhodah.jpeg",
        title: "Digital Dreams",
        description: "An immersive digital artwork that blends reality and imagination in the digital age.",
        type: "image"
      },
      {
        image: "/IMG_8643.jpeg",
        title: "Memory Lanes",
        description: "A reflection on how memories shape our identity and perception of the world around us.",
        type: "image"
      },
      {
        image: "/Synergyvibes.png",
        title: "Identity Pixels",
        description: "An examination of how digital identities are constructed and perceived in modern society.",
        type: "image"
      }
    ],
    portfolioLink: "https://example.com/maya",
    socialLinks: {
      instagram: "@maya.creates",
      twitter: "@maya_johnson_art",
      facebook: "Maya Johnson"
    },
    exhibitions: [
      {
        year: "2023",
        events: [
          {
            title: "Mixed Media Exhibition",
            location: "Local Gallery",
            description: "Showcasing new works in mixed media."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Jamal Wright",
    medium: "Sculptor & Installation Artist",
    image: "/rosii.jpg",
    wideImage: "/rosii.jpg",
    spotlightImage: "/Instagram Downloader Image.jpg",
    featured: false,
    slug: "jamal-wright",
    bio: "Jamal Wright transforms everyday materials into thought-provoking sculptures and installations that examine social structures and environmental concerns. His work has been featured in galleries across the country.",
    showcase: [
      {
        image: "/rosii.jpg",
        title: "Material Memory",
        description: "An exploration of how materials can embody and preserve memories of people and places.",
        type: "image"
      },
      {
        image: "/Instagram Downloader Image.jpg",
        title: "Urban Artifacts",
        description: "A collection of sculptures created from discarded urban materials, giving new life to forgotten objects.",
        type: "image"
      },
      {
        image: "/rosii.jpg",
        title: "Structural Dialogues",
        description: "An installation that examines the relationship between architectural structures and human interaction.",
        type: "image"
      },
      {
        image: "/Instagram Downloader Image.jpg",
        title: "Reclaimed Spaces",
        description: "A series exploring how abandoned spaces can be transformed into meaningful artistic environments.",
        type: "image"
      }
    ],
    portfolioLink: "https://example.com/jamal",
    socialLinks: {
      instagram: "@jamal.wright.art",
      twitter: "@jamalwrightart",
      facebook: "Jamal Wright"
    },
    exhibitions: [
      {
        year: "2023",
        events: [
          {
            title: "Mixed Media Exhibition",
            location: "Local Gallery",
            description: "Showcasing new works in mixed media."
          }
        ]
      }
    ]
  }
];

