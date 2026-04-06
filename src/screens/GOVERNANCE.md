# GOVERNANCE REGISTRY — Screens (src/screens/)

> **Boundary**: `src/screens/` | **Date**: 2026-03-27

---

## Scope

Governs the 4 screen directories and 12 views + 12 pages within the main connectome screen. In Phase 1, views become spokes and pages are triaged.

## Current Screen Structure

```
src/screens/
├── auth-callback/      # OAuth callback handler
├── mini-embed/         # Embeddable mini query editor
├── new-domain/         # Domain redirect handler
└── connectome/         # Main application screen
    ├── components/     # Screen-specific shared components
    ├── connection/     # Connection management
    ├── docs/           # Documentation viewer
    ├── metrics/        # Usage metrics
    ├── pages/          # Cloud/organization pages (12)
    └── views/          # Feature views (12)
```

## View Inventory (12) → Spoke Mapping

| View | Purpose | Phase 1 Destination |
|------|---------|-------------------|
| authentication | Auth management | STRIP |
| dashboard | Overview dashboard | Shell |
| designer | Schema designer | SurrealDB spoke |
| documentation | Docs viewer | Shared |
| explorer | Table/record explorer | SurrealDB spoke |
| functions | Function editor | SurrealDB spoke |
| graphql | GraphQL playground | SurrealDB spoke |
| migration | Schema migration | SurrealDB spoke |
| monitor | Live query monitor | SurrealDB spoke |
| parameters | Variable editor | SurrealDB spoke |
| query | Query editor | SurrealDB spoke |
| sidekick | AI assistant | Shell (→ Clyffy) |

## Page Inventory (12) → Triage

| Page | Phase 1 Action |
|------|---------------|
| CreateConnection | KEEP → Shell |
| CreateOrganization | STRIP |
| NewEmbed | KEEP → Shell |
| OrganizationDeploy | STRIP |
| OrganizationManage | STRIP |
| Organizations | STRIP |
| Overview | KEEP → Shell |
| Placeholder | KEEP → Shell |
| Referral | STRIP |
| Signin | STRIP |
| Support | STRIP |
| SupportPlans | STRIP |

## Terminology

- **Screen**: A top-level entrypoint (connectome, mini-embed, auth-callback)
- **View**: A feature tab within the main screen (query, explorer, designer...)
- **Page**: A cloud/organization management page (will mostly be stripped)

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
