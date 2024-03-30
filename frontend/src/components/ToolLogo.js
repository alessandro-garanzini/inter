import Image from 'next/image';

export default function ToolLogo() {
  return (
    <div className="flex items-center justify-center">
      <Image className="mb-5" src="/logo.png" width={180} height={180} />
      <p className="text-white font-bold mb-3 mt-3">
        INTER <br /> TEAM MANAGER
      </p>
    </div>
  );
}
