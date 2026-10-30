import type { Access } from 'payload'

export const loggedIn: Access = ({ req }) => Boolean(req.user)
export const anyone: Access = () => true

// Visitors see published entries only; logged-in staff also see drafts.
export const publishedOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
