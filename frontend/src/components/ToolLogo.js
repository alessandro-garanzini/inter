import Image from 'next/image';
import Link from 'next/link';

export default function ToolLogo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
      <Image className="mb-5" src="/logo.png" width={180} height={180} />
      </Link>
      <p className="text-white font-bold mb-3 mt-3">
        INTER <br /> TEAM MANAGER
      </p>
    </div>
  );
}
