/**
 * Everything personal lives here. Edit this file and the whole site updates.
 *
 * Contact links are intentionally EMPTY. Paste in your real ones, for example:
 *   email: 'you@example.com'
 *   instagram: 'https://instagram.com/yourhandle'
 * Until then the Contact section shows clearly-marked placeholders.
 */
export interface Profile {
  name: string
  location: string
  tagline: string
  intro: string
  about: string[]
  software: string[]
  links: {
    email: string
    instagram: string
    linkedin: string
    behance: string
  }
}

export const profile: Profile = {
  name: 'greed',
  location: 'Pune, India',
  tagline: 'I turn ideas into visual experiences',
  intro:
    'A multidisciplinary creative in Pune, India. I design brands, build worlds in 3D, animate, edit and film, and shape digital interfaces, all in service of one good idea.',
  // Placeholder story. Replace with your own background in your own words.
  about: [
    'I’m Abdul , a multidisciplinary creative based in Pune, India. I move between graphic design, 3D, animation, film and interface design because good ideas rarely stay in one medium.',
    'A brand can become a motion piece. A render can become a scene. A story can become a screen. This site is my notebook for that process: finished work up front, experiments in the back.',
  ],
  // Confirmed tools. Add the rest of your toolkit here.
  software: ['Blender', 'After Effects','premiere pro'],
  links: {
    email: 'abdulkadardesigns@gmail.com',
    instagram: 'https://www.instagram.com/regor_ly/',
    linkedin: 'https://www.linkedin.com/feed/foryou/',
    behance: 'https://www.behance.net/regorrage',
  },
}
