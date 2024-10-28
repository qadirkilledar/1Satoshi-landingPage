import React, { useState, useEffect } from "react";
import {
  Bell,
  ArrowRight,
  Mail,
  Zap,
  Timer,
  Sparkles,
  RotateCw,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [btcPrice, setBtcPrice] = useState(0);
  const [satsPrice, setSatsPrice] = useState(0);
  const [email, setEmail] = useState("");

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Product rotation animation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationY((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(rotationInterval);
  }, []);

  const products = [
    {
      name: "Lamborghini Aventador",
      sats: "1",
      image: "lambo2.avif",
      rarity: "Legendary",
      stats: { speed: 95, luxury: 98, value: 92 },
    },

    {
      name: "MacBook Pro",
      sats: "1",
      image: "macbook.jpg",
      rarity: "Rare",
      stats: { performance: 88, design: 92, value: 85 },
    },
    {
      name: "VPS Service",
      sats: "1",
      image: "vps.jpg",
      rarity: "Common",
      stats: { uptime: 99, speed: 90, value: 95 },
    },
    {
      name: "World Tour Package",
      sats: "1",
      image: "world.jpg",
      rarity: "Epic",
      stats: { experience: 96, luxury: 94, value: 93 },
    },
  ];

  const RarityBadge = ({ rarity }) => {
    const colors = {
      Legendary: "bg-orange-500",
      Epic: "bg-purple-500",
      Rare: "bg-blue-500",
      Common: "bg-gray-500",
    };

    return (
      <span
        className={`${colors[rarity]} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
      >
        <Sparkles className="w-3 h-3" />
        {rarity}
      </span>
    );
  };

  const StatBar = ({ value, label }) => (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch BTC price in USD from the Coinbase API
        const response = await axios.get(
          "https://api.coinbase.com/v2/prices/spot?currency=USD"
        );
        const btcPriceInUSD = parseFloat(response.data.data.amount); // Ensure btcPrice is a float
        setBtcPrice(btcPriceInUSD);

        // Calculate price of 1 SAT
        const satsPrice = btcPriceInUSD / 100000000; // Price of 1 Satoshi
        setSatsPrice(satsPrice);
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,67,255,0.15),rgba(255,122,28,0.15))]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0b1e_2px,transparent_2px),linear-gradient(to_bottom,#0a0b1e_2px,transparent_2px)] bg-[size:40px_40px]" />

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="relative flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold relative">
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                  1satoshi
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 opacity-30 blur-lg" />
              </div>
              <Gamepad2 className="w-8 h-8 text-orange-500" />
            </div>
            <Button
              variant="outline"
              className="relative group border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
              <div className="absolute -inset-0.5 bg-blue-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300" />
            </Button>
          </nav>

          <div className="relative z-10">
            <div
              className="text-center lg:text-left transform transition-transform duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
              }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8">
                <div className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                    Coming November 10
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 opacity-30 blur-lg" />
                </div>
              </h1>

              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0 mb-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                      {value}
                    </div>
                    <div className="text-sm text-gray-400">{unit}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <Alert className="bg-blue-900/30 border-2 border-blue-500 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <AlertDescription>BTC Price: {btcPrice}</AlertDescription>
                  </div>
                </Alert>
                <Alert className="bg-orange-900/30 border-2 border-orange-500 backdrop-blur-lg transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <AlertDescription>
                      SATS Price: $
                      {satsPrice && !isNaN(satsPrice)
                        ? satsPrice.toFixed(8)
                        : "Loading..."}
                    </AlertDescription>
                  </div>
                </Alert>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <div className="relative group w-full max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email for early access"
                    className="w-full bg-gray-800/50 border-2 border-blue-500/50 backdrop-blur-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-orange-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
                </div>
                <Button className="relative group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                  Get Early Access <ArrowRight className="ml-2 h-4 w-4" />
                  <div className="absolute -inset-0.5 bg-orange-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
                </Button>
                <Button
                  variant="outline"
                  className="relative group border-2 border-blue-500"
                  onClick={() => window.open("https://nostr.org/", "_blank")} //  opens the URL in a new tab
                >
                  Follow on Nostr <Bell className="ml-2 h-4 w-4" />
                  <div className="absolute -inset-0.5 bg-blue-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 relative">
          <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
            Featured Items
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 opacity-30 blur-lg -z-10" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`group relative ${
                index === 0 ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-500 border-2 border-transparent hover:border-blue-500"
                style={{
                  transform: `perspective(1000px) rotateY(${
                    index === 0 ? rotationY : 0
                  }deg)`,
                }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <RarityBadge rarity={product.rarity} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-500 font-bold">
                      {product.sats} sats
                    </span>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(product.stats).map(([stat, value]) => (
                      <StatBar key={stat} label={stat} value={value} />
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-lg border-2 border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
              Login to 1satoshi
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="relative group">
              <Input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800/50 border-2 border-blue-500/50 backdrop-blur-lg"
              />
              <div className="absolute -inset-0.5 bg-blue-500 opacity-20 group-hover:opacity-30 blur transition-all duration-300 -z-10" />
            </div>
            <div className="relative group">
              <Input
                type="password"
                placeholder="Password"
                className="w-full bg-gray-800/50 border-2 border-blue-500/50 backdrop-blur-lg"
              />
              <div className="absolute -inset-0.5 bg-blue-500 opacity-20 group-hover:opacity-30 blur transition-all duration-300 -z-10" />
            </div>
            <Button className="relative group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              Login with Email
              <Mail className="ml-2 h-4 w-4" />
              <div className="absolute -inset-0.5 bg-blue-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="relative group border-2 border-orange-500"
            >
              <Zap className="mr-2 h-4 w-4 text-orange-500" />
              Connect Lightning Wallet
              <div className="absolute -inset-0.5 bg-orange-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

        <h2 className="text-4xl font-bold text-center mb-16 relative">
          <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
            Why Choose 1satoshi?
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 opacity-30 blur-lg -z-10" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Timer className="w-6 h-6 text-blue-500" />,
              title: "Instant Settlements",
              description:
                "Experience lightning-fast transactions with our advanced Lightning Network integration.",
            },
            {
              icon: <Trophy className="w-6 h-6 text-orange-500" />,
              title: "Exclusive Items",
              description:
                "Access unique digital and physical assets available only on our platform.",
            },
            {
              icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
              title: "Reward System",
              description:
                "Earn rewards and unlock special perks as you engage with our platform.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-500 border-2 border-transparent hover:border-blue-500"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-30 blur transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border-2 border-blue-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-orange-500 opacity-30 blur" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                Stay Updated
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Get notified about new items, special offers, and platform
              updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-gray-900/50 border-2 border-blue-500/50"
              />
              <Button className="relative group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Subscribe
                <Bell className="ml-2 h-4 w-4" />
                <div className="absolute -inset-0.5 bg-orange-500 opacity-30 group-hover:opacity-50 blur transition-all duration-300 -z-10" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                  1satoshi
                </span>
                <Gamepad2 className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-gray-400">
                The next generation marketplace powered by Bitcoin and Lightning
                Network.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Help Center</li>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 1satoshi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
