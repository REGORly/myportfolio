export type IconName = 'type' | 'cube' | 'motion' | 'film' | 'camera' | 'ui'

export interface Skill {
  title: string
  note: string
  icon: IconName
}

export const skills: Skill[] = [
  {
    title: 'Graphic design, branding and typography',
    note: 'Identities, posters and letterforms with a point of view.',
    icon: 'type',
  },
  {
    title: 'Blender 3D modelling, lighting and rendering',
    note: 'Building scenes and lighting them until they have a mood.',
    icon: 'cube',
  },
  {
    title: '2D animation and motion graphics',
    note: 'Shapes and type that move with intent.',
    icon: 'motion',
  },
  {
    title: 'Video editing and After Effects',
    note: 'Rhythm, cuts, compositing and polish.',
    icon: 'film',
  },
  {
    title: 'Filmmaking and storytelling',
    note: 'Finding the story, then framing it.',
    icon: 'camera',
  },
  {
    title: 'UI/UX and digital design',
    note: 'Interfaces that feel clear and a little bit alive.',
    icon: 'ui',
  },
]

export const interests = [
  'storytelling',
  'typography',
  'lighting',
  'motion',
  'worldbuilding',
  'colour',
  'branding',
  'film language',
]

export const marqueeItems = [
  'Graphic design',
  'Branding',
  'Typography',
  'Blender 3D',
  'Lighting and rendering',
  '2D animation',
  'Motion graphics',
  'Video editing',
  'After Effects',
  'Filmmaking',
  'Storytelling',
  'UI/UX',
]
