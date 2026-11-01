/**
 * SAMPLE CONTENT. Nothing here describes real client work.
 *
 * To add your own project: duplicate an entry, give it a unique `slug`, then fill in the text.
 * To use your own images: drop files in `public/images/` and set
 *   cover: '/images/my-cover.jpg'
 *   gallery: ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg']
 * Leave them out and a generated placeholder is shown instead.
 */

export type CategoryId = 'graphic' | 'animation' | '3d' | 'film' | 'uiux'

export interface ProcessStep {
  title: string
  text: string
}

export interface Category {
  id: CategoryId
  label: string
  blurb: string
  /** Default tools shown in case studies for this category. Edit per project with `tools`. */
  tools: string[]
  steps: ProcessStep[]
}

export const categories: Category[] = [
  {
    id: 'graphic',
    label: 'Graphic Design',
    blurb: 'Identities, posters and type systems.',
    tools: [],
    steps: [
      { title: 'Research and moodboard', text: 'Gather references, define the tone and name the problem.' },
      { title: 'Sketch and explore', text: 'Rough directions on paper before anything goes digital.' },
      { title: 'Type, colour and form', text: 'Build the system: letterforms, palette and layout.' },
      { title: 'Apply and refine', text: 'Test it across formats and polish the details.' },
    ],
  },
  {
    id: 'animation',
    label: 'Animation',
    blurb: '2D animation and motion graphics.',
    tools: ['After Effects'],
    steps: [
      { title: 'Concept and storyboard', text: 'Frame the idea and plan the beats.' },
      { title: 'Style frames', text: 'Lock the look before anything moves.' },
      { title: 'Animate', text: 'Timing, easing and character in every movement.' },
      { title: 'Sound and finish', text: 'Pace, polish and export.' },
    ],
  },
  {
    id: '3d',
    label: '3D / CGI',
    blurb: 'Modelling, lighting and rendering in Blender.',
    tools: ['Blender'],
    steps: [
      { title: 'Reference and blockout', text: 'Rough forms and composition in the viewport.' },
      { title: 'Model and texture', text: 'Shape the details and give surfaces a story.' },
      { title: 'Light and camera', text: 'Mood, depth and a point of view.' },
      { title: 'Render and composite', text: 'Final frames, then finishing touches.' },
    ],
  },
  {
    id: 'film',
    label: 'Film',
    blurb: 'Filmmaking, editing and storytelling.',
    tools: ['After Effects'],
    steps: [
      { title: 'Idea and script', text: 'Find the story worth telling.' },
      { title: 'Plan and shoot', text: 'Shot list, locations and capture.' },
      { title: 'Edit', text: 'Shape rhythm, performance and pace.' },
      { title: 'Grade and finish', text: 'Colour, sound and delivery.' },
    ],
  },
  {
    id: 'uiux',
    label: 'UI/UX',
    blurb: 'Interfaces, flows and digital products.',
    tools: [],
    steps: [
      { title: 'Understand the problem', text: 'Who it is for and what they need to do.' },
      { title: 'Flows and wireframes', text: 'Structure before style.' },
      { title: 'Visual interface', text: 'Type, colour, components and detail.' },
      { title: 'Prototype and test', text: 'Make it clickable, learn, improve.' },
    ],
  },
]

export const categoryById = categories.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CategoryId, Category>,
)

export interface Project {
  slug: string
  title: string
  category: CategoryId
  summary: string
  /** Changes the colours and composition of the generated placeholder art. */
  seed: number
  ratio: 'portrait' | 'landscape' | 'square'
  cover?: string
  gallery?: string[]
  year: string
  role: string
  tools?: string[]
  overview: string
  challenge: string
  outcome: string
}

/** Set to false to hide the little "Sample" tags once you have swapped in real work. */
export const showSampleTags = true

