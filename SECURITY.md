# Security Policy

## Supported versions

The website is built and deployed automatically by GitHub Pages from the
`main` branch. Every deployment is the current release.

## Reporting a vulnerability

This is a fully static website — there is no server-side code. If you still
find a security issue (for example a broken security header, a leaked secret,
or something in the content that should not be public), please report it.

> Replace the placeholder below with a real contact address before going live.

- Report: **security@kaasolai.in** (placeholder — replace with a real mailbox)
- Confidentiality: please do not share the issue publicly until it is fixed.
- Response: reports are acknowledged within 5 business days. There is no bug
  bounty programme.

## Notes for editors

- Never commit secrets, passwords, API keys or private statements to the repo.
- The site uses GitHub Pages, which does not let you set custom HTTP headers.
  Security settings (CSP, referrer policy, robots) are therefore handled with
  `<meta>` tags in `_includes/head.html`.
- The machine-readable policy lives at
  `.well-known/security.txt` (`https://kaasolai.in/.well-known/security.txt`).
  Keep the `Expires` date rolling and in sync with this file.