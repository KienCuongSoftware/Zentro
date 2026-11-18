# Pull Request Description Template

Copy the sections below into your pull request description and fill them in.

---

## Summary

<!-- 1–3 sentences: what this PR does and why -->

## Type of change

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation
- [ ] Chore / tooling
- [ ] Breaking change

## Changes

-
-
-

## Scope

- [ ] Frontend (`frontend/`)
- [ ] Backend (`backend/`)
- [ ] Database migration (Flyway)
- [ ] Docs / repo meta

## How to test

1.
2.
3.

### Suggested checks

- [ ] `cd frontend && npm run lint`
- [ ] `cd frontend && npm run build`
- [ ] Backend starts with `./mvnw spring-boot:run` (or `mvnw.cmd`)
- [ ] Login / register still works
- [ ] Demo users still seed correctly (if auth/DB touched)

## Screenshots / recordings

<!-- Required for UI changes. Before / after if possible. -->

| Before | After |
| --- | --- |
|  |  |

## Database / config notes

<!-- Migrations, new env vars, breaking API changes, seed data impacts -->

- Migration:
- Config:
- API:

## Related issues

Closes #

## Checklist

- [ ] I followed [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] I did not commit secrets, tokens, or local credentials
- [ ] My commits are reasonably scoped and messages are clear
- [ ] I updated docs if behavior or setup changed
