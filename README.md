<div align="center">
  <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/270f-fe0f.svg" height="128px" width="128px"/>
  <h1>Baynet</h1>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/actions">
    <img src="https://github.com/WilliamTuominiemi/NFT-Art-Platform/actions/workflows/ci.yml/badge.svg" alt="actions" />
  </a>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/commits/main">
    <img src="https://img.shields.io/github/last-commit/WilliamTuominiemi/NFT-Art-Platform" alt="last commit" />
  </a>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/network/members">
    <img src="https://img.shields.io/github/forks/WilliamTuominiemi/NFT-Art-Platform" alt="forks" />
  </a>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/stargazers">
    <img src="https://img.shields.io/github/stars/WilliamTuominiemi/NFT-Art-Platform" alt="stars" />
  </a>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/issues/">
    <img src="https://img.shields.io/github/issues/WilliamTuominiemi/NFT-Art-Platform" alt="open issues" />
  </a>
  <a href="https://github.com/WilliamTuominiemi/NFT-Art-Platform/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/WilliamTuominiemi/NFT-Art-Platform.svg" alt="license" />
  </a>
</div>

### Demo

<a href="https://baynet.vercel.app">
  <img src="screenshot.png" alt="screenshot" width="800"/>
</a>

### Features

- Feed, with pagination and sorting
- Highly customizable drawing canvas
- Like and share drawings
- User profiles
- Pinned drawings
- Responsive design
- Light and dark mode
- English, Swedish and Finnish translations

### Get started

Install dependencies:

```bash
npm install
```

Create e `.env` file and fill it out as per `.env.example`:

```bash
cp .env.example .env
```

Create database tables from Prisma schema:

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

### Tech stack

Baynet is built with the [T3 Stack](https://create.t3.gg/) and [ShadcnUI](https://ui.shadcn.com/).
