
import FullPageScroll from "./components/FullPageScroll";
import Header from "./components/Header";
import ScrollNest from "./components/ScrollNest";
import Hero from "./sections/Hero";
import StorySections from "./sections/StorySections";

export default function App() {
  return (
    <main>
              <FullPageScroll />
      <Header />
      <ScrollNest />
      <Hero />
      <StorySections />
    </main>
  );
}
