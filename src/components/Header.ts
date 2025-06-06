export function Header(): HTMLElement {
  // State variables
  let amount = 3; // Cart amount
  let checkoutPath = "/checkout";
  let showTemplates = false;
  let toggleBtn = false;
  let activeNav = false;

  // Initialize dark mode
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let darkMode =
    localStorage.getItem("darkMode") === "true" ||
    (localStorage.getItem("darkMode") === null && prefersDark);

  // Apply dark mode to document
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const links = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Shop", href: "/shop" },
    { id: 3, name: "About", href: "/about" },
    { id: 4, name: "Contact", href: "/contact" },
  ];

  const navbar = document.createElement("nav");

  const updateNavbar = () => {
    // Hide navbar on checkout pages
    if (window.location.pathname.includes(checkoutPath)) {
      navbar.innerHTML = "";
      navbar.className = "hidden";
      return;
    }

    navbar.className = `
      fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${
        activeNav
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent text-gray-400"
      }
      ${darkMode ? "dark" : ""}
    `;

    navbar.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          
          <!-- Logo -->
          <div class="flex-shrink-0 z-50">
            <a href="/" class="flex items-center space-x-2 group" data-link>
              <img src="${
                darkMode
                  ? "https://i.imgur.com/URPUqbe.png"
                  : "https://i.imgur.com/zjmEKVY.png"
              }" 
                   alt="Logo" 
                   class="h-24 w-24 transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center space-x-8">
            <ul class="flex items-center space-x-8">
              ${links
                .map(
                  (link) => `
                <li>
                  <a href="${link.href}" 
                     class="relative py-2 px-1 font-medium transition-all duration-300 group
                             hover:text-blue-600
                            dark:text-gray-300 dark:hover:text-blue-400 ${
                              activeNav ? "text-black" : "text-gray-500"
                            }" data-link>
                    ${link.name}
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F35F25] dark:bg-blue-400 
                                transition-all duration-300 group-hover:w-full
                                ${
                                  window.location.pathname === link.href
                                    ? "w-full"
                                    : ""
                                }"></span>
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>
          
          </div>

          <!-- Right Side Options -->
          <div class="flex items-center space-x-4">
            <!-- Dark Mode Toggle -->
            <button id="dark-mode-toggle" class="p-2 rounded-lg transition-all duration-200
                       hover:bg-gray-100
                      dark:text-gray-300 dark:hover:bg-gray-700 ${
                        activeNav ? "text-black" : "text-gray-500"
                      }">
              ${
                darkMode
                  ? `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              `
                  : `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              `
              }
            </button>

            <!-- Cart -->
            <button id="cart-btn" class="relative p-2 rounded-lg transition-all duration-200
                       hover:bg-gray-100
                      dark:text-gray-300 dark:hover:bg-gray-700 ${
                        activeNav ? "text-black" : "text-gray-500"
                      }">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
              ${
                amount > 0
                  ? `
                <span class="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-orange-500 to-red-500 
                            text-white text-xs font-medium rounded-full flex items-center justify-center px-1 shadow-lg">
                  ${amount}
                </span>
              `
                  : ""
              }
            </button>

            <!-- Mobile Menu Button -->
            <button id="mobile-toggle" class=lg:hidden p-2 rounded-lg transition-all duration-200
                       hover:bg-gray-100 
                      dark:text-gray-300 dark:hover:bg-gray-700  ${
                        activeNav ? "text-black" : "text-gray-500"
                      }"">
              <div class="w-6 h-6 flex flex-col justify-center space-y-1">
                <span class="block h-0.5 bg-current transition-all duration-300 ${
                  toggleBtn ? "rotate-45 translate-y-1.5" : ""
                }"></span>
                <span class="block h-0.5 bg-current transition-all duration-300 ${
                  toggleBtn ? "opacity-0" : ""
                }"></span>
                <span class="block h-0.5 bg-current transition-all duration-300 ${
                  toggleBtn ? "-rotate-45 -translate-y-1.5" : ""
                }"></span>
              </div>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="lg:hidden overflow-hidden transition-all duration-300 ${
          toggleBtn ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }">
          <div class="px-4 py-6 space-y-4 border-t
                    bg-transparent backdrop-blur-md border-gray-200
                     dark:border-gray-700">
            
            <!-- Mobile Navigation Links -->
            ${links
              .map(
                (link) => `
              <a href="${link.href}" 
                 class="block py-3 px-4 rounded-lg font-medium transition-all duration-200
                         hover:text-blue-600 hover:bg-blue-50
                        dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-700
                        ${
                          window.location.pathname === link.href
                            ? "text-white bg-[#1649A1] dark:text-blue-400 dark:bg-gray-700"
                            : ""
                        } &&  ${activeNav ? "text-black" : "text-gray-500"}""
                 data-link>
                ${link.name}
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    setupEventListeners();
  };

  const setupEventListeners = () => {
    // Mobile toggle
    const mobileToggle = navbar.querySelector("#mobile-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        toggleBtn = !toggleBtn;
        updateNavbar();
      });
    }

    // Dark mode toggle (desktop)
    const darkModeToggle = navbar.querySelector("#dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", toggleDarkMode);
    }

    // Dark mode toggle (mobile)
    const mobileDarkModeToggle = navbar.querySelector(
      "#mobile-dark-mode-toggle"
    );
    if (mobileDarkModeToggle) {
      mobileDarkModeToggle.addEventListener("click", toggleDarkMode);
    }

    // Cart functionality
    const cartBtn = navbar.querySelector("#cart-btn");
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        console.log("Cart clicked - implement your cart logic here");
      });
    }

    // Hide mobile menu when clicking links
    const mobileLinks = navbar.querySelectorAll("a[data-link]");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggleBtn = false;
        updateNavbar();
      });
    });
  };

  const toggleDarkMode = () => {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
    updateNavbar();
  };

  // Scroll effect
  const handleScroll = () => {
    const shouldBeActive = window.scrollY > 50;
    if (shouldBeActive !== activeNav) {
      activeNav = shouldBeActive;
      updateNavbar();
    }
  };

  // Initialize
  window.addEventListener("scroll", handleScroll);
  updateNavbar();

  // Public methods
  (navbar as any).updateCartAmount = (newAmount: number) => {
    amount = newAmount;
    updateNavbar();
  };

  (navbar as any).updateCheckoutPath = (newPath: string) => {
    checkoutPath = newPath;
    updateNavbar();
  };

  return navbar;
}
