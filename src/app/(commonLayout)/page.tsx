import FeaturedBlogs from "@/components/FeaturedBlogs";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import {
  getFeatureBlogs,
  getFeatureProjects,
} from "@/utils/actions/sendMessageUser";

const HomePage = async () => {
  const projects = await getFeatureProjects();
  const blogs = await getFeatureBlogs();
  return (
    <div>
      <HeroSection />
      <FeaturedProjects projects={projects} isLoading={false} />
      <SkillsSection />
      <FeaturedBlogs blogs={blogs} isLoading={false} />
    </div>
  );
};

export default HomePage;
