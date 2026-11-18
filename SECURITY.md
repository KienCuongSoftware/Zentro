# Security Policy

## Supported versions

Zentro is under active development. Security fixes are applied to the latest
`main` (or default) branch first.

| Version | Supported |
| --- | --- |
| Latest `main` | ✅ |
| Older commits / forks | ❌ Best-effort only |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report privately so we can investigate and patch before disclosure:

1. Contact the maintainers through a private channel (GitHub Security Advisory
   if enabled, or a direct maintainer message).
2. Include as much detail as possible:
   - Affected component (`frontend`, `backend`, auth, API route, etc.)
   - Steps to reproduce
   - Impact (auth bypass, data exposure, privilege escalation, XSS, etc.)
   - Suggested fix (optional)
3. Allow reasonable time for triage and a fix before any public disclosure.

We aim to:

- Acknowledge reports within **72 hours**
- Provide an initial assessment within **7 days**
- Coordinate a fix and disclosure timeline based on severity

## What to expect

| Severity (approx.) | Typical handling |
| --- | --- |
| Critical / High | Prioritized patch, coordinated release notes |
| Medium | Scheduled fix in a near-term PR |
| Low / informational | Tracked and fixed when practical |

If the report is accepted, we may credit you in release notes unless you prefer
to remain anonymous.

If the report is declined (for example, out of scope or not reproducible), we
will explain why.

## Security practices for contributors

When working on Zentro:

- Never commit secrets, API keys, JWT signing secrets, or production passwords.
- Keep authentication tokens out of logs and error messages.
- Store passwords only as secure hashes (existing encoder flow).
- Validate and sanitize user input on both API and UI boundaries.
- Prefer parameterized queries / JPA APIs; avoid raw concatenated SQL.
- Treat demo credentials as **local development only**, not production defaults.
- Review auth and role checks carefully when changing protected endpoints.

## Safe harbor

We welcome good-faith security research on this project. Please:

- Avoid privacy violations, data destruction, and service disruption
- Do not access or modify data that is not yours
- Report findings promptly through private channels

Thank you for helping keep Zentro and its users safe.
