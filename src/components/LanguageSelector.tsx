/**
 * LanguageSelector.tsx
 *
 * Drop-in replacement for the broken Google Translate cookie version.
 * This component is a controlled UI only — it calls onLanguageChange()
 * and the parent (BlogDetail) handles the actual translation via Claude API.
 *
 * Usage in BlogDetail:
 *   <LanguageSelector
 *     currentLang={selectedLang}
 *     translating={translating}
 *     onLanguageChange={handleLangChange}
 *   />
 */

import { Globe, ChevronDown, Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LANGUAGES = [
  { code: "original", label: "Original"   },
  { code: "hi",       label: "Hindi"      },
  { code: "kn",       label: "Kannada"    },
  { code: "ta",       label: "Tamil"      },
  { code: "te",       label: "Telugu"     },
  { code: "ml",       label: "Malayalam"  },
  { code: "mr",       label: "Marathi"    },
  { code: "bn",       label: "Bengali"    },
  { code: "gu",       label: "Gujarati"   },
  { code: "pa",       label: "Punjabi"    },
  { code: "fr",       label: "Français"   },
  { code: "de",       label: "Deutsch"    },
  { code: "es",       label: "Español"    },
  { code: "ar",       label: "Arabic"     },
  { code: "zh",       label: "Chinese"    },
  { code: "ja",       label: "Japanese"   },
];

interface LanguageSelectorProps {
  currentLang:      string;
  translating:      boolean;
  onLanguageChange: (code: string, label: string) => void;
}

export const LanguageSelector = ({
  currentLang,
  translating,
  onLanguageChange,
}: LanguageSelectorProps) => {
  const currentLabel =
    LANGUAGES.find(l => l.code === currentLang)?.label ?? "Original";

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 min-w-[130px] border-[#D7A764]/20 hover:border-[#D7A764]"
            disabled={translating}
          >
            {translating
              ? <Loader2 className="h-4 w-4 animate-spin text-[#D7A764]" />
              : <Globe className="h-4 w-4 text-[#D7A764]" />
            }
            <span className="text-left flex-1">
              {translating ? "Translating…" : currentLabel}
            </span>
            {!translating && (
              <ChevronDown className="h-3 w-3 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="bg-popover w-44 max-h-80 overflow-y-auto">
          {LANGUAGES.map(lang => (
            <DropdownMenuItem
              key={lang.code}
              className={`cursor-pointer flex items-center justify-between ${
                currentLang === lang.code
                  ? "text-[#00274D] font-normal bg-[#D7A764]/5"
                  : ""
              }`}
              onClick={() => onLanguageChange(lang.code, lang.label)}
            >
              {lang.label}
              {currentLang === lang.code && (
                <span className="text-[10px] text-[#D7A764] ml-2">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};