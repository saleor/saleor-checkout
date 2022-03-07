import { PageTabs, PageTab } from "@saleor/macaw-ui";
import { useRouter } from "next/router";
import { channelListPath, customizationPath } from "routes";

const AppNavigation: React.FC = () => {
  const router = useRouter();

  return (
    <PageTabs onChange={router.push} value={router.pathname}>
      <PageTab value={channelListPath} label="Channels" />
      <PageTab value={customizationPath} label="Customization" />
    </PageTabs>
  );
};
export default AppNavigation;
