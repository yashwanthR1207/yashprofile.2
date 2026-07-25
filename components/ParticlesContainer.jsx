import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesContainer = () => {
  // init
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className="w-full h-full absolute translate-z-0"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 90,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#d1d5db", // Light smokey gray for the bubble itself
          },
          stroke: {
            width: 1,
            color: "#9ca3af", // Slightly darker smokey gray for the edge (glass effect)
          },
          links: {
            color: "#9ca3af", // Smokey gray links
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: {
              default: "bounce",
            },
            random: true,
            speed: 1.5, // Slightly faster for bubble-like floating
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60, // Slightly fewer particles for larger bubbles
          },
          opacity: {
            value: 0.3, // Low opacity for glass-like transparency
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 4,
              max: 12, // Larger size to resemble bubbles
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesContainer;
