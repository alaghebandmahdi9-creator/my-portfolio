/**
 * Intro Animation Sequence
 * -----------------------
 * 1. Lines slide in from outside
 * 2. Logo fades in slowly
 * 3. Logo stays visible for 1 second
 * 4. Logo fades out
 * 5. Lines slide out the same path
 * 6. Redirect to main site (or hide intro)
 */

document.addEventListener("DOMContentLoaded", () => {
  const lineVertical   = document.getElementById("lineVertical");
  const lineHorizontal = document.getElementById("lineHorizontal");
  const logo           = document.getElementById("logo");
  const intro          = document.getElementById("intro");

  // Timing (milliseconds) – easy to tweak
  const TIMING = {
    linesInDelay:    500,   // small delay before lines start
    linesInDuration: 900,   // matches CSS transition
    logoInDelay:     700,   // start logo fade shortly after lines begin
    logoInDuration:  800,
    logoHold:        1200,  // logo stays visible
    logoOutDuration: 800,
    linesOutDelay:   500,   // small gap after logo starts fading
    linesOutDuration:900,
    totalEnd:        0      // calculated below
  };

  // Calculate total time for final action
  TIMING.totalEnd =
    TIMING.linesInDelay +
    TIMING.linesInDuration +
    TIMING.logoHold +
    TIMING.logoOutDuration +
    TIMING.linesOutDuration +
    300; // small buffer

  // ---------- STEP 1: Lines come in ----------
  setTimeout(() => {
    lineVertical.classList.add("is-in");
    lineHorizontal.classList.add("is-in");
  }, TIMING.linesInDelay);

  // ---------- STEP 2: Logo fades in ----------
  setTimeout(() => {
    logo.classList.add("is-visible");
  }, TIMING.linesInDelay + TIMING.logoInDelay);

  // ---------- STEP 3 + 4: Hold then fade logo out ----------
  const logoOutStart =
    TIMING.linesInDelay +
    TIMING.logoInDelay +
    TIMING.logoInDuration +
    TIMING.logoHold;

  setTimeout(() => {
    logo.classList.remove("is-visible");
    logo.classList.add("is-hidden");
  }, logoOutStart);

  // ---------- STEP 5: Lines go out ----------
  setTimeout(() => {
    lineVertical.classList.remove("is-in");
    lineVertical.classList.add("is-out");

    lineHorizontal.classList.remove("is-in");
    lineHorizontal.classList.add("is-out");
  }, logoOutStart + TIMING.linesOutDelay);

  // ---------- STEP 6: End of intro ----------
  setTimeout(() => {
    // Option A: Redirect to the real home page
    // window.location.href = "home.html";

    // Option B: Simply hide the intro (if main content is already in the page)
    intro.style.opacity = "0";
    intro.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
      intro.style.display = "none";
      // Later you can reveal the main website content here
      document.body.style.overflow = "auto";
    }, 500);

    window.location.href = "home.html";
  }, TIMING.totalEnd);
});



