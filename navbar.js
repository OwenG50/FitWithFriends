// Navbar links
const links = [
    { text: "Home", icon:"assets/home.svg", href: "home.html" },
    { text: "Social", icon:"assets/social.svg", href: "social.html" },
    { text: "Workout", icon:"assets/workout.svg", href: "myWorkoutsINITIAL.html" },
    { text: "Learn", icon:"assets/learn.svg", href: "learn.html" },
    { text: "More", icon:"assets/more.svg", href: "more.html" },
];

// Get navbar container element
const navbarContainer = document.getElementById("navbar");

// Create navbar links
for (let i = 0; i < links.length; i++) {
    const link = document.createElement("a");
    link.href = links[i].href;

    const icon = document.createElement("img");
    icon.src = links[i].icon;
    icon.classList.add("nav-icons");

    link.appendChild(icon);
    link.appendChild(document.createTextNode(links[i].text));

    navbarContainer.appendChild(link);
}