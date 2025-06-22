"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignInButton, UserButton, ClerkLoaded } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/app/(store)/store";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Eco<span className="text-gray-800">vacs</span>
        </Link>

        {/* Center - Search Bar */}
        <form
          action="/search"
          className="hidden sm:flex flex-grow max-w-md mx-6"
        >
          <input
            type="text"
            name="query"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/basket" className="relative flex items-center group">
            <TrolleyIcon className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              pathname === "/orders"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <PackageIcon className="w-4 h-4" />
            <span>Orders</span>
          </Link>

          {/* User Area */}
          <ClerkLoaded>
            {user ? (
              <div className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" />
                <div className="hidden sm:block text-sm">
                  <p className="text-gray-400 leading-tight">Hello</p>
                  <p className="text-gray-700 font-medium">
                    {user.fullName?.split(" ")[0]}
                  </p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                  Sign In
                </button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
