# BeFit v2

Welcome to BeFit v2! This is an application designed to help users track their gym progress, including diet, weight, and workouts. Whether you're a fitness enthusiast or a beginner, BeFit v2 is here to assist you in achieving your fitness goals.

![BeFit Home Page](https://www.zachuri.com/_next/image?url=%2Fassets%2Fprojects%2Fbefit-v2-0.png&w=1920&q=75)

![BeFit Home Page](https://www.zachuri.com/_next/image?url=%2Fassets%2Fprojects%2Fbefit-v2-1.png&w=1200&q=75)

## Tech Stack

BeFit v2 is built using the following technologies:

- [Next.js](https://nextjs.org/) - A popular React framework for building server-rendered applications.
- [Shadcn UI](https://ui.shadcn.com/) - A simple and modular component library for React.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for quickly building custom designs.
- [Supabase](https://supabase.io/) - An open-source Firebase alternative that provides a PostgreSQL database with a RESTful API.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source relational database management system.
- [Stripe](https://stripe.com/) - A payment processing platform for online businesses.

## Features

- **Workout Tracking**: Log your workout routines and keep track of your progress over time.
- **Diet Monitoring**: Monitor your daily diet and nutritional intake to support your fitness goals.
- **Weight Management**: Track changes in your weight and visualize your weight loss or gain journey.
- **Payment Integration**: Premium users can enjoy advanced features through Stripe payment integration.

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/your-username/befit-v2.git
cd befit-v2
```

## Installation

1. Install dependencies:

```sh
npm install
```

1. Set up your environment variables:

- Create a .env.local file in the root directory.
- Add your Supabase API credentials and other necessary keys:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
```

2. Run the development server:

```sh
npm run dev

```

Open your browser and navigate to http://localhost:3000 to see BeFit v2 in action.

## Contributions

Contributions are welcome! If you find a bug or want to suggest an enhancement, please open an issue on the GitHub repository. Pull requests are also appreciated.

## License

BeFit v2 is open-source software licensed under the [MIT license](https://github.com/zachuri/befit-v2/blob/main/LICENSE.md)
