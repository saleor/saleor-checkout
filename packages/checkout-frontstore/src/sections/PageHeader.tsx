import { SaleorLogo } from "@/checkout-frontstore/images";

const PageHeader = () => {
  return (
    <div className="page-header">
      <img src={SaleorLogo} alt="logo" className="logo" />
    </div>
  );
};

export default PageHeader;
