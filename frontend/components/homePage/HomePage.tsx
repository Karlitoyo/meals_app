import Image from "next/image";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <Image
          src="/images/hero/hero-image.jpg" // Path to your image
          alt="Hero Background"
          fill // Ensures the image covers the entire section
          className="object-cover"
          quality={100}
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Text Content */}
        <div className="relative flex items-center justify-center h-full text-center text-white px-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Cooked4U</h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto">
              Explore amazing content and discover new experiences with us.
            </p>
            <button onClick={() => router.push('/dashboard')} className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 flex justify-center items-center">
        <div className="container max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src="/images/middle-section/salmon.jpg"
                alt="Salmon Dish"
                width={500}
                height={300}
                className="object-cover"
                quality={90}
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Mediterranean Salmon
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                Cooked for a guest, this Mediterranean salmon is a perfect dish!
              </p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Mediterranean</div>
                <div className="badge badge-outline">Salmon</div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Vietnamese Spring Rolls</h2>
              <p>
                A guest in Vietnam serves these delicious spring rolls with a
                side of spicy peppers in olive oil.
              </p>
            </div>
            <figure>
              <Image
                src="/images/middle-section/spring-roll.jpg"
                alt="Salmon Dish"
                width={500}
                height={300}
                className="object-cover"
                quality={90}
                priority
              />
            </figure>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <Image
                src="/images/middle-section/steak.jpg"
                alt="Salmon Dish"
                width={500}
                height={300}
                className="object-cover"
                quality={90}
                priority
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Argentinian Steak
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                A home in Buenos Aires serves this delicious Argentinian steak
                with side of peppercorn sauce and mixed vegetables.
              </p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Argentina</div>
                <div className="badge badge-outline">Steak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <p className="italic">"Amazing experience!"</p>
              <h3 className="font-bold text-gray-800 mt-4">- Nicolas, Spain</h3>
            </div>
            <div className="p-6 border rounded-lg">
              <p className="italic">"Food and experience was once in a lifetime!"</p>
              <h3 className="font-bold text-gray-800 mt-4">- Michelle, Vietnam</h3>
            </div>
            <div className="p-6 border rounded-lg">
              <p className="italic">"Highly recommend it, I've made friends for life!"</p>
              <h3 className="font-bold text-gray-800 mt-4">- Domingo, Argentina</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
