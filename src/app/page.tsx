import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import NotificationDemo from "@/components/notifications/NotificationDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="animate-fade-in">
        <Hero />
        <div className="animate-fade-in animation-delay-200">
          <FeaturedProducts />
        </div>
        <div className="animate-fade-in animation-delay-400">
          <Benefits />
        </div>
        <div className="animate-fade-in animation-delay-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NotificationDemo />
        </div>
      </div>
      
      {/* Separator before footer */}
      <div className="border-t border-gray-600 mx-4 sm:mx-6 lg:mx-8 mt-8"></div>
      
      <Footer />
    </div>
  );
}
