import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t h-16 max-h-16 bg-white">
      <div className="flex flex-center flex-between items-center flex-col w-fit mx-auto gap-4 p-5 sm:flex-row">
        <Link href="/">
          <Image
            src="/brand-asset-profile-picture.png"
            alt="SaaS Pro logo"
            width={24}
            height={24}
            className="rounded-lg"
          />
        </Link>
        <p>&copy; {new Date().getFullYear()} SaaS Pro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
