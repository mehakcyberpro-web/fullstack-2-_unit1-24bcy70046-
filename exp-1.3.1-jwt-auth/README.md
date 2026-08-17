# Unit 1 Full Stack Experiments

## Included
- **Experiment 1.3.1:** JWT authentication demo with login, token creation/decoding and session storage.
- **Experiment 1.3.2:** RBAC with Admin, Editor and Viewer permissions plus protected UI.

## Run
```bash
cd exp-1.3.1-jwt-auth
npm install
npm run dev
```

### Demo accounts
- Admin: `admin@demo.com` / `admin123`
- Editor: `editor@demo.com` / `editor123`
- Viewer: `viewer@demo.com` / `viewer123`

> This is a frontend classroom demonstration. The JWT signature is simulated and is **not** suitable for production authentication. Production systems should issue and verify signed tokens on a trusted backend and avoid putting sensitive information in JWT payloads.