export const projects: Project[] = [
  {
    slug: 'brand-identity',
    title: 'Brand identity concept',
    category: 'graphic',
    summary: 'A placeholder for a branding project: logo, type system and applications.',
    seed: 0,
    ratio: 'portrait',
    year: '',
    role: '',
    overview:
      'Describe the project in two or three sentences: who it was for, what they needed and what you set out to make.',
    challenge:
      'What made this one tricky? A tight brief, an unusual audience, a constraint you had to design around.',
    outcome:
      'What did you deliver, and what changed because of it? Keep it honest and specific to your own work.',
  },
  {
    slug: 'poster-series',
    title: 'Typographic poster series',
    category: 'graphic',
    summary: 'A placeholder for an experimental type project.',
    seed: 3,
    ratio: 'square',
    year: '',
    role: '',
    overview: 'Introduce the series: the theme, the format and the rules you gave yourself.',
    challenge: 'Where did the letters push back? Describe the problem you were solving with type.',
    outcome: 'Show how the series came together and where it could go next.',
  },
  {
    slug: 'motion-piece',
    title: 'Motion graphics piece',
    category: 'animation',
    summary: 'A placeholder for a kinetic type or motion design project.',
    seed: 1,
    ratio: 'landscape',
    year: '',
    role: '',
    overview: 'Describe the idea behind the piece and what it needed to communicate.',
    challenge: 'Explain the timing, transitions or technical puzzles you worked through.',
    outcome: 'Say where it was used or shown, if it was, and what you learned.',
  },
  {
    slug: 'character-loop',
    title: '2D character loop',
    category: 'animation',
    summary: 'A placeholder for a character or frame-by-frame animation.',
    seed: 4,
    ratio: 'portrait',
    year: '',
    role: '',
    overview: 'Introduce the character, the movement and the story in one beat.',
    challenge: 'What made the movement hard to get right? Weight, timing, appeal?',
    outcome: 'Describe the final loop and what you would refine in the next version.',
  },
  {
    slug: 'product-render',
    title: 'Product render study',
    category: '3d',
    summary: 'A placeholder for a Blender product visualisation.',
    seed: 2,
    ratio: 'square',
    year: '',
    role: '',
    overview: 'Describe the object, the setting and the feeling you wanted the render to have.',
    challenge: 'Materials, lighting, camera: which part took the most iterations?',
    outcome: 'Show the final renders and talk through the choices that made them work.',
  },
  {
    slug: 'environment-scene',
    title: 'Environment scene',
    category: '3d',
    summary: 'A placeholder for a world-building or atmospheric 3D scene.',
    seed: 0,
    ratio: 'landscape',
    year: '',
    role: '',
    overview: 'Set the scene: the place, the time of day and the story it implies.',
    challenge: 'How did you build depth and atmosphere? Explain your lighting and composition choices.',
    outcome: 'Wrap up with what the scene taught you and how you would take it further.',
  },
  {
    slug: 'short-film',
    title: 'Short film',
    category: 'film',
    summary: 'A placeholder for a filmmaking project from idea to final cut.',
    seed: 3,
    ratio: 'landscape',
    year: '',
    role: '',
    overview: 'Give the logline and describe what you were exploring.',
    challenge: 'What did you have to solve on set or in the edit?',
    outcome: 'Say how it was received or screened, only if that is true for your film.',
  },
  {
    slug: 'promo-edit',
    title: 'Promo edit',
    category: 'film',
    summary: 'A placeholder for a video edit or motion-led promo.',
    seed: 1,
    ratio: 'portrait',
    year: '',
    role: '',
    overview: 'Describe the footage, the message and the audience.',
    challenge: 'Pacing, structure, sound: what did the edit need to get right?',
    outcome: 'Show the final cut and what you would do differently next time.',
  },
  {
    slug: 'app-concept',
    title: 'App concept',
    category: 'uiux',
    summary: 'A placeholder for a UI/UX project: research, flows and screens.',
    seed: 4,
    ratio: 'portrait',
    year: '',
    role: '',
    overview: 'Explain the problem, the people it is for and your approach.',
    challenge: 'Which decisions shaped the flow? Show the trade-offs you made.',
    outcome: 'Present the final screens and what you would test next.',
  },
  {
    slug: 'website-redesign',
    title: 'Website redesign',
    category: 'uiux',
    summary: 'A placeholder for a web design or redesign case study.',
    seed: 2,
    ratio: 'landscape',
    year: '',
    role: '',
    overview: 'Describe the site, what was not working and your goals for it.',
    challenge: 'What was the biggest structural or visual problem to solve?',
    outcome: 'Show the before and after, and the reasoning behind your changes.',
  },
]
