### Hi! <img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/wave.gif" width="30px"/> **I am Erhan ERTEM**

&emsp;

## Udemy The Ultimate React Course 2024: React, Redux & More by Jonas Schmedtmann

### **Objective:** Create the Wild Oasis Website for Customers

<details open>

<summary><img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/education.gif" width="30px"/><strong>Key take-aways from this project...</strong></summary>

- React server component (RSC) architecture

  - Sharing data @ RSC
    - Server-component(SC) to Client-component(CC) flow
      - Passing fetched data via propping
      - Children propping @ CC
    - Client-component(CC) to Server-component(SC) flow
      - Mutating data using API endpoint with route handling
      - Sharing filter state via URL (searchParams)
        - usePathname() hook
        - useSearchParams() hook
        - useRouter() hook
    - Client-component(CC) to Client-component(CC) flow
      - Utilizing Context API for sharing state/props around
  - Use CC in a SC
    - Use 'use client' directive in CC when CC passes a server boundary
  - Use SC in a CC
    - Push a SC into CC as a children prop in a parenting SC

- <strong>'App'</strong> based NextJS folder structure and project planning

  - Root Segment
    - Create NextJS root (entry page/root segment)
    - Create a NextJS root layout
  - Child/Nested Child Segments
    - Create NextJS routes/nested routes (pages/segments)
    - Create a NextJS layout in a nested route
  - Params/Dynamic Segments
    - Setup params route
    - Create dynamic metadata via generateMetaData() nextjs fn
    - Turn dynamic params routes to static routes using generateStaticParams() nextjs fn

- Component import handling in NextJS

  - Configure path alias for app folder / VSCODE auto import integration

- Navigation in NextJS

  - NextJS Link Component
    - Static routes
    - Dynamic params routes
  - usePathname() NextJS CC hook to read current URL

- Image handling in NextJS and relavant attributes

  - NextJS Image Component
    - Inline referencing
      - Configure NextJS for URL images
    - External referencing

- Loader handling in NextJS

  - Establish a global loader for SSC routes (pages/segments)
  - Establish custom loader @ segment level (segment and its nested routes)
  - Employ <strong>React Suspense Mechanism</strong> on code portions that is subject to extended loading times to improve UX.
    - key propping @ Suspense

- Error handling in NextJS

  - Setup global NextJS error boundary to prevent page breaks on erronous code in production
  - Setup automatic triggering global NextJS not-found-error handling for mistyped routes/segments
  - Setup manual triggering not-found-error handling for mistyped dynamic routes(params)
  - Setup segment level NextJS not-found-error handlers

- Revalidation handling

  - Time-based revalidation
    - Component level revalidation
      - noStore() for PPR (future)
    - Route level revalidation
      - revalidate object
        - Enforce SSG+ISR rendering strategy
        - Enforce dynamic rendering strategy
  - Manual on-demand revalidation @ server-actions
    - revalidatePath()

- Authentication & Authorization via AuthJS

  - Authentication
    - Use server-actions @ signin and signout in SCs/CCs via form action wrapper
    - Use client version of signOut in a CC (experiment)
    - Read session informartion @ SCs viaq auth()
  - Authorization - Protecting routes
    - Protecting sub-routes via matcher config with wildcards
    - Explore built-in AuthJS middlewares
      - authorized() middleware
      - signIn() middleware
        - Write off new signin to Supabase
      - session() middleware
        - Create custom tailored session information

- Data mutations with Server Actions

  - form validations and server-actions
    - \<form> tag element with action attribute
      - Instigate server side validation and mutations for a form submitted in a CC
      - Conduct fully server-side form and auth validation @ server-action
      - Conduct server-side and client-side form validation via conform+zod+server-acto0n
  - form isLoading state using useFormStatus from react-dom

  </details>

&emsp;

<img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/learning.gif" width="30px"/><strong>In addition to the project cirriculum:</strong>

- Instead of sole server-action side form validation, explored:

  1. client-side validation via react-hook-form, server-side auth validation @ form server-action
  2. client-side validation and server-side revalidation via conform+zod, server-side auth validation @ form server-action

- Greyout form fields while updating guest profile
- Explore useActionState alternatingly for NextJS15 setups

  &emsp;

<img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/report.gif" width="30px"/><strong>Pending Issues:</strong>

- N/A

#### <img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/file.gif" width="30px"/>[The Wild Oasis Website](https://website-wild-oasis-erhan-ertem.netlify.app)

<img src="./screenshot.webp" width="600px"/>

---

![JS](https://img.shields.io/badge/JavaScript-323330?style=square&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=square&logo=react&logoColor=61DAF)
![NextJS](https://img.shields.io/badge/Next%20js-000000?style=square&logo=nextdotjs&logoColor=white)
