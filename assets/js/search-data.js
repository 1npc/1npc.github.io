// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Everything I have published, newest first.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Education, research interests, and publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-from-a-model-that-talks-to-a-character-that-lives",
        
          title: 'From a model that talks to a character that lives <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "Introducing NPCBank, source-grounded game characters with inspectable dialogue cases, and three challenges for building characters that adapt to their world without losing themselves.",
        section: "Posts",
        handler: () => {
          
            window.open("https://npcbank.org/blog-introducing-npcbank.html", "_blank");
          
        },
      },{id: "post-ontourl-a-benchmark-for-ontological-understanding-reasoning-and-learning",
        
          title: "OntoURL: A Benchmark for Ontological Understanding, Reasoning and Learning",
        
        description: "A benchmark of 58,981 questions over 40 ontologies, testing whether language models can do more with symbolic knowledge than recognise it.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/ontourl/";
          
        },
      },{id: "news-eviact-is-now-available",
          title: 'EviACT is now available',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-retrieval-augmented-code-review-at-ijcnn",
          title: 'Retrieval-augmented code review at IJCNN',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "news-knowledgeberg-appears-in-findings-of-acl-2026",
          title: 'KnowledgeBerg appears in Findings of ACL 2026',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_1/";
            },},{id: "news-npcbank-is-live-at-npcbank-org",
          title: 'NPCBank is live at npcbank.org',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_4/";
            },},{id: "news-multidimensional-reasoning-consistency-at-aacl-ijcnlp-2026",
          title: 'Multidimensional reasoning consistency at AACL-IJCNLP 2026',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_6/";
            },},{id: "news-ontourl-accepted-at-the-journal-of-web-semantics",
          title: 'OntoURL accepted at the Journal of Web Semantics',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_5/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%78%69%61%6F_%69%73_%6E%70%63@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/1npc", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/xiao-zhang-0099671b5", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=UNuhtPgAAAAJ", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://npcbank.org", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/XiaoZhang2469", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
