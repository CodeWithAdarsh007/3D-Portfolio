import Link from "next/link";

import { FOOTER_DATA } from "@/constants";

export const Footer = () => {
  return (
    <div className="w-full bg-bg-surface border-t border-border p-[20px] mt-auto">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {FOOTER_DATA.map((column) => (
            <div
              key={column.title}
              className="min-w-[200px] h-auto flex flex-col items-center justify-start"
            >
              <h3 className="font-bold text-[16px] text-text-primary mb-3">{column.title}</h3>
              {column.data.map(({ icon: Icon, name, link }) => (
                <Link
                  key={`${column.title}-${name}`}
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex flex-row items-center my-[10px] hover:text-accent-primary transition"
                >
                  {Icon && <Icon className="w-4 h-4 mr-2 text-text-secondary" />}
                  <span className="text-[14px] text-text-secondary">{name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mb-[20px] text-[14px] text-center text-text-tertiary">
          &copy; 2025 Adarsh Pandey. All rights reserved.
        </div>
      </div>
    </div>
  );
};
