function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
  gsap.to(".navleft svg", {
    transform: "translateY(-160%)",
    scrollTrigger: {
      // trigger:".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to(".navright_links", {
    transform: "translateY(-160%)",
    opacity: 0,
    scrollTrigger: {
      // trigger:".page1",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbarAnimation();

let topHeading = document.querySelector(".page1 h1");
let playButton = document.querySelector(".playbutton");
let videoContainer = document.querySelector(".video-container");
let cursor = document.querySelector(".cursor");
let page3Child = document.querySelectorAll(".child");

//heading animation
gsap.from(".page1 h1", {
  y: 100,
  delay: 0.5,
  duration: 0.9,
  opacity: 0,
  stagger: 0.3,
});
gsap.from(videoContainer, {
  scale: 0.9,
  delay: 1.3,
  duration: 0.8,
  opacity: 0,
  stagger: 0.5,
});

// play button
document.addEventListener("mousemove", function (dets) {
  gsap.to(playButton, {
    y: dets.clientY,
    x: dets.clientX,
  });
  gsap.to(cursor, {
    y: dets.clientY,
    x: dets.clientX,
  });
});
videoContainer.addEventListener("mouseenter", function () {
  gsap.to(playButton, {
    opacity: 1,
    transform: "translate(-50%,-50%) scale(1)",
  });
  playButton.style.zIndex = 2;
});
videoContainer.addEventListener("mouseleave", function () {
  gsap.to(playButton, {
    opacity: 0,
    scale: 0,
  });
});

page3Child.forEach((element) => {
  element.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      opacity: 1,
      transform: "translate(-50%,-50%) scale(1)",
    });
  });
  element.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      opacity: 0,
      // transform:'translate(-50%,-50%) scale(0)'
      scale: 0,
    });
  });
});
